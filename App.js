import React from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Player from './src/components/Player';
import {Images} from './src/res';

const App = () => {
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#1B1B1B'} />
      <View style={styles.mainContainer}>
        <View />

        <View style={styles.titleContainer}>
          <Image
            source={Images.logo}
            style={styles.logo}
            resizeMode={'contain'}
          />

          <Text style={styles.title}>Transient Audio Stream</Text>
          <Text style={styles.subtitle}>
            An example app created to replicate a bug in
            react-native-track-player.
          </Text>
          <Text style={styles.subtitle}>
            On opening the app you should hear audio playing. Close the app
            multiple times and you will see a message like 'Transient Audio
            Stream keeps stopping'.
          </Text>
        </View>

        <Player initPlay />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 30,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '700',
  },
  subtitle: {
    color: '#F0F0F0',
    fontSize: 14,
    lineHeight: 22,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
  },
});

export default App;
