import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Order } from '../../models/order';
import { FlatList } from 'react-native-gesture-handler';
import { CardItem } from '../../models/cart-item';

const OrderItem = (props:any) => {
    const [showDetails, setShowDetails] = useState(false);
    const index = props.index;
    const order = props.data as Order;

    const orderItems: CardItem[] = [];
    for(const key in order.items){
        const item = order.items[key];
        orderItems.push({
            productId: key,
            price: item.price,
            title: item.title,
            total: item.total,
            quantity: item.quantity         
        });
    }

    const _renderItem = (itemData: any): JSX.Element => {
        const item = itemData.item as CardItem;
        return (
            <View style={styles.summary}>
                <Text>{item.quantity}</Text>
                <Text>{item.title}</Text>
                <Text>{item.price.toFixed(2)}</Text>
            </View>
        )
    }

    const randomId = () => (Math.floor((Math.random() * 10000) + 1).toString());

    return (
        <TouchableOpacity style={styles.touchable} onPress={() => setShowDetails(showDetails => !showDetails)}>
            <View>
                <View style={styles.summary}>
                    <Text style={styles.orderText}>{'Order'}</Text>
                    <Text style={styles.orderIndex}>{index + 1}</Text>
                    <Text style={styles.orderAmt}>{order.totalAmount.toFixed(2)}</Text>
                </View>
                <View>
                    {
                        showDetails &&
                        <View style={styles.orderItems}>
                            <Text>Order items...</Text>
                            <FlatList 
                                data={orderItems} 
                                keyExtractor={item => item.productId || randomId()}
                                renderItem={_renderItem} 
                                >

                            </FlatList>
                        </View>
                    }
                </View>
            </View>    
        </TouchableOpacity>
    )    
}

const styles = StyleSheet.create({
    orderText:{
        
    },
    orderIndex:{
        
    },
    orderAmt:{
       
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
        shadowRadius: 4,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',     
    },
    summaryText:{
        fontFamily: 'open-sans',
        fontSize: 14
    }, 
    touchable:{
        borderRadius: 10,
        overflow: 'hidden'
    },
    orderItems:{
        marginLeft: 20
    }
})

export default OrderItem;