import React, { useEffect, useState } from 'react';
     import { View, Text, StyleSheet, Platform } from 'react-native';
     import MapView, { Marker, Polyline } from 'react-native-maps';
     import * as TomTom from '@tomtom-international/web-sdk-maps';
     import { getRoute } from '@/services/tomtomService';

     interface Coordinate {
       latitude: number;
       longitude: number;
     }

     interface RouteInfo {
       coordinates: Coordinate[];
       distance: number;
       duration: number;
     }

     const MapScreen: React.FC = () => {
       const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);

       useEffect(() => {
         const fetchRoute = async () => {
           try {
             const route = await getRoute(
               { latitude: 37.7749, longitude: -122.4194 },
               { latitude: 37.7849, longitude: -122.4294 }
             );
             setRouteInfo(route);
           } catch (error) {
             console.error('Error fetching route:', error);
           }
         };
         fetchRoute();
       }, []);

       const renderNativeMap = () => (
         <MapView
           style={styles.map}
           initialRegion={{
             latitude: 37.7749,
             longitude: -122.4194,
             latitudeDelta: 0.1,
             longitudeDelta: 0.1,
           }}
         >
           {routeInfo?.coordinates?.map((coord, index) => (
             <Marker key={index} coordinate={coord} />
           ))}
           {routeInfo?.coordinates && (
             <Polyline coordinates={routeInfo.coordinates} strokeColor="#000" strokeWidth={3} />
           )}
         </MapView>
       );

       const renderWebMap = () => {
         const mapRef = React.useRef<HTMLDivElement>(null);

         useEffect(() => {
           if (mapRef.current && process.env.EXPO_PUBLIC_TOMTOM_API_KEY) {
             const map = TomTom.map({
               key: process.env.EXPO_PUBLIC_TOMTOM_API_KEY,
               container: mapRef.current,
               center: [-122.4194, 37.7749],
               zoom: 12,
             });

             if (routeInfo?.coordinates) {
               const coords = routeInfo.coordinates.map(c => [c.longitude, c.latitude]);
               map.addLayer({
                 id: 'route',
                 type: 'line',
                 source: {
                   type: 'geojson',
                   data: {
                     type: 'Feature',
                     properties: {},
                     geometry: { type: 'LineString', coordinates: coords }
                   }
                 },
                 paint: { 'line-color': '#000', 'line-width': 3 },
               });
             }

             return () => map.remove();
           }
         }, [routeInfo]);

         return <div ref={mapRef} style={styles.map} />;
       };

       return (
         <View style={styles.container}>
           {Platform.OS === 'web' ? renderWebMap() : renderNativeMap()}
           {routeInfo && (
             <View style={styles.info}>
               <Text>Distance: {routeInfo.distance} km</Text>
               <Text>Duration: {routeInfo.duration} min</Text>
             </View>
           )}
         </View>
       );
     };

     const styles = StyleSheet.create({
       container: { flex: 1 },
       map: { flex: 1 },
       info: { padding: 10, backgroundColor: '#fff' },
     });

     export default MapScreen;