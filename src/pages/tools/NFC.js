import {Box, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import {notifError} from '../../utils';
import axios from 'axios';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';

const NFCScan = ({navigation}) => {
  const [nfcStatus, setNfcStatus] = useState('notAvailable');

  useEffect(() => {
    // Fungsi untuk memeriksa apakah NFC tersedia
    const checkNfcAvailability = async () => {
      try {
        await NfcManager.start();
        const techList = await NfcManager.getTechList();

        if (techList.includes(NfcTech.Ndef)) {
          setNfcStatus('ready');
          try {
            // register for the NFC tag with NDEF in it
            await NfcManager.requestTechnology(NfcTech.Ndef);
            // the resolved tag object will contain `ndefMessage` property
            const tag = await NfcManager.getTag();
            // console.warn('Tag found', tag);
            const auth = JSON.parse(await AsyncStorage.getItem('token'));
            const resp = await axios.get(`${apiUrl}/santri/card/${tag.id}`, {
              headers: {
                'x-auth-token': auth,
              },
            });
            navigation.replace('PenumpangDetail', {
              uuid: resp.data.data.uuid,
              niup: resp.data.data.warga_pesantren.niup,
            });
          } catch (ex) {
            console.warn('Oops!', ex);
          } finally {
            // stop the nfc scanning
            NfcManager.cancelTechnologyRequest();
          }
        } else {
          setNfcStatus('notReady');
        }
      } catch (ex) {
        setNfcStatus('notAvailable');
      }
    };
    checkNfcAvailability();
  }, []);

  const onRead = async e => {
    const auth = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      const resp = await axios.get(`${apiUrl}/santri/card/${tag.id}`, {
        headers: {
          'x-auth-token': auth,
        },
      });
      console.log(resp);
      // navigation.replace('PenumpangDetail', {
      //   uuid: resp.data.data.santri_uuid,
      //   niup: resp.data.data.santri.niup,
      // });
    } catch (err) {
      if (err?.response?.status === 404) {
        const resp = await axios.get(`${apiUrl}/santri/${tag.id}`, {
          headers: {
            'x-auth-token': auth,
          },
        });
        navigation.replace('SantriDetail', {
          uuid: resp.data.data.uuid,
          niup: resp.data.data.niup,
        });
      } else {
        notifError(err);
      }
    }
  };

  return (
    <View flex={1}>
      <HeaderPage title="NFC Reader" navigation={navigation} />
      <Box backgroundColor={'blueGray.600'} p={2} alignItems={'center'}>
        <Text color={'white'} fontSize={'lg'}>
          Tapping Kartu E-Bekal
        </Text>
        <Text color={'white'}>
          (Untuk Melihat Dropspot, Pembayaran dan Persyaratan)
        </Text>
      </Box>
    </View>
  );
};

export default NFCScan;
