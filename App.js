import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState} from 'react';

import {View, Text, StatusBar} from 'react-native';
import Stacks from './src/navigations/stack';
import AuthStackScreen from './src/navigations/authstack';

export default function App() {
  const [login, setlogin] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
    // SplashScreen.hide();
  }, []);
  return (
    <NavigationContainer>
      <StatusBar
        translucent
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {login ? <Stacks /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
