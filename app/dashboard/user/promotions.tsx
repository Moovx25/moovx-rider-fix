import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Promotions = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Promotions</Text>
      {/* Display current promotions, discount codes, etc. */}
      <Text style={styles.text}>This will show available promotions and discount codes for users.</Text>
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

export default Promotions;
