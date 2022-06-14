import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import Health from "../screens/health";
import ImportantExercises from "../components/exercices";
import GuidedTasks from "../components/tasks"
import TipsforOvercomingStress from "../components/tips";
import ExploreLife from "../components/discovering";
import EmergencyRoom from '../components/emergencyRoom';

const {Navigator, Screen} = createStackNavigator();

export default function HealthStack() {
  return (
      <Navigator initialRouteName='Health' screenOptions={{
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#FFFFFF',
            height: 54,
          }
      }}>

        <Screen name='Health' component={Health} options={{
            title: 'Health',
          }}
        />

        <Screen name='Important Exercises' component={ImportantExercises} options={{
            title: 'Important to Do Exercises',
          }}
        />

        <Screen name='Guided Tasks' component={GuidedTasks} options={{
            title: 'Guided Tasks',
          }}
        />

        <Screen name='Tips for Overcoming Stress' component={TipsforOvercomingStress} options={{
            title: 'Tips for Overcoming Stress',
          }}
        />

        <Screen name='Explore Life' component={ExploreLife} options={{
            title: 'Explore Life',
          }}
        />

        <Screen name='Emergency Room' component={EmergencyRoom} options={{
            title: 'Emergency Room',
          }}
        />

      </Navigator>
  );
}
