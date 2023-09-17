import {Badge, Box, Button, Spinner, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import axios from 'axios';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import Icon from 'react-native-vector-icons/FontAwesome6';

const NFCScan = ({navigation}) => {
  const [hasNfc, setHasNFC] = useState(false);
  const [nfcActive, setNfcActive] = useState(false);

  const [nfcReader, updateNfc] = useState(false);

  useEffect(() => {
    startNfc();

    () => NfcManager.cancelTechnologyRequest(); // unmount the scanner on navigate away.
  }, [nfcReader]);

  const startNfc = async () => {
    try {
      const supported = await NfcManager.isSupported();
      if (supported) {
        setHasNFC(true);
      }
      const enabled = await NfcManager.isEnabled();
      if (enabled) {
        setNfcActive(true);
      }
      if (supported && enabled) {
        await NfcManager.start();
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
            // console.log(err);
            alert('Santri tidak terdaftar sebagai anggota rombongan');
            await NfcManager.cancelTechnologyRequest(); // Have to reset nfc scanner.
            updateNfc(!nfcReader); // toggle a reset nfc scanner use effect hook.
          }
        } catch (err) {
          // console.log(err);
          alert('Kartu tidak dikenal !');
          await NfcManager.cancelTechnologyRequest(); // Have to reset nfc scanner.
          updateNfc(!nfcReader); // toggle a reset nfc scanner use effect hook.
        }
      }
      NfcManager.cancelTechnologyRequest(); // Have to reset nfc scanner.
      updateNfc(!nfcReader); // toggle a reset nfc scanner use effect hook.
    } catch (error) {
      // console.log(error);
      NfcManager.cancelTechnologyRequest();
      updateNfc(!nfcReader);
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
      <View flex={1} alignItems={'center'} justifyContent={'center'}>
        <Icon name="nfc-symbol" size={128} color={'#999'} />
        {hasNfc && nfcActive && (
          <Badge mt={8} colorScheme={'success'}>
            NFC Tersedia dan siap digunakan
          </Badge>
        )}
        {hasNfc && !nfcActive && (
          <Badge mt={8} colorScheme={'warning'}>
            NFC Tersedia, tapi belum diaktifkan
          </Badge>
        )}
        {!hasNfc && !nfcActive && (
          <Badge mt={8} colorScheme={'danger'}>
            Perangkat ini tidak didukung NFC
          </Badge>
        )}
      </View>
    </View>
  );
};

export default NFCScan;
