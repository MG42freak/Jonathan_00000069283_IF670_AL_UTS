import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { TransactionProvider } from './TransactionContext';
import ProfilScreen from './Profil';
import TransaksiScreen from './Transaksi';
import KonfirmasiScreen from './Konfirmasi';
import HistoryScreen from './History';
import TransactionDetail from './TransactionDetail';

SplashScreen.preventAutoHideAsync();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BerandaScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Welcome, User!</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.iconButton}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('Transaksi', { transactionType: 'Pulsa' })}
          >
            <Ionicons name="call" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>Pulsa</Text>
        </View>

        <View style={styles.iconButton}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => navigation.navigate('Transaksi', { transactionType: 'BPJS' })}
          >
            <Ionicons name="medkit" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.buttonLabel}>BPJS</Text>
        </View>

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

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Beranda"
      screenOptions={({ route }) => ({
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
      })}
    >
      <Tab.Screen
        name="Beranda"
        component={BerandaScreen}
        options={{ headerTitle: 'Home' }} />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{ headerTitle: 'Transaction History' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilScreen}
        options={{ headerTitle: 'User Profile' }}
      />
    </Tab.Navigator>
  );
}

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
    <TransactionProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="Transaksi" component={TransaksiScreen} />
          <Stack.Screen name="Konfirmasi" component={KonfirmasiScreen} />
          <Stack.Screen 
            name="TransactionDetail" 
            component={TransactionDetail} 
            options={({ navigation }) => ({
              title: 'Transaction Detail',
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
              ),
              tabBarStyle: { display: 'none' }, // Hide bottom tab navigator
              headerShown: true, // Show the header
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TransactionProvider>
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