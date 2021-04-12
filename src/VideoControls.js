import React from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {CircleSnail} from 'react-native-progress';
import VideoStyles from './VideoStyles';

export default ({
  showControlFunction,
  currentTime,
  duration,
  onSliderValueChanged,
  playFunction,
  isPlaying,
  buffering,
  error,
  errorFunction,
  handleSeek,
  showControls,
  enterFullScreen,
  sliderRef,
  resizeMode,
  isFullScreen,
}) => {
  let maximizeIcon = 'maximize';
  if (resizeMode == 'contain' && isFullScreen) {
    maximizeIcon = 'maximize-2';
  }
  if (resizeMode == 'cover' && isFullScreen) {
    maximizeIcon = 'minimize';
  }
  return (
    <TouchableWithoutFeedback
      style={[VideoStyles.controlsContainer, {}]}
      onPress={() => showControlFunction()}>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor:
            showControls || buffering ? 'rgba(0,0,0,0.3)' : 'transparent',
          paddingBottom: isFullScreen ? 10 : 0,
        }}>
        {buffering && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CircleSnail
              thickness={4}
              size={50}
              color={['#FFF']}
              style={{alignSelf: 'center'}}
            />
          </View>
        )}
        {error && (
          <View
            style={{
              flex: 1,
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.9)',
            }}>
            <TouchableOpacity
              style={{width: '100%', alignSelf: 'center'}}
              onPress={() => errorFunction()}>
              <Text
                style={{
                  color: 'white',
                  fontFamily: 'Muli-Bold',
                  fontSize: 16,
                  textAlign: 'center',
                }}>{`Sorry we couldn't play this video\n\nTap to replay`}</Text>
            </TouchableOpacity>
          </View>
        )}
        {showControls && !error && (
          <View
            style={{
              flexDirection: 'row',
              bottom: 10,
              paddingHorizontal: 10,
              width: '100%',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'baseline',
              }}>
              <TouchableOpacity
                onPress={() => playFunction()}
                style={VideoStyles.controlsPlayBtn}>
                <Ionicons
                  size={20}
                  name={isPlaying ? 'md-pause' : 'md-play'}
                  color="white"
                />
              </TouchableOpacity>
              <Text style={VideoStyles.controlsVideoTime}>
                {String(duration - currentTime).toHHMMSS()}
              </Text>
              <TouchableOpacity
                style={{paddingHorizontal: 8, paddingVertical: 14}}
                onPress={() => enterFullScreen()}>
                <Feather
                  size={15}
                  name={maximizeIcon}
                  color="white"
                  style={[VideoStyles.controlsVideoTime]}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};
