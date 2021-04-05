import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';


const CustomTextInput = (props: any) => {
    return (
            <View style={styles.inputContainer}>
                <TextInput
                    style={{...styles.textInput, ...props.style}}
                    placeholder={props.placeholder}
                    maxLength={props.maxLength || 20}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    keyboardType={props.keyboardType || 'default'}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        paddingTop: 0,
        width: '100%'
    },
    textInput: {
        borderColor: '#000',
        borderTopWidth: 0,
        borderBottomWidth: 1,
        height: 50,
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20
    }
});

export default CustomTextInput;