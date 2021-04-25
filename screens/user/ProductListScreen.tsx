import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, FlatList, Modal, TouchableHighlight, TouchableOpacity, Dimensions, ScrollView, TouchableWithoutFeedback, Animated, Platform} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/user/ProductItem';
import { IAppState } from '../../store/state/app.state';
import ProductUpdate from '../../components/user/ProductUpdate';
import Product from '../../models/product';
import * as actions from '../../store/actions/products.actions';
import * as categoryActions from '../../store/actions/product.category.actions';
import LocalCache from '../../utils/local.cache';
import { FloatingAction, IActionProps } from "react-native-floating-action";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../constants/Colors';
import CustomTextInput from '../../components/ui/custom-text-input';
import HiddenItemWithActions from '../common/HiddenItemWithActions';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/ui/header-button';
import {DrawerActions} from 'react-navigation-drawer';
import Card from '../../components/ui/card';
import ProductFilter from '../../components/common/product.filter';
import AvailabilityLabel from '../../utils/availability.label';
import ProductCategory from '../../models/productCategory';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ProductListScreen = (props: any) => {

    const {navigation} = props;

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [showAdvancedFilter, setShowAdvancedFilter] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>('');
    const [userId, setUserId] = useState<string>();
    const [product, setProduct] = useState<Product>({price: 0.00} as Product);
    
    const [filterCategories, setFilterCategories] = useState<ProductCategory[]>([]);
    const [filterAvailabilities, setFilterAvailabilities] = useState<string[]>([]);

    const products = useSelector((state: IAppState) => state.products.userProducts);
    const categories = useSelector((state: IAppState) => state.categories.categories);

    const floatBtnActions: IActionProps[] | undefined = [];
    const sortedProducts = products.sort((a,b) => a.title > b.title? 1: -1);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>();
    const sortedCategories = categories.sort ((a,b) => a.title > b.title? 1: -1);

    const dispatch = useDispatch();

    let user: firebase.User;
    LocalCache.getData('user').then(data => { 
        user = data;   
        setUserId(user.uid);
    });

    useEffect(() => {
        if(userId) dispatch(actions.getProducts(userId, {}));
        if(userId && (!categories || categories.length == 0))
            dispatch(categoryActions.getProductCategories(userId, {}));

    }, [userId]);  

    useEffect(() => {
        setFilteredProducts([...sortedProducts]);
        navigation.setParams({
            toggleFilter:  () => toggleFilter(),
            toggleAdvancedFilter: () => toggleAdvancedFilter(),
            productCount: products.length 
        });
    }, [sortedProducts]);
    
    const cancelModal = () => { setModalVisible(false);}

    const onAddNewProduct = () => {
        setModalVisible(modalVisible => !modalVisible);
        setProduct({} as Product);
    }

    const onAddProdHandler = (product: Product) => {
        if(userId){        
            dispatch(actions.addProduct(userId, product));
            setModalVisible(false);
        }
    }

    const onUpdateProdHandler = (product: Product) => {

        if(userId && product.id){
            dispatch(actions.updateProduct(userId, product));
            setModalVisible(false);            
        }
    }

    const onApplyAdvFiter = (filters: {availabilities: string[], categories: ProductCategory[]}) => {

        const products = [...sortedProducts];
        setFilterAvailabilities(filters.availabilities);
        setFilterCategories(filters.categories);

        setFilteredProducts(products.filter(product => 
            (
                ((!filters.categories  || filters.categories.length == 0) || (filters.categories.length === 1 && filters.categories[0].title.toLowerCase() === 'all')) 
                || 
                (filters.categories && product.category && filters.categories.filter(fcat => product.category.toLowerCase().indexOf(fcat.title.toLowerCase()) >= 0).length > 0)
            )
            &&
            (
                ((!filters.availabilities  || filters.availabilities.length == 0) || (filters.availabilities.length === 1 && filters.availabilities[0].toLowerCase() === 'all')) 
                || 
                (filters.availabilities && filters.availabilities.filter(aLabel => AvailabilityLabel.getLabel(product.stockPercentage).label === aLabel).length > 0)
            )
        ));  
        
        setShowAdvancedFilter(false);
    }

    const onViewDetails = (product: Product) => {
        setProduct(product);
        setModalVisible(true);
    }

    const onLeftAction = (rowKey:string) => {
        //console.log('onLeftAction', rowKey);
    };

    const handleFilter = (text: string) => {

        setFilterText(text);
        if(!text || text.length === 0){
            setFilteredProducts([...sortedProducts]);
            return;
        }

        const filterText = text.toLowerCase();
        const products = [...sortedProducts];
        setFilteredProducts(products.filter(product => 
            product.title.toLowerCase().indexOf(filterText) >= 0
            || product.category?.toLowerCase().indexOf(filterText) >= 0
        ));

    }

    const toggleFilter = () => {
        setShowFilter(showFilter => !showFilter);
    }

    const toggleAdvancedFilter = () => {
        setShowAdvancedFilter(showAdvancedFilter => !showAdvancedFilter);
    }

    const closeRow = (rowMap: any, rowKey: string) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap: any, rowKey: string) => {
        closeRow(rowMap, rowKey);
        if(userId){
            const product = products.filter(prod => prod.id === rowKey)[0];
            dispatch(actions.deleteProduct(userId, product));
        }
    };

    const renderHiddenItem = (itemData: {item: Product}, rowMap: any) => {

        const rowActionAnimatedValue = new Animated.Value(75);
        const rowHeightAnimatedValue = new Animated.Value(50);
        
        return(
            <HiddenItemWithActions
                data={itemData}
                rowMap={rowMap}
                rowActionAnimatedValue={rowActionAnimatedValue}
                rowHeightAnimatedValue={rowHeightAnimatedValue}
                onClose={() => closeRow(rowMap, itemData.item.id)}
                onDelete={() => deleteRow(rowMap, itemData.item.id)}
            />
        );    
    };

    const renderItem = (itemData: {item: Product}) => {
        return (
            <ProductItem 
                item={itemData.item}
                showImage={false}
                onViewDetails={onViewDetails}               
            />       
        )
    }

    return (
        <View style={styles.screen}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => { setModalVisible(false)}}          
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
                                <ProductUpdate 
                                    categories={sortedCategories}
                                    product={product}
                                    onAdd={onAddProdHandler}
                                    onUpdate={onUpdateProdHandler}
                                    onCancel={cancelModal}
                                />

                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>
                          
            </Modal>
            
            {
            showAdvancedFilter &&    
            <Modal
                animationType="slide"
                transparent={true}
                visible={showAdvancedFilter}
                onRequestClose={() => { setShowAdvancedFilter(false)}}>
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
                                <ProductFilter 
                                    categories = {categories}
                                    filterCategories = {filterCategories}
                                    filterAvailabilities = {filterAvailabilities}
                                    onCancel = {() => { setShowAdvancedFilter(false)}}
                                    onApply = {onApplyAdvFiter}    
                                />
                             </View> 
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </TouchableOpacity>   

            </Modal> 
            }    

            <View style={styles.productList}>
                {
                    showFilter && 
                    <Card>
                        <CustomTextInput 
                            onChangeText={handleFilter}
                            placeholder='Search products ...'
                            value={filterText}
                            style={{borderBottomColor: 'gray'}}
                        />     
                    </Card>
                }
                <SwipeListView 
                    data={filteredProducts} 
                    keyExtractor = {item => item.id}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    useNativeDriver={false}
                    onLeftAction={onLeftAction}
                    leftOpenValue={75}
                    rightOpenValue={-150}
                    leftActivationValue={100}
                    rightActivationValue={-200}
                    leftActionValue={0}
                    rightActionValue={-500} 
                />
            </View>

            <View style={styles.floatButton}>
                <TouchableOpacity onPress={() => onAddNewProduct()} activeOpacity={.5} >
                    <Ionicons name='ios-add' size={40} />
                </TouchableOpacity>        
            </View>

        </View>
    )    
};

ProductListScreen.navigationOptions = (navData: any) => {

    const productCount = navData.navigation.getParam('productCount');
    const toggleFilter = navData.navigation.getParam('toggleFilter');
    const toggleAdvancedFilter = navData.navigation.getParam('toggleAdvancedFilter');

    //const title = `Products (${cartItemCount} in Cart)`;
    return ({
        headerTitle: `Manage ${productCount || ''} Products `,
        headerStyle:{
            backgroundColor: Platform.OS === 'android'? Colors.primary: ''
        },
        headerTintColor: Platform.OS === 'android'? 'white': Colors.primary,
        headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                                <Item 
                                    title='filter' 
                                    iconName={'ios-options'}
                                    color={Colors.primary}
                                    onPress={() => { toggleAdvancedFilter() }}
                                />
                                <Item 
                                    title='search' 
                                    iconName={'ios-search'}
                                    color={Colors.primary}
                                    onPress={() => { toggleFilter();}}
                                />
                            </HeaderButtons>,
        headerLeft : () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item 
                                title='Menu' 
                                iconName={'md-menu'} 
                                color={Colors.primary}
                                onPress={() => {
                                    navData.navigation.dispatch(DrawerActions.toggleDrawer());
                                    //console.log(navData.navigation);
                                    //navData.navigation.toggleDrawer();
                                }}
                                />
                        </HeaderButtons>                      
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
        marginBottom: 20
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
        height: SCREEN_HEIGHT * 0.75,
        width: SCREEN_WIDTH - 10
    },
    scrollModal:{

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
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },     
});  

export default ProductListScreen;