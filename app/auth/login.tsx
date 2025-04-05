import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isRider, setIsRider] = useState(false); // Switch state for User or Rider

  const handleLogin = () => {
    if (isRider) {
      router.push('/dashboard/rider'); // Navigate to Rider Dashboard
    } else {
      router.push('/dashboard/user'); // Navigate to User Dashboard
    }
  };

  return (
    <LinearGradient colors={['#0000FF', '#FF0000']} style={styles.container}>
      <Image source={require('../../assets/images/moovxlogo.png')} style={styles.logo} />
      
      {/* Title */}
      <Text style={styles.title}>Moovx-Rider</Text>

      {/* Switch between User & Rider */}
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>User</Text>
        <Switch value={isRider} onValueChange={setIsRider} thumbColor="#fff" trackColor={{ true: "#ff4500", false: "#bbb" }} />
        <Text style={styles.switchLabel}>Rider</Text>
      </View>

      {/* Login Fields */}
      <TextInput placeholder="Email" style={styles.input} placeholderTextColor="#fff" />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          placeholderTextColor="#fff"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity onPress={() => router.push('/auth/forgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* Sign Up Link */}
      <TouchableOpacity onPress={() => router.push('/auth/signup')}>
        <Text style={styles.signupText}>Don't have an account? <Text style={styles.signupLink}>Sign up</Text></Text>
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
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  switchLabel: {
    color: '#fff',
    fontSize: 16,
    marginHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 15,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    color: '#fff',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    color: '#fff',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  signupText: {
    color: '#fff',
  },
  signupLink: {
    fontWeight: 'bold',
  },
});

export default LoginScreen;
