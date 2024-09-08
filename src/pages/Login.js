import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Box,
  Input,
  Button,
  Pressable,
  HStack,
  Divider,
} from 'native-base';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../config';
import {notifError, notifErrorCustom} from '../utils';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const form = {
      username,
      password,
    };
    try {
      const resp = await axios.post(`${apiUrl}/login`, form);
      await AsyncStorage.setItem('token', JSON.stringify(resp.data.token));
      await AsyncStorage.setItem('user', JSON.stringify(resp.data.data));
      if (resp.data.data.role != 'wilayah' && resp.data.data.role != 'daerah') {
        notifErrorCustom(null, 403);
      } else {
        navigation.replace('Dashboard');
      }
    } catch (err) {
      notifErrorCustom(err);
    }
  };

  return (
    <View backgroundColor={'white'} flex={1} alignItems={'center'}>
      <Box backgroundColor={'white'} width={'100%'} alignItems={'center'}>
        <Image
          source={require('../assets/pkbs.png')}
          alt="logo-puber"
          height={150}
          width={150}
          mt={8}
          mb={8}
        />
      </Box>
      <Text color={'lime.900'} fontSize={24} fontWeight={'bold'}>
        PULANG BERSAMA
      </Text>
      <Text color={'lime.900'} fontSize={14}>
        Pondok Pesantren Nurul Jadid Paiton Probolinggo
      </Text>
      <Box mt={8}>
        <Input
          placeholder="Username"
          width={80}
          mb={4}
          borderColor={'lime.900'}
          _focus={{backgroundColor: 'white', borderColor: 'lime.900'}}
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Password"
          width={80}
          mb={8}
          borderColor={'lime.900'}
          _focus={{backgroundColor: 'white', borderColor: 'lime.900'}}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Button onPress={() => handleLogin()} colorScheme={'lime'}>
          LOGIN
        </Button>
      </Box>
      <Text color={'muted.500'} mt={16}>
        NURUL JADID &copy; 2023 - 2024
      </Text>
      <Text color={'muted.500'}>Mutawakkil Alallah</Text>
      <Text color={'muted.500'} mt={4}>
        v 1.8.12
      </Text>
      <Text
        color={'muted.500'}
        fontSize={12}
        mt={12}
        textAlign={'center'}
        px={8}>
        This application is only for internal use. Registration is only in
        ofiice Pondok Pesantren Nurul Jadid
      </Text>
      <HStack mt={4}>
        <Pressable onPress={() => navigation.navigate('TOR')}>
          <Text underline color={'muted.500'} fontSize={12}>
            Privacy Police
          </Text>
        </Pressable>
        <Text color={'muted.500'} fontSize={12}>
          &nbsp;&nbsp;|&nbsp;&nbsp;
        </Text>
        <Pressable onPress={() => navigation.navigate('SK')}>
          <Text underline color={'muted.500'} fontSize={12}>
            Term Of Service
          </Text>
        </Pressable>
      </HStack>
    </View>
  );
};

export default Login;
