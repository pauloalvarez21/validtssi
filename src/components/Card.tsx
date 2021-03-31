import React from 'react';
import {View, ScrollView} from 'react-native';

const Card = props => {
  return (
    <View style={styles.containerStyle}>
      <ScrollView>{props.children}</ScrollView>
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 0,
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    borderColor: '#00B3E3',
    backgroundColor: '#FFFFFF',
    margin: 10,
    padding: 3,
  },
};

export default Card;
