import React from 'react';
import {View, Button, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import Colors from '../../constants/Colors';
import { CardItem } from '../../models/cart-item';
import productCategoryReducer from '../../store/reducers/product.category.reducer';
import StockLabel from '../ui/stock-label';

const ProductItem = (props: any) => {
    let TouchableComponent: any = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback
    }

    const showImage = props.showImage? props.showImage: true;
    const itemPrice = !isNaN(props.item.price)? parseFloat(props.item.price).toFixed(2) : 0.00;
    const cartItem = props.cartItem as CardItem; 

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
                        <View style={styles.stockPercentage}>
                            <StockLabel
                                stockPercentage = {props.item.stockPercentage}
                                style={{padding: 5, fontSize: 14}} 
                            />
                        </View>
                        <Button 
                            title={cartItem? cartItem.quantity + ' In Cart +': 'To Cart'} 
                            color={cartItem? Colors.green: Colors.buttonSubmit } 
                            onPress={props.onAddToCart} 
                            />
                    </View>
                    {
                    cartItem &&    
                    <View style={{backgroundColor: Colors.green, height: 3, marginTop: 5}}>

                    </View>
                    }
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
        height: '57%',
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
        marginHorizontal: 0,
        marginTop: 5
    },
    stockPercentage:{
        fontFamily: 'open-sans',
        marginRight: 30,
        marginTop: 5,
        width: 95,
        borderRadius: 20,
        overflow: 'hidden',
        paddingLeft: 5,
        backgroundColor: 'transparent',
        justifyContent: 'center',
    }
});

export default ProductItem;