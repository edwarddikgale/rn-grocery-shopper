import React, { useState } from 'react';
import {View, Text, TextInput, StyleSheet, Button, FlatList, Modal, Alert, TouchableHighlight} from 'react-native';

export interface IProductCategory{
    id: string,
    title: string
}

const EditCategoryScreen = (props: any) => {

    const [categories, setCategories] = useState<IProductCategory[]>([]);
    const [category, setCategory] = useState<IProductCategory>({} as IProductCategory);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const handleTextChange = (text: string) => {
        setCategory({title: text, id: ''});
    }

    const handleOnAdd = () => { 

        const matches = categories.filter(cat => cat.title === category.title);
        if(!category || !category.title || category.title.length == 0) return;

        const newId: string = Math.floor(Math.random() * 10000).toString();
        const newCat: IProductCategory = {...category, id:newId};

        setCategories(categories => categories.concat([newCat]));
        setCategory({} as IProductCategory);
        setModalVisible(false);
    }

    const cancelModal = () => { setModalVisible(false);}

    const renderItem = (itemData: {item: IProductCategory}) => {
        
        return (
            <View style={styles.category}>
                <Text style={styles.categoryText}>{itemData.item.title}</Text>
            </View>
        )
    }

    return (
        <View style={styles.screen}>
            <Text>Edit Category</Text>

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
                        <View>
                            <TextInput 
                                onChangeText={handleTextChange}
                                value={category.title}
                                style={{...styles.textInput, ...styles.fullInput}}
                            />
                            
                        </View>
                        <View style={styles.inputGroup}>
                            <View style={styles.button}>
                                <Button 
                                    title={'  CANCEL  '} 
                                    color={'red'} 
                                    onPress={cancelModal} /> 
                            </View>
                            <View style={styles.button}>
                                <Button 
                                    title={'  ADD +  '} 
                                    onPress={handleOnAdd} 
                                    disabled={!category || !category.title || category.title.length === 0}
                                    />    
                            </View>                           
                        </View>
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
        margin: 40
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
        width: 200
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
        margin: 20,
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
        height: 200
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