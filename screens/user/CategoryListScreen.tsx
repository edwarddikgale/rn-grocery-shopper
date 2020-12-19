import React, { useState, useEffect } from 'react';
import {View, Text, TextInput, StyleSheet, Button, FlatList, Modal, Alert, TouchableHighlight} from 'react-native';
import UserProductsScreen from './UserProductsScreen';
import LocalCache from '../../utils/local.cache';
import { IProductCategory } from '../../models/product';
import CategoryUpdate from '../../components/user/CategoryUpdate';

const EditCategoryScreen = (props: any) => {

    const [categories, setCategories] = useState<IProductCategory[]>([]);
    //const [category, setCategory] = useState<IProductCategory>({} as IProductCategory);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [user, setUser] = useState<firebase.User>({} as unknown as firebase.User);
    let cachedUser = {} as firebase.User;

    LocalCache.getData('user').then(data=> {
        cachedUser = data as firebase.User; 
        setUser(cachedUser);
    })
    

    const onAddCategoryHandler = (category: IProductCategory) => { 
        
        //setCategory(data);
        const matches = categories.filter(cat => cat.title === category.title);
        if(!category || !category.title || category.title.length == 0) return;

        const newId: string = Math.floor(Math.random() * 10000).toString();
        const newCat: IProductCategory = {...category, id:newId};

        setCategories(categories => categories.concat([newCat]));
        //setCategory({} as IProductCategory);
        setModalVisible(false);
    }

    const cancelModal = () => { console.log('closing modal...'); setModalVisible(false);}

    const renderItem = (itemData: {item: IProductCategory}) => {
        
        return (
            <View style={styles.category}>
                <Text style={styles.categoryText}>{itemData.item.title}</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>

            <TouchableHighlight
                style={styles.openButton}
                onPress={() => {setModalVisible(modalVisible => !modalVisible);}}
            >
                <Text style={styles.textStyle}> + Add Category</Text>
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
                        <CategoryUpdate 
                            onAdd={onAddCategoryHandler}
                            onCancel={cancelModal}
                        />
                    </View>
                </View>
            </Modal>

            <View style={styles.categoryList}>
                <FlatList 
                    data={categories} 
                    renderItem={renderItem}
                    numColumns={2}
                />    
            </View>
        </View>
    )        
};

const styles = StyleSheet.create({
    screen:{
        margin: 10
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
        borderColor: '#d8dde6',
        borderWidth: 4,
        padding: 10,
        width: '48%',
        marginTop: 10,
        marginRight: 10,
        height: 65,
        backgroundColor: '#d8dde6',
        shadowColor: '#d8dde6',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,       
    },
    categoryText:{
        color:'#0446bf',
        fontSize: 15,
        letterSpacing: 3
    },
    categoryList:{
        marginVertical: 10
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
})

export default EditCategoryScreen;