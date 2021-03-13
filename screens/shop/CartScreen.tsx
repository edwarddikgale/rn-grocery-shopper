import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, FlatList, Button, StyleSheet, Image, TouchableHighlight} from 'react-native';
import {IAppState} from '../../store/state/app.state';
import {CardItem} from '../../models/cart-item';
import {clearCart, removeCartItem, incrementCartItem, decrementCartItem, getCart} from '../../store/actions/cart.actions';
import * as ordersActions from '../../store/actions/orders.actions';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocalCache from '../../utils/local.cache';

const CartScreen = (props:any) => {

    const dispatch = useDispatch();

    const totalAmount = useSelector((state: IAppState) => state.cart.totalAmount);
    const totalItems = useSelector((state:IAppState) => state.cart.count);
    const [userId, setUserId] = useState<string>();

    let user: firebase.User;
    LocalCache.getData('user').then(data => { 
        user = data;   
        setUserId(user.uid);
    });

    useEffect(() => {
        if(userId && totalItems === 0) dispatch(getCart(userId));

    }, [userId]); 

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

        const sortedCartItems = cartItemArr.sort((a,b) => a.title > b.title? 1: -1);
        return sortedCartItems;
    });

    const removeItem = (prodId?: string) => {
        if(userId && prodId)
            dispatch(removeCartItem(userId, prodId))
    }

    const incrementItem = (prodId?: string) => {
        if(prodId)
            dispatch(incrementCartItem(prodId))
    }

    const decrementItem = (prodId?: string) => {
        if(prodId)
            dispatch(decrementCartItem(prodId))
    }

    const orderNow = () => {
        if(userId){
            dispatch(ordersActions.addOrder(userId, {cartItems, totalAmount}));
            dispatch(clearCart(userId));
            //clear cart
            //update the products
        }
            
    }

    const clearThisCart = () => {
        if(userId){
            dispatch(clearCart(userId));
        }
    }

    const _renderItem = (itemData: any) =>{
        const item: CardItem = itemData.item;
        return (
            <View style={styles.cartItem}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemQuantity}>x {item.quantity}</Text>
                <Text style={styles.itemTotal}>€{item.total}</Text>
                <View style={styles.cartItemActions}> 
                    <TouchableHighlight onPress={()=> decrementItem(item.productId)}>
                        <View>
                            <Ionicons name='ios-remove-circle' color={'#000000'} size={28} />
                        </View>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={()=> incrementItem(item.productId)}>
                        <View>
                            <Ionicons name='ios-add-circle' color={'#000000'} size={28} />
                        </View>
                    </TouchableHighlight>  
                    <TouchableHighlight onPress={()=> removeItem(item.productId)}>
                        <View>
                            <Ionicons name='ios-trash' color={'red'} size={28} />
                        </View>
                    </TouchableHighlight>
                </View>

            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total: 
                    <Text>€ {totalAmount? totalAmount.toFixed(2): 0.00} </Text></Text>

                {   cartItems.length > 0 && 
                    <Button title="Clear Cart" color={Colors.accent} onPress={() =>{ clearThisCart()}} />
                }   
                {   cartItems.length > 0 &&  
                    <Button title="Order Now" color={Colors.primary} onPress={() => { orderNow()}} />
                }
            </View>
            <View style={styles.cartItemsContainer}>
                <Text>
                    {
                        totalItems > 0 && 
                        <Text style={styles.cartItemCountSummary}><Text>{totalItems}</Text> Cart Items</Text>
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
    cartItemCountSummary:{
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    cartItems:{

    },
    cartItem:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 1
    },
    cartItemActions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        width: '30%'
    },
    itemTitle:{
        width: '45%'
    },
    itemQuantity:{
        width: '10%',
        paddingHorizontal: 5,
        color: 'gray'
    },
    itemTotal:{
        width: '10%',
        fontWeight: 'bold',
    }
});

export default CartScreen;
