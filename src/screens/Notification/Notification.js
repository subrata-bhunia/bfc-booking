import {View, Text, Pressable, DeviceEventEmitter} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../components/Header';
import BlankSpace from '../../components/BlankSpace';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements';
import {Colors, Fonts} from '../../constants';
import {UIStore} from '../../UIStore';
import {getAllNotifications, handleReadMsg} from '../../api/Notification';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';
import {getNotifications} from '../../redux/action';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';

const Notification = () => {
  const userId = UIStore.useState(s => s.userId);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [allData, setAllData] = useState([]);
  const [unread, setUnread] = useState(0);
  // const [loader, setLoader] = useState(false);

  //All notifications get Api
  // const handlegetNotification = async () => {
  //   setLoader(true);
  //   getAllNotifications({
  //     user_id: userId,
  //   })
  //     .then(res => {
  //       const {status, data, unread} = res.data;
  //       console.log('Res of getAllNotification', res.data);
  //       if (status == 'Success') {
  //         setAllData(data);
  //         setUnread(unread);
  //       }
  //       setLoader(false);
  //     })
  //     .catch(err => {
  //       console.log('Err of getAllNotifications', err);
  //       setLoader(false);
  //     });
  // };

  const {getNotificationRes, loader} = useSelector(
    state => state.ExtraOthersReducer,
  );

  //Read Msg api call

  const handleReadMsgClick = async id => {
    handleReadMsg({
      user_id: userId,
      notification_id: id,
    })
      .then(res => {
        console.log('Res of handleReadMsg', res.data);
        dispatch(getNotifications());
      })
      .catch(err => console.log('Err of ReadMsg', err));
  };

  // useEffect(() => {
  //   handlegetNotification();
  // }, []);

  const handleNavigation = item => {
    if (item?.type == 'Order') {
      if (item?.order_info?.status == 'Confirm') {
        navigation.navigate('pickupBooking', {
          booking_id: item?.order_info?.booking_id,
        });
      } else if (item?.order_info?.status == 'Due') {
        navigation.navigate('dueBooking', {
          booking_id: item?.order_info?.booking_id,
        });
      } else if (item?.order_info?.status == 'Missing') {
        navigation.navigate('missingBooking', {
          booking_id: item?.order_info?.booking_id,
        });
      } else if (item?.order_info?.status == 'Cancel') {
        navigation.navigate('cancelBooking', {
          booking_id: item?.order_info?.booking_id,
        });
      } else if (item?.order_info?.status == 'Pickup') {
        navigation.navigate('returnBooking', {
          booking_id: item?.order_info?.booking_id,
        });
      } else if (item?.order_info?.status == 'Paid') {
        navigation.navigate('paidBooking', {
          booking_id: item?.order_info?.booking_id,
        });
      } else {
        navigation.navigate('bookingDetails', {
          booking_id: item?.order_info?.booking_id,
        });
      }
    }
    handleReadMsgClick(item?.id);
    // handlegetNotification();
  };

  // Notification Common View
  const renderItem = ({item, index}) => {
    return (
      <Pressable
        style={{
          backgroundColor: item.read == 0 ? '#f2f7ff' : Colors.white,
        }}
        onPress={() => handleNavigation(item)}>
        <View
          style={{
            width: wp(90),
            alignSelf: 'center',
            // flexDirection: 'row',
            // justifyContent: 'space-between',
            paddingVertical: hp(2),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: hp(1),
              justifyContent: 'space-between',
            }}>
            <Icon
              name={
                item.type == 'Order' ? 'shopping-cart' : 'notifications-none'
              }
              size={wp(5)}
              color={Colors.primary}
            />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: wp(83),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  fontSize: wp(4),
                  color: Colors.text,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  fontSize: wp(3),
                  color: Colors.disable,
                }}>
                {item.time}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: wp(83),
              alignSelf: 'flex-end',
            }}>
            <Text
              style={{
                fontFamily: Fonts.regular,
                fontSize: wp(3.5),
                color: 'grey',
              }}>
              {item.description}
            </Text>
          </View>
        </View>
        {getNotificationRes?.data &&
        getNotificationRes.data.length == index + 1 ? null : (
          <View
            style={{
              height: 1,
              backgroundColor: '#999',
              opacity: 0.5,
              // marginVertical: hp(3),
              width: wp(89),
              alignSelf: 'center',
            }}
          />
        )}
      </Pressable>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        flex: 1,
      }}>
      <Header name="Notification" backBtn={true} />
      <BlankSpace height={hp(1)} />
      {!loader ? (
        getNotificationRes?.data && getNotificationRes?.data.length > 0 ? (
          <FlatList data={getNotificationRes?.data} renderItem={renderItem} />
        ) : (
          <View
            style={{
              height: hp(50),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: Colors.text,
                fontSize: wp(4),
                fontFamily: Fonts.medium,
              }}>
              No Notification Found
            </Text>
          </View>
        )
      ) : (
        <View
          style={{
            marginTop: hp(30),
          }}>
          <SkypeIndicator color={Colors.botton} count={5} size={wp(12)} />
        </View>
      )}
    </View>
  );
};

export default Notification;
