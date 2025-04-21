import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import 'react-native-reanimated';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import Tabs from '@app/navigation/Tabs';

if (Platform.OS !== 'web') {
  SplashScreen.preventAutoHideAsync();
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('@assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded && Platform.OS !== 'web') {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  const theme = colorScheme === 'dark' ? DarkTheme : DefaultTheme;

  return (
    <ThemeProvider value={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="auth/Login" />
        <Stack.Screen name="auth/Signup" />
        <Stack.Screen name="auth/ForgotPassword" />
        <Stack.Screen name="dashboard/[role]" component={Tabs} />
        {/* User sub-routes */}
        <Stack.Screen name="dashboard/user/rideHistory" />
        <Stack.Screen name="dashboard/user/currentRide" />
        <Stack.Screen name="dashboard/user/ratings" />
        <Stack.Screen name="dashboard/user/promotions" />
        <Stack.Screen name="dashboard/user/paymentHistory" />
        <Stack.Screen name="dashboard/user/booking" />
        <Stack.Screen name="dashboard/user/chat" />
        <Stack.Screen name="dashboard/user/settings" />
        {/* Rider sub-routes */}
        <Stack.Screen name="dashboard/rider/rideRequests" />
        <Stack.Screen name="dashboard/rider/earningsHistory" />
        <Stack.Screen name="dashboard/rider/bookingHistory" />
        <Stack.Screen name="dashboard/rider/notifications" />
        <Stack.Screen name="dashboard/rider/chat" />
        <Stack.Screen name="dashboard/rider/settings" />
        <Stack.Screen name="dashboard/rider/activeRide" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}