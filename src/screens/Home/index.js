import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Colors, Fonts} from '../../constants';
import Model from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import FlatListWithHeader from '../../components/FlatListWithHeader';
import StaticHeader from '../../components/StaticHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  calenderBooking,
  dueBookings,
  getBookingbyDate,
  upComingBookingList,
} from '../../api/Bookings';
import {UIStore} from '../../UIStore';
import {AuthContext} from '../../components/context';
import {UserInfo} from '../../api/Users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {Icon} from 'react-native-elements';
import {
  notifications,
  NotificationMessage,
  Android,
} from 'react-native-firebase-push-notifications';
import {getBanglaDateAndMonth} from '../../helper/bangla-calender';
import {
  getAllSpecificDateBookings,
  getAllDueBookings,
  getUpcomingBookings,
  getcalendarBookingsInfo,
  getNotifications,
} from '../../redux/action';
const Home = () => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const user_id = UIStore.useState(s => s.userId);

  const [ben, setben] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [modalShow, setmodalShow] = useState(false);
  const [apiModal, setapiModal] = useState(false);

  //  --------- Notifications --------- //
  const getInit = async () => {
    const noti = await (
      await notifications.getInitialNotification()
    ).notification;
    if (noti?._data?.type == 'order') {
      if (noti?._data?.status == 'Confirm') {
        navigation.navigate('pickupBooking', {
          booking_id: noti?._data?.booking_id,
        });
      } else if (noti?._data?.status == 'Due') {
        navigation.navigate('dueBooking', {
          booking_id: noti?._data?.booking_id,
        });
      } else if (noti?._data?.status == 'Missing') {
        navigation.navigate('missingBooking', {
          booking_id: noti?._data?.booking_id,
        });
      } else if (noti?._data?.status == 'Cancel') {
        navigation.navigate('cancelBooking', {
          booking_id: noti?._data?.booking_id,
        });
      } else if (noti?._data?.status == 'Pickup') {
        navigation.navigate('returnBooking', {
          booking_id: noti?._data?.booking_id,
        });
      } else {
        navigation.navigate('bookingDetails', {
          booking_id: noti?._data?.booking_id,
        });
      }
    } else {
      console.log('Inital_Notifications', noti);
    }
  };
  const localNotification = async () => {
    //required for Android
    const channel = new Android.Channel(
      'test-channel',
      'Test Channel',
      Android.Importance.Max,
    ).setDescription('My apps test channel');
    // for android create the channel
    notifications.android().createChannel(channel);
    await notifications.displayNotification(
      new NotificationMessage()
        .setNotificationId('notification-id')
        .setTitle('Notification title')
        .setBody('Notification body')
        .setData({
          key1: 'key1',
          key2: 'key2',
        })
        .android.setChannelId('test-channel'), //required for android
    );
  };
  useEffect(() => {
    notifications.onNotificationOpened(noti => {
      if (noti?._data?.type == 'order') {
        if (item?.status == 'Confirm') {
          navigation.navigate('pickupBooking', {
            booking_id: item?.booking_id,
          });
        } else if (item?.status == 'Due') {
          navigation.navigate('dueBooking', {
            booking_id: item?.booking_id,
          });
        } else if (item?.status == 'Missing') {
          navigation.navigate('missingBooking', {
            booking_id: item?.booking_id,
          });
        } else if (item?.status == 'Cancel') {
          navigation.navigate('cancelBooking', {
            booking_id: item?.booking_id,
          });
        } else if (item?.status == 'Pickup') {
          navigation.navigate('returnBooking', {
            booking_id: item?.booking_id,
          });
        } else if (item?.status == 'Paid') {
          navigation.navigate('paidBooking', {
            booking_id: item?.booking_id,
          });
        } else {
          navigation.navigate('bookingDetails', {
            booking_id: item?.booking_id,
          });
        }
      } else {
        console.log('Clicked_Notifications', noti);
      }
    });
  }, []);

  const {dueBookinglist, specificDateBookinglist, upcomingBookinglist} =
    useSelector(state => state.BookinglistReducer);
  const {calendarInfo} = useSelector(state => state.CalendarInfoReducer);

  // console.log(
  //   'home page all details from api :',
  //   dueBookinglist,
  //   specificDateBookinglist,
  //   upcomingBookinglist,
  //   calendarInfo,
  // );

  const getAllBookingBydate = date => {
    dispatch(getAllSpecificDateBookings({date}));
  };

  useEffect(() => {
    dispatch(getAllDueBookings());
    dispatch(getUpcomingBookings());
    dispatch(getcalendarBookingsInfo());
    // setmodalShow(false);
  }, [isFocused]);
  useEffect(() => {
    dispatch(getNotifications());
  }, []);
  // ----------------------------------- //

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getBengaliDate = date => {
    var dd = new Date(date);
    return getBanglaDateAndMonth(dd);
  };

  // --------------------- //
  const {signOut} = React.useContext(AuthContext);
  const Check = async () => {
    // console.log('user_id', user_id);
    if (user_id === '') {
      try {
        const userId = await AsyncStorage.getItem('userId');
        UIStore.update(s => {
          s.userId = userId;
        });
        const token = await notifications.getToken();
        // dispatch(fcmSet(userId, token));
        UserInfo({
          user_id: userId,
          fcm_token: token,
        })
          .then(res => {
            if (res.data?.data?.status == 'Active') {
              UIStore.update(s => {
                (s.userName = res.data?.data?.user_name),
                  (s.userRole = res.data?.data?.user_role);
              });
            } else {
              signOut();
              ToastAndroid.show(
                'Logout! Please login again 👌',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER,
                ToastAndroid.BOTTOM,
              );
            }
          })
          .catch(err => {
            console.log(err);
          });
      } catch (err) {
        console.log(err);
        // alert(`Error In Home`);
      }
    } else {
      const token = await notifications.getToken();
      // dispatch(fcmSet(user_id, token));
      UserInfo({
        user_id,
        fcm_token: token,
      })
        .then(res => {
          if (res.data?.data?.status == 'Active') {
            UIStore.update(s => {
              s.userName = res.data?.data?.user_name;
            });
          } else {
            signOut();
            ToastAndroid.show(
              'Logout! Please login again 👌',
              ToastAndroid.SHORT,
              ToastAndroid.CENTER,
              ToastAndroid.BOTTOM,
            );
          }
        })
        .catch(err => {
          console.log(err);
          alert('Home');
        });
    }
  };
  useEffect(() => {
    Check();
    getInit();
  }, []);
  const dataRedux = useSelector(state => {
    return state.fcmToken;
  });
  // console.log(dataRedux);

  // ------------------- Notice ------------------- //
  const data = {
    image: 'https://source.unsplash.com/random/600x600/?cook',
    type: 'warm',
    heading: 'Ea anim veniam nulla commodo officia Lorem.',
    description:
      'Elit ad incididunt ullamco in dolore enim quis ex nostrud duis.Ex dolor reprehenderit et consequat esse amet tempor voluptate amet.',
    action: 'https://source.unsplash.com/random/600x600/?cook',
  };

  // --------------- UPCOMING BOOK LIST ----------- //
  const [loader, setloader] = useState(false);
  const [loader2, setloader2] = useState(false);

  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
        flex: 1,
      }}>
      {/* Header */}
      <StaticHeader />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Calender */}
        <Calendar
          theme={{
            backgroundColor: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#80f',
            todayTextColor: 'red',
            dayTextColor: '#000',
            textDisabledColor: '#d9e1e8',
            // dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontFamily: Fonts.medium,
            textMonthFontFamily: Fonts.semibold,
            textDayHeaderFontFamily: Fonts.medium,
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: wp(3.2),
            weekVerticalMargin: 5,
            'stylesheet.calendar.header': {
              header: {
                alignItems: 'flex-start',
              },
            },
          }}
          renderHeader={date => {
            return (
              <View
                style={{
                  paddingHorizontal: wp(2),
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.bold,
                    fontSize: 22,
                    color: Colors.primary,
                  }}>
                  {months[date.getMonth()]} {date.getFullYear()}
                </Text>
              </View>
            );
          }}
          dayComponent={({date, state}) => {
            return (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  // localNotification();
                  setmodalShow(true);
                  setSelectDate(date.dateString);
                  setben(getBanglaDateAndMonth(date.dateString, 'MMMM'));
                  getAllBookingBydate(date.dateString);
                }}
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor:
                    state === 'today'
                      ? calendarInfo?.semi_full?.includes(date.dateString)
                        ? calendarInfo?.colors?.[1]
                        : calendarInfo?.full?.includes(date.dateString)
                        ? calendarInfo?.colors?.[0]
                        : Colors.primary
                      : calendarInfo?.semi_full?.includes(date.dateString)
                      ? calendarInfo?.colors?.[1]
                      : calendarInfo?.full?.includes(date.dateString)
                      ? calendarInfo?.colors?.[0]
                      : '#eee',
                  borderRadius: 10,
                  justifyContent: 'center',
                  padding: 5,
                  elevation: 2,
                }}>
                {state === 'today' ? (
                  calendarInfo?.semi_full?.includes(date.dateString) ? (
                    <View
                      style={{
                        backgroundColor: Colors.primary,
                        position: 'absolute',
                        height: 15,
                        width: 15,
                        borderRadius: 10,
                        top: -7,
                        right: -2,
                      }}
                    />
                  ) : calendarInfo?.full?.includes(date.dateString) ? (
                    <View
                      style={{
                        backgroundColor: Colors.primary,
                        position: 'absolute',
                        height: 15,
                        width: 15,
                        borderRadius: 10,
                        top: -7,
                        right: -2,
                      }}
                    />
                  ) : null
                ) : null}
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: wp(5),
                    fontFamily: Fonts.semibold,
                    color:
                      state === 'disabled'
                        ? 'gray'
                        : state === 'selected'
                        ? 'red'
                        : state === 'today'
                        ? '#fff'
                        : calendarInfo?.semi_full?.includes(date.dateString)
                        ? Colors.white
                        : calendarInfo?.full?.includes(date.dateString)
                        ? Colors.white
                        : '#000',
                  }}>
                  {date.day}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    fontSize: wp(3),
                    color:
                      state === 'disabled'
                        ? 'gray'
                        : state === 'selected'
                        ? 'red'
                        : state === 'today'
                        ? '#fff'
                        : calendarInfo?.semi_full?.includes(date.dateString)
                        ? Colors.white
                        : calendarInfo?.full?.includes(date.dateString)
                        ? Colors.white
                        : '#000',
                  }}>
                  {getBengaliDate(date.dateString)}
                </Text>
              </TouchableOpacity>
            );
          }}
          hideArrows={true}
          enableSwipeMonths
        />
        <View style={{marginTop: 20}}>
          <FlatListWithHeader
            title={`Upcoming Bookings (${upcomingBookinglist?.data?.length})`}
            items={upcomingBookinglist?.data}
            horizontal={true}
            isloader={loader}
          />
          <FlatListWithHeader
            title={`Due Bookings (${dueBookinglist?.data?.length})`}
            items={dueBookinglist?.data}
            horizontal={true}
            isloader={loader2}
          />
        </View>
        <View style={{height: hp(13)}} />
      </ScrollView>
      <Model isVisible={apiModal} statusBarTranslucent>
        {data.type == 'info' ? (
          <View
            style={{
              backgroundColor: '#fff',
              // padding: 10,
              borderRadius: 10,
              // alignSelf: 'center',
            }}>
            {data.image == '' ? null : (
              <Image
                source={{uri: data.image}}
                style={{
                  resizeMode: 'cover',
                  height: hp(30),
                  borderTopLeftRadius: 10,
                }}
              />
            )}
            {data.heading == '' ? null : (
              <Text
                style={{
                  // textAlign: 'center',
                  fontSize: 20,
                  fontFamily: Fonts.semibold,
                  margin: 5,
                  paddingHorizontal: 10,
                }}>
                {data.heading}
              </Text>
            )}

            {data.description == '' ? null : (
              <Text
                style={{
                  // textAlign: 'ceter',
                  fontSize: 16,
                  fontFamily: Fonts.regular,
                  margin: 5,
                  paddingHorizontal: 10,
                }}>
                {data.description}
              </Text>
            )}
            {data.action == '' ? null : (
              <Button
                btnName={'Goto'}
                onPress={() => {
                  Linking.openURL(data.action);
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#fff',
                  fontSize: 16,
                }}
                btnStyle={{
                  height: hp(6),
                  width: wp(50),
                  backgroundColor: '#2196F3',
                  shadowColor: Colors.primary,
                  shadowOffset: {
                    width: 0,
                    height: 10,
                  },
                  shadowOpacity: 1,
                  shadowRadius: 3.5,
                  elevation: 5,
                  borderRadius: wp(66),
                  marginTop: 10,
                  marginBottom: 15,
                }}
              />
            )}
            <Pressable
              onPress={() => {
                setapiModal(false);
              }}
              style={{
                height: 40,
                width: 40,
                borderRadius: 30,
                position: 'absolute',
                top: -10,
                right: -10,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="cross" type="entypo" size={30} />
            </Pressable>
          </View>
        ) : null}
        {data.type == 'warm' ? (
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              padding: 15,
              paddingVertical: 20,
            }}>
            <View
              style={{
                height: 75,
                // width: 75,
                // borderRadius: 75,
                backgroundColor: '#fff',
                // position: 'absolute',
                alignSelf: 'center',
                // top: -35,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon
                name="warning"
                type="antdesign"
                size={30}
                color={Colors.red}
              />
            </View>
            <Text
              style={{
                fontFamily: Fonts.semibold,
                textAlign: 'center',
              }}>
              {data.heading}
            </Text>
            <View style={styles.Buttons}>
              <View>
                <Button
                  btnName={'Yes'}
                  // onPress={YesPress}
                  textStyle={styles.text1}
                  btnStyle={{
                    height: 40,
                    width: wp(25),
                    padding: 5,
                    backgroundColor: Colors.white,
                    borderRadius: 5,
                    borderColor: Colors.botton,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                  }}
                />
              </View>
              <View>
                <Button
                  btnName={'No'}
                  // onPress={NoPress}
                  textStyle={styles.text1}
                  btnStyle={{
                    height: 40,
                    width: wp(25),
                    padding: 5,
                    backgroundColor: Colors.white,
                    borderRadius: 5,
                    borderColor: Colors.error,
                    borderBottomWidth: 1,
                    borderRightWidth: 1,
                  }}
                />
              </View>
            </View>
          </View>
        ) : null}
      </Model>
      {/* Modal */}
      <Model
        isVisible={modalShow}
        onBackdropPress={() => setmodalShow(!modalShow)}
        backdropOpacity={0.6}
        onBackButtonPress={() => setmodalShow(false)}
        avoidKeyboard>
        <View style={styles.modalstyle}>
          <Text
            style={{
              fontSize: hp(2.5),
              fontFamily: Fonts.bold,
              letterSpacing: 3,
              color: '#000',
              textAlign: 'center',
            }}>
            {ben}
          </Text>
          <Text
            style={{
              fontSize: hp(2),
              fontFamily: Fonts.semibold,
              letterSpacing: 3,
              color: '#000',
              textAlign: 'center',
            }}>
            {`(${selectDate})`}
          </Text>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: '#000',
              width: '90%',
              marginVertical: 10,
            }}
          />
          {specificDateBookinglist?.data?.length > 0 ? (
            <View>
              <View style={{height: hp(30), width: wp(93)}}>
                <FlatListWithHeader
                  items={specificDateBookinglist.data}
                  horizontal={true}
                  width={wp(85)}
                />
              </View>
              {calendarInfo?.full?.includes(selectDate) ? null : (
                <Button
                  onPress={() => navigation.navigate('Booking')}
                  btnStyle={{
                    height: 50,
                    width: wp(50),
                    borderRadius: 50,
                    backgroundColor: Colors.secondary,
                    marginVertical: hp(2),
                  }}
                  textStyle={{
                    fontFamily: Fonts.semibold,
                    color: '#000',
                  }}
                  btnName=" Add Booking"
                  icon={{
                    name: 'plus',
                    type: 'ant-design',
                  }}
                />
              )}
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontFamily: Fonts.semibold,
                  color: Colors.text,
                  textAlign: 'center',
                }}>
                No Booking Found
              </Text>
              <Button
                onPress={() => navigation.navigate('Booking')}
                btnStyle={{
                  height: 50,
                  width: wp(50),
                  borderRadius: 50,
                  backgroundColor: Colors.secondary,
                  marginVertical: hp(2),
                }}
                textStyle={{
                  fontFamily: Fonts.semibold,
                  color: '#000',
                }}
                btnName=" Add Booking"
                icon={{
                  name: 'plus',
                  type: 'ant-design',
                }}
              />
            </View>
          )}
        </View>
      </Model>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  modalstyle: {
    // height: hp(10),
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '70%',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
});
