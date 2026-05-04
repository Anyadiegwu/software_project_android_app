import ReportIncidentScreen from '../src/typography/screens/ReportIncidentScreen';
import { useRouter } from 'expo-router';

export default function ReportIncident() {
  const router = useRouter();

  const navigation = {
    navigate: (name: string) => {
      if (name === 'Home') router.push('/');
      else if (name === 'Dashboard') router.push('/(tabs)/home');
    },
    goBack: () => router.back(),
  };

  return <ReportIncidentScreen navigation={navigation} />;
}
