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
      backgroundColor={'lime.900'}>
      <Image
        source={require('../assets/puber.png')}
        alt="logo-puber"
        width={260}
        height={130}
      />
    </View>
  );
};

export default SplashSreen;
