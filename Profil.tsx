// Profile.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfilScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Profil Page</Text>
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

export default ProfilScreen;
