import React, {useEffect, useState} from 'react';
import {Box, Spinner, View, Image} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {apiUrl} from '../config';
import {notifError, notifErrorCustom} from '../utils';

const ImageDetail = ({niup}) => {
  const [image, setImage] = useState('');

  useEffect(() => {
    const getImage = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      try {
        const resp = await RNFetchBlob.config({
          trusty: true,
        }).fetch('GET', `${apiUrl}/person/image/${niup}?size=medium`, {
          'X-Auth': token,
        });
        if (resp.info().status === 200) {
          const base64 = await resp.base64();
          const imageBase64 = `data:image/jpeg;base64,${base64}`;
          setImage(imageBase64);
        }
      } catch (err) {
        notifErrorCustom(err);
      }
    };
    getImage();
  }, []);
  return (
    <View>
      {!image ? (
        <Box
          alignItems={'center'}
          backgroundColor={'muted.300'}
          mr={4}
          h={200}
          w={'100%'}
          justifyContent={'center'}>
          <Spinner color={'lime.900'} size={'lg'} />
        </Box>
      ) : (
        <Box backgroundColor={'muted.400'} alignItems={'center'}>
          <Image source={{uri: image}} alt="foto-diri" w={64} h={200} />
        </Box>
      )}
    </View>
  );
};

export default ImageDetail;
