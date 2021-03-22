import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';;
import ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

import * as firebase from 'firebase/app';
import 'firebase/storage';

//
// Don't forget to initialize firebase!!!
//

const styles = StyleSheet.create({ 
  button: { 
    padding: 10, 
    borderWidth: 1, 
    borderColor: "#333", 
    textAlign: "center", 
    maxWidth: 150 
  }
});

const ImageUploader = (props: any) => {

  const uriToBlob = (uri: string) => {

    return new Promise((resolve, reject) => {

      const xhr = new XMLHttpRequest();

      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };

      // this helps us get a blob
      xhr.responseType = 'blob';

      xhr.open('GET', uri, true);
      xhr.send(null);

    });

  }

  const uploadToFirebase = (blob: any) => {

    return new Promise((resolve, reject)=>{

      var storageRef = firebase.storage().ref();

      storageRef.child('uploads/photo.jpg').put(blob, {
        contentType: 'image/jpeg'
      }).then((snapshot)=>{

        blob.close();
        console.log('SUCCESS uploaded image');
        resolve(snapshot);

      }).catch((error)=>{

        console.log('FAIL uploaded image');
        reject(error);

      });

    });


  }      

  const handleOnPress = async () => { 

    const permission = await getPermissionAsync();

    ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: "Images"
    }).then((result)=>{ 

      if (!result.cancelled) {
        // User picked an image
        const {height, width, type, uri} = result;
        return uriToBlob(uri);

      }

    }).then((blob)=>{

      return uploadToFirebase(blob);

    }).then((snapshot)=>{

      console.log("File uploaded");
   
    }).catch((error)=>{

      throw error;

    }); 

  }

  const getPermissionAsync = async () => {
    if (Constants.platform?.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  return (
        <View>
            <Button 
                title="Choose Photo"
                onPress={handleOnPress}
            />
        </View>
    )

}

export default ImageUploader;