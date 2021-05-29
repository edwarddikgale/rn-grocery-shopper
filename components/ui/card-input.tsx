import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Card from './card';

const CardInput = (props: any) => {

    return (
        <TouchableOpacity style={{...styles.card,...props.style}}>
            <Text>{props.value}</Text>
        </TouchableOpacity>    
    );

}

const styles = StyleSheet.create({
    card:{
        margin: 5,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',     
    },
})

export default CardInput;