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
import {notifError} from '../utils';

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
      navigation.replace('Dashboard');
    } catch (err) {
      notifError(err);
    }
  };

  return (
    <View backgroundColor={'white'} flex={1} alignItems={'center'}>
      <Box backgroundColor={'lime.900'} width={'100%'} alignItems={'center'}>
        <Image
          source={require('../assets/puber.png')}
          alt="logo-puber"
          width={200}
          height={100}
          mt={8}
          mb={16}
          opacity={0.4}
        />
      </Box>
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
        NURUL JADID &copy; 2023
      </Text>
      <Text color={'muted.500'}>Mutawakkil Alallah</Text>
      <Text color={'muted.500'} mt={4}>
        v 1.1.0
      </Text>
      {/* <Box
        mt={4}
        backgroundColor={'red.500'}
        py={1}
        px={16}
        borderRadius={4}
        alignItems={'center'}>
        <Text color={'white'}>Beta v.1.05.23</Text>
        <Text color={'white'} fontWeight={'black'}>
          Non Official Release
        </Text>
        <Text color={'white'} fontStyle={'italic'}>
          For development only
        </Text>
      </Box> */}
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
