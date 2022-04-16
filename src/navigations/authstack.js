import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignUp from '../screens/auth/SignUp';
import SignIn from '../screens/auth/SignIn';
import ForgotPassword from '../screens/auth/ForgotPassword';
import NewPassword from '../screens/auth/NewPassword';
import OtpVerify from '../screens/auth/OtpVerify';

const AuthStackScreen = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator initialRouteName="SignIn" headerMode="none">
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="NewPassword" component={NewPassword} />
      <AuthStack.Screen name="OtpVerify" component={OtpVerify} />
    </AuthStack.Navigator>
  );
};

export default AuthStackScreen;

const styles = StyleSheet.create({});
