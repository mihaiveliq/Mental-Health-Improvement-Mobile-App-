import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import Home from "../screens/home";
import ReviewDetails from "../screens/reviewDetails";

import Header from "../shared/header";

const Stack = createStackNavigator();

export default function HomeStack({navigation}) {
  return (       
      <Stack.Navigator initialRouteName='Home' screenOptions={{
          headerTintColor: '#444',
          headerStyle: {
            backgroundColor: '#eee',
            height: 60
          }
      }}>

        <Stack.Screen name='Home' component={Home} options={{
            header: () => <Header navigation={navigation} title='GameZone'/>,
          }}
        />

        <Stack.Screen name='ReviewDetails' component={ReviewDetails} options={{
            title: 'ReviewDetails',
          }} 
        />

      </Stack.Navigator>
  );
}
