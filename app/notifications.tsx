import NotificationsScreen from '../src/typography/screens/NotificationsScreen';
import { useRouter } from 'expo-router';

export default function Notifications() {
  const router = useRouter();

  const navigation = {
    navigate: (name: string) => {
      if (name === 'Home') router.push('/');
      else if (name === 'Dashboard') router.push('/(tabs)/home');
    },
    goBack: () => router.back(),
  };

  return <NotificationsScreen navigation={navigation} />;
}
