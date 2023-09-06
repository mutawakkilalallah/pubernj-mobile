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
  Box,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage, ListDataPenumpang} from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import {notifError} from '../../utils';

const PenumpangList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [fltArea, setFltArea] = useState([]);
  const [fltDrop, setFltDrop] = useState([]);
  const [fltWilayah, setFltWilayah] = useState([]);
  const [fltBlok, setFltBlok] = useState([]);
  const [fltArmada, setFltArmada] = useState([]);
  const [meta, setMeta] = useState({});
  const [cari, setCari] = useState('');
  const [area, setArea] = useState('');
  const [drop, setDrop] = useState('');
  const [wilayah, setWilayah] = useState('');
  const [blok, setBlok] = useState('');
  const [jk, setJk] = useState('');
  const [status, setStatus] = useState('');
  const [armada, setArmada] = useState('');
  const [limit, setLimit] = useState(25);
  const [modalVisible, setModalVisible] = useState(false);

  const p4nj = ['p4nj'];
  const isP4nj = p4nj.includes(user?.role);
  const pendamping = ['pendamping'];
  const isPendamping = pendamping.includes(user?.role);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleReset = () => {
    setArea('');
    setDrop('');
    setWilayah('');
    setBlok('');
    setCari('');
    setJk('');
    setStatus('');
    setArmada('');
    setLimit(25);
  };

  const getUser = async () => {
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    setUser(user);
  };

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    const user = JSON.parse(await AsyncStorage.getItem('user'));
    try {
      const resp = await axios.get(`${apiUrl}/penumpang`, {
        headers: {
          'x-auth-token': token,
        },
        params: {
          cari,
          area,
          dropspot: drop,
          wilayah,
          blok,
          armada,
          jenis_kelamin: jk,
          pembayaran: status,
          limit,
        },
      });
      if (user?.role === 'p4nj') {
        setFltArea(resp.data.filter.area);
      }
      setData(resp.data.data);
      setMeta(resp.headers);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notifError(err);
    }
  };

  useEffect(() => {
    const getArea = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user?.role != 'p4nj') {
        try {
          const resp = await axios.get(`${apiUrl}/area`, {
            headers: {
              'x-auth-token': token,
            },
          });
          setFltArea(resp.data.data);
        } catch (err) {
          notifError(err);
        }
      }
    };
    getArea();
  }, []);

  useEffect(() => {
    const getWilayah = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user?.role != 'p4nj') {
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
      }
    };
    getWilayah();
  }, []);

  useEffect(() => {
    const getBlok = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      const user = JSON.parse(await AsyncStorage.getItem('user'));
      if (user?.role != 'p4nj') {
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
      }
    };
    getBlok();
  }, [wilayah]);

  useEffect(() => {
    const getDrop = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      try {
        const resp = await axios.get(`${apiUrl}/dropspot`, {
          headers: {
            'x-auth-token': token,
          },
          params: {
            area,
          },
        });
        setFltDrop(resp.data.data);
      } catch (err) {
        notifError(err);
      }
    };
    getDrop();
  }, [area]);

  useEffect(() => {
    const getArmada = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      try {
        const resp = await axios.get(`${apiUrl}/armada`, {
          headers: {
            'x-auth-token': token,
          },
          params: {
            area,
            dropspot: drop,
          },
        });
        setFltArmada(resp.data.data);
      } catch (err) {
        notifError(err);
      }
    };
    getArmada();
  }, [area, drop]);

  useEffect(() => {
    getData();
  }, [cari, area, drop, wilayah, blok, jk, status, armada, limit]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View flex={1} backgroundColor={'white'}>
      <HeaderPage
        navigation={navigation}
        title="Data Penumpang"
        total={meta['x_total_data']}
      />
      <HStack m={4} justifyContent={'center'} space={2}>
        <Input
          placeholder="Cari Penumpang .."
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
                    },
                  })
                }>
                <ListDataPenumpang
                  niup={d?.santri?.niup}
                  nama={d?.santri?.nama_lengkap}
                  dropspot={d?.dropspot?.nama}
                  pembayaran={d?.status_bayar}
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
            {!isPendamping && (
              <>
                <Select
                  onValueChange={setArea}
                  placeholder="Semua Area"
                  selectedValue={area}
                  mb={2}>
                  <Select.Item label="Semua Area" value="" />
                  {fltArea.map(a => {
                    return (
                      <Select.Item key={a.id} label={a.nama} value={a.id} />
                    );
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
                    return (
                      <Select.Item key={a.id} label={a.nama} value={a.id} />
                    );
                  })}
                </Select>
              </>
            )}
            {!isP4nj && (
              <>
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
              </>
            )}
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
              placeholder="Semua Status Pembayaran"
              selectedValue={status}
              mb={2}>
              <Select.Item label="Semua Status Pembayaran" value="" />
              <Select.Item label="Lunas" value="lunas" />
              <Select.Item label="Lebih" value="lebih" />
              <Select.Item label="Kurang" value="kurang" />
              <Select.Item label="Belum Lunas" value="belum-lunas" />
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
            <Select
              onValueChange={setArmada}
              placeholder="Semua Armada"
              selectedValue={armada}
              mb={2}>
              <Select.Item label="Semua Armada" value="" />
              {fltArmada.map(a => {
                return <Select.Item key={a.id} label={a.nama} value={a.id} />;
              })}
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

export default PenumpangList;
