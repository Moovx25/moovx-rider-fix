import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const EditProfileScreen = () => {
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('John Doe');
  const [email, setEmail] = useState<string>('johndoe@example.com');
  const [phone, setPhone] = useState<string>('123-456-7890');
  const [address, setAddress] = useState<string>('123 Main St, City, Country');

  // Function to pick an image
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.assets && result.assets.length > 0) {
        setImage(result.assets[0].uri);  // Set the selected image URI
      }
    } else {
      alert('Permission to access gallery is required!');
    }
  };

  const handleSave = () => {
    // Handle save logic, for example, update the user's data in Firebase
    console.log('Profile saved with: ', { name, email, phone, address });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit Profile</Text>

      {/* Profile Image */}
      <TouchableOpacity onPress={pickImage}>
        <Image
          source={image ? { uri: image } : require('../../../assets/user-placeholder.png')}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      {/* Editable Profile Fields */}
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <TextInput
        style={styles.textInput}
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.textInput}
        value={phone}
        onChangeText={setPhone}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.textInput}
        value={address}
        onChangeText={setAddress}
        placeholder="Enter your home address"
      />

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Circular image
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#0066CC',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
