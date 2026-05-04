// app/security-login.tsx
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Rect } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserProfile } from '../src/utils/userStorage';

// ─── Icons ────────────────────────────────────────────────────────────────────
const BadgeIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="16" rx="2" stroke="#F59E0B" strokeWidth="1.6" />
    <Path d="M8 9h8M8 13h5" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
    <Rect x="8" y="2" width="8" height="4" rx="1" stroke="#F59E0B" strokeWidth="1.4" />
  </Svg>
);

const KeyIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7Z"
      stroke="#F59E0B" strokeWidth="1.6"
    />
    <Path d="M12 10V20M9 17h6M9 20h6" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" />
  </Svg>
);

const EyeIcon = ({ visible }: { visible: boolean }) => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    {visible ? (
      <>
        <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#6B7280" strokeWidth="1.6" />
        <Path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" stroke="#6B7280" strokeWidth="1.6" />
      </>
    ) : (
      <>
        <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
        <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
        <Path d="M1 1l22 22" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
      </>
    )}
  </Svg>
);

const ShieldIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L4 6.5V11C4 15.4183 7.58172 19.4301 12 21C16.4183 19.4301 20 15.4183 20 11V6.5L12 3Z"
      stroke="#F59E0B" strokeWidth="1.6" strokeLinejoin="round"
    />
    <Path d="M9 12l2 2 4-4" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function SecurityLoginScreen() {
  const router = useRouter();
  const [badge, setBadge] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [trustedDevice, setTrustedDevice] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    if (!badge.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please enter your badge number and password.');
      return;
    }
    setLoading(true);
    // Simulate auth — replace with real API call
    setTimeout(async () => {
      setLoading(false);
      
      const derivedName = badge.trim();
      await saveUserProfile({
        displayName: derivedName,
        email: badge.trim(),
        role: 'Security Personnel',
      });
      
      if (trustedDevice) {
        await AsyncStorage.setItem('@aegis_keep_signed_in', 'true');
        await AsyncStorage.setItem('@aegis_session', JSON.stringify({
          badge: badge.trim(),
          role: 'Security Personnel',
          loggedInAt: new Date().toISOString(),
        }));
      } else {
        await AsyncStorage.removeItem('@aegis_keep_signed_in');
        await AsyncStorage.removeItem('@aegis_session');
      }

      router.push('/email-verification');
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Top bar ── */}
        <View style={styles.topBar}>
          <Text style={styles.topBarRole}>SECURITY PERSONNEL</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.topBarBack}>← BACK TO ROLE SELECT</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Title ── */}
          <Text style={styles.title}>Officer Portal</Text>
          <Text style={styles.subtitle}>Official access for verified law enforcement.</Text>

          {/* ── Encrypted notice ── */}
          <View style={styles.encryptedBanner}>
            <View style={styles.encryptedIcon}><ShieldIcon /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.encryptedTitle}>Encrypted official login</Text>
              <Text style={styles.encryptedDesc}>
                This session is logged in your department's audit trail.
              </Text>
            </View>
          </View>

          {/* ── Badge / Email field ── */}
          <Text style={styles.label}>OFFICIAL EMAIL OR BADGE NUMBER</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}><BadgeIcon /></View>
            <TextInput
              style={styles.input}
              placeholder="NPF-2020-09192"
              placeholderTextColor="#4B5563"
              value={badge}
              onChangeText={setBadge}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>

          {/* ── Password field ── */}
          <Text style={styles.label}>PASSWORD</Text>
          <View style={styles.inputWrapper}>
            <View style={styles.inputIcon}><KeyIcon /></View>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="••••••••••"
              placeholderTextColor="#4B5563"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCorrect={false}
            />
            <TouchableOpacity
              style={styles.eyeBtn}
              onPress={() => setShowPassword(v => !v)}
            >
              <EyeIcon visible={showPassword} />
            </TouchableOpacity>
          </View>

          {/* ── Trusted device + Forgot ── */}
          <View style={styles.optionsRow}>
            <TouchableOpacity
              style={styles.checkboxRow}
              onPress={() => setTrustedDevice(v => !v)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, trustedDevice && styles.checkboxChecked]}>
                {trustedDevice && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.trustedText}>Trusted device</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Alert.alert('Forgot Credentials', 'Contact your department administrator.')}>
              <Text style={styles.forgotText}>Forgot credentials?</Text>
            </TouchableOpacity>
          </View>

          {/* ── Sign In Button ── */}
          <TouchableOpacity
            style={[styles.signInBtn, loading && styles.signInBtnDisabled]}
            onPress={handleSignIn}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#0D1117" />
            ) : (
              <Text style={styles.signInBtnText}>SIGN IN TO DASHBOARD</Text>
            )}
          </TouchableOpacity>

          {/* ── Register link ── */}
          <View style={styles.registerRow}>
            <Text style={styles.registerText}>No account? </Text>
            <TouchableOpacity onPress={() => router.push('/security-registration')}>
              <Text style={styles.registerLink}>Register credentials</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D1117',
  },

  // Top bar
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  topBarRole: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#45D0B1',
  },
  topBarBack: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    color: '#6B7280',
    letterSpacing: 0.5,
  },

  scroll: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
  },

  // Title
  title: {
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 28,
    lineHeight: 20,
  },

  // Encrypted banner
  encryptedBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(69,208,177,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(69,208,177,0.2)',
    borderRadius: 10,
    padding: 14,
    marginBottom: 28,
    gap: 12,
  },
  encryptedIcon: {
    marginTop: 2,
  },
  encryptedTitle: {
    color: '#45D0B1',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 3,
  },
  encryptedDesc: {
    color: '#6B7280',
    fontSize: 12,
    lineHeight: 18,
  },

  // Form
  label: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#6B7280',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  eyeBtn: {
    padding: 4,
  },

  // Options row
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: '#374151',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#45D0B1',
    borderColor: '#45D0B1',
  },
  checkmark: {
    color: '#0D1117',
    fontSize: 10,
    fontWeight: '900',
  },
  trustedText: {
    color: '#9CA3AF',
    fontSize: 13,
  },
  forgotText: {
    color: '#45D0B1',
    fontSize: 13,
    fontWeight: '500',
  },

  // Sign In button
  signInBtn: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 17,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  signInBtnDisabled: {
    opacity: 0.6,
  },
  signInBtnText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  // Register link
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    color: '#6B7280',
    fontSize: 13,
  },
  registerLink: {
    color: '#45D0B1',
    fontSize: 13,
    fontWeight: '600',
  },
});
