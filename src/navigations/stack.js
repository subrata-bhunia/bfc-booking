import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './tab';
import AuthStackScreen from './authstack';
const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="Auth" component={AuthStackScreen} />
      <Stack.Screen name="Home" component={Tabs} />
    </Stack.Navigator>
  );
};

export default Stacks;

const styles = StyleSheet.create({});
