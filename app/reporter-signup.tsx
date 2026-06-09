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
import { BASE_URL } from '../src/config/api';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { saveUserProfile } from '../src/utils/userStorage';
import { AuthStorage } from '../src/utils/authStorage';

// ─── Icons ────────────────────────────────────────────────────────────────────
const UserIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="12" cy="7" r="4" stroke="#2DD4BF" strokeWidth="1.8" />
  </Svg>
);

const MailIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#2DD4BF" strokeWidth="1.8" strokeLinejoin="round" />
    <Path d="M22 6l-10 7L2 6" stroke="#2DD4BF" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const LockIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="11" width="18" height="11" rx="2" stroke="#2DD4BF" strokeWidth="1.8" />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#2DD4BF" strokeWidth="1.8" />
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

export default function ReporterSignUpScreen() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const calculateStrength = (pass: string) => {
    let score = 0;
    if (pass.length > 5) score += 1;
    if (pass.length > 8) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const strength = calculateStrength(password);

  // ── ONLY THIS FUNCTION CHANGED ──────────────────────────────────────────────
  const handleSignUp = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing Fields', 'Please fill out all fields to create your account.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!agreeTerms) {
      Alert.alert('Terms Required', 'Please agree to the Terms of Service to continue.');
      return;
    }

    setLoading(true);

    try {
      const regUrl = `${BASE_URL}/api/auth/reporter/register`;
      const response = await fetch(regUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Registration Failed', data.message || 'Something went wrong.');
        return;
      }

      await saveUserProfile({
        email: email.trim().toLowerCase(),
        role: 'Crime Reporter',
        displayName: name || email.split('@')[0],
      });

      router.push({
        pathname: '/email-verification',
        params: {
          email: email.trim().toLowerCase(),
          password,        // ← add this
          role: 'reporter',
        },
      });

    } catch (err) {
      Alert.alert('Network Error', 'Could not reach the server. Check your connection.');
    } finally {
      setLoading(false);
    }
  };
  // ── END OF CHANGES ──────────────────────────────────────────────────────────

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>BACK TO LOGIN</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>{"Join your local Community Watch and start making a difference today."}</Text>

          <View style={styles.formCard}>

            <Text style={styles.label}>FULL NAME OR ALIAS</Text>
            <View style={styles.inputWrapper}>
              <View style={styles.inputIcon}><UserIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="Amaka Okafor"
                placeholderTextColor="#4B5563"
                value={name}
                onChangeText={setName}
                autoCorrect={false}
              />
            </View>

            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <View style={[styles.inputWrapper, emailError ? styles.inputError : null]}>
              <View style={styles.inputIcon}><MailIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="amaka@example.com"
                placeholderTextColor="#4B5563"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (emailError) setEmailError('');
                }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

            <Text style={styles.label}>CREATE PASSWORD</Text>
            <View style={[styles.inputWrapper, { marginBottom: 8 }]}>
              <View style={styles.inputIcon}><LockIcon /></View>
              <TextInput
                style={styles.input}
                placeholder="••••••••••••"
                placeholderTextColor="#4B5563"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity onPress={() => setShowPassword(v => !v)} style={styles.eyeBtn}>
                <EyeIcon visible={showPassword} />
              </TouchableOpacity>
            </View>

            {password.length > 0 && (
              <View style={styles.strengthBox}>
                <View style={styles.strengthTrack}>
                  <View
                    style={[
                      styles.strengthFill,
                      { width: `${(strength / 5) * 100}%` },
                      strength < 3 ? { backgroundColor: '#F59E0B' } : { backgroundColor: '#10B981' }
                    ]}
                  />
                </View>
                <Text style={styles.strengthText}>
                  {strength < 3 ? 'Weak password' : 'Strong password'}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.termsRow}
              onPress={() => setAgreeTerms(v => !v)}
              activeOpacity={0.8}
            >
              <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
                {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
              </View>
              <Text style={styles.termsText}>
                {"I agree to the "}<Text style={styles.termsLink}>Terms of Service</Text>{" and "}<Text style={styles.termsLink}>Privacy Policy</Text>{". My data will remain encrypted."}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitBtn, (loading || !agreeTerms) && styles.submitBtnDisabled]}
              onPress={handleSignUp}
              disabled={loading || !agreeTerms}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#0D1117" />
              ) : (
                <Text style={styles.submitBtnText}>CREATE FREE ACCOUNT</Text>
              )}
            </TouchableOpacity>

          </View>

          <View style={styles.loginRow}>
            <Text style={styles.loginText}>{"Already have an account? "}</Text>
            <TouchableOpacity onPress={() => router.push('/reporter-login')}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles — UNTOUCHED FROM YOUR ORIGINAL ───────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D1117' },
  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backArrow: { color: '#6B7280', fontSize: 16, fontWeight: '700' },
  backText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1, color: '#6B7280',
  },
  scroll: { paddingHorizontal: 20, paddingTop: 32, paddingBottom: 50 },
  title: {
    fontFamily: 'serif',
    fontSize: 28, fontWeight: '700', color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13, color: '#9CA3AF', lineHeight: 20,
    marginBottom: 32,
  },
  formCard: {
    backgroundColor: '#161B22',
    borderRadius: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    padding: 20,
    marginBottom: 24,
  },
  label: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: '#6B7280',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#0D1117',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  inputIcon: { marginRight: 10, opacity: 0.8 },
  input: {
    flex: 1, paddingVertical: 14,
    color: '#FFFFFF', fontSize: 14,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239,68,68,0.05)',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 11,
    marginTop: -14,
    marginBottom: 20,
    marginLeft: 4,
  },
  eyeBtn: { padding: 4 },
  strengthBox: { marginBottom: 24 },
  strengthTrack: {
    height: 4, backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 2, overflow: 'hidden', marginBottom: 6,
  },
  strengthFill: { height: '100%', borderRadius: 2 },
  strengthText: { fontSize: 11, color: '#6B7280', fontWeight: '500' },
  termsRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 12,
    marginBottom: 28,
  },
  checkbox: {
    width: 18, height: 18, borderRadius: 4,
    borderWidth: 1.5, borderColor: '#4B5563',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 1,
  },
  checkboxChecked: { backgroundColor: '#2DD4BF', borderColor: '#2DD4BF' },
  checkmark: { color: '#0D1117', fontSize: 11, fontWeight: '900' },
  termsText: { flex: 1, fontSize: 12, color: '#9CA3AF', lineHeight: 18 },
  termsLink: { color: '#2DD4BF' },
  submitBtn: {
    backgroundColor: '#2DD4BF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitBtnText: {
    color: '#0D1117',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13, fontWeight: '700', letterSpacing: 1.5,
  },
  loginRow: { flexDirection: 'row', justifyContent: 'center' },
  loginText: { color: '#6B7280', fontSize: 13 },
  loginLink: { color: '#2DD4BF', fontSize: 13, fontWeight: '600' },
});