import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './tab';
import AuthStackScreen from './authstack';
import Home from '../screens/Home';
const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="Home" component={Tabs} />
    </Stack.Navigator>
  );
};

export default Stacks;

const styles = StyleSheet.create({});
