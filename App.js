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
import messaging from '@react-native-firebase/messaging';
import {
  notifications,
  messages,
  NotificationMessage,
  Android,
} from 'react-native-firebase-push-notifications';

function AppZ({props}) {
  console.log('Props', props);
  const [login, setlogin] = useState(false);
  const [load, setload] = useState(false);
  const [netinfo, setNetinfo] = useState(true);

  NetInfo.fetch().then(state => {
    // console.log('Connection type', state.details);
    // console.log('Is connected?', state.isConnected);
    setNetinfo(state.isConnected);
  });
  // console.log('----------', netinfo);
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

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      hasPermission: false,
    };
  }

  componentDidMount() {
    this.onNotificationListener();
    this.onNotificationOpenedListener();
    this.getInitialNotification();
    this.getToken();
    this.onTokenRefreshListener();
  }
  componentWillUnmount() {}

  getToken = async () => {
    //get the messeging token
    const token = await notifications.getToken();
    //you can also call messages.getToken() (does the same thing)
    console.log('token', token);
    return token;
  };
  getInitialNotification = async () => {
    //get the initial token (triggered when app opens from a closed state)
    const notification = await notifications.getInitialNotification();
    console.log('getInitialNotification', notification);
    return notification;
  };

  onNotificationOpenedListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the background
    this.removeOnNotificationOpened = notifications.onNotificationOpened(
      notification => {
        console.log('onNotificationOpened', notification);
        //do something with the notification
      },
    );
  };

  onNotificationListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when the application is in the forground/runnning
    //for android make sure you manifest is setup - else this wont work
    this.removeOnNotification = notifications.onNotification(notification => {
      //do something with the notification
      console.log('onNotification', notification);
    });
  };

  onTokenRefreshListener = () => {
    //remember to remove the listener on un mount
    //this gets triggered when a new token is generated for the user
    this.removeonTokenRefresh = messages.onTokenRefresh(token => {
      //do something with the new token
    });
  };
  setBadge = async number => {
    //only works on iOS for now
    return await notifications.setBadge(number);
  };

  getBadge = async () => {
    //only works on iOS for now
    return await notifications.getBadge();
  };

  hasPermission = async () => {
    //only works on iOS
    return await notifications.hasPermission();
  };

  requestPermission = async () => {
    //only works on iOS
    return await notifications.requestPermission();
  };
  componentWillUnmount() {
    //remove the listener on unmount
    if (this.removeOnNotificationOpened) {
      this.removeOnNotificationOpened();
    }
    if (this.removeOnNotification) {
      this.removeOnNotification();
    }

    if (this.removeonTokenRefresh) {
      this.removeonTokenRefresh();
    }
  }

  onTokenButtonPress = async () => {
    const token = await this.getToken();
    console.log('token : ', token);
    this.setState({token: token});
  };

  onTestHasPermission = async () => {
    const has = await this.hasPermission();
    console.log('Has', has);
    this.setState({hasPermission: has});
  };
  render() {
    const {token, hasPermission} = this.state;
    return <AppZ props={(token, hasPermission)} />;
  }
}
