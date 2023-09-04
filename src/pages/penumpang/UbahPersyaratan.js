import {Box, Button, Divider, HStack, Pressable, Text, View} from 'native-base';
import React, {useCallback, useState} from 'react';
import Loading from '../Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {notifError, notifSuccess} from '../../utils';
import axios from 'axios';
import {apiUrl} from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {BackHandler} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

const UbahPersyaratan = ({route, navigation}) => {
  const [load, setLoad] = useState(false);
  const [bps, setBps] = useState(route.params.bps);
  const [kos, setKos] = useState(route.params.kos);
  const [fa, setFa] = useState(route.params.fa);
  const [kamtib, setKamtib] = useState(route.params.kamtib);

  const user = route.params.user;
  const allowBps = ['sysadmin', 'bendahara'];
  const isAllowBPS = allowBps.includes(user?.role);
  const AllowKos = ['sysadmin', 'keuangan'];
  const isAllowKos = AllowKos.includes(user?.role);
  const allowFa = ['sysadmin', 'admin', 'wilayah', 'daerah'];
  const isAllowFa = allowFa.includes(user?.role);
  const allowKamtib = ['sysadmin', 'admin', 'wilayah'];
  const isAllowKamtib = allowKamtib.includes(user?.role);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.replace('PenumpangDetail', {
          uuid: route.params.uuid,
          niup: route.params.niup,
        });
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const handlePersyaratan = async type => {
    setLoad(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    const form = {
      type,
    };
    try {
      const resp = await axios.put(
        `${apiUrl}/penumpang/persyaratan/${route.params.id}`,
        form,
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      notifSuccess(resp);
      if (type === 'bps') {
        setBps(!bps);
      } else if (type === 'kosmara') {
        setKos(!kos);
      } else if (type === 'fa') {
        setFa(!fa);
      } else if (type === 'kamtib') {
        setKamtib(!kamtib);
      }
      setLoad(false);
    } catch (err) {
      setLoad(false);
      notifError(err);
    }
  };

  return (
    <View flex={1}>
      {load && <Loading />}
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        p={4}
        backgroundColor={'lime.900'}>
        <HStack>
          <Pressable
            onPress={() =>
              navigation.replace('PenumpangDetail', {
                uuid: route.params.uuid,
                niup: route.params.niup,
              })
            }>
            <Icon name="arrow-left" size={24} color={'white'} />
          </Pressable>
          <Text ml={4} fontSize={'lg'} color={'white'} fontWeight={'bold'}>
            Ubah Persyaratan
          </Text>
        </HStack>
      </HStack>
      <Box p={4}>
        <Text mb={2}>Biaya Pendidikan Santri (BPS)</Text>
        <Button
          isDisabled={!isAllowBPS}
          size={'xs'}
          w={100}
          colorScheme={!bps ? 'success' : 'danger'}
          onPress={() => handlePersyaratan('bps')}>
          {!bps ? 'LUNASKAN' : 'BATALKAN'}
        </Button>
        <Divider mt={2} />
      </Box>
      <Box p={4}>
        <Text mb={2}>Kos Makan Putra/Putri</Text>
        <Button
          isDisabled={!isAllowKos}
          size={'xs'}
          w={100}
          colorScheme={!kos ? 'success' : 'danger'}
          onPress={() => handlePersyaratan('kosmara')}>
          {!kos ? 'LUNASKAN' : 'BATALKAN'}
        </Button>
        <Divider mt={2} />
      </Box>
      <Box p={4}>
        <Text mb={2}>Furudhul Ainiyah (FA)</Text>
        <Button
          isDisabled={!isAllowFa}
          size={'xs'}
          w={100}
          colorScheme={!fa ? 'success' : 'danger'}
          onPress={() => handlePersyaratan('fa')}>
          {!fa ? 'TUNTASKAN' : 'BATALKAN'}
        </Button>
        <Divider mt={2} />
      </Box>
      <Box p={4}>
        <Text mb={2}>Keamanan dan Ketertiban (KAMTIB)</Text>
        <Button
          isDisabled={!isAllowKamtib}
          size={'xs'}
          w={100}
          colorScheme={!kamtib ? 'success' : 'danger'}
          onPress={() => handlePersyaratan('kamtib')}>
          {!kamtib ? 'BEBASKAN' : 'BATALKAN'}
        </Button>
        <Divider mt={2} />
      </Box>
    </View>
  );
};

export default UbahPersyaratan;
