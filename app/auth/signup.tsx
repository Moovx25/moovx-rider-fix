import React, { useState } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const SignupScreen = () => {
  const router = useRouter();
  const [isRider, setIsRider] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <LinearGradient colors={["#0000FF", "#FF0000"]} style={styles.container}>
{/* Suggested code may be subject to a license. Learn more: ~LicenseLog:2357180085. */}
      <Text style={styles.title}>Create An Account</Text>
      
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#fff" />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" placeholderTextColor="#fff" />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" placeholderTextColor="#fff" />
      
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor="#fff"
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
          <TextInput style={styles.input} placeholder="Driver's License" placeholderTextColor="#fff" />
          <TextInput style={styles.input} placeholder="Vehicle License" placeholderTextColor="#fff" />
        </>
      )}
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigate to Login screen */}
      <TouchableOpacity onPress={() => router.push('/auth/login')} style={styles.loginLink}>
        <Text style={styles.loginText}>Already have an account? <Text style={styles.loginHere}>Login Here</Text></Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    color: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
  },
  passwordInput: {
    flex: 1,
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  loginLink: {
    marginTop: 20,
  },
  loginText: {
    color: '#fff',
  },
  loginHere: {
    fontWeight: 'bold',
    color: 'black',  // Changed to black color
  },
});

export default SignupScreen;
