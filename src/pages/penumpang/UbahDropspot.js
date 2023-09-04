import {Box, Button, Divider, Select, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {HeaderPage} from '../../components';
import Loading from '../Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {notifError, notifSuccess} from '../../utils';
import axios from 'axios';
import {apiUrl} from '../../config';

const UbahDropspot = ({route, navigation}) => {
  const [load, setLoad] = useState(false);
  const [listArea, setListArea] = useState([]);
  const [listDrop, setListDrop] = useState([]);
  const [areaId, setAreaId] = useState(route.params.drop.area_id);
  const [dropId, setDropId] = useState(route.params.drop.id);

  const handleUbahDroppsot = async () => {
    setLoad(true);
    const token = JSON.parse(await AsyncStorage.getItem('token'));
    const form = {
      dropspot_id: dropId,
    };
    try {
      const resp = await axios.put(
        `${apiUrl}/penumpang/dropspot/${route.params.id}`,
        form,
        {
          headers: {
            'x-auth-token': token,
          },
        },
      );
      notifSuccess(resp);
      setLoad(false);
      navigation.replace('PenumpangDetail', {
        uuid: route.params.uuid,
        niup: route.params.niup,
      });
    } catch (err) {
      setLoad(false);
      notifError(err);
    }
  };

  useEffect(() => {
    const getArea = async () => {
      const token = JSON.parse(await AsyncStorage.getItem('token'));
      try {
        const resp = await axios.get(`${apiUrl}/area`, {
          headers: {
            'x-auth-token': token,
          },
        });
        setListArea(resp.data.data);
      } catch (err) {
        notifError(err);
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
            area: areaId,
          },
        });
        setListDrop(resp.data.data);
      } catch (err) {
        notifError(err);
      }
    };
    getDrop();
  }, [areaId]);

  return (
    <View flex={1}>
      {load && <Loading />}
      <HeaderPage title={'Ubah Dropspot'} navigation={navigation} />
      <Box p={4}>
        <Select
          onValueChange={setAreaId}
          placeholder="Semua Area"
          selectedValue={areaId}
          mb={2}>
          <Select.Item label="Semua Area" value="" />
          {listArea.map(a => {
            return <Select.Item key={a.id} label={a.nama} value={a.id} />;
          })}
        </Select>
        <Select
          onValueChange={setDropId}
          placeholder="Semua Dropspot"
          selectedValue={dropId}
          isDisabled={areaId === ''}
          mb={2}>
          {listDrop.map(a => {
            return <Select.Item key={a.id} label={a.nama} value={a.id} />;
          })}
        </Select>
        <Button
          colorScheme={'success'}
          mt={2}
          onPress={() => handleUbahDroppsot()}>
          SIMPAN
        </Button>
      </Box>
    </View>
  );
};

export default UbahDropspot;
