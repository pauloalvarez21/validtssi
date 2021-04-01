import React from 'react';
import {Text, View, FlatList} from 'react-native';

import dataOff from '../../json/dataOff.json';
import Card from '../components/Card';

const NoOnline = () => {
  return (
    <View>
      <Text>no hay conexión a internet</Text>
      <FlatList
        data={dataOff}
        keyExtractor={(id, index) => index.toString()}
        renderItem={({item}) => (
          <Card>
            <Text>{item.name}</Text>

            <Text>listeners: {item.listeners}</Text>
          </Card>
        )}
      />
    </View>
  );
};

export default NoOnline;
