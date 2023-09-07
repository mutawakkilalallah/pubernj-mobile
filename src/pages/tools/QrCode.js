import {Box, Text, View} from 'native-base';
import React, {useState} from 'react';
import {HeaderPage} from '../../components';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import jwtDecode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import {notifError} from '../../utils';
import axios from 'axios';

const QrCode = ({navigation}) => {
  const onRead = async e => {
    const auth = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const token = e.data;
      var decodedHeader = jwtDecode(token, {header: true});
      const resp = await axios.get(
        `${apiUrl}/penumpang/${decodedHeader.uuid_person}`,
        {
          headers: {
            'x-auth-token': auth,
          },
        },
      );
      navigation.replace('PenumpangDetail', {
        uuid: resp.data.data.santri_uuid,
        niup: resp.data.data.santri.niup,
      });
    } catch (err) {
      if (err?.response?.status === 404) {
        alert('Santri tidak terdaftar sebagai anggota rombongan');
      } else {
        alert('QR Code tidak dikenal !');
      }
    }
  };

  return (
    <View flex={1}>
      <HeaderPage title="QR Code" navigation={navigation} />
      <Box backgroundColor={'blueGray.600'} p={2} alignItems={'center'}>
        <Text color={'white'} fontSize={'lg'}>
          Scan QR Code Penumpang
        </Text>
        <Text color={'white'}>
          (Untuk Melihat Dropspot, Pembayaran dan Persyaratan)
        </Text>
      </Box>
      <QRCodeScanner
        cameraStyle={{height: '100%'}}
        reactivate={true}
        reactivateTimeout={6000}
        onRead={e => onRead(e)}></QRCodeScanner>
    </View>
  );
};

export default QrCode;
