import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Switch,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@services/firebase';

const LoginScreen = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isRider, setIsRider] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Fields', 'Please enter email and password');
      return;
    }

    const isConnected = Platform.OS === 'web' ? navigator.onLine : (await NetInfo.fetch()).isConnected;
    if (!isConnected) {
      Alert.alert('No Internet', 'Please connect to the internet to continue');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert('Email Not Verified', 'Please verify your email before logging in');
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, isRider ? 'riders' : 'users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          isRider,
          createdAt: new Date().toISOString(),
        });
        console.log(`Created ${isRider ? 'rider' : 'user'} profile in Firestore`);
      }

      router.push(isRider ? '/dashboard/rider' : '/dashboard/user');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordToggle = () => {
    setTimeout(() => setPasswordVisible(!passwordVisible), 0);
  };

  const handleForgotPassword = () => {
    setTimeout(() => router.push('/auth/ForgotPassword'), 0);
  };

  const handleSignup = () => {
    setTimeout(() => router.push('/auth/Signup'), 0);
  };

  return (
    <LinearGradient colors={['#0000FF', '#FF0000']} style={styles.container}>
      <Image source={require('@assets/images/moovxlogo.png')} style={styles.logo} />
      <Text style={styles.title}>Moovx-Rider</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>User</Text>
        <Switch
          value={isRider}
          onValueChange={setIsRider}
          thumbColor="#fff"
          trackColor={{ true: '#ff4500', false: '#bbb' }}
        />
        <Text style={styles.switchLabel}>Rider</Text>
      </View>
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#fff"
        keyboardType="email-address"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={styles.passwordInput}
          placeholderTextColor="#fff"
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity onPress={handlePasswordToggle}>
          <Ionicons name={passwordVisible ? 'eye' : 'eye-off'} size={24} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#000" /> : <Text style={styles.loginText}>Login</Text>}
      </TouchableOpacity>
      <TouchableOpacity onPress={handleSignup}>
        <Text style={styles.signupText}>
          Don't have an account? <Text style={styles.signupLink}>Sign up</Text>
        </Text>
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