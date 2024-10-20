import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useTransactionContext } from './TransactionContext';

type Transaction = {
  id: string;
  type: string;
  amount: number;
  inputValue: string;
  operatorName?: string;
  status: 'success' | 'failed';
};

type KonfirmasiPINScreenProps = {
  route: {
    params: {
      transactionType: string;
      inputValue: string;
      selectedNominal: number;
      operatorName?: string;
    };
  };
};

const KonfirmasiPINScreen = ({ route }: KonfirmasiPINScreenProps) => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { transactionType, inputValue, selectedNominal, operatorName } = route.params;
  const { addTransaction } = useTransactionContext();

  const [showPIN, setShowPIN] = useState(false);
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const adminFee = 1500;
  const totalCost = selectedNominal + adminFee;
  const correctPIN = '762004';

  const handleConfirm = () => {
    setShowPIN(true);
  };

  const handleNumberPress = (num: string) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);

      if (newPin.length === 6) {
        handleSubmit(newPin);
      }
    }
  };

  const handleDeletePress = () => {
    setPin(prevPin => prevPin.slice(0, -1));
  };

  const handleSubmit = (currentPin: string) => {
    if (currentPin === correctPIN) {
      setIsSuccess(true);
      setIsPopupVisible(true);
      addTransaction({
        id: Math.random().toString(),
        type: transactionType,
        amount: selectedNominal,
        inputValue: inputValue,
        ...(transactionType === 'Pulsa' && { operatorName }),
        status: 'success'
      });
    } else {
      setAttempts(attempts + 1);
      Alert.alert('Error', 'Incorrect PIN. Please try again.');

      if (attempts + 1 >= 3) {
        setIsSuccess(false);
        setIsPopupVisible(true);
        addTransaction({
          id: Math.random().toString(),
          type: transactionType,
          amount: selectedNominal,
          inputValue: inputValue,
          ...(transactionType === 'Pulsa' && { operatorName }),
          status: 'failed'
        });
      }

      setPin('');
    }
  };

  const handleBackToHome = () => {
    setIsPopupVisible(false);
    navigation.navigate('Beranda');
  };

  return (
    <View style={styles.container}>
      {!showPIN ? (
        <>
          <Text style={styles.title}>Konfirmasi Transaksi</Text>
          <Text style={styles.text}>Tipe Transaksi: {transactionType}</Text>
          <Text style={styles.text}>Input: {inputValue}</Text>
          {transactionType === 'Pulsa' && (
            <Text style={styles.text}>Operator: {operatorName}</Text>
          )}
          <Text style={styles.text}>Nominal: Rp{selectedNominal}</Text>
          <Text style={styles.text}>Biaya Admin: Rp{adminFee}</Text>
          <Text style={styles.text}>Total Biaya: Rp{totalCost}</Text>

          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmButtonText}>Konfirmasi</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.title}>Masukkan PIN</Text>
          <View style={styles.pinContainer}>
            {Array(6).fill('').map((_, i) => (
              <Text key={i} style={styles.pin}>
                {i < pin.length ? '*' : ''}
              </Text>
            ))}
          </View>

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

          <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </>
      )}

      {isPopupVisible && (
        <View
          style={[
            styles.popupContainer,
            { backgroundColor: isSuccess ? 'green' : 'red' },
          ]}
        >
          <Text style={styles.popupText}>
            {isSuccess ? 'Success' : 'Fail'}
          </Text>

          <TouchableOpacity style={styles.backButton} onPress={handleBackToHome}>
            <Text style={styles.backButtonText}>Back to Home</Text>
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
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
  popupContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popupText: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default KonfirmasiPINScreen;