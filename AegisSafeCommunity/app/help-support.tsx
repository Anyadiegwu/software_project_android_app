import React, { useState } from 'react';
import {
  Alert,
  Linking,
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
const ChatIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#2DD4BF" strokeWidth="1.7" strokeLinejoin="round" />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 5.07 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MailIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#8B5CF6" strokeWidth="1.7" strokeLinejoin="round" />
    <Path d="M22 6l-10 7L2 6" stroke="#8B5CF6" strokeWidth="1.7" strokeLinecap="round" />
  </Svg>
);

const FAQIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke="#3B82F6" strokeWidth="1.7" />
    <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" stroke="#3B82F6" strokeWidth="1.7" strokeLinecap="round" />
    <Circle cx="12" cy="17" r="0.5" fill="#3B82F6" stroke="#3B82F6" strokeWidth="1.5" />
  </Svg>
);

const ChevronIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M9 18l6-6-6-6" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ShieldIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path d="M12 3L4 6.5V11c0 4.42 3.58 8.43 8 10 4.42-1.57 8-5.58 8-10V6.5L12 3z" stroke="#10B981" strokeWidth="1.7" strokeLinejoin="round" />
    <Path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── FAQ Data ─────────────────────────────────────────────────────────────────
const FAQS = [
  {
    q: 'How do I report an incident anonymously?',
    a: 'Go to Reports → New Report. On the final step (Step 4), enable the "Submit anonymously" toggle. Your identity will be hidden from authorities and the public.',
  },
  {
    q: 'How does the SOS feature work?',
    a: 'On the SOS screen, press and hold the SOS button. This shares your live location with emergency contacts and dials the emergency line. Your location is broadcast until you cancel.',
  },
  {
    q: 'Can I cancel my account deletion?',
    a: 'Yes. You have a 30-day grace period after requesting deletion. Simply sign back into your account within 30 days and the deletion will be automatically cancelled.',
  },
  {
    q: 'What data does Aegis collect?',
    a: 'Aegis collects only what is needed to provide community safety features: your location (when active), incident reports, and profile info. See Privacy Settings for full control.',
  },
  {
    q: 'How do I become a verified resident?',
    a: 'Go to Profile → Verification. Upload a proof of address (utility bill or ID). Verification is reviewed by Aegis staff within 48 hours.',
  },
  {
    q: 'How do I report an incident?',
    a: "Navigate to the 'Report' tab and follow the on-screen prompts.",
  },
  {
    q: 'Is my data encrypted?',
    a: 'Yes, all community data is end-to-end encrypted for your safety.',
  },
];

// ─── Contact options ──────────────────────────────────────────────────────────
const CONTACT_OPTIONS = [
  {
    icon: <ChatIcon />,
    label: 'Live Chat',
    desc: 'Chat with support · Avg. 5 min',
    accent: '#2DD4BF',
    bg: 'rgba(45,212,191,0.08)',
    border: 'rgba(45,212,191,0.2)',
    onPress: () => Alert.alert('Live Chat', 'Live chat support is coming soon. Try email or phone for now.'),
  },
  {
    icon: <PhoneIcon />,
    label: 'Call Support',
    desc: 'Mon–Fri, 8am–6pm',
    accent: '#F59E0B',
    bg: 'rgba(245,158,11,0.08)',
    border: 'rgba(245,158,11,0.2)',
    onPress: () => Linking.openURL('tel:08061972676'),
  },
  {
    icon: <MailIcon />,
    label: 'Email Support',
    desc: 'Response within 24hrs',
    accent: '#8B5CF6',
    bg: 'rgba(139,92,246,0.08)',
    border: 'rgba(139,92,246,0.2)',
    onPress: () => Linking.openURL('mailto:support@aegis.ng?subject=Help%20Request'),
  },
];

// ─── FAQ Item ─────────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <TouchableOpacity
      style={styles.faqItem}
      onPress={() => setOpen(v => !v)}
      activeOpacity={0.75}
    >
      <View style={styles.faqHeader}>
        <Text style={styles.faqQ}>{q}</Text>
        <Text style={[styles.faqChevron, open && styles.faqChevronOpen]}>›</Text>
      </View>
      {open && <Text style={styles.faqA}>{a}</Text>}
    </TouchableOpacity>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function HelpSupportScreen() {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = () => {
    if (!message.trim()) {
      Alert.alert('Empty message', 'Please describe your issue before sending.');
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setMessage('');
      Alert.alert('Message Sent ✓', 'Our support team will respond within 24 hours. Check your email for updates.');
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>HELP & SUPPORT</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Verified support banner */}
        <View style={styles.trustBanner}>
          <ShieldIcon />
          <Text style={styles.trustText}>
            Aegis support is verified and encrypted. We will never ask for your password.
          </Text>
        </View>

        {/* ── Contact Options ── */}
        <Text style={styles.sectionLabel}>GET IN TOUCH</Text>
        <View style={styles.contactGrid}>
          {CONTACT_OPTIONS.map((opt, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.contactCard, { backgroundColor: opt.bg, borderColor: opt.border }]}
              onPress={opt.onPress}
              activeOpacity={0.8}
            >
              <View style={[styles.contactIconBox, { borderColor: opt.border }]}>
                {opt.icon}
              </View>
              <Text style={[styles.contactLabel, { color: opt.accent }]}>{opt.label}</Text>
              <Text style={styles.contactDesc}>{opt.desc}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Quick Message ── */}
        <Text style={styles.sectionLabel}>SEND A MESSAGE</Text>
        <View style={styles.messageCard}>
          <TextInput
            style={[styles.messageInput]}
            placeholder="Describe your issue or question..."
            placeholderTextColor="#374151"
            value={message}
            onChangeText={setMessage}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            style={[styles.sendBtn, (sending || !message.trim()) && styles.sendBtnDisabled]}
            onPress={handleSend}
            disabled={sending || !message.trim()}
            activeOpacity={0.85}
          >
            <Text style={styles.sendBtnText}>{sending ? 'SENDING…' : 'SEND MESSAGE →'}</Text>
          </TouchableOpacity>
        </View>

        {/* ── FAQs ── */}
        <Text style={styles.sectionLabel}>FREQUENTLY ASKED</Text>
        <View style={styles.faqCard}>
          {FAQS.map((faq, i) => (
            <View key={i}>
              <FAQItem q={faq.q} a={faq.a} />
              {i < FAQS.length - 1 && <View style={styles.faqDivider} />}
            </View>
          ))}
        </View>

        {/* ── Report a Bug ── */}
        <TouchableOpacity
          style={styles.bugRow}
          onPress={() => Linking.openURL('mailto:bugs@aegis.ng?subject=Bug%20Report')}
          activeOpacity={0.8}
        >
          <View style={styles.bugIconBox}>
            <FAQIcon />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bugTitle}>Report a Bug</Text>
            <Text style={styles.bugDesc}>Found something broken? Help us improve Aegis.</Text>
          </View>
          <ChevronIcon />
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
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
    fontSize: 12, fontWeight: '700', letterSpacing: 2, color: '#2DD4BF',
  },

  scroll: { paddingHorizontal: 20, paddingTop: 20 },

  // Trust banner
  trustBanner: {
    flexDirection: 'row', alignItems: 'center', gap: 12,
    backgroundColor: 'rgba(16,185,129,0.07)',
    borderWidth: 1, borderColor: 'rgba(16,185,129,0.2)',
    borderRadius: 12, padding: 14, marginBottom: 28,
  },
  trustText: { flex: 1, fontSize: 12, color: '#10B981', lineHeight: 18 },

  // Section label
  sectionLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.5,
    color: '#4B5563', marginBottom: 12,
  },

  // Contact grid
  contactGrid: {
    flexDirection: 'row', gap: 10, marginBottom: 28,
  },
  contactCard: {
    flex: 1, borderRadius: 14, borderWidth: 1,
    padding: 14, alignItems: 'center', gap: 8,
  },
  contactIconBox: {
    width: 42, height: 42, borderRadius: 12,
    borderWidth: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  contactLabel: { fontSize: 13, fontWeight: '700' },
  contactDesc:  { fontSize: 10, color: '#4B5563', textAlign: 'center' },

  // Quick message
  messageCard: {
    backgroundColor: '#161B22', borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    padding: 16, marginBottom: 28,
  },
  messageInput: {
    color: '#FFFFFF', fontSize: 13, lineHeight: 20,
    minHeight: 100, textAlignVertical: 'top',
    marginBottom: 14,
  },
  sendBtn: {
    backgroundColor: '#2DD4BF', borderRadius: 10,
    paddingVertical: 14, alignItems: 'center',
  },
  sendBtnDisabled: { opacity: 0.35 },
  sendBtnText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12, fontWeight: '700', letterSpacing: 1, color: '#0D1117',
  },

  // FAQ
  faqCard: {
    backgroundColor: '#161B22', borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    marginBottom: 16, overflow: 'hidden',
  },
  faqItem:    { padding: 16 },
  faqHeader:  { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 },
  faqQ:       { flex: 1, fontSize: 13, fontWeight: '600', color: '#E2E8F0', lineHeight: 20 },
  faqChevron: { color: '#4B5563', fontSize: 22, lineHeight: 22, transform: [{ rotate: '90deg' }] },
  faqChevronOpen: { transform: [{ rotate: '270deg' }] },
  faqA:       { fontSize: 13, color: '#6B7280', lineHeight: 20, marginTop: 10 },
  faqDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginHorizontal: 16 },

  // Bug report
  bugRow: {
    flexDirection: 'row', alignItems: 'center', gap: 14,
    backgroundColor: '#161B22', borderRadius: 14,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
    padding: 16,
  },
  bugIconBox: {
    width: 42, height: 42, borderRadius: 12,
    backgroundColor: 'rgba(59,130,246,0.1)',
    borderWidth: 1, borderColor: 'rgba(59,130,246,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  bugTitle: { fontSize: 14, fontWeight: '700', color: '#E2E8F0', marginBottom: 2 },
  bugDesc:  { fontSize: 12, color: '#4B5563' },
});
