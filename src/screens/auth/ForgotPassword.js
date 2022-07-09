import {View, Text, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import {Colors, Fonts} from '../../constants';
import {CommonInput} from '../../components/Input';
import BlankSpace from '../../components/BlankSpace';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ForgetPassword} from '../../api/Users';
import Vaildation from '../../components/Vaildation';

const ForgotPassword = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [status, setstatus] = useState(false);
  const [statusMsg, setstatusMsg] = useState('');
  const [btnLoader, setBtnLoader] = useState(false);

  // console.log('phone', phone);

  useEffect(() => {
    setstatus(false);
  }, [phone]);

  const handleOtpbtn = () => {
    setstatus(false);
    if (phone.length == 10) {
      setBtnLoader(true);
      ForgetPassword({
        phone: phone,
      })
        .then(res => {
          // console.log('0000', res?.data);
          if (res?.data?.status == 'Success') {
            setBtnLoader(false);
            navigation.navigate('OtpVerify', {
              phone: phone,
            });
          } else {
            setstatusMsg(res?.data?.message);
            setstatus(true);
            setBtnLoader(false);
          }
        })
        .catch(err => {
          // console.log('send otp api error :', err);
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
        Forgot Password
      </Text>

      <BlankSpace height={hp(1)} />
      <Text
        style={{
          fontSize: wp(4),
          color: '#000',
          fontFamily: Fonts.regular,
          textAlign: 'center',
        }}>
        We Are Verities
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

      <BlankSpace height={hp(4)} />
      <Button
        onPress={() => handleOtpbtn()}
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
        btnName="SEND OTP"
        isLoader={btnLoader}
      />
    </KeyboardAwareScrollView>
  );
};

export default ForgotPassword;
