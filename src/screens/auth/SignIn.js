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
import {AuthContext} from '../../components/context';
import {SignInUser} from '../../api/Users';
import {
  notifications,
  NotificationMessage,
  Android,
} from 'react-native-firebase-push-notifications';
import {useDispatch, useSelector} from 'react-redux';
import {getSignin} from '../../redux/action';
import {SIGNIN_FAILURE} from '../../redux/action/types';

const SignIn = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [phone, setPhone] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);
  const [password, setpassword] = useState('');
  const [passwordV, setpasswordV] = useState(true);
  const [btnLoader, setBtnLoader] = useState(false);
  const {signIn} = React.useContext(AuthContext);

  const dispatch = useDispatch();
  const _SignIn = () => {
    if (phone.length == 10 || password.length >= 6) {
      if (phone.length == 10) {
        if (password.length >= 6) {
          dispatch(
            getSignin({
              phone: phone,
              password: password,
            }),
          );
        } else {
          setpasswordV(false);
        }
      } else {
        setPhoneValid(false);
      }
    } else {
      setpasswordV(false);
      setPhoneValid(false);
    }
  };
  const AuthReducer = useSelector(state => state.AuthReducer);
  useEffect(() => {
    setBtnLoader(AuthReducer.loader);
  }, [AuthReducer]);
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
        We Are Verities
      </Text>
      <BlankSpace height={hp(3)} />

      {/* <Text
        style={{
          color: Colors.red,
          fontFamily: Fonts.semibold,
          textAlign: 'center',
          fontSize: wp(3.5),
        }}>
        {status && statusMsg}
      </Text> */}
      <View
        style={{
          height: hp(7),
          alignItems: 'center',
        }}>
        {AuthReducer.status == SIGNIN_FAILURE ? (
          <Vaildation
            errormsg={AuthReducer.error}
            txtStyle={{fontFamily: Fonts.semibold}}
          />
        ) : null}
      </View>

      {/* <BlankSpace height={hp(1)} /> */}
      <View>
        <CommonInput
          iconName="phone-iphone"
          plholder={'Mobile Number'}
          value={phone}
          onchangeText={txt => {
            setPhone(txt);
            setPhoneValid(true);
            dispatch({type: SIGNIN_FAILURE, error: ''})
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
            dispatch({type: SIGNIN_FAILURE, error: undefined})
          }}
          rightIconName={!show ? 'visibility' : 'visibility-off'}
          rightIconClick={() => setShow(!show)}
          textType={show ? false : true}
        />
        {passwordV ? null : <Vaildation errormsg="Enter Vaild Password" />}
      </View>

      <BlankSpace height={hp(4)} />
      {/* {status ? <Vaildation errormsg={statusMsg} /> : null} */}
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
        isLoader={(AuthReducer.status == 'SIGNIN_REQUEST') && AuthReducer.loader}
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
