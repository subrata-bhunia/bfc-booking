import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import FlatListWithHeader from '../../components/FlatListWithHeader';
import dummyUpcoming from '../../data/dummy.upcoming';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native';
import {Colors, Fonts} from '../../constants';
import StaticHeader from '../../components/StaticHeader';
import {allBookingList} from '../../api/Bookings';
import {useIsFocused} from '@react-navigation/native';

const AllBookings = () => {
  const isFocused = useIsFocused();
  const [allBooking, setallBooking] = useState([]);
  const [loader, setloader] = useState(true);
  const getallBookingList = () => {
    setloader(true);
    console.log('uuuu');
    allBookingList().then(res => {
      if (res?.data?.status === 'Success') {
        setallBooking(res?.data?.data);
        setloader(false);
      }
    });
  };
  useEffect(() => {
    getallBookingList();
  }, [isFocused]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: StatusBar.currentHeight,
      }}>
      {/* Header */}
      <StaticHeader />

      <ScrollView>
        <FlatListWithHeader items={allBooking} isloader={loader} />
        <View style={{height: hp(9) + hp(4)}} />
      </ScrollView>
    </View>
  );
};

export default AllBookings;

const styles = StyleSheet.create({});
