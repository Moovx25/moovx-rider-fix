import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Preferences = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Preferences</Text>
      {/* Display options for users to set ride preferences */}
      <Text style={styles.text}>This screen will allow users to set preferences for their rides, such as bike type, driver gender, etc.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#555',
  },
});

export default Preferences;
