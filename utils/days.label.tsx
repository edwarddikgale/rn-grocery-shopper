
export const None = '';
export const Days = 'Days';
export const Weeks = 'Weeks';
export const Months = 'Months';
export const Years = 'Years';

const DaysLabel = {

    getLabel : (days: number) =>  {
        let result = {label: None};

        if(!days || days == 0)
            return result;
      
        if(days >= 1 && days <= 7)
            return {label: Days}; 
        
        if(days > 7 && days <= 31)
            return {label: Weeks}; 

        if(days > 31 && days <= 365) 
            return {label: Months}; 


        if(days > 365)
            return {label: Years}; 

        return result;
    }
}

export default DaysLabel;
