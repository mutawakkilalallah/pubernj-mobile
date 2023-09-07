import {showMessage} from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {useNavigation} from '@react-navigation/native';

// const navigation = useNavigation();
const notifSuccess = async resp => {
  showMessage({
    message: 'BERHASIL',
    description: resp?.data?.message,
    type: 'success',
    icon: 'success',
    duration: 4000,
  });
};
const notifError = async err => {
  if (err.status === 401) {
    await AsyncStorage.clear();
    // navigation.navigate('Login');
  } else {
    showMessage({
      message: err?.response?.data?.message ?? err?.code ?? 'Ops !',
      description:
        err?.response?.data?.error ?? err.message ?? 'Error tidak dikenal',
      type: 'danger',
      icon: 'danger',
      duration: 4000,
    });
  }
};

export {notifError, notifSuccess};
