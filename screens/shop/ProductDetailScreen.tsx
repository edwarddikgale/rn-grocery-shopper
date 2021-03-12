import React,{useCallback, useEffect, useState} from 'react';
import {Text, View, ScrollView, Button, StyleSheet, Image} from 'react-native';
import Product from '../../models/product';
import {useSelector, useDispatch} from 'react-redux';
import { HeaderTitle } from 'react-navigation-stack';
import * as cartActions from '../../store/actions/cart.actions';
import LocalCache from '../../utils/local.cache';

const ProductDetailScreen = (props: any) =>{
    const {navigation} = props;
    const product = JSON.parse(navigation.getParam('product')) as Product;
    const [userId, setUserId] = useState<string>('');

    const dispatch = useDispatch();

    /*useEffect(() =>
        props.navigation.setParams({
            productTitle: product.title
        })
   ,[]);*/
   
    LocalCache.getData('user').then(data => {  
        const user = data;   
        setUserId(user.uid);
    });

    return (
        <ScrollView>
            <View>
                {
                product.imageUrl &&    
                <Image 
                    style={styles.image} 
                    source={{uri: product.imageUrl}} />
                }
                <View style={styles.actions}>
                    <Button 
                        title='Add to cart' 
                        onPress={() => dispatch(cartActions.addToCart(userId, product))} />
                </View>
                <Text style={styles.price}>€ {product.price}</Text>
                <Text style={styles.description}>{product.description}</Text>
                
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image:{
        width: '100%',
        height: 250
    },
    actions:{
        margin: 10,
        marginHorizontal: '30%'
    },
    description:{
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'open-sans'
    },
    price:{
        fontSize: 15,
        color: 'gray',
        textAlign: 'center',
        fontFamily: 'open-sans-bold'
    }

});

ProductDetailScreen.navigationOptions = (navData: any) => {
    
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}

export default ProductDetailScreen;