import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { VictoryBar, VictoryChart, VictoryTheme } from 'victory-native';
import { useYearStats } from '../../store/utils/useYearStats';

export function StatsScreen() {
  const [yearStats] = useYearStats(new Date());
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());

  const selectNextMonth = () => {
    setMonthIndex((value) => (value < 11 ? value + 1 : value));
  };

  const selectPrevMonth = () => {
    setMonthIndex((value) => (value > 0 ? value - 1 : value));
  };

  const chartData = yearStats?.[monthIndex]
    ? Object.keys(yearStats[monthIndex]).map((day) => ({
        date: day,
        bottles: yearStats[monthIndex][+day].bottles
      }))
    : [];

  const monthDate = new Date();
  monthDate.setMonth(monthIndex);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Pressable onPress={selectPrevMonth}>
          <Text style={styles.text}>{'< '}</Text>
        </Pressable>
        <Text style={styles.text}>{monthDate.toLocaleDateString('en', { month: 'long' })}</Text>
        <Pressable onPress={selectNextMonth}>
          <Text style={styles.text}>{' >'}</Text>
        </Pressable>
      </View>
      <VictoryChart width={400} theme={VictoryTheme.material}>
        {!!yearStats && yearStats[monthIndex] && (
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
    backgroundColor: '#f5fcff'
  },
  row: {
    flexDirection: 'row'
  },
  text: {
    fontSize: 20
  }
});
