import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState, useRef } from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions,
    Platform,
    StatusBar,
    Alert,
    Animated
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import CarIcon from '../../components/icons/CarIcon';
import OfficerMapView from '../../components/OfficerMapView';
import { colors } from '../../theme/index';
import { clearUserSession, loadUserProfile } from '../../utils/userStorage';
import { WebView } from 'react-native-webview';

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

const LogoutIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M16 17l5-5-5-5M21 12H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const TeamIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Circle cx="9" cy="7" r="4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M23 21v-2a4 4 0 00-3-3.87" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M16 3.13a4 4 0 010 7.75" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const BarChartIcon = ({ color = '#9CA3AF' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M18 20V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 20V4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M6 20v-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const DispatchIcon = ({ color = '#C9D1D9' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M15.05 5A5 5 0 0119 8.95M15.07 3A7 7 0 0121 8.94" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.8 10.72 19.79 19.79 0 01.73 2.1 2 2 0 012.72 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.08 6.08l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const MegaphoneIcon = ({ color = '#C9D1D9' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Path d="M21 15a2 2 0 000-4V3l-9 4H5a2 2 0 00-2 2v4a2 2 0 002 2h1l2 5h2l-1-5h3l9 4v-3a2 2 0 000-4z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const LockIcon = ({ color = '#C9D1D9' }) => (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M7 11V7a5 5 0 0110 0v4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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

const DASHBOARD_INCIDENTS = [
    { id: 'i1', latitude: 6.4516, longitude: 3.3872, color: '#EF4444' },
    { id: 'i2', latitude: 6.4541, longitude: 3.3960, color: '#DC2626' },
    { id: 'i3', latitude: 6.4522, longitude: 3.3920, color: '#F59E0B' },
    { id: 'i4', latitude: 6.4558, longitude: 3.3905, color: '#F97316' },
];

const DASHBOARD_OFFICERS = [
    { id: 'o1', latitude: 6.4535, longitude: 3.3965, color: '#3B82F6' },
    { id: 'o2', latitude: 6.4508, longitude: 3.3880, color: '#10B981' },
    { id: 'o3', latitude: 6.4550, longitude: 3.3930, color: '#8B5CF6' },
];

const MINI_MAP_REGION = {
    latitude: 6.4532,
    longitude: 3.3942,
    latitudeDelta: 0.022,
    longitudeDelta: 0.018,
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

const MOCK_CASES = [
    {
        id: 'AEG-00891',
        title: 'Armed robbery — Apongbon Bridge area',
        priority: 'HIGH',
        time: '08:14',
        witness: 'Anonymous',
        distance: '0.8 km',
        duration: '42 min open',
        media: '1 photo',
        status: 'DISPATCHED',
        officers: ['K', 'T']
    },
    {
        id: 'AEG-00893',
        title: 'Gunshots reported near Marina waterfront',
        priority: 'HIGH',
        time: '09:38',
        witness: '2 reports',
        distance: '1.1 km',
        duration: '3 min open',
        media: 'None',
        status: 'UNASSIGNED',
        officers: []
    },
    {
        id: 'AEG-00887',
        title: 'Suspicious gathering — CMS bus stop',
        priority: 'MEDIUM',
        time: '07:52',
        witness: 'Verified resident',
        distance: '1.4 km',
        duration: 'Unit Bravo dispatched',
        media: 'None',
        status: 'DISPATCHED',
        officers: ['F']
    },
    {
        id: 'AEG-00895',
        title: 'Vandalism at Power Substation',
        priority: 'MEDIUM',
        time: '10:05',
        witness: 'Security Cam',
        distance: '2.1 km',
        duration: '10 min open',
        media: 'Video',
        status: 'UNASSIGNED',
        officers: []
    },
    {
        id: 'AEG-00896',
        title: 'Traffic Collision — Eko Bridge',
        priority: 'LOW',
        time: '10:15',
        witness: 'Motorist',
        distance: '0.5 km',
        duration: '5 min open',
        media: 'None',
        status: 'UNASSIGNED',
        officers: []
    },
    {
        id: 'AEG-00897',
        title: 'Illegal Street Racing',
        priority: 'HIGH',
        time: '10:20',
        witness: 'Anonymous',
        distance: '3.2 km',
        duration: '2 min open',
        media: '1 photo',
        status: 'UNASSIGNED',
        officers: []
    }
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

const MOCK_UNITS = [
    { id: 'B-3', status: 'On scene', location: 'Apongbon Bridge', officers: '2 officers', type: 'Active', color: '#3B82F6' },
    { id: 'A-1', status: 'Patrolling', location: 'Victoria Island sector', type: 'Patrol', color: '#10B981' },
    { id: 'C-2', status: 'Available', location: 'HQ - Ready for deployment', type: 'Ready', color: '#6B7280' },
];

export default function DashboardScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [userName, setUserName] = useState('Officer');

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('dashboard');
    const [liveCounter, setLiveCounter] = useState(0);
    const [currentLocation, setCurrentLocation] = useState('LAGOS ISLAND');
    const [caseFilter, setCaseFilter] = useState('ALL');
    const [wbFilter, setWbFilter] = useState('RECENT');

    // Crime Reporting State
    const [reportStep, setReportStep] = useState(1);
    const [incidentType, setIncidentType] = useState('');
    const [urgency, setUrgency] = useState('Medium');
    const [description, setDescription] = useState('');
    const [suspects, setSuspects] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    // Privacy State (Isolated)
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

    // Drawer Animations
    const drawerWidth = Dimensions.get('window').width * 0.78;
    const slideAnim = useRef(new Animated.Value(-drawerWidth)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isDrawerOpen) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -drawerWidth,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [isDrawerOpen]);

    const closeDrawer = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -drawerWidth,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 250,
                useNativeDriver: true,
            })
        ]).start(() => setIsDrawerOpen(false));
    };

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
            } catch (_) {}
        })();
    }, []);

    useEffect(() => {
        loadUserProfile().then((profile) => {
            if (profile?.displayName) {
                const name = profile.displayName.charAt(0).toUpperCase() + profile.displayName.slice(1);
                setUserName(name);
            }
        });
    }, []);

    useEffect(() => {
        const t = setInterval(() => setLiveCounter(s => s + 1), 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }]}>
            <View style={styles.container}>
                {/* Side Drawer Overlay */}
                <Modal visible={isDrawerOpen} transparent animationType="none">
                    <View style={styles.drawerOverlay}>
                        {/* Backdrop */}
                        <TouchableWithoutFeedback onPress={closeDrawer}>
                            <Animated.View style={[styles.drawerBackdrop, { opacity: fadeAnim }]} />
                        </TouchableWithoutFeedback>

                        {/* Drawer Container */}
                        <Animated.View style={[styles.drawerContainer, { transform: [{ translateX: slideAnim }] }]}>
                            {/* Header */}
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
                                {/* OPERATIONS */}
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
                                    onPress={() => { closeDrawer(); Alert.alert('Incoming Alerts', 'Alerts module coming soon.'); }}
                                >
                                    <Ionicons name="notifications-outline" size={22} color="#F59E0B" />
                                    <Text style={styles.drawerMenuText}>Incoming Alerts</Text>
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

                                {/* TEAM OVERVIEW */}
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

                                {/* ACCOUNT */}
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

                            {/* Footer */}
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

                {activeTab === 'dashboard' ? (
                    <>
                        {/* Top Navigation Bar */}
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
                            <TouchableOpacity style={styles.iconButton}>
                                <BellIcon color="#9CA3AF" />
                                <View style={styles.notificationDot} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
                            {/* Header Info */}
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
                                        <Text style={styles.reportsPendingText}>12 Reports Pending</Text>
                                        <Text style={styles.reportsSubtext}>7 active cases • 3 units deployed • 2 high priority</Text>
                                    </View>
                                    <CarIcon size={32} color="#F59E0B" />
                                </View>
                            </LinearGradient>

                            {/* Today's Overview */}
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>TODAY'S OVERVIEW</Text>
                                <TouchableOpacity onPress={() => setActiveTab('cases')}>
                                    <Text style={styles.fullStatsText}>Full stats →</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Stats Grid */}
                            <View style={styles.statsGrid}>
                                {/* Card 1 */}
                                <View style={styles.statCard}>
                                    <Text style={[styles.statNumber, { color: colors.dodgerBlue }]}>12</Text>
                                    <Text style={styles.statLabel}>Incoming Reports</Text>
                                    <Text style={[styles.statTrend, { color: colors.caribbeanGreen }]}>! 3 since last shift</Text>
                                </View>
                                {/* Card 2 */}
                                <View style={styles.statCard}>
                                    <Text style={[styles.statNumber, { color: '#F59E0B' }]}>7</Text>
                                    <Text style={styles.statLabel}>Active Cases</Text>
                                    <Text style={[styles.statTrend, { color: '#EF4444' }]}>! 2 escalated</Text>
                                </View>
                                {/* Card 3 */}
                                <View style={styles.statCard}>
                                    <Text style={[styles.statNumber, { color: colors.caribbeanGreen }]}>5</Text>
                                    <Text style={styles.statLabel}>Resolved Today</Text>
                                    <Text style={[styles.statTrend, { color: colors.caribbeanGreen }]}>↑ +2 vs yesterday</Text>
                                </View>
                                {/* Card 4 */}
                                <View style={styles.statCard}>
                                    <Text style={[styles.statNumber, { color: '#06B6D4' }]}>18m</Text>
                                    <Text style={styles.statLabel}>Avg Response Time</Text>
                                    <Text style={[styles.statTrend, { color: colors.caribbeanGreen }]}>↓ improved 4m</Text>
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

                            {/* Map Preview Widget - Real live mini-map */}
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
                                >
                                    {DASHBOARD_INCIDENTS.map(inc => (
                                        <Marker
                                            key={inc.id}
                                            coordinate={{ latitude: inc.latitude, longitude: inc.longitude }}
                                            tracksViewChanges={false}
                                        >
                                            <View style={[styles.miniPin, { backgroundColor: inc.color, borderColor: `${inc.color}55` }]} />
                                        </Marker>
                                    ))}
                                    {DASHBOARD_OFFICERS.map(off => (
                                        <Marker
                                            key={off.id}
                                            coordinate={{ latitude: off.latitude, longitude: off.longitude }}
                                            tracksViewChanges={false}
                                        >
                                            <View style={[styles.miniOfficerPin, { backgroundColor: off.color }]} />
                                        </Marker>
                                    ))}
                                </MapView>

                                {/* Overlay footer */}
                                <View style={styles.mapFooter}>
                                    <View style={styles.mapBadge}>
                                        <Text style={styles.mapBadgeText}>LIVE MAP</Text>
                                    </View>
                                    <View style={styles.mapLivePill}>
                                        <View style={styles.mapLiveDot} />
                                        <Text style={styles.mapLiveText}>Live · {liveCounter}s</Text>
                                    </View>
                                </View>

                                {/* Tap to expand hint */}
                                <View style={styles.mapExpandHint}>
                                    <Text style={styles.mapExpandText}>TAP TO EXPAND ↗</Text>
                                </View>
                            </TouchableOpacity>

                            {/* Priority Cases */}
                            <View style={styles.sectionHeaderSpacing}>
                                <Text style={styles.sectionTitle}>PRIORITY CASES</Text>
                                <TouchableOpacity onPress={() => setActiveTab('cases')}>
                                    <Text style={styles.fullStatsText}>All cases →</Text>
                                </TouchableOpacity>
                            </View>

                            {/* Case 1: High */}
                            <View style={styles.caseCard}>
                                <View style={styles.caseHeader}>
                                    <View style={[styles.priorityBadge, { backgroundColor: 'rgba(239, 68, 68, 0.1)' }]}>
                                        <Text style={[styles.priorityBadgeText, { color: '#EF4444' }]}>HIGH</Text>
                                    </View>
                                    <Text style={styles.caseTitle}>Armed robbery — Apongbon Bridge area</Text>
                                </View>
                                <Text style={styles.caseMeta}>Case #AEG-00891  ·  Submitted 08:14</Text>
                                <View style={styles.caseMetaRow}>
                                    <Text style={styles.caseDistance}>0.8 km</Text>
                                    <Text style={styles.caseAnonymous}>Anonymous</Text>
                                </View>
                                <View style={styles.caseFooter}>
                                    <View style={styles.avatarRow}>
                                        <View style={[styles.avatar, { backgroundColor: colors.dodgerBlue }]}><Text style={styles.avatarText}>K</Text></View>
                                        <View style={[styles.avatar, { backgroundColor: '#8B5CF6', marginLeft: -8 }]}><Text style={styles.avatarText}>T</Text></View>
                                    </View>
                                    <TouchableOpacity 
                                        style={styles.actionButton}
                                        onPress={() => Alert.alert('Assign Unit', 'Assigning Unit Bravo to this case...')}
                                    >
                                        <Text style={styles.actionButtonText}>ASSIGN UNIT</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Case 2: Medium */}
                            <View style={styles.caseCard}>
                                <View style={styles.caseHeader}>
                                    <View style={[styles.priorityBadge, { backgroundColor: 'rgba(245, 158, 11, 0.1)' }]}>
                                        <Text style={[styles.priorityBadgeText, { color: '#F59E0B' }]}>MEDIUM</Text>
                                    </View>
                                    <Text style={styles.caseTitle}>Suspicious gathering near CMS bus stop</Text>
                                </View>
                                <Text style={styles.caseMeta}>Case #AEG-00887  ·  Submitted 07:52</Text>
                                <View style={styles.caseMetaRow}>
                                    <Text style={styles.caseDistance}>1.4 km</Text>
                                    <Text style={styles.caseAnonymous}>Verified</Text>
                                </View>
                                <View style={styles.caseFooter}>
                                    <View style={styles.avatarRow}>
                                        <View style={[styles.avatar, { backgroundColor: colors.caribbeanGreen }]}><Text style={styles.avatarText}>F</Text></View>
                                    </View>
                                    <TouchableOpacity style={styles.outlineButton}>
                                        <Text style={styles.outlineButtonText}>VIEW CASE</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Incoming Reports */}
                            <View style={styles.sectionHeaderSpacing}>
                                <Text style={styles.sectionTitle}>INCOMING REPORTS</Text>
                                <TouchableOpacity onPress={() => setActiveTab('cases')}>
                                    <Text style={styles.fullStatsText}>All →</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.reportCard}>
                                <View style={styles.reportHeader}>
                                    <View style={styles.reportDot} />
                                    <Text style={styles.reportTitle}>Gunshots heard near Marina waterfront</Text>
                                    <View style={[styles.priorityBadge, { backgroundColor: 'rgba(239, 68, 68, 0.1)', marginLeft: 'auto' }]}>
                                        <Text style={[styles.priorityBadgeText, { color: '#EF4444' }]}>URGENT</Text>
                                    </View>
                                </View>
                                <Text style={styles.reportMeta}>3 min ago  ·  2 corroborating</Text>
                            </View>

                        </ScrollView>
                    </>
                ) : activeTab === 'dispatch' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        {/* Dispatch Header */}
                        <View style={styles.dispatchHeaderContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.casesBackBtn}>
                                <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>DISPATCH</Text>
                        </View>

                        {/* Priority Alert Box */}
                        <View style={styles.dispatchAlertBox}>
                            <View style={styles.dispatchAlertHeader}>
                                <View style={styles.dispatchAlertDot} />
                                <Text style={styles.dispatchAlertTitle}>2 High Priority Cases</Text>
                            </View>
                            <Text style={styles.dispatchAlertSubtext}>Immediate response required. Assign units now.</Text>
                        </View>

                        {/* Quick Dispatch Section */}
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

                        {/* Units On Duty Section */}
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
                                        <Text style={styles.unitLocationText}>{unit.location} {unit.officers ? `· ${unit.officers}` : ''}</Text>
                                    </View>
                                </View>
                                <View style={[styles.unitStatusBadge, { backgroundColor: unit.color + '15' }]}>
                                    <Text style={[styles.unitStatusBadgeText, { color: unit.color }]}>{unit.type}</Text>
                                </View>
                            </View>
                        ))}
                        <View style={{ height: 40 }} />
                    </ScrollView>
                ) : activeTab === 'cases' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        {/* Active Cases View */}
                        <View style={styles.casesHeaderContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('dashboard')} style={styles.casesBackBtn}>
                                <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>ACTIVE CASES</Text>
                        </View>

                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.casesFilters} contentContainerStyle={{ paddingRight: 20 }}>
                            <TouchableOpacity 
                                style={[styles.filterChip, caseFilter === 'ALL' && styles.filterChipActive]}
                                onPress={() => setCaseFilter('ALL')}
                            >
                                <Text style={[styles.filterChipText, caseFilter === 'ALL' && styles.filterChipTextActive]}>ALL (6)</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.filterChip, caseFilter === 'HIGH' && styles.filterChipActive]}
                                onPress={() => setCaseFilter('HIGH')}
                            >
                                <Text style={[styles.filterChipText, caseFilter === 'HIGH' && styles.filterChipTextActive]}>HIGH</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.filterChip, caseFilter === 'UNASSIGNED' && styles.filterChipActive]}
                                onPress={() => setCaseFilter('UNASSIGNED')}
                            >
                                <Text style={[styles.filterChipText, caseFilter === 'UNASSIGNED' && styles.filterChipTextActive]}>UNASSIGNED</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.filterChip, caseFilter === 'DISPATCHED' && styles.filterChipActive]}
                                onPress={() => setCaseFilter('DISPATCHED')}
                            >
                                <Text style={[styles.filterChipText, caseFilter === 'DISPATCHED' && styles.filterChipTextActive]}>DISPATCHED</Text>
                            </TouchableOpacity>
                        </ScrollView>

                        {MOCK_CASES.filter(c => {
                            if (caseFilter === 'ALL') return true;
                            if (caseFilter === 'HIGH') return c.priority === 'HIGH';
                            if (caseFilter === 'UNASSIGNED') return c.status === 'UNASSIGNED';
                            if (caseFilter === 'DISPATCHED') return c.status === 'DISPATCHED';
                            return true;
                        }).map((c) => (
                            <View key={c.id} style={styles.casesCard}>
                                <View style={styles.caseHeader}>
                                    <View style={[styles.priorityBadge, { backgroundColor: c.priority === 'HIGH' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)' }]}>
                                        <Text style={[styles.priorityBadgeText, { color: c.priority === 'HIGH' ? '#EF4444' : '#F59E0B' }]}>{c.priority}</Text>
                                    </View>
                                    <Text style={styles.casesCardTitle}>{c.title}</Text>
                                </View>
                                <Text style={styles.casesCardMeta}>Case #{c.id}  ·  {c.time}  ·  Source: {c.witness}</Text>
                                <Text style={styles.casesCardMeta}>{c.distance}    {c.duration}    {c.media !== 'None' ? c.media : ''}</Text>
                                <View style={styles.casesCardFooter}>
                                    {c.status === 'UNASSIGNED' ? (
                                        <>
                                            <Text style={styles.unassignedText}>Unassigned</Text>
                                            <TouchableOpacity 
                                                style={styles.assignButton}
                                                onPress={() => Alert.alert('Assign Unit', `Assigning unit to ${c.id}...`)}
                                            >
                                                <Text style={styles.assignButtonText}>ASSIGN UNIT</Text>
                                            </TouchableOpacity>
                                        </>
                                    ) : (
                                        <View style={styles.avatarRow}>
                                            {c.officers.map((off, idx) => (
                                                <View key={idx} style={[styles.avatar, { backgroundColor: idx === 0 ? colors.dodgerBlue : '#8B5CF6', marginLeft: idx > 0 ? -8 : 0 }]}>
                                                    <Text style={styles.avatarText}>{off}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                </View>
                            </View>
                        ))}
                        <View style={{ height: 40 }} />
                    </ScrollView>
                ) : activeTab === 'map' ? (
                    <View style={{ flex: 1 }}>
                        <OfficerMapView onBack={() => setActiveTab('dashboard')} />
                    </View>
                ) : activeTab === 'profile' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        {/* Header */}
                        <View style={styles.casesHeaderContainer}>
                            <TouchableOpacity onPress={() => setIsDrawerOpen(true)} style={styles.casesBackBtn}>
                                <Ionicons name="menu" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>PROFILE</Text>
                        </View>

                        {/* Avatar Profile Section */}
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

                        {/* Stats Grid */}
                        <View style={styles.profileStatsGrid}>
                            <View style={styles.profileStatCard}>
                                <Text style={[styles.profileStatValue, { color: '#3B82F6' }]}>142</Text>
                                <Text style={styles.profileStatLabel}>Cases Handled</Text>
                            </View>
                            <View style={styles.profileStatCard}>
                                <Text style={[styles.profileStatValue, { color: '#10B981' }]}>94%</Text>
                                <Text style={styles.profileStatLabel}>Resolution Rate</Text>
                            </View>
                            <View style={styles.profileStatCard}>
                                <Text style={[styles.profileStatValue, { color: '#06B6D4' }]}>14m</Text>
                                <Text style={styles.profileStatLabel}>Avg Response</Text>
                            </View>
                            <View style={styles.profileStatCard}>
                                <Text style={[styles.profileStatValue, { color: '#F59E0B' }]}>4.8</Text>
                                <Text style={styles.profileStatLabel}>Community Rating</Text>
                            </View>
                        </View>

                        {/* Menu List */}
                        <View style={styles.profileMenuList}>
                            {/* Item 1 */}
                            <TouchableOpacity 
                                style={styles.profileMenuItem}
                                onPress={() => setActiveTab('performance')}
                            >
                                <View style={styles.profileMenuIconBox}>
                                    <Ionicons name="bar-chart" size={20} color="#F59E0B" />
                                </View>
                                <View style={styles.profileMenuTextContainer}>
                                    <Text style={styles.profileMenuTitle}>Performance Stats</Text>
                                    <Text style={styles.profileMenuSubtitle}>Monthly reports & ratings</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={16} color="#4B5563" />
                            </TouchableOpacity>

                            {/* Item 2 */}
                            <TouchableOpacity 
                                style={styles.profileMenuItem}
                                onPress={() => Alert.alert('Team Overview', 'Viewing team roster and status...')}
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

                            {/* Item 3 */}
                            <TouchableOpacity 
                                style={styles.profileMenuItem}
                                onPress={() => setActiveTab('whistleblower')}
                            >
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

                            {/* Item 4 */}
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

                            {/* Item 5 */}
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

                            {/* Sign Out Item */}
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
                ) : activeTab === 'performance' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        {/* Header */}
                        <View style={styles.casesHeaderContainer}>
                            <TouchableOpacity onPress={() => setActiveTab('profile')} style={styles.casesBackBtn}>
                                <Ionicons name="arrow-back" size={20} color="#9CA3AF" />
                            </TouchableOpacity>
                            <Text style={styles.casesHeaderTitle}>PERFORMANCE</Text>
                        </View>
                        
                        {/* Avg Response Card */}
                        <View style={styles.perfHeroCard}>
                            <Text style={styles.perfHeroLabel}>AVERAGE RESPONSE TIME</Text>
                            <View style={styles.perfHeroRow}>
                                <Text style={styles.perfHeroValue}>19 min</Text>
                                <View style={styles.perfTrendBadge}>
                                    <Text style={styles.perfTrendText}>↓ 12%</Text>
                                </View>
                            </View>
                            <Text style={styles.perfHeroSubtext}>Target: ≤ 25m  ·  vs last month</Text>
                            
                            {/* Simple Mini Chart */}
                            <View style={styles.perfMiniChart}>
                                {[15, 22, 18, 25, 19, 14, 16].map((h, i) => (
                                    <View key={i} style={styles.perfChartCol}>
                                        <View style={[styles.perfChartBar, { height: h * 2 }]} />
                                        <Text style={styles.perfChartDay}>{['M','T','W','T','F','S','S'][i]}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>

                        {/* KPI Grid */}
                        <View style={styles.perfGrid}>
                            <View style={styles.perfGridCard}>
                                <Text style={styles.perfGridLabel}>CASES THIS MONTH</Text>
                                <Text style={[styles.perfGridValue, { color: colors.dodgerBlue }]}>47</Text>
                                <Text style={styles.perfGridTrend}>↓ 8 from last month</Text>
                            </View>
                            <View style={styles.perfGridCard}>
                                <Text style={styles.perfGridLabel}>RESOLUTION RATE</Text>
                                <Text style={[styles.perfGridValue, { color: colors.caribbeanGreen }]}>89%</Text>
                                <Text style={styles.perfGridTrend}>↑ 4% vs target</Text>
                            </View>
                            <View style={styles.perfGridCard}>
                                <Text style={styles.perfGridLabel}>ESCALATIONS</Text>
                                <Text style={styles.perfGridValue}>3</Text>
                                <Text style={styles.perfGridTrend}>↓ 2 vs last month</Text>
                            </View>
                            <View style={styles.perfGridCard}>
                                <Text style={styles.perfGridLabel}>COMMUNITY RATING</Text>
                                <Text style={[styles.perfGridValue, { color: '#F59E0B' }]}>4.3</Text>
                                <Text style={styles.perfGridTrend}>↑ 0.2 pts</Text>
                            </View>
                        </View>

                        {/* Community Trust Score */}
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
                ) : activeTab === 'report' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        {/* Header */}
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
                                                <Text style={[styles.reportGridLabel, incidentType === type.id && styles.reportGridLabelActive]}>{type.label}</Text>
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
                                                <Text style={[styles.urgencyText, urgency === level && styles.urgencyTextActive]}>{level}</Text>
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
                                            <Text style={styles.reportLocationPrimary}>Apongbon Bridge Junction</Text>
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
                                            <Text style={[styles.summaryValue, { color: urgency === 'High' ? '#EF4444' : urgency === 'Medium' ? '#F59E0B' : '#10B981' }]}>{urgency}</Text>
                                        </View>
                                        <View style={styles.summaryRow}>
                                            <Text style={styles.summaryLabel}>ANONYMOUS</Text>
                                            <Text style={styles.summaryValue}>{isAnonymous ? 'YES' : 'NO'}</Text>
                                        </View>
                                        <View style={[styles.summaryRow, { borderBottomWidth: 0 }]}>
                                            <Text style={styles.summaryLabel}>DESCRIPTION</Text>
                                            <Text style={styles.summaryValue} numberOfLines={2}>{description || 'No description'}</Text>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View style={styles.reportSuccessContainer}>
                                    <View style={styles.successIconCircle}>
                                        <Ionicons name="checkmark" size={40} color="#00D4AA" />
                                    </View>
                                    <Text style={styles.successTitle}>Report Transmitted</Text>
                                    <Text style={styles.successSubtitle}>The incident has been logged and assigned a tracking ID.</Text>
                                    <TouchableOpacity 
                                        style={styles.returnHomeBtn}
                                        onPress={() => { setActiveTab('dashboard'); setReportStep(1); }}
                                    >
                                        <Text style={styles.returnHomeText}>RETURN TO DASHBOARD</Text>
                                    </TouchableOpacity>
                                </View>
                            )}

                            {reportStep < 5 && (
                                <View style={styles.reportActionRow}>
                                    {reportStep > 1 && (
                                        <TouchableOpacity style={styles.reportBackBtn} onPress={() => setReportStep(reportStep - 1)}>
                                            <Text style={styles.reportBackBtnText}>BACK</Text>
                                        </TouchableOpacity>
                                    )}
                                    <TouchableOpacity 
                                        style={[styles.reportNextBtn, (!incidentType && reportStep === 1) && { opacity: 0.5 }]} 
                                        onPress={() => setReportStep(reportStep + 1)}
                                        disabled={!incidentType && reportStep === 1}
                                    >
                                        <Text style={styles.reportNextBtnText}>{reportStep === 4 ? 'SUBMIT REPORT' : 'CONTINUE'}</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <View style={{ height: 40 }} />
                    </ScrollView>
                ) : activeTab === 'privacy' ? (
                    <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
                        {/* Header */}
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
                                {/* Item 1 */}
                                <View style={styles.privacySettingItem}>
                                    <View style={styles.privacySettingIconBox}>
                                        <Ionicons name="finger-print" size={20} color="#F59E0B" />
                                    </View>
                                    <View style={styles.privacySettingTextContainer}>
                                        <Text style={styles.privacySettingTitle}>Default Anonymity</Text>
                                        <Text style={styles.privacySettingSubtitle}>Reports never linked to your identity</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={[styles.toggleTrack, privacySettings.defaultAnonymity ? styles.toggleTrackActive : styles.toggleTrackInactive]}
                                        onPress={() => togglePrivacySetting('defaultAnonymity')}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.toggleThumb, privacySettings.defaultAnonymity ? styles.toggleThumbActive : styles.toggleThumbInactive]} />
                                    </TouchableOpacity>
                                </View>

                                {/* Item 2 */}
                                <View style={styles.privacySettingItem}>
                                    <View style={styles.privacySettingIconBox}>
                                        <Ionicons name="location" size={20} color="#F59E0B" />
                                    </View>
                                    <View style={styles.privacySettingTextContainer}>
                                        <Text style={styles.privacySettingTitle}>Share Precise Location</Text>
                                        <Text style={styles.privacySettingSubtitle}>Improves report accuracy</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={[styles.toggleTrack, privacySettings.sharePreciseLocation ? styles.toggleTrackActive : styles.toggleTrackInactive]}
                                        onPress={() => togglePrivacySetting('sharePreciseLocation')}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.toggleThumb, privacySettings.sharePreciseLocation ? styles.toggleThumbActive : styles.toggleThumbInactive]} />
                                    </TouchableOpacity>
                                </View>

                                {/* Item 3 */}
                                <View style={styles.privacySettingItem}>
                                    <View style={styles.privacySettingIconBox}>
                                        <Ionicons name="notifications" size={20} color="#F59E0B" />
                                    </View>
                                    <View style={styles.privacySettingTextContainer}>
                                        <Text style={styles.privacySettingTitle}>Area Safety Alerts</Text>
                                        <Text style={styles.privacySettingSubtitle}>Notifications within 2 km</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={[styles.toggleTrack, privacySettings.areaSafetyAlerts ? styles.toggleTrackActive : styles.toggleTrackInactive]}
                                        onPress={() => togglePrivacySetting('areaSafetyAlerts')}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.toggleThumb, privacySettings.areaSafetyAlerts ? styles.toggleThumbActive : styles.toggleThumbInactive]} />
                                    </TouchableOpacity>
                                </View>

                                {/* Item 4 */}
                                <View style={styles.privacySettingItem}>
                                    <View style={styles.privacySettingIconBox}>
                                        <Ionicons name="stats-chart" size={20} color="#F59E0B" />
                                    </View>
                                    <View style={styles.privacySettingTextContainer}>
                                        <Text style={styles.privacySettingTitle}>Anonymous Analytics</Text>
                                        <Text style={styles.privacySettingSubtitle}>Help improve Aegis (no personal data)</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={[styles.toggleTrack, privacySettings.anonymousAnalytics ? styles.toggleTrackActive : styles.toggleTrackInactive]}
                                        onPress={() => togglePrivacySetting('anonymousAnalytics')}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.toggleThumb, privacySettings.anonymousAnalytics ? styles.toggleThumbActive : styles.toggleThumbInactive]} />
                                    </TouchableOpacity>
                                </View>

                                {/* Item 5 */}
                                <View style={[styles.privacySettingItem, { borderBottomWidth: 0 }]}>
                                    <View style={styles.privacySettingIconBox}>
                                        <Ionicons name="map" size={20} color="#F59E0B" />
                                    </View>
                                    <View style={styles.privacySettingTextContainer}>
                                        <Text style={styles.privacySettingTitle}>Community Map Presence</Text>
                                        <Text style={styles.privacySettingSubtitle}>Show you're active in your area</Text>
                                    </View>
                                    <TouchableOpacity 
                                        style={[styles.toggleTrack, privacySettings.communityMapPresence ? styles.toggleTrackActive : styles.toggleTrackInactive]}
                                        onPress={() => togglePrivacySetting('communityMapPresence')}
                                        activeOpacity={0.8}
                                    >
                                        <View style={[styles.toggleThumb, privacySettings.communityMapPresence ? styles.toggleThumbActive : styles.toggleThumbInactive]} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Delete Data Button */}
                            <TouchableOpacity 
                                style={styles.deleteDataButton}
                                onPress={() => Alert.alert(
                                    'Delete All My Data',
                                    'Permanently removes your account & reports. This action cannot be undone.',
                                    [
                                        { text: 'Cancel', style: 'cancel' },
                                        { text: 'Delete Everything', style: 'destructive', onPress: () => Alert.alert('Action confirmed', 'Data deletion process initiated.') }
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
                ) : activeTab === 'whistleblower' ? (
                    <View style={{ flex: 1, backgroundColor: '#080E1A' }}>
                        {/* Header */}
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
                            {/* Encryption Alert */}
                            <View style={styles.wbAlertBar}>
                                <Ionicons name="lock-closed" size={16} color="#F59E0B" style={{ marginRight: 10 }} />
                                <Text style={styles.wbAlertText}>
                                    Encrypted and visible only to authorised IAD officers. All access is logged under audit protocol.
                                </Text>
                            </View>

                            {/* Stats Grid */}
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

                            {/* Filters */}
                            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.wbFilters} contentContainerStyle={{ paddingRight: 20 }}>
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

                            {/* Reports List */}
                            {MOCK_WHISTLEBLOWER.map((wb) => (
                                <View key={wb.id} style={styles.wbReportCard}>
                                    <View style={styles.wbCardTop}>
                                        <Text style={styles.wbCardTitle}>{wb.title}</Text>
                                        <View style={[styles.wbStatusBadge, { backgroundColor: wb.status === 'NEW' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(139, 92, 246, 0.1)' }]}>
                                            <Text style={[styles.wbStatusBadgeText, { color: wb.status === 'NEW' ? '#3B82F6' : '#8B5CF6' }]}>{wb.status}</Text>
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
                                                <Text style={[styles.wbActionText, action === 'Assign IAD' && { color: '#9CA3AF' }]}>{action}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                </View>
                            ))}

                            <View style={{ height: 100 }} />
                        </ScrollView>
                    </View>
                ) : null}

                {/* Bottom Navigation */}
                <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 12), height: 64 + Math.max(insets.bottom, 12) }]}>

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
                    <TouchableOpacity
                        style={styles.navItem}
                        onPress={() => setActiveTab('profile')}
                    >
                        <View style={styles.navIconContainer}>
                            <ProfileIcon color={activeTab === 'profile' ? "#F59E0B" : "#6B7280"} />
                        </View>
                        <Text style={activeTab === 'profile' ? styles.navLabelActive : styles.navLabel}>PROFILE</Text>
                        {activeTab === 'profile' && <View style={styles.navIndicator} />}
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0A0F1E',
    },
    container: {
        flex: 1,
    },
    // Missing Tab Styles
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
    // Profile Specific
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
        paddingVertical: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: '#161F35',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuIcon: {
        color: '#9CA3AF',
        fontSize: 20,
    },
    bellIcon: {
        fontSize: 18,
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
        backgroundColor: '#161F35',
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    caseHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8,
        gap: 12,
    },
    priorityBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    priorityBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
    caseTitle: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        flex: 1,
        lineHeight: 20,
    },
    caseMeta: {
        color: '#6B7280',
        fontSize: 12,
        marginBottom: 4,
        marginLeft: 45,
    },
    caseMetaRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
        marginLeft: 45,
    },
    caseDistance: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    caseAnonymous: {
        color: '#9CA3AF',
        fontSize: 12,
    },
    caseFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        paddingTop: 16,
        marginTop: 4,
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
    // Performance Tab Styles
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
    // Whistleblower Styles
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

    // Report Tab Styles
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

    // Privacy Tab Styles
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

    // Dispatch Tab Styles
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
