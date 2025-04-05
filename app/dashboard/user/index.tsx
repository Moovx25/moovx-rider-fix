// app/(dashboard)/user/index.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Route =
  | '/dashboard/user/rideHistory'
  | '/dashboard/user/currentRide'
  | '/dashboard/user/ratings'
  | '/dashboard/user/promotions'
  | '/dashboard/user/paymentHistory'
  | '/dashboard/user/booking'
  | '/dashboard/user/chat';

const UserDashboard = () => {
  const router = useRouter();

  const rider = {
    name: 'John Doe',
    profileImage: 'https://via.placeholder.com/150',
    motorbike: 'Yamaha R1',
    plate: 'XYZ-1234',
  };

  const activeRide = {
    status: 'On the Way',
    destination: 'Central Park',
    eta: '10 minutes',
  };

  const features = [
    {
      icon: 'navigate',
      text: 'Book a Ride',
      route: '/dashboard/user/booking' as Route,
      color: '#FF0000',
    },
    {
      icon: 'time',
      text: 'Ride History',
      route: '/dashboard/user/rideHistory' as Route,
    },
    {
      icon: 'motorbike',
      text: 'Current Ride',
      route: '/dashboard/user/currentRide' as Route,
    },
    {
      icon: 'star',
      text: 'Rate Rider',
      route: '/dashboard/user/ratings' as Route,
    },
    {
      icon: 'pricetag',
      text: 'Promotions',
      route: '/dashboard/user/promotions' as Route,
    },
    {
      icon: 'card',
      text: 'Payment History',
      route: '/dashboard/user/paymentHistory' as Route,
    },
    {
      icon: 'chatbubble-ellipses',
      text: 'Chat',
      route: '/dashboard/user/chat' as Route,
    },
  ];

  return (
    <View style={styles.container}>
      <Image source={require('../../../assets/images/bg1.png')} style={styles.backgroundImage} />

      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome, User!</Text>
        <TouchableOpacity onPress={() => router.push('/dashboard/user/settings')}>
          <Ionicons name="settings" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.riderContainer}>
        <Image source={{ uri: rider.profileImage }} style={styles.riderImage} />
        <View style={styles.riderDetails}>
          <Text style={styles.riderName}>{rider.name}</Text>
          <Text style={styles.riderMotorbike}>{rider.motorbike} - {rider.plate}</Text>
        </View>
      </View>

      {activeRide && (
        <View style={styles.activeRideContainer}>
          <Text style={styles.activeRideTitle}>Active Ride</Text>
          <Text style={styles.activeRideStatus}>Status: {activeRide.status}</Text>
          <Text style={styles.activeRideDestination}>Destination: {activeRide.destination}</Text>
          <Text style={styles.activeRideEta}>ETA: {activeRide.eta}</Text>
        </View>
      )}

      <View style={styles.walletContainer}>
        <Ionicons name="wallet" size={24} color="white" />
        <Text style={styles.walletText}>Wallet Balance</Text>
        <Text style={styles.walletAmount}>₦0.00</Text>
      </View>

      <View style={styles.featureGrid}>
        {features.map((item, index) => (
          <TouchableOpacity key={index} style={styles.box} onPress={() => router.push(item.route)}>
            {item.color ? (
              <View style={[styles.featureBox, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon as any} size={28} color="white" />
                <Text style={styles.actionText}>{item.text}</Text>
              </View>
            ) : (
              <LinearGradient colors={['#0000FF', '#FF0000']} style={styles.featureBox}>
                <Ionicons name={item.icon as any} size={28} color="white" />
                <Text style={styles.actionText}>{item.text}</Text>
              </LinearGradient>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const boxSize = width / 3 - 25;

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
  riderContainer: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  riderImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  riderDetails: {
    flexDirection: 'column',
  },
  riderName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  riderMotorbike: {
    fontSize: 14,
    color: '#fff',
  },
  activeRideContainer: {
    width: '90%',
    padding: 15,
    backgroundColor: '#FF5733',
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
  },
  activeRideTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  activeRideStatus: {
    fontSize: 16,
    color: '#fff',
  },
  activeRideDestination: {
    fontSize: 16,
    color: '#fff',
  },
  activeRideEta: {
    fontSize: 16,
    color: '#fff',
  },
  walletContainer: {
    width: '90%',
    padding: 15,
    backgroundColor: '#0000FF',
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  walletText: {
    color: '#fff',
    marginTop: 5,
  },
  walletAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 60,
  },
  box: {
    width: boxSize,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureBox: {
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'web' ? 0.1 : 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
});

export default UserDashboard;
