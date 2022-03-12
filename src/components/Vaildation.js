import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {Colors, Fonts} from '../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Vaildation = ({errormsg = '', txtStyle}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp(10),
        margin: 5,
      }}>
      <Icon
        name="circle-with-cross"
        type="entypo"
        color={Colors.error}
        size={15}
        style={{
          marginRight: 2,
        }}
      />
      <Text
        style={[{color: Colors.error, fontFamily: Fonts.regular}, txtStyle]}>
        {errormsg}
      </Text>
    </View>
  );
};

export default Vaildation;

const styles = StyleSheet.create({});
