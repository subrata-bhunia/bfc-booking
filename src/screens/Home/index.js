import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, StatusBar, ScrollView} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {getDate} from 'bangla-calendar';
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
const Home = () => {
  const [ben, setben] = useState('');
  const [selectDate, setSelectDate] = useState('');
  const [fullDate, setfull] = useState(['2022-03-02', '2022-03-30']);
  const [booked, setBooked] = useState([
    '2022-03-28',
    '2022-03-02',
    '2022-03-30',
    '2022-03-31',
  ]);
  const [modal, setmodal] = useState(false);
  const [bookings, setBookings] = useState([]);

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
  var dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const _date = new Date();
  const getBengaliDate = date => {
    var dd = new Date(date);
    var array = date.split('-');
    var day = array[2];
    var month = parseInt(array[1]) - 1;
    var year = array[0];
    setben(getDate(dd, {format: 'D MMMM, YYYY \neeee'}));
    setSelectDate(`${day} ${months[month]},${year}`);
  };
  var date_arr = [];
  const dates = {};
  for (let i = 0; i < booked.length; i++) {
    var key = booked[i];
    dates[`${key}`] = {
      customStyles: {
        container: {
          backgroundColor: fullDate.includes(key) ? 'red' : Colors.primary,
        },
        text: {
          color: 'white',
          fontFamily: Fonts.regular,
        },
      },
    };
  }
  return (
    <View
      style={{
        backgroundColor: '#fff',
        paddingTop: StatusBar.currentHeight,
        flex: 1,
      }}>
      {/* Header */}
      <StaticHeader />
      {/* <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
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
          <Icon name="bell" type="simple-line-icon" size={27} />
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
          <Image
            source={require('../../../assets/bfcLogo.png')}
            style={{
              height: 50,
              width: 50,
              borderRadius: 25,
              resizeMode: 'contain',
            }}
          height: wp(0.2),
          width: wp(100),
          backgroundColor: '#999',
        }}
      /> */}
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
                  // onPress={() => gotoSafetyTips()}
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
          markingType={'custom'}
          // hideExtraDays

          onDayPress={date => {
            getBengaliDate(date?.dateString);
            setmodal(true);
          }}
          theme={{
            backgroundColor: '#ffffff',
            // calendarBackground: Colors.primary,
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
            textDayHeaderFontSize: wp(3.3),
            weekVerticalMargin: 5,
            'stylesheet.calendar.header': {
              header: {
                alignItems: 'flex-start',
              },
            },
            contentStyle: {
              // height: hp(80),
              // width: wp(90),
              // backgroundColor: Colors.disable,
            },
          }}
          hideArrows={true}
          enableSwipeMonths
          markedDates={dates}
        />
        <View style={{marginTop: 20}}>
          <FlatListWithHeader
            title={'Upcoming Bookings'}
            items={dummyUpcoming}
            horizontal={true}
          />
          <FlatListWithHeader
            title={'Past Bookings'}
            items={dummyUpcoming}
            horizontal={true}
          />
        </View>
        <View style={{height: hp(13) + StatusBar.currentHeight}} />
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
