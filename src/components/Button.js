import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../constants';
import {PacmanIndicator, SkypeIndicator} from 'react-native-indicators';
import {widthPercentageToDP} from 'react-native-responsive-screen';

const Button = ({
  btnName,
  btnStyle,
  onPress,
  textStyle,
  icon,
  disabled = false,
  isLoader = false,
}) => {
  var btnStyle = btnStyle || {};
  var textStyle = textStyle || {};
  var icon = icon || null;
  return (
    <View>
      <TouchableOpacity
        disabled={isLoader || disabled}
        style={[
          btnStyle,
          {
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            // elevation: 10,
            shadowColor: '#999',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            opacity: disabled ? 0.5 : 1,
            // backgroundColor: isLoader ? Colors.white : Colors.botton,
          },
          isLoader ? {backgroundColor: Colors.white} : null,
        ]}
        onPress={onPress}
        activeOpacity={0.4}>
        {isLoader ? (
          <SkypeIndicator
            color={Colors.botton}
            count={5}
            size={widthPercentageToDP(12)}
          />
        ) : icon === null ? (
          <Text style={textStyle}>{btnName}</Text>
        ) : (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name={icon.name}
              type={icon.type}
              color={icon?.color ? icon?.color : '#000'}
              size={icon?.size ? icon?.size : 24}
              style={icon?.style ? icon?.style : null}
            />
            <Text style={textStyle}>
              {'  '}
              {btnName}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;

// const styles = StyleSheet.create({})
