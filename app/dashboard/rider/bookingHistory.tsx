import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BookingHistory = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Booking History</Text>
      <Text style={styles.text}>List of your bookings will be displayed here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default BookingHistory;
