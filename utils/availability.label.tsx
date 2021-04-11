
export const Finished = 'Finished';
export const VeryLow = 'Very Low';
export const Low = 'Low';
export const Average = 'Average';
export const AlmostFull = 'Full...ish';
export const Full = 'Full';

const AvailabilityLabel = {

    getLabel : (stockPerc: any) =>  {
        let result = {label: Finished};

        if(!stockPerc || stockPerc == 0)
            return result;
        
        if(stockPerc > 0 && stockPerc <= 25)
            return {label: VeryLow};   

        if(stockPerc > 25 && stockPerc <= 50)
            return {label: Low}; 
        
        if(stockPerc > 50 && stockPerc <= 75)
            return {label: Average}; 

        if(stockPerc > 75 && stockPerc <= 99) 
            return {label: AlmostFull}; 


        if(stockPerc > 99)
            return {label: Full}; 

        return result;
    }
}

export default AvailabilityLabel;
