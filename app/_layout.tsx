import { Stack } from 'expo-router';

     export default function Layout() {
       return (
         <Stack>
           <Stack.Screen name="index" options={{ title: 'Home' }} />
           <Stack.Screen name="screens/booking" options={{ title: 'Book a Ride' }} />
           <Stack.Screen name="screens/MapScreen" options={{ title: 'Map' }} />
         </Stack>
       );
     }