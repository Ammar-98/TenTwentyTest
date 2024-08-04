import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {WindowHeight, WindowWidth} from '../../utils/Dimensions';

const Header = () => {
  return (
    <View style={styles.Header}>
      <Text style={styles.HeaderText}>Dashboard</Text>
    </View>
  );
};
export default function Dashboard() {
  return (
    <View style={{backgroundColor: '#f6f6fa'}}>
      <Header />
    </View>
  );
}

const styles = StyleSheet.create({
  Header: {
    width: WindowWidth,
    height: WindowHeight * 0.1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: WindowWidth * 0.05,
    backgroundColor: 'white',
  },
  HeaderText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
  },
});
