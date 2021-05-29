import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import DaysLabel, {None, Days, Weeks, Months, Years} from '../../utils/days.label';

const TextSize = 10;
const EstimatedTimeLabel = (props:{days: number, style?:any}) => {

    const getLabelAndStyle = (days: number) =>  {
        let result = {style: styles.none, label: None, value: 'Never'};
        let expDays = DaysLabel.getLabel(days);

        if(expDays.label === None)
            return result;
        
        if(expDays.label === Days)
            return {style: styles.days, label: expDays.label, value: Math.round(days)};   

        if(expDays.label === Weeks)
            return {style: styles.weeks, label: expDays.label, value: Math.round(days/7)}; 
        
        if(expDays.label === Months)
            return {style: styles.months, label: expDays.label, value: Math.round(days/30)}; 

        if(expDays.label === Years) 
            return {style: styles.years, label: expDays.label, value: Math.round(days/365)}; 

        return result;
    }

    let labelAndStyle = getLabelAndStyle(props.days);
    labelAndStyle = {...labelAndStyle, style:{...labelAndStyle.style,...styles.labelContainer, ...props?.style}}

    return (
        <View style={labelAndStyle.style}>
            <View style={styles.rowItems}>
                <Text style={{...labelAndStyle.style, ...styles.labelText}}>
                    {labelAndStyle.value} {labelAndStyle.label}</Text>
                <Icon size={16} name={'md-clock'} />    
            </View>
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
    none:{
        backgroundColor: 'lightgray',
        color: 'black' 
    },
    days:{
        backgroundColor: 'red',
        color: 'white'
    },
    weeks:{
        backgroundColor: 'orange',
        color: 'black' 
    },
    months:{
        backgroundColor: 'yellow',
        color: 'black'  
    },
    years:{
        backgroundColor: 'green',
        color: 'white'
    },
    rowItems:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

export default EstimatedTimeLabel;