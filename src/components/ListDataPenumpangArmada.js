import React, {useEffect, useState} from 'react';
import {
  Badge,
  Box,
  Button,
  HStack,
  Image,
  Spinner,
  Text,
  View,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {apiUrl} from '../config';
import {notifError, notifSuccess} from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome6';
import axios from 'axios';

const ListDataPenumpangArmada = ({
  id,
  niup,
  nama,
  wilayah,
  blok,
  keberangkatan,
}) => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState('');
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState(keberangkatan);

  const absen = ['sysadmin', 'bps'];
  const isAbsen = absen.includes(user.role);

  const getUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(user);
  };

  const handleHadir = async () => {
    setLoad(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    const form = {
      status_keberangkatan: 'di-bus',
    };
    try {
      const resp = await axios.put(
        `${apiUrl}/penumpang/pemberangkatan/${id}`,
        form,
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      setStatus('di-bus');
      setLoad(false);
      notifSuccess(resp);
    } catch (err) {
      setLoad(false);
      notifError(err);
    }
  };

  useEffect(() => {
    const getImage = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      try {
        const resp = await RNFetchBlob.config({
          trusty: true,
        }).fetch('GET', `${apiUrl}/santri/image/${niup}?size=small`, {
          'x-auth-token': token,
        });
        if (resp.info().status === 200) {
          const base64 = await resp.base64();
          const imageBase64 = `data:image/jpeg;base64,${base64}`;
          setImage(imageBase64);
        }
      } catch (err) {
        notifError(err);
      }
    };
    getImage();
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View flex={1}>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        borderBottomWidth={1}
        borderBottomColor={'muted.300'}>
        <HStack alignItems={'center'}>
          {!image ? (
            <Box
              alignItems={'center'}
              backgroundColor={'muted.300'}
              borderRadius={100}
              mr={4}
              h={12}
              w={12}
              justifyContent={'center'}>
              <Spinner color={'lime.900'} size={'lg'} />
            </Box>
          ) : (
            <Image
              source={{uri: image}}
              alt="foto-diri"
              w={12}
              h={12}
              mr={4}
              borderRadius={100}
            />
          )}
          <Box mt={2}>
            <Text fontWeight={'bold'}>{nama}</Text>
            <Text color={'muted.500'}>{wilayah}</Text>
            <Text color={'muted.500'}>{blok}</Text>
            <Badge
              colorScheme={
                status === 'di-asrama'
                  ? 'danger'
                  : status === 'di-bus'
                  ? 'success'
                  : 'warning'
              }
              w={100}
              mt={1}
              mb={2}>
              {status.toUpperCase()}
            </Badge>
          </Box>
        </HStack>
        {isAbsen && (
          <Box alignItems={'center'}>
            {load ? (
              <Button p={2} borderRadius={5} backgroundColor={'muted.300'}>
                <Spinner size={'lg'} color={'lime.900'} />
              </Button>
            ) : (
              <Button
                onPress={() => handleHadir()}
                p={4}
                borderRadius={5}
                colorScheme={'lime'}
                isDisabled={status != 'di-asrama'}>
                <Icon name="stopwatch" size={16} color={'#fff'} />
              </Button>
            )}
          </Box>
        )}
      </HStack>
    </View>
  );
};

export default ListDataPenumpangArmada;
