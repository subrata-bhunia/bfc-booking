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
const AllBookings = () => {
  const isFocused = useIsFocused();
  const [allBooking, setallBooking] = useState([]);
  const [filterallBooking, setfilterallBooking] = useState(null);
  const [loader, setloader] = useState(true);
  const [filterModel, setfilterModel] = useState(false);
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
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [status, setStatus] = useState(0);
  //  --------- Filter Function ------ //

  const FilterWithStatus = text => {
    setfilterallBooking(allBooking.filter(i => i?.status?.indexOf(text) === 0));
  };
  const getallBookingList = () => {
    setloader(true);
    // console.log('uuuu');
    allBookingList().then(res => {
      if (res?.data?.status === 'Success') {
        setallBooking(res?.data?.data);
        setloader(false);
      }
    });
  };
  useEffect(() => {
    getallBookingList();
  }, [isFocused, filterModel]);
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
          items={filterallBooking === null ? allBooking : filterallBooking}
          isloader={loader}
        />
        <View style={{height: hp(9) + hp(4)}} />
      </ScrollView>
      {/* <FAB
        visible={true}
        onPress={() => {
          setfilterModel(!filterModel);
        }}
        placement="right"
        containerStyle={{
          bottom: hp(11),
        }}
        // title="Show"
        icon={{name: 'filter', color: 'white', type: 'ionicon'}}
        color={Colors.red}
        type="outline"
      /> */}
      {/* <Model
        isVisible={filterModel}
        onBackdropPress={() => {
          setfilterModel(!filterModel);
        }}>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={val => {
              FilterWithStatus(val);
              setfilterModel(false);
            }}
            style={{
              // width: wp(30),
              borderColor: '#999',
            }}
            flatListProps={{
              style: {
                // width: wp(30),
              },
            }}
            containerStyle={{
              // width: wp(30),
              borderColor: 'red',
            }}
            labelStyle={{
              fontFamily: Fonts.regular,
              fontSize: 15,
            }}
            placeholder={'Select Booking Status'}
            placeholderStyle={{
              fontFamily: Fonts.regular,
              fontSize: 15,
            }}
            listItemLabelStyle={{
              fontFamily: Fonts.regular,
              fontSize: 15,
            }}
            dropDownDirection="AUTO"
            dropDownContainerStyle={{
              backgroundColor: '#eee',
              position: 'absolute',
              // elevation: 10,
              borderColor: '#999',
            }}
          />
        </View>
      </Model> */}
    </View>
  );
};

export default AllBookings;

const styles = StyleSheet.create({});
