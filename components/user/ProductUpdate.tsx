import React, { ReactPropTypes, useState } from 'react';
import {View, Text, StyleSheet, TextInput, Button, Platform} from 'react-native';
import Product from '../../models/product';
import CustomTextInput from '../ui/custom-text-input';
import CategoryCarousel from '../../screens/common/CategoryCarousel';
import Slider from '@react-native-community/slider';
import Colors from '../../constants/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import ProductCategory from '../../models/productCategory';
import StockLabel from '../ui/stock-label';
import CardInput from '../ui/card-input';
import DeviceInfo from '../../utils/device-info';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EstimatedTimeLabel from '../ui/est-time-label';
import Icon from 'react-native-vector-icons/Ionicons';

interface IProps{
   // onAdd: PropTypes.
}

const ProductUpdate = (props: any) => {

    const [product, setProduct] = useState<Product>(props.product? props.product : {price: 0.00} as Product);
    const [priceText, setPriceText] = useState<string>(product.price? product.price.toString() : '0.00');
    const [showAltAttributes, setShowAltAttributes] = useState<boolean>(false);

    const categories: ProductCategory[] = props.categories;
    const categoryItems = categories.filter(cat => cat.title.length > 0).map((cat:ProductCategory) => { 
        return {
            label: cat.title, 
            value: cat.title,
            icon: () => <Icon name="md-link" size={18} color="#900" />
        }
    });

    const defaultCategory = categoryItems[0];

    const handleTitleChange = (text: string) => { setProduct({...product,title: text}); }

    const handlePriceChange = (text: any) => { 
        //if (/^\d+$/.test(text))
        //if(isNaN(text)){
            setProduct({...product, price: parseFloat(text)}); 
            setPriceText(text);
        //}
    }

    const handleStockChange = (value: number) => { setProduct({...product, stockPercentage: value}); }

    const handleEstLiveDaysChange = (value: number) => { setProduct({...product, estLiveDays: value}); }

    const handleExpiryDaysChange = (value: number) => { setProduct({...product, estExpiryDays: value}); } 

    const handleImageChange  = (url: string) => { setProduct({...product, imageUrl: url}); }

    const handleDescriptionChange  = (text: string) => { setProduct({...product, description: text}); }

    const handleCategoryChange = (category: string) => {
        setProduct({...product, category: category});
    }

    const selectedCategory = categoryItems.find(item => item.value === product.category);

    return (
        <View style={styles.container}>
            
            <CategoryCarousel 
                categories={categories}
                onSelected={handleCategoryChange}
                selectedValue={product.category}
                isVisible={false}
            />
            <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.headerText}>{product.id? 'Update your stock item': 'Create your stock item'}</Text>
                </View>
                <FontAwesome.Button 
                    name="eye-slash" 
                    size={24}  
                    style={styles.altInfoButton}
                    backgroundColor="transparent"
                    color={'black'}
                    onPress={() => setShowAltAttributes(showAltAttributes => !showAltAttributes)}>
                        More info...
                </FontAwesome.Button>           
            </View>
            <View style={styles.inputsContainer}>
                {!showAltAttributes && 
                <View>
                    <View style={{...styles.category, ...(Platform.OS !== 'android' && {zIndex: 10})}}>
                        <Text style={styles.textLabel}>Type: </Text>
                        <DropDownPicker
                            items={categoryItems}
                            defaultValue={selectedCategory? product.category: ''}
                            containerStyle={{height: 40}}
                            style={{backgroundColor: '#fafafa'}}
                            itemStyle={{
                                justifyContent: 'flex-start'
                            }}
                            dropDownStyle={{backgroundColor: '#fafafa'}}
                            onChangeItem={item => handleCategoryChange(item.value)}
                            dropDownMaxHeight={300}
                            zIndex={3000}
                        />
                    </View>
                    <View>
                        <Text style={styles.textLabel}>Name/Title:</Text> 
                        <CustomTextInput 
                            placeholder='Product Name'
                            onChangeText={handleTitleChange}
                            value={product.title}
                        />
                    </View>
                    <View>
                        <Text style={styles.textLabel}>Price/Cost €:</Text> 
                        <CustomTextInput 
                            onChangeText={(text: any) => handlePriceChange(text)}
                            placeholder='Product Price'
                            value={priceText}
                            style={{...styles.textInput, ...styles.fullInput}}
                            keyboardType='decimal-pad'
                        />     
                    </View>

                    <View>
                        <Text style={styles.textLabel}>Description:</Text> 
                        <CustomTextInput 
                            onChangeText={handleDescriptionChange}
                            placeholder='Describe the product...'
                            value={product.description}
                            style={{...styles.textInput, ...styles.fullInput}}
                            maxLength={1024}
                        />     
                    </View>
                    <View style={styles.value}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.textLabel}>Remaining:</Text>
                            <StockLabel stockPercentage={product.stockPercentage} style={{fontSize: 10, width: 160, marginRight: 0}} />
                        </View>
                        <Slider
                            style={styles.valueSlider}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor="green"
                            maximumTrackTintColor="red"
                            onValueChange={handleStockChange}
                            value={product.stockPercentage? product.stockPercentage: 0}
                            
                        />
                    </View>
                </View>
                }
                {
                showAltAttributes &&
                <View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.prodTitle}>{product.title}</Text>
                    </View>
                    <View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.textLabel}>
                                Runs-out in:
                            </Text> 
                            <EstimatedTimeLabel days={product.estLiveDays} style={{fontSize: 10, width: 160, marginRight: 0}} />
                        </View>   
                        <View style={styles.cardInputs}>
                            <Slider
                                style={styles.valueSlider}
                                minimumValue={0}
                                maximumValue={32}
                                minimumTrackTintColor="green"
                                maximumTrackTintColor="red"
                                onValueChange={handleEstLiveDaysChange}
                                value={product.estLiveDays? product.estLiveDays: 0}              
                            />
                        </View>
                    </View>
                    <View>
                        <View style={styles.inputGroup}>
                            <Text style={styles.textLabel}>
                                Expires within:
                            </Text> 
                            <EstimatedTimeLabel days={product.estExpiryDays} style={{fontSize: 10, width: 160, marginRight: 0}} />
                        </View>   
                        <View style={styles.cardInputs}>
                            <Slider
                                style={styles.valueSlider}
                                minimumValue={0}
                                maximumValue={32}
                                minimumTrackTintColor="green"
                                maximumTrackTintColor="red"
                                onValueChange={handleExpiryDaysChange}
                                value={product.estExpiryDays? product.estExpiryDays: 0}              
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.textLabel}>
                            Image url/link:
                        </Text> 
                        <CustomTextInput 
                            onChangeText={handleImageChange}
                            placeholder='http://...'
                            value={product.imageUrl}
                            style={{...styles.textInput, ...styles.fullInput}}
                            maxLength={1024}
                        />     
                    </View>                    
                </View>
                }
                <View style={styles.inputGroup}>
                    <View style={styles.button}>
                        <Button 
                            title={'  CANCEL  '} 
                            color={'red'} 
                            onPress={props.onCancel} /> 
                    </View>
                    {
                        !product.id &&    
                        <View style={styles.button}>
                            <Button 
                                title={'  ADD +  '} 
                                onPress={() => props.onAdd(product)} 
                                disabled={!product || !product.title || product.title.length === 0}
                                />    
                        </View>
                    }
                    {
                        product.id &&  
                        <View style={styles.button}>
                        <Button 
                            title={'  UPDATE  '} 
                            onPress={() => props.onUpdate(product)} 
                            disabled={!product || !product.title || product.title.length === 0}
                            />    
                        </View>  
                    }
                </View>                          
            </View>            
        </View>   
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%'
    },
    inputsContainer:{
        marginRight: 10,
        width: '99%'
    },
    textInput:{
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        fontSize: 15
    },
    fullInput:{
        width: '100%'
    },
    inputGroup:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    button:{
        marginVertical: 10,
        marginHorizontal: 5,
        width: '45%'
    },
    category:{
        margin: 10,
        marginLeft: 0
    },
    categoryText:{
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'uppercase',
        letterSpacing: 2,
        marginLeft: 12
    },
    value:{

    },
    valueSlider: {
        width: '100%', 
        height: 30, 
        marginTop: 10, 
        fontSize: 20,
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100
        
    },
    sliderThumb: {
        width: 50,
        height: 80,
        backgroundColor: Colors.primary,
        borderBottomRightRadius: 100,
        borderTopRightRadius: 100,

    },
    sliderTrack:{
        height: 80,
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
    },
    textLabel:{
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    prodTitle:{
        color: 'gray',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    cardInputs:{
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    headerContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    headerText:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: 'gray'
    },
    altInfoButton:{
        marginRight: 0,
        marginTop: -10,
        overflow: 'hidden',
        backgroundColor: 'transparent',
        justifyContent: 'center',
    }
});

export default ProductUpdate;