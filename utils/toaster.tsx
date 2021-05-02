import Toast from 'react-native-root-toast';

const Toaster = {
    
    toast : (message : string) => {

        let toast = Toast.show(message, {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0
        });

    }

}    

export default Toaster;