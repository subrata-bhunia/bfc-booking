import {Linking, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../constants';
import Button from '../../components/Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const Events = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontFamily: Fonts.medium, fontSize: 20}}>
        No Events Found
      </Text>
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({});
