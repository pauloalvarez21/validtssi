import React from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';

const HomeWeb = ({route}) => {
  const {url} = route.params;

  return (
    <View style={{flex: 1}}>
      <WebView source={{uri: url}} style={{flex: 1}} javaScriptEnabled={true} />
    </View>
  );
};

export default HomeWeb;
