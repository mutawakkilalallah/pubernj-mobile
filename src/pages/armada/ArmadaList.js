import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  ScrollView,
  Spinner,
  Text,
  View,
  Modal,
  Select,
  Pressable,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage} from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import {notifError} from '../../utils';

const DropspotList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [data, setData] = useState([]);
  const [fltArea, setFltArea] = useState([]);
  const [fltDrop, setFltDrop] = useState([]);
  const [meta, setMeta] = useState({});
  const [cari, setCari] = useState('');
  const [area, setArea] = useState('');
  const [drop, setDrop] = useState('');
  const [type, setType] = useState('');
  const [jenis, setJenis] = useState('');
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
    setType('');
    setJenis('');
    setCari('');
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
      const resp = await axios.get(`${apiUrl}/armada`, {
        headers: {
          'x-auth-token': token,
        },
        params: {
          area,
          dropspot: drop,
          type,
          jenis,
          cari,
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
    getData();
  }, [cari, area, drop, type, jenis, limit]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View flex={1} backgroundColor={'white'}>
      <HeaderPage
        navigation={navigation}
        title="Data Armada"
        total={meta['x_total_data']}
      />
      <HStack m={4} justifyContent={'center'} space={2}>
        <Input
          placeholder="Cari Armada .."
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
                    name: 'ArmadaDetail',
                    params: {id: d.id, user: d.user},
                  })
                }>
                <Box
                  borderBottomWidth={1}
                  borderBottomColor={'muted.300'}
                  mt={2}>
                  <Text fontWeight={'bold'}>{d?.nama}</Text>
                  <Text color={'muted.500'}>{d?.dropspot?.area?.nama}</Text>
                  <HStack>
                    <Badge colorScheme={'success'} w={24} mt={1} mb={2}>
                      {d?.type.toUpperCase()}
                    </Badge>
                    <Badge
                      colorScheme={d.jenis === 'putra' ? 'info' : 'warning'}
                      w={24}
                      mt={1}
                      mb={2}
                      ml={2}>
                      {d?.jenis.toUpperCase()}
                    </Badge>
                  </HStack>
                </Box>
              </Pressable>
            );
          })}
        </ScrollView>
      )}
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'xl'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Filter Armada</Modal.Header>
          <Modal.Body>
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
            <Select
              onValueChange={setType}
              placeholder="Semua Type"
              selectedValue={type}
              mb={2}>
              <Select.Item label="Semua Type" value="" />
              <Select.Item label="BUS" value="bus" />
              <Select.Item label="MINIBUS" value="minbus" />
              <Select.Item label="ELF" value="elf" />
              <Select.Item label="HIACE" value="hiace" />
              <Select.Item label="MPV" value="mpv" />
            </Select>
            <Select
              onValueChange={setJenis}
              placeholder="Semua Jenis"
              selectedValue={jenis}
              mb={2}>
              <Select.Item label="Semua Jenis" value="" />
              <Select.Item label="Putra" value="putra" />
              <Select.Item label="Putri" value="putri" />
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

export default DropspotList;
