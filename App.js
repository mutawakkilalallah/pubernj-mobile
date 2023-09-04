import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'native-base';
import Router from './src/router';
import FlashMessage from 'react-native-flash-message';

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <StatusBar barStyle={'light-content'} backgroundColor={'#365314'} />
        <FlashMessage position="top" />
        <Router />
      </NativeBaseProvider>
    </NavigationContainer>
  );
};

export default App;
