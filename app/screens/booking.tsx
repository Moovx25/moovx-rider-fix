import React from 'react';
     import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
     import { useRouter } from 'expo-router';

     const BookingScreen: React.FC = () => {
       const router = useRouter();

       return (
         <View style={styles.container}>
           <Text style={styles.title}>Book a Ride</Text>
           <TouchableOpacity
             style={styles.button}
             onPress={() => router.push('/screens/MapScreen')}
           >
             <Text style={styles.buttonText}>View Map</Text>
           </TouchableOpacity>
         </View>
       );
     };

     const styles = StyleSheet.create({
       container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
       title: { fontSize: 24, marginBottom: 20 },
       button: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
       buttonText: { color: '#fff', fontSize: 16 },
     });

     export default BookingScreen;