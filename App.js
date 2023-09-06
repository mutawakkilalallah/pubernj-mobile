import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/router';
import FlashMessage from 'react-native-flash-message';
import {SafeAreaView, StatusBar, View, StyleSheet} from 'react-native';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </SafeAreaView>
  </View>
);

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <MyStatusBar backgroundColor="#365314" barStyle="light-content" />
        {/* <StatusBar barStyle={'light-content'} backgroundColor={'#365314'} /> */}
        <FlashMessage position="top" />
        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: '#365314',
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: '#33373B',
  },
});

export default App;
