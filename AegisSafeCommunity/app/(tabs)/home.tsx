import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import MainHomeScreen from '../../src/typography/screens/MainHomeScreen';
import { loadUserProfile } from '../../src/utils/userStorage';

export default function HomeTab() {
  const router = useRouter();
  const [userName, setUserName] = useState('Community Member');

  // Load saved user name on mount
  useEffect(() => {
    loadUserProfile().then((profile) => {
      if (profile?.displayName) {
        // Capitalise first letter nicely
        const name = profile.displayName.charAt(0).toUpperCase() + profile.displayName.slice(1);
        setUserName(name);
      }
    });
  }, []);

  const navigation = {
    navigate: (name: string) => {
      if (name === 'Notifications')    router.push('/notifications');
      else if (name === 'ReportIncident') router.push('/(tabs)/reports?newReport=true');
      else if (name === 'Reports')     router.push('/(tabs)/reports');
      else if (name === 'Map')         router.push('/(tabs)/map');
      else if (name === 'Profile')     router.push('/(tabs)/profile');
      else if (name === 'Welcome')     router.replace('/');
      else if (name === 'Sos')         router.push('/(tabs)/sos');
      else if (name === 'Home')        router.push('/(tabs)/home');
      else if (name === 'PrivacySettings') router.push('/privacy-settings');
      else if (name === 'TownHalls')    router.push('/town-halls');
      else if (name === 'CommunityWatch') router.push('/community-watch');
      else if (name === 'HelpSupport')  router.push('/help-support');
    },
    goBack: () => router.back(),
  };

  return <MainHomeScreen navigation={navigation} userName={userName} />;
}