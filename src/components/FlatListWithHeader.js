import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Fonts, statusIcon} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Icon, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import {SkypeIndicator} from 'react-native-indicators';

/**
 *
 * title - List name
 * items - [all data]
 * @returns
 */
const FlatListWithHeader = ({title, items, horizontal, isloader}) => {
  const navigation = useNavigation();

  const handleNavigation = item => {
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
    } else {
      navigation.navigate('bookingDetails', {
        booking_id: item?.booking_id,
      });
    }
  };
  var _horizontal = horizontal || false;
  var isLoader = isloader || false;
  return (
    <View style={{padding: 5}}>
      {title ? (
        <Text
          style={{
            fontFamily: Fonts.semibold,
            fontSize: 20,
            color: Colors.primary,
            padding: 10,
          }}>
          {title}
        </Text>
      ) : null}
      <FlatList
        horizontal={_horizontal}
        refreshing
        ListEmptyComponent={() => {
          return (
            <>
              {isLoader ? (
                <View
                  style={{
                    flex: 1,
                    height: hp(20),
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: wp(100),
                  }}>
                  <SkypeIndicator
                    color={Colors.botton}
                    count={5}
                    size={wp(12)}
                  />
                </View>
              ) : _horizontal == true ? (
                <View style={{padding: 5}}>
                  <Text
                    style={{
                      fontFamily: Fonts.semibold,
                      padding: 10,
                    }}>
                    No Booking Found
                  </Text>
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                  }}>
                  <Text
                    style={{
                      fontFamily: Fonts.semibold,
                      padding: 10,
                    }}>
                    No Booking Found
                  </Text>
                </View>
              )}
            </>
          );
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              activeOpacity={0.7}
              onPress={() => handleNavigation(item)}>
              <LinearGradient
                colors={['#eee', '#eee', '#fff']}
                style={{
                  paddingVertical: hp(3),
                  width: wp(90),
                  elevation: 2,
                  borderRadius: hp(1),
                  margin: 10,
                  opacity: 1,
                  padding: 10,
                  paddingHorizontal: wp(6),
                  alignSelf: 'center',
                }}>
                {/* 1st */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                      <Text style={styles.textH1}>Pickup</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={styles.date}>{`${item?.pickup_date}`}</Text>
                      </View>
                    </View>
                    {item?.pickup_time === 'Morning' ? (
                      <Icon
                        name="sunny-sharp"
                        type="ionicon"
                        raised
                        size={20}
                      />
                    ) : (
                      <Icon name="moon" type="ionicon" reverse size={20} />
                    )}
                  </View>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View>
                      <Text style={styles.textH1}>Return</Text>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text
                          style={styles.date}>{`${item?.return_date}`}</Text>
                      </View>
                    </View>
                    {item?.return_time === 'Morning' ? (
                      <Icon
                        name="sunny-sharp"
                        type="ionicon"
                        raised
                        size={20}
                      />
                    ) : (
                      <Icon name="moon" type="ionicon" reverse size={20} />
                    )}
                  </View>
                </View>
                {/* 2nd */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{width: '75%'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Icon name="person" />
                      <Text
                        style={styles.textH2}>{`${item?.customer_name}`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 5,
                      }}>
                      <Icon name="home" />
                      <Text
                        style={
                          styles.textH2
                        }>{`${item?.customer_address}`}</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '70%',
                        marginTop: 5,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          // width: wp(19),
                          // justifyContent: 'space-between',
                        }}>
                        <Icon name="users" type="font-awesome-5" size={20} />
                        <Text style={styles.textH2}> {item?.gathering}</Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          width: wp(15),
                          justifyContent: 'space-between',
                        }}>
                        <Image
                          source={require('../../assets/images/icons/catering.png')}
                          style={{
                            height: 25,
                            width: 25,
                          }}
                        />
                        <Text style={styles.textH2}>{item?.caterers}</Text>
                      </View>
                    </View>
                  </View>
                  <View style={{width: '50%', alignSelf: 'flex-end'}}>
                    <Image
                      source={
                        item?.status === 'Confirm'
                          ? statusIcon.booked
                          : item?.status === 'Pickup'
                          ? statusIcon.pickup
                          : item?.status === 'Due'
                          ? statusIcon.due
                          : item?.status === 'Paid'
                          ? statusIcon.paid
                          : item?.status === 'Missing'
                          ? statusIcon.missing
                          : item?.status === 'Cancel'
                          ? statusIcon.cancel
                          : statusIcon.booked
                      }
                      style={{
                        height: hp(11),
                        resizeMode: 'center',
                        width: hp(11),
                        marginBottom: -hp(1),
                      }}
                      PlaceholderContent={
                        <ActivityIndicator
                          size={30}
                          color={Colors.yellow}
                          style={{alignSelf: 'center'}}
                        />
                      }
                    />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
        pagingEnabled={!_horizontal}
        persistentScrollbar
        maxToRenderPerBatch={3}
        numColumns={1}
        data={items}
      />
    </View>
  );
};

export default FlatListWithHeader;

const styles = StyleSheet.create({
  textH1: {
    fontFamily: Fonts.bold,
    color: Colors.text,
    fontSize: 16,
    textAlign: 'left',
  },
  date: {
    fontFamily: Fonts.medium,
  },
  textH2: {
    fontFamily: Fonts.semibold,
  },
});
