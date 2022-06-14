import React, {useState} from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import AppNavigator from './routes/drawer';

const getFonts = () => Font.loadAsync({
  'regular': require('./assets/fonts/Lato-Regular.ttf'),
  'title2': require('./assets/fonts/LoveYaLikeASister-Regular.ttf'),
  'title1': require('./assets/fonts/LovedbytheKing-Regular.ttf')
});

export default function App() {
  const[fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <AppNavigator />
    );
    
  } else {
    return (
      <AppLoading 
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={() => console.log('error')}
      />
    );
  }
}
