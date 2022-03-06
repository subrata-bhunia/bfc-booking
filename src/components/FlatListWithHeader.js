import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../constants';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Icon, Image} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
/**
 *
 * title - List name
 * items - [all data]
 * @returns
 */
const FlatListWithHeader = ({title, items, horizontal}) => {
  const navigation = useNavigation();
  var _horizontal = horizontal || false;
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
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('bookingDetails')}>
              <LinearGradient
                colors={['#eee', '#eee', '#fff']}
                style={{
                  height: hp(22),
                  width: wp(90),
                  elevation: 2,
                  borderRadius: hp(1),
                  margin: 10,
                  opacity: 1,
                  padding: 10,
                  paddingHorizontal: wp(6),
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
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="person" />
                    <Text style={styles.textH2}>{`${item?.name}`}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 5,
                    }}>
                    <Icon name="home" />
                    <Text style={styles.textH2}>{`${item?.address}`}</Text>
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
              </LinearGradient>
            </TouchableOpacity>
          );
        }}
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
