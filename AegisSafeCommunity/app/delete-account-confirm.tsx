import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle, Defs, RadialGradient, Stop, Ellipse } from 'react-native-svg';

// ─── Animated shield/broken icon ─────────────────────────────────────────────
const DeletedIcon = () => (
  <Svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <Defs>
      <RadialGradient id="glow" cx="50%" cy="50%" r="50%">
        <Stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
        <Stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
      </RadialGradient>
    </Defs>
    <Ellipse cx="40" cy="40" rx="40" ry="40" fill="url(#glow)" />
    {/* Outer ring */}
    <Circle cx="40" cy="40" r="34" stroke="#EF4444" strokeWidth="1.2" strokeOpacity="0.3" />
    <Circle cx="40" cy="40" r="26" stroke="#EF4444" strokeWidth="1.5" strokeOpacity="0.5" />
    {/* Trash icon */}
    <Path
      d="M26 31h28M34 31v-3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v3M50 31l-1.5 19a2 2 0 0 1-2 1.8H33.5a2 2 0 0 1-2-1.8L30 31"
      stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    />
    <Path d="M37 37v8M43 37v8" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const ClockIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="9" stroke="#F59E0B" strokeWidth="1.6" />
    <Path d="M12 7v5l3 3" stroke="#F59E0B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ShieldIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L4 6.5V11C4 15.4183 7.58172 19.4301 12 21C16.4183 19.4301 20 15.4183 20 11V6.5L12 3Z"
      stroke="#2DD4BF" strokeWidth="1.6" strokeLinejoin="round"
    />
    <Path d="M9 12l2 2 4-4" stroke="#2DD4BF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const UndoIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path d="M3 10h13a5 5 0 0 1 0 10H7" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 10l4-4M3 10l4 4" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── What happens next items ──────────────────────────────────────────────────
const NEXT_STEPS = [
  {
    icon: <ClockIcon />,
    title: '30-day grace period',
    desc: 'Your account is scheduled for deletion. You have 30 days to cancel this by signing back in.',
    accent: '#F59E0B',
  },
  {
    icon: <ShieldIcon />,
    title: 'Data will be erased',
    desc: 'All personal data, reports, and activity will be permanently deleted from our servers after 30 days.',
    accent: '#2DD4BF',
  },
  {
    icon: <UndoIcon />,
    title: 'Undo anytime within 30 days',
    desc: 'Simply log back in with your credentials to cancel the deletion and restore your account.',
    accent: '#6B7280',
  },
];

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function DeleteAccountConfirmScreen() {
  const router = useRouter();
  const fadeAnim  = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim,  { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, useNativeDriver: true, bounciness: 6 }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, bounciness: 10 }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>

        {/* Icon */}
        <Animated.View style={[styles.iconWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <DeletedIcon />
        </Animated.View>

        {/* Heading */}
        <Text style={styles.title}>Account Deletion{'\n'}Scheduled</Text>
        <Text style={styles.subtitle}>
          Your account has been queued for permanent deletion. You will receive a confirmation email shortly.
        </Text>

        {/* Countdown badge */}
        <View style={styles.countdownBadge}>
          <ClockIcon />
          <Text style={styles.countdownText}>Deletes in <Text style={styles.countdownHighlight}>30 days</Text></Text>
        </View>

        {/* What happens next */}
        <Text style={styles.sectionLabel}>WHAT HAPPENS NEXT</Text>
        {NEXT_STEPS.map((step, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={[styles.stepIconBox, { borderColor: `${step.accent}40`, backgroundColor: `${step.accent}12` }]}>
              {step.icon}
            </View>
            <View style={styles.stepText}>
              <Text style={styles.stepTitle}>{step.title}</Text>
              <Text style={styles.stepDesc}>{step.desc}</Text>
            </View>
          </View>
        ))}

        <View style={styles.spacer} />
      </Animated.View>

      {/* Footer actions */}
      <View style={styles.footer}>
        {/* Undo / Cancel Deletion */}
        <TouchableOpacity
          style={styles.undoBtn}
          onPress={() => {
            router.replace('/(tabs)/home');
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.undoBtnText}>↩ CANCEL DELETION — KEEP MY ACCOUNT</Text>
        </TouchableOpacity>

        {/* Done — go to sign in */}
        <TouchableOpacity
          style={styles.doneBtn}
          onPress={() => router.replace('/')}
          activeOpacity={0.85}
        >
          <Text style={styles.doneBtnText}>Done — Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D1117' },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    alignItems: 'center',
  },

  // Icon
  iconWrapper: { marginBottom: 28 },

  // Heading
  title: {
    fontFamily: 'serif',
    fontSize: 30, fontWeight: '700',
    color: '#F1F5F9', textAlign: 'center',
    lineHeight: 38, marginBottom: 12,
  },
  subtitle: {
    fontSize: 14, color: '#6B7280',
    textAlign: 'center', lineHeight: 22,
    marginBottom: 24, paddingHorizontal: 8,
  },

  // Countdown badge
  countdownBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(245,158,11,0.1)',
    borderWidth: 1, borderColor: 'rgba(245,158,11,0.25)',
    borderRadius: 20, paddingHorizontal: 16, paddingVertical: 10,
    marginBottom: 32,
  },
  countdownText:      { fontSize: 13, color: '#94A3B8', fontWeight: '500' },
  countdownHighlight: { color: '#F59E0B', fontWeight: '700' },

  // Section
  sectionLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.5,
    color: '#4B5563', alignSelf: 'flex-start', marginBottom: 14,
  },

  // Steps
  stepRow: {
    flexDirection: 'row', gap: 14,
    alignSelf: 'stretch', marginBottom: 14,
  },
  stepIconBox: {
    width: 42, height: 42, borderRadius: 12,
    borderWidth: 1, justifyContent: 'center', alignItems: 'center',
    flexShrink: 0,
  },
  stepText: { flex: 1 },
  stepTitle: { fontSize: 13, fontWeight: '700', color: '#E2E8F0', marginBottom: 3 },
  stepDesc:  { fontSize: 12, color: '#6B7280', lineHeight: 18 },

  spacer: { flex: 1 },

  // Footer
  footer: {
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === 'ios' ? 28 : 20,
    paddingTop: 12, gap: 12,
  },
  undoBtn: {
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.35)',
    backgroundColor: 'rgba(239,68,68,0.06)',
    borderRadius: 12, paddingVertical: 16, alignItems: 'center',
  },
  undoBtnText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 11, fontWeight: '700', letterSpacing: 0.8, color: '#EF4444',
  },
  doneBtn: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12, paddingVertical: 16, alignItems: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  doneBtnText: { fontSize: 14, fontWeight: '600', color: '#4B5563' },
});
