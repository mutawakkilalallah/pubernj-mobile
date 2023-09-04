import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Pressable,
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
import Icon from 'react-native-vector-icons/FontAwesome6';

const PenumpangDetail = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [user, setUser] = useState({});

  const editDrop = ['sysadmin', 'admin', 'wilayah', 'daerah'];
  const isEditDrop = editDrop.includes(user?.role);
  const editSyarat = ['sysadmin', 'admin', 'keuangan', 'wilayah', 'daerah'];
  const isEditSyarat = editSyarat.includes(user?.role);

  const getUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(user);
  };

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/penumpang/${route.params.uuid}`, {
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

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View backgroundColor={'white'} flex={1}>
      <HeaderPage
        title="Detail Penumpang"
        navigation={navigation}
        link="PenumpangList"
      />
      {loading ? (
        <Spinner color={'lime.900'} size={'lg'} mt={2} />
      ) : (
        <ScrollView>
          <Box>
            <ImageDetail niup={data?.santri?.niup} />
            <Box p={4} mb={3} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                BIODATA
              </Text>
              <Divider />
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Nama
                </Text>
                <Text fontSize={'md'}>{data?.santri?.nama_lengkap}</Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Jenis Kelamin
                </Text>
                <Text fontSize={'md'}>
                  {data?.santri?.jenis_kelamin === 'L'
                    ? 'Laki-laki'
                    : 'Perempuan'}
                </Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Tetala
                </Text>
                <Text
                  fontSize={
                    'md'
                  }>{`${data?.santri?.raw?.tempat_lahir}, ${data?.santri?.raw?.tanggal_lahir}`}</Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Kecamatan
                </Text>
                <Text fontSize={'md'}>{data?.santri?.raw?.kecamatan}</Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Kabupaten
                </Text>
                <Text fontSize={'md'}>{data?.santri?.raw?.kabupaten}</Text>
              </HStack>
              <HStack my={2}>
                <Text fontSize={'md'} w={24} color={'muted.500'}>
                  Kota
                </Text>
                <Text fontSize={'md'}>{data?.santri?.raw?.provinsi}</Text>
              </HStack>
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text fontSize={'md'}>NIUP : {data?.santri?.niup}</Text>
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                DOMISILI SANTRI
              </Text>
              <Divider mb={2} />
              {data?.santri?.raw?.domisili_santri && (
                <Box>
                  <Text fontSize={'md'} fontWeight={'bold'}>
                    {data?.santri?.wilayah}
                  </Text>
                  <Text fontSize={'md'}>{data?.santri?.blok}</Text>
                  <Text fontSize={'md'}>
                    {
                      data?.santri?.raw?.domisili_santri[
                        data?.santri?.raw?.domisili_santri?.length - 1
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
              {data?.santri?.raw?.pendidikan && (
                <Box>
                  <Text fontSize={'md'} fontWeight={'bold'}>
                    {
                      data?.santri?.raw?.pendidikan[
                        data?.santri?.raw?.pendidikan?.length - 1
                      ]?.lembaga
                    }
                  </Text>
                  <Text fontSize={'md'}>
                    {
                      data?.santri?.raw?.pendidikan[
                        data?.santri?.raw?.pendidikan?.length - 1
                      ]?.jurusan
                    }
                  </Text>
                </Box>
              )}
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                  TUJUAN PULANG
                </Text>
                {isEditDrop && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate({
                        name: 'UbahDropspot',
                        params: {
                          uuid: data?.santri_uuid,
                          niup: data?.santri?.niup,
                          id: data?.id,
                          drop: data?.dropspot,
                        },
                      })
                    }>
                    <Icon name="edit" size={16} color={'#365314'} />
                  </Pressable>
                )}
              </HStack>
              <Divider mb={2} />
              <Text fontSize={'md'} fontWeight={'bold'}>
                {data?.dropspot?.nama}
              </Text>
              <Text fontSize={'md'}>{data?.dropspot?.area?.nama}</Text>
              <Text
                fontSize={
                  'md'
                }>{`${data?.dropspot?.area?.pic} | ${data?.dropspot?.area?.no_hp}`}</Text>
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                PEMBAYARAN
              </Text>
              <Divider mb={2} />
              <Text fontSize={'md'} fontWeight={'bold'}>
                {`Rp. ${data?.dropspot?.harga}`}
              </Text>
              <Text fontSize={'md'}>{`Rp. ${data?.jumlah_bayar}`}</Text>
              <Badge
                colorScheme={
                  data.status_bayar === 'lunas'
                    ? 'success'
                    : data.status_bayar === 'kurang'
                    ? 'warning'
                    : data.status_bayar === 'lebih'
                    ? 'info'
                    : 'danger'
                }
                w={48}
                mt={1}
                mb={2}>
                {data?.status_bayar?.toUpperCase()}
              </Badge>
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                  PERSYARATAN
                </Text>
                {isEditSyarat && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate({
                        name: 'UbahPersyaratan',
                        params: {
                          uuid: data?.santri_uuid,
                          niup: data?.santri?.niup,
                          user: user,
                          id: data?.id,
                          bps: data?.persyaratan?.lunas_bps,
                          kos: data?.persyaratan?.lunas_kosmara,
                          fa: data?.persyaratan?.tuntas_fa,
                          kamtib: data?.persyaratan?.bebas_kamtib,
                        },
                      })
                    }>
                    <Icon name="edit" size={16} color={'#365314'} />
                  </Pressable>
                )}
              </HStack>
              <Divider mb={2} />
              <Text fontSize={'md'} fontWeight={'bold'}>
                Biaya Pendidikan Santri (BPS)
              </Text>
              <Badge
                colorScheme={
                  data?.persyaratan?.lunas_bps ? 'success' : 'danger'
                }
                w={48}
                mt={1}
                mb={2}>
                {data?.persyaratan?.lunas_bps ? 'LUNAS' : 'BELUM LUNAS'}
              </Badge>
              <Text fontSize={'md'} fontWeight={'bold'}>
                Kos Makan Putra/Putri
              </Text>
              <Badge
                colorScheme={
                  data?.persyaratan?.lunas_kosmara ? 'success' : 'danger'
                }
                w={48}
                mt={1}
                mb={2}>
                {data?.persyaratan?.lunas_kosmara ? 'LUNAS' : 'BELUM LUNAS'}
              </Badge>
              <Text fontSize={'md'} fontWeight={'bold'}>
                Furudhul Ainiyah (FA)
              </Text>
              <Badge
                colorScheme={
                  data?.persyaratan?.tuntas_fa ? 'success' : 'danger'
                }
                w={48}
                mt={1}
                mb={2}>
                {data?.persyaratan?.tuntas_fa ? 'TUNTAS' : 'BELUM TUNTAS'}
              </Badge>
              <Text fontSize={'md'} fontWeight={'bold'}>
                Keamanan dan Ketertiban (KAMTIB)
              </Text>
              <Badge
                colorScheme={
                  data?.persyaratan?.bebas_kamtib ? 'success' : 'danger'
                }
                w={48}
                mt={1}
                mb={2}>
                {data?.persyaratan?.bebas_kamtib ? 'BEBAS' : 'BELUM BEBAS'}
              </Badge>
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                KELUARGA
              </Text>
              <Divider mb={2} />
              {data?.santri?.raw?.keluarga?.map(k => {
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

export default PenumpangDetail;
