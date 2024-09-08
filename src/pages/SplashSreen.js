import {View, Image} from 'native-base';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashSreen = ({navigation}) => {
  const checkAuth = async () => {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      navigation.replace('Login');
    } else {
      navigation.replace('Dashboard');
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkAuth();
    }, 3000);
  }, []);

  return (
    <View
      flex={1}
      justifyContent={'center'}
      alignItems={'center'}
      backgroundColor={'white'}>
      <Image
        source={require('../assets/pkbs.png')}
        alt="logo-puber"
        width={300}
        height={300}
      />
    </View>
  );
};

export default SplashSreen;
