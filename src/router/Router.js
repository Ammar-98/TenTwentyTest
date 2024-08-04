import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import Dashboard from '../Screens/Dashboard';
import MediaLibrary from '../Screens/MediaLibrary';
import More from '../Screens/More';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Watch from '../Screens/Watch';

import {WindowHeight, WindowWidth} from '../../utils/Dimensions';
import AppContext from '../../context/AppContext';

export default function Router() {
  const {getConfig} = useContext(AppContext);

  useEffect(() => {
    getConfig();
  }, []);

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
     initialRouteName='Watch'
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === 'Dashboard') {
            return (
              <View style={{flexDirection: 'row', gap: 3}}>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <FontAwesome
                    name={'circle'}
                    size={13}
                    color={focused == true ? 'white' : '#827d88'}
                  />
                  <FontAwesome
                    name={'circle'}
                    size={13}
                    color={focused == true ? 'white' : '#827d88'}
                  />
                </View>
                <View style={{display: 'flex', flexDirection: 'column'}}>
                  <FontAwesome
                    name={'circle'}
                    size={13}
                    color={focused == true ? 'white' : '#827d88'}
                  />
                  <FontAwesome
                    name={'circle'}
                    size={13}
                    color={focused == true ? 'white' : '#827d88'}
                  />
                </View>
              </View>
            );
          } else if (route.name === 'Watch') {
            return (
              <FontAwesome
                name={'youtube-play'}
                size={35}
                color={focused == true ? 'white' : '#827d88'}
              />
            );
          } else if (route.name === 'Media Library') {
            return (
              <Foundation
                name={'page-multiple'}
                size={30}
                color={focused == true ? 'white' : '#827d88'}
              />
            );
          } else if (route.name === 'More') {
            return (
              <SimpleLineIcons
                name={'list'}
                size={33}
                color={focused == true ? 'white' : '#827d88'}
              />
            );
          }

          // You can return any component that you like here!
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarHideOnKeyboard: true,
       
        // tabBarShowLabel:false,

        tabBarStyle: {
          height: WindowHeight * 0.08,
          justifyContent: 'center',
          backgroundColor: '#2e2739',
          paddingBottom: 5,
          borderTopLeftRadius: WindowWidth * 0.05,
          borderTopRightRadius: WindowWidth * 0.05,
          borderBottomRightRadius: WindowWidth * 0.01,
          borderBottomLeftRadius: WindowWidth * 0.01,
          paddingTop: 3,
          overflow: 'hidden',
          position: 'absolute',
          borderColor: '#2e2739', // Match the border color with background color
          borderWidth: 1, // Adjust the border width if necessary
        },
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Watch" component={Watch} />
      <Tab.Screen name="Media Library" component={MediaLibrary} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
