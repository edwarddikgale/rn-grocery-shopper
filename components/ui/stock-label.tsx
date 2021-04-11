import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AvailabilityLabel, {Low, VeryLow, Average, AlmostFull, Full, Finished} from '../../utils/availability.label';

const TextSize = 10;
const StockLabel = (props:{stockPercentage: number, style?:any}) => {

    const getLabelAndStyle = (stockPerc: number) =>  {
        let result = {style: styles.stockFinished, label: Finished};
        let availability = AvailabilityLabel.getLabel(stockPerc);

        if(availability.label === Finished)
            return result;
        
        if(availability.label === VeryLow)
            return {style: styles.stockVeryLow, label: availability.label};   

        if(availability.label === Low)
            return {style: styles.stockLow, label: availability.label}; 
        
        if(availability.label === Average)
            return {style: styles.stockOk, label: availability.label}; 

        if(availability.label === AlmostFull) 
            return {style: styles.stockHealthy, label: availability.label}; 

        if(availability.label === Full)
            return {style: styles.stockFull, label: availability.label}; 

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