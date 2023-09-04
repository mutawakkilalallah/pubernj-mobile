import React, {useEffect, useState} from 'react';
import {Badge, Box, Button, HStack, Image, Spinner, Text} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {apiUrl} from '../config';
import {notifError} from '../utils';
import Icon from 'react-native-vector-icons/FontAwesome6';

const ListDataPenumpangArmada = ({
  niup,
  nama,
  wilayah,
  blok,
  keberangkatan,
}) => {
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
              keberangkatan === 'di-asrama'
                ? 'danger'
                : keberangkatan === 'di-bus'
                ? 'danger'
                : 'warning'
            }
            w={100}
            mt={1}
            mb={2}>
            {keberangkatan.toUpperCase()}
          </Badge>
        </Box>
      </HStack>
      <Box alignItems={'center'}>
        <Button p={4} borderRadius={5} colorScheme={'lime'}>
          <Icon name="stopwatch" size={16} color={'#fff'} />
        </Button>
      </Box>
    </HStack>
  );
};

export default ListDataPenumpangArmada;
