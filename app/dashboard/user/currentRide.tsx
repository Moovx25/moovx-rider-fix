import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const CurrentRide = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Current Ride Status</Text>
      {/* Show current ride status, driver details, etc. */}
      <Text style={styles.text}>This will show details of the current ride, such as driver info, ETA, and ride status.</Text>
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

export default CurrentRide;
