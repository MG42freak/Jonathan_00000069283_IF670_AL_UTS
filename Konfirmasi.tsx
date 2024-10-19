import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type KonfirmasiScreenProps = {
  route: {
    params: {
      transactionType: string;
      inputValue: string;
      selectedNominal: number;
    };
  };
};

const KonfirmasiScreen = ({ route }: KonfirmasiScreenProps) => {
  const { transactionType, inputValue, selectedNominal } = route.params;

  // Admin fee is Rp1.500
  const adminFee = 1500;
  
  // Calculate the total cost
  const totalCost = selectedNominal + adminFee;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Konfirmasi Transaksi</Text>
      <Text style={styles.text}>Tipe Transaksi: {transactionType}</Text>
      <Text style={styles.text}>Input: {inputValue}</Text>
      <Text style={styles.text}>Nominal: Rp{selectedNominal}</Text>
      <Text style={styles.text}>Biaya Admin: Rp{adminFee}</Text>
      <Text style={styles.text}>Total Biaya: Rp{totalCost}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 },
  text: { fontSize: 18, marginBottom: 10 },
});

export default KonfirmasiScreen;
