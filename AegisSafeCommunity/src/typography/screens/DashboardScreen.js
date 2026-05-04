import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../theme/index';
import { loadUserProfile, clearUserSession } from '../../utils/userStorage';
import CarIcon from '../../components/icons/CarIcon';

export default function DashboardScreen({ navigation }) {
    const [userName, setUserName] = useState('Officer');

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
                {/* Top Navigation Bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.menuIcon}>☰</Text>
                    </TouchableOpacity>
                    <View style={styles.logoContainer}>
                        <View style={styles.logoBox}>
                            <Text style={styles.logoLetter}>A</Text>
                        </View>
                        <Text style={styles.logoText}>AEGIS</Text>
                    </View>
                    <TouchableOpacity style={styles.iconButton}>
                        <Text style={styles.bellIcon}>🔔</Text>
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

                </ScrollView>

                {/* Bottom Navigation */}
                <View style={styles.bottomNav}>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navIconActive}>🏠</Text>
                        <Text style={styles.navLabelActive}>DASHBOARD</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navIcon}>📋</Text>
                        <Text style={styles.navLabel}>CASES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navItem}>
                        <Text style={styles.navIcon}>🗺️</Text>
                        <Text style={styles.navLabel}>MAP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.navItem}
                        onPress={async () => {
                            await clearUserSession();
                            navigation.navigate('Home');
                        }}
                    >
                        <Text style={styles.navIcon}>👤</Text>
                        <Text style={styles.navLabel}>LOGOUT</Text>
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
    navIcon: {
        fontSize: 20,
        marginBottom: 4,
        opacity: 0.5,
    },
    navIconActive: {
        fontSize: 20,
        marginBottom: 4,
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
    }
});