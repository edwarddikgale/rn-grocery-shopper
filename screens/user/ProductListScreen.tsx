import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const EditProductScreen = (props: any) => {
    return (
        <View style={styles.screen}>
            <Text>Edit Product</Text>
        </View>
    )    
};

const styles = StyleSheet.create({
    screen:{
        margin: 20
    }  
})

export default EditProductScreen;