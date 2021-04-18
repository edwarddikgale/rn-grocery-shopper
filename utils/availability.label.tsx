
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
        
        if(stockPerc > 0 && stockPerc <= 15)
            return {label: VeryLow};   

        if(stockPerc > 15 && stockPerc <= 35)
            return {label: Low}; 
        
        if(stockPerc > 35 && stockPerc <= 60)
            return {label: Average}; 

        if(stockPerc > 60 && stockPerc <= 95) 
            return {label: AlmostFull}; 


        if(stockPerc > 99)
            return {label: Full}; 

        return result;
    }
}

export default AvailabilityLabel;
