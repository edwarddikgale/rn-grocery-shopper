import React, { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { Order } from '../../models/order';

const OrderItem = (props:any) => {
    const [showDetails, setShowDetails] = useState(false);
    const index = props.index;
    const order = props.data as Order;

    return (
        <TouchableOpacity onPress={() => setShowDetails(showDetails => !showDetails)}>
            <View>
                <View style={styles.summary}>
                    <Text style={styles.orderText}>{'Order'}</Text>
                    <Text style={styles.orderIndex}>{index + 1}</Text>
                    <Text style={styles.orderAmt}>{order.totalAmount}</Text>
                </View>
                <View>
                    {
                        showDetails &&
                        <View>
                            <Text>Showing order items... of total: $ {order.totalAmount} </Text>
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
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',     
    },
    summaryText:{
        fontFamily: 'open-sans',
        fontSize: 14
    }, 
})

export default OrderItem;