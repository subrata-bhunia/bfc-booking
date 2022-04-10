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
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {getDate} from '../../helper/bangla-calendar/cjs/index';
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
  upComingBookingList,
} from '../../api/Bookings';
import {UIStore} from '../../UIStore';
import {AuthContext} from '../../components/context';
import {UserInfo} from '../../api/Users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {calculateAction} from '../../redux/action';
import {Icon} from 'react-native-elements';
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
  const [fullColor, setFullColor] = useState('#eee');
  const [bookedColor, setBookedColor] = useState('#eee');
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
  // ------------------- Notice ------------------- //
  const [apiModal, setapiModal] = useState(true);
  const data = {
    image: 'https://source.unsplash.com/random/600x600/?cook',
    type: 'info',
    heading: 'Ea anim veniam nulla commodo officia Lorem.',
    description:
      'Elit ad incididunt ullamco in dolore enim quis ex nostrud duis.Ex dolor reprehenderit et consequat esse amet tempor voluptate amet.',
    action: 'https://source.unsplash.com/random/600x600/?cook',
  };

  // --------------- UPCOMING BOOK LIST ----------- //
  const [loader, setloader] = useState(true);
  const [loader2, setloader2] = useState(true);
  const getUpcomingList = () => {
    upComingBookingList({user_id: user_id})
      .then(res => {
        setloader(true);
        if (res?.data?.status === 'Success') {
          setupComingbookingsList(res?.data?.data);
          setloader(false);
        }
        console.log('Res of get upcoming list :', res?.data);
      })
      .catch(err => console.log('Err of get upcoming list :', err));
  };
  const getDueList = () => {
    dueBookings({user_id: user_id}).then(res => {
      setloader2(true);
      if (res?.data?.status === 'Success') {
        setdueBookingList(res?.data?.data);
        setloader2(false);
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
                        ? bookedColor
                        : fullDate.includes(date.dateString)
                        ? fullColor
                        : Colors.primary
                      : booked.includes(date.dateString)
                      ? bookedColor
                      : fullDate.includes(date.dateString)
                      ? fullColor
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
                    fontSize: wp(5),
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
                    fontSize: wp(3),
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
            isloader={loader2}
          />
        </View>
        <View style={{height: hp(13)}} />
      </ScrollView>
      <Model isVisible={apiModal} statusBarTranslucent>
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
              }}>
              {data.description}
            </Text>
          )}
          {data.action == '' ? null : (
            <Button
              btnName={'Goto'}
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
      </Model>
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
