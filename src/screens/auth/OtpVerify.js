import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import {Colors, Fonts} from '../../constants';
import {CommonInput} from '../../components/Input';
import BlankSpace from '../../components/BlankSpace';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {StyleSheet} from 'react-native';
import BackBtn from '../../components/BackBtn';

const OtpVerify = ({navigation}) => {
  const [show, setShow] = useState(false);
  return (
    <KeyboardAwareScrollView style={{backgroundColor: '#fff', flex: 1}}>
      <BlankSpace height={hp(4)} />
      {/* <BackBtn /> */}
      <Image
        source={require('../../../assets/bfcLogo.png')}
        style={{height: wp(30), width: wp(30), alignSelf: 'center'}}
      />
      <BlankSpace height={hp(2)} />
      <Text
        style={{
          fontSize: wp(5),
          color: '#000',
          fontFamily: Fonts.semibold,
          textAlign: 'center',
        }}>
        Verification Code
      </Text>

      <BlankSpace height={hp(1)} />
      <Text
        style={{
          fontSize: wp(4),
          color: '#000',
          fontFamily: Fonts.regular,
          textAlign: 'center',
        }}>
        Keep your data safe null null null
      </Text>

      <BlankSpace height={hp(10)} />
      <OTPInputView
        style={{width: wp(85), height: 50, alignSelf: 'center'}}
        pinCount={6}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        // onCodeFilled={code => {
        //   this.setState({ codeInput: code, isLoading: true });
        //   this.confirmCode(code);
        //   this.keyDissmiss1(code);
        // }}
        // code={otp}
        // onCodeChanged={data => {
        //   onChangeInput(data, 'otp');
        // }}
      />

      <BlankSpace height={hp(4)} />
      <Button
        onPress={() => {
          navigation.navigate('NewPassword');
        }}
        btnStyle={{
          height: hp(7),
          width: wp(90),
          borderRadius: wp(10),
          backgroundColor: Colors.primary,
        }}
        textStyle={{
          fontFamily: Fonts.semibold,
          color: '#fff',
          fontSize: wp(4),
        }}
        btnName="VERIFY"
      />

      <BlankSpace height={hp(4)} />
      <Text
        style={{
          fontSize: wp(3.7),
          textAlign: 'center',
          fontFamily: Fonts.semibold,
        }}>
        Didn't get the verification code?
        <Text
          style={{
            color: Colors.primary,
          }}>
          {' '}
          Resend
        </Text>
      </Text>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: wp(11),
    height: wp(11),
    borderRadius: wp(2),
    backgroundColor: Colors.primary,
    opacity: 0.5,
    fontFamily: Fonts.semibold,
    fontSize: wp(4),
  },

  underlineStyleHighLighted: {
    borderColor: Colors.primary,
    borderWidth: 1,
  },
});

export default OtpVerify;
