import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Define the type for the Payment item
interface Payment {
  id: string;
  date: string;
  amount: string;
  status: 'Completed' | 'Failed';
}

// Sample data (this can be replaced with actual data fetched from Firebase or your backend)
const samplePayments: Payment[] = [
  { id: '1', date: '2025-04-01', amount: '₦500.00', status: 'Completed' },
  { id: '2', date: '2025-03-28', amount: '₦300.00', status: 'Completed' },
  { id: '3', date: '2025-03-15', amount: '₦150.00', status: 'Completed' },
  { id: '4', date: '2025-03-10', amount: '₦200.00', status: 'Failed' },
];

const PaymentHistory = () => {
  const router = useRouter();
  const [payments, setPayments] = useState<Payment[]>(samplePayments);

  useEffect(() => {
    // Fetch actual payment history from Firebase or your backend here
    // For now, we're using the samplePayments array.
  }, []);

  const renderPaymentItem = ({ item }: { item: Payment }) => (
    <View style={styles.paymentItem}>
      <Text style={styles.paymentDate}>{item.date}</Text>
      <View style={styles.paymentDetails}>
        <Text style={styles.paymentAmount}>{item.amount}</Text>
        <Text style={[styles.paymentStatus, item.status === 'Completed' ? styles.completed : styles.failed]}>
          {item.status}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/dashboard/user')}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment History</Text>
      </View>

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={renderPaymentItem}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 40 : 20,
    paddingHorizontal: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  paymentDate: {
    fontSize: 16,
    color: '#333',
  },
  paymentDetails: {
    alignItems: 'flex-end',
  },
  paymentAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  paymentStatus: {
    fontSize: 14,
    marginTop: 5,
  },
  completed: {
    color: 'green',
  },
  failed: {
    color: 'red',
  },
});

export default PaymentHistory;
