import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView,
    Modal,
    TouchableWithoutFeedback,
    Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/index';
import { loadUserProfile, clearUserSession } from '../../utils/userStorage';
import CarIcon from '../../components/icons/CarIcon';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

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

export default function DashboardScreen({ navigation }) {
    const [userName, setUserName] = useState('Officer');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        loadUserProfile().then((profile) => {
            if (profile?.displayName) {
                const name = profile.displayName.charAt(0).toUpperCase() + profile.displayName.slice(1);
                setUserName(name);
            }
        });
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Side Drawer Overlay */}
                <Modal visible={isDrawerOpen} transparent animationType="slide">
                    <View style={styles.drawerOverlay}>
                        <View style={styles.drawerContainer}>
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

                                <TouchableOpacity style={[styles.drawerMenuItem, styles.drawerMenuItemActive]}>
                                    <Ionicons name="home" size={22} color="#F59E0B" />
                                    <Text style={[styles.drawerMenuText, styles.drawerMenuTextActive]}>Home</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="document-text-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Active Cases</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="notifications-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Incoming Alerts</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="car-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Dispatch</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="map-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Live Incident Map</Text>
                                </TouchableOpacity>

                                {/* TEAM OVERVIEW */}
                                <Text style={styles.drawerSectionLabel}>TEAM OVERVIEW</Text>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="people-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Team Overview</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="bar-chart-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Performance Stats</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="megaphone-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Whistleblower</Text>
                                </TouchableOpacity>

                                {/* ACCOUNT */}
                                <Text style={styles.drawerSectionLabel}>ACCOUNT</Text>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="person-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Profile</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.drawerMenuItem}>
                                    <Ionicons name="lock-closed-outline" size={22} color="#C9D1D9" />
                                    <Text style={styles.drawerMenuText}>Privacy Settings</Text>
                                </TouchableOpacity>
                            </ScrollView>

                            {/* Footer */}
                            <View style={styles.drawerFooter}>
                                <View style={styles.drawerDivider} />
                                <TouchableOpacity
                                    style={styles.drawerSignOut}
                                    onPress={async () => {
                                        setIsDrawerOpen(false);
                                        await clearUserSession();
                                        navigation.navigate('Home');
                                    }}
                                >
                                    <Ionicons name="log-out-outline" size={22} color="#6B7280" />
                                    <Text style={styles.drawerSignOutText}>Sign Out</Text>
                                </TouchableOpacity>
                                <Text style={styles.drawerVersion}>Aegis v2.4.4  ·  Lagos Island</Text>
                            </View>
                        </View>
                        <TouchableWithoutFeedback onPress={() => setIsDrawerOpen(false)}>
                            <View style={styles.drawerBackdrop} />
                        </TouchableWithoutFeedback>
                    </View>
                </Modal>

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
                        <Text style={styles.commandText}>Lagos Island Command . Shift started 07:00</Text>
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
                                <Text style={styles.commandCardLabel}>COMMAND STATUS - LAGOS ISLAND</Text>
                                <Text style={styles.reportsPendingText}>12 Reports Pending</Text>
                                <Text style={styles.reportsSubtext}>7 active cases • 3 units deployed • 2 high priority</Text>
                            </View>
                            <CarIcon size={32} color="#F59E0B" />
                        </View>
                    </LinearGradient>

                    {/* Today's Overview */}
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>TODAY'S OVERVIEW</Text>
                        <TouchableOpacity>
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
                        <TouchableOpacity style={styles.dispatchButtonMain}>
                            <Text style={styles.dispatchButtonMainText}>DISPATCH</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.dispatchButtonSecondary}>
                            <Text style={styles.dispatchButtonSecondaryText}>RADIO</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Map Preview Widget */}
                    <View style={styles.mapPreviewCard}>
                        {/* Fake map background using gradient or dark color */}
                        <View style={styles.mapBackground}>
                            <View style={styles.mapPinContainer}>
                                <PinIcon color="#EF4444" />
                            </View>
                        </View>
                        <View style={styles.mapFooter}>
                            <View style={styles.mapBadge}>
                                <Text style={styles.mapBadgeText}>LAGOS ISLAND</Text>
                            </View>
                            <Text style={styles.mapLiveText}>Live - 38s</Text>
                        </View>
                    </View>

                    {/* Priority Cases */}
                    <View style={styles.sectionHeaderSpacing}>
                        <Text style={styles.sectionTitle}>PRIORITY CASES</Text>
                        <TouchableOpacity>
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
                            <TouchableOpacity style={styles.actionButton}>
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
                        <TouchableOpacity>
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

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <HomeIcon color="#F59E0B" />
                        </View>
                        <Text style={styles.navLabelActive}>DASHBOARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <ClipboardIcon color="#6B7280" />
                        </View>
                        <Text style={styles.navLabel}>CASES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <View style={styles.navIconContainer}>
                            <MapIcon color="#6B7280" />
                        </View>
                        <Text style={styles.navLabel}>MAP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.navItem}
                        onPress={() => {
                            // Empty for now, will connect to Profile later
                        }}
                    >
                        <View style={styles.navIconContainer}>
                            <ProfileIcon color="#6B7280" />
                        </View>
                        <Text style={styles.navLabel}>PROFILE</Text>
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
        backgroundColor: '#161F35',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        height: 160,
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
    drawerBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
    },
});