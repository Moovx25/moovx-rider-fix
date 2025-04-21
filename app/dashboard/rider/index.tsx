import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

type Route =
    | '/dashboard/rider/rideRequests'
    | '/dashboard/rider/earningsHistory'
    | '/dashboard/rider/bookingHistory'
    | '/dashboard/rider/notifications'
    | '/dashboard/rider/chat'
    | '/dashboard/rider/settings';

type Feature = {
    readonly icon: string;
    readonly text: string;
    readonly route: Route;
    readonly color?: string;
};

const boxSize = (width - 40) / 3;

const RiderDashboard = () => {
    const router = useRouter();

    const features: ReadonlyArray<Feature> = [
        { icon: 'time-outline', text: 'Ride Requests', route: '/dashboard/rider/rideRequests', color: '#FF7F50' },
        { icon: 'card-outline', text: 'Earnings History', route: '/dashboard/rider/earningsHistory', color: '#00C851' },
        { icon: 'book-outline', text: 'Booking History', route: '/dashboard/rider/bookingHistory', color: '#00C851' },
        { icon: 'notifications-outline', text: 'Notifications', route: '/dashboard/rider/notifications', color: '#00C851' },
        { icon: 'chatbubble-ellipses-outline', text: 'Chat', route: '/dashboard/rider/chat', color: '#00C851' },
        { icon: 'settings-outline', text: 'Settings', route: '/dashboard/rider/settings', color: '#00C851' },
    ] as const;

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <LinearGradient
                    colors={['#FF416C', '#FF4B2B']}
                    style={styles.backgroundGradient}
                >
                    <View style={styles.header}>
                        <Text style={styles.welcome}>Welcome, Rider!</Text>
                        <TouchableOpacity onPress={() => router.push('/dashboard/rider/settings')}>
                            <Ionicons name="settings-outline" size={30} color="white" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.profileContainer}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/70/808080/FFFFFF?Text=Rider' }}
                            style={styles.profileImage}
                        />
                        <View style={styles.profileDetails}>
                            <Text style={styles.profileName}>Rider Name</Text>
                            <Text style={styles.profileSubText}>Vehicle Info</Text>
                        </View>
                    </View>

                    <View style={styles.activeRideCard}>
                        <Text style={styles.activeRideTitle}>Active Ride</Text>
                        <View style={styles.activeRideInfo}>
                            <View style={styles.activeRideInfoItem}>
                                <Text style={styles.activeRideLabel}>Passenger:</Text>
                                <Text style={styles.activeRideValue}>John Doe</Text>
                            </View>
                            <View style={styles.activeRideInfoItem}>
                                <Text style={styles.activeRideLabel}>Pickup:</Text>
                                <Text style={styles.activeRideValue}>Lekki Phase 1</Text>
                            </View>
                            <View style={styles.activeRideInfoItem}>
                                <Text style={styles.activeRideLabel}>Drop-off:</Text>
                                <Text style={styles.activeRideValue}>Ikeja</Text>
                            </View>
                            <View style={styles.activeRideInfoItem}>
                                <Text style={styles.activeRideLabel}>ETA:</Text>
                                <Text style={styles.activeRideValue}>15 min</Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.viewDetailsButton}
                            onPress={() => router.push('/dashboard/rider/activeRide')}
                        >
                            <Text style={styles.viewDetailsText}>View Ride Details</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.walletCard}>
                        <Ionicons name="wallet-outline" size={28} color="white" />
                        <Text style={styles.walletBalanceText}>Current Earnings</Text>
                        <Text style={styles.walletAmount}>₦125.50</Text>
                    </View>
                </LinearGradient>

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
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        color: '#333',
    },
    viewDetailsButton: {
        marginTop: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    viewDetailsText: {
        color: '#FF4B2B',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default RiderDashboard;
