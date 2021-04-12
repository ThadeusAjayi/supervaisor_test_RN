import React, {useState} from 'react';
import { ScrollView, View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Styles from './Styles';
import VideoPlayer from './VideoPlayer';

export default ({navigation, route}) => {
  console.log('route', route.params.detail);
  const {sources} = route.params.detail;
  return (
    <View
      style={[Styles.parent, {paddingHorizontal: 0}]}>
      <VideoPlayer videoUrl={sources[0]} navigation={navigation} />
    </View>
  );
};
