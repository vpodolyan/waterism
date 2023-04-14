import React from 'react';
import { StyleSheet, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { useYearStats } from '../../store/utils/useYearStats';

export function StatsScreen() {
  const [yearStats] = useYearStats(new Date());
  console.log('yearStats[3]', yearStats?.[3]);
  const chartData = yearStats?.[3]
    ? Object.keys(yearStats[3]).map((day) => ({
        date: day,
        bottles: yearStats[3][+day].bottles,
      }))
    : [];

  return (
    <View style={styles.container}>
      <VictoryChart width={400} theme={VictoryTheme.material}>
        {!!yearStats && yearStats[3] && (
          <VictoryBar
            data={chartData}
            x="date"
            y="bottles"
            barWidth={5}
            barRatio={100}
            domain={{ x: [0, 31] }}
          />
        )}
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});
