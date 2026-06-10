
import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AuthStorage } from '../../src/utils/authStorage';
import { BASE_URL } from '../../src/config/api';

// ─── Types ────────────────────────────────────────────────────────────────────
type Severity = 'HIGH' | 'MEDIUM' | 'LOW';
type FilterTab = 'ALL' | 'UNDER REVIEW' | 'IN PROGRESS' | 'RESOLVED' | 'DRAFTS';

// ── Raw shape returned by the backend ────────────────────────────────────────
interface BackendReport {
  _id: string;
  type: 'crime' | 'incident' | 'emergency';
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  status: 'pending' | 'under_review' | 'assigned' | 'in_progress' | 'resolved' | 'rejected';
  isAnonymous: boolean;
  evidence: string[];
  location?: { lat: number; lng: number; address: string };
  createdAt: string;
  timeline: { status: string; note: string; date: string }[];
}

// ── Normalised shape used by the UI ──────────────────────────────────────────
interface Report {
  id: string;
  caseId: string;
  title: string;
  severity: Severity;
  status: 'UNDER REVIEW' | 'IN PROGRESS' | 'RESOLVED' | 'DRAFTS' | 'PENDING';
  timeAgo: string;
  anonymous: boolean;
  progress: number; // 0–100
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Map backend urgency → UI severity badge */
const urgencyToSeverity = (urgency: BackendReport['urgency']): Severity => {
  if (urgency === 'critical' || urgency === 'high') return 'HIGH';
  if (urgency === 'medium') return 'MEDIUM';
  return 'LOW';
};

/** Map backend status → UI status label */
const backendStatusToUI = (status: BackendReport['status']): Report['status'] => {
  switch (status) {
    case 'under_review': return 'UNDER REVIEW';
    case 'assigned':
    case 'in_progress': return 'IN PROGRESS';
    case 'resolved': return 'RESOLVED';
    case 'rejected': return 'DRAFTS';   // rejected shown under DRAFTS tab
    case 'pending':
    default: return 'PENDING';
  }
};

/** Map backend status → progress percentage */
const statusToProgress = (status: BackendReport['status']): number => {
  switch (status) {
    case 'pending': return 10;
    case 'under_review': return 25;
    case 'assigned': return 45;
    case 'in_progress': return 65;
    case 'resolved': return 100;
    case 'rejected': return 0;
    default: return 0;
  }
};

/** Build a human-readable title from category + description */
const buildTitle = (report: BackendReport): string => {
  const categoryLabel: Record<string, string> = {
    theft: 'Theft/Robbery',
    assault: 'Assault',
    suspicious_activity: 'Suspicious Activity',
    vandalism: 'Vandalism',
    medical: 'Medical Emergency',
    accident: 'Accident',
    fire: 'Fire',
    kidnapping: 'Kidnapping',
    robbery: 'Robbery',
    other: 'Incident',
  };

  const label = categoryLabel[report.category] ?? 'Incident';
  const location = report.location?.address ?? '';

  // Prefer a trimmed description as title if short enough
  if (report.description && report.description.length < 80) {
    // Strip injected time context prefixes added by the app
    const clean = report.description.replace(/^\[.*?\]\s*/, '').trim();
    if (clean.length > 0) return clean;
  }

  return location ? `${label} — ${location}` : label;
};

/** Relative time string from ISO date */
const timeAgo = (iso: string): string => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  const weeks = Math.floor(days / 7);

  if (mins < 2) return 'Just now';
  if (mins < 60) return `${mins} mins ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
  return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
};

/** Normalise a backend report into the UI shape */
const normalise = (r: BackendReport): Report => ({
  id: r._id,
  caseId: r.status !== 'pending' && r.status !== 'rejected'
    ? `AGS-${new Date(r.createdAt).getFullYear()}-${r._id.slice(-5).toUpperCase()}`
    : '',
  title: buildTitle(r),
  severity: urgencyToSeverity(r.urgency),
  status: backendStatusToUI(r.status),
  timeAgo: timeAgo(r.createdAt),
  anonymous: r.isAnonymous,
  progress: statusToProgress(r.status),
});

// ─── Config ───────────────────────────────────────────────────────────────────
const SEVERITY_COLORS: Record<Severity, string> = {
  HIGH: '#EF4444',
  MEDIUM: '#F59E0B',
  LOW: '#10B981',
};

const STATUS_COLORS: Record<string, string> = {
  'UNDER REVIEW': '#F59E0B',
  'IN PROGRESS': '#3B82F6',
  'RESOLVED': '#10B981',
  'DRAFTS': '#6B7280',
  'PENDING': '#9333EA',
};

const PROGRESS_COLORS: Record<string, string> = {
  'UNDER REVIEW': '#F59E0B',
  'IN PROGRESS': '#3B82F6',
  'RESOLVED': '#10B981',
  'DRAFTS': '#374151',
  'PENDING': '#9333EA',
};

// ─── Report Card ──────────────────────────────────────────────────────────────
function ReportCard({ item }: { item: Report }) {
  const sColor = STATUS_COLORS[item.status] ?? '#6B7280';
  const pColor = PROGRESS_COLORS[item.status] ?? '#374151';
  const sevColor = SEVERITY_COLORS[item.severity];

  return (
    <View style={styles.card}>
      {/* Title + Severity badge */}
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={[styles.sevBadge, { backgroundColor: `${sevColor}22` }]}>
          <Text style={[styles.sevText, { color: sevColor }]}>{item.severity}</Text>
        </View>
      </View>

      {/* Status chip + Case ID */}
      <View style={styles.chipRow}>
        <View style={[styles.statusChip, { backgroundColor: `${sColor}22` }]}>
          <Text style={[styles.statusChipText, { color: sColor }]}>{item.status}</Text>
        </View>
        {item.caseId !== '' && (
          <View style={styles.caseIdChip}>
            <Text style={styles.caseIdText}>{item.caseId}</Text>
          </View>
        )}
      </View>

      {/* Meta */}
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>{item.timeAgo}</Text>
        <Text style={styles.metaDot}>·</Text>
        <Text style={styles.metaText}>{item.anonymous ? 'Anonymous' : 'Public'}</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <Text style={styles.progressLabel}>CASE PROGRESS</Text>
        <Text style={[styles.progressPct, { color: pColor }]}>{item.progress}%</Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${item.progress}%` as any, backgroundColor: pColor }]} />
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

// NOTE ─ 'PENDING' is an extra UI tab not in the original mock.
// Add it here so newly submitted reports (status: "pending") are visible.
// If you want to hide it, remove 'PENDING' from FILTER_TABS below.
const FILTER_TABS: FilterTab[] = ['ALL', 'UNDER REVIEW', 'IN PROGRESS', 'RESOLVED', 'DRAFTS'];

export default function ReportsTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const params = useLocalSearchParams<{ newReport?: string }>();

  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [active, setActive] = useState<FilterTab>('ALL');

  // Auto-navigate to new-report screen when coming from home
  useEffect(() => {
    if (params.newReport === 'true') {
      router.setParams({ newReport: undefined });
      router.push('/new-report');
    }
  }, [params.newReport]);

  // ── Fetch reports from backend ──────────────────────────────────────────────
  const fetchReports = useCallback(async (silent = false) => {
    if (!silent) setLoading(true);
    setError(null);

    try {
      const token = await AuthStorage.getToken();
      const url = `${BASE_URL}/api/reporter/my-reports`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message ?? 'Failed to load reports.');
        return;
      }

      const data: BackendReport[] = await response.json();
      setReports(data.map(normalise));

    } catch (err) {
      setError('Network error. Pull down to retry.');
      console.error('fetchReports error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchReports(true);
  };

  // ── Filter logic ────────────────────────────────────────────────────────────
  const filtered = active === 'ALL'
    ? reports
    : reports.filter(r => r.status === active);

  const countFor = (tab: FilterTab) =>
    tab === 'ALL' ? reports.length : reports.filter(r => r.status === tab).length;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MY REPORTS</Text>
        <View style={{ width: 36 }} />
      </View>

      {/* Filter chips */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={FILTER_TABS}
        keyExtractor={t => t}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
        renderItem={({ item: tab }) => {
          const count = countFor(tab);
          const isActive = tab === active;
          return (
            <TouchableOpacity
              style={[styles.filterChip, isActive && styles.filterChipActive]}
              onPress={() => setActive(tab)}
            >
              <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                {tab}{count > 0 ? ` (${count})` : ''}
              </Text>
            </TouchableOpacity>
          );
        }}
      />

      {/* Loading state */}
      {loading ? (
        <View style={styles.centeredState}>
          <ActivityIndicator color="#2DD4BF" size="large" />
          <Text style={styles.loadingText}>Loading your reports...</Text>
        </View>
      ) : error ? (
        /* Error state */
        <View style={styles.centeredState}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryBtn} onPress={() => fetchReports()}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        /* Report list */
        <FlatList
          data={filtered}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ReportCard item={item} />}
          contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom + 25, 100) }]}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor="#2DD4BF"
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No {active.toLowerCase()} reports.</Text>
            </View>
          }
        />
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/new-report')}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+ New Report</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D1117' },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center', alignItems: 'center',
  },
  backIcon: { color: '#FFFFFF', fontSize: 24, lineHeight: 28 },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12, fontWeight: '700', letterSpacing: 2, color: '#2DD4BF',
  },

  // Filters
  filterScroll: { flexGrow: 0, marginTop: 25, height: 35 },
  filterContent: { paddingHorizontal: 16, gap: 8 },
  filterChip: {
    paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  filterChipActive: {
    backgroundColor: 'rgba(45,212,191,0.12)',
    borderColor: '#2DD4BF',
  },
  filterChipText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 0.5, color: '#6B7280',
  },
  filterChipTextActive: { color: '#2DD4BF' },

  // List
  listContent: { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 110 },

  // Card
  card: {
    backgroundColor: '#161B22',
    borderRadius: 14, padding: 16, marginBottom: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)',
  },
  cardTitleRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    justifyContent: 'space-between', gap: 10, marginBottom: 10,
  },
  cardTitle: {
    flex: 1, fontSize: 15, fontFamily: 'serif',
    fontWeight: '700', color: '#F1F5F9', lineHeight: 22,
  },
  sevBadge: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start' },
  sevText: { fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', fontSize: 9, fontWeight: '700', letterSpacing: 0.5 },

  chipRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 },
  statusChip: { borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  statusChipText: { fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', fontSize: 9, fontWeight: '700', letterSpacing: 0.4 },
  caseIdChip: { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3 },
  caseIdText: { fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', fontSize: 9, color: '#4B5563', letterSpacing: 0.4 },

  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  metaText: { fontSize: 12, color: '#4B5563' },
  metaDot: { color: '#374151', fontSize: 12 },

  progressSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  progressLabel: { fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', fontSize: 9, fontWeight: '700', letterSpacing: 1, color: '#4B5563' },
  progressPct: { fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace', fontSize: 9, fontWeight: '700' },
  progressTrack: { height: 3, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' },
  progressFill: { height: 3, borderRadius: 99 },

  // Loading / Error / Empty
  centeredState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12, paddingTop: 60 },
  loadingText: { color: '#4B5563', fontSize: 13 },
  errorText: { color: '#EF4444', fontSize: 13, textAlign: 'center', paddingHorizontal: 32 },
  retryBtn: { backgroundColor: 'rgba(45,212,191,0.12)', borderRadius: 8, paddingHorizontal: 20, paddingVertical: 10, borderWidth: 1, borderColor: '#2DD4BF' },
  retryText: { color: '#2DD4BF', fontWeight: '700', fontSize: 13 },
  emptyState: { paddingTop: 60, alignItems: 'center' },
  emptyText: { color: '#4B5563', fontSize: 14 },

  // FAB
  fab: {
    position: 'absolute', bottom: 166, right: 30,
    backgroundColor: '#45D0B1',
    paddingHorizontal: 20, paddingVertical: 14,
    borderRadius: 30, elevation: 8,
    shadowColor: '#45D0B1', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4, shadowRadius: 10,
  },
  fabText: { color: '#0D1117', fontWeight: '700', fontSize: 14 },
});