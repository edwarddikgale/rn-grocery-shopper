import React, { useState } from 'react';
import {View, Text, StyleSheet, Dimensions, SafeAreaView} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import ProductCategory from '../../models/productCategory';

const CategoryCarousel = (props: any) => {

    const SCREEN_WIDTH = Dimensions.get('window').width;
    const CAROUSEL_ITEM_WIDTH = SCREEN_WIDTH/4;
    const CONTENT_OFFSET = 0;

    const isVisible = props.isVisible || false;
    const categories: ProductCategory[] = props.categories;
    const selectedIndex = props.selectedValue? categories.findIndex(cat => cat === props.selectedValue): 1; 
    const [activeSlide, setActiveSlide] = useState(selectedIndex >= 0? selectedIndex : 1);

    const updateSelected = (index: number) => {
      if(props.onSelected){
        props.onSelected({index: index, title: categories[index].title});
      }

      setActiveSlide(index)  
    }

    const renderSlideItem = ({ itemIndex, currentIndex, item, animatedValue }:any) => ( // render every carousel content
        <View style={itemIndex === currentIndex? styles.snapCurrentCarouselItem : styles.snapCarouselItem}>
          <View style={styles.carouselItemTitle}>             
            <Text style={itemIndex === currentIndex? styles.carouselCurrentItemTitleText : styles.carouselItemTitleText}>
              {item.title}
            </Text>
          </View>
          <Text style={styles.descriptionText}>...</Text>
        </View>
      );
    
      return (
          <View>
            {
            isVisible && 
            <SafeAreaView>
              <View style={styles.snapCarousel}>
                  <View style={styles.carouselWrapper}>
                    <SideSwipe
                      index={activeSlide}
                      itemWidth={CAROUSEL_ITEM_WIDTH}
                      style={{ width: SCREEN_WIDTH }}
                      data={categories}
                      contentOffset={CONTENT_OFFSET}
                      onIndexChange={index => updateSelected(index)}
                      renderItem={({ itemIndex, currentIndex, item,  animatedValue }) => renderSlideItem({itemIndex, currentIndex, item,  animatedValue})}
                      useNativeDriver={false}
                    />
                  </View>
              </View>
            </SafeAreaView>
            }
          </View>
         
      );
}    

const styles = StyleSheet.create({
    screen: {

      },
      snapCarousel: {
        paddingBottom: 5,
        paddingTop: 5,
      },
      descriptionText: {
        color: '#000000',
        fontSize: 16,
        paddingVertical: 16,
      },
      carouselWrapper:{

      },
      snapCarouselItem: {
        height: 50,
        width: 150,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 40,
        backgroundColor: '#FFFFFF',
        padding: 10,
        marginHorizontal: 5
      },
      snapCurrentCarouselItem:{
        height: 50,
        width: 150,
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 40,
        backgroundColor: Colors.primary,
        padding: 10,
        fontWeight: 'bold',
        marginHorizontal: 5        
      },
      carouselItemTitle: {
        flexDirection: 'row',
        alignItems: 'center'
      },
      carouselItemTitleText: {
        fontSize: 16,
        color: Colors.primary,
        fontWeight: '600',
        marginLeft: 12,
      },
      carouselCurrentItemTitleText: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '600',
        marginLeft: 12,
      },      
      paginationContainer: {
        paddingVertical: 10,
      },
      dotStyle: {
        backgroundColor: '#FFFFFF',
      },
      card: {
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#402583',
        backgroundColor: '#FFFFFF',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 1,
        borderRadius: 20,
        marginHorizontal: 12,
        marginTop: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
      }
});

export default CategoryCarousel;