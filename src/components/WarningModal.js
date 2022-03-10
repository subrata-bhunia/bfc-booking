import Model from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {Fonts, Colors} from '../constants';
import Button from './Button';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function WarningModal({h1, yes, no, open, setopen}) {
  var Heading = h1 || '';
  var Yes = yes?.name || 'Yes';
  var No = no?.name || 'No';
  var YesPress = yes?.onPress || console.log('Yes');
  var NoPress = () => no?.onPress || setopen(!open);

  return (
    <View>
      <Model
        isVisible={open}
        onBackdropPress={() => setopen(!open)}
        statusBarTranslucent
        animationIn="slideInUp"
        animationOut="slideOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropOpacity={0.6}>
        <View style={styles.Model}>
          <Text style={styles.text}>{Heading}</Text>
          <View style={styles.Buttons}>
            <View>
              <Button
                btnName={Yes}
                onPress={YesPress}
                textStyle={styles.text1}
                btnStyle={{
                  height: 40,
                  width: wp(25),
                  padding: 5,
                  backgroundColor: Colors.white,
                  borderRadius: 5,
                  borderColor: Colors.botton,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                }}
              />
            </View>
            <View>
              <Button
                btnName={No}
                onPress={NoPress}
                textStyle={styles.text1}
                btnStyle={{
                  height: 40,
                  width: wp(25),
                  padding: 5,
                  backgroundColor: Colors.white,
                  borderRadius: 5,
                  borderColor: Colors.error,
                  borderBottomWidth: 1,
                  borderRightWidth: 1,
                }}
              />
            </View>
          </View>
        </View>
      </Model>
    </View>
  );
}

const styles = StyleSheet.create({
  Model: {
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    padding: 15,
    paddingVertical: 20,
  },
  text: {
    fontFamily: Fonts.medium,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.text,
  },
  text1: {
    fontFamily: Fonts.semibold,
    textAlign: 'center',
    fontSize: 16,
    color: Colors.text,
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});
