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
import {ResetPassword} from '../../api/Users';
import Vaildation from '../../components/Vaildation';
import {useNavigation} from '@react-navigation/native';

const NewPassword = ({route}) => {
  const RoutData = route?.params;

  const navigation = useNavigation();

  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState(RoutData?.phone);
  const [password, setPassword] = useState('');
  const [PasswordV, setPasswordV] = useState(true);
  const [confPasswordV, setConfPasswordV] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setstatus] = useState(false);
  const [statusMsg, setstatusMsg] = useState('');
  const [btnLoader, setBtnLoader] = useState(false);

  // console.log('From RoutParams', phone);

  const handleSavepasswordbtn = () => {
    setstatus(false);
    if (password.length >= 6) {
      if (password == confirmPassword) {
        setBtnLoader(true);
        ResetPassword({
          phone: phone,
          password: password,
        })
          .then(res => {
            // console.log('0000', res?.data);
            if (res?.data?.status == 'Success') {
              navigation.navigate('SignIn');
              setBtnLoader(false);
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
        setConfPasswordV(false);
      }
    } else {
      setPasswordV(false);
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
        Reset Password
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
      <CommonInput
        iconName="lock"
        plholder={'New Password'}
        value={password}
        onchangeText={value => {
          setPassword(value), setPasswordV(true);
        }}
        rightIconName={show ? 'visibility' : 'visibility-off'}
        rightIconClick={() => setShow(!show)}
        textType={show ? true : false}
      />
      {PasswordV ? null : <Vaildation errormsg="Enter Vaild Password" />}

      <BlankSpace height={hp(4)} />
      <CommonInput
        iconName="lock"
        plholder={'Re-Enter Password'}
        value={confirmPassword}
        onchangeText={value => {
          setConfirmPassword(value);
          setConfPasswordV(true);
        }}
        rightIconName={show ? 'visibility' : 'visibility-off'}
        rightIconClick={() => setShow(!show)}
        textType={show ? true : false}
      />
      {confPasswordV ? null : <Vaildation errormsg="Password mismatch" />}

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
        btnName="SAVE PASSWORD"
        onPress={() => handleSavepasswordbtn()}
        isLoader={btnLoader}
      />
    </KeyboardAwareScrollView>
  );
};

export default NewPassword;
