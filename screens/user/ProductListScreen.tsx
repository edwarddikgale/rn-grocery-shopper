import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, Modal, TouchableHighlight, TouchableOpacity, Dimensions} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/user/ProductItem';
import { IAppState } from '../../store/state/app.state';
import ProductUpdate from '../../components/user/ProductUpdate';
import Product from '../../models/product';
import * as actions from '../../store/actions/products.actions';
import LocalCache from '../../utils/local.cache';
import { FloatingAction, IActionProps } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductListScreen = (props: any) => {


    const {navigation} = props;
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const products = useSelector((state: IAppState) => state.products.userProducts); //availableProducts
    //const products: Product[] = [];
    const floatBtnActions: IActionProps[] | undefined = [];
    const sortedProducts = products.sort((a,b) => a.title > b.title? 1: -1);

    const dispatch = useDispatch();

    let user: firebase.User;
    LocalCache.getData('user').then(data => { 
        user = data;   
    });

    console.log('Attempting to call fetch-product');
    useEffect(() => {
        console.log('Calling fetch-product');
        //dispatch(actions.getProducts(user.uid, {}));
        dispatch(actions.getProducts('Cm8Pg1tlRbe9E8ojiBPQDQbLep83', {}));
    }, []);  
    
    const cancelModal = () => { setModalVisible(false);}
    const onAddProdHandler = (product: Product) => {
       
        dispatch(actions.addProduct(user.uid, product));
        setModalVisible(false);
    }

    return (
        <View style={styles.screen}>

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

            <View style={styles.floatButton}>
                <TouchableOpacity onPress={() => setModalVisible(modalVisible => !modalVisible)} activeOpacity={.5} >
                    <Ionicons name='ios-add' size={40} />
                </TouchableOpacity>        
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
        width: '100%',
        flexDirection: 'column',
        flex: 1
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
    },
    floatButton:{
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        backgroundColor: "#F194FF",
        right: 20,
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        width: Dimensions.get('window').width * 0.1,
        height: Dimensions.get('window').width * 0.1,
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold'
    }      
});  

export default ProductListScreen;