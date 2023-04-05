import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import Slider from '@react-native-community/slider';
import TrackPlayer, {
  Capability,
  AppKilledPlaybackBehavior,
} from 'react-native-track-player';

import {Icons} from '../res';

const Player = props => {
  const [playing, setPlaying] = useState(props.initPlay);
  const [volume, setVolume] = useState(0.5);
  const [muted, setMuted] = useState(false);

  const setUpTrackPlayer = async track => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        stopWithApp: true,
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        // Media controls capabilities
        capabilities: [Capability.Play, Capability.Pause],

        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],
      });
      await TrackPlayer.add([track]);
      props.initPlay && TrackPlayer.play();
    } catch (err) {
      console.error(`Could not setup track player. ${err}`);
      TrackPlayer.remove();
    }
  };

  useEffect(() => {
    setUpTrackPlayer(props?.track);

    return () => {
      TrackPlayer.remove();
    };
  }, [props.track, props.initPlay]);

  return (
    <View style={styles.root}>
      <View flex={0.5} flexDirection={'row'}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            playing ? TrackPlayer.pause() : TrackPlayer.play();
            setPlaying(!playing);
          }}
          style={styles.playIconContainer}>
          <Icons.Ionicons
            name={playing ? 'pause' : 'play'}
            size={22}
            color={'#FFFFFF'}
          />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.status}>{playing ? 'ON AIR' : 'PAUSED'}</Text>
          <TextTicker
            style={styles.station}
            duration={props.track?.title?.length * 250}
            loop
            bounce
            repeatSpacer={50}
            marqueeDelay={4000}>
            {props.track?.title}
          </TextTicker>
        </View>
      </View>

      <View style={styles.volumeContainer}>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => {
            muted ? TrackPlayer.setVolume(volume) : TrackPlayer.setVolume(0);
            setMuted(!muted);
          }}
          style={styles.volumeIconContainer}>
          <Icons.Ionicons
            name={
              muted
                ? 'volume-mute-outline'
                : volume <= 0
                ? 'volume-off-outline'
                : volume <= 0.3
                ? 'volume-low-outline'
                : volume <= 0.6
                ? 'volume-medium-outline'
                : 'volume-high-outline'
            }
            size={30}
            color={'#FFFFFF'}
          />
        </TouchableOpacity>
        <Slider
          style={styles.volumeSlider}
          value={volume}
          minimumValue={0}
          maximumValue={1}
          minimumTrackTintColor={'#FFFFFF'}
          maximumTrackTintColor={'#F65C2A'}
          thumbTintColor={'#FFFFFF'}
          onValueChange={newVolume => {
            setVolume(newVolume);
            TrackPlayer.setVolume(newVolume);
          }}
        />
      </View>
    </View>
  );
};

Player.defaultProps = {
  initPlay: false,
  track: {
    id: 0,
    url: 'https://streaming.softnep.net:10993/auto-dj', // URL must be https to work on release build.
    title: 'Test Audio Stream',
    artist: 'Anonymous',
    genre: 'Music',
    artwork: 'https://react-native-track-player.js.org/img/logo.svg',
  },
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    padding: 12,
  },
  playIconContainer: {
    backgroundColor: '#CD1F3A',
    width: 40,
    height: 40,
    borderRadius: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    paddingHorizontal: 12,
  },
  volumeContainer: {
    flex: 0.5,
    flexDirection: 'row',
    paddingRight: 4,
    marginBottom: -12,
  },
  status: {
    fontSize: 12,
    color: '#C4C4C4',
    fontWeight: '600',
  },
  station: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '400',
  },
  volumeIconContainer: {
    marginLeft: 20,
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  volumeSlider: {width: '70%', height: 40},
});

export default Player;
