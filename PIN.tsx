import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const PINScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);

  const correctPIN = '762004';

  // Function to handle number input
  const handleNumberPress = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);

      // If PIN reaches 6 digits, auto-submit
      if (newPin.length === 6) {
        handleSubmit(newPin);
      }
    }
  };

  // Function to handle delete
  const handleDeletePress = () => {
    setPin(prevPin => prevPin.slice(0, -1));
  };

  // Function to handle submit
  const handleSubmit = (currentPin: string) => {
    if (currentPin === correctPIN) {
      navigation.navigate('Success' as never);
    } else {
      setAttempts(attempts + 1);
      Alert.alert('Error', 'Incorrect PIN. Please try again.');

      if (attempts + 1 >= 3) {
        Alert.alert('Locked Out', 'You have entered the incorrect PIN too many times.');
      }

      // Reset the PIN after submission
      setPin('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your 6-digit PIN</Text>
      
      {/* Display entered PIN as asterisks */}
      <View style={styles.pinContainer}>
        {Array(6).fill('').map((_, i) => (
          <Text key={i} style={styles.pin}>
            {i < pin.length ? '*' : ''}
          </Text>
        ))}
      </View>

      {/* Custom Numpad */}
      <View style={styles.numpad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.numpadButton}
            onPress={() => handleNumberPress(num)}
          >
            <Text style={styles.numpadButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>

      {attempts >= 3 && <Text style={styles.lockedMessage}>Too many attempts. Please try again later.</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pinContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  pin: {
    fontSize: 30,
    borderBottomWidth: 2,
    borderColor: 'gray',
    paddingHorizontal: 10,
    textAlign: 'center',
  },
  numpad: {
    width: '80%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  numpadButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderRadius: 10,
    marginBottom: 10,
  },
  numpadButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  lockedMessage: {
    color: 'red',
    marginTop: 20,
  },
});

export default PINScreen;