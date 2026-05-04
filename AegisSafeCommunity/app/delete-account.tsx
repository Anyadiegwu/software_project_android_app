import React, { useState } from 'react';
import {
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
import Svg, { Path, Circle } from 'react-native-svg';

// ─── Icons ────────────────────────────────────────────────────────────────────
const WarningIcon = () => (
  <Svg width="32" height="32" viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      stroke="#EF4444" strokeWidth="1.6" strokeLinejoin="round"
    />
    <Path d="M12 9v4" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="12" cy="17" r="0.5" fill="#EF4444" stroke="#EF4444" strokeWidth="1.5" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17l-5-5" stroke="#EF4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── What gets deleted list ───────────────────────────────────────────────────
const DELETION_ITEMS = [
  'Your profile and personal information',
  'All incident reports you submitted',
  'Your activity history and preferences',
  'Your community watch posts and reactions',
  'Your saved locations and privacy settings',
];

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function DeleteAccountScreen() {
  const router = useRouter();
  const [confirmText, setConfirmText] = useState('');
  const [reason, setReason] = useState('');
  const [step, setStep] = useState<1 | 2>(1);
  const [deleting, setDeleting] = useState(false);

  const CONFIRM_PHRASE = 'DELETE MY ACCOUNT';
  const isConfirmed = confirmText.trim().toUpperCase() === CONFIRM_PHRASE;

  const handleDelete = () => {
    if (!isConfirmed) {
      Alert.alert('Confirmation Required', `Please type "${CONFIRM_PHRASE}" exactly to proceed.`);
      return;
    }
    Alert.alert(
      'Are you absolutely sure?',
      'This action is permanent and cannot be undone. Your account and all associated data will be permanently erased.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Delete Everything',
          style: 'destructive',
          onPress: () => {
            setDeleting(true);
            // Simulate API call — in production: call delete endpoint then navigate
            setTimeout(() => {
              setDeleting(false);
              router.replace('/delete-account-confirm');
            }, 1200);
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>DELETE ACCOUNT</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Warning banner */}
          <View style={styles.warningBanner}>
            <WarningIcon />
            <View style={{ flex: 1 }}>
              <Text style={styles.warningTitle}>Permanent Action</Text>
              <Text style={styles.warningDesc}>
                Deleting your account is irreversible. Once confirmed, all your data will be permanently erased from Aegis servers within 30 days.
              </Text>
            </View>
          </View>

          {/* What will be deleted */}
          <Text style={styles.sectionLabel}>WHAT WILL BE DELETED</Text>
          <View style={styles.deletionCard}>
            {DELETION_ITEMS.map((item, i) => (
              <View key={i} style={[styles.deletionRow, i < DELETION_ITEMS.length - 1 && styles.deletionRowBorder]}>
                <View style={styles.deletionIcon}><CheckIcon /></View>
                <Text style={styles.deletionText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Reason (optional) */}
          <Text style={styles.sectionLabel}>REASON FOR LEAVING <Text style={styles.optional}>(optional)</Text></Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Tell us why you're leaving so we can improve..."
            placeholderTextColor="#374151"
            value={reason}
            onChangeText={setReason}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          {/* Confirmation phrase */}
          <Text style={styles.sectionLabel}>CONFIRM DELETION</Text>
          <Text style={styles.confirmInstruction}>
            Type <Text style={styles.confirmPhrase}>DELETE MY ACCOUNT</Text> to enable the delete button.
          </Text>
          <TextInput
            style={[styles.input, isConfirmed && styles.inputConfirmed]}
            placeholder="DELETE MY ACCOUNT"
            placeholderTextColor="#374151"
            value={confirmText}
            onChangeText={setConfirmText}
            autoCapitalize="characters"
            autoCorrect={false}
          />

          {/* Alternative actions */}
          <View style={styles.alternativeCard}>
            <Text style={styles.alternativeTitle}>Before you go…</Text>
            <Text style={styles.alternativeDesc}>
              Consider these alternatives to keep your data safe while taking a break:
            </Text>
            <TouchableOpacity
              style={styles.alternativeBtn}
              onPress={() => router.push('/privacy-settings')}
              activeOpacity={0.8}
            >
              <Text style={styles.alternativeBtnText}>Enable Incognito Mode instead →</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 16 }} />
        </ScrollView>

        {/* Delete button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.deleteBtn,
              (!isConfirmed || deleting) && styles.deleteBtnDisabled,
            ]}
            onPress={handleDelete}
            disabled={!isConfirmed || deleting}
            activeOpacity={0.85}
          >
            <Text style={styles.deleteBtnText}>
              {deleting ? 'DELETING…' : 'DELETE MY ACCOUNT PERMANENTLY'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelLink} onPress={() => router.back()}>
            <Text style={styles.cancelLinkText}>Cancel — keep my account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D1117' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center', alignItems: 'center',
  },
  backIcon:    { color: '#FFFFFF', fontSize: 24, lineHeight: 28 },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12, fontWeight: '700', letterSpacing: 2, color: '#EF4444',
  },

  scroll: { paddingHorizontal: 20, paddingTop: 24, paddingBottom: 16 },

  // Warning banner
  warningBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    backgroundColor: 'rgba(239,68,68,0.08)',
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.25)',
    borderRadius: 14, padding: 16, marginBottom: 28,
  },
  warningTitle: { fontSize: 14, fontWeight: '700', color: '#EF4444', marginBottom: 4 },
  warningDesc:  { fontSize: 12, color: '#9CA3AF', lineHeight: 18 },

  // Section label
  sectionLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.5,
    color: '#4B5563', marginBottom: 12,
  },
  optional: { color: '#374151', fontWeight: '400' },

  // Deletion list card
  deletionCard: {
    backgroundColor: 'rgba(239,68,68,0.04)', borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.15)',
    marginBottom: 24, overflow: 'hidden',
  },
  deletionRow: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12 },
  deletionRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(239,68,68,0.1)' },
  deletionIcon: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: 'rgba(239,68,68,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  deletionText: { flex: 1, fontSize: 13, color: '#94A3B8', lineHeight: 18 },

  // Input
  input: {
    backgroundColor: '#161B22', borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)', borderRadius: 10,
    paddingHorizontal: 16, paddingVertical: 13,
    color: '#FFFFFF', fontSize: 14, marginBottom: 20,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  inputConfirmed: { borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.05)' },
  textArea: { height: 90, textAlignVertical: 'top', marginBottom: 24 },

  // Confirm phrase instruction
  confirmInstruction: { fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 10 },
  confirmPhrase:      { color: '#EF4444', fontWeight: '700', fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace' },

  // Alternative card
  alternativeCard: {
    backgroundColor: 'rgba(45,212,191,0.05)',
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.15)',
    borderRadius: 14, padding: 16,
  },
  alternativeTitle: { fontSize: 14, fontWeight: '700', color: '#2DD4BF', marginBottom: 6 },
  alternativeDesc:  { fontSize: 12, color: '#6B7280', lineHeight: 18, marginBottom: 12 },
  alternativeBtn: {
    backgroundColor: 'rgba(45,212,191,0.1)', borderRadius: 8,
    paddingVertical: 10, paddingHorizontal: 14, alignSelf: 'flex-start',
  },
  alternativeBtnText: { color: '#2DD4BF', fontSize: 12, fontWeight: '700' },

  // Footer
  footer: { paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 24 : 20, paddingTop: 12 },
  deleteBtn: {
    backgroundColor: '#EF4444', borderRadius: 12,
    paddingVertical: 17, alignItems: 'center',
    shadowColor: '#EF4444', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 8,
    marginBottom: 14,
  },
  deleteBtnDisabled: { opacity: 0.3 },
  deleteBtnText: {
    color: '#FFFFFF',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12, fontWeight: '700', letterSpacing: 1,
  },
  cancelLink:     { alignItems: 'center', paddingVertical: 4 },
  cancelLinkText: { color: '#4B5563', fontSize: 13, fontWeight: '600' },
});
