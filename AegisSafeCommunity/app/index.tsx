// app/index.tsx
// Entry screen — checks "Keep me signed in" and skips the welcome page if a session exists.

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import WelcomeScreen from '../src/typography/screens/WelcomeScreen';

const KEEP_SIGNED_IN_KEY = '@aegis_keep_signed_in';
const SESSION_KEY        = '@aegis_session';

export default function Index() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  // On mount: check if user ticked "Keep me signed in" last time
  useEffect(() => {
    (async () => {
      try {
        const keepSignedIn = await AsyncStorage.getItem(KEEP_SIGNED_IN_KEY);
        const sessionString = await AsyncStorage.getItem(SESSION_KEY);

        if (keepSignedIn === 'true' && sessionString) {
          const session = JSON.parse(sessionString);
          if (session.role === 'Security Personnel') {
            router.replace('/dashboard');
          } else {
            router.replace('/(tabs)/home');
          }
        } else {
          setHasSession(false);
        }
      } catch (_) {
        setHasSession(false);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  // Show a brief splash while we check storage
  if (checking) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#0D1117' }}>
        <ActivityIndicator size="large" color="#45D0B1" />
      </View>
    );
  }

  // No saved session → show the welcome / role-select screen
  const navigation = {
    navigate: (name: string) => {
      if (name === 'Dashboard')             router.push('/(tabs)/home');
      else if (name === 'SecurityRegistration') router.push('/security-registration');
      else if (name === 'ReporterLogin')    router.push('/reporter-login');
      else if (name === 'ReporterSignUp')   router.push('/reporter-signup');
      else if (name === 'SecurityLogin')    router.push('/security-login');
    },
    goBack: () => router.back(),
  };

  return <WelcomeScreen navigation={navigation} />;
}
