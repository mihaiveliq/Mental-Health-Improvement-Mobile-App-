import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import SafetyPlan from "../screens/safetyplan";
import EmergencyKit from "../components/emergencyKit";
import HandleCrisis from "../components/crysisHandling"
import PreventCrisis from "../components/crysisPrevention";
import DangerSigns from "../components/dangerSigns";
import EmergencyRoom from '../components/emergencyRoom';

const {Navigator, Screen} = createStackNavigator();

export default function SafetyPlanStack() {
  return (  
      <Navigator initialRouteName='Safety Plan' screenOptions={{
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#FFFFFF',
            height: 54,
          }
      }}>

        <Screen name='Safety Plan' component={SafetyPlan} options={{
            title: 'Safety Plan',
          }}
        />

        <Screen name='Emergency Kit' component={EmergencyKit} options={{
            title: 'My Emergency Kit',
          }}
        />

        <Screen name='Handle Crisis' component={HandleCrisis} options={{
            title: 'Handling a Crisis',
          }}
        />

        <Screen name='Prevent Crisis' component={PreventCrisis} options={{
            title: 'Preventing a Crisis',
          }}
        />

        <Screen name='DangerSigns' component={DangerSigns} options={{
            title: 'Signs that Someone Might Be in Danger',
          }}
        />

        <Screen name='Emergency Room' component={EmergencyRoom} options={{
            title: 'Emergency Room',
          }}
        />

      </Navigator>
  );
}
