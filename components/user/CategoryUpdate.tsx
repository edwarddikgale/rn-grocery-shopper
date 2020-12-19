import React, { ReactPropTypes, useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import { IProductCategory } from '../../models/product';

interface IProps{
   // onAdd: PropTypes.
}

const CategoryUpdate = (props: any) => {

    const [category, setCategory] = useState<IProductCategory>({} as IProductCategory);
    const handleTextChange = (text: string) => {
        setCategory({title: text, id: ''});
    }

    return (
        <View>
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
                        onPress={props.onCancel} /> 
                </View>
                <View style={styles.button}>
                    <Button 
                        title={'  ADD +  '} 
                        onPress={() => props.onAdd(category)} 
                        disabled={!category || !category.title || category.title.length === 0}
                        />    
                </View>                           
            </View>
        </View>   
    )
}

const styles = StyleSheet.create({
    textInput:{
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        fontSize: 15
    },
    fullInput:{
        width: '95%'
    },
    inputGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    button:{
        margin: 5
    }
});

export default CategoryUpdate;