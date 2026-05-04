import React, { useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

// ─── Icon Components ──────────────────────────────────────────────────────────
const KeyIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 7C15 8.65685 13.6569 10 12 10C10.3431 10 9 8.65685 9 7C9 5.34315 10.3431 4 12 4C13.6569 4 15 5.34315 15 7Z"
      stroke="#F59E0B" strokeWidth="1.5"
    />
    <Path
      d="M12 10V20M9 17H15M9 20H15"
      stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round"
    />
  </Svg>
);

const ShieldIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 3L4 6.5V11C4 15.4183 7.58172 19.4301 12 21C16.4183 19.4301 20 15.4183 20 11V6.5L12 3Z"
      stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round"
    />
  </Svg>
);

const PhoneIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Rect x="7" y="2" width="10" height="20" rx="2" stroke="#F59E0B" strokeWidth="1.5" />
    <Circle cx="12" cy="18" r="1" fill="#F59E0B" />
  </Svg>
);

const LaptopIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="5" width="18" height="12" rx="1.5" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M2 19H22" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

// ─── Reusable Row Components ──────────────────────────────────────────────────
function SectionLabel({ text }: { text: string }) {
  return <Text style={styles.sectionLabel}>{text}</Text>;
}

function RowCard({ children }: { children: React.ReactNode }) {
  return <View style={styles.rowCard}>{children}</View>;
}

function SettingRow({
  icon,
  title,
  subtitle,
  subtitleColor,
  right,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  subtitleColor?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.iconBox}>{icon}</View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={[styles.rowSubtitle, subtitleColor ? { color: subtitleColor } : {}]}>
          {subtitle}
        </Text>
      </View>
      {right}
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function SecurityScreen() {
  const router = useRouter();
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);
  const [sessions, setSessions] = useState([
    { id: 'chrome-mac', device: 'Chrome — MacBook', location: 'Lagos, Nigeria · 2 days ago', signedOut: false },
  ]);

  const signOutSession = (id: string) => {
    Alert.alert('Sign Out Session', 'Are you sure you want to sign out this device?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out', style: 'destructive',
        onPress: () => setSessions(s => s.filter(x => x.id !== id)),
      },
    ]);
  };

  const signOutAll = () => {
    Alert.alert('Sign Out All Sessions', 'This will end all other active sessions.', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out All', style: 'destructive',
        onPress: () => setSessions([]),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SECURITY</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── PASSWORD ── */}
        <SectionLabel text="PASSWORD" />
        <RowCard>
          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Change Password', 'Password change flow coming soon.')}
          >
            <View style={styles.iconBox}><KeyIcon /></View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Change Password</Text>
              <Text style={styles.rowSubtitle}>Last changed 30 days ago</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </RowCard>

        {/* ── TWO-FACTOR AUTHENTICATION ── */}
        <SectionLabel text="TWO-FACTOR AUTHENTICATION" />
        <RowCard>
          {/* 2FA Toggle Row */}
          <SettingRow
            icon={<ShieldIcon />}
            title="Two-Factor Auth (2FA)"
            subtitle={twoFaEnabled ? 'Active — Email OTP' : 'Disabled'}
            subtitleColor={twoFaEnabled ? '#10B981' : '#6B7280'}
            right={
              <Switch
                value={twoFaEnabled}
                onValueChange={setTwoFaEnabled}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#374151"
              />
            }
          />
          <View style={styles.divider} />
          {/* Authenticator App Row */}
          <TouchableOpacity
            style={styles.settingRow}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Authenticator App', 'Authenticator app setup coming soon.')}
          >
            <View style={styles.iconBox}><PhoneIcon /></View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Authenticator App</Text>
              <Text style={styles.rowSubtitle}>Set up Google / Authy for stronger 2FA</Text>
            </View>
            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
        </RowCard>

        {/* ── ACTIVE SESSIONS ── */}
        <SectionLabel text="ACTIVE SESSIONS" />
        <RowCard>
          {/* Current device — always shown */}
          <View style={styles.settingRow}>
            <View style={styles.iconBox}><PhoneIcon /></View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>This device</Text>
              <Text style={styles.rowSubtitle}>Active now</Text>
            </View>
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>Current</Text>
            </View>
          </View>

          {/* Other sessions */}
          {sessions.map((session) => (
            <View key={session.id}>
              <View style={styles.divider} />
              <View style={styles.settingRow}>
                <View style={styles.iconBox}><LaptopIcon /></View>
                <View style={styles.rowText}>
                  <Text style={styles.rowTitle}>{session.device}</Text>
                  <Text style={styles.rowSubtitle}>{session.location}</Text>
                </View>
                <TouchableOpacity onPress={() => signOutSession(session.id)}>
                  <Text style={styles.signOutText}>Sign out</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

          {sessions.length === 0 && (
            <>
              <View style={styles.divider} />
              <Text style={styles.noSessionsText}>No other active sessions</Text>
            </>
          )}
        </RowCard>

        {/* Sign Out All Button */}
        <TouchableOpacity style={styles.signOutAllBtn} onPress={signOutAll} activeOpacity={0.8}>
          <Text style={styles.signOutAllText}>SIGN OUT ALL OTHER SESSIONS</Text>
        </TouchableOpacity>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0D1117',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 28,
  },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#FFFFFF',
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // Section label
  sectionLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#4B5563',
    marginBottom: 10,
    marginTop: 4,
  },

  // Card container
  rowCard: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
    marginBottom: 24,
  },

  // Row
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(245,158,11,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F1F5F9',
    marginBottom: 2,
  },
  rowSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  chevron: {
    fontSize: 22,
    color: '#4B5563',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginHorizontal: 16,
  },

  // Current badge
  currentBadge: {
    backgroundColor: 'rgba(16,185,129,0.15)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  currentBadgeText: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '700',
  },

  // Sign out link (per session)
  signOutText: {
    color: '#EF4444',
    fontSize: 13,
    fontWeight: '600',
  },

  // No sessions
  noSessionsText: {
    color: '#4B5563',
    fontSize: 13,
    textAlign: 'center',
    paddingVertical: 16,
  },

  // Sign out all button
  signOutAllBtn: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    paddingVertical: 16,
    alignItems: 'center',
  },
  signOutAllText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#94A3B8',
  },
});
