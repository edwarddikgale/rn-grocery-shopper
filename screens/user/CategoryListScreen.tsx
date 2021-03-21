import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, StyleSheet, Button, FlatList, Modal, Alert, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions} from 'react-native';
import LocalCache from '../../utils/local.cache';
import ProductCategory from "../../models/productCategory";
import * as actions from '../../store/actions/product.category.actions';
import CategoryUpdate from '../../components/user/CategoryUpdate';
import { IAppState } from '../../store/state/app.state';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import CategoryCarousel from '../common/CategoryCarousel';

const CategoryListScreen = (props: any) => {

    const categories = useSelector((state: IAppState) => state.categories.categories);
    const [userId, setUserId] = useState<string>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [category, setCategory] = useState<ProductCategory>({} as ProductCategory);
    
    let cachedUser = {} as firebase.User;
    const dispatch = useDispatch();

    let user: firebase.User;
    LocalCache.getData('user').then(data => { 
        user = data;   
        setUserId(user.uid);
    });

    useEffect(() => {
        if(userId) {
            dispatch(actions.getProductCategories(userId, {}));
        }
    }, [userId]);  
    

    const onAddCategoryHandler = (category: ProductCategory) => { 

        const matches = categories.filter(cat => cat.title === category.title);
        if(!category || !category.title || category.title.length == 0 || matches.length > 0) return;

        if(userId){        
            dispatch(actions.addProductCategory(userId, category));
            setModalVisible(false);
        }
    }

    const onDeleteCategoryHandler = (category: ProductCategory) => { 

        if(userId){        
            dispatch(actions.deleteProductCategory(userId, category.id));
            setModalVisible(false);
        }
    }

    const onUpdateCategoryHandler = (category: ProductCategory) => { 

        if(userId){        
            dispatch(actions.updateProductCategory(userId, category));
            setModalVisible(false);
        }
    }

    const cancelModal = () => { setModalVisible(false);}

    const onViewDetails = (category: ProductCategory) => {
        setCategory(category);
        setModalVisible(true);
    }

    const addNewCategory = () => {
        setCategory({} as ProductCategory);
        setModalVisible(modalVisible => !modalVisible);
    }

    const renderItem = (itemData: {item: ProductCategory}) => {
        
        return (
            <TouchableWithoutFeedback onPress={() => onViewDetails(itemData.item)}>
                <View style={styles.category}>
                    <Text style={styles.categoryText}>{itemData.item.title}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <View style={styles.screen}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(false) }}
            >
                <TouchableOpacity 
                    style={styles.centeredView} 
                    activeOpacity={1} 
                    onPressOut={() => {setModalVisible(false)}}
                >
                    <ScrollView 
                        directionalLockEnabled={true} 
                        contentContainerStyle={styles.scrollModal}
                    >
                        <TouchableWithoutFeedback>

                            <View style={styles.modalView}>
                                <CategoryUpdate 
                                    category={category}
                                    onAdd={onAddCategoryHandler}
                                    onUpdate={onUpdateCategoryHandler}
                                    onDelete={onDeleteCategoryHandler}
                                    onCancel={cancelModal}
                                />

                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>
            </Modal>
            
            <View style={styles.categoryList}>
                <FlatList 
                    data={categories} 
                    renderItem={renderItem}
                    keyExtractor = {item => item.id}
                    numColumns={2}
                />    
            </View>

            <View style={styles.floatButton}>
                <TouchableOpacity onPress={() => addNewCategory()} activeOpacity={.5} >
                    <Ionicons name='ios-add' size={40} />
                </TouchableOpacity>        
            </View>
            
        </View>
    )        
};

const styles = StyleSheet.create({
    screen:{
        marginTop: 10,
        width: '100%',
        flexDirection: 'column',
        flex: 1
    },
    inputGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    textInput:{
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        fontSize: 15
    },
    fullInput:{
        width: '95%'
    },
    category: {
        borderColor: Colors.accent,
        borderWidth: 4,
        padding: 10,
        width: '48%',
        marginTop: 10,
        marginRight: 10,
        height: 65,
        backgroundColor: Colors.accent,
        shadowColor: Colors.accent,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,       
    },
    categoryText:{
        color:'#0446bf',
        fontSize: 15,
        fontWeight: 'bold',
        letterSpacing: 3
    },
    categoryList:{
        marginVertical: 10,
        marginHorizontal: 10
    },
    modalView: {
        margin: 5,
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
        height: Dimensions.get('window').height/3,
        width: Dimensions.get('window').width - 20
    }, 
    scrollModal:{}, 
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
})

export default CategoryListScreen;