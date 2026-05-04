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
import Svg, { Path, Circle, Rect } from 'react-native-svg';

// ─── Incident type icons (SVG paths) ─────────────────────────────────────────
const GunIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M3 10h4V7h9l2 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1l-1 2H3v-6z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    <Circle cx="7" cy="17" r="2" stroke="#F59E0B" strokeWidth="1.5" />
  </Svg>
);

const CarIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M5 11l1.5-4.5h11L19 11M5 11H3v3h1m15-3h2v3h-1M5 11h14" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    <Circle cx="7.5" cy="16" r="1.5" stroke="#F59E0B" strokeWidth="1.5" />
    <Circle cx="16.5" cy="16" r="1.5" stroke="#F59E0B" strokeWidth="1.5" />
  </Svg>
);

const EyeQuestionIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#F59E0B" strokeWidth="1.5" />
    <Circle cx="12" cy="12" r="3" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M12 8v0m0 2.5v3" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const OfficerIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="3" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M6 21v-2a6 6 0 0 1 12 0v2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M9 11l3-2 3 2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FistIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Rect x="6" y="10" width="12" height="9" rx="2" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M9 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M6 13h12" stroke="#F59E0B" strokeWidth="1.5" />
  </Svg>
);

const DrugIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Rect x="8" y="3" width="8" height="13" rx="4" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M8 10h8" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M12 16v5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const HouseBreakIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M3 11l9-7 9 7v10H3V11z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    <Path d="M9 21v-6h6v6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15 11l-2-2-2 2" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const AlertIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round" />
    <Path d="M12 9v4M12 17h.01" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
type UrgencyLevel = 'Low' | 'Medium' | 'High';

const INCIDENT_TYPES = [
  { id: 'armed-robbery',       label: 'Armed Robbery',       icon: <GunIcon /> },
  { id: 'vehicle-crime',       label: 'Vehicle Crime',        icon: <CarIcon /> },
  { id: 'suspicious-activity', label: 'Suspicious Activity',  icon: <EyeQuestionIcon /> },
  { id: 'police-misconduct',   label: 'Police Misconduct',    icon: <OfficerIcon /> },
  { id: 'assault',             label: 'Assault',              icon: <FistIcon /> },
  { id: 'drug-activity',       label: 'Drug Activity',        icon: <DrugIcon /> },
  { id: 'break-in',            label: 'Break-In',             icon: <HouseBreakIcon /> },
  { id: 'other-emergency',     label: 'Other Emergency',      icon: <AlertIcon /> },
];

const URGENCY: UrgencyLevel[] = ['Low', 'Medium', 'High'];
const URGENCY_COLORS: Record<UrgencyLevel, string> = {
  Low:    '#10B981',
  Medium: '#F59E0B',
  High:   '#EF4444',
};

// ─── Step dots ────────────────────────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.stepDots}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.stepDot,
            i === current - 1 && styles.stepDotActive,
            i < current - 1  && styles.stepDotDone,
          ]}
        />
      ))}
    </View>
  );
}

// ─── Step 1 — Incident Type ───────────────────────────────────────────────────
function Step1({
  selected, onSelect,
  urgency, onUrgency,
}: {
  selected: string; onSelect: (id: string) => void;
  urgency: UrgencyLevel; onUrgency: (u: UrgencyLevel) => void;
}) {
  return (
    <>
      <Text style={styles.stepTitle}>What happened?</Text>
      <Text style={styles.stepSubtitle}>Select the incident type that best describes the situation.</Text>

      {/* 2-column grid */}
      <View style={styles.typeGrid}>
        {INCIDENT_TYPES.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.typeCard, selected === t.id && styles.typeCardActive]}
            onPress={() => onSelect(t.id)}
            activeOpacity={0.8}
          >
            {t.icon}
            <Text style={[styles.typeLabel, selected === t.id && styles.typeLabelActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Urgency */}
      <Text style={styles.sectionLabel}>URGENCY LEVEL</Text>
      <View style={styles.urgencyRow}>
        {URGENCY.map(u => (
          <TouchableOpacity
            key={u}
            style={[
              styles.urgencyBtn,
              urgency === u && { backgroundColor: `${URGENCY_COLORS[u]}22`, borderColor: URGENCY_COLORS[u] },
            ]}
            onPress={() => onUrgency(u)}
          >
            <Text style={[styles.urgencyText, urgency === u && { color: URGENCY_COLORS[u] }]}>{u}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

// ─── Step 2 — Details ─────────────────────────────────────────────────────────
function Step2({ description, onChange }: { description: string; onChange: (v: string) => void }) {
  return (
    <>
      <Text style={styles.stepTitle}>What did you see?</Text>
      <Text style={styles.stepSubtitle}>Describe what happened in as much detail as you can.</Text>
      <Text style={styles.fieldLabel}>DESCRIPTION <Text style={styles.required}>*</Text></Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="e.g. Three men in a black Toyota Camry were seen breaking into the building at around 10pm..."
        placeholderTextColor="#4B5563"
        value={description}
        onChangeText={onChange}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />
    </>
  );
}

// ─── Step 3 — Location ────────────────────────────────────────────────────────
function Step3({ location, onChange }: { location: string; onChange: (v: string) => void }) {
  return (
    <>
      <Text style={styles.stepTitle}>Where did it happen?</Text>
      <Text style={styles.stepSubtitle}>Enter the street, area or nearest landmark.</Text>
      <Text style={styles.fieldLabel}>LOCATION <Text style={styles.required}>*</Text></Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Apongbon Bridge, Lagos Island"
        placeholderTextColor="#4B5563"
        value={location}
        onChangeText={onChange}
      />
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapPlaceholderText}>📍 Map auto-fill coming soon</Text>
      </View>
    </>
  );
}

// ─── Step 4 — Confirm & Anonymity ─────────────────────────────────────────────
function Step4({ anonymous, onToggle }: { anonymous: boolean; onToggle: () => void }) {
  return (
    <>
      <Text style={styles.stepTitle}>Review & submit</Text>
      <Text style={styles.stepSubtitle}>Your report will be reviewed by a verified officer within 24 hours.</Text>

      <TouchableOpacity style={styles.anonRow} onPress={onToggle} activeOpacity={0.8}>
        <View style={[styles.checkbox, anonymous && styles.checkboxChecked]}>
          {anonymous && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.anonTitle}>Submit anonymously</Text>
          <Text style={styles.anonDesc}>Your identity will not be shared with authorities or the public.</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.confirmNote}>
        <Text style={styles.confirmNoteText}>
          🔒 End-to-end encrypted · Stored securely · Only visible to verified officers
        </Text>
      </View>
    </>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
const TOTAL_STEPS = 4;

export default function NewReportScreen() {
  const router = useRouter();
  const [step, setStep]        = useState(1);
  const [incidentType, setType] = useState('');
  const [urgency, setUrgency]  = useState<UrgencyLevel>('Medium');
  const [description, setDesc] = useState('');
  const [location, setLoc]     = useState('');
  const [anonymous, setAnon]   = useState(true);
  const [submitting, setSub]   = useState(false);

  const canContinue = () => {
    if (step === 1) return incidentType !== '';
    if (step === 2) return description.trim().length > 10;
    if (step === 3) return location.trim().length > 3;
    return true;
  };

  const handleContinue = () => {
    if (!canContinue()) {
      const msgs: Record<number, string> = {
        1: 'Please select an incident type.',
        2: 'Please describe the incident (at least 10 characters).',
        3: 'Please enter the incident location.',
      };
      Alert.alert('Required', msgs[step] || '');
      return;
    }
    if (step < TOTAL_STEPS) { setStep(s => s + 1); return; }

    // Final submit
    setSub(true);
    setTimeout(() => {
      setSub(false);
      Alert.alert(
        'Report Submitted ✅',
        'Your report has been submitted successfully. A verified officer will review it within 24 hours.',
        [{ text: 'Done', onPress: () => router.replace('/(tabs)/reports') }]
      );
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => (step > 1 ? setStep(s => s - 1) : router.back())}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NEW REPORT</Text>
          <Text style={styles.stepCounter}>STEP {step}/{TOTAL_STEPS}</Text>
        </View>

        {/* Progress dots */}
        <StepDots current={step} total={TOTAL_STEPS} />

        {/* Step content */}
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step === 1 && (
            <Step1
              selected={incidentType} onSelect={setType}
              urgency={urgency} onUrgency={setUrgency}
            />
          )}
          {step === 2 && <Step2 description={description} onChange={setDesc} />}
          {step === 3 && <Step3 location={location} onChange={setLoc} />}
          {step === 4 && <Step4 anonymous={anonymous} onToggle={() => setAnon(v => !v)} />}

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Continue / Submit button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueBtn, (!canContinue() || submitting) && styles.continueBtnDisabled]}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>
              {submitting ? 'SUBMITTING…' : step < TOTAL_STEPS ? 'CONTINUE →' : 'SUBMIT REPORT'}
            </Text>
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
    fontSize: 12, fontWeight: '700', letterSpacing: 2, color: '#2DD4BF',
  },
  stepCounter: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 11, color: '#2DD4BF', fontWeight: '700',
  },

  // Progress dots
  stepDots: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 16 },
  stepDot:       { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.1)' },
  stepDotActive: { backgroundColor: '#2DD4BF', width: 24 },
  stepDotDone:   { backgroundColor: 'rgba(45,212,191,0.4)' },

  // Scroll
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },

  // Step text
  stepTitle:    { fontFamily: 'serif', fontSize: 26, fontWeight: '700', color: '#F1F5F9', marginBottom: 8 },
  stepSubtitle: { fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 24 },

  // Type grid
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  typeCard: {
    width: '47%', backgroundColor: '#161B22',
    borderRadius: 12, padding: 18, alignItems: 'center', gap: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  typeCardActive: {
    borderColor: '#2DD4BF',
    backgroundColor: 'rgba(45,212,191,0.07)',
  },
  typeLabel:       { fontSize: 12, fontWeight: '600', color: '#94A3B8', textAlign: 'center' },
  typeLabelActive: { color: '#2DD4BF' },

  // Urgency
  sectionLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: '#4B5563', marginBottom: 12,
  },
  urgencyRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  urgencyBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center',
    backgroundColor: '#161B22', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  urgencyText: { fontSize: 13, fontWeight: '700', color: '#4B5563' },

  // Form fields
  fieldLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: '#4B5563',
    marginBottom: 10, marginTop: 4,
  },
  required: { color: '#EF4444' },
  input: {
    backgroundColor: '#161B22', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10, paddingHorizontal: 16, paddingVertical: 14,
    color: '#FFFFFF', fontSize: 14, marginBottom: 8,
  },
  textArea:  { height: 160, textAlignVertical: 'top' },

  // Map placeholder
  mapPlaceholder: {
    backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 10, borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)', padding: 24,
    alignItems: 'center', marginTop: 4,
  },
  mapPlaceholderText: { color: '#4B5563', fontSize: 13 },

  // Step 4
  anonRow: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 14,
    backgroundColor: '#161B22', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 16,
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6,
    borderWidth: 1.5, borderColor: '#374151',
    justifyContent: 'center', alignItems: 'center', marginTop: 2,
  },
  checkboxChecked: { backgroundColor: '#2DD4BF', borderColor: '#2DD4BF' },
  checkmark:       { color: '#0D1117', fontSize: 13, fontWeight: '900' },
  anonTitle: { fontSize: 14, fontWeight: '700', color: '#F1F5F9', marginBottom: 4 },
  anonDesc:  { fontSize: 12, color: '#6B7280', lineHeight: 18 },
  confirmNote: {
    backgroundColor: 'rgba(45,212,191,0.06)', borderRadius: 10, padding: 14,
    borderWidth: 1, borderColor: 'rgba(45,212,191,0.15)',
  },
  confirmNoteText: { fontSize: 12, color: '#2DD4BF', lineHeight: 18, textAlign: 'center' },

  // Footer
  footer: { paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 24 : 20, paddingTop: 12 },
  continueBtn: {
    backgroundColor: '#2DD4BF', borderRadius: 12,
    paddingVertical: 17, alignItems: 'center',
    shadowColor: '#2DD4BF', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 8,
  },
  continueBtnDisabled: { opacity: 0.45 },
  continueBtnText: {
    color: '#0D1117', fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13, fontWeight: '700', letterSpacing: 1.5,
  },
});
