import {Badge, Box, Spinner, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import axios from 'axios';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {notifSuccessCustom} from '../../utils';

const Tuntas = ({route, navigation}) => {
  const [hasNfc, setHasNFC] = useState(false);
  const [nfcActive, setNfcActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [nfcReader, updateNfc] = useState(false);

  useEffect(() => {
    startNfc();

    return () => {
      NfcManager.cancelTechnologyRequest(); // Cancel NFC scanner when unmounting or navigating away
    };

    // () => NfcManager.cancelTechnologyRequest(); // unmount the scanner on navigate away.
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
          const resp = await axios.get(`${apiUrl}/person/card/${tag.id}`, {
            // const resp = await axios.get(`${apiUrl}/person/card/5C7CF1AF`, {
            headers: {
              'X-Auth': auth,
            },
          });
          try {
            setLoading(true);
            const respPen = await axios.put(
              `${apiUrl}/persyaratan/tuntas-mobile/${resp.data.data.uuid}`,
              {type: route.params.type, status: true},
              {
                headers: {
                  'X-Auth': auth,
                },
              },
            );
            await NfcManager.cancelTechnologyRequest(); // Have to reset nfc scanner.
            updateNfc(!nfcReader);
            setLoading(false); // toggle a reset nfc scanner use effect hook.
            notifSuccessCustom(resp.data?.data.nama_lengkap, route.params.type);
          } catch (err) {
            setLoading(false); // toggle a reset nfc scanner use effect hook.
            alert('Santri tidak berstatus pulang');
            await NfcManager.cancelTechnologyRequest(); // Have to reset nfc scanner.
            updateNfc(!nfcReader); // toggle a reset nfc scanner use effect hook.
          }
        } catch (err) {
          setLoading(false); // toggle a reset nfc scanner use effect hook.
          alert('Kartu tidak dikenal !');
          await NfcManager.cancelTechnologyRequest(); // Have to reset nfc scanner.
          updateNfc(!nfcReader); // toggle a reset nfc scanner use effect hook.
        }
      }
      setLoading(false); // toggle a reset nfc scanner use effect hook.
      NfcManager.cancelTechnologyRequest(); // Have to reset nfc scanner.
      updateNfc(!nfcReader); // toggle a reset nfc scanner use effect hook.
    } catch (error) {
      // console.log(error);
      setLoading(false); // toggle a reset nfc scanner use effect hook.
      NfcManager.cancelTechnologyRequest();
      updateNfc(!nfcReader);
    }
  };

  return (
    <View flex={1}>
      <HeaderPage title="Tapping Persyaratan" navigation={navigation} />
      <Box backgroundColor={'blueGray.600'} p={2} alignItems={'center'}>
        <Text color={'white'} fontSize={'lg'}>
          Tuntaskan Persyaratan Santri
        </Text>
        <Text color={'white'}>
          {route.params.type == 'FA'
            ? 'Furudhul Ainiyah (Biktren)'
            : 'Bebas Pelanggaran Kamtib'}
        </Text>
      </Box>
      {!loading && (
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
      )}
      {/* Komponen Loading */}
      {loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparansi latar belakang
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
          }}>
          <Spinner size="large" color="lime.900" />
          <Text style={{marginTop: 10}} color={'lime.900'} fontWeight={'bold'}>
            Sabar, Ya dek ya !
          </Text>
        </View>
      )}
    </View>
  );
};

export default Tuntas;
