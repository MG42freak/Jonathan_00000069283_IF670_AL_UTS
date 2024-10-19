import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TransaksiScreen = ({ route }) => {
  const { transactionType } = route.params || {};
  const [inputValue, setInputValue] = useState('');
  const [validationMessage, setValidationMessage] = useState(''); // State to store validation message

  // Fungsi untuk menangani perubahan teks dan validasi
  const handleInputChange = (text) => {
    setInputValue(text);

    if (transactionType === 'Pulsa') {
      validatePhoneNumber(text);
    } else if (transactionType === 'BPJS') {
      validateBPJS(text);
    } else if (transactionType === 'Token Listrik') {
      validatePLN(text);
    }
  };

  // Validasi nomor telepon (nomor harus diawali dengan "08" dan panjang max 13 digit)
  // Validasi nomor telepon berdasarkan format yang ditentukan
const validatePhoneNumber = (phoneNumber) => {
  const regex = /^(0811|0812|0813|0821|0822|0823|0851|0852|0853|0814|0815|0816|0855|0856|0857|0858|0817|0818|0819|0859|0877|0878|0895|0896|0897|0898|0899|0831|0832|0833|0838|0881|0882|0883|0884|0885|0886|0887|0888|0889|0828|0868|08315)\d{6,9}$/;
  if (regex.test(phoneNumber)) {
    setValidationMessage('Nomor telepon valid.');
  } else {
    setValidationMessage('Nomor telepon tidak valid. Harap pastikan nomor Anda sesuai dengan format yang ditentukan.');
  }
};


  // Validasi nomor BPJS (harus 13 digit dan dimulai dengan "0")
  const validateBPJS = (bpjsNumber) => {
    const regex = /^0\d{12}$/; // harus dimulai dengan "0" dan tepat 13 digit
    if (regex.test(bpjsNumber)) {
      setValidationMessage('Nomor BPJS valid.');
    } else {
      setValidationMessage('Nomor BPJS harus berjumlah 13 digit dan dimulai dengan "0".');
    }
  };

  // Validasi nomor PLN (maksimal 12 digit dan tidak boleh dimulai dengan "0")
  const validatePLN = (plnNumber) => {
    const regex = /^[1-9]\d{0,11}$/; // tidak boleh dimulai dengan "0" dan maksimal 12 digit
    if (regex.test(plnNumber)) {
      setValidationMessage('Nomor pelanggan PLN valid.');
    } else {
      setValidationMessage('Nomor pelanggan PLN harus berjumlah maksimal 12 digit dan tidak boleh dimulai dengan "0".');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{transactionType}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Masukkan ${transactionType}`}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange}
        maxLength={transactionType === 'BPJS' ? 13 : 12} // Batasi panjang input sesuai tipe transaksi
      />
      {/* Tampilkan pesan validasi secara real-time */}
      {validationMessage ? <Text style={styles.validationMessage}>{validationMessage}</Text> : null}
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
    marginBottom: 10,
  },
  validationMessage: {
    color: 'red',
    marginBottom: 20,
    fontSize: 14,
  },
});

export default TransaksiScreen;
