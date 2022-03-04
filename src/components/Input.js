import React from 'react';
import {
  View,
  TextInput,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Fonts, Colors} from '../constants';
export const CommonInput = ({
  text,
  iconName,
  plholder,
  iconType,
  value,
  rightIconName,
  onchangeText,
  textType = false,
  rightIconType,
  keyboardType,
  rightIconClick,
}) => {
  return (
    <View style={[{backgroundColor: '#fff', alignSelf: 'center'}]}>
      <TouchableOpacity style={styles.input}>
        <View style={{width: '20%', alignItems: 'center'}}>
          {iconName && (
            <Icon
              name={iconName}
              type={iconType}
              color={Colors.primary}
              size={wp(6)}
            />
          )}
        </View>
        <View style={{width: '60%', alignItems: 'flex-start'}}>
          {plholder && (
            <TextInput
              placeholder={plholder}
              value={value}
              underlineColorAndroid="transparent"
              selectionColor={'#999'}
              placeholderTextColor={'#999'}
              onChangeText={onchangeText}
              style={styles.text}
              editable={true}
              secureTextEntry={textType}
              keyboardType={keyboardType || 'default'}
            />
          )}
        </View>
        <View style={{width: '20%', alignItems: 'center'}}>
          {rightIconName && (
            <Icon
              name={rightIconName}
              type={rightIconType}
              color={Colors.primary}
              size={wp(6)}
              onPress={rightIconClick}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: hp(7.5),
    width: wp(90),
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: wp(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: hp(5),
    width: wp(5),
    resizeMode: 'contain',
  },
  text: {
    color: Colors.text,
    textDecorationLine: 'none',
    fontSize: wp(4),
    fontFamily: Fonts.medium,
    width: '100%',
  },
});
