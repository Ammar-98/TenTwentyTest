import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {WindowHeight, WindowWidth} from '../../utils/Dimensions';
import AppContext from '../../context/AppContext';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import {SafeAreaView} from 'react-native-safe-area-context';

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
          textShadowOffset: {width: 1, height: 1},
          opacity: 1,
        }}>
        {props.text}
      </Text>
    </View>
  );
};
export default function Details(props) {
  const {configURL} = useContext(AppContext);
  const scrollY = new Animated.Value(0);
  const [VideoKey, setVideoKey] = useState('');
  const [TrailerAvailable, setTrailerAvailable] = useState(false);

  const fetchData = async () => {
    try {
      const key = '73beb2ce011840ee4dc6afc8ea0033a2';
      console.log('props.route.params.data', props.route.params.data.id);

      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${props.route.params.data.id}/videos?api_key=${key}`,
      );
      if ((res.status = 200)) {
        let i = 0;
        while (i < res.data.results.length) {
          if (res.data.results[i].name.toLowerCase().includes('trailer')) {
            setVideoKey(res.data.results[i].key);
            setTrailerAvailable(true);
            return;
          }
          i = i + 1;
        }
        if (VideoKey === '') {
          setVideoKey(res.data.results[0].key);
        }

        setTrailerAvailable(true);

        console.log('res', res.data.results[0].key);
        console.log('res.status', res.status);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const imageWidth = scrollY.interpolate({
    inputRange: [0, WindowWidth],
    outputRange: [WindowWidth, WindowWidth * 0.8],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Entypo name={'chevron-left'} size={25} color={'black'} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: WindowWidth,
          height: WindowHeight * 0.9,
          backgroundColor: 'white',
        }}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollY}}}],
            {useNativeDriver: false},
          )}
          scrollEventThrottle={16}>
          <View style={{width: WindowWidth, alignItems: 'center'}}>
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
                textShadowOffset: {width: 1, height: 1},
              }}>
              In Theaters{' '}
              {convertDateFormat(props.route.params.data.release_date)}
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
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('SelectTime', {
                    data: props.route.params.data,
                  })
                }>
                <Button
                  text={'Get Tickets'}
                  borderColor={'#61C3F2'}
                  backgroundColor={'#61C3F2'}
                  ShowPlayButton={false}
                  textColor={'white'}
                />
              </TouchableOpacity>

              {TrailerAvailable === true && (
                <TouchableOpacity
                  onPress={() =>
                    props.navigation.navigate('YoutubeTrailerScreen', {
                      VideoKey: VideoKey,
                    })
                  }>
                  <Button
                    text={'Watch Trailer'}
                    borderColor={'#61C3F2'}
                    ShowPlayButton={true}
                    textColor={'white'}
                  />
                </TouchableOpacity>
              )}
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
    </SafeAreaView>
  );
}
