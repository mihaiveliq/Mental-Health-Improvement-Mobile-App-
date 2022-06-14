import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import LifeBox from "../screens/lifebox";
import UnderstandingBadMoods from "../components/understandingDepression";
import MakeSomeoneSmile from "../components/makeSmile"
import Volunteering from "../components/volunteering";
import MagicList from "../components/magicList";
import EmergencyRoom from '../components/emergencyRoom';

const {Navigator, Screen} = createStackNavigator();

export default function LifeBoxStack() {
  return (       
      <Navigator initialRouteName='Life Box' screenOptions={{
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#FFFFFF',
            height: 54,
          }
      }}>

        <Screen name='Life Box' component={LifeBox} options={{
            title: 'Life Box',
          }}
        />

        <Screen name='Understanding Bad Moods' component={UnderstandingBadMoods} options={{
            title: 'Understanding Bad Moods',
          }} 
        />

        <Screen name='Make Someone Smile' component={MakeSomeoneSmile} options={{
            title: 'My Life Box',
          }} 
        />

        <Screen name='Volunteering' component={Volunteering} options={{
            title: 'Volunteering... Why Not?',
          }} 
        />

        <Screen name='My Magic List' component={MagicList} options={{
            title: 'My Magic List',
          }} 
        />

        <Screen name='Emergency Room' component={EmergencyRoom} options={{
            title: 'Emergency Room',
          }}
        />

      </Navigator>
  );
}
