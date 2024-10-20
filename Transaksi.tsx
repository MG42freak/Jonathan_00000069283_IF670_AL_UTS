import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type TransaksiScreenProps = {
  route: {
    params: {
      transactionType: string;
    };
  };
};

const TransaksiScreen = ({ route }: TransaksiScreenProps) => {
  const { transactionType } = route.params || {};
  const [inputValue, setInputValue] = useState<string>('');
  const [validationMessage, setValidationMessage] = useState<string>('');
  const [selectedNominal, setSelectedNominal] = useState<number | null>(null);
  const [isInputValueValid, setIsInputValueValid] = useState<boolean>(false);
  const [operatorName, setOperatorName] = useState<string | null>(null);
  const navigation = useNavigation<NavigationProp<any>>();

  type OperatorPrefixes = {
    [key: string]: string[];
  };

  const operatorPrefixes: OperatorPrefixes = {
    Telkomsel: ['0811', '0812', '0813', '0821', '0822', '0823', '0852', '0853', '0851'],
    Indosat: ['0814', '0815', '0816', '0855', '0856', '0857', '0858'],
    XL: ['0817', '0818', '0819', '0859', '0877', '0878'],
    Tri: ['0895', '0896', '0897', '0898', '0899'],
    Axis: ['0838', '0831', '0832', '0833'],
    Smart: ['0881', '0882', '0883', '0884', '0885', '0886', '0887', '0888', '0889'],
    Mobile8: ['0888', '0889'],
    Ceria_SampoernaTelkom: ['0828'],
    ByruSatelit: ['0868'],
    NT3G: ['0838'],
    LippoTelecom: ['08315'],
  };

  const handleInputChange = (text: string) => {
    setInputValue(text);
    validateInputValue(text);
  };

  const validateInputValue = (inputValue: string) => {
    if (transactionType === 'Token Listrik') {
      if (/^[1-9]\d{0,11}$/.test(inputValue)) {
        setValidationMessage('Nomor ID PLN valid.');
        setIsInputValueValid(true);
      } else {
        setValidationMessage('Nomor ID PLN tidak valid. Harap masukkan maksimal 12 digit, dimulai dengan angka 1-9.');
        setIsInputValueValid(false);
      }
    } else if (transactionType === 'BPJS') {
      if (/^0\d{12}$/.test(inputValue)) {
        setValidationMessage('Nomor BPJS valid.');
        setIsInputValueValid(true);
      } else {
        setValidationMessage('Nomor BPJS tidak valid. Harap masukkan 13 digit, dimulai dengan angka 0.');
        setIsInputValueValid(false);
      }
    } else if (transactionType === 'Pulsa') {
      validatePhoneNumber(inputValue);
    }
  };

  const validatePhoneNumber = (phoneNumber: string) => {
    const matchedOperator = findOperator(phoneNumber);
    if (matchedOperator) {
      setOperatorName(matchedOperator);
      setValidationMessage(`Nomor telepon valid untuk operator ${matchedOperator}.`);
      setIsInputValueValid(true);
    } else {
      setOperatorName(null);
      setValidationMessage('Nomor telepon tidak valid. Harap pastikan nomor Anda sesuai dengan format yang ditentukan.');
      setIsInputValueValid(false);
    }
  };

  const findOperator = (phoneNumber: string): string | null => {
    const prefix = phoneNumber.substring(0, 4);
    for (const operator in operatorPrefixes) {
      if (operatorPrefixes[operator].some(opPrefix => phoneNumber.startsWith(opPrefix))) {
        return operator === 'Ceria_SampoernaTelkom' ? 'Ceria/Sampoerna Telkom' : operator;
      }
    }
    return null;
  };

  const handleNominalSelect = (nominal: number) => {
    setSelectedNominal(prevNominal => (prevNominal === nominal ? null : nominal));
  };

  const handleContinueTransaction = () => {
    if (isInputValueValid && selectedNominal) {
      navigation.navigate('Konfirmasi', {
        transactionType,
        inputValue,
        selectedNominal,
        operatorName,
      });
    } else {
      Alert.alert('Peringatan', 'Silakan masukkan nomor yang valid dan pilih nominal sebelum melanjutkan.');
    }
  };

  const pulsaNominals = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];
  const plnNominals = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];
  const bpjsNominals = [50000, 100000, 150000, 200000, 250000, 300000, 350000, 400000, 450000, 500000];

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>{transactionType}</Text>
        <TextInput
          style={styles.input}
          placeholder={`Masukkan nomor ${transactionType === 'Pulsa' ? 'telepon' : transactionType === 'Token Listrik' ? 'ID PLN' : 'BPJS'}`}
          keyboardType="numeric"
          value={inputValue}
          onChangeText={handleInputChange}
          maxLength={transactionType === 'BPJS' ? 13 : transactionType === 'Token Listrik' ? 12 : 12}
        />
        {validationMessage ? (
          <Text
            style={[
              styles.validationMessage,
              isInputValueValid ? styles.validText : styles.invalidText,
            ]}
          >
            {validationMessage}
          </Text>
        ) : null}
      </View>

      {/* Render nominal selection based on transaction type */}
      {transactionType === 'Pulsa' && (
        <ScrollView contentContainerStyle={styles.nominalContainer}>
          {pulsaNominals.map(nominal => (
            <TouchableOpacity
              key={nominal}
              style={[
                styles.nominalButton,
                selectedNominal === nominal ? styles.selectedButton : null,
                !isInputValueValid && styles.disabledButton,
              ]}
              onPress={() => isInputValueValid && handleNominalSelect(nominal)}
              disabled={!isInputValueValid}
            >
              <View>
                <Text style={[
                  styles.nominalButtonText,
                  selectedNominal === nominal ? styles.selectedText : null,
                  !isInputValueValid ? styles.disabledText : null,
                ]}>Rp{nominal}</Text>
                <Text style={styles.totalText}>Total: Rp{nominal + 1500}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {transactionType === 'BPJS' && (
        <ScrollView contentContainerStyle={styles.nominalContainer}>
          {bpjsNominals.map(nominal => (
            <TouchableOpacity
              key={nominal}
              style={[
                styles.nominalButton,
                selectedNominal === nominal ? styles.selectedButton : null,
                !isInputValueValid && styles.disabledButton,
              ]}
              onPress={() => isInputValueValid && handleNominalSelect(nominal)}
              disabled={!isInputValueValid}
            >
              <View>
                <Text style={[
                  styles.nominalButtonText,
                  selectedNominal === nominal ? styles.selectedText : null,
                  !isInputValueValid ? styles.disabledText : null,
                ]}>Rp{nominal}</Text>
                <Text style={styles.totalText}>Total: Rp{nominal + 1500}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {transactionType === 'Token Listrik' && (
        <ScrollView contentContainerStyle={styles.nominalContainer}>
          {plnNominals.map(nominal => (
            <TouchableOpacity
              key={nominal}
              style={[
                styles.nominalButton,
                selectedNominal === nominal ? styles.selectedButton : null,
                !isInputValueValid && styles.disabledButton,
              ]}
              onPress={() => isInputValueValid && handleNominalSelect(nominal)}
              disabled={!isInputValueValid}
            >
              <View>
                <Text style={[
                  styles.nominalButtonText,
                  selectedNominal === nominal ? styles.selectedText : null,
                  !isInputValueValid ? styles.disabledText : null,
                ]}>Rp{nominal}</Text>
                <Text style={styles.totalText}>Total: Rp{nominal + 1500}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

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
    padding: 16,
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexShrink: 0,
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
    marginBottom: 20,
    fontSize: 14,
  },
  validText: {
    color: 'green',
  },
  invalidText: {
    color: 'red',
  },
  nominalContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nominalButton: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 5,
    padding: 15,
    marginVertical: 10,
    width: '100%',
  },
  selectedButton: {
    borderColor: 'green',
  },
  disabledButton: {
    borderColor: 'gray',
  },
  nominalButtonText: {
    fontSize: 16,
    textAlign: 'left',
    color: 'blue',
  },
  totalText: {
    fontSize: 14,
    textAlign: 'left',
    color: 'gray',
  },
  selectedText: {
    color: 'green',
  },
  disabledText: {
    color: 'gray',
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
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TransaksiScreen;