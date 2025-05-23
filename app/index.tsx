import React from 'react';
     import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
     import { useRouter } from 'expo-router';

     export default function Home() {
       const router = useRouter();

       return (
         <View style={styles.container}>
           <Text style={styles.text}>Welcome to Moovx Rider!</Text>
           <TouchableOpacity
             style={styles.button}
             onPress={() => router.push('/screens/booking')}
           >
             <Text style={styles.buttonText}>Start Booking</Text>
           </TouchableOpacity>
         </View>
       );
     }

     const styles = StyleSheet.create({
       container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
       text: { fontSize: 24, marginBottom: 20 },
       button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
       buttonText: { color: '#fff', fontSize: 16 },
     });