import {View, Text} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {Fonts, Colors} from '../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const BackBtn = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.primary,
        height: wp(10),
        width: wp(10),
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: wp(5),
      }}>
      <Icon name="arrow-back" size={wp(7)} color="#fff" />
    </View>
  );
};

export default BackBtn;
