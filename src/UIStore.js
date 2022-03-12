import React from 'react';
import {Store} from 'pullstate';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UIStore = new Store({
  userId: AsyncStorage.getItem('userId').then(res => {
    return res;
  }),
  userName: '',
});
