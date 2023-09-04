import React, {useEffect, useState} from 'react';
import {Badge, Box, HStack, Image, Spinner, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {apiUrl} from '../config';
import {notifError} from '../utils';

const ListDataPenumpang = ({niup, nama, dropspot, pembayaran}) => {
  const [image, setImage] = useState('');

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

  return (
    <HStack
      alignItems={'center'}
      borderBottomWidth={1}
      borderBottomColor={'muted.300'}>
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
        <Text color={'muted.500'}>{dropspot}</Text>
        <Badge
          colorScheme={
            pembayaran === 'lunas'
              ? 'success'
              : pembayaran === 'kurang'
              ? 'warning'
              : pembayaran === 'lebih'
              ? 'info'
              : 'danger'
          }
          w={100}
          mt={1}
          mb={2}>
          {pembayaran.toUpperCase()}
        </Badge>
      </Box>
    </HStack>
  );
};

export default ListDataPenumpang;
