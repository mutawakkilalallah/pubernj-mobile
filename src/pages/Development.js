import {Button, Text, View} from 'native-base';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Development = ({navigation}) => {
  return (
    <View flex={1} justifyContent={'center'} alignItems={'center'}>
      <Icon name="code" size={48} color={'#000'} />
      <Text fontSize={'2xl'} mt={4} mb={8}>
        Ops, Mohon maaf !
      </Text>
      <Text>Fitur ini masih dalam pengembangan</Text>
      <Text>mohon tunggu update selanjutnya :)</Text>
      <Button colorScheme={'danger'} mt={4} onPress={() => navigation.goBack()}>
        KEMBALI
      </Button>
    </View>
  );
};

export default Development;
