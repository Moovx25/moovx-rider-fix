// app/(dashboard)/rider/index.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const RiderDashboard = () => {
  const router = useRouter();

  const features = [
    {
      icon: 'time',
      text: 'Ride Requests',
      route: '/dashboard/rider/rideRequests',
    },
    {
      icon: 'card',
      text: 'Earnings History',
      route: '/dashboard/rider/earningsHistory',
    },
    {
      icon: 'book',
      text: 'Booking History',
      route: '/dashboard/rider/bookingHistory',
    },
    {
      icon: 'notifications',
      text: 'Notifications',
      route: '/dashboard/rider/notifications',
    },
    {
      icon: 'chatbox',
      text: 'Chat',
      route: '/dashboard/rider/chat',
    },
  ] as const;

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image
        source={require('../../../assets/images/bg1.png')}
        style={styles.backgroundImage}
      />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, Rider!</Text>
        <TouchableOpacity
          onPress={() => router.push('/dashboard/rider/settings')}
        >
          <Ionicons name="settings" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Active Ride Info Card */}
      <View style={styles.rideCard}>
        <Text style={styles.cardTitle}>Active Ride</Text>
        <Text style={styles.cardDetail}>Passenger: John Doe</Text>
        <Text style={styles.cardDetail}>Pickup: Lekki Phase 1</Text>
        <Text style={styles.cardDetail}>Drop-off: Ikeja</Text>
        <Text style={styles.cardDetail}>Time: 4:30 PM</Text>

        <TouchableOpacity
          style={styles.activeRideButton}
          onPress={() => router.push('/dashboard/rider/activeRide')}
        >
          <Text style={styles.activeRideText}>View Ride Details</Text>
        </TouchableOpacity>
      </View>

      {/* Feature Grid */}
      <View style={styles.featureGrid}>
        {features.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => router.push(item.route)}
            style={styles.boxWrapper}
          >
            <LinearGradient
              colors={['#001F4D', '#7B0000']}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              style={styles.box}
            >
              <Ionicons name={item.icon as any} size={24} color="white" />
              <Text style={styles.actionText}>{item.text}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const boxSize = Dimensions.get('window').width / 3 - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    paddingTop: 60,
    width: '100%',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: Platform.OS === 'web' ? 0.3 : 0.2,
    zIndex: -1,
  },
  header: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  rideCard: {
    width: '90%',
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  cardDetail: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  activeRideButton: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  activeRideText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  boxWrapper: {
    margin: 8,
  },
  box: {
    width: boxSize,
    height: boxSize,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default RiderDashboard;
