import React, { useEffect, useState } from 'react';
import {
  AppState,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useMMKVNumber } from 'react-native-mmkv';
import { BOTTLE_VOLUME, SETTINGS, TOTAL_BOTTLES } from './src/store/keys';
import { useGetStatsByDate } from './src/store/utils/useGetStatsByDate';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const [totalBottlesDrunk, setTotalBottlesDrunk] =
    useMMKVNumber(TOTAL_BOTTLES);

  const [bottleVolume, setBottleVolume] = useMMKVNumber(
    `${SETTINGS}.${BOTTLE_VOLUME}`
  );

  const [date, setDate] = useState(new Date());
  const [todayStats, setStats] = useGetStatsByDate(date);

  useEffect(() => {
    if (!bottleVolume) {
      setBottleVolume(500); // initialize as 500 milliliters
    }
  }, [bottleVolume, setBottleVolume]);

  useEffect(() => {
    AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        setDate(new Date());
      }
    });
  });

  return (
    <SafeAreaView style={[styles.safeArea, backgroundStyle]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.titleView}>
          <Text style={styles.bottlesCount}>
            Total bottles: {totalBottlesDrunk}
          </Text>
          <Text style={styles.bottlesCount}>
            Bottles today: {todayStats?.bottles || 0}
          </Text>
          <Text style={styles.bottlesCount}>
            Litres today:{' '}
            {(todayStats?.bottles || 0) * ((bottleVolume || 0) / 1000)}
          </Text>
        </View>
        <View style={styles.addButtonView}>
          <Button
            title="Add bottle"
            onPress={() => {
              setTotalBottlesDrunk((current) => (current || 0) + 1);
              setStats({
                bottles: todayStats?.bottles ? todayStats.bottles + 1 : 1,
              });
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  bottlesCount: {
    fontSize: 24,
    textAlign: 'center',
  },
  contentContainer: {
    flexGrow: 1,
    padding: 12,
  },
  titleView: {
    flex: 1,
    justifyContent: 'center',
  },
  addButtonView: {
    alignItems: 'flex-end',
  },
});

export default App;
