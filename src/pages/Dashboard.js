import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Box, HStack, Image, Pressable, Spinner, Text, View} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome6';
import RNFetchBlob from 'rn-fetch-blob';
import {apiUrl} from '../config';
import {notifErrorCustom} from '../utils';

const Dashboard = ({navigation}) => {
  const [user, setUser] = useState({});
  const [image, setImage] = useState('');

  const sysadmin = ['sysadmin'];
  const isSysadmin = sysadmin.includes(user?.role);
  const admin = ['sysadmin', 'admin'];
  const isAdmin = admin.includes(user?.role);
  const internal = ['sysadmin', 'admin', 'supervisor', 'wilayah', 'daerah'];
  const isInternal = internal.includes(user?.role);
  const ebekal = [
    'sysadmin',
    'admin',
    'supervisor',
    'wilayah',
    'daerah',
    'keuangan',
    'bps',
  ];
  const isEbekal = ebekal.includes(user?.role);
  const kepulangan = [
    'sysadmin',
    'admin',
    'supervisor',
    'armada',
    'pendamping',
    'p4nj',
  ];
  const isKepulangan = kepulangan.includes(user?.role);
  const notBpsPendamping = ['pendamping', 'bps'];
  const IsNotBpsPendamping = !notBpsPendamping.includes(user.role);

  const getUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(user);
  };

  useEffect(() => {
    const getImage = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      try {
        const resp = await RNFetchBlob.config({
          trusty: true,
        }).fetch('GET', `${apiUrl}/person/image/${user.niup}?size=small`, {
          'X-Auth': token,
        });
        if (resp.info().status === 200) {
          const base64 = await resp.base64();
          const imageBase64 = `data:image/jpeg;base64,${base64}`;
          setImage(imageBase64);
        } else if (resp.info().status === 401) {
          await AsyncStorage.clear();
          navigation.replace('Login');
        }
      } catch (err) {
        notifErrorCustom(err);
      }
    };
    getImage();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View backgroundColor={'white'} flex={1}>
      <Box backgroundColor={'lime.900'} width={'100%'} alignItems={'center'}>
        <Box alignItems={'center'}>
          {!image ? (
            <Box
              alignItems={'center'}
              backgroundColor={'muted.300'}
              borderRadius={100}
              mr={4}
              h={16}
              w={16}
              mt={4}
              mb={4}
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
              mt={4}
              mb={4}
              borderRadius={100}
            />
          )}
          <Text color={'white'} fontSize={'lg'}>
            {user.nama_lengkap}
          </Text>
          {user.role == 'wilayah' ? (
            <Text color={'white'} mb={8}>
              {user.wilayah}
            </Text>
          ) : user.role == 'daerah' ? (
            <Text color={'white'} mb={8}>
              {user.blok}
            </Text>
          ) : (
            <Text color={'white'} mb={8}>
              {user.role}
            </Text>
          )}
        </Box>
      </Box>
      <Text ml={4} mt={4} fontWeight={'bold'}>
        DATA POKOK
      </Text>
      <HStack flexWrap={'wrap'} mt={4} ml={4}>
        <Pressable
          w={20}
          h={20}
          onPress={() => navigation.navigate('PenumpangList')}>
          <Box alignItems={'center'}>
            <Icon name="street-view" size={32} color={'#3b3b3b'} />
            <Text mt={2} color={'black'}>
              Penumpang
            </Text>
          </Box>
        </Pressable>
      </HStack>
      <Text ml={4} mt={4} fontWeight={'bold'}>
        PERSYARATAN
      </Text>
      <HStack flexWrap={'wrap'} mt={4} ml={4}>
        <Pressable
          w={20}
          h={20}
          onPress={() =>
            navigation.navigate({
              name: 'Tuntas',
              params: {
                type: 'FA',
              },
            })
          }>
          <Box alignItems={'center'}>
            <Icon name="file-waveform" size={32} color={'#3b3b3b'} />
            <Text mt={2} color={'black'}>
              Setoran
            </Text>
          </Box>
        </Pressable>
        <Pressable
          w={20}
          h={20}
          onPress={() =>
            navigation.navigate({
              name: 'Tuntas',
              params: {
                type: 'KAMTIB',
              },
            })
          }>
          <Box alignItems={'center'}>
            <Icon name="file-waveform" size={32} color={'#3b3b3b'} />
            <Text mt={2} color={'black'}>
              Pelanggaran
            </Text>
          </Box>
        </Pressable>
      </HStack>
      <Text ml={4} mt={4} fontWeight={'bold'}>
        ALAT
      </Text>
      <HStack flexWrap={'wrap'} mt={4} ml={4}>
        <Pressable w={20} h={20} onPress={() => navigation.navigate('QrCode')}>
          <Box alignItems={'center'}>
            <Icon name="barcode" size={32} color={'#3b3b3b'} />
            <Text mt={2} color={'black'}>
              QR Code
            </Text>
          </Box>
        </Pressable>
        <Pressable w={20} h={20} onPress={() => navigation.navigate('NFCScan')}>
          <Box alignItems={'center'}>
            <Icon name="nfc-directional" size={32} color={'#3b3b3b'} />
            <Text mt={2} color={'black'}>
              NFC
            </Text>
          </Box>
        </Pressable>
      </HStack>
      <Text ml={4} mt={4} fontWeight={'bold'}>
        PENGATURAN
      </Text>
      <HStack flexWrap={'wrap'} mt={4} ml={4}>
        <Pressable w={20} h={20} onPress={() => handleLogout()}>
          <Box alignItems={'center'}>
            <Icon name="plug" size={32} color={'#3b3b3b'} />
            <Text mt={2} color={'black'}>
              Logout
            </Text>
          </Box>
        </Pressable>
      </HStack>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: -10,
        }}>
        <Image
          source={require('../assets/pkbs.png')}
          alt="logo-puber"
          width={400}
          height={400}
          mt={8}
          mb={8}
          opacity={'0.1'}
        />
      </View>
    </View>
  );
};

export default Dashboard;
