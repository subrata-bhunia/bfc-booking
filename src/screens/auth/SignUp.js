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
import Vaildation from '../../components/Vaildation';
import {SignUpUser} from '../../api/Users';

const SignUp = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [Name, setName] = useState('');
  const [NameV, setNameV] = useState(true);
  const [phone, setphone] = useState('');
  const [phoneV, setphoneV] = useState(true);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [PasswordV, setPasswordV] = useState(true);
  const [status, setstatus] = useState(false);
  const [statusMsg, setstatusMsg] = useState('');

  const _SignUp = () => {
    if (Name.length > 5 || phone.length == 10 || Password.length >= 6) {
      if (Name.length > 5) {
        if (phone.length == 10) {
          if (Password.length >= 6) {
            SignUpUser({
              name: Name,
              email: Email,
              phone: phone,
              password: Password,
            })
              .then(res => {
                if (res.data?.status === 'Failed') {
                  setstatus(true);
                  setstatusMsg(res.data?.message);
                }
              })
              .catch(err => {
                console.log(err);
                alert('Error in Signup');
              });
          } else {
            setPasswordV(false);
          }
        } else {
          setphoneV(false);
        }
      } else {
        setNameV(false);
      }
    } else {
      setNameV(false);
      setphoneV(false);
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
      <View>
        <CommonInput
          iconName="person"
          plholder={'Enter Your Name'}
          value={Name}
          onchangeText={value => {
            setName(value);
            setNameV(true);
          }}
        />
        {NameV ? null : <Vaildation errormsg="Enter Vaild Name" />}
      </View>

      <BlankSpace height={hp(4)} />
      <View>
        <CommonInput
          iconName="phone-iphone"
          plholder={'Mobile Number'}
          value={phone}
          onchangeText={value => {
            setphone(value);
            setphoneV(true);
          }}
          keyboardType="numeric"
        />
        {phoneV ? null : <Vaildation errormsg="Enter Vaild Phone Number" />}
      </View>
      <BlankSpace height={hp(4)} />
      <CommonInput
        iconName="email"
        plholder={'Enter Your Email'}
        value={Email}
        onchangeText={value => {
          setEmail(value);
        }}
        keyboardType="email-address"
      />

      <BlankSpace height={hp(4)} />
      <View>
        <CommonInput
          iconName="lock"
          plholder={'Password'}
          value={Password}
          onchangeText={value => {
            setPassword(value);
            setPasswordV(true);
          }}
          rightIconName={!show ? 'visibility' : 'visibility-off'}
          rightIconClick={() => setShow(!show)}
          textType={!show ? true : false}
        />
        {PasswordV ? null : <Vaildation errormsg="Enter Vaild Password" />}
      </View>

      <BlankSpace height={hp(4)} />

      <View>
        {status ? <Vaildation errormsg={statusMsg} /> : null}
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
          btnName="REGISTER"
          onPress={() => {
            _SignUp();
          }}
        />
      </View>

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
            Sign In
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUp;
