import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../constants';

const Button = ({
  btnName,
  btnStyle,
  onPress,
  textStyle,
  icon,
  disabled = false,
}) => {
  var btnStyle = btnStyle || {};
  var textStyle = textStyle || {};
  var icon = icon || null;
  return (
    <View>
      <TouchableOpacity
        disabled={disabled}
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
          },
        ]}
        onPress={onPress}
        activeOpacity={0.4}>
        {icon === null ? (
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
