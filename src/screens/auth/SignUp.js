import {View, Text, Image, StyleSheet} from 'react-native';
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
import {TouchableOpacity} from 'react-native-gesture-handler';
import Vaildation from '../../components/Vaildation';
import {OtpVerifyAPIRegister, SignUpUser} from '../../api/Users';
import {AuthContext} from '../../components/context';
import Modal from 'react-native-modal';
import OTPInputView from '@twotalltotems/react-native-otp-input';

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
  const [status2, setstatus2] = useState(false);
  const [statusMsg, setstatusMsg] = useState('');
  const {signUp} = React.useContext(AuthContext);
  const [btnLoader, setBtnLoader] = useState(false);
  //For verify Otp btn
  const [btnLoader2, setBtnLoader2] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const [otp, setOtp] = useState(0);
  const [otpRes, setOtpRes] = useState(1);
  const [otpLoader, setOtpLoader] = useState(false);
  const [otpV, setOtpV] = useState(true);
  const [modal, setModal] = useState(false);

  console.log('isOtp', isOtp);

  // useEffect(() => {
  //   if (otp == otpRes) {
  //     setIsOtp(true);
  //   } else {
  //     setIsOtp(false);
  //   }
  // }, [otp]);

  useEffect(() => {
    setstatus(false);
  }, [Password, phone, Email, Name]);

  const _SignUp = () => {
    if (Name.length > 5 || phone.length == 10 || Password.length >= 6) {
      if (Name.length > 5) {
        if (phone.length == 10) {
          if (Password.length >= 6) {
            if (isOtp) {
              setBtnLoader(true);
              SignUpUser({
                name: Name,
                email: Email,
                phone: phone,
                password: Password,
              })
                .then(res => {
                  if (res.data?.status === 'Success') {
                    signUp(res.data?.user_id);
                  } else {
                    setBtnLoader(false);
                    setstatus(true);
                    setstatusMsg(res.data?.message);
                  }
                })
                .catch(err => {
                  setBtnLoader(false);
                  console.log(err);
                  alert('Error in Signup');
                });
            } else {
              setstatusMsg('Mobile number not verified');
              setstatus(true);
            }
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
  const sendOtpbtn = () => {
    if (phone.length == 10) {
      setOtpLoader(true);
      OtpVerifyAPIRegister({
        phone: phone,
      })
        .then(res => {
          if (res.data?.status === 'Success') {
            setModal(true);
            console.log('00', res.data);
            setOtpRes(res?.data?.otp);
          } else {
            // setBtnLoader2(false);
            setstatus(true);
            setstatusMsg(res.data?.message);
          }
          setOtpLoader(false);
        })
        .catch(err => {
          console.log('API ERROR', err);
          setOtpLoader(false);
          // setBtnLoader2(false);
          // setstatus2(true);
          setstatusMsg('somthing went wrong');
        });
    } else {
      setphoneV(false);
    }
  };

  const handleVerifyOtp = () => {
    if (otp) {
      setBtnLoader2(true);
      setTimeout(() => {
        if (otp == otpRes) {
          setIsOtp(true);
          setModal(false);
        } else {
          setIsOtp(false);
          setstatus2(true);
          setBtnLoader2(false);
        }
      }, 2000);
    } else {
      setOtpV(false);
    }
  };
  return (
    <>
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
            max={10}
            value={phone}
            onchangeText={value => {
              setphone(value);
              setphoneV(true);
            }}
            keyboardType="numeric"
            rightText={isOtp ? '' : 'Verify'}
            rightIconName={isOtp ? 'verified' : null}
            rightLoader={otpLoader}
            rightTextClick={() => (isOtp ? null : sendOtpbtn())}
            editable={isOtp ? false : true}
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
          {/* {status ? <Vaildation errormsg={statusMsg} /> : null} */}
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
            isLoader={btnLoader}
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
      <Modal
        isVisible={modal}
        statusBarTranslucent
        onBackdropPress={() => setModal(!modal)}
        backdropOpacity={0.6}
        focusable
        onBackButtonPress={() => {
          setModal(false);
        }}>
        <View
          style={{
            backgroundColor: Colors.white,
            padding: wp(4),
            paddingVertical: hp(4),
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: wp(6),
              fontFamily: Fonts.semibold,
            }}>
            Enter OTP
          </Text>

          <BlankSpace height={hp(2)} />
          <View
            style={{
              height: hp(7),
              alignItems: 'center',
            }}>
            {status2 ? (
              <Vaildation
                errormsg={'Invalid otp'}
                txtStyle={{fontFamily: Fonts.semibold}}
              />
            ) : null}
          </View>

          <BlankSpace height={hp(1)} />
          <KeyboardAwareScrollView>
            <OTPInputView
              style={{width: wp(55), height: 50, alignSelf: 'center'}}
              pinCount={4}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={code => {
                setOtp(code);
              }}
            />
          </KeyboardAwareScrollView>
          {otpV ? null : <Vaildation errormsg="Enter OTP" />}

          <BlankSpace height={hp(4)} />
          <Button
            onPress={() => {
              handleVerifyOtp();
            }}
            btnStyle={{
              height: hp(5),
              width: wp(35),
              borderRadius: wp(10),
              backgroundColor: Colors.primary,
            }}
            textStyle={{
              fontFamily: Fonts.semibold,
              color: '#fff',
              fontSize: wp(4),
            }}
            btnName="VERIFY OTP"
            isLoader={btnLoader2}
          />
        </View>
        {/* </KeyboardAwareScrollView> */}
      </Modal>
    </>
  );
};
// style for otpverify

const styles = StyleSheet.create({
  underlineStyleBase: {
    width: wp(12),
    height: wp(12),
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

export default SignUp;
