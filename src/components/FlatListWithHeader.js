import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors, Fonts} from '../constants';

/**
 *
 * title - List name
 * items - [all data]
 * @returns
 */
const FlatListWithHeader = ({title, items}) => {
  return (
    <View style={{padding: 5}}>
      <Text
        style={{
          fontFamily: Fonts.semibold,
          fontSize: 20,
          color: Colors.primary,
        }}>
        {title === undefined ? null : title}
      </Text>
      <FlatList
        horizontal
        renderItem={(item, ind) => {
          return (
            <View>
              <Text>Tesr</Text>
            </View>
          );
        }}
        data={items?.slice(0, 3)}
        ListFooterComponent={() => {
          if (items?.length > 3) {
            return (
              <View>
                <Text>View All</Text>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

export default FlatListWithHeader;

const styles = StyleSheet.create({});
