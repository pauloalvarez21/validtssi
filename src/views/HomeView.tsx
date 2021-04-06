import React, {useState} from 'react';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  Alert
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

  const [load, setLoad] = useState(false);
  const [loadArtist, setLoadArtist] = useState(false);

  const [connectStaus, setConnecStatus] = useState(false);

  checkConnected().then(res => {
    setConnecStatus(res);
  });

  const country = () => {
    if(txtCountry) {
    fetch(
      'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' +
        txtCountry +
        '&api_key=829751643419a7128b7ada50de590067&format=json',
    )
      .then(response => response.json())
      .then(json => {
        setData(json.topartists.artist);
        setLoad(true);
      });
    } else {
      Alert.alert(
        'Problema',
        'Debes colocar un país para poder buscar',
        [
            { text: 'OK' },
        ],
        { cancelable: false }
    );
    }
  };

  const artist = () => {
    if(txtArtist) {
    fetch(
      'http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=' +
        txtArtist +
        '&api_key=829751643419a7128b7ada50de590067&format=json',
    )
      .then(response => response.json())
      .then(jsonAr => {
        setDataArtist(jsonAr.topartists.artist);
        setLoadArtist(true)
      });
    } else {
      Alert.alert(
        'Problema',
        'Debes colocar un país para poder buscar',
        [
            { text: 'OK' },
        ],
        { cancelable: false }
    );
    }
  };

  const webView = (item) => {
    navigation.navigate('HomeWeb', item)
    setData([])
    setDataArtist([])
  }

  return connectStaus ? (
    <View style={styles.contenedor}>
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
          <TextInput
            style={{borderWidth: 1, margin: 1}}
            placeholder="Buscar por pais"
            onChangeText={settxtCountry}
          />
          <Button title="Buscar" onPress={() => country()} />
        </View>
        {load ?  
        <FlatList
          data={data}
          horizontal={true}
          keyExtractor={(id, index) => index.toString()}
          renderItem={({item}) => (
            <Card>
              <TouchableOpacity
                onPress={() => webView(item)}>
                <Text>{item.name}</Text>
                <AutoHeightImage
                  width={100}
                  source={{uri: item.image[4]['#text']}}
                />

                <Text>listeners: {item.listeners}</Text>
              </TouchableOpacity>
            </Card>
          )}
        /> : <View>
        <ActivityIndicator size="large" color="#2941DB" />
      </View> }
      </View>
      <View style={{flex: 1}}>
        <View
          style={{flexDirection: 'row', justifyContent: 'center', margin: 10}}>
          <TextInput
            style={{borderWidth: 1, margin: 1}}
            placeholder="Buscar por Artista"
            onChangeText={settxtArtist}
          />
          <Button title="Buscar" onPress={() => artist()} />
        </View>
        {loadArtist ?
        <FlatList
          data={dataArtist}
          horizontal={true}
          keyExtractor={(id, index) => index.toString()}
          renderItem={({item}) => (
            <Card>
              <TouchableOpacity
                onPress={() => webView(item)}>
                <Text>{item.name}</Text>

                <AutoHeightImage
                  width={100}
                  source={{uri: item.image[4]['#text']}}
                />

                <Text>listeners: {item.listeners}</Text>
              </TouchableOpacity>
            </Card>
          )}
        />: <View>
        <ActivityIndicator size="large" color="#2941DB" />
      </View>}
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
