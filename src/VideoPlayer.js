import React, {useEffect, useState} from 'react';
import {View, Dimensions, NativeModules, Platform} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Orientation from 'react-native-orientation';
import Video from 'react-native-video';
import KeepAwake from 'react-native-keep-awake';
import VideoControls from './VideoControls';

const ref = React.createRef();

const {width, height} = Dimensions.get('window');

const {StatusBarManager} = NativeModules;
const statusBarHeight = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

export default ({navigation, videoUrl}) => {
  const [showVideoControl, setShowVideoControl] = useState(false);
  const [state, setState] = useState({
    videoWidth: width,
    videoHeight: (width * 9) / 16, // The default 16:12 aspect ratio
    showVideoCover: false,
    isPlaying: true,
    isMuted: false,
    volume: 1.0,
    currentTime: 0.0, //Current video playback time
    duration: 0, //The total duration of the video
    isFullScreen: false, //Is the current full-screen display
    playFromBeginning: false, // Whether to start playing from the beginning
    rate: 1,
    isSettingViewShow: false,
    buffering: true,
    metadata: null,
    error: false,
    resizeMode: 'contain',
  });

  ///Click the play button in the middle of the player
  const _onPressPlayButton = () =>
    setState({...state, isPlaying: !state.isPlaying});

  useEffect(() => {
    let blur = navigation.addListener('blur', () => {
      state.isPlaying && _onPressPlayButton();
      KeepAwake.deactivate();
      Orientation.lockToPortrait();
    });
    let focus = navigation.addListener('focus', () => {
      !state.isPlaying && _onPressPlayButton();
      KeepAwake.activate();
      Orientation.lockToLandscapeRight();
    });
    return () => {
      blur;
      focus;
    };
  }, []);

  let videoRef;

  const _onBuffering = (data) => {
    if (data.isBuffering === true) {
      setState({...state, buffering: true});
    } else {
      setState({...state, buffering: false});
    }
  };

  const _onLoaded = (data) => {
    const {naturalSize} = data;
    const {height, width} = naturalSize;
    let isBoxVideo = height == width;
    setState({
      ...state,
      duration: data.duration,
      buffering: false,
      isBoxVideo,
    });
  };

  const _onProgressChanged = (data) => {
    if (state.isPlaying) {
      setState({...state, currentTime: data.currentTime});
    }
  };

  const _onPlayEnd = () => {
    videoRef.seek(1);
    setState({
      ...state,
      currentTime: 1,
      isPlaying: false,
      playFromBeginning: true,
    });
  };

  /// Controlling the display and hiding of the player toolbar
  const _hideControl = () => {
    if (showVideoControl) {
      setShowVideoControl(false);
    } else {
      setShowVideoControl(true);
      setTimeout(() => {
        setShowVideoControl(false);
      }, 5000);
    }
  };

  const _onLayout = (event) => {
    let {width, height} = event.nativeEvent.layout;
    let isLandscape = width > height;
    if (isLandscape) {
      setState({
        ...state,
        videoWidth: width,
        videoHeight: height,
        isFullScreen: true,
        // resizeMode: "contain"
      });
    } else {
      setState({
        ...state,
        videoWidth: width,
        videoHeight: (width * 9) / 16,
        isFullScreen: false,
        // resizeMode: "cover"
      });
    }
  };

  /// Progress bar value changes
  const _onSliderValueChanged = (currentTime) => {
    videoRef.seek(currentTime);
    if (state.isPlaying) {
      setState({...state, currentTime: currentTime});
    } else {
      setState({
        ...state,
        currentTime: currentTime,
        isPlaying: true,
        showVideoCover: false,
      });
    }
  };

  const _handleSeek = (event) => {
    const screenWidth = Dimensions.get('window').width;
    const percent = event.nativeEvent.pageX / screenWidth;
    videoRef.seek(state.duration * percent);
  };

  /// Clicked the full screen button on the toolbar
  const _onControlShrinkPress = () => {
    if (state.isFullScreen) {
      if (state.resizeMode == 'contain') {
        return setState({...state, resizeMode: 'cover'});
      }
      if (state.resizeMode == 'cover') {
        setState({...state, resizeMode: 'contain'});
        return Orientation.lockToPortrait();
      }
    } else {
      Platform.OS == 'ios'
        ? Orientation.lockToLandscapeRight()
        : Orientation.lockToLandscape();
    }
  };

  const _retryOnError = () => {
    videoRef.source = {uri: videoUrl};
    videoRef.seek(state.currentTime);
    setState({
      ...state,
      isPlaying: true,
      currentTime: state.currentTime,
      error: false,
    });
  };

  const bufferConfig = {
    minBufferMs: 15000,
    maxBufferMs: 50000,
    bufferForPlaybackMs: 2500,
    bufferForPlaybackAfterRebufferMs: 5000,
  };

  // componentWillUnmount() {
  //   props.nullVideo();
  //   Orientation.lockToPortrait();
  // }

  const _handleAppStateChange = async (nextAppState) => {
    // const { isPlaying } = state;
    // if (nextAppState.match(/inactive|background/)) {
    //   isPlaying && _onPressPlayButton();
    // } else {
    //   !isPlaying && _onPressPlayButton();
    // }
  };

  const _ff_rr = (dir) => {
    if (dir === 1) {
      //fast forward
      //setState({ currentTime: state.currentTime + 30 });
      videoRef.seek(state.currentTime + 10);
    } else {
      //rewind
      //setState({ currentTime: state.currentTime - 30 });
      videoRef.seek(state.currentTime - 10);
    }
  };

  const {
    currentTime,
    duration,
    isPlaying,
    error,
    buffering,
    showComments,
    commentsCount,
    isFullScreen,
    resizeMode,
  } = state;
  return (
    <SafeAreaView
      forceInset={{
        top: isFullScreen ? 'never' : 'always',
        bottom: 'never',
        right: isFullScreen ? 'never' : 'always',
        left: isFullScreen ? 'never' : 'always',
      }}
      style={{flex: 1, backgroundColor: '#000000'}}>
      <View
        style={{
          flex: 1,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        }}
        onLayout={_onLayout}>
        <View
          style={{
            height: state.videoHeight,
            width: state.videoWidth,
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}>
          <Video
            source={{
              uri: videoUrl,
            }}
            ref={(ref) => (videoRef = ref)}
            style={{
              position: 'absolute',
              height: state.videoHeight,
              width: state.videoWidth,
              backgroundColor: '#000000',
            }}
            resizeMode={state.resizeMode}
            // poster={selectedVideo.imgURL}
            posterResizeMode={'cover'}
            ignoreSilentSwitch={'ignore'}
            onLoad={_onLoaded}
            // onLoadStart={_onLoadStart}
            onProgress={_onProgressChanged}
            onEnd={_onPlayEnd}
            paused={!state.isPlaying}
            rate={state.rate}
            onBuffer={_onBuffering}
            bufferConfig={bufferConfig}
            playInBackground={false}
            onError={(err) =>
              requestAnimationFrame(() => {
                setState({...state, error: true, buffering: false});
              })
            }
          />
          <View style={{flex: 1}}>
            <VideoControls
              item={{}}
              showControls={showVideoControl}
              showControlFunction={_hideControl}
              currentTime={currentTime}
              duration={duration}
              onSliderValueChanged={_onSliderValueChanged}
              playFunction={_onPressPlayButton}
              isPlaying={isPlaying}
              buffering={buffering}
              error={error}
              sliderRef={ref}
              enterFullScreen={_onControlShrinkPress}
              errorFunction={_retryOnError}
              handleSeek={_handleSeek}
              resizeMode={resizeMode}
              isFullScreen={isFullScreen}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
