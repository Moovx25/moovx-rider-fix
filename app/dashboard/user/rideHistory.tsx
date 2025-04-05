import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const RideHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride History</Text>
      {/* Here, you can display ride history details */}
      <Text style={styles.text}>This will show a list of previous rides.</Text>
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

export default RideHistory;
