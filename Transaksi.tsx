import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type TransaksiScreenProps = {
  route: {
    params: {
      transactionType: string;
    };
  };
  navigation: any;
};

const TransaksiScreen = ({ route, navigation }: TransaksiScreenProps) => {
  const { transactionType } = route.params || {};
  const [inputValue, setInputValue] = useState('');
  const [validationMessage, setValidationMessage] = useState('');
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

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

  // Validasi nomor telepon
  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^(0811|0812|0813|0821|0822|0823|0851|0852|0853|0814|0815|0816|0855|0856|0857|0858|0817|0818|0819|0859|0877|0878|0895|0896|0897|0898|0899|0831|0832|0833|0838|0881|0882|0883|0884|0885|0886|0887|0888|0889|0828|0868|08315)\d{6,9}$/;
    if (regex.test(phoneNumber)) {
      setValidationMessage('Nomor telepon valid.');
      setIsPhoneNumberValid(true);
    } else {
      setValidationMessage('Nomor telepon tidak valid. Harap pastikan nomor Anda sesuai dengan format yang ditentukan.');
      setIsPhoneNumberValid(false);
    }
  };

  // Validasi nomor BPJS
  const validateBPJS = (bpjsNumber) => {
    const regex = /^0\d{12}$/;
    if (regex.test(bpjsNumber)) {
      setValidationMessage('Nomor BPJS valid.');
      setIsPhoneNumberValid(true);
    } else {
      setValidationMessage('Nomor BPJS harus berjumlah 13 digit dan dimulai dengan "0".');
      setIsPhoneNumberValid(false);
    }
  };

  // Validasi nomor PLN
  const validatePLN = (plnNumber) => {
    const regex = /^[1-9]\d{0,11}$/;
    if (regex.test(plnNumber)) {
      setValidationMessage('Nomor pelanggan PLN valid.');
      setIsPhoneNumberValid(true);
    } else {
      setValidationMessage('Nomor pelanggan PLN harus berjumlah maksimal 12 digit dan tidak boleh dimulai dengan "0".');
      setIsPhoneNumberValid(false);
    }
  };

  // Fungsi untuk memilih nominal
  const handleNominalSelect = (nominal) => {
    if (selectedNominal === nominal) {
      setSelectedNominal(null); // Jika nominal yang sama ditekan lagi, hapus pilihan
    } else {
      setSelectedNominal(nominal); // Set nominal yang dipilih
    }
  };

  // Fungsi untuk melanjutkan transaksi dan navigasi ke KonfirmasiScreen
  const handleContinueTransaction = () => {
    if (selectedNominal && isPhoneNumberValid) {
      // Navigasi ke KonfirmasiScreen dengan parameter yang diperlukan
      navigation.navigate('Konfirmasi', {
        transactionType,
        inputValue,
        selectedNominal,
      });
    } else {
      Alert.alert('Peringatan', 'Silakan masukkan nomor yang valid dan pilih nominal sebelum melanjutkan.');
    }
  };

  // Tombol nominal untuk Pulsa dan PLN
  const pulsaPLNNominals = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];

  // Tombol nominal untuk BPJS
  const bpjsNominals = Array.from({ length: 20 }, (_, i) => (i + 1) * 50000).slice(0, 20); // 50.000 hingga 1.000.000

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{transactionType}</Text>
      <TextInput
        style={styles.input}
        placeholder={`Masukkan ${transactionType}`}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange}
        maxLength={transactionType === 'BPJS' ? 13 : 12}
      />
      {validationMessage ? <Text style={styles.validationMessage}>{validationMessage}</Text> : null}

      {/* Tampilkan tombol nominal berdasarkan tipe transaksi */}
      <View style={styles.nominalContainer}>
        {(transactionType === 'Pulsa' || transactionType === 'Token Listrik') &&
          pulsaPLNNominals.map((nominal) => (
            <TouchableOpacity
              key={nominal}
              style={[
                styles.nominalButton,
                selectedNominal === nominal ? styles.selectedButton : null, // Tambahkan style jika terpilih
                !isPhoneNumberValid && styles.disabledButton,
              ]}
              onPress={() => isPhoneNumberValid && handleNominalSelect(nominal)}
              disabled={!isPhoneNumberValid}
            >
              <Text style={styles.nominalButtonText}>Rp{nominal}</Text>
            </TouchableOpacity>
          ))
        }
        {transactionType === 'BPJS' &&
          bpjsNominals.map((nominal) => (
            <TouchableOpacity
              key={nominal}
              style={[
                styles.nominalButton,
                selectedNominal === nominal ? styles.selectedButton : null, // Tambahkan style jika terpilih
                !isPhoneNumberValid && styles.disabledButton,
              ]}
              onPress={() => isPhoneNumberValid && handleNominalSelect(nominal)}
              disabled={!isPhoneNumberValid}
            >
              <Text style={styles.nominalButtonText}>Rp{nominal}</Text>
            </TouchableOpacity>
          ))
        }
      </View>

      {/* Tombol Lanjutkan Transaksi */}
      {selectedNominal !== null && (
        <TouchableOpacity style={styles.continueButton} onPress={handleContinueTransaction}>
          <Text style={styles.continueButtonText}>Lanjutkan Transaksi</Text>
        </TouchableOpacity>
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
  nominalContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
  },
  nominalButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    margin: 5,
  },
  selectedButton: {
    backgroundColor: 'green', // Warna tombol saat terpilih
  },
  disabledButton: {
    backgroundColor: 'gray', // Ubah warna tombol jika tidak aktif
  },
  nominalButtonText: {
    color: 'white',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    padding: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TransaksiScreen;
