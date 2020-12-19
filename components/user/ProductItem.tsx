import React from 'react';
import {View, Button, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import SummaryCircle from '../../components/ui/summary-circle';

const ProductItem = (props: any) => {
    let TouchableComponent: any = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback
    }

    const showImage = props.showImage? props.showImage: false;
    const prodHeight = showImage? 300: 80;

    return( 
        <View style={{...styles.product, height: prodHeight}}>
            <View style={styles.touchable}>
            <TouchableComponent useForground onPress={props.onViewDetails}>
                <View>
                    {
                        showImage && 
                        <Image style={styles.image} source={{uri: props.item.imageUrl}} /> 
                    }
                    <View style={styles.textSummary}>
                        <SummaryCircle 
                            style={{marginTop: 5}}
                            letters={props.item.title.substring(0,1)}
                        />
                        <View style={styles.details}>
                            <Text style={styles.title}>{props.item.title}</Text>
                            <Text style={styles.price}>$ {props.item.price.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </TouchableComponent>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    product:{
        /*shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,*/
        backgroundColor: 'white',
        marginHorizontal: 5,
        padding: 5
    },
    textSummary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    touchable:{
        borderRadius: 10,
        overflow: 'hidden'
    },
    image:{
        width: '100%',
        height: '60%',
        alignItems: 'center'
    },
    details:{
       width: '100%',
       padding: 10 
    },
    summaryCircle:{

    },
    title:{
        fontSize: 17,
        margin: 5,
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold'
    },
    price:{
        fontSize: 13,
        color: 'gray',
        fontFamily: 'open-sans'
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 5
    }
});

export default ProductItem;