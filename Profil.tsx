import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const ProfilScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('./assets/JONATAHA.jpg')} 
        style={styles.profileImage} 
      />
      <Text style={styles.nameText}>Jonathan Farrel Marcio Santoso</Text>
      <Text style={styles.nameText}>00000069283</Text>
      <Text style={styles.nameText}>7 Juni 2004</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfilScreen;
