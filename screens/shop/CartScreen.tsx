import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, FlatList, Button, StyleSheet, Image} from 'react-native';
import {IAppState} from '../../store/state/app.state';
import {CardItem} from '../../models/cart-item';
import {clearCart} from '../../store/actions/cart.actions';
import * as ordersActions from '../../store/actions/orders.actions';
import Colors from '../../constants/Colors';

const CartScreen = (props:any) => {

    const dispatch = useDispatch();
    const totalAmount = useSelector((state: IAppState) => state.cart.totalAmount);

    const cartItems:CardItem[] = useSelector((state: IAppState) => {
        const cartItemArr: CardItem[] = [];

        for(const key in state.cart.items){
            const cartItem = state.cart.items[key];
            cartItemArr.push({
                productId: key,
                price: cartItem.price,
                title: cartItem.title,
                total: cartItem.total,
                quantity: cartItem.quantity         
            });
        }

        return cartItemArr;
    });

    const _renderItem = (itemData: any) =>{
        const item: CardItem = itemData.item;
        return (
            <View style={styles.cartItem}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <Text style={styles.itemTotal}>${item.total}</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: 
                    <Text>${totalAmount.toFixed(2)} </Text></Text>

                {   cartItems.length > 0 && 
                    <Button title="Clear Cart" color={Colors.accent} onPress={() =>{
                        dispatch(clearCart());
                    }} />
                }   
                {   cartItems.length > 0 &&  
                    <Button title="Order Now" color={Colors.primary} onPress={() => {
                        dispatch(ordersActions.addOrder(cartItems, totalAmount));
                    }} />
                }
            </View>
            <View style={styles.cartItemsContainer}>
                <Text>
                    {
                        cartItems.length > 0 && 
                        <Text><Text>{cartItems.length}</Text>) Cart Items</Text>
                    }
                    {
                        cartItems.length == 0 && 
                        <Text>There are NO items in the cart yet...</Text>
                    }
                </Text>
                <View style={styles.cartItems}>
                    <FlatList 
                        data={cartItems}
                        keyExtractor={(item) => item.productId || item.title} 
                        renderItem={_renderItem} />
                </View>
            </View>
        </View>
    )    
}

const styles= StyleSheet.create({
    screen:{
        margin: 20
    },
    summary:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',     
    },
    summaryText:{
        fontFamily: 'open-sans',
        fontSize: 14
    },
    cartItemsContainer:{

    },
    cartItems:{

    },
    cartItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1
    },
    itemTitle:{
        width: '60%'
    },
    itemQuantity:{
        width: '5%'
    },
    itemTotal:{
        width: '20%'
    }
});

export default CartScreen;
