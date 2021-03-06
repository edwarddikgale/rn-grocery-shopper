import React,{useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Text, View, FlatList, Button, StyleSheet, Image, TouchableHighlight, Dimensions, TouchableWithoutFeedback, Animated} from 'react-native';
import {IAppState} from '../../store/state/app.state';
import {CardItem} from '../../models/cart-item';
import {clearCart, confirmCartItem, removeCartItem, incrementCartItem, decrementCartItem, getCart} from '../../store/actions/cart.actions';
import * as ordersActions from '../../store/actions/orders.actions';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LocalCache from '../../utils/local.cache';
import { SwipeListView } from 'react-native-swipe-list-view';
import HiddenItemWithActions from '../common/HiddenItemWithActions';
import Toaster from '../../utils/toaster';

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

        let cartItemArr: CardItem[] = [];
        for(const key in state.cart.items){
            const cartItem = state.cart.items[key];
            cartItemArr.push({
                productId: cartItem.productId,
                price: cartItem.price,
                title: cartItem.title,
                total: cartItem.total,
                quantity: cartItem.quantity,
                id: cartItem.id,
                confirm: cartItem.confirm        
            });
        }

        const sortedCartItems = cartItemArr.sort((a,b) => a.title > b.title? 1: -1);
        return sortedCartItems;
    });

    const removeItem = (item: CardItem) => {

        if(userId){
            dispatch(removeCartItem(userId, item));
            Toaster.toast(item.title + ' removed from cart.');
        }
    }

    const confirmItem =  (item: CardItem) => {
        if(userId){
            dispatch(confirmCartItem(userId, item));
        }
    }

    const incrementItem = (item: CardItem) => {
        if(userId)
            dispatch(incrementCartItem(userId, item))
    }

    const decrementItem = (item: CardItem) => {
        if(userId)
            dispatch(decrementCartItem(userId, item))
    }

    const orderNow = () => {
        if(userId){
            dispatch(ordersActions.addOrder(userId, {cartItems, totalAmount}));
            dispatch(clearCart(userId));
            Toaster.toast('Items in cart ordered & stock updated!');
        }
            
    }

    const clearThisCart = () => {
        if(userId){
            dispatch(clearCart(userId));
            Toaster.toast('All items have been removed from cart');
        }
    }

    const renderItem = (itemData: any) =>{
        const item: CardItem = itemData.item;
        const index = itemData.index + 1;
        const confirmedStyle = item.confirm? styles.cartItemConfirmed: styles.cartItemNotConfirmed;
        return (
            <View style={styles.cartItem}>
                <View style={styles.cartItemContent}>
                    <Text style={styles.itemIndex}>{index}</Text>
                    <Text style={{...styles.itemTitle, ...confirmedStyle}}>{item.title}</Text>
                    <Text style={styles.itemTotal}>€{item.total.toFixed(2)}</Text>
                </View>
                <View style={styles.cartItemActions}> 
                    <TouchableWithoutFeedback onPress={()=> confirmItem(item)}>
                        <View style={styles.confirmItemAction}>
                            <Ionicons name={item.confirm? 'ios-checkmark-circle' : 'ios-checkmark-circle-outline'} color={item.confirm? 'green': 'gray'} size={28} />
                        </View>
                    </TouchableWithoutFeedback>              
                    <TouchableWithoutFeedback onPress={()=> decrementItem(item)}>
                        <View style={styles.cartItemAction}>
                            <Ionicons name='ios-remove-circle' color={'gray'} size={28} />
                        </View>
                    </TouchableWithoutFeedback>
                    <Text style={styles.itemQuantity}>{item.quantity}</Text>
                    <TouchableWithoutFeedback onPress={()=> incrementItem(item)}>
                        <View style={styles.cartItemAction}>
                            <Ionicons name='ios-add-circle' color={'gray'} size={28} />
                        </View>
                    </TouchableWithoutFeedback>  
                </View>

            </View>
        )
    }

    const closeRow = (rowMap: any, rowKey: string) => {
        console.log(rowKey);
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap: any, rowKey: string) => {
        closeRow(rowMap, rowKey);
        if(userId){
            const item = cartItems.filter(item => item.id === rowKey)[0];            
            dispatch(removeCartItem(userId, item));
        }
    };

    const renderHiddenItem = (itemData: {item: CardItem}, rowMap: any) => {

        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(50);
        
        return(
            <HiddenItemWithActions
                data={itemData}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, itemData.item.productId)}
                onDelete={() => deleteRow(rowMap, itemData.item.id)}
                style={styles.cartItemHiddenActions}
            />
        );    
    };

    const onLeftAction = (rowKey:string) => {
        //console.log('onLeftAction', rowKey);
    };

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
                <Text style={styles.cartItemCountSummary}>
                    {
                        totalItems > 0 && 
                        <Text style={styles.cartItemCountSummary}><Text>{totalItems}</Text> Cart Items</Text>
                    }
                    {
                        cartItems.length == 0 && 
                        <Text>Your cart is empty ...</Text>
                    }
                </Text>
                <View style={styles.cartItems}>

                    <SwipeListView 
                        data={cartItems} 
                        keyExtractor = {(item: CardItem) => item.productId}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        useNativeDriver={false}
                        onLeftAction={onLeftAction}
                        leftOpenValue={75}
                        rightOpenValue={-150}
                        leftActivationValue={100}
                        rightActivationValue={-200}
                        leftActionValue={0}
                        rightActionValue={-500}
                        style={{marginBottom: 40}} 
                        
                    />          
                </View>
            </View>
        </View>
    )    
}

const styles= StyleSheet.create({
    screen:{
        marginVertical: 20,
        flex: 1
    },
    summary:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginHorizontal: 5,
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
        flex: 1
    },
    cartItemCountSummary:{
        fontWeight: 'bold',
        textTransform: 'uppercase',
        marginBottom: 10,
        marginHorizontal: 5,
    },
    cartItems:{
        marginTop: 5,
        marginBottom: 5
    },
    cartItem:{
        alignItems: 'center',
        marginBottom: 0,
        padding: 0,
        borderColor: Colors.lightGray,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white', 
        margin: 2
    },
    cartItemConfirmed:{
        color: 'green',
        fontWeight: 'bold'
    },
    cartItemNotConfirmed:{
    },
    cartItemContent:{
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cartItemActions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginLeft: Dimensions.get('window').width - 220
    },
    cartItemAction:{
        width: Dimensions.get('window').width/8
    },
    confirmItemAction:{
        width: Dimensions.get('window').width/8 + 20
    },
    itemTitle:{
        width: '70%'
    },
    itemIndex:{
        width: 20,
        fontWeight: 'bold'
    },
    itemQuantity:{
        width: '10%',
        marginRight: 22,
        color: 'gray',
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemTotal:{
        width: '20%',
        fontWeight: 'bold',
    }
});

export default CartScreen;
