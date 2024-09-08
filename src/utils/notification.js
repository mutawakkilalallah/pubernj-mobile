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
const notifSuccessCustom = async (nama, type) => {
  showMessage({
    message: `Selamat ! ${nama}`,
    description: `Telah berhasil menuntaskan (${type})`,
    type: 'success',
    icon: 'success',
    duration: 2000,
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
const notifErrorCustom = async (err, code = null) => {
  const status = code ?? err?.response?.status ?? 500;
  let title = '';
  let description = '';

  switch (status) {
    case 400:
      title = 'Permintaan Nggak Jelas, Ya Dek Ya!';
      description = 'Ada yang salah, coba cek lagi.';
      break;
    case 404:
      title = 'Nggak Ketemu Nih, Ya Dek Ya!';
      description = 'Yang dicari nggak ada, coba cek lagi.';
      break;
    case 401:
      title = 'Nggak Boleh Masuk, Ya Dek Ya!';
      description = 'Login dulu untuk melanjutkan.';
      await AsyncStorage.clear();
      break;
    case 403:
      title = 'Nggak Diizinin Nih, Ya Dek Ya!';
      description = 'Kamu nggak punya izin untuk akses ini.';
      break;
    case 500:
    default:
      title = 'Servernya Error, Ya Dek Ya!';
      description = 'Ada masalah di server, coba lagi nanti.';
      break;
  }

  showMessage({
    message: title,
    description: description,
    type: 'danger',
    icon: 'danger',
    duration: 2000,
  });
};

export {notifError, notifSuccess, notifErrorCustom, notifSuccessCustom};
