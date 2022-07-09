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
import {OtpVerifyAPI} from '../../api/Users';
import Vaildation from '../../components/Vaildation';

const OtpVerify = ({navigation, route}) => {
  const RoutData = route?.params;

  const [phone, setPhone] = useState(RoutData?.phone);
  const [phoneValid, setPhoneValid] = useState(true);
  const [otp, setOtp] = useState(null);
  const [status, setstatus] = useState(false);
  const [statusMsg, setstatusMsg] = useState('');
  const [btnLoader, setBtnLoader] = useState(false);

  // console.log('From RoutParams', phone);

  const handleVerifybtn = () => {
    setstatus(false);
    if (otp) {
      setBtnLoader(true);
      OtpVerifyAPI({
        phone: phone,
        otp: otp,
      })
        .then(res => {
          // console.log('0000', res?.data);
          if (res?.data?.status == 'Success') {
            setBtnLoader(false);
            navigation.navigate('NewPassword', {
              phone: phone,
            });
          } else {
            setstatusMsg(res?.data?.message);
            setstatus(true);
            setBtnLoader(false);
          }
        })
        .catch(err => {
          // console.log('verify otp api error :', err);
          setstatusMsg('Something went wrong');
          setstatus(true);
          setBtnLoader(false);
        });
    } else {
      setPhoneValid(false);
    }
  };
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
      <BlankSpace height={hp(2)} />
      <View
        style={{
          height: hp(7),
          alignItems: 'center',
        }}>
        {status ? (
          <Vaildation
            errormsg={statusMsg}
            txtStyle={{fontFamily: Fonts.semibold}}
          />
        ) : null}
      </View>

      <BlankSpace height={hp(3)} />
      <OTPInputView
        style={{width: wp(65), height: 50, alignSelf: 'center'}}
        pinCount={4}
        autoFocusOnLoad
        codeInputFieldStyle={styles.underlineStyleBase}
        codeInputHighlightStyle={styles.underlineStyleHighLighted}
        onCodeFilled={code => {
          setOtp(code);
        }}
      />

      <BlankSpace height={hp(4)} />
      <Button
        onPress={() => {
          handleVerifybtn();
          // navigation.navigate('NewPassword');
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
        isLoader={btnLoader}
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
    width: wp(13),
    height: wp(13),
    borderRadius: wp(90),
    // backgroundColor: Colors.primary,
    borderColor: Colors.disable,
    opacity: 0.8,
    fontFamily: Fonts.semibold,
    fontSize: wp(5),
    borderWidth: 3,
    color: Colors.text,
  },

  underlineStyleHighLighted: {
    borderColor: Colors.primary,
    // borderWidth: 1,
    opacity: 1,
    color: Colors.text,
  },
});

export default OtpVerify;
