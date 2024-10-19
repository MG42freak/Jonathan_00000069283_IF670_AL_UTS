import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import ProfilScreen from './Profil';
import TransaksiScreen from './Transaksi';
import KonfirmasiScreen from './Konfirmasi';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();

// Home Screen (Beranda)
function BerandaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome, User!</Text>

      {/* Button container with flexDirection row to arrange buttons side by side */}
      <View style={styles.buttonContainer}>
        {/* Pulsa Button */}
        <View style={styles.iconButton}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('Transaksi', { transactionType: 'Pulsa' })}
          >
            <Ionicons name="call" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>Pulsa</Text>
        </View>

        {/* BPJS Button */}
        <View style={styles.iconButton}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('Transaksi', { transactionType: 'BPJS' })}
          >
            <Ionicons name="medkit" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>BPJS</Text>
        </View>

        {/* Token Listrik Button */}
        <View style={styles.iconButton}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('Transaksi', { transactionType: 'Token Listrik' })}
          >
            <Ionicons name="flash" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>Token Listrik</Text>
        </View>
      </View>
    </View>
  );
}

// History Screen (Histori)
function HistoriScreen() {
  return (
    <View style={styles.container}>
      <Text>Histori Page</Text>
    </View>
  );
}

export default function App() {
  useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        // Simulate loading time
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen after loading
        await SplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Beranda"
        screenOptions={({ route, navigation }) => ({
          headerLeft: route.name !== 'Beranda' ? () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name="arrow-back" size={24} color="black" style={{ marginLeft: 15 }} />
            </TouchableOpacity>
          ) : null,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Beranda') {
              iconName = 'home';
            } else if (route.name === 'History') {
              iconName = 'list-outline';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: route.name !== 'Beranda' ? { display: 'none' } : {},
          headerShown: true,
        })}
      >
        <Tab.Screen name="Beranda" component={BerandaScreen} />
        <Tab.Screen name="History" component={HistoriScreen} />
        <Tab.Screen name="Profile" component={ProfilScreen} />
        <Tab.Screen 
          name="Transaksi" 
          component={TransaksiScreen} 
          options={{ tabBarButton: () => null }}  // Hide from tab bar
        />
        <Tab.Screen 
          name="Konfirmasi" 
          component={KonfirmasiScreen} 
          options={{ tabBarButton: () => null }}  // Hide from tab bar
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '80%',
  },
  iconButton: {
    alignItems: 'center',
  },
  roundButton: {
    backgroundColor: 'blue',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    marginTop: 10,
    fontSize: 16,
    color: 'black',
  },
});
