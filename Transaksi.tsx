import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TransaksiScreen = ({ route }) => {
  const { transactionType } = route.params || {};
  const [inputValue, setInputValue] = useState('');

  const validateInput = () => {
    if (transactionType === 'Pulsa') {
      validatePhoneNumber(inputValue);
    } else if (transactionType === 'BPJS') {
      validateBPJS(inputValue);
    } else if (transactionType === 'Token Listrik') {
      validatePLN(inputValue);
    }
  };

  // Validasi nomor telepon (nomor harus diawali dengan "08" dan panjang max 13 digit)
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^08\d{9,11}$/; // harus dimulai dengan "08" dan total digit antara 10 hingga 13
    if (regex.test(phoneNumber)) {
      Alert.alert('Valid', 'Nomor telepon valid.');
    } else {
      Alert.alert('Invalid', 'Nomor telepon harus dimulai dengan "08" dan panjang maksimal 13 digit.');
    }
  };

  // Validasi nomor BPJS (harus 13 digit dan dimulai dengan "0")
  const validateBPJS = (bpjsNumber) => {
    const regex = /^0\d{12}$/; // harus dimulai dengan "0" dan tepat 13 digit
    if (regex.test(bpjsNumber)) {
      Alert.alert('Valid', 'Nomor BPJS valid.');
    } else {
      Alert.alert('Invalid', 'Nomor BPJS harus berjumlah 13 digit dan dimulai dengan "0".');
    }
  };

  // Validasi nomor PLN (maksimal 12 digit dan tidak boleh dimulai dengan "0")
  const validatePLN = (plnNumber) => {
    const regex = /^[1-9]\d{0,11}$/; // tidak boleh dimulai dengan "0" dan maksimal 12 digit
    if (regex.test(plnNumber)) {
      Alert.alert('Valid', 'Nomor pelanggan PLN valid.');
    } else {
      Alert.alert('Invalid', 'Nomor pelanggan PLN harus berjumlah maksimal 12 digit dan tidak boleh dimulai dengan "0".');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transaksi: {transactionType}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Masukkan ${transactionType}`}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={setInputValue}
        maxLength={transactionType === 'BPJS' ? 13 : 12} // Limit input length accordingly
      />
      <TouchableOpacity style={styles.button} onPress={validateInput}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
  input: {
    height: 50,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TransaksiScreen;
