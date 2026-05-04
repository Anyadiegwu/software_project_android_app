// app/dashboard.tsx
// Expo Router screen — renders the DashboardScreen component.
// Route: /dashboard

import DashboardScreen from '../src/typography/screens/DashboardScreen';
import { useRouter } from 'expo-router';

export default function Dashboard() {
  const router = useRouter();

  const navigation = {
    navigate: (name: string) => {
      if (name === 'Home') router.push('/');
      else if (name === 'SecurityRegistration') router.push('/security-registration');
      else if (name === 'Dashboard') router.push('/(tabs)/home');
    },
    goBack: () => router.back(),
  };

  return <DashboardScreen navigation={navigation} />;
}
