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
          source={{
            uri: 'https://scontent.fccu9-1.fna.fbcdn.net/v/t39.30808-6/273369029_3121032658223795_870884867427691309_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=88toaS_OdwwAX-3PztL&_nc_ht=scontent.fccu9-1.fna&oh=00_AT80jPUclNsGnoA5FB2-XWq6K4cCwAvevMQxg_4W_LxTtA&oe=6222459D',
          }}
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
