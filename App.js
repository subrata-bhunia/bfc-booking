import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState} from 'react';

import {StatusBar, ToastAndroid} from 'react-native';
import Stacks from './src/navigations/stack';
import AuthStackScreen from './src/navigations/authstack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/components/context';
import {UIStore} from './src/UIStore';
import {UserInfo} from './src/api/Users';

export default function App() {
  const [login, setlogin] = useState(false);
  // * Check Login
  const checkLogin = async () => {
    try {
      const value = await AsyncStorage.getItem('@login');
      const user_id = await AsyncStorage.getItem('userId');
      if (value !== null) {
        if (user_id !== null) {
          setlogin(true);
          UIStore.update(s => {
            s.userId = user_id;
          });
          console.log(user_id);
        }
      }
    } catch (error) {
      console.log('Check Login', error);
    }
  };

  useEffect(() => {
    checkLogin();
  }, [login]);
  // ----------- //
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);
  // -------------- //

  const authContext = React.useMemo(() => ({
    signIn: userId => {
      if (userId !== undefined) {
        try {
          AsyncStorage.setItem('@login', 'true');
          AsyncStorage.setItem('userId', userId);
          setlogin(true);
          UIStore.update(s => {
            s.userId = userId;
          });
        } catch (err) {
          console.log(err);
        }
      }
    },
    signOut: () => {
      AsyncStorage.clear();
      setlogin(false);
    },
    signUp: status => {
      if (status !== undefined) {
        try {
          AsyncStorage.setItem('@login', 'true');
          AsyncStorage.setItem('userId', status);
          setlogin(true);
          UIStore.update(s => {
            s.userId = status;
          });
        } catch (err) {
          console.log('SignUp Error', err);
        }
      }
    },
  }));
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar
          translucent
          backgroundColor={'transparent'}
          barStyle="dark-content"
        />
        {login ? <Stacks /> : <AuthStackScreen />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
