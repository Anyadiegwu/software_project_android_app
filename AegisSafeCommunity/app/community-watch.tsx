import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { AuthStorage } from '../src/utils/authStorage';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const getBaseUrl = () => process.env.EXPO_PUBLIC_BASE_URL || 'http://10.170.172.2:5000';

// ─── Icons ────────────────────────────────────────────────────────────────────
const SearchIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Circle cx="11" cy="11" r="7" stroke="#4B5563" strokeWidth="1.8" />
    <Path d="M16.5 16.5L21 21" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const FilterIcon = () => (
  <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
    <Path d="M4 6h16M7 12h10M10 18h4" stroke="#94A3B8" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const EyeIcon = () => (
  <Svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#F59E0B" strokeWidth="2" />
    <Circle cx="12" cy="12" r="3" stroke="#F59E0B" strokeWidth="2" />
  </Svg>
);

const WarnIcon = ({ color = '#F59E0B' }: { color?: string }) => (
  <Svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    <Path d="M12 9v4M12 17h.01" stroke={color} strokeWidth="2" strokeLinecap="round" />
  </Svg>
);

const CheckIcon = () => (
  <Svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17l-5-5" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PrayIcon = () => (
  <Svg width="13" height="13" viewBox="0 0 24 24" fill="none">
    <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" stroke="#8B5CF6" strokeWidth="1.5" />
  </Svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
interface ApiReport {
  _id: string;
  reporter: { name: string } | null;
  type: 'crime' | 'incident' | 'emergency';
  category: string;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location?: { lat?: number; lng?: number; address?: string };
  isAnonymous: boolean;
  status: string;
  evidence: string[];
  createdAt: string;
}

type AlertSeverity = 'HIGH' | 'UPDATE' | 'CAUTION';
type Tab = 'ALL' | 'ALERTS' | 'UPDATES' | 'TOWN HALLS';

interface WatchAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  body: string;
  timeAgo: string;
  distance?: string;
  tag?: string;
  reactions: { eye?: number; warn?: number; pray?: number; check?: number };
  verified?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function toSeverity(report: ApiReport): AlertSeverity {
  if (report.urgency === 'critical' || report.urgency === 'high') return 'HIGH';
  if (report.status === 'resolved' || report.status === 'in_progress') return 'UPDATE';
  return 'CAUTION';
}

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr ago`;
  return `${Math.floor(hrs / 24)} days ago`;
}

function distanceKm(
  lat1: number, lng1: number,
  lat2?: number, lng2?: number,
): number | undefined {
  if (lat2 == null || lng2 == null) return undefined;
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function normalise(report: ApiReport): WatchAlert {
  const severity = toSeverity(report);

  const categoryLabel = report.category
    ? report.category.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : report.type.replace(/\b\w/g, c => c.toUpperCase());
  const title = report.description
    ? report.description.slice(0, 80) + (report.description.length > 80 ? '…' : '')
    : `${categoryLabel} reported`;

  const seed = parseInt(report._id.slice(-4), 16);
  const reactions: WatchAlert['reactions'] =
    severity === 'HIGH'
      ? { eye: (seed % 20) + 1, warn: (seed % 10) + 1 }
      : severity === 'UPDATE'
        ? { check: (seed % 30) + 5, pray: (seed % 15) + 1 }
        : { eye: (seed % 12) + 1, warn: (seed % 25) + 3 };

  return {
    id: report._id,
    severity,
    title,
    body: report.description ?? 'No additional details provided.',
    timeAgo: timeAgo(report.createdAt),
    tag: severity === 'UPDATE' ? 'Area Update' : undefined,
    reactions,
    verified: !report.isAnonymous,
  };
}

// ─── API call ─────────────────────────────────────────────────────────────────
async function fetchCommunityWatch(token: string): Promise<ApiReport[]> {
  const res = await fetch(`${getBaseUrl()}/api/reporter/community-watch`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Server error:', res.status, errorText);
    throw new Error(`Server error ${res.status}: ${errorText}`);
  }

  return res.json();
}

// ─── Severity config ──────────────────────────────────────────────────────────
const SEVERITY_CONFIG: Record<AlertSeverity, { bar: string; badge: string; text: string }> = {
  HIGH: { bar: '#EF4444', badge: 'rgba(239,68,68,0.15)', text: '#EF4444' },
  UPDATE: { bar: '#10B981', badge: 'rgba(16,185,129,0.15)', text: '#10B981' },
  CAUTION: { bar: '#F59E0B', badge: 'rgba(245,158,11,0.15)', text: '#F59E0B' },
};

// ─── Alert Card ───────────────────────────────────────────────────────────────
function AlertCard({ item }: { item: WatchAlert }) {
  const cfg = SEVERITY_CONFIG[item.severity];
  const [reacted, setReacted] = useState(false);

  return (
    <View style={[styles.card, { borderLeftColor: cfg.bar }]}>
      <View style={styles.cardTitleRow}>
        <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
        <View style={[styles.severityBadge, { backgroundColor: cfg.badge }]}>
          <Text style={[styles.severityText, { color: cfg.text }]}>{item.severity}</Text>
        </View>
      </View>

      <Text style={styles.cardBody}>{item.body}</Text>

      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>{item.timeAgo}</Text>
        {item.tag && (
          <>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.cardMetaText}>{item.tag}</Text>
          </>
        )}
        {item.verified && (
          <>
            <Text style={styles.metaDot}>·</Text>
            <Text style={styles.verifiedText}>Verified resident</Text>
          </>
        )}
      </View>

      <View style={styles.reactionsRow}>
        {item.reactions.eye !== undefined && (
          <TouchableOpacity style={styles.reactionPill} onPress={() => setReacted(v => !v)}>
            <EyeIcon />
            <Text style={styles.reactionCount}>{item.reactions.eye}</Text>
          </TouchableOpacity>
        )}
        {item.reactions.warn !== undefined && (
          <TouchableOpacity style={styles.reactionPill}>
            <WarnIcon color="#F59E0B" />
            <Text style={styles.reactionCount}>{item.reactions.warn}</Text>
          </TouchableOpacity>
        )}
        {item.reactions.pray !== undefined && (
          <TouchableOpacity style={styles.reactionPill}>
            <PrayIcon />
            <Text style={styles.reactionCount}>{item.reactions.pray}</Text>
          </TouchableOpacity>
        )}
        {item.reactions.check !== undefined && (
          <TouchableOpacity style={[styles.reactionPill, styles.reactionPillGreen]}>
            <CheckIcon />
            <Text style={[styles.reactionCount, { color: '#10B981' }]}>{item.reactions.check}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
const TABS: Tab[] = ['ALL', 'ALERTS', 'UPDATES', 'TOWN HALLS'];

export default function CommunityWatchScreen() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('ALL');
  const [search, setSearch] = useState('');
  const [alerts, setAlerts] = useState<WatchAlert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get token on mount
  useEffect(() => {
    (async () => {
      const t = await AuthStorage.getToken();
      setToken(t);
    })();
  }, []);

  // Fetch data when token is available
  const load = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError(null);
      const raw = await fetchCommunityWatch(token);
      setAlerts(raw.map(r => normalise(r)));
    } catch (err: any) {
      setError(err.message ?? 'Failed to load alerts');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  // Client-side tab + search filter
  const filtered = alerts.filter(a => {
    const matchesTab =
      activeTab === 'ALL' ||
      (activeTab === 'ALERTS' && a.severity === 'HIGH') ||
      (activeTab === 'UPDATES' && a.severity === 'UPDATE') ||
      (activeTab === 'TOWN HALLS' && false);
    const matchesSearch =
      search === '' ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.body.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>COMMUNITY WATCH</Text>
        <TouchableOpacity onPress={() => Alert.alert('Post Alert', 'Post alert coming soon.')}>
          <Text style={styles.postBtn}>+ POST</Text>
        </TouchableOpacity>
      </View>

      {/* Verified banner */}
      <View style={styles.verifiedBanner}>
        <Text style={styles.verifiedBannerText}>
          {"You're verified as a resident. Community alerts you post are trusted by your neighbours."}
        </Text>
      </View>

      {/* Search + Filter */}
      <View style={styles.searchRow}>
        <View style={styles.searchBox}>
          <SearchIcon />
          <TextInput
            style={styles.searchInput}
            placeholder="Search alerts, locations..."
            placeholderTextColor="#4B5563"
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <FilterIcon />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsScrollView}
        contentContainerStyle={styles.tabsContent}
      >
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Alert Feed */}
      <ScrollView
        contentContainerStyle={styles.feed}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.emptyState}>
            <ActivityIndicator color="#2DD4BF" />
          </View>
        ) : error ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyStateText, { color: '#EF4444', marginBottom: 12 }]}>
              {error}
            </Text>
            <TouchableOpacity onPress={load}>
              <Text style={{ color: '#2DD4BF', fontSize: 13, fontWeight: '700' }}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No alerts in this category</Text>
          </View>
        ) : (
          filtered.map(item => <AlertCard key={item.id} item={item} />)
        )}
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
  postBtn: {
    color: '#2DD4BF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Verified banner
  verifiedBanner: {
    marginHorizontal: 16,
    marginTop: 12,
    backgroundColor: 'rgba(45,212,191,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.2)',
    borderRadius: 10,
    padding: 12,
  },
  verifiedBannerText: {
    fontSize: 12,
    color: '#2DD4BF',
    lineHeight: 18,
  },

  // Search
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 14,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
  },
  filterBtn: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Tabs
  tabsScrollView: {
    marginTop: 14,
    flexGrow: 0,
  },
  tabsContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  tabActive: {
    backgroundColor: 'rgba(45,212,191,0.15)',
    borderColor: '#2DD4BF',
  },
  tabText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    color: '#6B7280',
  },
  tabTextActive: {
    color: '#2DD4BF',
  },

  // Feed
  feed: {
    paddingHorizontal: 16,
    paddingTop: 14,
  },

  // Alert Card
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 10,
  },
  cardTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#F1F5F9',
    lineHeight: 20,
  },
  severityBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
  },
  severityText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardBody: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 12,
  },
  cardMetaText: {
    fontSize: 11,
    color: '#4B5563',
  },
  metaDot: {
    color: '#374151',
    fontSize: 11,
  },
  verifiedText: {
    fontSize: 11,
    color: '#2DD4BF',
    fontWeight: '600',
  },

  // Reactions
  reactionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  reactionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(245,158,11,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.2)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  reactionPillGreen: {
    backgroundColor: 'rgba(16,185,129,0.08)',
    borderColor: 'rgba(16,185,129,0.2)',
  },
  reactionCount: {
    fontSize: 12,
    fontWeight: '700',
    color: '#F59E0B',
  },

  // Empty / loading state
  emptyState: {
    paddingTop: 60,
    alignItems: 'center',
  },
  emptyStateText: {
    color: '#4B5563',
    fontSize: 14,
  },
});