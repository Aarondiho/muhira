import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';
import bg from '../../../assets/bg.png'

const Home = () => {
  return (
    <ImageBackground source={bg} style={styles.image}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Home!</Text>
    </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({

    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
      },
});
