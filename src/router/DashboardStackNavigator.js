import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Watch from '../Screens/Watch';
import Details from '../Screens/Details';
import SearchResultScreen from '../Screens/SearchResultScreen';
import Router from './Router';
import SelectTime from '../Screens/SelectTime';
import SelectSeat from '../Screens/SelectSeat';
const Stack = createNativeStackNavigator();
export default function DashboardStackNavigator() {
    return (
      
        <Stack.Navigator screenOptions={{
            headerShown:false
        }} >
          <Stack.Screen name="Watch" component={Router} />
          <Stack.Screen name="Details" component={Details} />
          <Stack.Screen name="SearchResultScreen" component={SearchResultScreen} />
          <Stack.Screen name="SelectTime" component={SelectTime} />
          <Stack.Screen name="SelectSeat" component={SelectSeat} />


        </Stack.Navigator>
      
    );
  }