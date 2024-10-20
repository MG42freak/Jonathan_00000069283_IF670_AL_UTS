import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useTransactionContext, Transaction } from './TransactionContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface HistoryScreenProps {
  navigation: StackNavigationProp<any>;
  route: RouteProp<any>;
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ navigation }) => {
  const { transactions } = useTransactionContext();

  const renderHistory = () => {
    if (transactions.length === 0) {
      return (
        <Text style={styles.noDataText}>Tidak ada data transaksi.</Text>
      );
    }

    return (
      <FlatList
        data={transactions.slice().reverse()}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.transactionItem,
              item.status === 'success' ? styles.successOutline : styles.failOutline,
            ]}
            onPress={() => navigation.navigate('TransactionDetail', { selectedTransaction: item })}
          >
            <Text style={styles.text}>
              {item.inputValue} - {item.type}: Rp{item.amount}
            </Text>
            <Text style={[styles.status, item.status === 'success' ? styles.success : styles.fail]}>
              {item.status.toUpperCase()}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    );
  };

  return (
    <View style={styles.container}>
      {renderHistory()}
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
  noDataText: {
    fontSize: 18,
    color: 'gray',
    marginTop: 20,
  },
  transactionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    borderRadius: 5,
    marginBottom: 10,
  },
  successOutline: {
    borderWidth: 2,
    borderColor: 'green',
  },
  failOutline: {
    borderWidth: 2,
    borderColor: 'red',
  },
  status: {
    fontWeight: 'bold',
  },
  success: {
    color: 'green',
  },
  fail: {
    color: 'red',
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
  listContainer: {
    paddingBottom: 16,
  },
});

export default HistoryScreen;