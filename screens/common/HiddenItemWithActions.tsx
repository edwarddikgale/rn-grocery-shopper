import React from "react";
import { Animated, TouchableOpacity, StyleSheet, View, Image, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const HiddenItemWithActions = (props:any) => {
    const {
        leftActionActivated,
        rightActionActivated,
        swipeAnimatedValue,
        rowActionAnimatedValue,
        rowHeightAnimatedValue,
        onClose,
        onDelete,
    } = props;

    if (rightActionActivated) {
        Animated.spring(rowActionAnimatedValue, {
            toValue: 500,
        } as Animated.SpringAnimationConfig).start();
    } else {
        Animated.spring(rowActionAnimatedValue, {
            toValue: 75,
        } as Animated.SpringAnimationConfig).start();
    }

    return (
        <Animated.View
            style={[
                styles.rowBack,
                { height: rowHeightAnimatedValue },
                leftActionActivated && { backgroundColor: 'lightgreen' },
            ]}
        >
            <Text>Left</Text>
            {!leftActionActivated && (
                <TouchableOpacity
                    style={[styles.backRightBtn, styles.backRightBtnLeft]}
                    onPress={onClose}
                >
                    <Text style={styles.backTextWhite}>Close</Text>
                </TouchableOpacity>
            )}
            {!leftActionActivated && (
                <Animated.View
                    style={[
                        styles.backRightBtn,
                        styles.backRightBtnRight,
                        { flex: 1, width: rowActionAnimatedValue },
                    ]}
                >
                    <TouchableOpacity
                        style={[
                            styles.backRightBtn,
                            styles.backRightBtnRight,
                        ]}
                        onPress={onDelete}
                    >
                        <Animated.View
                            style={[
                                styles.trash,
                                {
                                    transform: [
                                        {
                                            scale: swipeAnimatedValue.interpolate(
                                                {
                                                    inputRange: [-90, -45],
                                                    outputRange: [1, 0],
                                                    extrapolate: 'clamp',
                                                }
                                            ),
                                        },
                                    ],
                                },
                            ]}
                        >       
                            <Ionicons name='ios-trash' size={30} color={'white'} />
                        </Animated.View>
                    </TouchableOpacity>
                </Animated.View>
            )}
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
        width: '100%',
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'flex-end',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        paddingRight: 17,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    trash: {
        height: 25,
        width: 25,
        marginRight: 7,
    },
});

export default HiddenItemWithActions;