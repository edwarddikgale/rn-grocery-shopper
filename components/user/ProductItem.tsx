import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import SummaryCircle from '../../components/ui/summary-circle';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import Ionicons from 'react-native-vector-icons/Ionicons';

TimeAgo.addDefaultLocale(en);

const ProductItem = (props: any) => {
    let TouchableComponent: any = TouchableOpacity;
    if(Platform.OS === 'android' && Platform.Version >= 21){
        TouchableComponent = TouchableNativeFeedback
    }

    const showImage = props.showImage? props.showImage: false;
    const prodHeight = showImage? 300: 80;

    const timeAgo = new TimeAgo('en-US');
    console.log('Product:: ' + JSON.stringify(props.item));

    const stockLabel = (stockPerc: any) => {
        let Label = <Text style={styles.stockFinished}> Finished </Text>;

        if(!stockPerc || stockPerc == 0)
            return Label;
        
        if(stockPerc > 0 && stockPerc <= 25)
            Label = <Text style={styles.stockVeryLow}> Very Low </Text>;    

        if(stockPerc > 25 && stockPerc <= 50)
            Label = <Text style={styles.stockLow}> Low </Text>;  
        
        if(stockPerc > 50 && stockPerc <= 75)
            Label = <Text style={styles.stockOk}> OK </Text>; 

        if(stockPerc > 75 && stockPerc <= 99)
            Label = <Text style={styles.stockHealthy}> Healthy </Text>;  

        if(stockPerc > 99)
            Label = <Text style={styles.stockFull}> Full </Text>;  

        return Label;
    }

    return( 
        <View style={{...styles.product, height: prodHeight}}>
            <View style={styles.touchable}>
            <TouchableComponent 
                useForground 
                onPress={() => props.onViewDetails(props.item)}>
                <View>
                    {
                        showImage && 
                        <Image style={styles.image} source={{uri: props.item.imageUrl}} /> 
                    }
                    <View style={styles.textSummary}>
                        <SummaryCircle 
                            style={{marginTop: 5}}
                            letters={props.item.title?.substring(0,1)}
                        />
                        <View style={styles.details}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.title}>{props.item.title}</Text>
                                <Text style={styles.stockPercentage}>
                                    {stockLabel(props.item.stockPercentage)}
                                </Text>
                            </View>
                            <Text style={styles.category}>{props.item.category}</Text>
                            <Text style={styles.price}>
                                € {props.item.price? parseFloat(props.item.price).toFixed(2): ''}
                                ... {props.item.lastUpdated && timeAgo.format(props.item.lastUpdated)}
                            </Text>
                           
                        </View>

                    </View>
                </View>
            </TouchableComponent>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    product:{
        /*shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,*/
        backgroundColor: 'white',
        marginHorizontal: 5,
        padding: 5
    },
    textSummary:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    touchable:{
        borderRadius: 10,
        overflow: 'hidden'
    },
    image:{
        width: '100%',
        height: '60%',
        alignItems: 'center'
    },
    details:{
       width: '100%',
       padding: 10 
    },
    titleContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryCircle:{

    },
    title:{
        fontSize: 17,
        margin: 2,
        fontFamily: 'open-sans-bold',
        fontWeight: 'bold'
    },
    category:{
        fontSize: 13,
        color: 'gray',
        fontFamily: 'open-sans',
        marginLeft: 2
    },
    price:{
        fontSize: 13,
        color: 'gray',
        fontFamily: 'open-sans',
        marginLeft: 2
    },
    actions:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginTop: 5
    },
    stockPercentage:{
        fontFamily: 'open-sans',
        marginRight: 30,
        marginTop: 5,
        width: 75 ,
        borderRadius: 10,
        overflow: 'hidden',
        padding: 1,
        backgroundColor: 'transparent'
    },
    stockFinished:{
        backgroundColor: 'red',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
    },
    stockVeryLow:{
        backgroundColor: 'pink',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase', 
    },
    stockLow:{
        backgroundColor: 'yellow',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase', 
    },
    stockOk:{
        backgroundColor: 'orange',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase', 
    },
    stockHealthy:{
        backgroundColor: 'blue',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase', 
    },
    stockFull:{
        backgroundColor: 'green',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',       
    }
});

export default ProductItem;