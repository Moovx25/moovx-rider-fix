import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';

const SplashScreen = () => {
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      router.push('/auth/login');
    }, 15000);  // Display splash screen for 15 seconds
  }, [fadeAnim, router]);

  return (
    <View style={styles.container}>
      {/* Background Image */}
      <Image source={require('../../assets/images/bg1.png')} style={styles.backgroundImage} />
      
      {/* Animated Logo */}
      <Animated.Image
        source={require('../../assets/images/moovxlogo.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      
      {/* Title Text */}
      <Text style={styles.title}>Moovx-Rider</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#0000FF',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
