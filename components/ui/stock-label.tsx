import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const TextSize = 10;
const StockLabel = (props:{stockPercentage: number, style?:any}) => {

    const getLabelAndStyle = (stockPerc: any) =>  {
        let result = {style: styles.stockFinished, label: 'Finished'};

        if(!stockPerc || stockPerc == 0)
            return result;
        
        if(stockPerc > 0 && stockPerc <= 25)
            return {style: styles.stockVeryLow, label: 'Very Low'};   

        if(stockPerc > 25 && stockPerc <= 50)
            return {style: styles.stockLow, label: 'Low'}; 
        
        if(stockPerc > 50 && stockPerc <= 75)
            return {style: styles.stockOk, label: 'Average'}; 

        if(stockPerc > 75 && stockPerc <= 99) 
            return {style: styles.stockHealthy, label: 'Full...ish'}; 


        if(stockPerc > 99)
            return {style: styles.stockFull, label: 'Full'}; 

        return result;
    }

    let labelAndStyle = getLabelAndStyle(props.stockPercentage);
    labelAndStyle = {...labelAndStyle, style:{...labelAndStyle.style, ...props?.style}}

    return (
        <Text style={labelAndStyle.style}>{labelAndStyle.label}</Text>
    )
}

const styles = StyleSheet.create({
    stockFinished:{
        backgroundColor: 'red',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        borderRadius: 10,
        fontSize: TextSize,
        paddingLeft: 10   
    },
    stockVeryLow:{
        backgroundColor: 'pink',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        borderRadius: 10,
        fontSize: TextSize,
        paddingLeft: 10    
    },
    stockLow:{
        backgroundColor: 'yellow',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase', 
        borderRadius: 10,
        fontSize: TextSize,
        paddingLeft: 10   
    },
    stockOk:{
        backgroundColor: 'orange',
        color: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        borderRadius: 10,
        fontSize: TextSize,
        paddingLeft: 10    
    },
    stockHealthy:{
        backgroundColor: 'blue',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        borderRadius: 10,
        fontSize: TextSize,
        paddingLeft: 10    
    },
    stockFull:{
        backgroundColor: 'green',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        textTransform: 'uppercase',
        borderRadius: 10,
        fontSize: TextSize,
        paddingLeft: 10   
    }
});

export default StockLabel;