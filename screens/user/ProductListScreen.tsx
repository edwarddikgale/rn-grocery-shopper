import React, { useState } from 'react';
import {View, Text, StyleSheet, FlatList, Modal, TouchableHighlight} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/user/ProductItem';
import { IAppState } from '../../store/state/app.state';
import ProductUpdate from '../../components/user/ProductUpdate';
import Product from '../../models/product';
import * as actions from '../../store/actions/products.actions';
import LocalCache from '../../utils/local.cache';

const ProductListScreen = (props: any) => {


    const {navigation} = props;
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const products = useSelector((state: IAppState) => state.products.availableProducts);
    const sortedProducts = products.sort((a,b) => a.title > b.title? 1: -1);

    const dispatch = useDispatch();
    let user: firebase.User;
    LocalCache.getData('user').then(data => { user = data; });
    
    const cancelModal = () => { setModalVisible(false);}
    const onAddProdHandler = (product: Product) => {
       
        dispatch(actions.addProduct(user.uid, product));
        setModalVisible(false);
    }

    return (
        <View style={styles.screen}>
            <TouchableHighlight
                style={styles.openButton}
                onPress={() => {setModalVisible(modalVisible => !modalVisible);}}
            >
                <Text style={styles.textStyle}> + ADD PRODUCT</Text>
            </TouchableHighlight>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <ProductUpdate 
                            onAdd={onAddProdHandler}
                            onCancel={cancelModal}
                        />
                    </View>
                </View>
            </Modal>
            
            <View style={styles.productList}>
                <FlatList 
                    data={sortedProducts} 
                    keyExtractor = {item => item.id}
                    renderItem={itemData =>
                        <ProductItem 
                            item={itemData.item}
                            showImage={false}
                            onViewDetails={() => {}}               
                        />
                    } 
                />
            </View>

        </View>
    )    
};

ProductListScreen.navigationOptions = (navData: any) => {
    //const cartItemCount = navData.navigation.getParam('cartItemCount');
    //const title = `Products (${cartItemCount} in Cart)`;
    return ({
        headerTitle: 'Manage Products'
    })
};  

const styles = StyleSheet.create({
    screen:{
        marginTop: 10,
        width: '100%'
    },
    productList:{

    },
    modalView: {
        margin: 10,
        backgroundColor: "#fce6ff",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        height: 200,
        width: '90%'
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },   
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }, 
    button:{
        margin: 5
    }      
});  

export default ProductListScreen;