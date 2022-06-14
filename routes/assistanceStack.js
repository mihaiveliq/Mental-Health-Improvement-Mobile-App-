import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import Assistance from "../screens/assistance";
import UsefulKnowladge from "../components/usefulKnowledge";
import CollaboratingTherapists from "../components/psychiatrists"
import FirendlyAssociations from "../components/associations";
import OfficesInTown from "../components/officesTown";
import EmergencyRoom from '../components/emergencyRoom';

const {Navigator, Screen} = createStackNavigator();

export default function AssistanceStack() {
  return (

        
      <Navigator initialRouteName='Assistance' screenOptions={{
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#FFFFFF',
            height: 54,
          }
      }}>

        <Screen name='Assistance' component={Assistance} options={{
            title: 'Assistance',
          }}
        />

        <Screen name='Useful Knowladge' component={UsefulKnowladge} options={{
            title: 'Useful Knowladge About Therapy',
          }}
        />

        <Screen name='Collaborating Therapists' component={CollaboratingTherapists} options={{
            title: 'Collaborating Therapists',
          }}
        />

        <Screen name='Firendly Associations' component={FirendlyAssociations} options={{
            title: 'Firendly Associations',
          }}
        />

        <Screen name='Offices In Town' component={OfficesInTown} options={{
            title: 'Therapy Offices in My Town',
          }}
        />

        <Screen name='Emergency Room' component={EmergencyRoom} options={{
            title: 'Emergency Room',
          }}
        />

      </Navigator>
  );
}
