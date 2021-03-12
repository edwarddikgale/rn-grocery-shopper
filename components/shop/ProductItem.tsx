import React from 'react';
import {View, Button, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';

const ProductItem = (props: any) => {
    let TouchableComponent: any = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback
    }

    const showImage = props.showImage? props.showImage: true;
    const itemPrice = !isNaN(props.item.price)? parseFloat(props.item.price).toFixed(2) : 0.00;

    return( 
        <View style={styles.product}>
            <View style={styles.touchable}>
            <TouchableComponent useForground onPress={props.onViewDetails}>
                <View>
                    {
                        showImage &&                      
                        <Image style={styles.image} source={{uri: props.item.imageUrl}} /> 
                    }
                    <View style={styles.details}>
                        <Text style={styles.title}>{props.item.title}</Text>
                        <Text style={styles.price}>€ {itemPrice }</Text>
                    </View>
                    <View style={styles.actions}>
                        <Button title='View Details' onPress={props.onViewDetails} />
                        <Button title='To Cart' onPress={props.onAddToCart} />
                    </View>
                </View>
            </TouchableComponent>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    product:{
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        height: 300,
        margin: 20,
        padding: 5
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
       padding: 10,
       height: '25%' 
    },
    title:{
        fontSize: 17,
        margin: 5,
        fontFamily: 'open-sans-bold'
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