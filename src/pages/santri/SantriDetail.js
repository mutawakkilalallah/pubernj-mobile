import {
  Badge,
  Box,
  Divider,
  HStack,
  ScrollView,
  Spinner,
  Text,
  View,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage, ImageDetail} from '../../components';
import {notifError} from '../../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {apiUrl} from '../../config';

const SantriDetail = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/santri/${route.params.uuid}`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setData(resp.data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notifError(err);
    }
  };

  useEffect(() => {
    getData();
  }, [route.params.uuid]);

  return (
    <View backgroundColor={'white'} flex={1}>
      <HeaderPage
        title="Detail Santri"
        navigation={navigation}
        link="SantriList"
      />
      {loading ? (
        <Spinner color={'lime.900'} size={'lg'} mt={2} />
      ) : (
        <ScrollView>
          <Box>
            <ImageDetail niup={data?.niup} />
            <Box p={4} mb={3} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                BIODATA
              </Text>
              <Divider />
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Nama
                </Text>
                <Text fontSize={'md'}>{data?.nama_lengkap}</Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Jenis Kelamin
                </Text>
                <Text fontSize={'md'}>
                  {data?.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                </Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Tetala
                </Text>
                <Text
                  fontSize={
                    'md'
                  }>{`${data?.raw?.tempat_lahir}, ${data?.raw?.tanggal_lahir}`}</Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Kecamatan
                </Text>
                <Text fontSize={'md'}>{data?.raw?.kecamatan}</Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Kabupaten
                </Text>
                <Text fontSize={'md'}>{data?.raw?.kabupaten}</Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Kota
                </Text>
                <Text fontSize={'md'}>{data?.raw?.provinsi}</Text>
              </HStack>
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text fontSize={'md'}>NIUP : {data?.niup}</Text>
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                DOMISILI SANTRI
              </Text>
              <Divider mb={2} />
              {data?.raw?.domisili_santri && (
                <Box>
                  <Text fontSize={'md'} fontWeight={'bold'}>
                    {data?.wilayah}
                  </Text>
                  <Text fontSize={'md'}>{data?.blok}</Text>
                  <Text fontSize={'md'}>
                    {
                      data?.raw?.domisili_santri[
                        data?.raw?.domisili_santri?.length - 1
                      ]?.kamar
                    }
                  </Text>
                </Box>
              )}
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                PENDIDIKAN
              </Text>
              <Divider mb={2} />
              {data?.raw?.pendidikan && (
                <Box>
                  <Text fontSize={'md'} fontWeight={'bold'}>
                    {
                      data?.raw?.pendidikan[data?.raw?.pendidikan?.length - 1]
                        ?.lembaga
                    }
                  </Text>
                  <Text fontSize={'md'}>
                    {
                      data?.raw?.pendidikan[data?.raw?.pendidikan?.length - 1]
                        ?.jurusan
                    }
                  </Text>
                </Box>
              )}
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                KELUARGA
              </Text>
              <Divider mb={2} />
              {data?.raw?.keluarga?.map(k => {
                return (
                  <Box my={2} key={k.id}>
                    <Text fontSize={'md'} fontWeight={'bold'} key={k.id}>
                      {k?.nama_lengkap}
                    </Text>
                    <Text fontSize={'md'} color={'muted.500'} my={2}>
                      {k?.nik}
                    </Text>
                    <Badge colorScheme={'success'} width={'48'} mb={2}>
                      {k?.status_relasi}
                    </Badge>
                    <Divider />
                  </Box>
                );
              })}
            </Box>
          </Box>
        </ScrollView>
      )}
    </View>
  );
};

export default SantriDetail;
