import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';

import HomeStack from './homeStack';
import BottomTab from './bottomTab';
import Login from "../screens/login";

import { StatusBar } from 'expo-status-bar';
import DrawerHeader from "../shared/drawerHeader";

import React from 'react';

const { Navigator, Screen } = createDrawerNavigator();

export const RootDrawerNavigator = () => (
  
  <Navigator initialRouteName='BottomTab' screenOptions={{
    headerStyle: {
      backgroundColor: "#55AEE0",
    },
    header: ({navigation}) => <DrawerHeader navigation={navigation}/>, 
  }}>

    <Screen
      name='BottomTab'
      component={BottomTab}
      options={{ title: 'Main Menu' }}
    />

    {/* <Screen
      name='HomeDrawer'
      component={HomeStack}
      options={{ title: 'Home' }}   
    /> */}

    <Screen
      name='LoginScreen'
      component={Login}
      options={{ title: 'Authentication' }}   
    />
    
  </Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
    <RootDrawerNavigator />
    <StatusBar style="auto" />
  </NavigationContainer>
);

export default AppNavigator;
