import * as Location from 'expo-location';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import SideDrawer from '../../components/SideDrawer';
import { BASE_URL } from '../../config/api';
import { colors } from '../../theme/index';
import { AuthStorage } from '../../utils/authStorage';
// ─── Icons (unchanged) ────────────────────────────────────────────────────────

const TrackReportIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M12.8933 11.4983C14.7831 11.7539 16.4174 12.2422 17.5796 12.8803C18.8996 13.6046 19.6761 14.5568 19.6761 15.6474C19.6761 16.9968 18.465 18.146 16.5085 18.911C14.7864 19.5849 12.4278 20 9.83804 20C7.24994 20 4.88972 19.5833 3.16758 18.911C1.21104 18.1476 0 16.9985 0 15.6491C0 14.5422 0.799219 13.5802 2.1535 12.851C3.345 12.2097 5.01831 11.723 6.95044 11.4772L7.15879 13.1228C5.43338 13.3409 3.96191 13.7641 2.93969 14.3143C2.13722 14.7457 1.66517 15.2112 1.66517 15.6491C1.66517 16.2432 2.4709 16.8552 3.77309 17.3631C5.30968 17.9637 7.45341 18.3348 9.83804 18.3348C12.2227 18.3348 14.3664 17.9637 15.903 17.3631C17.2052 16.8536 18.0109 16.2416 18.0109 15.6491C18.0109 15.221 17.5551 14.7636 16.7787 14.3387C15.7874 13.7951 14.3566 13.3719 12.6719 13.144L12.8933 11.4983ZM10.634 7.22064V15.5009H8.96883V7.22064C7.34923 6.843 6.14308 5.39106 6.14308 3.65752C6.14308 1.6375 7.78058 0 9.80223 0C11.8223 0 13.4598 1.6375 13.4598 3.65752C13.4598 5.39269 12.2536 6.84463 10.634 7.22064Z" fill="#F59E0B" />
    </Svg>
);

const SafetyMapIcon = () => (
    <Svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M19.7038 1.70107C19.6117 1.62927 19.5044 1.5794 19.3901 1.55524C19.2758 1.53109 19.1575 1.53328 19.0442 1.56165L13.1663 3.03088L7.26731 0.0808765C7.10295 -0.00110457 6.91468 -0.0215686 6.73654 0.0231843L0.582692 1.56165C0.416277 1.60324 0.268541 1.69927 0.162964 1.83446C0.0573861 1.96966 2.59719e-05 2.13626 0 2.3078V16.154C1.76969e-05 16.2708 0.0266722 16.3862 0.0779392 16.4912C0.129206 16.5963 0.203737 16.6882 0.295872 16.7602C0.388006 16.8321 0.49532 16.9821 0.609663 16.9063C0.724007 16.9306 0.842372 16.9284 0.955769 16.9001L6.83365 15.4309L12.7327 18.3809C12.8398 18.4337 12.9575 18.4613 13.0769 18.4616C13.1398 18.4616 13.2025 18.4539 13.2635 18.4386L19.4173 16.9001C19.5837 16.8585 19.7315 16.7625 19.837 16.6273C19.9426 16.4921 20 16.3255 20 16.154V2.3078C20 2.1908 19.9734 2.07535 19.922 1.97021C19.8707 1.86507 19.7961 1.77302 19.7038 1.70107ZM6.92308 13.8463C6.86019 13.8463 6.79754 13.854 6.73654 13.8693L1.53846 15.1684V2.90876L6.83365 1.58472L6.92308 1.62895V13.8463ZM18.4615 15.553L13.1663 16.877L13.0769 16.8328V4.61549C13.1398 4.61577 13.2024 4.60834 13.2635 4.59338L18.4615 3.29338V15.553Z" fill="#F59E0B" />
    </Svg>
);

const EmergencyIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path d="M15.9142 12.0287C15.7723 13.1075 15.2424 14.0978 14.4237 14.8146C13.605 15.5313 12.5533 15.9256 11.4651 15.9236C5.14339 15.9236 7.20443e-06 10.7802 7.20443e-06 4.4585C-0.00194344 3.37034 0.392279 2.31868 1.10905 1.49994C1.82581 0.681192 2.8161 0.151359 3.89496 0.00939315C4.16778 -0.0239187 4.44406 0.031895 4.68254 0.168502C4.92103 0.30511 5.10895 0.515184 5.21823 0.767365L6.89978 4.5214V4.53095C6.98345 4.72399 7.01801 4.93475 7.00036 5.1444C6.98272 5.35405 6.91342 5.55606 6.79867 5.7324C6.78434 5.7539 6.76921 5.7738 6.75328 5.79371L5.09562 7.7587C5.69196 8.9705 6.9595 10.2269 8.18722 10.8248L10.1251 9.17592C10.1442 9.1599 10.1641 9.14502 10.1849 9.13133C10.3611 9.01382 10.5638 8.94208 10.7747 8.92262C10.9855 8.90316 11.198 8.93658 11.3927 9.01987L11.403 9.02464L15.1539 10.7054C15.4065 10.8143 15.6171 11.002 15.7541 11.2406C15.8912 11.4791 15.9474 11.7556 15.9142 12.0287Z" fill="#F59E0B" />
    </Svg>
);

const CommunityIcon = () => (
    <Svg width="20" height="12" viewBox="0 0 20 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M5.98122 4.7832H6.83356V5.6543H5.98122V4.7832ZM5.36091 8.30117H8.61559V11.3891H12.1222V6.05312C12.1222 6.03828 12.1238 6.02422 12.1265 6.01016L7.01091 2.26641L1.78786 6.01211C1.79294 6.03047 1.79567 6.05 1.79567 6.06992V11.3891H5.36091V8.30117ZM12.6855 11.7285C12.6855 11.852 12.5855 11.9523 12.4613 11.9523H1.45622C1.33239 11.9523 1.232 11.852 1.232 11.7285V6.30312C0.083171 6.74531 -0.34222 5.33125 0.299577 4.82578L6.81911 0.0589834C6.89841 -0.0136729 7.02067 -0.0210947 7.10817 0.0472646L13.6418 4.80391C13.6414 4.80469 13.666 4.82578 13.6683 4.82851C14.4418 5.66133 13.6265 6.76133 12.6855 6.31719V11.7285ZM13.4929 8.30117H14.3945V11.4695H18.4609V6.36445C18.4609 6.34765 18.4632 6.33086 18.4672 6.31523L13.9906 3.10469L13.3336 3.58555L11.9836 2.60273L13.907 1.20234C13.9428 1.17442 13.9873 1.16011 14.0327 1.16197C14.078 1.16383 14.1213 1.18174 14.1547 1.2125L17.664 3.77812V2.54726H19.1914V4.89492L19.7433 5.29844C20.2914 5.72422 19.9328 6.94531 18.9441 6.56445V11.7605C18.9441 11.8664 18.8578 11.9523 18.7519 11.9523H13.4683L13.4929 11.7285V8.30117ZM7.99489 5.94453H7.14294V6.81562H7.99489V5.94453ZM5.98122 5.94453H6.83356V6.81562H5.98122V5.94453ZM7.99489 4.7832H7.14294V5.6543H7.99489V4.7832Z"
            fill="#F59E0B"
        />
    </Svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

export default function MainHomeScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // ── Data state ──────────────────────────────────────────────────────────
    const [userName, setUserName] = useState('Community Member');
    const [analytics, setAnalytics] = useState(null);
    const [communityCount, setCommunityCount] = useState(null);
    const [locationName, setLocationName] = useState('Getting location...');
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    // ── Get token on mount ──────────────────────────────────────────────────
    useEffect(() => {
        (async () => {
            const t = await AuthStorage.getToken();
            setToken(t);
        })();
    }, []);

    // ── Fetch all data (only when token is available) ───────────────────────
    const fetchData = useCallback(async () => {
        if (!token) return;

        setLoading(true);
        try {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            };

            // 1. User name — already stored locally from login, no extra call needed
            const storedUser = await AuthStorage.getUser();
            if (storedUser?.name) {
                setUserName(storedUser.name);
            }

            // 2. Device location — get coords for both display name and
            //    community watch radius filter
            let latitude = null;
            let longitude = null;

            try {
                const { status } = await Location.requestForegroundPermissionsAsync();

                if (status === 'granted') {
                    const loc = await Location.getCurrentPositionAsync({});
                    latitude = loc.coords.latitude;
                    longitude = loc.coords.longitude;

                    // Reverse geocode to get a human-readable area name
                    const [place] = await Location.reverseGeocodeAsync({ latitude, longitude });
                    const areaName =
                        place.district ||
                        place.subregion ||
                        place.city ||
                        'Your Area';
                    setLocationName(areaName);
                } else {
                    setLocationName('Location denied');
                }
            } catch (locErr) {
                console.error('Location error:', locErr.message);
                setLocationName('Location unavailable');
            }

            // 3. My report analytics → /api/reporter/analytics
            try {
                const analyticsUrl = `${BASE_URL}/api/reporter/analytics`;
                const analyticsRes = await fetch(analyticsUrl, { headers });
                if (analyticsRes.ok) {
                    const analyticsData = await analyticsRes.json();
                    setAnalytics(analyticsData);
                }
            } catch (analyticsErr) {
                console.error('Analytics fetch error:', analyticsErr.message);
            }

            // 4. Community watch → /api/reporter/community-watch
            try {
                const baseUrl = `${BASE_URL}/api/reporter/community-watch`;
                const communityUrl =
                    latitude !== null && longitude !== null
                        ? `${baseUrl}?lat=${latitude}&lng=${longitude}`
                        : baseUrl;

                const communityRes = await fetch(communityUrl, { headers });
                if (communityRes.ok) {
                    const communityData = await communityRes.json();
                    setCommunityCount(communityData.length);
                }
            } catch (communityErr) {
                console.error('Community watch fetch error:', communityErr.message);
            }

        } catch (err) {
            console.error('Home fetch error:', err.message);
        } finally {
            setLoading(false);
        }
    }, [token]);

    // ── Only fetch when token is ready ──────────────────────────────────────
    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token, fetchData]);

    // ── Helpers ─────────────────────────────────────────────────────────────
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return 'Good morning';
        if (hour >= 12 && hour < 18) return 'Good afternoon';
        return 'Good evening';
    };

    // "Reviewing" combines under_review + assigned (both mean admin is looking at it)
    const reviewing = analytics
        ? (analytics.underReview ?? 0) + (analytics.assigned ?? 0)
        : 0;

    // Alert badge level based on nearby incident count
    const alertLevel =
        communityCount === null ? '—'
            : communityCount === 0 ? 'ALL CLEAR'
                : communityCount <= 2 ? 'LOW ALERT'
                    : communityCount <= 5 ? 'MODERATE ALERT'
                        : 'HIGH ALERT';

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Side Drawer Component */}
            <SideDrawer
                visible={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                navigation={navigation}
                userName={userName}
            />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.iconButton} onPress={() => setIsDrawerOpen(true)}>
                    <Text style={styles.iconText}>☰</Text>
                </TouchableOpacity>
                <View style={styles.logoContainer}>
                    <View style={styles.logoBox}>
                        <Text style={styles.logoLetter}>A</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Notifications')}>
                    <Text style={styles.iconText}>🔔</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom + 25, 100) }]} showsVerticalScrollIndicator={false}>

                {/* Greeting */}
                <View style={styles.greetingSection}>
                    <Text style={styles.greetingTitle}>{getGreeting()}, {userName}.</Text>
                    <Text style={styles.greetingSubtitle}>Your community stays safer when you speak up.</Text>
                </View>

                {/* Safety Status Card */}
                <View style={styles.statusCard}>
                    <View style={styles.statusHeaderRow}>
                        <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>{alertLevel}</Text>
                        </View>
                        <Text style={styles.statusLocation}>📍 {locationName}</Text>
                    </View>
                    {loading ? (
                        <ActivityIndicator color={colors.caribbeanGreen} style={{ marginVertical: 8 }} />
                    ) : (
                        <>
                            <Text style={styles.statusTitle}>
                                {communityCount !== null
                                    ? `${communityCount} Active Incident${communityCount !== 1 ? 's' : ''}`
                                    : '— Active Incidents'}
                            </Text>
                            <Text style={styles.statusDesc}>
                                Reported within a 5km radius in the last 24 hours.
                            </Text>
                        </>
                    )}
                </View>

                {/* Emergency SOS Banner */}
                <TouchableOpacity style={styles.sosBanner} activeOpacity={0.8} onPress={() => navigation.navigate('Sos')}>
                    <Text style={styles.sosIcon}>🚨</Text>
                    <View style={styles.sosTextContainer}>
                        <Text style={styles.sosTitle}>Emergency SOS</Text>
                        <Text style={styles.sosDesc}>Broadcast your live location to security.</Text>
                    </View>
                </TouchableOpacity>

                {/* Primary Action */}
                <TouchableOpacity
                    style={styles.reportBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ReportIncident')}
                >
                    <Text style={styles.reportBtnText}>+ REPORT AN INCIDENT</Text>
                </TouchableOpacity>

                {/* Quick Actions Grid */}
                <Text style={styles.sectionTitle}>Quick Actions</Text>
                <View style={styles.quickActionsGrid}>
                    {[
                        { title: 'Track Report', icon: <TrackReportIcon />, route: 'Reports' },
                        { title: 'Safety Map', icon: <SafetyMapIcon />, route: 'Map' },
                        { title: 'Community', icon: <CommunityIcon />, route: 'CommunityWatch' },
                        { title: 'Emergency', icon: <EmergencyIcon />, route: 'Sos' },
                    ].map((action, i) => (
                        <TouchableOpacity
                            key={i}
                            style={styles.actionCard}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate(action.route)}
                        >
                            <View style={{ marginBottom: 12, height: 28, justifyContent: 'center', alignItems: 'center' }}>
                                {action.icon}
                            </View>
                            <Text style={styles.actionTitle}>{action.title}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* My Reports Summary */}
                <Text style={styles.sectionTitle}>My Reports</Text>
                <View style={styles.reportsSummaryRow}>
                    <View style={styles.reportStatBox}>
                        {loading ? (
                            <ActivityIndicator color={colors.white} />
                        ) : (
                            <Text style={styles.statCount}>{analytics?.total ?? '—'}</Text>
                        )}
                        <Text style={styles.statLabel}>Submitted</Text>
                    </View>
                    <View style={styles.reportStatBox}>
                        {loading ? (
                            <ActivityIndicator color={colors.buttercup} />
                        ) : (
                            <Text style={[styles.statCount, { color: colors.buttercup }]}>{reviewing}</Text>
                        )}
                        <Text style={styles.statLabel}>Reviewing</Text>
                    </View>
                    <View style={styles.reportStatBox}>
                        {loading ? (
                            <ActivityIndicator color={colors.dodgerBlue} />
                        ) : (
                            <Text style={[styles.statCount, { color: colors.dodgerBlue }]}>{analytics?.resolved ?? '—'}</Text>
                        )}
                        <Text style={styles.statLabel}>Resolved</Text>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

// ─── Styles (completely unchanged) ───────────────────────────────────────────

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.ebonyDark,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    iconButton: {
        padding: 8,
    },
    iconText: {
        fontSize: 20,
        color: colors.white,
    },
    logoContainer: {
        alignItems: 'center',
    },
    logoBox: {
        width: 28,
        height: 28,
        backgroundColor: colors.caribbeanGreen,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoLetter: {
        fontFamily: 'serif',
        fontWeight: '900',
        fontSize: 16,
        color: colors.ebony,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },

    // Greeting
    greetingSection: {
        marginBottom: 24,
    },
    greetingTitle: {
        fontFamily: 'serif',
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 6,
    },
    greetingSubtitle: {
        fontSize: 13,
        color: colors.palesky,
        lineHeight: 20,
    },

    // Status Card
    statusCard: {
        backgroundColor: 'rgba(0, 212, 170, 0.05)',
        borderColor: 'rgba(0, 212, 170, 0.2)',
        borderWidth: 1,
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
    },
    statusHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    statusBadge: {
        backgroundColor: 'rgba(245, 158, 11, 0.15)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 16,
    },
    statusBadgeText: {
        color: colors.buttercup,
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    statusLocation: {
        color: colors.palesky,
        fontSize: 12,
    },
    statusTitle: {
        fontFamily: 'serif',
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 4,
    },
    statusDesc: {
        color: colors.palesky,
        fontSize: 12,
    },

    // SOS Banner
    sosBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        borderColor: 'rgba(220, 38, 38, 0.3)',
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
        marginBottom: 24,
    },
    sosIcon: {
        fontSize: 24,
        marginRight: 16,
    },
    sosTextContainer: {
        flex: 1,
    },
    sosTitle: {
        color: '#FCA5A5',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 2,
    },
    sosDesc: {
        color: colors.palesky,
        fontSize: 12,
    },

    // Primary Action
    reportBtn: {
        backgroundColor: colors.caribbeanGreen,
        paddingVertical: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 32,
    },
    reportBtnText: {
        color: colors.ebonyDark,
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 0.5,
    },

    // Quick Actions
    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.white,
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    quickActionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 32,
    },
    actionCard: {
        width: '47%',
        backgroundColor: colors.bigStone,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    actionIcon: {
        fontSize: 24,
    },
    actionTitle: {
        color: colors.white,
        fontSize: 12,
        fontWeight: '500',
    },

    // Summary
    reportsSummaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },
    reportStatBox: {
        flex: 1,
        backgroundColor: colors.bigStone,
        borderRadius: 10,
        padding: 16,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statCount: {
        fontFamily: 'serif',
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 4,
    },
    statLabel: {
        color: colors.palesky,
        fontSize: 11,
    },
});