import {Linking, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../constants';
import Button from '../../components/Button';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

const Events = () => {
  const sendWPsms = (phone, return_date) => {
    var Pickmsg = `Your Cooking instrument booking from *Debpur BFC* has been picked up and you should return on *${return_date}*.\n Dowload Details : https://debpurbfc.com/download-invoice/ORD4563838577`;
    var phone_n = phone.split(' ').join('').replace('+91', '');
    var phone_new = phone_n.charAt(0) === '0' ? phone_n.substring(1) : phone_n;
    Linking.openURL(
      'whatsapp://send?text=' + Pickmsg + '&phone=91' + phone_new,
    ).catch(err =>
      ToastAndroid.show(
        "Can't Open Whatsapp.",
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      ),
    );
    // console.log("WP")
  };
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
      {/* <Button
        onPress={() => {
          sendWPsms('7318915280', '10th March, 2022 (Morning)');
        }}
        btnStyle={{
          height: heightPercentageToDP(6),
          width: widthPercentageToDP(80),
          borderRadius: 50,
          backgroundColor: Colors.botton,
          marginVertical: heightPercentageToDP(2),
          shadowColor: Colors.primary,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 1,
          shadowRadius: 3.5,
          elevation: 10,
        }}
        textStyle={{
          fontFamily: Fonts.semibold,
          color: '#fff',
          fontSize: widthPercentageToDP(4),
        }}
        btnName="Whatsapp"
      /> */}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({});
