import React, { useRef, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Platform, Alert } from 'react-native';
import NativeMap from '@/components/NativeMap.native';
import { getRoute, type TomTomRouteResponse } from '@/services/tomtomService';
import { isValidCoordinate } from '@/utils/coordinates';
import MapView from 'react-native-maps';

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView | null>(null);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [routeInfo, setRouteInfo] = useState<TomTomRouteResponse | null>(null);

  const handleGetRoute = async () => {
    if (!isValidCoordinate(origin) || !isValidCoordinate(destination)) {
      Alert.alert('Invalid Coordinates', 'Enter coordinates in lat,lng format.');
      return;
    }

    try {
      const response = await getRoute(origin, destination);
      setRouteInfo(response);
    } catch (error) {
      console.error('Route fetch error:', error);
      Alert.alert('Error', 'Failed to fetch route');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Origin (lat,lng)"
        value={origin}
        onChangeText={setOrigin}
      />
      <TextInput
        style={styles.input}
        placeholder="Destination (lat,lng)"
        value={destination}
        onChangeText={setDestination}
      />
      <Button title="Get Route" onPress={handleGetRoute} />
      <NativeMap
        origin={origin}
        destination={destination}
        routeInfo={routeInfo}
        isValidCoordinate={isValidCoordinate}
        mapRef={mapRef}
      />
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'web' ? 40 : 0,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
});
