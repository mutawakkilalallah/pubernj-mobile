import {Box, Button, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import axios from 'axios';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {notifError} from '../../utils';

const NFCScan = ({navigation}) => {
  const [hasNfc, setHasNFC] = useState(false);
  const [nfcActive, setNfcActive] = useState(false);

  useEffect(() => {
    const checkNfc = async () => {
      const isSupport = await NfcManager.isSupported();
      if (isSupport) {
        const isEnabled = await NfcManager.isEnabled();
        setHasNFC(true);
        if (isEnabled) {
          NfcManager.start();
          setNfcActive(true);
        }
      }
    };

    const readNefAndRestart = async () => {
      try {
        await NfcManager.requestTechnology(NfcTech.Ndef);
        const tag = await NfcManager.getTag();
        const auth = JSON.parse(await AsyncStorage.getItem('token'));
        try {
          const resp = await axios.get(`${apiUrl}/santri/card/${tag.id}`, {
            headers: {
              'x-auth-token': auth,
            },
          });
          try {
            const respPen = await axios.get(
              `${apiUrl}/penumpang/${resp.data.data.uuid}`,
              {
                headers: {
                  'x-auth-token': auth,
                },
              },
            );
            navigation.replace('PenumpangDetail', {
              uuid: respPen?.data?.data?.santri_uuid,
              niup: respPen?.data?.data?.santri?.niup,
            });
          } catch (err) {
            alert('Santri tidak terdaftar sebagai anggota rombongan');
          }
        } catch (err) {
          alert('Kartu tidak dikenal !');
        } finally {
          await NfcManager.cancelTechnologyRequest();

          // Memulai pemindaian kembali setelah pemindaian selesai
          readNefAndRestart();
        }
      } catch (ex) {
        notifError(ex);
      } finally {
        await NfcManager.cancelTechnologyRequest();
      }
    };

    checkNfc();

    // Memulai pemindaian pertama kali saat komponen dimuat
    readNefAndRestart();
  }, []);

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
      <View flex={1} alignItems={'center'} justifyContent={'center'}>
        <Icon name="nfc-symbol" size={128} color={'#999'} />
        {hasNfc && nfcActive && (
          <Button mt={8} backgroundColor={'success.600'}>
            NFC Tersedia dan siap digunakan
          </Button>
        )}
        {hasNfc && !nfcActive && (
          <Button mt={8} backgroundColor={'yellow.600'}>
            NFC Tersedia, tapi belum diaktifkan
          </Button>
        )}
        {!hasNfc && !nfcActive && (
          <Button mt={8} backgroundColor={'danger.600'}>
            Perangkat ini tidak didukung NFC
          </Button>
        )}
      </View>
    </View>
  );
};

export default NFCScan;
