import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FlatListWithHeader from '../../components/FlatListWithHeader';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native';
import {Colors, Fonts} from '../../constants';
import StaticHeader from '../../components/StaticHeader';
import {allBookingList} from '../../api/Bookings';
import {useIsFocused} from '@react-navigation/native';
import {FAB} from 'react-native-elements';
import Model from 'react-native-modal';
import DropDownPicker from 'react-native-dropdown-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getAllBookings} from '../../redux/action/index';
const AllBookings = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [filterallBooking, setfilterallBooking] = useState(null);
  // const [loader, setloader] = useState(false);
  const [status, setStatus] = useState(0);

  // ---------- DropDown ----------- //
  const [items, setItems] = useState([
    {label: 'All', value: ''},
    {label: 'Confirm', value: 'Confirm'},
    {label: 'Pickup', value: 'Pickup'},
    {label: 'Due', value: 'Due'},
    {label: 'Cancel', value: 'Cancel'},
    {label: 'Paid', value: 'Paid'},
    {label: 'Missing', value: 'Missing'},
  ]);

  const {allBookinglist, loader} = useSelector(
    state => state.BookinglistReducer,
  );

  // console.log('Booking Page All allBookinglist from api', allBookinglist);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [isFocused]);

  //  --------- Filter Function ------ //
  const FilterWithStatus = text => {
    setfilterallBooking(
      allBookinglist?.data?.filter(i => i?.status?.indexOf(text) === 0),
    );
  };
  // useEffect(() => {
  //   FilterWithStatus('');
  // }, [allBookinglist]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        paddingTop: StatusBar.currentHeight,
      }}>
      {/* Header */}
      <StaticHeader />
      <View
        style={{
          height: 1,
          backgroundColor: Colors.disable,
          width: wp(100),
        }}
      />
      <View>
        <ScrollView
          horizontal={true}
          style={{
            marginLeft: wp(5),
          }}
          showsHorizontalScrollIndicator={false}>
          {items.map((val, ind) => {
            const active = status == ind;
            return (
              <TouchableOpacity
                style={{
                  height: wp(8),
                  // paddingHorizontal: wp(3),
                  width: wp(25),
                  backgroundColor: active ? Colors.primary : Colors.white,
                  marginRight: wp(4),
                  marginVertical: hp(2),
                  borderRadius: wp(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: Colors.primary,
                  borderWidth: active ? 0 : 1,
                }}
                onPress={() => {
                  FilterWithStatus(val.value), setStatus(ind);
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.semibold,
                    fontSize: wp(4),
                    color: active ? Colors.white : Colors.primary,
                  }}>
                  {val.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <ScrollView>
        <FlatListWithHeader
          items={
            filterallBooking === null ? allBookinglist?.data : filterallBooking
          }
          isloader={loader}
          initialNumToRender={10}
        />
        <View style={{height: hp(9) + hp(4)}} />
      </ScrollView>
    </View>
  );
};

export default AllBookings;
