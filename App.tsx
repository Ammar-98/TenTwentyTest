import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Router from './src/router/Router';
import {NavigationContainer} from '@react-navigation/native';
import Appstate from './context/Appstate';
import DashboardStackNavigator from './src/router/DashboardStackNavigator';


export default function App() {
  
 

  return (
    <Appstate>
      <NavigationContainer>
 <DashboardStackNavigator />
      </NavigationContainer>
    </Appstate>
  );
}

const styles = StyleSheet.create({});
