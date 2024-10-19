import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';

import ProfilScreen from './Profile';
import TransaksiScreen from './Transaksi';
import BerandaScreen from './Beranda';
import HistoriScreen from './Histori';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        await SplashScreen.hideAsync();
      }
    };
    loadResourcesAndDataAsync();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Beranda"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Beranda') {
              iconName = 'home';
            } else if (route.name === 'History') {
              iconName = 'history';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Beranda" component={BerandaScreen} />
        <Tab.Screen name="History" component={HistoriScreen} />
        <Tab.Screen name="Profile" component={ProfilScreen} />
        <Tab.Screen 
          name="Transaksi" 
          component={TransaksiScreen} 
          options={{ tabBarButton: () => null }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
