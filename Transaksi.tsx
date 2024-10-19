// Transaksi.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TransaksiScreen = ({ route }) => {
  const { transactionType } = route.params || {};

  return (
    <View style={styles.container}>
      <Text>Transaksi: {transactionType}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransaksiScreen;