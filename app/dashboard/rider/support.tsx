import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const Support = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      {/* Provide support and contact information */}
      <Text style={styles.text}>This screen will help users with support requests, FAQs, and contact options.</Text>
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

export default Support;
