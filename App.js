import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import {StatusBar, Platform} from 'react-native';
import VideoList from './src/VideoList';
import VideoDetail from './src/VideoDetail';
require("./src/network/axiosDefault").default();

String.prototype.toHHMMSS = function () {
  var sec_num = parseInt(this, 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

if (hours < 1) {
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return minutes+':'+seconds;
};
  if (hours < 10) {hours   = "0"+hours;}
  if (minutes < 10) {minutes = "0"+minutes;}
  if (seconds < 10) {seconds = "0"+seconds;}
  return hours+':'+minutes+':'+seconds;
}

const Routes = createStackNavigator();

export default () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
      Platform.OS == 'android' && StatusBar.setBackgroundColor('transparent');
      StatusBar.setBarStyle('dark-content');
    }, 1000);
  }, []);
  return (
    <NavigationContainer >
      <Routes.Navigator headerMode={null}>
        <Routes.Screen name="VideoList" component={VideoList} />
        <Routes.Screen name="VideoDetail" component={VideoDetail} />
      </Routes.Navigator>
    </NavigationContainer>
  );
};
