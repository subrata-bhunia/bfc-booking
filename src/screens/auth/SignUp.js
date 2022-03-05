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
import {TouchableOpacity} from 'react-native-gesture-handler';

const SignUp = ({navigation}) => {
  const [show, setShow] = useState(false);
  return (
    <KeyboardAwareScrollView style={{backgroundColor: '#fff', flex: 1}}>
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

      <BlankSpace height={hp(5)} />
      <CommonInput
        iconName="person"
        plholder={'Enter Your Name'}
        // value={value}
        // onChangeText={(value) => onchangeText(value)}
      />

      <BlankSpace height={hp(4)} />
      <CommonInput
        iconName="phone-iphone"
        plholder={'Mobile Number'}
        // value={value}
        // onChangeText={(value) => onchangeText(value)}
        keyboardType="numeric"
      />

      <BlankSpace height={hp(4)} />
      <CommonInput
        iconName="email"
        plholder={'Enter Your Email'}
        // value={value}
        // onChangeText={(value) => onchangeText(value)}
        keyboardType="email-address"
      />

      <BlankSpace height={hp(4)} />
      <CommonInput
        iconName="lock"
        plholder={'Password'}
        // value={value}
        // onChangeText={(value) => onchangeText(value)}
        rightIconName={show ? 'visibility' : 'visibility-off'}
        rightIconClick={() => setShow(!show)}
        textType={show ? true : false}
      />

      <BlankSpace height={hp(4)} />
      <Button
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
        btnName=" SIGN UP"
      />

      <BlankSpace height={hp(4)} />
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
          Have an account?
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignIn');
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

export default SignUp;
