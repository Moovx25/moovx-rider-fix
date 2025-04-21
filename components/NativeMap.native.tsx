import React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { parseCoordinate } from '@/utils/coordinates';
import type { TomTomRouteResponse } from '@/services/tomtomService';

interface NativeMapProps {
  origin: string;
  destination: string;
  routeInfo: TomTomRouteResponse | null;
  isValidCoordinate: (coord: string) => boolean;
  mapRef: React.MutableRefObject<MapView | null>;
}

const NativeMap: React.FC<NativeMapProps> = ({ origin, destination, routeInfo, isValidCoordinate, mapRef }) => {
  const originCoord = isValidCoordinate(origin) ? parseCoordinate(origin) : null;
  const destinationCoord = isValidCoordinate(destination) ? parseCoordinate(destination) : null;

  const initialRegion = {
    latitude: originCoord?.latitude || 52.3765,
    longitude: originCoord?.longitude || 4.9007,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <MapView
      style={styles.map}
      initialRegion={initialRegion}
      ref={mapRef}
    >
      {originCoord && (
        <Marker coordinate={originCoord} title="Pickup" />
      )}
      {destinationCoord && (
        <Marker coordinate={destinationCoord} title="Destination" />
      )}
      {routeInfo?.routes?.[0]?.legs?.[0]?.points?.length > 0 && (
        <Polyline
          coordinates={routeInfo.routes[0].legs[0].points.map((p) => ({
            latitude: p.latitude,
            longitude: p.longitude,
          }))}
          strokeColor="#28a745"
          strokeWidth={4}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
});

export default NativeMap;
