import React from 'react';
import {View, Button, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, TouchableWithoutFeedback} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import { CardItem } from '../../models/cart-item';
import productCategoryReducer from '../../store/reducers/product.category.reducer';
import DeviceInfo from '../../utils/device-info';
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
            <View style={styles.stockPercentage}>
                <StockLabel
                    stockPercentage = {props.item.stockPercentage}
                    style={{padding: 5, fontSize: 10}} 
                />
            </View>
            <View style={styles.touchable}>
                <TouchableComponent useForground onPress={props.onViewDetails}>
                    <View>
                        {
                            showImage &&                      
                            <Image style={styles.image} source={{uri: props.item.imageUrl}} /> 
                        }
                        <View style={styles.details}>
                            <View>
                                <Text style={styles.title}>{props.item.title}</Text>
                                <Text style={styles.price}>€ {itemPrice }</Text>
                            </View>
                        </View>
                        <View style={styles.actions}>
                            <TouchableWithoutFeedback onPress={props.onViewDetails}>
                                <View style={styles.viewDetails}>
                                    <Ionicons name='ios-information-circle-outline' color={'green'} size={28} />
                                </View>
                            </TouchableWithoutFeedback>    

                            <TouchableWithoutFeedback onPress={props.onAddToCart}>
                                <View style={styles.addToCart}>
                                    <Text>{cartItem? cartItem.quantity + ' +': ''}</Text>
                                    <Ionicons name='ios-cart' color={Colors.primary} size={28} />
                                </View>
                            </TouchableWithoutFeedback>    
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
        height: 275,
        margin: 20,
        padding: 5,
        width: DeviceInfo.isIpad()? DeviceInfo.screenWidth()/2 - 40: DeviceInfo.screenWidth() - 40
    },
    touchable:{
        borderRadius: 10,
        overflow: 'hidden'
    },
    image:{
        width: '100%',
        height: '55%',
        alignItems: 'center'
    },
    details:{
       flexDirection: 'row',
       justifyContent: 'space-evenly', 
       width: '100%',
       padding: 10,
       height: '30%' 
    },
    title:{
        fontSize: 17,
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
        width: 95,
        borderRadius: 20,
        alignSelf: 'flex-end',
        marginTop: -1,
        marginRight: 20,
        fontWeight: 'bold',
        position: 'absolute',
        zIndex: 3000
    }, 
    addToCart:{
        marginHorizontal: 15,
        marginTop: -5,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    viewDetails:{
        marginHorizontal: 15,
        marginTop: -5,       
    }
});

export default ProductItem;