import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {WindowHeight, WindowWidth} from '../../utils/Dimensions';
import YoutubePlayer from 'react-native-youtube-iframe';
export default function YoutubeTrailerScreen(props) {
  const [Playing, setPlaying] = useState(true);
  const onStateChange = state => {
    if (state === 'ended') {
      setPlaying(false);
      props.navigation.goBack();
    }
  };

  const DonePressed = () => {
    setPlaying(false);
    props.navigation.goBack();
  };

  useEffect(() => {
    console.log('props.route', props.route.params.VideoKey);
  }, [props.route.params.VideoKey]);

  return (
    <SafeAreaView>
      <View
        style={{
          width: WindowWidth,
          height: WindowHeight,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'black',
        }}>
        <View style={{position: 'absolute', top: 0, left: 0}}>
          <Button
            onPress={() => props.navigation.goBack()}
            title="Back"
            color="white"
          />
        </View>
        <YoutubePlayer
          height={400}
          width={WindowWidth}
          play={Playing}
          videoId={props.route.params.VideoKey}
          onChangeState={onStateChange}
          initialPlayerParams={{controls: false, loop: false}}
        />
        <TouchableOpacity onPress={() => DonePressed()}>
          <Text
            style={{
              color: 'white',
              backgroundColor: '#61C3F2',
              width: WindowWidth * 0.7,
              textAlign: 'center',
              textAlignVertical: 'center',
              height: WindowHeight * 0.07,
              borderRadius: 10,
            }}>
            Done
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
