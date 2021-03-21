import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IAppState } from '../../store/state/app.state';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/header-button';
import { Order } from '../../models/order';
import OrderItem from '../../components/shop/OrderItem';
import LocalCache from '../../utils/local.cache';
import {getOrder} from '../../store/actions/orders.actions';

interface IOrderVisibility {
    orders: {[key: string]: Order}
}

const OrderVisibility: IOrderVisibility = {
    orders: {}
}

const OrdersScreen = (props: any) => {

    const orders = useSelector((state: IAppState) => state.orders.orders);
    const dispatch = useDispatch();

    const [userId, setUserId] = useState<string>();

    let user: firebase.User;
    LocalCache.getData('user').then(data => { 
        user = data;   
        setUserId(user.uid);
    });

    useEffect(() => {
        if(userId && orders.length === 0) dispatch(getOrder(userId));

    }, [userId]); 

    return (
        <View style={styles.screen}>
            <FlatList 
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => 
                    (<OrderItem 
                        data={item}
                        index={index}
                    />)              
                 }
         />
        </View>
    )

}

OrdersScreen.navigationOptions = (navData: any) => {
    return (
        {
            headerLeft : () => 
                <HeaderButtons HeaderButtonComponent={HeaderButton}>

                    <Item 
                        title='Menu' 
                        iconName={'md-menu'} 
                        onPress={() => {
                            navData.navigation.toggleDrawer();
                        }}

                    />

                </HeaderButtons> 
        }     
    )
}

const styles = StyleSheet.create({
 
    screen:{
        margin: 20
    }      
});


export default OrdersScreen;