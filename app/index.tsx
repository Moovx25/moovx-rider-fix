// app/index.tsx (main entry point)

import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Image } from 'react-native';

export default function App() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/auth/login');  // Ensure this matches your actual login screen path
    }, 3000); // Show splash screen for 3 seconds
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }}>
      <Image source={require('../assets/images/moovxlogo.png')} style={{ width: 200, height: 200 }} />
    </View>
  );
}
