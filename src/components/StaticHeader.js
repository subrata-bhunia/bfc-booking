import {
  View,
  Text,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {getAllNotifications} from '../api/Notification';

const StaticHeader = () => {
  const {signOut} = React.useContext(AuthContext);
  const userId = UIStore.useState(s => s.userId);
  const userName = UIStore.useState(s => s.userName);
  const navigation = useNavigation();

  const [unread, setUnread] = useState('');

  //All notifications get Api
  const handlegetNotification = () => {
    if (userId) {
      getAllNotifications({
        user_id: userId,
      })
        .then(res => {
          const {status, data, unread} = res.data;
          console.log(
            'Res of getAllNotification from static header page',
            'unread :',
            unread,
          );
          if (status == 'Success') {
            setUnread(unread);
          }
        })
        .catch(err => {
          console.log(
            'Err of getAllNotifications from static header page',
            err,
          );
        });
    }
  };
  console.log('unread', unread);
  useEffect(() => {
    handlegetNotification();
    DeviceEventEmitter.addListener('notificationRes', function () {
      handlegetNotification();
    });
  }, [userId]);
  // console.log(userId);
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
        // backgroundColor: '#fff',
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
        <View
          style={{
            height: wp(7.2),
            width: wp(7.2),
          }}>
          <Icon
            name="bell"
            type="simple-line-icon"
            size={wp(7)}
            onPress={() => navigation.navigate('notification')}
          />
          {unread > 0 ? (
            <View
              style={{
                height: wp(3),
                width: wp(3),
                backgroundColor: 'red',
                borderRadius: 100,
                position: 'absolute',
                right: wp(0.5),
              }}
            />
          ) : null}
        </View>
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
