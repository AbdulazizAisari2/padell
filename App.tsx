import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Zap, Calendar, User } from 'lucide-react-native';
import { ClubsScreen } from './screens/ClubsScreen';
import { ClubDetailsScreen } from './screens/ClubDetailsScreen';
import { MatchmakingScreen } from './screens/MatchmakingScreen';
import { BookingsScreen } from './screens/BookingsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabNavigator() {
  const { isDarkMode, colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          elevation: 0,
          height: 80,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginBottom: 10,
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Play" 
        component={ClubsScreen} 
        options={{ tabBarIcon: ({ color }) => <Home size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="Matches" 
        component={MatchmakingScreen} 
        options={{ tabBarIcon: ({ color }) => <Zap size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="Games" 
        component={BookingsScreen} 
        options={{ tabBarIcon: ({ color }) => <Calendar size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarIcon: ({ color }) => <User size={24} color={color} /> }} 
      />
    </Tab.Navigator>
  );
}

function RootNavigator() {
    const { isDarkMode } = useTheme();
    return (
        <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={TabNavigator} />
                <Stack.Screen name="ClubDetails" component={ClubDetailsScreen} options={{ presentation: 'card' }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default function App() {
  return (
    <ThemeProvider>
        <RootNavigator />
    </ThemeProvider>
  );
}