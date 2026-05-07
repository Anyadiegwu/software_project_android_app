import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions,
    Platform,
    StatusBar,
    Alert,
    Animated,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import CarIcon from '../../components/icons/CarIcon';
import OfficerMapView from '../../components/OfficerMapView';
import { colors } from '../../theme/index';
import { clearUserSession, loadUserProfile } from '../../utils/userStorage';
import { AuthStorage } from '../../utils/authStorage';

// ─── CONFIG ───────────────────────────────────────────────────────────────────

const getBaseUrl = () => process.env.EXPO_PUBLIC_BASE_URL || 'http://10.170.172.2:5000';
const API_BASE = getBaseUrl();


// ─── SVG Icons (unchanged) ────────────────────────────────────────────────────
const ProfileIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 11a4 4 0 100-8 4 4 0 000 8z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const PinIcon = ({ color = '#EF4444' }) => (
    <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const MenuIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M4 6h16M4 12h16M4 18h16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const BellIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M13.73 21a2 2 0 01-3.46 0" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const HomeIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M9 22V12h6v10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const ClipboardIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const MapIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M8 2v16M16 6v16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const CustomWhistleblowerIcon = ({ color = '#F59E0B' }) => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Path d="M7.41667 7.50008C5.98008 7.50008 4.60233 8.07076 3.5865 9.08659C2.57068 10.1024 2 11.4802 2 12.9167C2 13.6281 2.14011 14.3324 2.41232 14.9896C2.68453 15.6468 3.08352 16.2439 3.5865 16.7469C4.60233 17.7627 5.98008 18.3334 7.41667 18.3334C8.12799 18.3334 8.83235 18.1933 9.48953 17.9211C10.1467 17.6489 10.7438 17.2499 11.2468 16.7469C11.7498 16.2439 12.1488 15.6468 12.421 14.9896C12.6932 14.3324 12.8333 13.6281 12.8333 12.9167V11.5917L18.6667 10.0001V7.50008H9.5V9.16675H7.83333V7.50008H7.41667ZM9.5 1.66675V5.83341H7.83333V1.66675H9.5ZM5.625 6.06675C5.06667 6.20008 4.53333 6.40008 4.025 6.66675L2.11667 4.06675L3.46667 3.08341L5.625 6.06675ZM15.2167 4.06675L13.9333 5.83341H11.875L13.8667 3.08341L15.2167 4.06675Z" fill={color} />
    </Svg>
);

const CustomSignOutIcon = ({ color = '#F59E0B' }) => (
    <Svg width="20" height="20" viewBox="0 0 12 12" fill="none">
        <Path d="M7.5 2H9C9.5523 2 10 2.44771 10 3V9C10 9.5523 9.5523 10 9 10H7.5" stroke={color} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M4 4L2 6L4 8" stroke={color} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M2 6H8" stroke={color} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const CustomKeyIcon = ({ color = '#F59E0B' }) => (
    <Svg width="22" height="22" viewBox="0 0 40 40" fill="none">
        <Path d="M18.8672 12.0171C20.1366 11.2388 21.6317 10.9111 23.1104 11.0864C24.589 11.2618 25.9654 11.9303 27.0176 12.9839C27.9436 13.9098 28.5751 15.0893 28.8311 16.3735C29.0869 17.6578 28.9563 18.9896 28.4561 20.1997C27.9557 21.4098 27.1076 22.4448 26.0195 23.1733C24.9314 23.9019 23.6513 24.2918 22.3418 24.2935H22.333C21.6362 24.2945 20.9438 24.1848 20.2812 23.9692L20.2568 23.9614L20.2383 23.98L19.4424 24.7769C19.3843 24.8349 19.3151 24.8812 19.2393 24.9126C19.1634 24.944 19.0821 24.9605 19 24.9604H17.625V26.3354C17.6249 26.5011 17.5585 26.6597 17.4414 26.7769C17.3242 26.8939 17.1657 26.9604 17 26.9604H15.625V28.3354C15.6249 28.5011 15.5585 28.6597 15.4414 28.7769C15.3242 28.8939 15.1657 28.9604 15 28.9604H12.333C11.9906 28.9604 11.6621 28.8237 11.4199 28.5815C11.1778 28.3393 11.042 28.0109 11.042 27.6685V25.2778C11.0415 25.1082 11.0747 24.9394 11.1396 24.7827C11.2046 24.6263 11.2997 24.4841 11.4199 24.3647L16.04 19.7446L16.0322 19.7202C15.5703 18.3047 15.5982 16.7748 16.1123 15.3774C16.6266 13.9799 17.5977 12.7956 18.8672 12.0171ZM23.7314 14.6528C23.4647 14.7059 23.2196 14.8375 23.0273 15.0298C22.8352 15.2221 22.7044 15.4673 22.6514 15.7339C22.5984 16.0005 22.6255 16.2767 22.7295 16.5278C22.8336 16.7791 23.0102 16.9939 23.2363 17.145C23.4624 17.296 23.7281 17.3765 24 17.3765C24.3645 17.3764 24.7139 17.2318 24.9717 16.9741C25.2295 16.7163 25.375 16.3661 25.375 16.0015C25.3749 15.7297 25.2945 15.4638 25.1436 15.2378C24.9926 15.0118 24.7774 14.836 24.5264 14.7319C24.2751 14.6279 23.9982 14.5998 23.7314 14.6528Z" fill={color} stroke="#0A0F1E" strokeWidth="0.0833322" />
    </Svg>
);

// ─── Static Mock Data (kept for Dispatch, Whistleblower, Performance tabs) ─────
const MOCK_UNITS = [
    { id: 'B-3', status: 'On scene', location: 'Apongbon Bridge', officers: '2 officers', type: 'Active', color: '#3B82F6' },
    { id: 'A-1', status: 'Patrolling', location: 'Victoria Island sector', type: 'Patrol', color: '#10B981' },
    { id: 'C-2', status: 'Available', location: 'HQ - Ready for deployment', type: 'Ready', color: '#6B7280' },
];

const MOCK_WHISTLEBLOWER = [
    {
        id: 'WB-1',
        title: 'Misconduct Allegation - Sector 4',
        status: 'NEW',
        time: '2h ago',
        source: 'Encrypted Source',
        description: 'Report of unauthorized unit movement and potential extortion at check-point 42.',
        actions: ['Review', 'Investigate']
    },
    {
        id: 'WB-2',
        title: 'Resource Misuse Report',
        status: 'REVIEW',
        time: '5h ago',
        source: 'Internal Source',
        description: 'Observation of department vehicle being used for personal transit outside shift hours.',
        actions: ['Assign IAD', 'Review']
    },
    {
        id: 'WB-3',
        title: 'Evidence Tampering Suspected',
        status: 'NEW',
        time: '1d ago',
        source: 'Verified Officer',
        description: 'Discrepancy in evidence log for case AEG-00891 compared to scene photos.',
        actions: ['Investigate', 'Review']
    }
];

const MINI_MAP_REGION = {
    latitude: 9.0765,
    longitude: 7.3986,
    latitudeDelta: 0.0522,
    longitudeDelta: 0.0221,
};

const MINI_MAP_STYLE = [
    { elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#4B5563' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1117' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1F2937' }] },
    { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#374151' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#1E3A5F' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0A1628' }] },
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins} min ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} hr ago`;
    const days = Math.floor(hrs / 24);
    return `${days} days ago`;
}

function priorityFromUrgency(urgency) {
    if (urgency === 'critical' || urgency === 'high') return 'HIGH';
    if (urgency === 'medium') return 'MEDIUM';
    return 'LOW';
}

function priorityColor(urgency) {
    if (urgency === 'critical' || urgency === 'high') return '#EF4444';
    if (urgency === 'medium') return '#F59E0B';
    return '#10B981';
}

function priorityBgColor(urgency) {
    if (urgency === 'critical' || urgency === 'high') return 'rgba(239, 68, 68, 0.1)';
    if (urgency === 'medium') return 'rgba(245, 158, 11, 0.1)';
    return 'rgba(16, 185, 129, 0.1)';
}

function statusLabel(status) {
    const map = {
        pending: 'PENDING',
        under_review: 'UNDER REVIEW',
        assigned: 'ASSIGNED',
        in_progress: 'IN PROGRESS',
        resolved: 'RESOLVED',
        rejected: 'REJECTED',
    };
    return map[status] || status.toUpperCase();
}

function statusColor(status) {
    if (status === 'in_progress') return '#3B82F6';
    if (status === 'resolved') return '#10B981';
    return '#F59E0B';
}

function statusBgColor(status) {
    if (status === 'in_progress') return 'rgba(59, 130, 246, 0.1)';
    if (status === 'resolved') return 'rgba(16, 185, 129, 0.1)';
    return 'rgba(245, 158, 11, 0.1)';
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [userName, setUserName] = useState('Officer');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [liveCounter, setLiveCounter] = useState(0);
    const [currentLocation, setCurrentLocation] = useState('LAGOS ISLAND');
    const [caseFilter, setCaseFilter] = useState('ALL');
    const [wbFilter, setWbFilter] = useState('RECENT');
    const [token, setToken] = useState(null);
    const [activeCase, setActiveCase] = useState(null);
    const [startTime, setStartTime] = useState(null);

    // ── API Data State ───────────────────────────────────────────────────────
    const [dashboardStats, setDashboardStats] = useState({ active: 0, resolved: 0, pending: 0 });
    const [reports, setReports] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loadingReports, setLoadingReports] = useState(true);
    const [loadingStats, setLoadingStats] = useState(true);

    // ── Report Form State ────────────────────────────────────────────────────
    const [reportStep, setReportStep] = useState(1);
    const [incidentType, setIncidentType] = useState('');
    const [urgency, setUrgency] = useState('Medium');
    const [description, setDescription] = useState('');
    const [suspects, setSuspects] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [submittingReport, setSubmittingReport] = useState(false);

    // ── Privacy State ────────────────────────────────────────────────────────
    const [privacySettings, setPrivacySettings] = useState({
        defaultAnonymity: true,
        sharePreciseLocation: true,
        areaSafetyAlerts: true,
        anonymousAnalytics: false,
        communityMapPresence: false,
    });

    const togglePrivacySetting = (key) => {
        setPrivacySettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleViewCase = (report) => {
        setActiveCase(report);
        if (report.status === 'in_progress' && !startTime) {
            setStartTime(new Date(report.updatedAt || report.createdAt).getTime());
        } else if (!startTime) {
            setStartTime(Date.now());
        }
        setActiveTab('case_in_progress');
    };

    // ── Drawer Animations ────────────────────────────────────────────────────
    const drawerWidth = Dimensions.get('window').width * 0.78;
    const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isDrawerOpen) {
            Animated.parallel([
                Animated.timing(slideAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
                Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, { toValue: -drawerWidth, duration: 250, useNativeDriver: true }),
                Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
            ]).start();
        }
    }, [isDrawerOpen]);

    const closeDrawer = () => {
        Animated.parallel([
            Animated.timing(slideAnim, { toValue: -drawerWidth, duration: 250, useNativeDriver: true }),
            Animated.timing(fadeAnim, { toValue: 0, duration: 250, useNativeDriver: true }),
        ]).start(() => setIsDrawerOpen(false));
    };

    // ── Get token on mount ───────────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            const t = await AuthStorage.getToken();
            setToken(t);
        })();
    }, []);

    // ── Location ─────────────────────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;
            const initial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
            try {
                const geo = await Location.reverseGeocodeAsync({
                    latitude: initial.coords.latitude,
                    longitude: initial.coords.longitude,
                });
                if (geo && geo.length > 0) {
                    const g = geo[0];
                    const name = g.district || g.subregion || g.city || g.region || 'LAGOS ISLAND';
                    setCurrentLocation(name.toUpperCase());
                }
            } catch (_) { }
        })();
    }, []);

    // ── User profile ──────────────────────────────────────────────────────────
    useEffect(() => {
        loadUserProfile().then((profile) => {
            if (profile?.displayName) {
                const name = profile.displayName.charAt(0).toUpperCase() + profile.displayName.slice(1);
                setUserName(name);
            }
        });
    }, []);

    // ── Live counter ──────────────────────────────────────────────────────────
    useEffect(() => {
        const t = setInterval(() => setLiveCounter(s => s + 1), 1000);
        return () => clearInterval(t);
    }, []);

    // ── API: Fetch Stats ──────────────────────────────────────────────────────
    const fetchStats = useCallback(async () => {
        if (!token) return;
        try {
            setLoadingStats(true);
            const url = `${getBaseUrl()}/api/security/stats`;
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setDashboardStats(data);
            }
        } catch (err) {
            console.error('Stats fetch error:', err.message);
        } finally {
            setLoadingStats(false);
        }
    }, [token]);

    // ── API: Fetch Reports ────────────────────────────────────────────────────
    const fetchReports = useCallback(async () => {
        if (!token) return;
        try {
            setLoadingReports(true);
            const url = `${getBaseUrl()}/api/security/reports`;
            const res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.ok) {
                const data = await res.json();
                setReports(data);
            }
        } catch (err) {
            console.error('Reports fetch error:', err.message);
        } finally {
            setLoadingReports(false);
        }
    }, [token]);

    // ── API: Fetch Notifications ──────────────────────────────────────────────
    const fetchNotifications = useCallback(async () => {
        if (!token) return;
        try {
            const [notifRes, countRes] = await Promise.all([
                fetch(`${getBaseUrl()}/api/notifications`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                fetch(`${getBaseUrl()}/api/notifications/unread-count`, {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);
            if (notifRes.ok) {
                const data = await notifRes.json();
                setNotifications(data);
            }
            if (countRes.ok) {
                const { count } = await countRes.json();
                setUnreadCount(count);
            }
        } catch (err) {
            console.error('Notifications fetch error:', err.message);
        }
    }, [token]);

    // ── API: Mark all notifications read ─────────────────────────────────────
    const markAllNotificationsRead = async () => {
        if (!token) return;
        try {
            const url = `${getBaseUrl()}/api/notifications/read-all`;
            await fetch(url, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
            });
            setUnreadCount(0);
            setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
        } catch (err) {
            console.error('Mark read error:', err.message);
        }
    };

    // ── API: Start Report ─────────────────────────────────────────────────────
    const handleStartReport = async (report) => {
        // Instant UI Transition (Optimistic UI)
        setActiveCase(report);
        setStartTime(Date.now());
        setActiveTab('case_in_progress');

        if (!token) {
            console.warn('No auth token found, UI transitioned but API call skipped.');
            return;
        }

        try {
            const url = `${getBaseUrl()}/api/security/report/${report._id}/start`;
            const res = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                fetchReports();
                fetchStats();
            } else {
                const data = await res.json();
                console.error('Failed to sync start status with server:', data.message);
                // We stay on the screen anyway for the demo/UX, but log the error
            }
        } catch (err) {
            console.error('Network error syncing case start:', err);
        }
    };

    // ── API: Resolve Report ───────────────────────────────────────────────────
    const handleResolveReport = async (reportId) => {
        if (!token) return;
        Alert.alert(
            'Resolve Report',
            'Mark this report as resolved?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Resolve',
                    onPress: async () => {
                        try {
                            const url = `${getBaseUrl()}/api/security/report/${reportId}/resolve`;
                            const res = await fetch(url, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                            });
                            if (res.ok) {
                                Alert.alert('Resolved', 'Report has been resolved.');
                                if (activeTab === 'case_in_progress') {
                                    setActiveTab('dashboard');
                                    setActiveCase(null);
                                }
                                fetchReports();
                                fetchStats();
                            } else {
                                const data = await res.json();
                                Alert.alert('Error', data.message || 'Failed to resolve report.');
                            }
                        } catch (_) {
                            Alert.alert('Network Error', 'Could not reach the server.');
                        }
                    }
                }
            ]
        );
    };

    // ── API: Submit Report (security officer filing a report) ─────────────────
    // NOTE: Security officers use the security routes. If your backend
    // doesn't have a dedicated security report submission route, this
    // posts to the reporter route which requires a reporter role.
    // Adjust the endpoint below to match your backend once added.
    const handleSubmitReport = async () => {
        if (!token) return;
        setSubmittingReport(true);
        try {
            const urgencyMap = { Low: 'low', Medium: 'medium', High: 'high' };
            const categoryMap = {
                theft: 'theft',
                assault: 'assault',
                suspicious: 'suspicious_activity',
                vandalism: 'vandalism',
                accident: 'accident',
                fire: 'fire',
            };

            const body = {
                type: incidentType === 'accident' || incidentType === 'fire' ? 'incident' : 'crime',
                category: categoryMap[incidentType] || 'other',
                urgency: urgencyMap[urgency] || 'medium',
                description,
                suspectsCount: suspects ? 1 : undefined,
                isAnonymous,
            };

            // Security officers file under the reporter endpoint.
            // If your backend adds /api/security/report POST, swap the URL.
            const url = `${getBaseUrl()}/api/reporter/report`;
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(body),
            });

            if (res.ok) {
                setReportStep(5); // success screen
            } else {
                const data = await res.json();
                Alert.alert('Submission Failed', data.error || data.message || 'Could not submit report.');
            }
        } catch (_) {
            Alert.alert('Network Error', 'Could not reach the server.');
        } finally {
            setSubmittingReport(false);
        }
    };

    // ── Fetch on mount / token change ─────────────────────────────────────────
    useEffect(() => {
        if (token) {
            fetchStats();
            fetchReports();
            fetchNotifications();
        }
    }, [token, fetchStats, fetchReports, fetchNotifications]);

    // ── Refresh on tab focus ──────────────────────────────────────────────────
    useEffect(() => {
        if (token) {
            if (activeTab === 'dashboard') {
                fetchStats();
                fetchReports();
                fetchNotifications();
            }
            if (activeTab === 'cases') {
                fetchReports();
                fetchStats();
            }
        }
    }, [activeTab]);

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                {/* ── Side Drawer ─────────────────────────────────────────── */}
                <Modal visible={isDrawerOpen} transparent animationType="none">
                    <View style={styles.drawerOverlay}>
                        <TouchableWithoutFeedback onPress={closeDrawer}>
                            <Animated.View style={[styles.drawerBackdrop, { opacity: fadeAnim }]} />
                        </TouchableWithoutFeedback>

                        <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
                            <View style={styles.drawerHeader}>
                                <View style={styles.drawerAvatar}>
                                    <Text style={styles.drawerAvatarText}>{userName.charAt(0)}</Text>
                                </View>
                                <View style={styles.drawerHeaderInfo}>
                                    <Text style={styles.drawerOfficerName}>Insp. {userName}</Text>
                                    <Text style={styles.drawerRoleText}>SECURITY PERSONNEL</Text>
                                </View>
                            </View>

                            <ScrollView style={styles.drawerMenu} showsVerticalScrollIndicator={false}>
                                <Text style={styles.drawerSectionLabel}>OPERATIONS</Text>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'dashboard' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('dashboard'); closeDrawer(); }}
                                >
                                    <Ionicons name="home" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'dashboard' && styles.drawerMenuTextActive]}>Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'cases' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('cases'); closeDrawer(); }}
                                >
                                    <Ionicons name="document-text-outline" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'cases' && styles.drawerMenuTextActive]}>Active Cases</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={styles.drawerMenuItem}
                                    onPress={() => {
                                        closeDrawer();
                                        markAllNotificationsRead();
                                        Alert.alert(
                                            'Notifications',
                                            notifications.length === 0
                                                ? 'No notifications.'
                                                : notifications.slice(0, 5).map(n => `• ${n.title}: ${n.message}`).join('\n')
                                        );
                                    }}
                                >
                                    <Ionicons name="notifications-outline" size={22} color="#F59E0B" />
                                    <Text style={styles.drawerMenuText}>Incoming Alerts</Text>
                                    {unreadCount > 0 && (
                                        <View style={styles.profileMenuBadge}>
                                            <Text style={styles.profileMenuBadgeText}>{unreadCount}</Text>
                                        </View>
                                    )}
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'dispatch' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('dispatch'); closeDrawer(); }}
                                >
                                    <Ionicons name="car-outline" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'dispatch' && styles.drawerMenuTextActive]}>Dispatch</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'map' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('map'); closeDrawer(); }}
                                >
                                    <Ionicons name="map-outline" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'map' && styles.drawerMenuTextActive]}>Live Incident Map</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'report' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('report'); setReportStep(1); closeDrawer(); }}
                                >
                                    <Ionicons name="add-circle-outline" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'report' && styles.drawerMenuTextActive]}>New Report</Text>
                                </TouchableOpacity>

                                <Text style={styles.drawerSectionLabel}>TEAM OVERVIEW</Text>

                                <TouchableOpacity
                                    style={styles.drawerMenuItem}
                                    onPress={() => { closeDrawer(); Alert.alert('Team Overview', 'Team management module coming soon.'); }}
                                >
                                    <Ionicons name="people-outline" size={22} color="#F59E0B" />
                                    <Text style={styles.drawerMenuText}>Team Overview</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'performance' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('performance'); closeDrawer(); }}
                                >
                                    <Ionicons name="bar-chart-outline" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'performance' && styles.drawerMenuTextActive]}>Performance Stats</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'whistleblower' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('whistleblower'); closeDrawer(); }}
                                >
                                    <CustomWhistleblowerIcon color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'whistleblower' && styles.drawerMenuTextActive]}>Whistleblower</Text>
                                </TouchableOpacity>

                                <Text style={styles.drawerSectionLabel}>ACCOUNT</Text>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'profile' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('profile'); closeDrawer(); }}
                                >
                                    <Ionicons name="person-outline" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'profile' && styles.drawerMenuTextActive]}>Profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={[styles.drawerMenuItem, activeTab === 'privacy' && styles.drawerMenuItemActive]}
                                    onPress={() => { setActiveTab('privacy'); closeDrawer(); }}
                                >
                                    <Ionicons name="shield-checkmark-outline" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, activeTab === 'privacy' && styles.drawerMenuTextActive]}>Privacy</Text>
                                </TouchableOpacity>
                            </ScrollView>

                            <View style={styles.drawerFooter}>
                                <View style={styles.drawerDivider} />
                                <TouchableOpacity
                                    style={styles.drawerSignOut}
                                    onPress={async () => {
                                        closeDrawer();
                                        await clearUserSession();
                                        navigation.navigate('Home');
                                    }}
                                >
                                    <CustomSignOutIcon color="#F59E0B" />
                                    <Text style={styles.drawerSignOutText}>Sign Out</Text>
                                </TouchableOpacity>
                                <Text style={styles.drawerVersion}>Aegis v2.4.4  ·  {currentLocation}</Text>
                            </View>
                        </Animated.View>
                    </View>
                </Modal>

                {/* ── DASHBOARD TAB ────────────────────────────────────────── */}
                {activeTab === 'dashboard' ? (
                    <>
                        <View style={styles.topBar}>
                            <TouchableOpacity style={styles.iconButton} onPress={() => setIsDrawerOpen(true)}>
                                <MenuIcon color="#9CA3AF" />
                            </TouchableOpacity>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoBox}>
                                    <Text style={styles.logoLetter}>A</Text>
                                </View>
                                <Text style={styles.logoText}>AEGIS</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.iconButton}
                                onPress={() => {
                                    markAllNotificationsRead();
                                    Alert.alert(
                                        'Notifications',
                                        notifications.length === 0
                                            ? 'No notifications.'
                                            : notifications.slice(0, 5).map(n => `• ${n.title}: ${n.message}`).join('\n')
                                    );
                                }}
                            >
                                <BellIcon color="#9CA3AF" />
                                {unreadCount > 0 && <View style={styles.notificationDot} />}
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                            <View style={styles.headerInfo}>
                                <Text style={styles.onDutyText}>On duty –</Text>
                                <Text style={styles.officerName}>
                                    <Text style={styles.officerPrefix}>Insp. </Text>
                                    {userName}
                                </Text>
                                <Text style={styles.commandText}>{currentLocation} Command . Shift started 07:00</Text>
                            </View>

                            {/* Command Status Card */}
                            <LinearGradient
                                colors={['#16284B', '#0A0F1E']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.commandStatusCard}
                            >
                                <View style={styles.commandCardHeader}>
                                    <View>
                                        <Text style={styles.commandCardLabel}>COMMAND STATUS - {currentLocation}</Text>
                                        {loadingStats ? (
                                            <ActivityIndicator color="#F59E0B" style={{ marginVertical: 8 }} />
                                        ) : (
                                            <>
                                                <Text style={styles.reportsPendingText}>{dashboardStats.pending} Reports Pending</Text>
                                                <Text style={styles.reportsSubtext}>
                                                    {dashboardStats.active} active cases • {dashboardStats.resolved} resolved
                                                </Text>
                                            </>
                                        )}
                                    </View>
                                    <CarIcon size={32} color="#F59E0B" />
                                </View>
                            </LinearGradient>

                            {/* Today's Overview */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>{"TODAY'S OVERVIEW"}</Text>
                                <TouchableOpacity onPress={() => setActiveTab('cases')}>
                                    <Text style={styles.fullStatsText}>Full stats →</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Stats Grid */}
                            <View style={styles.statsGrid}>
                                <View style={styles.statCard}>
                                    {loadingStats ? (
                                        <ActivityIndicator color={colors.dodgerBlue} />
                                    ) : (
                                        <Text style={[styles.statNumber, { color: colors.dodgerBlue }]}>
                                            {dashboardStats.pending}
                                        </Text>
                                    )}
                                    <Text style={styles.statLabel}>Pending Reports</Text>
                                </View>
                                <View style={styles.statCard}>
                                    {loadingStats ? (
                                        <ActivityIndicator color="#F59E0B" />
                                    ) : (
                                        <Text style={[styles.statNumber, { color: '#F59E0B' }]}>
                                            {dashboardStats.active}
                                        </Text>
                                    )}
                                    <Text style={styles.statLabel}>Active Cases</Text>
                                </View>
                                <View style={styles.statCard}>
                                    {loadingStats ? (
                                        <ActivityIndicator color={colors.caribbeanGreen} />
                                    ) : (
                                        <Text style={[styles.statNumber, { color: colors.caribbeanGreen }]}>
                                            {dashboardStats.resolved}
                                        </Text>
                                    )}
                                    <Text style={styles.statLabel}>Resolved</Text>
                                </View>
                                <View style={styles.statCard}>
                                    <Text style={[styles.statNumber, { color: '#06B6D4' }]}>—</Text>
                                    <Text style={styles.statLabel}>Avg Response Time</Text>
                                </View>
                            </View>

                            {/* Dispatch Section */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>DISPATCH</Text>
                            </View>
                            <View style={styles.dispatchRow}>
                                <TouchableOpacity
                                    style={styles.dispatchButtonMain}
                                    onPress={() => setActiveTab('dispatch')}
                                >
                                    <Text style={styles.dispatchButtonMainText}>DISPATCH</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.dispatchButtonSecondary}>
                                    <Text style={styles.dispatchButtonSecondaryText}>RADIO</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Map Preview */}
                            <TouchableOpacity
                                style={styles.mapPreviewCard}
                                activeOpacity={0.9}
                                onPress={() => setActiveTab('map')}
                            >
                                <MapView
                                    style={StyleSheet.absoluteFillObject}
                                    provider={PROVIDER_DEFAULT}
                                    initialRegion={MINI_MAP_REGION}
                                    customMapStyle={MINI_MAP_STYLE}
                                    scrollEnabled={false}
                                    zoomEnabled={false}
                                    rotateEnabled={false}
                                    pitchEnabled={false}
                                    showsUserLocation={true}
                                    showsMyLocationButton={false}
                                    showsCompass={false}
                                    showsBuildings={false}
                                    pointerEvents="none"
                                />
                                <View style={styles.mapFooter}>
                                    <View style={styles.mapBadge}>
                                        <Text style={styles.mapBadgeText}>LIVE MAP</Text>
                                    </View>
                                    <View style={styles.mapLivePill}>
                                        <View style={styles.mapLiveDot} />
                                        <Text style={styles.mapLiveText}>Live · {liveCounter}s</Text>
                                    </View>
                                </View>
                                <View style={styles.mapExpandHint}>
                                    <Text style={styles.mapExpandText}>TAP TO EXPAND ↗</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Priority Cases — real data */}
                            <View style={styles.sectionHeaderSpacing}>
                                <Text style={styles.sectionTitle}>MY CASES</Text>
                                <TouchableOpacity onPress={() => setActiveTab('cases')}>
                                    <Text style={styles.fullStatsText}>All cases →</Text>
                                </TouchableOpacity>
                            </View>

                            {loadingReports ? (
                                <ActivityIndicator color={colors.dodgerBlue} style={{ marginVertical: 20 }} />
                            ) : reports.length === 0 ? (
                                <View style={styles.caseCard}>
                                    <Text style={{ color: '#9CA3AF', fontSize: 14, textAlign: 'center' }}>
                                        No assigned cases yet.
                                    </Text>
                                </View>
                            ) : (
                                reports
                                    .filter(r => r.status !== 'resolved' && r.status !== 'rejected')
                                    .slice(0, 3)
                                    .map((report) => (
                                        <View key={report._id} style={styles.caseCard}>
                                            <View style={styles.caseHeader}>
                                                <View style={styles.priorityBadge}>
                                                    <Text style={styles.priorityBadgeText}>
                                                        {priorityFromUrgency(report.urgency)}
                                                    </Text>
                                                </View>
                                                <Text style={styles.caseTitle} numberOfLines={1}>
                                                    {report.category || 'Incident'}
                                                </Text>
                                            </View>
                                            <Text style={styles.caseMeta}>
                                                Case #{report._id.slice(-6).toUpperCase()}  ·  Submitted {new Date(report.createdAt).getHours()}:{new Date(report.createdAt).getMinutes().toString().padStart(2, '0')}  ·  {report.isAnonymous ? 'Anonymous reporter' : 'Verified reporter'}
                                            </Text>
                                            <View style={[styles.statusBadge, { backgroundColor: statusBgColor(report.status) }]}>
                                                <Text style={[styles.statusBadgeText, { color: statusColor(report.status) }]}>{statusLabel(report.status)}</Text>
                                            </View>

                                            <View style={styles.caseDivider} />

                                            <View style={styles.caseActionRow}>
                                                <TouchableOpacity style={styles.vCircle} onPress={() => handleViewCase(report)}>
                                                    <Text style={styles.vText}>V</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    style={[styles.startCaseBtn, report.status === 'in_progress' && { backgroundColor: '#10B981' }]}
                                                    onPress={() => {
                                                        if (report.status === 'assigned' || report.status === 'pending') handleStartReport(report);
                                                        else if (report.status === 'in_progress') handleResolveReport(report._id);
                                                        else Alert.alert('Case Info', `This case is currently ${statusLabel(report.status)}`);
                                                    }}
                                                >
                                                    <Text style={styles.startCaseBtnText}>
                                                        {report.status === 'in_progress' ? 'RESOLVE CASE' : 'START CASE'}
                                                    </Text>
                                                    <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    ))
                            )}

                            {/* Incoming Notifications */}
                            {notifications.filter(n => !n.isRead).length > 0 && (
                                <>
                                    <View style={styles.sectionHeaderSpacing}>
                                        <Text style={styles.sectionTitle}>INCOMING ALERTS</Text>
                                        <TouchableOpacity onPress={markAllNotificationsRead}>
                                            <Text style={styles.fullStatsText}>Mark all read</Text>
                                        </TouchableOpacity>
                                    </View>
                                    {notifications.filter(n => !n.isRead).slice(0, 3).map((notif) => (
                                        <View key={notif._id} style={styles.reportCard}>
                                            <View style={styles.reportHeader}>
                                                <View style={styles.reportDot} />
                                                <Text style={styles.reportTitle}>{notif.title}</Text>
                                                <View style={[styles.priorityBadge, { backgroundColor: 'rgba(239, 68, 68, 0.1)', marginLeft: 'auto' }]}>
                                                    <Text style={[styles.priorityBadgeText, { color: '#EF4444' }]}>NEW</Text>
                                                </View>
                                            </View>
                                            <Text style={styles.reportMeta}>
                                                {timeAgo(notif.createdAt)}  ·  {notif.message}
                                            </Text>
                                        </View>
                                    ))}
                                </>
                            )}
                        </ScrollView>
                    </>

                    /* ── DISPATCH TAB ─────────────────────────────────────────── */
                ) : activeTab === 'dispatch' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.dispatchHeaderContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.casesBackBtn}>
                                <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>DISPATCH</Text>
                        </View>

                        {/* Priority alert based on real data */}
                        {dashboardStats.active > 0 && (
                            <View style={styles.dispatchAlertBox}>
                                <View style={styles.dispatchAlertHeader}>
                                    <View style={styles.dispatchAlertDot} />
                                    <Text style={styles.dispatchAlertTitle}>{dashboardStats.active} Active Case{dashboardStats.active !== 1 ? 's' : ''}</Text>
                                </View>
                                <Text style={styles.dispatchAlertSubtext}>Immediate response required. Assign units now.</Text>
                            </View>
                        )}

                        <View style={styles.sectionHeaderPadding}>
                            <Text style={styles.dispatchSectionLabel}>Quick Dispatch</Text>
                        </View>
                        <View style={styles.quickDispatchGrid}>
                            <TouchableOpacity style={[styles.quickDispatchCard, { backgroundColor: '#3B82F6' }]}>
                                <Ionicons name="car-sharp" size={28} color="#FFFFFF" />
                                <Text style={styles.quickDispatchText}>Send Unit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.quickDispatchCard}>
                                <Ionicons name="radio" size={28} color="#F59E0B" />
                                <Text style={styles.quickDispatchText}>Radio Channel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.quickDispatchCard}>
                                <Ionicons name="medical" size={28} color="#F59E0B" />
                                <Text style={styles.quickDispatchText}>Ambulance</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.quickDispatchCard}>
                                <Ionicons name="flame" size={28} color="#F59E0B" />
                                <Text style={styles.quickDispatchText}>Fire Service</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.sectionHeaderPaddingRow}>
                            <Text style={styles.dispatchSectionLabel}>Units On Duty</Text>
                            <TouchableOpacity>
                                <Text style={styles.allUnitsLink}>All units →</Text>
                            </TouchableOpacity>
                        </View>

                        {MOCK_UNITS.map((unit) => (
                            <View key={unit.id} style={styles.unitCard}>
                                <View style={[styles.unitIconBox, { backgroundColor: unit.color }]}>
                                    <Text style={styles.unitIconText}>{unit.id}</Text>
                                </View>
                                <View style={styles.unitInfo}>
                                    <Text style={styles.unitTitle}>Unit {unit.id} · {unit.status}</Text>
                                    <View style={styles.unitLocationRow}>
                                        <PinIcon color="#EF4444" />
                                        <Text style={styles.unitLocationText}>
                                            {unit.location} {unit.officers ? `· ${unit.officers}` : ''}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.unitStatusBadge, { backgroundColor: unit.color + '15' }]}>
                                    <Text style={[styles.unitStatusBadgeText, { color: unit.color }]}>{unit.type}</Text>
                                </View>
                            </View>
                        ))}
                        <View style={{ height: 40 }} />
                    </ScrollView>

                    /* ── CASES TAB ────────────────────────────────────────────── */
                ) : activeTab === 'cases' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.casesHeaderContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.casesBackBtn}>
                                <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>MY CASES</Text>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            style={styles.casesFilters}
                            contentContainerStyle={{ paddingRight: 20 }}
                        >
                            {['ALL', 'ASSIGNED', 'IN PROGRESS', 'RESOLVED'].map((f) => (
                                <TouchableOpacity
                                    key={f}
                                    style={[styles.filterChip, caseFilter === f && styles.filterChipActive]}
                                    onPress={() => setCaseFilter(f)}
                                >
                                    <Text style={[styles.filterChipText, caseFilter === f && styles.filterChipTextActive]}>{f}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        {loadingReports ? (
                            <ActivityIndicator color={colors.dodgerBlue} style={{ marginTop: 40 }} />
                        ) : reports.length === 0 ? (
                            <View style={{ paddingTop: 60, alignItems: 'center' }}>
                                <Text style={{ color: '#6B7280', fontSize: 14 }}>No cases assigned yet.</Text>
                            </View>
                        ) : (
                            reports
                                .filter((r) => {
                                    if (caseFilter === 'ALL') return true;
                                    if (caseFilter === 'ASSIGNED') return r.status === 'assigned';
                                    if (caseFilter === 'IN PROGRESS') return r.status === 'in_progress';
                                    if (caseFilter === 'RESOLVED') return r.status === 'resolved';
                                    return true;
                                })
                                .map((report) => (
                                    <View key={report._id} style={styles.caseCard}>
                                        <View style={styles.caseHeader}>
                                            <View style={styles.priorityBadge}>
                                                <Text style={styles.priorityBadgeText}>
                                                    {priorityFromUrgency(report.urgency)}
                                                </Text>
                                            </View>
                                            <Text style={styles.caseTitle} numberOfLines={1}>
                                                {report.category || 'Incident'}
                                            </Text>
                                        </View>
                                        <Text style={styles.caseMeta}>
                                            Case #{report._id.slice(-6).toUpperCase()}  ·  Submitted {new Date(report.createdAt).getHours()}:{new Date(report.createdAt).getMinutes().toString().padStart(2, '0')}  ·  {report.isAnonymous ? 'Anonymous reporter' : 'Verified reporter'}
                                        </Text>
                                        <View style={[styles.statusBadge, { backgroundColor: statusBgColor(report.status) }]}>
                                            <Text style={[styles.statusBadgeText, { color: statusColor(report.status) }]}>{statusLabel(report.status)}</Text>
                                        </View>

                                        <View style={styles.caseDivider} />

                                        <View style={styles.caseActionRow}>
                                            <TouchableOpacity style={styles.vCircle} onPress={() => handleViewCase(report)}>
                                                <Text style={styles.vText}>V</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={[styles.startCaseBtn, report.status === 'in_progress' && { backgroundColor: '#10B981' }]}
                                                onPress={() => {
                                                    if (report.status === 'assigned' || report.status === 'pending') handleStartReport(report);
                                                    else if (report.status === 'in_progress') handleResolveReport(report._id);
                                                    else Alert.alert('Case Info', `This case is currently ${statusLabel(report.status)}`);
                                                }}
                                            >
                                                <Text style={styles.startCaseBtnText}>
                                                    {report.status === 'in_progress' ? 'RESOLVE CASE' : 'START CASE'}
                                                </Text>
                                                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                ))
                        )}
                        <View style={{ height: 40 }} />
                    </ScrollView>

                    /* ── MAP TAB ──────────────────────────────────────────────── */
                ) : activeTab === 'map' ? (
                    <View style={{ flex: 1 }}>
                        <OfficerMapView onBack={() => setActiveTab('dashboard')} />
                    </View>

                    /* ── PROFILE TAB ──────────────────────────────────────────── */
                ) : activeTab === 'profile' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.casesHeaderContainer}>
                            <TouchableOpacity onPress={() => setIsDrawerOpen(true)} style={styles.casesBackBtn}>
                                <Ionicons name="menu" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>PROFILE</Text>
                        </View>

                        <View style={styles.profileAvatarSection}>
                            <View style={styles.profileAvatarLarge}>
                                <Text style={styles.profileAvatarLargeText}>{userName.charAt(0)}</Text>
                            </View>
                            <Text style={styles.profileName}>Insp. {userName}</Text>
                            <View style={styles.profileRoleBadge}>
                                <Text style={styles.profileRoleText}>Security Personnel</Text>
                            </View>
                            <Text style={styles.profileMeta}>Badge: NPF-2024-001  ·  FCT Command</Text>
                        </View>

                        <View style={styles.profileStatsGrid}>
                            <View style={styles.profileStatCard}>
                                {loadingStats ? (
                                    <ActivityIndicator color="#3B82F6" />
                                ) : (
                                    <Text style={[styles.profileStatValue, { color: '#3B82F6' }]}>
                                        {dashboardStats.active + dashboardStats.resolved + dashboardStats.pending}
                                    </Text>
                                )}
                                <Text style={styles.profileStatLabel}>Cases Handled</Text>
                            </View>
                            <View style={styles.profileStatCard}>
                                {loadingStats ? (
                                    <ActivityIndicator color="#10B981" />
                                ) : (
                                    <Text style={[styles.profileStatValue, { color: '#10B981' }]}>
                                        {dashboardStats.active + dashboardStats.resolved > 0
                                            ? `${Math.round((dashboardStats.resolved / (dashboardStats.active + dashboardStats.resolved)) * 100)}%`
                                            : '—'}
                                    </Text>
                                )}
                                <Text style={styles.profileStatLabel}>Resolution Rate</Text>
                            </View>
                            <View style={styles.profileStatCard}>
                                <Text style={[styles.profileStatValue, { color: '#06B6D4' }]}>—</Text>
                                <Text style={styles.profileStatLabel}>Avg Response</Text>
                            </View>
                            <View style={styles.profileStatCard}>
                                <Text style={[styles.profileStatValue, { color: '#F59E0B' }]}>4.8</Text>
                                <Text style={styles.profileStatLabel}>Community Rating</Text>
                            </View>
                        </View>

                        <View style={styles.profileMenuList}>
                            <TouchableOpacity style={styles.profileMenuItem} onPress={() => setActiveTab('performance')}>
                                <View style={styles.profileMenuIconBox}>
                                    <Ionicons name="bar-chart" size={20} color="#F59E0B" />
                                </View>
                                <View style={styles.profileMenuTextContainer}>
                                    <Text style={styles.profileMenuTitle}>Performance Stats</Text>
                                    <Text style={styles.profileMenuSubtitle}>Monthly reports & ratings</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#4B5563" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.profileMenuItem}
                                onPress={() => Alert.alert('Team Overview', 'Team management module coming soon.')}
                            >
                                <View style={styles.profileMenuIconBox}>
                                    <Ionicons name="people" size={20} color="#F97316" />
                                </View>
                                <View style={styles.profileMenuTextContainer}>
                                    <Text style={styles.profileMenuTitle}>Team Overview</Text>
                                    <Text style={styles.profileMenuSubtitle}>Officers in your unit</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#4B5563" />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.profileMenuItem} onPress={() => setActiveTab('whistleblower')}>
                                <View style={styles.profileMenuIconBox}>
                                    <CustomWhistleblowerIcon color="#F59E0B" />
                                </View>
                                <View style={styles.profileMenuTextContainer}>
                                    <Text style={styles.profileMenuTitle}>Whistleblower Reports</Text>
                                    <Text style={styles.profileMenuSubtitle}>Confidential submissions</Text>
                                </View>
                                <View style={styles.profileMenuBadge}>
                                    <Text style={styles.profileMenuBadgeText}>2</Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.profileMenuItem}
                                onPress={() => navigation.navigate('SecurityRegistration')}
                            >
                                <View style={styles.profileMenuIconBox}>
                                    <CustomKeyIcon color="#F59E0B" />
                                </View>
                                <View style={styles.profileMenuTextContainer}>
                                    <Text style={styles.profileMenuTitle}>Security Settings</Text>
                                    <Text style={styles.profileMenuSubtitle}>Password · 2FA · Devices</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#4B5563" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.profileMenuItem}
                                onPress={() => Alert.alert('Help & Support', 'Contacting Aegis support...')}
                            >
                                <View style={styles.profileMenuIconBox}>
                                    <Ionicons name="help-circle" size={20} color="#EF4444" />
                                </View>
                                <View style={styles.profileMenuTextContainer}>
                                    <Text style={styles.profileMenuTitle}>Help & Support</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#4B5563" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.profileMenuItem, { borderBottomWidth: 0, marginBottom: 0 }]}
                                onPress={async () => {
                                    await clearUserSession();
                                    navigation.navigate('Home');
                                }}
                            >
                                <View style={styles.profileMenuIconBox}>
                                    <CustomSignOutIcon color="#F97316" />
                                </View>
                                <View style={styles.profileMenuTextContainer}>
                                    <Text style={styles.profileMenuTitle}>Sign Out</Text>
                                    <Text style={styles.profileMenuSubtitle}>Badge: NPF-2024-001</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#4B5563" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 40 }} />
                    </ScrollView>

                    /* ── PERFORMANCE TAB ──────────────────────────────────────── */
                ) : activeTab === 'performance' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.casesHeaderContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('profile')} style={styles.casesBackBtn}>
                                <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>PERFORMANCE</Text>
                        </View>

                        <View style={styles.perfHeroCard}>
                            <Text style={styles.perfHeroLabel}>AVERAGE RESPONSE TIME</Text>
                            <View style={styles.perfHeroRow}>
                                <Text style={styles.perfHeroValue}>19 min</Text>
                                <View style={styles.perfTrendBadge}>
                                    <Text style={styles.perfTrendText}>↓ 12%</Text>
                                </View>
                            </View>
                            <Text style={styles.perfHeroSubtext}>Target: ≤ 25m  ·  vs last month</Text>
                            <View style={styles.perfMiniChart}>
                                {[15, 22, 18, 25, 19, 14, 16].map((h, i) => (
                                    <View key={i} style={styles.perfChartCol}>
                                        <View style={[styles.perfChartBar, { height: h * 2 }]} />
                                        <Text style={styles.perfChartDay}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        <View style={styles.perfGrid}>
                            <View style={styles.perfGridCard}>
                                <Text style={styles.perfGridLabel}>CASES THIS MONTH</Text>
                                {loadingStats ? (
                                    <ActivityIndicator color={colors.dodgerBlue} />
                                ) : (
                                    <Text style={[styles.perfGridValue, { color: colors.dodgerBlue }]}>
                                        {dashboardStats.active + dashboardStats.resolved + dashboardStats.pending}
                                    </Text>
                                )}
                                <Text style={styles.perfGridTrend}>All assigned cases</Text>
                            </View>
                            <View style={styles.perfGridCard}>
                                <Text style={styles.perfGridLabel}>RESOLUTION RATE</Text>
                                {loadingStats ? (
                                    <ActivityIndicator color={colors.caribbeanGreen} />
                                ) : (
                                    <Text style={[styles.perfGridValue, { color: colors.caribbeanGreen }]}>
                                        {dashboardStats.active + dashboardStats.resolved > 0
                                            ? `${Math.round((dashboardStats.resolved / (dashboardStats.active + dashboardStats.resolved)) * 100)}%`
                                            : '—'}
                                    </Text>
                                )}
                                <Text style={styles.perfGridTrend}>Resolved vs active</Text>
                            </View>
                            <View style={styles.perfGridCard}>
                                <Text style={styles.perfGridLabel}>ACTIVE CASES</Text>
                                {loadingStats ? (
                                    <ActivityIndicator color="#F59E0B" />
                                ) : (
                                    <Text style={styles.perfGridValue}>{dashboardStats.active}</Text>
                                )}
                                <Text style={styles.perfGridTrend}>In progress now</Text>
                            </View>
                            <View style={styles.perfGridCard}>
                                <Text style={styles.perfGridLabel}>COMMUNITY RATING</Text>
                                <Text style={[styles.perfGridValue, { color: '#F59E0B' }]}>4.3</Text>
                                <Text style={styles.perfGridTrend}>↑ 0.2 pts</Text>
                            </View>
                        </View>

                        <View style={styles.perfTrustCard}>
                            <View style={styles.perfTrustHeader}>
                                <View>
                                    <Text style={styles.perfGridLabel}>COMMUNITY TRUST SCORE</Text>
                                    <Text style={styles.perfTrustValue}>71 / 100</Text>
                                </View>
                                <View style={styles.perfImprovingBadge}>
                                    <Text style={styles.perfImprovingText}>IMPROVING</Text>
                                </View>
                            </View>
                            <View style={styles.perfProgressBarBg}>
                                <View style={[styles.perfProgressBarFill, { width: '71%' }]} />
                            </View>
                            <Text style={styles.perfTrustFooter}>Based on 312 community ratings this month</Text>
                        </View>
                        <View style={{ height: 40 }} />
                    </ScrollView>

                    /* ── REPORT TAB ───────────────────────────────────────────── */
                ) : activeTab === 'report' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.casesHeaderContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.casesBackBtn}>
                                <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>NEW REPORT</Text>
                            <Text style={styles.stepIndicatorText}>STEP {reportStep}/5</Text>
                        </View>

                        <View style={styles.reportContent}>
                            {reportStep === 1 ? (
                                <View>
                                    <Text style={styles.reportSectionTitle}>What type of incident are you reporting?</Text>
                                    <View style={styles.reportGrid}>
                                        {[
                                            { id: 'theft', label: 'Theft/Robbery', icon: '🥷' },
                                            { id: 'assault', label: 'Assault', icon: '👊' },
                                            { id: 'suspicious', label: 'Suspicious Activity', icon: '👁️' },
                                            { id: 'vandalism', label: 'Vandalism', icon: '🏚️' },
                                            { id: 'accident', label: 'Accident', icon: '💥' },
                                            { id: 'fire', label: 'Fire', icon: '🔥' },
                                        ].map((type) => (
                                            <TouchableOpacity
                                                key={type.id}
                                                style={[styles.reportGridItem, incidentType === type.id && styles.reportGridItemActive]}
                                                onPress={() => setIncidentType(type.id)}
                                            >
                                                <Text style={styles.reportGridIcon}>{type.icon}</Text>
                                                <Text style={[styles.reportGridLabel, incidentType === type.id && styles.reportGridLabelActive]}>
                                                    {type.label}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <Text style={styles.reportSectionTitle}>Urgency Level</Text>
                                    <View style={styles.urgencyRow}>
                                        {['Low', 'Medium', 'High'].map((level) => (
                                            <TouchableOpacity
                                                key={level}
                                                style={[styles.urgencyBtn, urgency === level && styles.urgencyBtnActive]}
                                                onPress={() => setUrgency(level)}
                                            >
                                                <Text style={[styles.urgencyText, urgency === level && styles.urgencyTextActive]}>
                                                    {level}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ) : reportStep === 2 ? (
                                <View>
                                    <Text style={styles.reportSectionTitle}>Describe the incident</Text>
                                    <TextInput
                                        style={styles.reportTextArea}
                                        placeholder="Include as much detail as possible..."
                                        placeholderTextColor="#6B7280"
                                        multiline
                                        value={description}
                                        onChangeText={setDescription}
                                    />
                                    <Text style={styles.reportSectionTitle}>Suspect Description (Optional)</Text>
                                    <TextInput
                                        style={styles.reportInput}
                                        placeholder="Clothing, physical features, etc."
                                        placeholderTextColor="#6B7280"
                                        value={suspects}
                                        onChangeText={setSuspects}
                                    />
                                </View>
                            ) : reportStep === 3 ? (
                                <View>
                                    <Text style={styles.reportSectionTitle}>Location & Anonymity</Text>
                                    <View style={styles.reportLocationBox}>
                                        <Ionicons name="location" size={24} color="#00D4AA" />
                                        <View style={{ marginLeft: 12 }}>
                                            <Text style={styles.reportLocationPrimary}>{currentLocation}</Text>
                                            <Text style={styles.reportLocationSecondary}>Current Location Detected</Text>
                                        </View>
                                    </View>
                                    <View style={styles.reportSwitchRow}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={styles.reportSwitchTitle}>Submit Anonymously</Text>
                                            <Text style={styles.reportSwitchDesc}>Your badge ID will be hidden from the public record.</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={[styles.toggleTrack, isAnonymous ? styles.toggleTrackActive : styles.toggleTrackInactive]}
                                            onPress={() => setIsAnonymous(!isAnonymous)}
                                        >
                                            <View style={[styles.toggleThumb, isAnonymous ? styles.toggleThumbActive : styles.toggleThumbInactive]} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ) : reportStep === 4 ? (
                                <View>
                                    <Text style={styles.reportSectionTitle}>Review Report</Text>
                                    <View style={styles.reportSummaryCard}>
                                        <View style={styles.summaryRow}>
                                            <Text style={styles.summaryLabel}>TYPE</Text>
                                            <Text style={styles.summaryValue}>{incidentType || 'Not selected'}</Text>
                                        </View>
                                        <View style={styles.summaryRow}>
                                            <Text style={styles.summaryLabel}>URGENCY</Text>
                                            <Text style={[styles.summaryValue, {
                                                color: urgency === 'High' ? '#EF4444' : urgency === 'Medium' ? '#F59E0B' : '#10B981'
                                            }]}>{urgency}</Text>
                                        </View>
                                        <View style={styles.summaryRow}>
                                            <Text style={styles.summaryLabel}>ANONYMOUS</Text>
                                            <Text style={styles.summaryValue}>{isAnonymous ? 'YES' : 'NO'}</Text>
                                        </View>
                                        <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
                                            <Text style={styles.summaryLabel}>DESCRIPTION</Text>
                                            <Text style={styles.summaryValue} numberOfLines={2}>
                                                {description || 'No description'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.reportSuccessContainer}>
                                    <View style={styles.successIconCircle}>
                                        <Ionicons name="checkmark" size={40} color="#00D4AA" />
                                    </View>
                                    <Text style={styles.successTitle}>Report Transmitted</Text>
                                    <Text style={styles.successSubtitle}>
                                        The incident has been logged and assigned a tracking ID.
                                    </Text>
                                    <TouchableOpacity
                                        style={styles.returnHomeBtn}
                                        onPress={() => {
                                            setActiveTab('dashboard');
                                            setReportStep(1);
                                            setIncidentType('');
                                            setDescription('');
                                            setSuspects('');
                                            setIsAnonymous(false);
                                            setUrgency('Medium');
                                        }}
                                    >
                                        <Text style={styles.returnHomeText}>RETURN TO DASHBOARD</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {reportStep < 5 && (
                                <View style={styles.reportActionRow}>
                                    {reportStep > 1 && (
                                        <TouchableOpacity
                                            style={styles.reportBackBtn}
                                            onPress={() => setReportStep(reportStep - 1)}
                                        >
                                            <Text style={styles.reportBackBtnText}>BACK</Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity
                                        style={[
                                            styles.reportNextBtn,
                                            ((!incidentType && reportStep === 1) || submittingReport) && { opacity: 0.5 }
                                        ]}
                                        onPress={() => {
                                            if (reportStep === 4) {
                                                handleSubmitReport();
                                            } else {
                                                setReportStep(reportStep + 1);
                                            }
                                        }}
                                        disabled={(!incidentType && reportStep === 1) || submittingReport}
                                    >
                                        {submittingReport ? (
                                            <ActivityIndicator color="#0A0F1E" />
                                        ) : (
                                            <Text style={styles.reportNextBtnText}>
                                                {reportStep === 4 ? 'SUBMIT REPORT' : 'CONTINUE'}
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <View style={{ height: 40 }} />
                    </ScrollView>

                    /* ── PRIVACY TAB ──────────────────────────────────────────── */
                ) : activeTab === 'privacy' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        <View style={styles.casesHeaderContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.casesBackBtn}>
                                <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>PRIVACY SETTINGS</Text>
                        </View>

                        <View style={styles.privacyContent}>
                            <Text style={styles.privacyDescription}>
                                Control exactly what Aegis knows about you and how your reports are handled.
                            </Text>

                            <View style={styles.settingsGroup}>
                                {[
                                    { key: 'defaultAnonymity', icon: 'finger-print', label: 'Default Anonymity', sub: 'Reports never linked to your identity' },
                                    { key: 'sharePreciseLocation', icon: 'location', label: 'Share Precise Location', sub: 'Improves report accuracy' },
                                    { key: 'areaSafetyAlerts', icon: 'notifications', label: 'Area Safety Alerts', sub: 'Notifications within 2 km' },
                                    { key: 'anonymousAnalytics', icon: 'stats-chart', label: 'Anonymous Analytics', sub: 'Help improve Aegis (no personal data)' },
                                    { key: 'communityMapPresence', icon: 'map', label: 'Community Map Presence', sub: "Show you're active in your area" },
                                ].map((item, idx, arr) => (
                                    <View key={item.key} style={[styles.privacySettingItem, idx === arr.length - 1 && { borderBottomWidth: 0 }]}>
                                        <View style={styles.privacySettingIconBox}>
                                            <Ionicons name={item.icon} size={20} color="#F59E0B" />
                                        </View>
                                        <View style={styles.privacySettingTextContainer}>
                                            <Text style={styles.privacySettingTitle}>{item.label}</Text>
                                            <Text style={styles.privacySettingSubtitle}>{item.sub}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={[styles.toggleTrack, privacySettings[item.key] ? styles.toggleTrackActive : styles.toggleTrackInactive]}
                                            onPress={() => togglePrivacySetting(item.key)}
                                            activeOpacity={0.8}
                                        >
                                            <View style={[styles.toggleThumb, privacySettings[item.key] ? styles.toggleThumbActive : styles.toggleThumbInactive]} />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>

                            <TouchableOpacity
                                style={styles.deleteDataButton}
                                onPress={() => Alert.alert(
                                    'Delete All My Data',
                                    'Permanently removes your account & reports. This action cannot be undone.',
                                    [
                                        { text: 'Cancel', style: 'cancel' },
                                        {
                                            text: 'Delete Everything',
                                            style: 'destructive',
                                            onPress: () => Alert.alert('Action confirmed', 'Data deletion process initiated.')
                                        }
                                    ]
                                )}
                            >
                                <View style={styles.deleteDataIconBox}>
                                    <Ionicons name="trash" size={20} color="#EF4444" />
                                </View>
                                <View style={styles.deleteDataTextContainer}>
                                    <Text style={styles.deleteDataTitle}>Delete All My Data</Text>
                                    <Text style={styles.deleteDataSubtitle}>Permanently removes your account & reports</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#4B5563" />
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 40 }} />
                    </ScrollView>

                    /* ── WHISTLEBLOWER TAB ────────────────────────────────────── */
                ) : activeTab === 'whistleblower' ? (
                    <View style={{ flex: 1, backgroundColor: '#080E1A' }}>
                        <View style={styles.wbHeader}>
                            <TouchableOpacity onPress={() => setActiveTab('profile')} style={styles.wbBackBtn}>
                                <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                            <Text style={styles.wbHeaderTitle}>WHISTLEBLOWER</Text>
                            <View style={styles.wbRestrictedBadge}>
                                <Text style={styles.wbRestrictedText}>Restricted</Text>
                            </View>
                        </View>

                        <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                            <View style={styles.wbAlertBar}>
                                <Ionicons name="lock-closed" size={16} color="#F59E0B" style={{ marginRight: 10 }} />
                                <Text style={styles.wbAlertText}>
                                    Encrypted and visible only to authorised IAD officers. All access is logged under audit protocol.
                                </Text>
                            </View>

                            <View style={styles.wbStatsGrid}>
                                <View style={styles.wbStatItem}>
                                    <Text style={[styles.wbStatValue, { color: '#3B82F6' }]}>8</Text>
                                    <Text style={styles.wbStatLabel}>New</Text>
                                </View>
                                <View style={styles.wbStatItem}>
                                    <Text style={[styles.wbStatValue, { color: '#F59E0B' }]}>14</Text>
                                    <Text style={styles.wbStatLabel}>Under Review</Text>
                                </View>
                                <View style={styles.wbStatItem}>
                                    <Text style={[styles.wbStatValue, { color: '#10B981' }]}>31</Text>
                                    <Text style={styles.wbStatLabel}>Closed</Text>
                                </View>
                            </View>

                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                style={styles.wbFilters}
                                contentContainerStyle={{ paddingRight: 20 }}
                            >
                                {['RECENT', 'HIGH PRIORITY', 'INVESTIGATION', 'CLOSED'].map((f) => (
                                    <TouchableOpacity
                                        key={f}
                                        style={[styles.wbFilterChip, wbFilter === f && styles.wbFilterChipActive]}
                                        onPress={() => setWbFilter(f)}
                                    >
                                        <Text style={[styles.wbFilterChipText, wbFilter === f && styles.wbFilterChipTextActive]}>{f}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {MOCK_WHISTLEBLOWER.map((wb) => (
                                <View key={wb.id} style={styles.wbReportCard}>
                                    <View style={styles.wbCardTop}>
                                        <Text style={styles.wbCardTitle}>{wb.title}</Text>
                                        <View style={[styles.wbStatusBadge, {
                                            backgroundColor: wb.status === 'NEW' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)'
                                        }]}>
                                            <Text style={[styles.wbStatusBadgeText, {
                                                color: wb.status === 'NEW' ? '#3B82F6' : '#8B5CF6'
                                            }]}>{wb.status}</Text>
                                        </View>
                                    </View>
                                    <Text style={styles.wbCardMeta}>{wb.time} · Source: {wb.source}</Text>
                                    <Text style={styles.wbCardDesc}>{wb.description}</Text>
                                    <View style={styles.wbCardActions}>
                                        {wb.actions.map((action, idx) => (
                                            <TouchableOpacity
                                                key={idx}
                                                style={[
                                                    styles.wbActionBtn,
                                                    action === 'Review' && { backgroundColor: '#3B82F6' },
                                                    action === 'Investigate' && { backgroundColor: '#8B5CF6' },
                                                    action === 'Assign IAD' && { borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' }
                                                ]}
                                            >
                                                <Text style={[styles.wbActionText, action === 'Assign IAD' && { color: '#9CA3AF' }]}>
                                                    {action}
                                                </Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ))}
                            <View style={{ height: 100 }} />
                        </ScrollView>
                    </View>
                ) : activeTab === 'case_in_progress' && activeCase ? (
                    <View style={styles.inProgressRoot}>
                        <View style={styles.inProgressHeader}>
                            <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.backBtnCircle}>
                                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                            <View style={styles.inProgressTitleContainer}>
                                <Text style={styles.inProgressCaseId}>CASE #{activeCase._id.slice(-6).toUpperCase()}</Text>
                                <View style={styles.inProgressStatusRow}>
                                    <View style={styles.inProgressDot} />
                                    <Text style={styles.inProgressStatusText}>IN PROGRESS</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.backBtnCircle}>
                                <Ionicons name="ellipsis-vertical" size={20} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.inProgressScroll} showsVerticalScrollIndicator={false}>
                            <View style={styles.inProgressInfoRow}>
                                <View style={[styles.priorityBadge, { backgroundColor: priorityBgColor(activeCase.urgency) }]}>
                                    <Text style={[styles.priorityBadgeText, { color: priorityColor(activeCase.urgency) }]}>
                                        {priorityFromUrgency(activeCase.urgency)} PRIORITY
                                    </Text>
                                </View>
                                <Text style={styles.inProgressType}>{activeCase.category?.toUpperCase() || 'INCIDENT'}</Text>
                            </View>

                            <LinearGradient
                                colors={['#1E293B', '#0F172A']}
                                style={styles.timerCard}
                            >
                                <Text style={styles.timerLabel}>ELAPSED TIME</Text>
                                <Text style={styles.timerValue}>
                                    {Math.floor((Date.now() - startTime) / 60000)}:
                                    {Math.floor(((Date.now() - startTime) % 60000) / 1000).toString().padStart(2, '0')}
                                </Text>
                                <Text style={styles.timerSubtext}>Response targeted under 30 mins</Text>
                            </LinearGradient>

                            {/* Map Card */}
                            <View style={styles.inProgressMapCard}>
                                <MapView
                                    style={styles.inProgressMap}
                                    provider={PROVIDER_DEFAULT}
                                    initialRegion={MINI_MAP_REGION}
                                    customMapStyle={MINI_MAP_STYLE}
                                />
                                <View style={styles.mapOverlay}>
                                    <View style={styles.locationInfo}>
                                        <PinIcon color="#EF4444" />
                                        <Text style={styles.locationText}>{activeCase.location?.address || 'Detecting Location...'}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Case Details */}
                            <View style={styles.detailsSection}>
                                <Text style={styles.detailsLabel}>DESCRIPTION</Text>
                                <Text style={styles.detailsText}>
                                    {activeCase.description || 'No additional description provided.'}
                                </Text>

                                <View style={styles.metaGrid}>
                                    <View style={styles.metaItem}>
                                        <Text style={styles.metaLabel}>REPORTER</Text>
                                        <Text style={styles.metaValue}>{activeCase.isAnonymous ? 'Anonymous' : 'Verified User'}</Text>
                                    </View>
                                    <View style={styles.metaItem}>
                                        <Text style={styles.metaLabel}>SUBMITTED</Text>
                                        <Text style={styles.metaValue}>{new Date(activeCase.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                                    </View>
                                </View>
                            </View>
                        </ScrollView>

                        {/* Footer Action */}
                        <View style={styles.inProgressFooter}>
                            <TouchableOpacity
                                style={styles.resolveLargeBtn}
                                onPress={() => handleResolveReport(activeCase._id)}
                            >
                                <Text style={styles.resolveLargeBtnText}>RESOLVE CASE</Text>
                                <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}

                {/* ── Bottom Navigation ────────────────────────────────────── */}
                {activeTab !== 'case_in_progress' && (
                    <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 24), height: 72 + Math.max(insets.bottom, 24) }]}>
                        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('dashboard')}>
                            <View style={styles.navIconContainer}>
                                <HomeIcon color={activeTab === 'dashboard' ? "#F59E0B" : "#6B7280"} />
                            </View>
                            <Text style={activeTab === 'dashboard' ? styles.navLabelActive : styles.navLabel}>DASHBOARD</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('cases')}>
                            <View style={styles.navIconContainer}>
                                <ClipboardIcon color={activeTab === 'cases' ? "#F59E0B" : "#6B7280"} />
                            </View>
                            <Text style={activeTab === 'cases' ? styles.navLabelActive : styles.navLabel}>CASES</Text>
                            {activeTab === 'cases' && <View style={styles.navIndicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('map')}>
                            <View style={styles.navIconContainer}>
                                <MapIcon color={activeTab === 'map' ? '#F59E0B' : '#6B7280'} />
                            </View>
                            <Text style={activeTab === 'map' ? styles.navLabelActive : styles.navLabel}>MAP</Text>
                            {activeTab === 'map' && <View style={styles.navIndicator} />}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab('profile')}>
                            <View style={styles.navIconContainer}>
                                <ProfileIcon color={activeTab === 'profile' || activeTab === 'performance' || activeTab === 'whistleblower' ? "#F59E0B" : "#6B7280"} />
                            </View>
                            <Text style={activeTab === 'profile' || activeTab === 'performance' || activeTab === 'whistleblower' ? styles.navLabelActive : styles.navLabel}>PROFILE</Text>
                        </TouchableOpacity>
                    </View>
                )}

            </View>
        </SafeAreaView>
    );
}

// ─── Styles (100% UNCHANGED) ──────────────────────────────────────────────────
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0A0F1E',
    },
    container: {
        flex: 1,
    },
    mainScroll: {
        flex: 1,
    },
    casesHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        gap: 15,
    },
    casesBackBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#161F35',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    casesHeaderTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 2,
    },
    casesFilters: {
        paddingLeft: 20,
        marginBottom: 20,
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#161F35',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginRight: 10,
    },
    filterChipActive: {
        backgroundColor: colors.dodgerBlue,
        borderColor: colors.dodgerBlue,
    },
    filterChipText: {
        color: '#9CA3AF',
        fontSize: 11,
        fontWeight: '700',
    },
    filterChipTextActive: {
        color: '#FFFFFF',
    },
    casesCard: {
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    casesCardTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
    },
    casesCardMeta: {
        color: '#6B7280',
        fontSize: 12,
        marginBottom: 4,
    },
    casesCardFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
    },
    unassignedText: {
        color: '#F97316',
        fontSize: 11,
        fontWeight: '700',
    },
    assignButton: {
        backgroundColor: colors.dodgerBlue,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
    },
    assignButtonText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
    },
    profileAvatarSection: {
        alignItems: 'center',
        paddingVertical: 30,
    },
    profileAvatarLarge: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.dodgerBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 4,
        borderColor: 'rgba(59, 130, 246, 0.2)',
    },
    profileAvatarLargeText: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: '800',
        fontFamily: 'serif',
    },
    profileName: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'serif',
        marginBottom: 8,
    },
    profileRoleBadge: {
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
        marginBottom: 12,
    },
    profileRoleText: {
        color: colors.dodgerBlue,
        fontSize: 11,
        fontWeight: '700',
        letterSpacing: 1,
    },
    profileMeta: {
        color: '#6B7280',
        fontSize: 12,
    },
    profileStatsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        gap: 12,
        marginBottom: 30,
    },
    profileStatCard: {
        width: '48%',
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    profileStatValue: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 4,
    },
    profileStatLabel: {
        color: '#9CA3AF',
        fontSize: 11,
        fontWeight: '600',
    },
    profileMenuList: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    profileMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
        gap: 16,
    },
    profileMenuIconBox: {
        width: 40,
        height: 40,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.03)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileMenuTextContainer: {
        flex: 1,
    },
    profileMenuTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    profileMenuSubtitle: {
        color: '#6B7280',
        fontSize: 12,
    },
    profileMenuBadge: {
        backgroundColor: '#EF4444',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    profileMenuBadgeText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '700',
    },
    navIndicator: {
        position: 'absolute',
        bottom: -12,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#F59E0B',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 4,
        paddingBottom: 12,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#161F35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#F59E0B',
        borderWidth: 2,
        borderColor: '#161F35',
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoBox: {
        width: 24,
        height: 24,
        backgroundColor: colors.dodgerBlue,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoLetter: {
        color: '#FFFFFF',
        fontWeight: '900',
        fontSize: 14,
        fontFamily: 'serif',
    },
    logoText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 2,
    },
    scroll: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    headerInfo: {
        marginTop: 10,
        marginBottom: 24,
    },
    onDutyText: {
        color: '#9CA3AF',
        fontSize: 14,
        marginBottom: 4,
    },
    officerName: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'serif',
        marginBottom: 4,
        color: colors.dodgerBlue,
    },
    officerPrefix: {
        color: '#FFFFFF',
    },
    commandText: {
        color: '#6B7280',
        fontSize: 12,
    },
    commandStatusCard: {
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.2)',
    },
    commandCardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    commandCardLabel: {
        color: colors.dodgerBlue,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 8,
    },
    reportsPendingText: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'serif',
        marginBottom: 6,
    },
    reportsSubtext: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        color: '#6B7280',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    fullStatsText: {
        color: colors.dodgerBlue,
        fontSize: 12,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 30,
    },
    statCard: {
        width: '48%',
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'serif',
        marginBottom: 4,
    },
    statLabel: {
        color: '#9CA3AF',
        fontSize: 12,
        marginBottom: 8,
    },
    statTrend: {
        fontSize: 10,
        fontWeight: '600',
    },
    dispatchRow: {
        flexDirection: 'row',
        gap: 12,
    },
    dispatchButtonMain: {
        flex: 1,
        backgroundColor: colors.dodgerBlue,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    dispatchButtonMainText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 1,
    },
    dispatchButtonSecondary: {
        flex: 1,
        backgroundColor: '#161F35',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    dispatchButtonSecondaryText: {
        color: '#FFFFFF',
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 1,
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#0A0F1E',
        borderTopWidth: 1,
        borderTopColor: '#161F35',
        paddingVertical: 12,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    navIconContainer: {
        marginBottom: 4,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    navLabel: {
        fontSize: 9,
        color: '#6B7280',
        fontWeight: '600',
    },
    navLabelActive: {
        fontSize: 9,
        color: '#F59E0B',
        fontWeight: '700',
    },
    mapPreviewCard: {
        marginTop: 24,
        borderRadius: 16,
        backgroundColor: '#0d1117',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(59,130,246,0.2)',
        height: 200,
    },
    miniPin: {
        width: 14,
        height: 14,
        borderRadius: 7,
        borderWidth: 2,
    },
    miniOfficerPin: {
        width: 12,
        height: 12,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    mapLivePill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    mapLiveDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#EF4444',
    },
    mapExpandHint: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: 'rgba(10,15,30,0.75)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.08)',
    },
    mapExpandText: {
        color: '#9CA3AF',
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    mapBackground: {
        flex: 1,
        backgroundColor: '#0F172A',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapPinContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    mapFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
    },
    mapBadge: {
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    mapBadgeText: {
        color: colors.dodgerBlue,
        fontSize: 10,
        fontWeight: '700',
    },
    mapLiveText: {
        color: '#9CA3AF',
        fontSize: 12,
        fontWeight: '500',
    },
    sectionHeaderSpacing: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
        marginBottom: 16,
    },
    caseCard: {
        backgroundColor: '#0D1425',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    caseHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 12,
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
        alignSelf: 'flex-start',
    },
    priorityBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        color: '#EF4444',
        letterSpacing: 1,
    },
    caseTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '800',
        flex: 1,
    },
    caseMeta: {
        color: '#6B7280',
        fontSize: 13,
        marginTop: 4,
    },
    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        marginTop: 12,
        alignSelf: 'flex-start',
    },
    statusBadgeText: {
        color: '#F59E0B',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
    caseDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginVertical: 16,
    },
    caseActionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F59E0B',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    vText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
    },
    startCaseBtn: {
        backgroundColor: '#3B82F6',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
        gap: 8,
    },
    startCaseBtnText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '800',
        letterSpacing: 1,
    },
    avatarRow: {
        flexDirection: 'row',
    },
    avatar: {
        width: 28,
        height: 28,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#161F35',
    },
    avatarText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    actionButton: {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    actionButtonText: {
        color: colors.dodgerBlue,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    outlineButton: {
        borderWidth: 1,
        borderColor: 'rgba(59, 130, 246, 0.3)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    outlineButtonText: {
        color: colors.dodgerBlue,
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    reportCard: {
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 16,
    },
    reportHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        gap: 12,
    },
    reportDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#EF4444',
    },
    reportTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        lineHeight: 20,
    },
    reportMeta: {
        color: '#6B7280',
        fontSize: 12,
        marginLeft: 20,
    },
    drawerOverlay: {
        flex: 1,
        flexDirection: 'row',
    },
    drawerBackdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    drawerContainer: {
        width: Dimensions.get('window').width * 0.78,
        backgroundColor: '#0A0F1E',
        height: '100%',
        paddingTop: 56,
        borderRightWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.07)',
    },
    drawerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 24,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.06)',
        gap: 14,
    },
    drawerHeaderInfo: {
        flex: 1,
    },
    drawerAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.dodgerBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    drawerAvatarText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '700',
        fontFamily: 'serif',
    },
    drawerOfficerName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 3,
    },
    drawerRoleText: {
        color: colors.dodgerBlue,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
    },
    drawerSectionLabel: {
        color: '#374151',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 4,
    },
    drawerMenu: {
        flex: 1,
        paddingTop: 8,
    },
    drawerMenuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
        paddingHorizontal: 24,
        gap: 16,
    },
    drawerMenuItemActive: {
        backgroundColor: 'rgba(245, 158, 11, 0.08)',
    },
    drawerMenuText: {
        color: '#C9D1D9',
        fontSize: 14,
        fontWeight: '500',
    },
    drawerMenuTextActive: {
        color: '#F59E0B',
        fontWeight: '600',
    },
    drawerFooter: {
        paddingBottom: 36,
        paddingTop: 4,
    },
    drawerDivider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.06)',
        marginHorizontal: 24,
        marginBottom: 12,
    },
    drawerSignOut: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
        paddingHorizontal: 24,
        gap: 16,
    },
    drawerSignOutText: {
        color: '#6B7280',
        fontSize: 14,
        fontWeight: '500',
    },
    drawerVersion: {
        color: '#374151',
        fontSize: 11,
        paddingHorizontal: 24,
        paddingTop: 4,
    },
    perfHeroCard: {
        backgroundColor: '#161F35',
        borderRadius: 24,
        padding: 24,
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    perfHeroLabel: {
        color: '#9CA3AF',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    perfHeroRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 12,
        marginBottom: 6,
    },
    perfHeroValue: {
        color: '#FFFFFF',
        fontSize: 36,
        fontWeight: '700',
        fontFamily: 'serif',
    },
    perfTrendBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    perfTrendText: {
        color: '#10B981',
        fontSize: 12,
        fontWeight: '700',
    },
    perfHeroSubtext: {
        color: '#6B7280',
        fontSize: 12,
        marginBottom: 24,
    },
    perfMiniChart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        height: 60,
        paddingTop: 10,
    },
    perfChartCol: {
        alignItems: 'center',
        gap: 8,
    },
    perfChartBar: {
        width: 6,
        backgroundColor: colors.dodgerBlue,
        borderRadius: 3,
        opacity: 0.8,
    },
    perfChartDay: {
        color: '#4B5563',
        fontSize: 10,
        fontWeight: '600',
    },
    perfGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 20,
    },
    perfGridCard: {
        width: '48%',
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    perfGridLabel: {
        color: '#6B7280',
        fontSize: 9,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 8,
    },
    headerInfo: {
        paddingHorizontal: 20,
        paddingTop: 12,
        paddingBottom: 20,
    },
    perfGridValue: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        fontFamily: 'serif',
        marginBottom: 4,
    },
    perfGridTrend: {
        color: '#10B981',
        fontSize: 10,
        fontWeight: '600',
    },
    perfTrustCard: {
        backgroundColor: '#161F35',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    perfTrustHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    perfTrustValue: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        fontFamily: 'serif',
    },
    perfImprovingBadge: {
        backgroundColor: '#10B981',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    perfImprovingText: {
        color: '#FFFFFF',
        fontSize: 9,
        fontWeight: '800',
        letterSpacing: 1,
    },
    perfProgressBarBg: {
        height: 6,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 3,
        marginBottom: 12,
        overflow: 'hidden',
    },
    perfProgressBarFill: {
        height: '100%',
        backgroundColor: colors.dodgerBlue,
        borderRadius: 3,
    },
    perfTrustFooter: {
        color: '#6B7280',
        fontSize: 11,
        textAlign: 'center',
    },
    wbHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        gap: 15,
        backgroundColor: '#0A0F1E',
    },
    wbBackBtn: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#161F35',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    wbHeaderTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 2,
    },
    wbRestrictedBadge: {
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
        marginLeft: 'auto',
    },
    wbRestrictedText: {
        color: '#EF4444',
        fontSize: 10,
        fontWeight: '800',
        textTransform: 'uppercase',
    },
    wbAlertBar: {
        flexDirection: 'row',
        backgroundColor: 'rgba(245, 158, 11, 0.05)',
        padding: 16,
        marginHorizontal: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(245, 158, 11, 0.1)',
        alignItems: 'center',
        marginBottom: 20,
    },
    wbAlertText: {
        color: '#F59E0B',
        fontSize: 12,
        lineHeight: 18,
        flex: 1,
    },
    wbFilters: {
        paddingLeft: 20,
        marginBottom: 20,
    },
    wbFilterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: '#161F35',
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    wbFilterChipActive: {
        backgroundColor: '#F59E0B',
        borderColor: '#F59E0B',
    },
    wbFilterChipText: {
        color: '#64748B',
        fontSize: 11,
        fontWeight: '700',
    },
    wbFilterChipTextActive: {
        color: '#0A0F1E',
    },
    wbStatsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginVertical: 20,
        gap: 12,
    },
    wbStatItem: {
        flex: 1,
        backgroundColor: '#161F35',
        padding: 16,
        borderRadius: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    wbStatValue: {
        fontSize: 24,
        fontWeight: '800',
        fontFamily: 'serif',
        marginBottom: 4,
    },
    wbStatLabel: {
        color: '#64748B',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'uppercase',
    },
    wbReportCard: {
        backgroundColor: '#161F35',
        marginHorizontal: 20,
        marginBottom: 16,
        padding: 20,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    wbCardTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 8,
    },
    wbCardTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        flex: 1,
        marginRight: 10,
        lineHeight: 22,
    },
    wbStatusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    wbStatusBadgeText: {
        fontSize: 10,
        fontWeight: '800',
    },
    wbCardMeta: {
        color: '#64748B',
        fontSize: 12,
        marginBottom: 12,
    },
    wbCardDesc: {
        color: '#94A3B8',
        fontSize: 13,
        lineHeight: 20,
        marginBottom: 20,
    },
    wbCardActions: {
        flexDirection: 'row',
        gap: 12,
    },
    wbActionBtn: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wbActionText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    stepIndicatorText: {
        color: '#6B7280',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
        marginLeft: 'auto',
    },
    reportContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    reportSectionTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 16,
        marginTop: 10,
    },
    reportGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 24,
    },
    reportGridItem: {
        width: '48%',
        backgroundColor: '#161F35',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    reportGridItemActive: {
        borderColor: '#00D4AA',
        backgroundColor: 'rgba(0, 212, 170, 0.05)',
    },
    reportGridIcon: {
        fontSize: 24,
        marginBottom: 8,
    },
    reportGridLabel: {
        color: '#9CA3AF',
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    reportGridLabelActive: {
        color: '#00D4AA',
    },
    urgencyRow: {
        flexDirection: 'row',
        backgroundColor: '#161F35',
        borderRadius: 10,
        padding: 4,
        gap: 4,
    },
    urgencyBtn: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 8,
    },
    urgencyBtnActive: {
        backgroundColor: '#1E293B',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    urgencyText: {
        color: '#6B7280',
        fontSize: 13,
        fontWeight: '700',
    },
    urgencyTextActive: {
        color: '#FFFFFF',
    },
    reportTextArea: {
        backgroundColor: '#161F35',
        borderRadius: 12,
        padding: 16,
        color: '#FFFFFF',
        fontSize: 14,
        height: 120,
        textAlignVertical: 'top',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    reportInput: {
        backgroundColor: '#161F35',
        borderRadius: 12,
        padding: 16,
        color: '#FFFFFF',
        fontSize: 14,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    reportLocationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161F35',
        padding: 16,
        borderRadius: 12,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    reportLocationPrimary: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    reportLocationSecondary: {
        color: '#6B7280',
        fontSize: 12,
    },
    reportSwitchRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161F35',
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    reportSwitchTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 4,
    },
    reportSwitchDesc: {
        color: '#6B7280',
        fontSize: 12,
        lineHeight: 16,
    },
    reportSummaryCard: {
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 4,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    summaryLabel: {
        color: '#6B7280',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    summaryValue: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    reportActionRow: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 32,
    },
    reportBackBtn: {
        flex: 1,
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    reportBackBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    },
    reportNextBtn: {
        flex: 2,
        backgroundColor: '#00D4AA',
        paddingVertical: 16,
        alignItems: 'center',
        borderRadius: 12,
    },
    reportNextBtnText: {
        color: '#0A0F1E',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    },
    reportSuccessContainer: {
        alignItems: 'center',
        paddingTop: 40,
    },
    successIconCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 212, 170, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successTitle: {
        color: '#FFFFFF',
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 12,
    },
    successSubtitle: {
        color: '#6B7280',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    returnHomeBtn: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
    },
    returnHomeText: {
        color: '#0A0F1E',
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    },
    privacyContent: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },
    privacyDescription: {
        color: '#9CA3AF',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 24,
    },
    unitStatusBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    // In-Progress Screen Styles
    inProgressRoot: {
        flex: 1,
        backgroundColor: '#0A0F1E',
    },
    inProgressHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    backBtnCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.06)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inProgressTitleContainer: {
        alignItems: 'center',
    },
    inProgressCaseId: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1,
    },
    inProgressStatusRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginTop: 2,
    },
    inProgressDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#3B82F6',
    },
    inProgressStatusText: {
        color: '#3B82F6',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    inProgressScroll: {
        flex: 1,
        padding: 20,
    },
    inProgressInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    inProgressType: {
        color: '#9CA3AF',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
    },
    timerCard: {
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    timerLabel: {
        color: '#64748B',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 2,
        marginBottom: 8,
    },
    timerValue: {
        color: '#FFFFFF',
        fontSize: 48,
        fontWeight: '800',
        fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
        marginBottom: 8,
    },
    timerSubtext: {
        color: '#475569',
        fontSize: 12,
    },
    inProgressMapCard: {
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    inProgressMap: {
        flex: 1,
    },
    mapOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: 'rgba(10, 15, 30, 0.8)',
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    locationText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },
    detailsSection: {
        marginBottom: 40,
    },
    detailsLabel: {
        color: '#64748B',
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 1.5,
        marginBottom: 12,
    },
    detailsText: {
        color: '#CBD5E1',
        fontSize: 15,
        lineHeight: 22,
        marginBottom: 24,
    },
    metaGrid: {
        flexDirection: 'row',
        gap: 20,
    },
    metaItem: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.03)',
        padding: 16,
        borderRadius: 12,
    },
    metaLabel: {
        color: '#475569',
        fontSize: 9,
        fontWeight: '800',
        marginBottom: 4,
    },
    metaValue: {
        color: '#F1F5F9',
        fontSize: 13,
        fontWeight: '600',
    },
    inProgressFooter: {
        padding: 20,
        paddingBottom: Platform.OS === 'ios' ? 40 : 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        backgroundColor: '#0A0F1E',
    },
    resolveLargeBtn: {
        backgroundColor: '#10B981',
        flexDirection: 'row',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        shadowColor: '#10B981',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    resolveLargeBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 1,
    },
    settingsGroup: {
        backgroundColor: '#161F35',
        borderRadius: 16,
        paddingVertical: 4,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    privacySettingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    privacySettingIconBox: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    privacySettingTextContainer: {
        flex: 1,
        marginRight: 10,
    },
    privacySettingTitle: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 2,
    },
    privacySettingSubtitle: {
        color: '#6B7280',
        fontSize: 12,
    },
    toggleTrack: {
        width: 44,
        height: 24,
        borderRadius: 12,
        padding: 2,
        justifyContent: 'center',
    },
    toggleTrackActive: {
        backgroundColor: '#00D4AA',
    },
    toggleTrackInactive: {
        backgroundColor: '#374151',
    },
    toggleThumb: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
    },
    toggleThumbActive: {
        alignSelf: 'flex-end',
    },
    toggleThumbInactive: {
        alignSelf: 'flex-start',
    },
    deleteDataButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.1)',
    },
    deleteDataIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    deleteDataTextContainer: {
        flex: 1,
    },
    deleteDataTitle: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    deleteDataSubtitle: {
        color: '#6B7280',
        fontSize: 12,
    },
    dispatchHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 24,
        gap: 16,
    },
    dispatchAlertBox: {
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.2)',
        marginBottom: 32,
    },
    dispatchAlertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 6,
    },
    dispatchAlertDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#EF4444',
    },
    dispatchAlertTitle: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '700',
        fontFamily: 'serif',
    },
    dispatchAlertSubtext: {
        color: '#9CA3AF',
        fontSize: 13,
        marginLeft: 20,
    },
    dispatchSectionLabel: {
        color: '#6B7280',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    sectionHeaderPadding: {
        paddingHorizontal: 20,
        marginBottom: 16,
    },
    sectionHeaderPaddingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 32,
        marginBottom: 16,
    },
    quickDispatchGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        gap: 12,
    },
    quickDispatchCard: {
        width: '48%',
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    quickDispatchText: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '600',
    },
    allUnitsLink: {
        color: colors.dodgerBlue,
        fontSize: 12,
        fontWeight: '600',
    },
    unitCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#161F35',
        marginHorizontal: 20,
        padding: 16,
        borderRadius: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        gap: 16,
    },
    unitIconBox: {
        width: 48,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    unitIconText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '800',
    },
    unitInfo: {
        flex: 1,
    },
    unitTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 4,
    },
    unitLocationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    unitLocationText: {
        color: '#6B7280',
        fontSize: 11,
    },
    unitStatusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
    },
    unitStatusBadgeText: {
        fontSize: 10,
        fontWeight: '800',
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
});