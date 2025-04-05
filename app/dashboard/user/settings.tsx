import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';  // Importing useRouter hook

const SettingsScreen = () => {
  const router = useRouter();  // Initialize router

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      <Image
        source={require('../../../assets/user-placeholder.png')}  // Correct path
        style={styles.profileImage}
      />

      {/* User Name */}
      <Text style={styles.userName}>John Doe</Text>

      {/* Settings List */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/user/profile')}  // Navigate to Profile screen
      >
        <Text style={styles.optionText}>Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/user/editProfile')}  // Navigate to EditProfile screen
      >
        <Text style={styles.optionText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/user/changePassword')}  // Navigate to ChangePassword screen
      >
        <Text style={styles.optionText}>Change Password</Text>
      </TouchableOpacity>

      {/* Services Section */}
      <Text style={styles.sectionTitle}>Services</Text>
      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/user/support')}  // Navigate to Help & Support
      >
        <Text style={styles.optionText}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.option}
        onPress={() => router.push('/dashboard/user/preferences')}  // Navigate to Preferences
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
    borderRadius: 50,  // Circular image
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

export default SettingsScreen;
