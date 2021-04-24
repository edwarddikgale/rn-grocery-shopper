import React from 'react';
import { Dimensions, View, Text, StyleSheet, Platform } from 'react-native';
import Colors from '../../constants/Colors';
import DeviceInfo from '../../utils/device-info';

const CIRCLE_WIDTH = DeviceInfo.isIpad()? Dimensions.get('window').width * 0.1/2:Dimensions.get('window').width * 0.1;
const CIRCLE_HEIGHT = CIRCLE_WIDTH;
 
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
        width: CIRCLE_WIDTH,
        height: CIRCLE_HEIGHT,
        backgroundColor: Colors.accent,
        justifyContent: 'center',
        alignItems: 'center'
    },
    letters:{
        fontWeight: 'bold'
    }
});

export default SummaryCircle;
