import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Tabs from './tab';
import AuthStackScreen from './authstack';
import Home from '../screens/Home';
import BookingDetails from '../screens/BookingsDetails';
import Modify from '../screens/Modify/Modify';
import DueBookingPage from '../screens/BookingsDetails/Due';
import PickupBookingPage from '../screens/BookingsDetails/Pickup';
import MissingBookingPage from '../screens/BookingsDetails/Missing';
import CancelBooking from '../screens/BookingsDetails/Cancel';
import ReturnBookingPage from '../screens/BookingsDetails/Return';
import Notification from '../screens/Notification/Notification';
import KhataEntry from '../screens/KhataEntry/index';
import PaidBooking from '../screens/BookingsDetails/Paid';
const Stack = createStackNavigator();

const Stacks = () => {
 
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen name="Home" component={Tabs} />
      <Stack.Screen name="bookingDetails" component={BookingDetails} />
      <Stack.Screen name="pickupBooking" component={PickupBookingPage} />
      <Stack.Screen name="dueBooking" component={DueBookingPage} />
      <Stack.Screen name="missingBooking" component={MissingBookingPage} />
      <Stack.Screen name="cancelBooking" component={CancelBooking} />
      <Stack.Screen name="returnBooking" component={ReturnBookingPage} />
      <Stack.Screen name="modifyBooking" component={Modify} />
      <Stack.Screen name="notification" component={Notification} />
      <Stack.Screen name="paidBooking" component={PaidBooking} />
      <Stack.Screen name="khataentry" component={KhataEntry} />
    </Stack.Navigator>
  );
};

export default Stacks;

const styles = StyleSheet.create({});
