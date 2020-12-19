import React, { ReactPropTypes, useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import Product from '../../models/product';

interface IProps{
   // onAdd: PropTypes.
}

const ProductUpdate = (props: any) => {

    const [product, setProduct] = useState<Product>({} as Product);

    const handleTitleChange = (text: string) => {
        setProduct({...product,title: text, price: product.price || 0});
    }

    const handlePriceChange = (text: string) => {
        setProduct({...product, price: parseFloat(text)});
    }

    return (
        <View>
            <View>
                <TextInput 
                    onChangeText={handleTitleChange}
                    value={product.title}
                    style={{...styles.textInput, ...styles.fullInput}}
                />     
            </View>
            <View>
                <TextInput 
                    onChangeText={handlePriceChange}
                    
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
                        onPress={() => props.onAdd(product)} 
                        disabled={!product || !product.title || product.title.length === 0}
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

export default ProductUpdate;