import {
  Linking,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../../constants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import StaticHeader from '../../components/StaticHeader';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import Button from '../../components/Button';
import BlankSpace from '../../components/BlankSpace';
import KhataEntry from '../KhataEntry';
import {UIStore} from '../../UIStore';
import {SkypeIndicator} from 'react-native-indicators';

const Events = () => {
  const userRole = UIStore.useState(s => s.userRole);
  return (
    <View
      style={{
        backgroundColor: '#fff',
        // paddingTop: StatusBar.currentHeight,
        flex: 1,
      }}>
      {!userRole ? (
        <View
          style={{
            flex: 1,
            height: hp(20),
            alignItems: 'center',
            justifyContent: 'center',
            width: wp(100),
          }}>
          <SkypeIndicator color={Colors.botton} count={5} size={wp(12)} />
        </View>
      ) : userRole == 'Treasurer' ? (
        <KhataEntry />
      ) : (
        <Text style={{fontFamily: Fonts.medium, fontSize: 20}}>
          No Events Found
        </Text>
      )}
    </View>
  );
};

export default Events;

const styles = StyleSheet.create({});
