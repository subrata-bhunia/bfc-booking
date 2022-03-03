import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './tab';
const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Tabs} />
    </Stack.Navigator>
  );
};

export default Stacks;

const styles = StyleSheet.create({});
