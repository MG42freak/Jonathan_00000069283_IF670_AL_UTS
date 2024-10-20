import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Transaction } from './TransactionContext';

interface TransactionDetailProps {
  // Remove transactionIndex and onBack from props
  route: {
    params: {
      selectedTransaction: Transaction; // Receive selectedTransaction from route params
    };
  };
  navigation: any; // Use appropriate type for navigation prop
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({ route, navigation }) => {
  const { selectedTransaction } = route.params; // Get the selected transaction from route params

  if (!selectedTransaction) return null;

  const { type, inputValue, amount, operatorName } = selectedTransaction;

  const handleBack = () => {
    navigation.goBack(); // Navigate back to HistoryScreen
  };

  return (
    <View style={styles.detailContainer}>
      <Text style={styles.title}>Transaction Details</Text>
      <Text style={styles.text}>Tipe Transaksi: {type}</Text>
      <Text style={styles.text}>Nomor: {inputValue}</Text>
      <Text style={styles.text}>Nominal: Rp{amount}</Text>
      {type === 'Pulsa' && operatorName && (
        <Text style={styles.text}>Operator: {operatorName}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
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
  backButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default TransactionDetail;