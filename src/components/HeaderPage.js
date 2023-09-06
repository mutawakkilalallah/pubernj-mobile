import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Badge, Box, HStack, Pressable, Text, View} from 'native-base';

const HeaderPage = ({navigation, title, total = 0, link = null}) => {
  return (
    <View>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        p={4}
        backgroundColor={'lime.900'}>
        <HStack>
          <Pressable
            onPress={() =>
              link ? navigation.navigate(link) : navigation.goBack()
            }>
            <Icon name="arrow-left" size={24} color={'white'} />
          </Pressable>
          <Text ml={4} fontSize={'lg'} color={'white'} fontWeight={'bold'}>
            {title}
          </Text>
        </HStack>
        {total ? <Badge>{`Total Data : ${total ?? 0}`}</Badge> : <Box></Box>}
      </HStack>
    </View>
  );
};

export default HeaderPage;
