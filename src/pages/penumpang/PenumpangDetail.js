import {
  Badge,
  Box,
  Button,
  FlatList,
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
  // const isLayak =
  //   data?.jumlah_bayar >= data?.dropspot?.harga &&
  //   data?.persyaratan?.lunas_bps &&
  //   data?.persyaratan?.lunas_kosmara &&
  //   data?.persyaratan?.tuntas_fa &&
  //   data?.persyaratan?.bebas_kamtib;

  const editDrop = ['sysadmin', 'admin', 'wilayah', 'daerah'];
  const isEditDrop = editDrop.includes(user?.role);
  const editSyarat = [
    'sysadmin',
    'admin',
    'keuangan',
    'bps',
    'wilayah',
    'daerah',
  ];
  const isEditSyarat = editSyarat.includes(user?.role);

  const getUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(user);
  };

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/santri/${route.params.uuid}`, {
        headers: {
          'X-Auth': token,
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
        link="Dashboard"
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
              {/* <Badge colorScheme={isLayak ? 'success' : 'danger'} mt={4}>
                <Text>{!isLayak && <Text>BELUM </Text>}BERHAK PULANG</Text>
              </Badge> */}
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text fontSize={'md'}>NIUP : {data?.niup}</Text>
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                PERSYARATAN
              </Text>
              <Divider mb={2} />
              {data?.persyaratan?.map((sp, index) => (
                <Box key={index}>
                  <Text fontSize={'md'} fontWeight={'bold'}>
                    {sp?.ketuntasan.nama} ({sp?.ketuntasan.alias})
                  </Text>
                  <Text fontSize={'md'}>
                    {sp.ketuntasan?.penjab.toUpperCase()}
                  </Text>
                  <Badge
                    colorScheme={sp.status ? 'success' : 'danger'}
                    mb={2}
                    mt={2}>
                    <Text>
                      {sp.status ? (
                        <Text>{sp.ketuntasan.statusTrue.toUpperCase()}</Text>
                      ) : (
                        <Text>{sp.ketuntasan.statusFalse.toUpperCase()}</Text>
                      )}
                    </Text>
                  </Badge>
                </Box>
              ))}
            </Box>
            <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
              <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                PEMBAYARAN
              </Text>
              <Divider mb={2} />
              <Text fontSize={'md'} fontWeight={'bold'}>
                {`Rp. ${data?.penumpang?.dropspot?.harga}`}
              </Text>
              <Text
                fontSize={'md'}>{`Rp. ${data?.penumpang?.totalBayar}`}</Text>
              <Badge
                colorScheme={
                  data.penumpang?.statusPembayaran === 'lunas'
                    ? 'success'
                    : data.penumpang?.statusPembayaran === 'kurang'
                    ? 'warning'
                    : data.penumpang?.statusPembayaran === 'lebih'
                    ? 'info'
                    : 'danger'
                }
                w={48}
                mt={1}
                mb={2}>
                {data?.penumpang?.statusPembayaran?.toUpperCase()}
              </Badge>
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
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <Text color={'lime.900'} fontWeight={'bold'} fontSize={'lg'}>
                  TUJUAN PULANG
                </Text>
                {/* {isEditDrop && (
                  <Pressable
                    onPress={() =>
                      navigation.navigate({
                        name: 'UbahDropspot',
                        params: {
                          uuid: data?.santri_uuid,
                          niup: data?.niup,
                          id: data?.id,
                          drop: data?.dropspot,
                        },
                      })
                    }>
                    <Icon name="edit" size={16} color={'#365314'} />
                  </Pressable>
                )} */}
              </HStack>
              <Divider mb={2} />
              <Text fontSize={'md'} fontWeight={'bold'}>
                {data?.penumpang?.dropspot?.namaDropspot}
              </Text>
              <Text fontSize={'md'}>
                {data?.penumpang?.dropspot?.area?.namaArea}
              </Text>
              <Text
                fontSize={
                  'md'
                }>{`${data?.penumpang?.dropspot?.area?.picInt} | ${data?.penumpang?.dropspot?.area?.hpPicInt}`}</Text>
            </Box>
            {/* <Box p={4} my={4} shadow={'3'} backgroundColor={'white'}>
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
                          niup: data?.niup,
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
            </Box> */}
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

export default PenumpangDetail;
