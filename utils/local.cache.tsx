import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';

const  LocalCache = {
    
    storeData : async (key: string, value: any) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
          // saving error
        }
    },
    getData : async (key: string) => {
        try {
          const jsonValue = await AsyncStorage.getItem(key);
          return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
          // error reading value
        }
    }
}

export default LocalCache;
