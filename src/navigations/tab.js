import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Booking from '../screens/Bookings';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Icon, Image} from 'react-native-elements';
import {Colors, Fonts} from '../constants';
import AllBookings from '../screens/AllBookings';
import ContactList from '../screens/Contacts';
import Members from '../screens/Members';
import Events from '../screens/Events';
import Stacks from './stack';
import Modify from '../screens/Modify/Modify';

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({children, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={{
      alignItems: 'center',
      justifyContent: 'center',
      top: -hp(3.5),
      shadowColor: Colors.primary,
      ...styles.shadow,
      marginHorizontal: wp(3),
    }}>
    <View style={{height: hp(2), width: hp(2), borderRadius: hp(1)}}>
      {children}
    </View>
  </TouchableOpacity>
);
const Tabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        showLabel: false,
        style: {
          position: 'absolute',
          height: hp(9),
          // backgroundColor: 'rgba(240,240,240,1)',
          backgroundColor: '#fff',
          bottom: hp(2),
          left: wp(5),
          right: wp(5),
          borderRadius: 15,
          elevation: 0,
          ...styles.shadow,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/icons/catering.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.botton : Colors.disable,
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  marginTop: 3,
                  color: focused ? Colors.primary : Colors.disable,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Bookings"
        component={AllBookings}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/icons/list.png')}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.botton : Colors.disable,
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  marginTop: 3,
                  color: focused ? Colors.primary : Colors.disable,
                }}>
                Booking
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarIcon: ({focused}) => (
            <View
              style={{
                // height: wp(14),
                // width: wp(14),
                // borderRadius: wp(100),
                // backgroundColor: !focused ? Colors.white : Colors.red,
                // borderWidth: 1,
                borderColor: Colors.disable,
                // borderColor: !focused ? '#cfcfcf' : '#ff9494',
                // borderColor: 'red',
                backgroundColor: '#eee',
                height: wp(15),
                width: wp(15),
                borderRadius: wp(100),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  height: wp(13),
                  width: wp(13),
                  borderRadius: wp(100),
                  backgroundColor: !focused ? Colors.white : Colors.red,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // borderWidth: 1,
                  borderColor: !focused ? '#cfcfcf' : '#ff9494',
                }}>
                <Icon
                  name="plus"
                  type="octicon"
                  // reverse
                  color={!focused ? Colors.red : Colors.white}
                  // reverseColor={!focused ? Colors.white : Colors.red}
                  size={wp(6)}
                  style={{elevation: 5}}
                />
              </View>
            </View>
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Members"
        component={Members}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/icons/contact.png')}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.botton : Colors.disable,
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  marginTop: 3,
                  color: focused ? Colors.primary : Colors.disable,
                }}>
                Members
              </Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen
        name="Contact"
        component={ContactList}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/icons/contact.png')}
                style={{
                  height: 30,
                  width: 30,
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.botton : Colors.disable,
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  marginTop: 3,
                  color: focused ? Colors.primary : Colors.disable,
                }}>
                Contact
              </Text>
            </View>
          ),
        }}
      /> */}
      <Tab.Screen
        name="Event"
        component={Events}
        // component={Events}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/icons/event.png')}
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: 'contain',
                  tintColor: focused ? Colors.botton : Colors.disable,
                }}
              />
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  marginTop: 3,
                  color: focused ? Colors.primary : Colors.disable,
                }}>
                Events
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    shadowRadius: 3.5,
    elevation: 10,
  },
});
