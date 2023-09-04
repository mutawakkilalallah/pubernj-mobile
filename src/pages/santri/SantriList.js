import {
  Button,
  Divider,
  HStack,
  Input,
  ScrollView,
  Spinner,
  View,
  Modal,
  Select,
  Pressable,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage, ListDataFoto, ListDataSantri} from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import {notifError} from '../../utils';

const SantriList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fltWilayah, setFltWilayah] = useState([]);
  const [fltBlok, setFltBlok] = useState([]);
  const [meta, setMeta] = useState({});
  const [cari, setCari] = useState('');
  const [wilayah, setWilayah] = useState('');
  const [blok, setBlok] = useState('');
  const [jk, setJk] = useState('');
  const [status, setStatus] = useState('');
  const [limit, setLimit] = useState(25);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleReset = () => {
    setWilayah('');
    setBlok('');
    setCari('');
    setJk('');
    setStatus('');
    setLimit(25);
  };

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/santri`, {
        headers: {
          'x-auth-token': token,
        },
        params: {
          cari,
          wilayah,
          blok,
          jenis_kelamin: jk,
          status_kepulangan: status,
          limit,
        },
      });
      setData(resp.data.data);
      setMeta(resp.headers);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notifError(err);
    }
  };
  const getWilayah = async () => {
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/santri/filter/wilayah`, {
        headers: {
          'x-auth-token': token,
        },
      });
      setFltWilayah(resp.data);
    } catch (err) {
      notifError(err);
    }
  };

  useEffect(() => {
    const getBlok = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      try {
        const resp = await axios.get(`${apiUrl}/santri/filter/blok`, {
          headers: {
            'x-auth-token': token,
          },
          params: {
            alias_wilayah: wilayah,
          },
        });
        setFltBlok(resp.data);
      } catch (err) {
        notifError(err);
      }
    };
    getBlok();
  }, [wilayah]);

  useEffect(() => {
    getData();
    getWilayah();
  }, [cari, wilayah, blok, jk, status, limit]);

  return (
    <View flex={1} backgroundColor={'white'}>
      <HeaderPage
        navigation={navigation}
        title="Data Santri"
        total={meta['x_total_data']}
      />
      <HStack m={4} justifyContent={'center'} space={2}>
        <Input
          placeholder="Cari Santri .."
          w={56}
          _focus={{backgroundColor: 'white', borderColor: 'lime.900'}}
          value={cari}
          onChangeText={setCari}
        />
        <Divider orientation="vertical" />
        <Button colorScheme={'lime'} onPress={openModal}>
          FILTER
        </Button>
        <Button colorScheme={'danger'} onPress={() => handleReset()}>
          RESET
        </Button>
      </HStack>
      <Divider />
      {loading ? (
        <Spinner color={'lime.900'} size={'lg'} mt={2} />
      ) : (
        <ScrollView mx={4} showsVerticalScrollIndicator={false}>
          {data.map(d => {
            return (
              <Pressable
                key={d.uuid}
                onPress={() =>
                  navigation.navigate({
                    name: 'SantriDetail',
                    params: {uuid: d.uuid, niup: d.niup},
                  })
                }>
                <ListDataSantri
                  niup={d.niup}
                  nama={d.nama_lengkap}
                  wilayah={d.wilayah}
                  rombongan={d.status_kepulangan}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'xl'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Filter Santri</Modal.Header>
          <Modal.Body>
            <Select
              onValueChange={setWilayah}
              placeholder="Semua Wilayah"
              selectedValue={wilayah}
              mb={2}>
              <Select.Item label="Semua Wilayah" value="" />
              {fltWilayah.map(a => {
                return (
                  <Select.Item
                    key={a.alias_wilayah}
                    label={a.wilayah}
                    value={a.alias_wilayah}
                  />
                );
              })}
            </Select>
            <Select
              onValueChange={setBlok}
              placeholder="Semua Daerah"
              selectedValue={blok}
              isDisabled={wilayah === ''}
              mb={2}>
              <Select.Item label="Semua Daerah" value="" />
              {fltBlok.map(a => {
                return (
                  <Select.Item
                    key={a.id_blok}
                    label={a.blok}
                    value={a.id_blok}
                  />
                );
              })}
            </Select>
            <Select
              onValueChange={setJk}
              placeholder="Semua Jenis Kelamin"
              selectedValue={jk}
              mb={2}>
              <Select.Item label="Semua Jenis Kelamin" value="" />
              <Select.Item label="Laki-laki" value="L" />
              <Select.Item label="Perempuan" value="P" />
            </Select>
            <Select
              onValueChange={setStatus}
              placeholder="Semua Status Kepulangan"
              selectedValue={status}
              mb={2}>
              <Select.Item label="Semua Status Kepulangan" value="" />
              <Select.Item label="Romobongan" value="rombongan" />
              <Select.Item label="Non Rombongan" value="non-rombongan" />
            </Select>
            <Select
              onValueChange={setLimit}
              placeholder="25"
              selectedValue={limit}
              mb={2}>
              <Select.Item label="25" value="25" />
              <Select.Item label="50" value="50" />
              <Select.Item label="100" value="100" />
              <Select.Item label="250" value="250" />
            </Select>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme={'muted'}
                onPress={() => {
                  setModalVisible(false);
                }}>
                TUTUP
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default SantriList;
