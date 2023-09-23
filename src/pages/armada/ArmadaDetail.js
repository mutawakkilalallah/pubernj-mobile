import React, {useEffect, useState} from 'react';
import {HeaderPage, ListDataPenumpangArmada} from '../../components';
import {
  Badge,
  Box,
  Divider,
  FlatList,
  HStack,
  Image,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  View,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';
import {notifError} from '../../utils';
import {apiUrl} from '../../config';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome6';

const ArmadaDetail = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [isBelum, setIsBelum] = useState(false);
  const [image, setImage] = useState('');
  const [data, setData] = useState({});

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/armada/${route.params.id}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setData(resp.data.data);
      if (resp.data.data?.jenis === 'putra') {
        setIsBelum(
          new Date() < new Date(resp.data.data?.dropspot?.jam_berangkat_pa),
        );
      } else if (resp.data.data?.jenis === 'putri') {
        setIsBelum(
          new Date() < new Date(resp.data.data?.dropspot?.jam_berangkat_pi),
        );
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notifError(err);
    }
  };

  useEffect(() => {
    getData();
  }, [route.params.id]);

  useEffect(() => {
    const getImage = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      try {
        if (route.params.user) {
          const resp = await RNFetchBlob.config({
            trusty: true,
          }).fetch(
            'GET',
            `${apiUrl}/santri/image/${route.params.user.niup}?size=small`,
            {
              'x-auth-token': token,
            },
          );
          if (resp.info().status === 200) {
            const base64 = await resp.base64();
            const imageBase64 = `data:image/jpeg;base64,${base64}`;
            setImage(imageBase64);
          } else if (resp.info().status === 401) {
            await AsyncStorage.clear();
            navigation.replace('Login');
          }
        }
      } catch (err) {
        notifError(err);
      }
    };
    getImage();
  }, []);

  return (
    <View flex={1} backgroundColor={'white'}>
      <HeaderPage
        title="Detail Armada"
        navigation={navigation}
        link="ArmadaList"
      />
      {isBelum && (
        <Box alignItems={'center'} bg={'red.500'}>
          <Text color={'white'}>Masih belum tiba waktu keberangkatan !</Text>
        </Box>
      )}
      {!loading && (
        <Box>
          <Box p={2} backgroundColor={'white'} shadow={4}>
            <Text fontWeight={'bold'} fontSize={'md'} color={'muted.500'}>
              Nama Armada
            </Text>
            <Box>
              <Text fontWeight={'bold'} fontSize={'md'}>
                {data?.nama}
              </Text>
            </Box>
            <Divider my={2} />
            <Text
              fontWeight={'bold'}
              fontSize={'md'}
              color={'muted.500'}
              mb={2}>
              Pendamping
            </Text>
            {data?.user ? (
              <Box>
                <HStack alignItems={'center'}>
                  {!image ? (
                    <Box
                      alignItems={'center'}
                      backgroundColor={'muted.300'}
                      mr={4}
                      h={16}
                      w={16}
                      justifyContent={'center'}>
                      <Spinner color={'lime.900'} size={'lg'} />
                    </Box>
                  ) : (
                    <Image
                      source={{uri: image}}
                      alt="foto-diri"
                      w={16}
                      h={16}
                      mr={4}
                    />
                  )}
                  <Box>
                    <Text fontSize={'sm'} color={'muted.500'}>
                      {data?.user?.niup}
                    </Text>
                    <Text fontWeight={'bold'} fontSize={'md'}>
                      {data?.user?.nama_lengkap}
                    </Text>
                    <Text color={'lime.900'}>{data?.user?.no_hp}</Text>
                  </Box>
                </HStack>
              </Box>
            ) : (
              <Badge colorScheme={'danger'}>PENDAMPING BELUM DI TENTUKAN</Badge>
            )}
          </Box>
          <HStack py={2} px={4} backgroundColor={'muted.200'} mt={4} shadow={4}>
            <Icon name="users" color={'#000'} size={16} />
            <Text ml={4}>DATA PENUMPANG ({data?.penumpang?.length})</Text>
          </HStack>
        </Box>
      )}
      {loading ? (
        <Spinner color={'lime.900'} size={'lg'} mt={2} />
      ) : (
        <FlatList
          px={4}
          data={data?.penumpang}
          renderItem={({item}) => (
            <ListDataPenumpangArmada
              id={item?.id}
              niup={item?.santri?.niup}
              nama={item?.santri?.nama_lengkap}
              wilayah={`${item?.santri?.wilayah}`}
              blok={`${item?.santri?.blok}`}
              keberangkatan={item?.status_keberangkatan}
              isBelum={isBelum}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default ArmadaDetail;
