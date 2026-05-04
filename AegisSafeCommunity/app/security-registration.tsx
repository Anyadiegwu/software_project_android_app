// app/security-registration.tsx
// Expo Router screen — renders the SecurityRegistrationScreen component.
// Route: /security-registration

import SecurityRegistrationScreen from '../src/typography/screens/SecurityRegistrationScreen';
import { useRouter } from 'expo-router';

export default function SecurityRegistration() {
  const router = useRouter();

  const navigation = {
    navigate: (name: string) => {
      if (name === 'Home') router.push('/');
      else if (name === 'Dashboard') router.push('/dashboard');
    },
    goBack: () => router.back(),
  };

  return <SecurityRegistrationScreen navigation={navigation} />;
}
