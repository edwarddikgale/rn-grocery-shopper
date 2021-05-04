import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';
 
const AppLogo = (props: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                RE.STOCK
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: Colors.primary, 
        marginTop: 60, 
        width: '100%',
        padding: 20, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    text:{
        fontSize: 16, 
        fontFamily: 'krona-one', 
        fontWeight: 'bold', 
        color: 'white', 
        letterSpacing: 30
    }
});

export default AppLogo;