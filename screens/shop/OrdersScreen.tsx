import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import { IAppState } from '../../store/state/app.state';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/header-button';
import { Order } from '../../models/order';

interface IOrderVisibility {
    orders: {[key: string]: Order}
}

const OrderVisibility: IOrderVisibility = {
    orders: {}
}

const OrdersScreen = (props: any) => {

    const orders = useSelector((state: IAppState) => state.orders.orders);
    console.log(orders);

    return (
        <View style={styles.screen}>
            <FlatList 
                data={orders}
                keyExtractor={item => item.id}
                renderItem={({item, index}) => 
                <TouchableOpacity onPress={() => { item.visible = !item.visible}}>
                    <View style={styles.summary}>
                        <View>
                            <Text style={styles.orderText}>{'Order'}</Text>
                            <Text style={styles.orderIndex}>{index + 1}</Text>
                            <Text style={styles.orderAmt}>{item.totalAmount}</Text>
                        </View>
                        <View>
                            {
                                item.visible &&
                                <View>
                                    <Text>Showing order items...</Text>
                                </View>
                            }
                        </View>
                    </View>
                </TouchableOpacity>                
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
    screen:{
        margin: 20
    }      
});


export default OrdersScreen;