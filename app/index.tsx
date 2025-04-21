import { View, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function IndexScreen() {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/auth/Login');
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
      <Image source={require('@assets/images/moovxlogo.png')} style={{ width: 200, height: 200 }} />
    </View>
  );
}