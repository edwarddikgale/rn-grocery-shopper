import { Dimensions } from 'react-native';

const DeviceInfo = {

    isIpad: () => {
        const {height, width} = Dimensions.get('window'); 
        const aspectRatio = height/width;

        return aspectRatio <= 1.6;
    },

    screenWidth: () => {
        const {width}  = Dimensions.get('window');
        return width;
    },

    screenHeight: () => {
        const {height}  = Dimensions.get('window');
        return height;
    }
} 

export default DeviceInfo;