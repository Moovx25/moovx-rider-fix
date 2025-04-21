import React, { useState } from 'react';
import {
  View, Text, TextInput, Switch,
  TouchableOpacity, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore'; // Import Firestore functions
import { auth } from '../../services/firebase';
import * as SecureStore from 'expo-secure-store';

const SignupScreen = () => {
  const router = useRouter();
  const [isRider, setIsRider] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    driversLicense: '',
    vehicleLicense: '',
  });

  const handleChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const handleSignup = async () => {
    const { fullName, email, phone, password, confirmPassword, driversLicense, vehicleLicense } = form;

    if (!fullName || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Missing Info', 'Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return;
    }

    const net = await NetInfo.fetch();
    if (!net.isConnected) {
      Alert.alert('No Internet', 'Please connect to the internet to continue');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);

      // Create user profile in Firestore
      const db = getFirestore();
      const userRef = doc(db, 'users', userCredential.user.uid);

      const userProfile = {
        fullName,
        email,
        phone,
        isRider,
        driversLicense: isRider ? driversLicense : '',
        vehicleLicense: isRider ? vehicleLicense : '',
        role: isRider ? 'rider' : 'user', // Assuming 'role' is a field to distinguish users and riders
        createdAt: new Date().toISOString(),
      };

      // Save user data to Firestore
      await setDoc(userRef, userProfile);

      // Save form info locally until verified login
      await SecureStore.setItemAsync('pendingSignupInfo', JSON.stringify({
        uid: userCredential.user.uid,
        email,
        fullName,
        phone,
        isRider,
        driversLicense: isRider ? driversLicense : '',
        vehicleLicense: isRider ? vehicleLicense : '',
      }));

      setEmailSent(true);
      Alert.alert(
        'Email Sent',
        'A verification email has been sent. Please verify to continue.'
      );
    } catch (error: any) {
      console.log(error);
      Alert.alert('Signup Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndLogin = async () => {
    await auth.currentUser?.reload();
    if (auth.currentUser?.emailVerified) {
      Alert.alert('Email Verified', 'Redirecting to login');
      router.push('/auth/Login');
    } else {
      Alert.alert('Not Verified', 'Please verify your email first');
    }
  };

  return (
    <LinearGradient colors={["#0000FF", "#FF0000"]} style={styles.container}>
      <Text style={styles.title}>Create An Account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        placeholderTextColor="#fff"
        onChangeText={(text) => handleChange('fullName', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        placeholderTextColor="#fff"
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        keyboardType="phone-pad"
        placeholderTextColor="#fff"
        onChangeText={(text) => handleChange('phone', text)}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#fff"
          onChangeText={(text) => handleChange('password', text)}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? "eye" : "eye-off"} size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm Password"
          secureTextEntry={!confirmPasswordVisible}
          placeholderTextColor="#fff"
          onChangeText={(text) => handleChange('confirmPassword', text)}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
          <Ionicons name={confirmPasswordVisible ? "eye" : "eye-off"} size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Are you a rider?</Text>
        <Switch value={isRider} onValueChange={setIsRider} thumbColor="#fff" trackColor={{ true: "#ff4500", false: "#bbb" }} />
      </View>

      {isRider && (
        <>
          <TextInput
            style={styles.input}
            placeholder="Driver's License"
            placeholderTextColor="#fff"
            onChangeText={(text) => handleChange('driversLicense', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Vehicle License"
            placeholderTextColor="#fff"
            onChangeText={(text) => handleChange('vehicleLicense', text)}
          />
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={emailSent ? handleVerifyAndLogin : handleSignup} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#000" />
        ) : (
          <Text style={styles.buttonText}>{emailSent ? 'Verify Email' : 'Sign Up'}</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/auth/Login')} style={styles.loginLink}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginHere}>Login Here</Text>
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20,
  },
  title: {
    fontSize: 28, fontWeight: 'bold', color: '#fff', marginBottom: 20,
  },
  input: {
    width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12, borderRadius: 10, marginVertical: 8, color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row', alignItems: 'center',
    width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12, borderRadius: 10, marginVertical: 8,
  },
  passwordInput: {
    flex: 1, color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row', alignItems: 'center', marginVertical: 10,
  },
  label: {
    color: '#fff', fontSize: 16, marginRight: 10,
  },
  button: {
    backgroundColor: '#fff', paddingVertical: 12,
    paddingHorizontal: 30, borderRadius: 10, marginTop: 20,
  },
  buttonText: {
    fontSize: 18, fontWeight: 'bold', color: '#000',
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
  },
  loginHere: {
    fontWeight: 'bold', color: 'black',
  },
});

export default SignupScreen;
