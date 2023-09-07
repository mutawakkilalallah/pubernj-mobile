import {
  Badge,
  Box,
  Button,
  Divider,
  HStack,
  Input,
  Spinner,
  Text,
  View,
  Modal,
  Select,
  FlatList,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage} from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import {notifError} from '../../utils';

const UserList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fltRole, setFltRole] = useState([]);
  const [meta, setMeta] = useState({});
  const [cari, setCari] = useState('');
  const [role, setRole] = useState('');
  const [limit, setLimit] = useState(25);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleReset = () => {
    setRole('');
    setCari('');
    setLimit(25);
  };

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/user`, {
        headers: {
          'x-auth-token': token,
        },
        params: {
          cari,
          role,
          limit,
        },
      });
      setData(resp.data.data);
      setMeta(resp.headers);
      setFltRole(resp.data.filter.role);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notifError(err);
    }
  };

  useEffect(() => {
    getData();
  }, [cari, role, limit]);

  return (
    <View flex={1} backgroundColor={'white'}>
      <HeaderPage
        navigation={navigation}
        title="Data User"
        total={meta['x_total_data']}
      />
      <HStack m={4} justifyContent={'center'} space={2}>
        <Input
          placeholder="Cari User .."
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
        <FlatList
          px={4}
          data={data}
          renderItem={({item}) => {
            return (
              <Box borderBottomWidth={1} borderBottomColor={'muted.300'} mt={2}>
                <Text fontWeight={'bold'}>{item?.nama_lengkap}</Text>
                <Text color={'muted.500'}>{`@${item?.username}`}</Text>
                <Badge
                  colorScheme={'success'}
                  w={100}
                  mt={1}
                  mb={2}>{`(${item?.role})`}</Badge>
              </Box>
            );
          }}
          keyExtractor={item => item.uuid}
        />
      )}
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'xl'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Filter User</Modal.Header>
          <Modal.Content p={4} borderRadius={0} shadow={'none'}>
            <Select
              onValueChange={setRole}
              placeholder="Semua Hak Akses"
              selectedValue={role}
              mb={2}>
              <Select.Item label="Semua Hak Akses" value="" />
              {fltRole.map(a => {
                return (
                  <Select.Item key={a.key} label={a.key} value={a.value} />
                );
              })}
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

export default UserList;
