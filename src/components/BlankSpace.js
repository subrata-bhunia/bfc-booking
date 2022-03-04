import React from 'react';
import {View} from 'react-native';

export default BlankSpace = ({style, height, ...props}) => {
  return <View style={[{height}, style]} {...props} />;
};
