import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AvailabilityLabel, {Low, VeryLow, Average, AlmostFull, Full, Finished} from '../../utils/availability.label';

const TextSize = 8;
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
    labelAndStyle = {...labelAndStyle, style:{...labelAndStyle.style,...styles.labelContainer, ...props?.style}}

    return (
        <View style={labelAndStyle.style}>
            <Text style={{...labelAndStyle.style, ...styles.labelText}}>{labelAndStyle.label}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    labelText:{
        fontSize: TextSize,
        fontWeight: 'bold',
        paddingLeft: 10
    },
    labelContainer:{
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textTransform: 'uppercase', 
        borderRadius: 20,
        fontSize: TextSize,
        paddingVertical: 1  
    },
    stockFinished:{
        backgroundColor: 'red',
        color: 'white' 
    },
    stockVeryLow:{
        backgroundColor: 'pink',
        color: 'black'
    },
    stockLow:{
        backgroundColor: 'yellow',
        color: 'black' 
    },
    stockOk:{
        backgroundColor: 'orange',
        color: 'black'  
    },
    stockHealthy:{
        backgroundColor: 'blue',
        color: 'white'
    },
    stockFull:{
        backgroundColor: 'green',
        color: 'white'
    }
});

export default StockLabel;