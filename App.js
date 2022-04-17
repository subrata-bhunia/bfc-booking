import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import React, {useEffect, useState} from 'react';

import {LogBox, StatusBar, ToastAndroid, View, Text} from 'react-native';
import Stacks from './src/navigations/stack';
import AuthStackScreen from './src/navigations/authstack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from './src/components/context';
import {UIStore} from './src/UIStore';
import {UserInfo} from './src/api/Users';
import {Provider} from 'react-redux';
import {store} from './src/redux/store/store';
import AnimatedSplash from './src/helper/react-native-animated-splash-screen';
import NetInfo from '@react-native-community/netinfo';

export default function App() {
  const [login, setlogin] = useState(false);
  const [load, setload] = useState(false);
  const [netinfo, setNetinfo] = useState(true);

  NetInfo.fetch().then(state => {
    console.log('Connection type', state.details);
    console.log('Is connected?', state.isConnected);
    setNetinfo(state.isConnected);
  });
  console.log('----------', netinfo);
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
    setload(true);
    // setTimeout(() => {
    //   SplashScreen.hide();
    // }, 1000);
  }, []);
  LogBox.ignoreAllLogs();
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
      UIStore.update(s => {
        s.userId = '';
        s.userName = '';
      });
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
    <AnimatedSplash
      translucent={true}
      isLoaded={load}
      logoImage={require('./assets/bfcLogo.png')}
      backgroundColor={'#ddb540'}
      logoHeight={150}
      logoWidth={150}>
      <Provider store={store}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            <StatusBar
              translucent
              backgroundColor={'transparent'}
              barStyle="dark-content"
            />
            {netinfo ? (
              login ? (
                <Stacks />
              ) : (
                <AuthStackScreen />
              )
            ) : (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  flex: 1,
                }}>
                <Text>Hello No InterNet</Text>
                <Text
                  style={{
                    marginTop: 20,
                    color: 'red',
                  }}
                  onPress={() => {
                    NetInfo.fetch().then(state => {
                      console.log('Connection type', state.details);
                      console.log('Is connected?', state.isConnected);
                      setNetinfo(state.isConnected);
                    });
                  }}>
                  Retry
                </Text>
              </View>
            )}
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    </AnimatedSplash>
  );
}
