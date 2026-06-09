// app/reporter-login.tsx
import ReporterLoginScreen from '../src/typography/screens/ReporterLoginScreen';
import { useRouter } from 'expo-router';

export default function ReporterLogin() {
  const router = useRouter();

  const navigation = {
    navigate: (name: string) => {
      if (name === 'Home') router.push('/');
      else if (name === 'Dashboard') router.push('/(tabs)/home');
      else if (name === 'ReporterSignUp') router.push('/reporter-signup');
    },
    goBack: () => router.back(),
  };

  return <ReporterLoginScreen navigation={navigation} />;
}
