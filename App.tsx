import React from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { useMMKVNumber, useMMKVObject } from 'react-native-mmkv';
import { getStatsKey } from './src/store/utils/getStatsKey';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  const [totalBottlesDrunk, setTotalBottlesDrunk] =
    useMMKVNumber('totalBottlesDrunk');

  const [todayStats, setTodayStats] = useMMKVObject<{ bottles: number }>(
    getStatsKey(new Date())
  );

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
            Bottles today: {todayStats?.bottles}
          </Text>
        </View>
        <View style={styles.addButtonView}>
          <Button
            title="Add bottle"
            onPress={() => {
              setTotalBottlesDrunk((current) => (current || 0) + 1);
              setTodayStats(
                todayStats
                  ? { ...todayStats, bottles: todayStats.bottles + 1 }
                  : { bottles: 1 }
              );
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
