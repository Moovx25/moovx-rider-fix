import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current; // useRef for better animation handling

  useEffect(() => {
    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Navigate to Login screen after delay
    const timeout = setTimeout(() => {
      router.replace('/auth/Login'); // Use `replace` to prevent going back to splash
    }, 3000); // You can reduce from 10s to 3s for better UX

    return () => clearTimeout(timeout);
  }, [fadeAnim]);

  return (
    <LinearGradient
      colors={['#007AFF', '#004080']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.Image
        source={require('../../assets/images/moovxlogo.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Moovx-Rider
      </Animated.Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default SplashScreen;
