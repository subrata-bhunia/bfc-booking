import React from 'react';

import {View, Text} from 'react-native';
import ForgotPassword from './src/screens/auth/ForgotPassword';
import NewPassword from './src/screens/auth/NewPassword';
import OtpVerify from './src/screens/auth/OtpVerify';
import SignIn from './src/screens/auth/SignIn';
import SignUp from './src/screens/auth/SignUp';
import Home from './src/screens/Home';

export default function App() {
  return (
    <View style={{flex: 1}}>
      {/* <Home /> */}
      {/* <SignIn /> */}
      {/* <SignUp /> */}
      {/* <OtpVerify /> */}
      {/* <ForgotPassword /> */}
      <NewPassword />
    </View>
  );
}
