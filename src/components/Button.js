import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';

const Button = ({btnName, btnStyle, onPress, textStyle, icon}) => {
  var btnStyle = btnStyle || {};
  var textStyle = textStyle || {};
  var icon = icon || null;
  return (
    <View>
      <TouchableOpacity
        style={[
          btnStyle,
          {
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            elevation: 5,
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
              size={24}
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
