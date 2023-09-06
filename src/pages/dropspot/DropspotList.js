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
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage} from '../../components';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../../config';
import {notifError} from '../../utils';

const DropspotList = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [fltArea, setFltArea] = useState([]);
  const [meta, setMeta] = useState({});
  const [cari, setCari] = useState('');
  const [area, setArea] = useState('');
  const [limit, setLimit] = useState(25);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleReset = () => {
    setArea('');
    setCari('');
    setLimit(25);
  };

  const getData = async () => {
    setLoading(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    try {
      const resp = await axios.get(`${apiUrl}/dropspot`, {
        headers: {
          'x-auth-token': token,
        },
        params: {
          cari,
          area,
          limit,
        },
      });
      setData(resp.data.data);
      setMeta(resp.headers);
      setFltArea(resp.data.filter.area);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      notifError(err);
    }
  };

  useEffect(() => {
    getData();
  }, [cari, area, limit]);

  return (
    <View flex={1} backgroundColor={'white'}>
      <HeaderPage
        navigation={navigation}
        title="Data Dropspot"
        total={meta['x_total_data']}
      />
      <HStack m={4} justifyContent={'center'} space={2}>
        <Input
          placeholder="Cari Dropspot .."
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
              <Box
                borderBottomWidth={1}
                borderBottomColor={'muted.300'}
                mt={2}
                key={d.id}>
                <Text fontWeight={'bold'}>{d?.nama}</Text>
                <Text color={'muted.500'}>{d?.area?.nama}</Text>
                <Badge
                  colorScheme={'success'}
                  w={24}
                  mt={1}
                  mb={2}>{`Rp. ${d?.harga}`}</Badge>
              </Box>
            );
          })}
        </ScrollView>
      )}
      <Modal isOpen={modalVisible} onClose={setModalVisible} size={'xl'}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Filter Dropspot</Modal.Header>
          <Modal.Content p={4} borderRadius={0} shadow={'none'}>
            <Select
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

export default DropspotList;
