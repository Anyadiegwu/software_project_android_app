import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { loadUserProfile } from '../src/utils/userStorage';

const SuccessIcon = () => (
  <Svg width="80" height="80" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="rgba(45,212,191,0.15)" stroke="#2DD4BF" strokeWidth="1.5" />
    <Path d="M8 12.5L10.5 15L16 9" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function VerificationSuccessScreen() {
  const router = useRouter();

  const handleContinue = async () => {
    // Navigate based on user role
    const profile = await loadUserProfile();
    if (profile?.role === 'Security Personnel') {
      router.replace('/dashboard');
    } else {
      router.replace('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        
        {/* Success Icon */}
        <View style={styles.iconContainer}>
          <SuccessIcon />
        </View>

        {/* Text */}
        <Text style={styles.title}>Account Verified!</Text>
        <Text style={styles.subtitle}>
          Your email has been successfully verified. You are now officially part of the Aegis community watch network.
        </Text>

        {/* Spacer */}
        <View style={{ flex: 1 }} />

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={handleContinue}
          activeOpacity={0.85}
        >
          <Text style={styles.primaryBtnText}>CONTINUE TO DASHBOARD</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D1117' },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
    alignItems: 'center',
  },

  iconContainer: {
    marginBottom: 32,
    shadowColor: '#2DD4BF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },

  title: {
    fontFamily: 'serif',
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 16,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 12,
  },

  primaryBtn: {
    width: '100%',
    backgroundColor: '#2DD4BF',
    borderRadius: 8,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#2DD4BF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  
  primaryBtnText: {
    color: '#0D1117',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
