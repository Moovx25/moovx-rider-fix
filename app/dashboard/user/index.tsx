import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView,
    SafeAreaView,
    Platform,
} from 'react-native';
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
            icon: 'arrow-up-circle-outline',
            text: 'Book a Ride',
            route: '/dashboard/user/booking' as Route,
            color: '#FF7F50', // Coral
        },
        {
            icon: 'time-outline',
            text: 'Ride History',
            route: '/dashboard/user/rideHistory' as Route,
            color: '#28a745', // Green
        },
        {
            icon: 'bicycle-outline',
            text: 'Current Ride',
            route: '/dashboard/user/currentRide' as Route,
            color: '#28a745',
        },
        {
            icon: 'star-outline',
            text: 'Rate Rider',
            route: '/dashboard/user/ratings' as Route,
            color: '#28a745',
        },
        {
            icon: 'pricetag-outline',
            text: 'Promotions',
            route: '/dashboard/user/promotions' as Route,
            color: '#28a745',
        },
        {
            icon: 'card-outline',
            text: 'Payment History',
            route: '/dashboard/user/paymentHistory' as Route,
            color: '#28a745',
        },
        {
            icon: 'chatbubble-ellipses-outline',
            text: 'Chat',
            route: '/dashboard/user/chat' as Route,
            color: '#28a745',
        },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {/* Gradient Header */}
                <LinearGradient
                    colors={['#FF416C', '#FF4B2B']}
                    style={styles.backgroundGradient}
                >
                    <View style={styles.header}>
                        <Text style={styles.welcome}>Welcome, User!</Text>
                        <TouchableOpacity onPress={() => router.push('/dashboard/user/settings')}>
                            <Ionicons name="settings-outline" size={30} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileContainer}>
                        <Image source={{ uri: rider.profileImage }} style={styles.profileImage} />
                        <View style={styles.profileDetails}>
                            <Text style={styles.profileName}>{rider.name}</Text>
                            <Text style={styles.profileSubText}>{rider.motorbike} - {rider.plate}</Text>
                        </View>
                    </View>

                    {activeRide && (
                        <View style={styles.activeRideCard}>
                            <Text style={styles.activeRideTitle}>Active Ride</Text>
                            <View style={styles.activeRideInfo}>
                                <View style={styles.activeRideInfoItem}>
                                    <Text style={styles.activeRideLabel}>Status:</Text>
                                    <Text style={styles.activeRideValue}>{activeRide.status}</Text>
                                </View>
                                <View style={styles.activeRideInfoItem}>
                                    <Text style={styles.activeRideLabel}>Destination:</Text>
                                    <Text style={styles.activeRideValue}>{activeRide.destination}</Text>
                                </View>
                                <View style={styles.activeRideInfoItem}>
                                    <Text style={styles.activeRideLabel}>ETA:</Text>
                                    <Text style={styles.activeRideValue}>{activeRide.eta}</Text>
                                </View>
                            </View>
                        </View>
                    )}

                    <View style={styles.walletCard}>
                        <Ionicons name="wallet-outline" size={28} color="white" />
                        <Text style={styles.walletBalanceText}>Wallet Balance</Text>
                        <Text style={styles.walletAmount}>₦0.00</Text>
                    </View>
                </LinearGradient>

                {/* Features Grid */}
                <View style={styles.featuresContainer}>
                    {features.map((item, index) => (
                        <TouchableOpacity key={index} style={styles.featureButton} onPress={() => router.push(item.route)}>
                            <View style={[styles.featureIconContainer, item.color && { backgroundColor: item.color }]}>
                                <Ionicons name={item.icon as any} size={28} color="white" />
                            </View>
                            <Text style={styles.featureText}>{item.text}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const boxSize = Math.min((width - 60) / 3, 120); // responsive max size

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    scrollContainer: {
        flexGrow: 1,
    },
    backgroundGradient: {
        padding: 20,
        paddingBottom: 40,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    welcome: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    profileDetails: {
        flexDirection: 'column',
    },
    profileName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    profileSubText: {
        fontSize: 16,
        color: '#fff',
    },
    activeRideCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 30,
    },
    activeRideTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    activeRideInfo: {
        flexDirection: 'column',
    },
    activeRideInfoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    activeRideLabel: {
        color: '#eee',
    },
    activeRideValue: {
        color: '#fff',
        fontWeight: 'bold',
    },
    walletCard: {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    walletBalanceText: {
        color: '#eee',
        marginTop: 5,
        fontSize: 16,
    },
    walletAmount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 5,
    },
    featuresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 15,
        marginTop: 20,
    },
    featureButton: {
        width: boxSize,
        alignItems: 'center',
        marginBottom: 20,
    },
    featureIconContainer: {
        backgroundColor: '#ddd',
        borderRadius: 15,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        fontSize: 13,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
});

export default UserDashboard;
