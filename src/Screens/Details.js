import {
    ActivityIndicator,
    Animated,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useContext, useEffect, useState } from 'react';
  import { WindowHeight, WindowWidth } from '../../utils/Dimensions';
  import AppContext from '../../context/AppContext';
  import Entypo from 'react-native-vector-icons/Entypo';
  import axios from 'axios';
  
  export default function Details(props) {
    const [loading, setloading] = useState(false);
    const { configURL } = useContext(AppContext);
    const scrollY = new Animated.Value(0);
  
    const fetchData = () => {
      try {
        const key = '73beb2ce011840ee4dc6afc8ea0033a2';
  
        const res = axios.get(
          `https://api.themoviedb.org/3/movie/${props.route.params.data}}?api_key=${key}`,
        );
      } catch (error) {}
    };
  
    useEffect(() => {
      // fetchData();
    }, []);
  
    function convertDateFormat(dateString) {
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
  
      const [year, month, day] = dateString.split('-');
      const monthName = months[parseInt(month, 10) - 1]; // Convert month to 0-based index
  
      return `${monthName} ${parseInt(day, 10)}, ${year}`;
    }
  
    const Button = props => {
      return (
        <View
          style={{
            width: WindowWidth * 0.65,
            height: WindowHeight * 0.08,
            borderRadius: WindowWidth * 0.04,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 2,
            borderColor: props.borderColor,
            flexDirection: 'row',
            gap: 4,
          }}>
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              backgroundColor: props.backgroundColor
                ? props.backgroundColor
                : 'white',
              opacity: props.backgroundColor ? 1 : 0.3,
              borderRadius: WindowWidth * 0.04, // Ensure background has rounded corners
            }}
          />
          {props.ShowPlayButton && (
            <Entypo name={'controller-play'} size={25} color={props.textColor} />
          )}
          <Text
            style={{
              color: props.textColor,
              fontSize: 20,
              fontWeight: '500',
              textShadowColor: 'black',
              textShadowRadius: 5,
              textShadowOffset: { width: 1, height: 1 },
              opacity: 1,
            }}>
            {props.text}
          </Text>
        </View>
      );
    };
  
    if (loading == true)
      return (
        <View
          style={{
            width: WindowWidth,
            height: WindowHeight,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator color={'gray'} />
        </View>
      );
  
    const imageWidth = scrollY.interpolate({
      inputRange: [0, WindowWidth],
      outputRange: [WindowWidth, WindowWidth * 0.8],
      extrapolate: 'clamp',
    });
  
    return (
      <View style={{ width: WindowWidth, height: WindowHeight }}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={16}>
          <View style={{width:WindowWidth, alignItems:'center'}}>
            <Animated.Image
              style={{
                height: WindowHeight * 0.65,
                width: imageWidth,
                resizeMode: 'cover',
              }}
              source={{
                uri: String(configURL + props.route.params.data.poster_path),
              }}
            />
            <Text
              style={{
                fontSize: 24,
                fontWeight: '500',
                color: 'white',
                position: 'absolute',
                zIndex: 10,
                top: WindowHeight * 0.4,
                alignSelf: 'center',
                textShadowColor: 'black',
                textShadowRadius: 5,
                textShadowOffset: { width: 1, height: 1 },
              }}>
              In Theaters {convertDateFormat(props.route.params.data.release_date)}
            </Text>
            <View
              style={{
                width: WindowWidth,
                top: WindowHeight * 0.45,
                position: 'absolute',
                gap: WindowHeight * 0.02,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TouchableOpacity onPress={()=>props.navigation.navigate('SelectTime',{data:props.route.params.data})}>
              <Button
                text={'Get Tickets'}
                borderColor={'#61C3F2'}
                backgroundColor={'#61C3F2'}
                ShowPlayButton={false}
                textColor={'white'}
              />
              </TouchableOpacity>
              <Button
                text={'Watch Trailer'}
                borderColor={'#61C3F2'}
                ShowPlayButton={true}
                textColor={'white'}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: WindowWidth * 0.1,
              paddingTop: WindowHeight * 0.03,
              paddingBottom: WindowHeight * 0.2,
              gap: WindowHeight * 0.02,
            }}>
            <Text
              style={{
                fontSize: 25,
                color: 'black',
                borderTopWidth: 1,
                paddingTop: WindowHeight * 0.03,
                borderTopColor: 'gray',
              }}>
              Overview
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '300',
                color: 'black',
                lineHeight: WindowHeight * 0.027,
              }}>
              {props.route.params.data.overview}
            </Text>
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
  
  const styles = StyleSheet.create({});
  