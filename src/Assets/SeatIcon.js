import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WindowHeight, WindowWidth} from '../../utils/Dimensions';

export default function SeatIcon({color}) {
  return (
    <View style={{alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          width: WindowWidth * 0.065,
          borderBottomColor: 'white',
          borderBottomWidth: 1,
          height: WindowWidth * 0.045,
          borderRadius: WindowWidth * 0.01,
          backgroundColor: color,
        }}></View>
      <View
        style={{
          width: WindowWidth * 0.04,
          height: WindowWidth * 0.015,
          borderRadius: WindowWidth * 0.01,
          backgroundColor: color,
        }}></View>
    </View>
  );
}

const styles = StyleSheet.create({});
