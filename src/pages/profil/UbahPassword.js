import React, {useState} from 'react';
import {View, Box, Input, Button} from 'native-base';
import {HeaderPage} from '../../components';
import Loading from '../Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {notifError, notifSuccess} from '../../utils';
import axios from 'axios';
import {apiUrl} from '../../config';
import {showMessage} from 'react-native-flash-message';

const UbahPassword = ({route, navigation}) => {
  const [load, setLoad] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const ubahPassword = async () => {
    if (password.length < 5) {
      showMessage({
        message: `Ops !`,
        description: `Password minimal 5 karakter`,
        type: 'warning',
        icon: 'warning',
        duration: 4000,
      });
    } else if (password != passwordConfirmation) {
      showMessage({
        message: `Ops !`,
        description: `Konfirmasi password tidak sama`,
        type: 'warning',
        icon: 'warning',
        duration: 4000,
      });
    } else {
      setLoad(true);
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      const form = {
        password,
      };
      try {
        const resp = await axios.put(
          `${apiUrl}/user/password/${route.params.uuid}`,
          form,
          {
            headers: {
              'x-auth-token': token,
            },
          },
        );
        notifSuccess(resp);
        setPassword('');
        setPasswordConfirmation('');
        setLoad(false);
      } catch (err) {
        setLoad(false);
        notifError(err);
      }
    }
  };
  return (
    <View flex={1} backgroundColor={'white'}>
      {load && <Loading />}
      <HeaderPage navigation={navigation} title="Ubah Password" />
      <Box m={4}>
        <Input
          placeholder="Password Baru"
          borderWidth={0}
          borderBottomWidth={1}
          borderRadius={0}
          _focus={{backgroundColor: 'white', borderColor: 'muted.300'}}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Input
          placeholder="Konfirmasi Password Baru"
          borderWidth={0}
          borderBottomWidth={1}
          borderRadius={0}
          _focus={{backgroundColor: 'white', borderColor: 'muted.300'}}
          secureTextEntry
          value={passwordConfirmation}
          onChangeText={setPasswordConfirmation}
        />
        <Button colorScheme={'lime'} mt={4} onPress={() => ubahPassword()}>
          SIMPAN
        </Button>
      </Box>
    </View>
  );
};

export default UbahPassword;
