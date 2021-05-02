import React, {useCallback, useEffect, useState} from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { IAppState } from '../../store/state/app.state';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.actions';
import * as productActions from '../../store/actions/products.actions';
import * as categoryActions from '../../store/actions/product.category.actions';
import HeaderButton from '../../components/ui/header-button';
import {DrawerActions} from 'react-navigation-drawer';
import LocalCache from '../../utils/local.cache';
import { CardItem } from '../../models/cart-item';
import { Modal } from 'react-native';
import ProductFilter from '../../components/common/product.filter';
import DeviceInfo from '../../utils/device-info';
import ProductCategory from '../../models/productCategory';
import Product from '../../models/product';
import AvailabilityLabel from '../../utils/availability.label';
import Colors from '../../constants/Colors';
import Toaster from '../../utils/toaster';

const ProductsOverviewScreen = (props:any) =>{
    const {navigation} = props;
    const totalItems = useSelector((state:IAppState) => state.cart.count);
    
    const products = useSelector((state: IAppState) => state.products.userProducts);
    const categories = useSelector((state: IAppState) => state.categories.categories);
    const cartItemCount = useSelector((state: IAppState) => state.cart.count); 
       
    const [filterCategories, setFilterCategories] = useState<ProductCategory[]>([]);
    const [filterAvailabilities, setFilterAvailabilities] = useState<string[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>();

    const [userId, setUserId] = useState<string>();    
    const [showAdvancedFilter, setShowAdvancedFilter] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const dispatch = useDispatch();

    const cartItems:CardItem[] = useSelector((state: IAppState) => {

        let cartItemArr: CardItem[] = [];
        for(const key in state.cart.items){
            const cartItem = state.cart.items[key];
            cartItemArr.push({
                productId: key,
                price: cartItem.price,
                title: cartItem.title,
                total: cartItem.total,
                quantity: cartItem.quantity,
                id: cartItem.id,
                confirm: cartItem.confirm         
            });
        }

        const sortedCartItems = cartItemArr.sort((a,b) => a.title > b.title? 1: -1);
        return sortedCartItems;
    });

    const sortedProducts = products.sort((a,b) => a.title > b.title? 1: -1);

    const productCartItem = (productId: string): CardItem => {
        const items = cartItems.filter((item: CardItem) => item.productId === productId);
        return items && items.length > 0 ? items[0]: undefined as unknown as CardItem;
    }

    
    sortedProducts.forEach(prod => {
        const prodCartItem = productCartItem(prod.id);
        if(prodCartItem){
            prod.cartQuantity = prodCartItem.quantity;
            prod.cartId = prodCartItem.id;
        }
    });

    let user: firebase.User;
    LocalCache.getData('user').then(data => {
        user = data;
        setUserId(user.uid);
    });

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
    
    const toggleAdvancedFilter = () => {
        setShowAdvancedFilter(showAdvancedFilter => !showAdvancedFilter);
    }

    useEffect(() => {
        if(userId) dispatch(productActions.getProducts(userId, {}));
        if(userId && totalItems === 0) dispatch(cartActions.getCart(userId));
        if(userId && (!categories || categories.length == 0))
            dispatch(categoryActions.getProductCategories(userId, {}));           

    }, [userId]); 
    
    
    useEffect(() =>
        {
            navigation.setParams({
                cartLength: cartItemCount
            });
        }
    , [cartItemCount]);

    useEffect(() => {
        setFilteredProducts([...sortedProducts]);
        navigation.setParams({
            toggleAdvancedFilter: () => toggleAdvancedFilter(),
            productCount: products.length 
        });
    }, [sortedProducts]);

    return( 
        <View>
            <FlatList 
                data={filteredProducts} 
                keyExtractor = {item => item.id}
                renderItem={itemData =>
                    <ProductItem 
                        item={itemData.item}
                        cartItem={productCartItem(itemData.item.id)}
                        showImage={true}
                        onViewDetails={() => { 
                            props.navigation.navigate('ProductDetails', {
                                product: JSON.stringify(itemData.item),
                                productTitle: itemData.item.title
                            })}
                        }
                        onAddToCart={()=> {
                            dispatch(cartActions.addToCart(user.uid, itemData.item));
                            Toaster.toast(itemData.item.title + ' added to cart');
                        }}                
                    />
                }
                numColumns={DeviceInfo.isIpad()? 2: 1} 
            />
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
        </View>  
    )    
}

ProductsOverviewScreen.navigationOptions = (navData: any) => {

    const productCount = navData.navigation.getParam('productCount');
    const cartLength = navData.navigation.getParam('cartLength');
    const toggleAdvancedFilter = navData.navigation.getParam('toggleAdvancedFilter');

    return {
        headerTitle: `${productCount || ''} Products`,
        headerRight: () => <HeaderButtons 
                HeaderButtonComponent={HeaderButton}> 
                <Item 
                    title='filter' 
                    iconName={'ios-options'}
                    color={Colors.primary}
                    onPress={() => { toggleAdvancedFilter() }}
                />   
                <Item 
                    title='cart' 
                    iconName={'md-cart'} 
                    onPress={() => {
                        navData.navigation.navigate('Cart');
                    }}
                />
                <Text style={{color: 'white', fontSize: 10}}>{cartLength}</Text>
            </HeaderButtons>,
        headerLeft : () => <HeaderButtons 
                HeaderButtonComponent={HeaderButton}>

                <Item 
                    title='Menu' 
                    iconName={'md-menu'} 
                    onPress={() => {
                        navData.navigation.dispatch(DrawerActions.toggleDrawer());
                        //console.log(navData.navigation);
                        //navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>     
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }, 
    scrollModal:{

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
        height: DeviceInfo.screenHeight() * 0.75,
        width: DeviceInfo.screenWidth() - 10
    },
})

export default ProductsOverviewScreen;