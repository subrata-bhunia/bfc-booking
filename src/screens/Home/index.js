import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {getDate, getMonth} from '../../helper/bangla-calendar/cjs/index';
import {Colors, Fonts} from '../../constants';
import Model from 'react-native-modal';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Button from '../../components/Button';
import {Icon, Image} from 'react-native-elements';
import FlatListWithHeader from '../../components/FlatListWithHeader';
import dummyUpcoming from '../../data/dummy.upcoming';
import axios from 'axios';
import StaticHeader from '../../components/StaticHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {
  calenderBooking,
  dueBookings,
  upComingBookingList,
} from '../../api/Bookings';
import {UIStore} from '../../UIStore';
import {AuthContext} from '../../components/context';
import {UserInfo} from '../../api/Users';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const user_id = UIStore.useState(s => s.userId);
  const [ben, setben] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [fullDate, setfull] = useState([]);
  const [booked, setBooked] = useState([]);
  const [modal, setmodal] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [upComingbookingsList, setupComingbookingsList] = useState([]);
  const [dueBookingList, setdueBookingList] = useState([]);
  const [fullColor, setFullColor] = useState('');
  const [bookedColor, setBookedColor] = useState('');
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

  const _date = new Date();
  const getBengaliDate = date => {
    var dd = new Date(date);
    return getDate(dd, {format: 'D mm'});
  };
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  // --------------------- //
  const {signOut} = React.useContext(AuthContext);
  const Check = async () => {
    console.log('user_id', user_id);
    if (user_id === '') {
      try {
        const userId = await AsyncStorage.getItem('userId');
        UIStore.update(s => {
          s.userId = userId;
        });
        UserInfo({
          user_id: userId,
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
          });
      } catch (err) {
        console.log(err);
        alert(`Error In Home`);
      }
    } else {
      UserInfo({
        user_id: user_id,
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
        });
    }
  };
  useEffect(() => {
    Check();
  }, []);
  // --------------- UPCOMING BOOK LIST ----------- //
  const [loader, setloader] = useState(true);
  const getUpcomingList = () => {
    upComingBookingList({user_id: user_id}).then(res => {
      setloader(true);
      if (res?.data?.status === 'Success') {
        setupComingbookingsList(res?.data?.data);
        setloader(false);
      }
    });
  };
  const getDueList = () => {
    dueBookings({user_id: user_id}).then(res => {
      setloader(true);
      if (res?.data?.status === 'Success') {
        setdueBookingList(res?.data?.data);
      }
    });
  };
  const CalendarData = () => {
    calenderBooking({user_id: user_id})
      .then(res => {
        // setloader(true);
        if (res?.data?.status === 'Success') {
          // console.log('eee', res?.data);
          setfull(res?.data?.full);
          setBooked(res?.data?.semi_full);
          setBookedColor(res?.data?.colors[1]);
          setFullColor(res?.data?.colors[0]);
        }
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };
  console.log('colors from api', bookedColor, fullColor);
  useEffect(() => {
    getUpcomingList();
    getDueList();
    CalendarData();
  }, [isFocused]);
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
        {/* Modal */}
        <Model
          isVisible={modal}
          onBackdropPress={() => setmodal(!modal)}
          animationIn="slideInDown"
          animationOut="slideOutUp"
          animationInTiming={900}
          animationOutTiming={900}
          backdropOpacity={0.6}
          onBackButtonPress={() => setmodal(false)}
          avoidKeyboard>
          <View style={styles.modal}>
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
            {bookings.length > 0 ? null : (
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
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor:
                    state === 'today'
                      ? booked.includes(date.dateString)
                        ? Colors.yellow
                        : fullDate.includes(date.dateString)
                        ? Colors.red
                        : Colors.primary
                      : booked.includes(date.dateString)
                      ? Colors.yellow
                      : fullDate.includes(date.dateString)
                      ? Colors.red
                      : '#eee',
                  borderRadius: 10,
                  justifyContent: 'center',
                  padding: 5,
                  elevation: 2,
                }}>
                {state === 'today' ? (
                  booked.includes(date.dateString) ? (
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
                  ) : fullDate.includes(date.dateString) ? (
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
                    fontSize: wp(6),
                    fontFamily: Fonts.semibold,
                    color:
                      state === 'disabled'
                        ? 'gray'
                        : state === 'selected'
                        ? 'red'
                        : state === 'today'
                        ? '#fff'
                        : booked.includes(date.dateString)
                        ? Colors.white
                        : fullDate.includes(date.dateString)
                        ? Colors.white
                        : '#000',
                  }}>
                  {date.day}
                </Text>
                <Text
                  style={{
                    textAlign: 'left',
                    color:
                      state === 'disabled'
                        ? 'gray'
                        : state === 'selected'
                        ? 'red'
                        : state === 'today'
                        ? '#fff'
                        : booked.includes(date.dateString)
                        ? Colors.white
                        : fullDate.includes(date.dateString)
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
            title={`Upcoming Bookings (${upComingbookingsList.length})`}
            items={upComingbookingsList}
            horizontal={true}
            isloader={loader}
          />
          <FlatListWithHeader
            title={`Due Bookings (${dueBookingList.length})`}
            items={dueBookingList}
            horizontal={true}
            isloader={loader}
          />
        </View>
        <View style={{height: hp(13)}} />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  modal: {
    // height: hp(10),
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
  },
});
