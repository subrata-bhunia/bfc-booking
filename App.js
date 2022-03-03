import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {View, Text, StatusBar} from 'react-native';
import Stacks from './src/navigations/stack';

export default function App() {
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
