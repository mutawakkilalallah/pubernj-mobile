import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Box, HStack, Image, Pressable, Spinner, Text, View} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome6';
import RNFetchBlob from 'rn-fetch-blob';
import {apiUrl} from '../config';

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
        }).fetch('GET', `${apiUrl}/santri/image/${user.niup}?size=small`, {
          'x-auth-token': token,
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
        notifError(err);
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
    <View backgroundColor={'white'} flex={1} alignItems={'center'}>
      <Box backgroundColor={'lime.900'} width={'100%'} alignItems={'center'}>
        <Image
          source={require('../assets/puber.png')}
          alt="logo-puber"
          width={200}
          height={100}
          mt={8}
          mb={8}
          opacity={0.4}
        />
        <Box alignItems={'center'}>
          {!image ? (
            <Box
              alignItems={'center'}
              backgroundColor={'muted.300'}
              borderRadius={100}
              mr={4}
              h={16}
              w={16}
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
              mb={4}
              borderRadius={100}
            />
          )}
          <Text color={'white'} fontSize={'lg'}>
            {user.nama_lengkap}
          </Text>
          <Text color={'white'} mb={8}>
            ({user.role})
          </Text>
        </Box>
      </Box>
      <HStack flexWrap={'wrap'} mt={4}>
        {isInternal && (
          <Pressable
            w={20}
            h={20}
            onPress={() => navigation.navigate('SantriList')}>
            <Box alignItems={'center'}>
              <Icon name="users" size={32} color={'#164e63'} />
              <Text mt={2} color={'black'}>
                Santri
              </Text>
            </Box>
          </Pressable>
        )}
        <Pressable
          w={20}
          h={20}
          onPress={() => navigation.navigate('PenumpangList')}>
          <Box alignItems={'center'}>
            <Icon name="briefcase" size={32} color={'#831843'} />
            <Text mt={2} color={'black'}>
              Penumpang
            </Text>
          </Box>
        </Pressable>
        {isEbekal && (
          <Pressable
            w={20}
            h={20}
            onPress={() => navigation.navigate('PersyaratanList')}>
            <Box alignItems={'center'}>
              <Icon name="file-pen" size={32} color={'#064e3b'} />
              <Text mt={2} color={'black'}>
                Persyaratan
              </Text>
            </Box>
          </Pressable>
        )}
        <Pressable
          w={20}
          h={20}
          onPress={() => navigation.navigate('AreaList')}>
          <Box alignItems={'center'}>
            <Icon name="map" size={32} color={'#881337'} />
            <Text mt={2} color={'black'}>
              Area
            </Text>
          </Box>
        </Pressable>
        <Pressable
          w={20}
          h={20}
          onPress={() => navigation.navigate('DropspotList')}>
          <Box alignItems={'center'}>
            <Icon name="location-dot" size={32} color={'#171717'} />
            <Text mt={2} color={'black'}>
              Dropspot
            </Text>
          </Box>
        </Pressable>
        {isKepulangan && (
          <Pressable
            w={20}
            h={20}
            onPress={() => navigation.navigate('ArmadaList')}>
            <Box alignItems={'center'}>
              <Icon name="bus" size={32} color={'#c026d3'} />
              <Text mt={2} color={'black'}>
                Armada
              </Text>
            </Box>
          </Pressable>
        )}
        {isAdmin && (
          <Pressable
            w={20}
            h={20}
            onPress={() => navigation.navigate('UserList')}>
            <Box alignItems={'center'}>
              <Icon name="user-gear" size={32} color={'#0d9488'} />
              <Text mt={2} color={'black'}>
                Users Account
              </Text>
            </Box>
          </Pressable>
        )}
        {isSysadmin && (
          <Pressable
            w={20}
            h={20}
            onPress={() => navigation.navigate('Development')}>
            <Box alignItems={'center'}>
              <Icon name="credit-card" size={32} color={'#7c3aed'} />
              <Text mt={2} color={'black'}>
                Keuangan
              </Text>
            </Box>
          </Pressable>
        )}
        <Pressable w={20} h={20} onPress={() => navigation.navigate('QrCode')}>
          <Box alignItems={'center'}>
            <Icon name="qrcode" size={32} color={'#ef4444'} />
            <Text mt={2} color={'black'}>
              QR Code
            </Text>
          </Box>
        </Pressable>
        <Pressable
          w={20}
          h={20}
          onPress={() => navigation.navigate('Development')}>
          <Box alignItems={'center'}>
            <Icon name="nfc-symbol" size={32} color={'#f59e0b'} />
            <Text mt={2} color={'black'}>
              NFC
            </Text>
          </Box>
        </Pressable>
        <Pressable
          w={20}
          h={20}
          onPress={() =>
            navigation.navigate({
              name: 'UbahPassword',
              params: {uuid: user.uuid},
            })
          }>
          <Box alignItems={'center'}>
            <Icon name="key" size={32} color={'#0077e6'} />
            <Text mt={2} color={'black'} textAlign={'center'}>
              Ubah Password
            </Text>
          </Box>
        </Pressable>
        <Pressable w={20} h={20} onPress={() => handleLogout()}>
          <Box alignItems={'center'}>
            <Icon name="power-off" size={32} color={'#ec4899'} />
            <Text mt={2} color={'black'}>
              Logout
            </Text>
          </Box>
        </Pressable>
      </HStack>
    </View>
  );
};

export default Dashboard;
