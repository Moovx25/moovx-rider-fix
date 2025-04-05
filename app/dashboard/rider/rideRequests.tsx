import { useRouter } from 'expo-router';

// Your existing code...

const features = [
  {
    icon: 'time',
    text: 'Ride Requests',
    route: '/dashboard/rider/rideRequests',  // Remove .tsx, ensure the route is correct
  },
  {
    icon: 'card',
    text: 'Earnings History',
    route: '/dashboard/rider/earningsHistory',  // Remove .tsx
  },
  {
    icon: 'book',
    text: 'Booking History',
    route: '/dashboard/rider/bookingHistory',  // Remove .tsx
  },
  {
    icon: 'person',
    text: 'User Profile',
    route: '/dashboard/rider/profile',  // Remove .tsx
  },
  {
    icon: 'notifications',
    text: 'Notifications',
    route: '/dashboard/rider/notifications',  // Remove .tsx
  },
  {
    icon: 'motobike',
    text: 'Active Ride',
    route: '/dashboard/rider/activeRide',  // Remove .tsx
  },
];

// Your existing code...
