import React from 'react';
import { Dimensions, View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';

const SummaryCircle = (props: any) => {
    return (
        <View
            style = {{...styles.circle, ...props.style}}
        >
            <Text style={styles.letters}> {props.letters} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    circle: {
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        backgroundColor: Colors.accent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    letters:{
        fontWeight: 'bold'
    }
});

export default SummaryCircle;
