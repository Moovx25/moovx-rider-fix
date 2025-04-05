import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const RiderSettingsScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={require('../../../assets/user-placeholder.png')}
        style={styles.profileImage}
      />

      {/* Rider Name */}
      <Text style={styles.userName}>John Doe</Text>

      {/* Settings List */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/rider/profile')}  // Navigate to Profile
      >
        <Text style={styles.optionText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/rider/editProfile')}  // Navigate to Edit Profile
      >
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/rider/changePassword')}  // Navigate to Change Password
      >
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      {/* Services Section */}
      <Text style={styles.sectionTitle}>Services</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/rider/support')}  // Navigate to Help & Support
      >
        <Text style={styles.optionText}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/rider/preferences')}  // Navigate to Preferences
      >
        <Text style={styles.optionText}>Preferences</Text>
      </TouchableOpacity>

      {/* Log Out Option */}
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  option: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});

export default RiderSettingsScreen;
