import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  AreaList,
  ArmadaList,
  Dashboard,
  DropspotList,
  Login,
  SantriDetail,
  SantriList,
  PenumpangList,
  PenumpangDetail,
  SplashSreen,
  UserList,
  PersyaratanList,
  UbahPassword,
  QrCode,
  UbahPersyaratan,
  UbahDropspot,
  ArmadaDetail,
  Development,
  NFCScan,
} from '../pages';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SplashScreen" component={SplashSreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="SantriList" component={SantriList} />
      <Stack.Screen name="SantriDetail" component={SantriDetail} />
      <Stack.Screen name="PenumpangList" component={PenumpangList} />
      <Stack.Screen name="PenumpangDetail" component={PenumpangDetail} />
      <Stack.Screen name="UbahPersyaratan" component={UbahPersyaratan} />
      <Stack.Screen name="UbahDropspot" component={UbahDropspot} />
      <Stack.Screen name="PersyaratanList" component={PersyaratanList} />
      <Stack.Screen name="AreaList" component={AreaList} />
      <Stack.Screen name="DropspotList" component={DropspotList} />
      <Stack.Screen name="ArmadaList" component={ArmadaList} />
      <Stack.Screen name="ArmadaDetail" component={ArmadaDetail} />
      <Stack.Screen name="UserList" component={UserList} />
      <Stack.Screen name="QrCode" component={QrCode} />
      <Stack.Screen name="NFCScan" component={NFCScan} />
      <Stack.Screen name="UbahPassword" component={UbahPassword} />
      <Stack.Screen name="Development" component={Development} />
    </Stack.Navigator>
  );
};

export default Router;
