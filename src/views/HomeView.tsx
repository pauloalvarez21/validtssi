import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  Button,
} from 'react-native';
import {checkConnected} from '../util/funtions';

import AutoHeightImage from 'react-native-auto-height-image';

import Card from '../components/Card';

import NoOnline from './NoOnline';

const HomeView = ({navigation}) => {
  const [data, setData] = useState([]);
  const [txtCountry, settxtCountry] = useState();

  const [dataArtist, setDataArtist] = useState([]);
  const [txtArtist, settxtArtist] = useState();

  const [connectStaus, setConnecStatus] = useState(false);

  checkConnected().then(res => {
    setConnecStatus(res);
  });

  const country = () => {
    fetch(
      'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' +
        txtCountry +
        '&api_key=829751643419a7128b7ada50de590067&format=json',
    )
      .then(response => response.json())
      .then(json => {
        setData(json.topartists.artist);
      });
  };

  const artist = () => {
    fetch(
      'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' +
        txtArtist +
        '&api_key=829751643419a7128b7ada50de590067&format=json',
    )
      .then(response => response.json())
      .then(json => {
        setDataArtist(json.topartists.artist);
      });
  };

  return connectStaus ? (
    <View style={styles.contenedor}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Buscar por pais"
            onChangeText={settxtCountry}
          />
          <Button title="Buscar" onPress={() => country()} />
        </View>
        <FlatList
          data={data}
          horizontal={true}
          keyExtractor={(id, index) => index.toString()}
          renderItem={({item}) => (
            <Card>
              <Text>{item.name}</Text>
              <AutoHeightImage
                width={100}
                source={{uri: item.image[4]['#text']}}
              />

              <Text>listeners: {item.listeners}</Text>
            </Card>
          )}
        />
      </View>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            placeholder="Buscar por Artista"
            onChangeText={settxtArtist}
          />
          <Button title="Buscar" onPress={() => artist()} />
        </View>
        <FlatList
          data={dataArtist}
          horizontal={true}
          keyExtractor={(id, index) => index.toString()}
          renderItem={({item}) => (
            <Card>
              <Text>{item.name}</Text>

              <AutoHeightImage
                width={100}
                source={{uri: item.image[4]['#text']}}
              />

              <Text>listeners: {item.listeners}</Text>
            </Card>
          )}
        />
      </View>
    </View>
  ) : (
    <NoOnline />
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeView;
