import React from 'react';
import {View, Spinner} from 'native-base';
import {StyleSheet} from 'react-native';

const Loading = () => {
  return (
    <View style={styles.overlay}>
      <Spinner size={'lg'} color={'lime.900'} />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
});

export default Loading;
