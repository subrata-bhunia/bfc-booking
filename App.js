import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect} from 'react';

import {View, Text, StatusBar} from 'react-native';
import Stacks from './src/navigations/stack';

export default function App() {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 10000);
    // SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <Stacks />
    </NavigationContainer>
  );
}
