import {View, Text, Image} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts} from '../constants';
import {Icon} from 'react-native-elements';

const StaticHeader = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: wp(30),
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: hp(1),
        }}>
        <Icon name="mail-outline" type="ionicon" size={27} />
        <Icon name="bell" type="simple-line-icon" size={27} />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'right',
            fontFamily: Fonts.semibold,
            color: Colors.text,
            letterSpacing: 2,
          }}>
          {'Debpur \nBright Future Club'}
        </Text>
        <Image
          source={require('../../assets/bfcLogo.png')}
          style={{
            height: 50,
            width: 50,
            borderRadius: 25,
            resizeMode: 'contain',
          }}
        />
      </View>
    </View>
  );
};

export default StaticHeader;
