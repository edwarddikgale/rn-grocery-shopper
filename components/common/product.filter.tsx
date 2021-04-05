import React, {useState} from 'react';
import {View, Text, StyleSheet, Dimensions, Button} from 'react-native';
import ProductCategory from '../../models/productCategory';
import CategoryCarousel from '../../screens/common/CategoryCarousel';

const SCREEN_HEIGHT = Dimensions.get('window').height;

const ProductFilter = (props: any) => {

    const all = 'All';
    const [category, setCategory] = useState(props.category || all);
    const [availability, setAvailability] = useState(props.availability || all);
    let categories: ProductCategory[] = [{id:'0', title: 'All'}].concat(props.categories);

    const availabilities = [{id:'-1', title: 'All'}, {id: 0, title: 'Finished'}, {id: 1, title: 'Very Low'}, {id: 2, title: 'Low'}, {id: 3, title: 'Average'},{id: 4, title: 'Full...ish'}, {id: 1, title: 'Full'}]

    const handleCategoryChange = (value: {index:number, title: string}) => {
        console.log('Selected CAT.. ' + JSON.stringify(value))
        setCategory(value.title);
    }

    const handleAvailabilityChange = (value: {index:number, title: string}) => {
        setAvailability(value.title);
        console.log('Selected AVL.. ' + JSON.stringify(value))
    }

    return (
        <View style={styles.container}>
            <Text>AVAILABILITY:</Text>
            <View>
                <CategoryCarousel 
                    categories={availabilities}
                    onSelected={handleAvailabilityChange}
                    
                    isVisible={true}
                />
            </View>
            <View>
                <Text style={styles.selectedSmall}>{availability}</Text>
            </View> 
            <Text>CATEGORY:</Text>
            <View>
                <CategoryCarousel 
                    categories={categories}
                    onSelected={handleCategoryChange}
                    
                    isVisible={true}
                />
            </View>
            <View>
                <Text style={styles.selectedSmall}>{category}</Text>
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
                            title={'  APPLY  '} 
                            onPress={() => props.onApply({availability: availability, category: category})} 
                            />    
                    </View>
            </View> 
        </View>
    )

}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: SCREEN_HEIGHT * 0.75,
        marginTop: 10
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
});

export default ProductFilter;