import React, {useEffect} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import Styles from './Styles';
import {useState} from 'react/cjs/react.development';
import { getVideoList } from './network/axiosDefault';

export default ({navigation}) => {
  const [videoList, setVideoList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getVideos = () => {
    setLoading(true);
    getVideoList()
    .then(res => {
      setLoading(false);
      let updatedList = [...res.data, ...videoList];
      setVideoList(updatedList);
    })
    .catch(err => {
      setLoading(false);
      console.log("video list err", err);
    });
  };
  useEffect(() => {
    getVideos();
  }, []);
  return (
    <SafeAreaView forceInset={{bottom: false}} style={Styles.parent}>
      <Text
        style={{
          fontFamily: 'Muli-Bold',
          fontSize: 20,
          marginTop: 10,
          marginHorizontal: 20
        }}>
        Video List
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 20}}
        data={videoList ? videoList : []}
        keyExtractor={(item, index) => String(index + 360)}
        onEndReachedThreshold={0.7}
        onEndReached={() => getVideos()}
        renderItem={({item, index}) => <TouchableOpacity
            key={index * 360}
            activeOpacity={0.7}
            onPress={() => navigation.navigate('VideoDetail', {detail: item})}>
            <View style={Styles.listItemParent}>
              <Image source={{uri: item.thumb}} style={{aspectRatio: 1.0, height: 150, alignSelf: 'center'}}/>
              <View style={{flex: 1, justifyContent: 'space-around', paddingHorizontal: 8}}>
              <Text numberOfLines={2} style={{fontFamily: "Muli-Bold", fontSize: 16}}>{item.title}</Text>
              <Text numberOfLines={3} style={{fontFamily: "Muli-light", fontSize: 14}}>{item.description}</Text>
              </View>
            </View>
          </TouchableOpacity>}
        ListEmptyComponent={() =>
          !loading && videoList.length < 1 ? (
            <View style={{flex: 1, alignItems: 'center', paddingVertical: 20}}>
              <Text
                style={{
                  fontFamily: 'Muli-Light',
                  fontSize: 16,
                }}>
                No Item listed
              </Text>
            </View>
          ) : (
            <ActivityIndicator size="large" color="tomato" />
          )
        }
      />
    </SafeAreaView>
  );
};
