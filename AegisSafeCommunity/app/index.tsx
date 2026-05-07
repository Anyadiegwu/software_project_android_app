import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import SplashScreen from '../src/typography/screens/SplashScreen';
import WelcomeScreen from '../src/typography/screens/WelcomeScreen';
import { AuthStorage } from '../src/utils/authStorage';

export default function Index() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);
  const [nextRoute, setNextRoute] = useState<string | null>(null);
  const [splashDone, setSplashDone] = useState(false);

  // On mount: check if user ticked "Keep me signed in" last time
  useEffect(() => {
    (async () => {
      try {
        const keepSignedIn = await AuthStorage.isKeepSignedIn();
        const user = await AuthStorage.getUser();
        const token = await AuthStorage.getToken();

        if (keepSignedIn && user && token) {
          // Check role (accepting both backend string and UI string for safety)
          if (user.role === 'Security Personnel' || user.role === 'security') {
            setNextRoute('/dashboard');
          } else {
            setNextRoute('/(tabs)/home');
          }
        } else {
          setNextRoute('WELCOME');
        }
      } catch (e) {
        console.error('Index: Session check failed', e);
        setNextRoute('WELCOME');
      }
    })();
  }, []);

  // Effect to handle transition once BOTH splash is finished AND route is ready
  useEffect(() => {
    if (splashDone && nextRoute) {
      if (nextRoute === 'WELCOME') {
        setShowSplash(false);
      } else {
        router.replace(nextRoute as any);
      }
    }
  }, [splashDone, nextRoute, router]);

  const handleSplashFinish = () => {
    setSplashDone(true);
  };

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
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
