import {View, Text, Image, TouchableOpacity, StatusBar} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import {Colors, Fonts} from '../../constants';
import {CommonInput} from '../../components/Input';
import BlankSpace from '../../components/BlankSpace';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Vaildation from '../../components/Vaildation';

const SignIn = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [password, setpassword] = useState('');
  const [passwordV, setpasswordV] = useState(true);

  const _SignIn = () => {
    if (phone.length == 10) {
      if (password.length >= 6) {
        navigation.navigate('Home');
      } else {
        setpasswordV(false);
      }
    } else {
      setPhoneValid(false);
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: '#fff',
        flex: 1,
        paddingTop: StatusBar.currentHeight,
      }}>
      <BlankSpace height={hp(4)} />
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
        Welcome to BFC
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

      <BlankSpace height={hp(8)} />
      <View>
        <CommonInput
          iconName="phone-iphone"
          plholder={'Mobile Number'}
          value={phone}
          onchangeText={txt => {
            setPhone(txt);
            setPhoneValid(true);
          }}
          keyboardType="numeric"
          max={10}
        />
        {phoneValid ? null : <Vaildation errormsg="Enter Vaild Phone Number" />}
      </View>
      <BlankSpace height={hp(4)} />
      <View>
        <CommonInput
          iconName="lock"
          plholder={'Password'}
          value={password}
          onchangeText={value => {
            setpassword(value);
            setpasswordV(true);
          }}
          rightIconName={!show ? 'visibility' : 'visibility-off'}
          rightIconClick={() => setShow(!show)}
          textType={show ? false : true}
        />
        {passwordV ? null : <Vaildation errormsg="Enter Vaild Password" />}
      </View>

      <BlankSpace height={hp(4)} />
      <Button
        onPress={() => {
          _SignIn();
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
        btnName="SIGN IN"
      />

      <BlankSpace height={hp(3)} />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ForgotPassword');
        }}>
        <Text
          style={{
            fontSize: wp(3.5),
            textAlign: 'center',
            fontFamily: Fonts.semibold,
            color: Colors.primary,
          }}>
          Forgot password?
        </Text>
      </TouchableOpacity>

      <BlankSpace height={hp(7)} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            fontSize: wp(3.7),
            textAlign: 'center',
            fontFamily: Fonts.semibold,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          Don't Have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignUp');
          }}>
          <Text
            style={{
              color: Colors.primary,
              fontFamily: Fonts.semibold,
            }}>
            {' '}
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignIn;
