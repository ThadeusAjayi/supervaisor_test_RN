import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Styles from './Styles';
import VideoPlayer from './VideoPlayer';
import IonIcons from 'react-native-vector-icons/Ionicons';

export default ({navigation, route}) => {
  const {sources} = route.params.detail;
  return (
    <View style={[Styles.parent]}>
      <TouchableOpacity
      onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          shadowColor: 'white',
          backgroundColor: '#00000060',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
          alignItems: 'center',
          padding: 8,
          zIndex: 2,
          borderRadius: 15
        }}>
        <IonIcons name="arrow-back" color="white" size={20} />
      </TouchableOpacity>
      <VideoPlayer videoUrl={sources[0]} navigation={navigation} />
    </View>
  );
};
