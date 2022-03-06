import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './tab';
import AuthStackScreen from './authstack';
import BookingDetails from '../screens/BookingsDetails';
const Stack = createStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Auth">
      <Stack.Screen name="Auth" component={AuthStackScreen} />
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="bookingDetails" component={BookingDetails} />
    </Stack.Navigator>
  );
};

export default Stacks;

const styles = StyleSheet.create({});
