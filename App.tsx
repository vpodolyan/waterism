import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { HomeScreen } from './src/screens/HomeScreen';
import { StatsScreen } from './src/screens/StatsScreen';

const Tab = createBottomTabNavigator();

const homeIcon = ({ color }: { color: string }) => <Icon name="opacity" size={24} color={color} />;
const statsIcon = ({ color }: { color: string }) => <Icon name="show-chart" size={24} color={color} />;

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: homeIcon }} />
        <Tab.Screen name="Stats" component={StatsScreen} options={{ tabBarIcon: statsIcon }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
