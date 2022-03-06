import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FlatListWithHeader from '../../components/FlatListWithHeader';
import dummyUpcoming from '../../data/dummy.upcoming';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {ScrollView} from 'react-native';
import {Colors, Fonts} from '../../constants';
import StaticHeader from '../../components/StaticHeader';

const AllBookings = () => {
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
        <View>
          <FlatListWithHeader items={dummyUpcoming} />
        </View>
        <View style={{height: hp(9) + hp(4)}} />
      </ScrollView>
    </View>
  );
};

export default AllBookings;

const styles = StyleSheet.create({});
