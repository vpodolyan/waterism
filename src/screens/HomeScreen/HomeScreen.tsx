import React, { useEffect, useState } from 'react';
import {
  AppState,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme
} from 'react-native';
import { useMMKVNumber } from 'react-native-mmkv';
import {
  BOTTLE_VOLUME,
  CURRENT_FILTER_BOTTLES,
  CURRENT_FILTER_LIMIT,
  SETTINGS,
  TOTAL_BOTTLES,
  TOTAL_FILTERS_USED
} from '../../store/keys';
import { useGetStatsByDate } from '../../store/utils/useGetStatsByDate';

const get = (value: number | undefined) => value || 0;

export function HomeScreen() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff'
  };

  const [totalBottlesDrunk, setTotalBottlesDrunk] = useMMKVNumber(TOTAL_BOTTLES);
  const [totalFiltersUsed, setTotalFiltersUsed] = useMMKVNumber(TOTAL_FILTERS_USED);

  const [currentFilterBottles, setCurrentFilterBottles] = useMMKVNumber(CURRENT_FILTER_BOTTLES);

  const [bottleVolume, setBottleVolume] = useMMKVNumber(`${SETTINGS}.${BOTTLE_VOLUME}`);
  const [currentFilterLimit, setCurrentFilterLimit] = useMMKVNumber(`${SETTINGS}.${CURRENT_FILTER_LIMIT}`);

  const [date, setDate] = useState(new Date());
  const [todayStats, setStats] = useGetStatsByDate(date);

  useEffect(() => {
    if (!bottleVolume) {
      setBottleVolume(500); // initialize as 500 milliliters
    }
    if (!currentFilterLimit) {
      setCurrentFilterLimit(300); // initialize with 300 bottles
    }
  }, [bottleVolume, currentFilterLimit, setBottleVolume, setCurrentFilterLimit]);

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
        <View style={styles.statsView}>
          <Text style={styles.countText}>
            Bottles with current filter: ({currentFilterBottles}/
            <Text
              style={
                get(currentFilterBottles) >= get(currentFilterLimit) ? styles.limitExceededText : undefined
              }
            >
              {currentFilterLimit}
            </Text>
            )
          </Text>
          <Text style={styles.countText}>Total bottles: {totalBottlesDrunk}</Text>
          <Text style={styles.countText}>Filters used: {totalFiltersUsed}</Text>
          <Text style={styles.countText}>Bottles today: {todayStats?.bottles || 0}</Text>
          <Text style={styles.countText}>
            Litres today: {(todayStats?.bottles || 0) * ((bottleVolume || 0) / 1000)}
          </Text>
        </View>
        <View style={styles.addButtonView}>
          <Button
            title="Replace filter"
            onPress={() => {
              setCurrentFilterBottles(0);
              setTotalFiltersUsed((value) => (value || 0) + 1);
            }}
          />
          <Button
            title="Add bottle"
            onPress={() => {
              setTotalBottlesDrunk((current) => (current || 0) + 1);
              setCurrentFilterBottles((current) => (current || 0) + 1);
              setStats({
                bottles: todayStats?.bottles ? todayStats.bottles + 1 : 1
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
    flex: 1
  },
  countText: {
    fontSize: 22
  },
  limitExceededText: {
    color: 'red'
  },
  contentContainer: {
    flexGrow: 1,
    padding: 12
  },
  statsView: {
    flex: 1,
    justifyContent: 'center'
  },
  addButtonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8
  }
});
