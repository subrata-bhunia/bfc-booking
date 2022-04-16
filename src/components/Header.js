import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {Colors, Fonts} from '../constants';
import {useNavigation} from '@react-navigation/core';

const Header = ({
  backBtn,
  notiBtn,
  searchBtn,
  name,
  imgBack,
  backColor,
  headerHeight,
  backImgSource,
}) => {
  const navigation = useNavigation();
  const [state, setState] = useState({
    backBtn: backBtn || false,
    notiBtn: notiBtn || false,
    searchBtn: searchBtn || false,
    imgBack: imgBack || false,
    name: ' ' || name,
    backColor: Colors.secondary || backColor,
    headerHeight: headerHeight || 70,
    back_img_source: backImgSource,
  });
  const gotoBack = () => {
    navigation.goBack();
  };
  // const gotoNotification=()=>{
  //     navigation.navigate("Notifications")
  // };
  return state.imgBack ? (
    <ImageBackground
      style={[s.ImageBackground, {height: state.headerHeight}]}
      source={state.back_img_source}
      imageStyle={s.ImageBackground_Img}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          marginTop: 30,
          alignSelf: 'center',
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}>
        {state.backBtn ? (
          <TouchableOpacity onPress={() => gotoBack()}>
            <Icon
              name="arrow-back"
              type="ionicons"
              size={24}
              color={Colors.text}
            />
          </TouchableOpacity>
        ) : state.notiBtn ? (
          <TouchableOpacity onPress={() => console.log('Test')}>
            <Icon
              name="bell"
              type="simple-line-icon"
              size={24}
              color={Colors.text}
            />
          </TouchableOpacity>
        ) : (
          <View style={{height: 25, width: 25}} />
        )}
        <Text
          style={{
            fontFamily: Fonts.semibold,
            color: Colors.text,
            textAlign: 'center',
          }}>
          {name}
        </Text>
        {state.searchBtn ? (
          <TouchableOpacity>
            <Icon
              name="search1"
              type="antdesign"
              size={25}
              color={Colors.text}
            />
          </TouchableOpacity>
        ) : (
          <View style={{height: 25, width: 25}} />
        )}
      </View>
    </ImageBackground>
  ) : (
    <View
      style={[
        s.ImageBackground,
        {backgroundColor: state.backColor, height: state.headerHeight},
      ]}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          marginTop: 30,
          alignSelf: 'center',
          backgroundColor: 'transparent',
          alignItems: 'center',
        }}>
        {state.backBtn ? (
          <TouchableOpacity onPress={() => gotoBack()}>
            <Icon
              name="arrow-back"
              type="ionicons"
              size={24}
              color={Colors.text}
            />
          </TouchableOpacity>
        ) : state.notiBtn ? (
          <TouchableOpacity onPress={() => console.log('Testr')}>
            <Icon
              name="bell"
              type="simple-line-icon"
              size={24}
              color={Colors.text}
            />
          </TouchableOpacity>
        ) : (
          <View style={{height: 25, width: 25}} />
        )}
        <Text
          style={{
            fontFamily: Fonts.semibold,
            color: Colors.text,
            textAlign: 'center',
          }}>
          {name}
        </Text>
        {state.searchBtn ? (
          <TouchableOpacity>
            <Icon
              name="search1"
              type="antdesign"
              size={25}
              color={Colors.text}
            />
          </TouchableOpacity>
        ) : (
          <View style={{height: 25, width: 25}} />
        )}
      </View>
    </View>
  );
};
export const s = StyleSheet.create({
  ImageBackground: {
    backgroundColor: Colors.black,
  },
  ImageBackground_Img: {
    resizeMode: 'cover',
    opacity: 0.5,
  },
});
export default Header;
