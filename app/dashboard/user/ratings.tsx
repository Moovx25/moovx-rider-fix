import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Ratings = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate a Driver</Text>
      {/* Show the option to rate the driver */}
      <Text style={styles.text}>This screen allows users to rate their driver after the ride.</Text>
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

export default Ratings;
