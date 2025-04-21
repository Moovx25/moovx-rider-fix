import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { parseCoordinate } from '@/utils/coordinates';
import { fetchRouteData, TomTomRouteResponse } from '@/services/tomtomService';

const BookingScreen = () => {
  const router = useRouter();
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [routeInfo, setRouteInfo] = useState<TomTomRouteResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isValidCoordinate = (coord: string) => /^-?\d+\.\d+,-?\d+\.\d+$/.test(coord);

  useEffect(() => {
    if (origin && !isValidCoordinate(origin)) {
      Alert.alert('Invalid Pickup', 'Please provide a valid pickup location (e.g., 52.3765,4.9007).');
    }
    if (destination && !isValidCoordinate(destination)) {
      Alert.alert('Invalid Destination', 'Please provide a valid destination (e.g., 52.3567,4.9123).');
    }
  }, [origin, destination]);

  const handleBooking = async () => {
    if (!origin || !destination) {
      Alert.alert('Error', 'Please enter both pickup and destination locations.');
      return;
    }

    if (!isValidCoordinate(origin) || !isValidCoordinate(destination)) {
      Alert.alert('Invalid Coordinates', 'Please enter valid coordinates for both locations.');
      return;
    }

    setIsLoading(true);
    try {
      const data = await fetchRouteData(origin, destination);
      setRouteInfo(data);
      router.push({
        pathname: '/screens/MapScreen',
        params: { start: origin, end: destination },
      });
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to fetch route data.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book a Ride</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter pickup location (e.g., 52.3765,4.9007)"
        value={origin}
        onChangeText={setOrigin}
        autoCapitalize="none"
        keyboardType="decimal-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter destination (e.g., 52.3567,4.9123)"
        value={destination}
        onChangeText={setDestination}
        autoCapitalize="none"
        keyboardType="decimal-pad"
      />
      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleBooking}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isLoading ? 'Booking...' : 'Book Ride'}</Text>
      </TouchableOpacity>
      {routeInfo && (
        <View style={styles.routeInfoContainer}>
          <Text style={styles.routeInfoText}>
            Distance: {(routeInfo.routes[0].summary.lengthInMeters / 1000).toFixed(2)} km
          </Text>
          <Text style={styles.routeInfoText}>
            Time: {Math.round(routeInfo.routes[0].summary.travelTimeInSeconds / 60)} min
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0a0a0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  routeInfoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  routeInfoText: {
    fontSize: 16,
    color: '#333',
  },
});

export default BookingScreen;