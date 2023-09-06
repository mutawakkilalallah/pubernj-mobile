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
import {HeaderPage, ListDataPersyaratan} from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import {notifError} from '../../utils';

const PersyaratanList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  // const [fltArea, setFltArea] = useState([]);
  // const [fltDrop, setFltDrop] = useState([]);
  const [fltWilayah, setFltWilayah] = useState([]);
  const [fltBlok, setFltBlok] = useState([]);
  const [meta, setMeta] = useState({});
  const [cari, setCari] = useState('');
  // const [area, setArea] = useState('');
  // const [drop, setDrop] = useState('');
  const [wilayah, setWilayah] = useState('');
  const [blok, setBlok] = useState('');
  const [jk, setJk] = useState('');
  const [bps, setBps] = useState('');
  const [kos, setKos] = useState('');
  const [fa, setFa] = useState('');
  const [kamtib, setKamtib] = useState('');
  const [limit, setLimit] = useState(25);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleReset = () => {
    // setArea('');
    // setDrop('');
    setBps('');
    setKos('');
    setFa('');
    setKamtib('');
    setWilayah('');
    setBlok('');
    setCari('');
    setJk('');
    setLimit(25);
  };

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/penumpang/persyaratan`, {
        headers: {
          'x-auth-token': token,
        },
        params: {
          cari,
          // area,
          // dropspot: drop,
          lunas_bps: bps,
          lunas_kosmara: kos,
          tuntas_fa: fa,
          bebas_kamtib: kamtib,
          wilayah,
          blok,
          jenis_kelamin: jk,
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

  // useEffect(() => {
  //   const getArea = async () => {
  //     const token = JSON.parse(await AsyncStorage.getItem('token'));
  //     try {
  //       const resp = await axios.get(`${apiUrl}/area`, {
  //         headers: {
  //           'x-auth-token': token,
  //         },
  //       });
  //       setFltArea(resp.data.data);
  //       console.log(fltArea);
  //     } catch (err) {
  //       notifError(err);
  //     }
  //   };
  //   getArea();
  // }, []);

  useEffect(() => {
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
    getWilayah();
  }, []);

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

  // useEffect(() => {
  //   const getDrop = async () => {
  //     const token = JSON.parse(await AsyncStorage.getItem('token'));
  //     try {
  //       const resp = await axios.get(`${apiUrl}/dropspot`, {
  //         headers: {
  //           'x-auth-token': token,
  //         },
  //         params: {
  //           area,
  //         },
  //       });
  //       setFltDrop(resp.data.data);
  //     } catch (err) {
  //       notifError(err);
  //     }
  //   };
  //   getDrop();
  // }, [area]);

  useEffect(() => {
    getData();
  }, [cari, wilayah, bps, kos, fa, kamtib, blok, jk, limit]);

  return (
    <View flex={1} backgroundColor={'white'}>
      <HeaderPage
        navigation={navigation}
        title="Data Persyaratan"
        total={meta['x_total_data']}
        link="PersyaratanList"
      />
      <HStack m={4} justifyContent={'center'} space={2}>
        <Input
          placeholder="Cari Persyaratan .."
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
                key={d.id}
                onPress={() =>
                  navigation.navigate({
                    name: 'PenumpangDetail',
                    params: {
                      uuid: d?.santri?.uuid,
                      niup: d?.santri?.niup,
                    },
                  })
                }>
                <ListDataPersyaratan
                  niup={d?.santri?.niup}
                  nama={d?.santri?.nama_lengkap}
                  blok={d?.santri?.blok}
                  bps={d?.persyaratan?.lunas_bps}
                  kosmara={d?.persyaratan?.lunas_kosmara}
                  fa={d?.persyaratan?.tuntas_fa}
                  kamtib={d?.persyaratan?.bebas_kamtib}
                />
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'xl'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Filter Penumpang</Modal.Header>
          <Modal.Content p={4} borderRadius={0} shadow={'none'}>
            {/* <Select
              onValueChange={setArea}
              placeholder="Semua Area"
              selectedValue={area}
              mb={2}>
              <Select.Item label="Semua Area" value="" />
              {fltArea.map(a => {
                return <Select.Item key={a.id} label={a.nama} value={a.id} />;
              })}
            </Select>
            <Select
              onValueChange={setDrop}
              placeholder="Semua Dropspot"
              selectedValue={drop}
              isDisabled={area === ''}
              mb={2}>
              <Select.Item label="Semua Dropspot" value="" />
              {fltDrop.map(a => {
                return <Select.Item key={a.id} label={a.nama} value={a.id} />;
              })}
            </Select> */}
            <Select
              onValueChange={setBps}
              placeholder="Semua Status BPS"
              selectedValue={bps}
              mb={2}>
              <Select.Item label="Semua Status BPS" value="" />
              <Select.Item label="Lunas" value="1" />
              <Select.Item label="Belum Lunas" value="0" />
            </Select>
            <Select
              onValueChange={setKos}
              placeholder="Semua Status KOSMARA"
              selectedValue={kos}
              mb={2}>
              <Select.Item label="Semua Status KOSMARA" value="" />
              <Select.Item label="Lunas" value="1" />
              <Select.Item label="Belum Lunas" value="0" />
            </Select>
            <Select
              onValueChange={setFa}
              placeholder="Semua Status FA"
              selectedValue={fa}
              mb={2}>
              <Select.Item label="Semua Status FA" value="" />
              <Select.Item label="Tuntas" value="1" />
              <Select.Item label="Belum Tuntas" value="0" />
            </Select>
            <Select
              onValueChange={setKamtib}
              placeholder="Semua Status Kamtib"
              selectedValue={kamtib}
              mb={2}>
              <Select.Item label="Semua Status KAMTIB" value="" />
              <Select.Item label="Bebas" value="1" />
              <Select.Item label="Belum Bebas" value="0" />
            </Select>
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
              onValueChange={setLimit}
              placeholder="25"
              selectedValue={limit}
              mb={2}>
              <Select.Item label="25" value="25" />
              <Select.Item label="50" value="50" />
              <Select.Item label="100" value="100" />
              <Select.Item label="250" value="250" />
            </Select>
          </Modal.Content>
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

export default PersyaratanList;
