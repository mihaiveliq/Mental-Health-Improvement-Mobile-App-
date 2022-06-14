import React from 'react';

import { createStackNavigator } from '@react-navigation/stack'

import Resources from "../screens/resources";
import Posts from "../components/posts";
import Newsletter from "../components/newsletter";
import WeeklyPodcasts from "../components/weeklyPodcasts";
import Stories from "../components/stories";
import EmergencyRoom from '../components/emergencyRoom';

const {Navigator, Screen} = createStackNavigator();

export default function ResourcesStack() {

  return (
      <Navigator initialRouteName='Resources' screenOptions={{
          headerTintColor: '#000000',
          headerStyle: {
            backgroundColor: '#FFFFFF',
            height: 54,
          }
      }}>

        <Screen name='Resources' component={Resources} options={{
            title: 'Resources',
          }}
        />

        <Screen name='Posts' component={Posts} options={{
            title: 'Posts',
          }} 
        />

        <Screen name='Newsletter' component={Newsletter} options={{
            title: 'Newsletter',
          }} 
        />

        <Screen name='Weekly Podcasts' component={WeeklyPodcasts} options={{
            title: 'Weekly Podcasts',
          }} 
        />

        <Screen name='Stories' component={Stories} options={{
            title: 'Stories',
          }} 
        />

        <Screen name='Emergency Room' component={EmergencyRoom} options={{
            title: 'Emergency Room',
          }}
        />

      </Navigator>
  );
}
