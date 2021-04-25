import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, Dimensions, Button, Alert, TouchableOpacity, FlatList } from 'react-native';
import Accordion from 'react-native-collapsible-accordion';
import { AntDesign } from '@expo/vector-icons';
import ProductCategory from '../../models/productCategory';
import Colors from '../../constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ProductFilter = (props: any) => {

    const all = 'All';
    const [category, setCategory] = useState(props.category || all);
    const [availability, setAvailability] = useState(props.availability || all);
    const [showCatFilter, setShowCatFilter] = useState(false);
    const [showAvailFilter, setShowAvailFilter] = useState(false);

    const [filterCategories, setFilterCategories] = useState<ProductCategory[]>(props.filterCategories || []);
    const [filterAvailabilities, setFilterAvailabilities] = useState<string[]>(props.filterAvailabilities || []);

    const [categories, setCategories] = useState<ProductCategory[]> ([{id:'0', title: 'All'}].concat(props.categories || []));

    const [availabilities, setAvailabilities] = useState<{id:number, title: string}[]>([{id:-1, title: 'All'}, {id: 0, title: 'Finished'}, {id: 1, title: 'Very Low'}, {id: 2, title: 'Low'}, {id: 3, title: 'Average'},{id: 4, title: 'Full...ish'}, {id: 1, title: 'Full'}]);

    const onToggleCatFilter = (cat: ProductCategory) => { 

        if(filterCategories && filterCategories.includes(cat))
            setFilterCategories(categories => categories.filter(fcat => fcat.id !== cat.id));
        else
            setFilterCategories(categories => categories.concat([cat]));

        setCategories(categories => [...categories]);
    }

    const onToggleAvailFilter = (value: string) => { 
        if(filterAvailabilities && filterAvailabilities.includes(value))
            setFilterAvailabilities(availabilities => availabilities.filter(val => val !== value));
        else
        setFilterAvailabilities(availabilities => availabilities.concat([value]));

        setAvailabilities(availabilities => [...availabilities]);
    }

    const renderCategoryItem = (itemData: {item: ProductCategory}) => {
        const on = filterCategories && filterCategories.find(cat => cat.id === itemData.item.id) != null;

        return (
            <TouchableOpacity onPress={() => onToggleCatFilter(itemData.item)}>
                <View style={on? {...styles.filterItem, ...styles.itemOn}: {...styles.filterItem, ...styles.itemOff}}>
                    <Text style={styles.itemText}>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const renderAvailabilityItem = (itemData: {item: {id: number, title: string}}) => {
        const on = filterAvailabilities && filterAvailabilities.includes(itemData.item.title);

        return (
            <TouchableOpacity onPress={() => onToggleAvailFilter(itemData.item.title)}>
                <View style={on? {...styles.filterItem, ...styles.itemOn}: {...styles.filterItem, ...styles.itemOff}}>
                    <Text style={styles.itemText}>{itemData.item.title}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <View  style={styles.closeBtn}>
                <TouchableOpacity onPress={props.onCancel}>
                    <Ionicons name='ios-close-circle-outline' size={40} />
                </TouchableOpacity>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title || 'Filter Your Stock'}</Text>
            </View>
            <Accordion
                onChangeVisibility={(value: React.SetStateAction<boolean>) => { setShowCatFilter(value) }}
                renderHeader={() => (
                    <View style={styles.wrapDropDownHeader}>
                        <Text style={styles.moreInfoText}>CATEGORIES {filterCategories.length > 0? filterCategories.length: ''}</Text>
                        <AntDesign
                            style={styles.dropIcon}
                            name={!showCatFilter ? 'down' : 'up'}
                        />
                    </View>
                    )}
                    renderContent={() => (
                        <View style={{ marginVertical: 10}}>
                            <FlatList 
                                data={categories} 
                                renderItem={renderCategoryItem}
                                keyExtractor = {item => item.id}
                                numColumns={2}
                            />             
                        </View>
                    )}
            />

            <Accordion
                onChangeVisibility={(value: React.SetStateAction<boolean>) => { setShowAvailFilter(value) }}
                renderHeader={() => (
                    <View style={styles.wrapDropDownHeader}>
                        <Text style={styles.moreInfoText}>AVAILABILITY {filterAvailabilities.length > 0? filterAvailabilities.length: ''}</Text>
                        <AntDesign
                            style={styles.dropIcon}
                            name={!showAvailFilter ? 'down' : 'up'}
                        />
                    </View>
                    )}
                    renderContent={() => (
                        <View style={{ marginVertical: 10}}>
                            <FlatList 
                                data={availabilities} 
                                renderItem={renderAvailabilityItem}
                                keyExtractor = {item => item.title}
                                numColumns={2}
                            />             
                        </View>
                    )}
            />
                
            <View style={styles.inputGroup}>
                <View style={styles.button}>
                    <Button 
                        title={'  CANCEL  '} 
                        color={'red'} 
                        onPress={props.onCancel} /> 
                </View>   
                <View style={styles.button}>
                    <Button 
                        title={'  APPLY  '} 
                        onPress={() => props.onApply({availabilities: filterAvailabilities, categories: filterCategories})} 
                        />    
                </View>
            </View> 
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: SCREEN_WIDTH - 10,
        height: SCREEN_HEIGHT * 0.75,
        marginTop: 10,
        paddingHorizontal: 10
    },
    closeBtn:{
        alignSelf: 'flex-end',
        marginTop: -20,
        marginRight: 10,
        paddingRight: 20,
        fontWeight: 'bold',
        position: 'absolute'
    },
    title:{
        fontWeight: 'bold',
        letterSpacing: 3,
        fontSize: 14,
        textTransform: 'uppercase',
        padding: 5
    },
    titleContainer:{
        marginVertical: 10,
        borderBottomColor: 'gray',
        borderBottomWidth: 1
    },
    selectedSmall:{
        fontSize: 10,
        color: 'red'
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
    wrapDropDownHeader: {
        paddingHorizontal: 10,
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10
    },
    moreInfoText:{
        fontSize: 14,
        fontWeight: 'bold',
        letterSpacing: 4
    },
    dropIcon:{
        fontSize: 16
    },
    filterItem: {
        borderColor: Colors.accent,
        borderWidth: 4,
        padding: 10,
        width: Dimensions.get('window').width/2 - 20,
        marginTop: 10,
        marginRight: 10,
        height: 45,
        backgroundColor: Colors.accent,
        shadowColor: Colors.accent,
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,       
    },
    itemText:{
        color:'#0446bf',
        fontSize: 12,
        letterSpacing: 3
    }, 
    itemOn:{
        borderColor: 'blue',
        borderWidth: 1,
        fontWeight: 'bold'
    },
    itemOff:{
        borderColor: Colors.accent
    }     
});

export default ProductFilter;