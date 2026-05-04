// app/_layout.tsx
// Expo Router root layout — defines the Stack Navigator for the whole app.
// Expo Router uses this file as the navigation shell (NOT App.js).

import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../src/theme/index';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.ebony} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.ebony },
          animation: 'fade',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="dashboard" />
        <Stack.Screen
          name="security-registration"
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen name="reporter-login" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="reporter-signup" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="security-login" options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="notifications" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="privacy-settings" options={{ animation: 'slide_from_right' }} />
        <Stack.Screen name="report-incident" options={{ animation: 'slide_from_bottom' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
