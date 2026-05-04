import React from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

// ─── Types ────────────────────────────────────────────────────────────────────
type Attendee = { initials: string; color: string };

// ─── Avatar Stack ─────────────────────────────────────────────────────────────
function AvatarStack({ attendees }: { attendees: Attendee[] }) {
  return (
    <View style={styles.avatarStack}>
      {attendees.map((a, i) => (
        <View
          key={i}
          style={[
            styles.avatar,
            { backgroundColor: a.color, marginLeft: i === 0 ? 0 : -8, zIndex: attendees.length - i },
          ]}
        >
          <Text style={styles.avatarText}>{a.initials}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Upcoming Event Card ──────────────────────────────────────────────────────
function UpcomingCard({
  timing,
  title,
  location,
  date,
  description,
  attendees,
  actionLabel,
  onAction,
}: {
  timing: string;
  title: string;
  location: string;
  date: string;
  description: string;
  attendees: Attendee[];
  actionLabel: string;
  onAction: () => void;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTiming}>{timing}</Text>
      <Text style={styles.cardTitle}>{title}</Text>

      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>📍 {location}</Text>
        <Text style={styles.cardMetaDot}>·</Text>
        <Text style={styles.cardMetaText}>📅 {date}</Text>
      </View>

      <Text style={styles.cardDesc}>{description}</Text>

      <View style={styles.cardFooter}>
        <AvatarStack attendees={attendees} />
        <TouchableOpacity onPress={onAction}>
          <Text style={styles.cardAction}>{actionLabel} →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Past Town Hall Row ───────────────────────────────────────────────────────
function PastRow({ title, date, attendees }: { title: string; date: string; attendees: string }) {
  return (
    <View style={styles.pastRow}>
      <View style={styles.pastDot} />
      <View style={styles.pastInfo}>
        <Text style={styles.pastTitle}>{title}</Text>
        <Text style={styles.pastMeta}>{date} · {attendees}</Text>
      </View>
      <View style={styles.summaryBadge}>
        <Text style={styles.summaryBadgeText}>SUMMARY</Text>
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function TownHallsScreen() {
  const router = useRouter();

  const rsvp = () =>
    Alert.alert('RSVP', 'You have been registered for this Town Hall!', [{ text: 'Great!' }]);

  const register = () =>
    Alert.alert('Register', 'You have been registered for this event!', [{ text: 'Got it' }]);

  const viewArchive = () =>
    Alert.alert('Archive', 'Full archive coming soon.');

  return (
    <SafeAreaView style={styles.root}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TOWN HALLS</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Upcoming · Tomorrow ── */}
        <UpcomingCard
          timing="UPCOMING · TOMORROW, 2:00 PM"
          title="Community Policing Forum — Wuse 2 & Maitama"
          location="Transcorp Hilton Conference Hall"
          date="Mar 29"
          description="An open dialogue between the FCT Police Command and residents on improving response times and community trust. Q&A session included."
          attendees={[
            { initials: 'K', color: '#10B981' },
            { initials: 'A', color: '#8B5CF6' },
            { initials: 'T', color: '#F59E0B' },
            { initials: '+', color: '#374151' },
          ]}
          actionLabel="RSVP"
          onAction={rsvp}
        />

        {/* ── Next Week ── */}
        <UpcomingCard
          timing="NEXT WEEK · APR 5, 10:00 AM"
          title="Police Reform Review — Civil Society Roundtable"
          location="Online (Zoom)"
          date="Apr 5"
          description="Quarterly review of the Aegis platform effectiveness and proposed amendments to community policing procedures."
          attendees={[
            { initials: 'R', color: '#EF4444' },
            { initials: 'M', color: '#3B82F6' },
          ]}
          actionLabel="Register"
          onAction={register}
        />

        {/* ── Past Town Halls ── */}
        <View style={styles.pastSection}>
          <View style={styles.pastHeader}>
            <Text style={styles.pastHeaderLabel}>PAST TOWN HALLS</Text>
            <TouchableOpacity onPress={viewArchive}>
              <Text style={styles.pastArchiveLink}>View archive →</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pastCard}>
            <PastRow
              title="March Community Policing Forum — Summary"
              date="Mar 15"
              attendees="47 attendees"
            />
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0F172A',
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
    color: '#2DD4BF',
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  // ── Event Card ──
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardTiming: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#2DD4BF',
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    lineHeight: 26,
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  cardMetaDot: {
    color: '#4B5563',
    fontSize: 12,
  },
  cardDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAction: {
    color: '#2DD4BF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Avatar stack
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // ── Past Section ──
  pastSection: {
    marginTop: 4,
    marginBottom: 8,
  },
  pastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pastHeaderLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#4B5563',
  },
  pastArchiveLink: {
    color: '#2DD4BF',
    fontSize: 12,
    fontWeight: '600',
  },
  pastCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  pastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  pastDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  pastInfo: {
    flex: 1,
  },
  pastTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F1F5F9',
    marginBottom: 3,
  },
  pastMeta: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryBadge: {
    backgroundColor: 'rgba(45,212,191,0.15)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  summaryBadgeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: '#2DD4BF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
