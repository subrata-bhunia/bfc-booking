import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Colors, Fonts} from '../constants';
import {Icon, Tooltip} from 'react-native-elements';
import Button from './Button';
import {AuthContext} from './context';
import {UIStore} from '../UIStore';
import {useNavigation} from '@react-navigation/native';

const StaticHeader = () => {
  const {signOut} = React.useContext(AuthContext);
  const userId = UIStore.useState(s => s.userId);
  const userName = UIStore.useState(s => s.userName);
  const navigation = useNavigation();
  // console.log(userId);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        backgroundColor: '#fff',
      }}>
      <View
        style={{
          flexDirection: 'row',
          width: wp(30),
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: hp(1),
        }}>
        <Icon name="mail-outline" type="ionicon" size={27} />
        <Icon
          name="bell"
          type="simple-line-icon"
          size={27}
          onPress={() => navigation.navigate('notification')}
        />
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            textAlign: 'right',
            fontFamily: Fonts.semibold,
            color: Colors.text,
            letterSpacing: 2,
          }}>
          {'Debpur \nBright Future Club'}
        </Text>
        <TouchableOpacity
          onLongPress={() => {
            console.log('TTTTT');
          }}>
          <Tooltip
            popover={
              <View>
                <Text
                  style={{
                    fontFamily: Fonts.semibold,
                    letterSpacing: 1.6,
                  }}>
                  {`Hi ${userName},\nWelcome to BFC Booking App.\nThank You.`}
                </Text>
                <Button
                  onPress={() => signOut()}
                  btnStyle={{
                    height: 40,
                    width: wp(50),
                    borderRadius: 50,
                    backgroundColor: Colors.secondary,
                    marginVertical: hp(2),
                  }}
                  textStyle={{
                    fontFamily: Fonts.semibold,
                    color: '#000',
                  }}
                  btnName=" Log Out"
                  icon={{
                    name: 'logout',
                    type: 'ant-design',
                    color: 'red',
                  }}
                />
              </View>
            }
            width={wp(80)}
            containerStyle={{
              height: undefined,
              padding: hp(2),
            }}
            backgroundColor={Colors.yellow}>
            <Image
              source={require('../../assets/bfcLogo.png')}
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                resizeMode: 'contain',
              }}
            />
          </Tooltip>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StaticHeader;
