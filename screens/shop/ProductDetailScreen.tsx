import React,{useCallback} from 'react';
import {Text, View, ScrollView, Button, StyleSheet, Image} from 'react-native';
import Product from '../../models/product';
import {useSelector, useDispatch} from 'react-redux';
import { HeaderTitle } from 'react-navigation-stack';
import * as cartActions from '../../store/actions/cart.actions';

const ProductDetailScreen = (props: any) =>{
    const {navigation} = props;
    const productId = navigation.getParam('productId');
    const product = useSelector((state: any) => 
        state.products.availableProducts.find((p:any) => p.id === productId)) as Product;
    
    const dispatch = useDispatch();

    useCallback(() =>
        props.navigation.setParams({
            productTitle: product.title
        })
   ,[navigation]);    

    return (
        <ScrollView>
            <View>
                <Image 
                    style={styles.image} 
                    source={{uri: product.imageUrl}} />
                <View style={styles.actions}>
                    <Button 
                        title='Add to cart' 
                        onPress={() => dispatch(cartActions.addToCart(product))} />
                </View>
                <Text style={styles.price}>${product.price}</Text>
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