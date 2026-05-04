// DashboardScreen.js
// Ported from: reporter-dashboard.html
// Reporter's community feed with side drawer navigation

import { useState } from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, glassCard } from '../../theme/index';



// Sample incident data (replace with real API data)
const INCIDENTS = [
    {
        id: '1',
        status: 'urgent',
        statusLabel: 'Urgent',
        time: '2 mins ago',
        title: 'Suspicious Activity',
        description: 'Observed unauthorized entry attempt near Sector 4 warehouse.',
        location: 'Central District',
    },
    {
        id: '2',
        status: 'resolved',
        statusLabel: 'Resolved',
        time: '1 hour ago',
        title: 'Street Light Outage',
        description: 'Main intersection lighting is non-functional, creating a safety hazard.',
        location: 'West End',
    },
    {
        id: '3',
        status: 'info',
        statusLabel: 'Active',
        time: '3 hours ago',
        title: 'Traffic Obstruction',
        description: 'Abandoned vehicle blocking emergency access lane on North Road.',
        location: 'North Gate',
    },
];

const NAV_ITEMS = [
    { icon: '⚠️', label: 'Reports Feed', key: 'feed' },
    { icon: '💡', label: 'Safety Tips', key: 'tips' },
    { icon: '🏗️', label: 'Active Cases', key: 'cases' },
    { icon: '🗺️', label: 'Community Map', key: 'map' },
    { icon: '📱', label: 'Download Aegis', key: 'download' },
];

function IncidentCard({ incident }) {
    const badgeStyle =
        incident.status === 'urgent'
            ? styles.badgeUrgent
            : incident.status === 'resolved'
                ? styles.badgeResolved
                : styles.badgeInfo;

    const badgeTextStyle =
        incident.status === 'urgent'
            ? styles.badgeTextUrgent
            : incident.status === 'resolved'
                ? styles.badgeTextResolved
                : styles.badgeTextInfo;

    return (
        <View style={[glassCard, styles.incidentCard]}>
            <View style={styles.cardHeader}>
                <View style={[styles.statusBadge, badgeStyle]}>
                    <Text style={[styles.statusText, badgeTextStyle]}>{incident.statusLabel}</Text>
                </View>
                <Text style={styles.timeText}>{incident.time}</Text>
            </View>
            <Text style={styles.incidentTitle}>{incident.title}</Text>
            <Text style={styles.incidentDesc}>{incident.description}</Text>
            <View style={styles.cardFooter}>
                <Text style={styles.locationText}>📍 {incident.location}</Text>
            </View>
        </View>
    );
}

export default function DashboardScreen({ navigation }) {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [activeNav, setActiveNav] = useState('feed');

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {/* Top Navigation Bar */}
                <View style={styles.topBar}>
                    <TouchableOpacity onPress={() => setDrawerOpen(true)} style={styles.menuBtn}>
                        <Text style={styles.menuIcon}>☰</Text>
                    </TouchableOpacity>
                    <Text style={styles.topBarTitle}>Community Feed</Text>
                    <TouchableOpacity style={styles.reportBtn}>
                        <Text style={styles.reportBtnText}>+ REPORT</Text>
                    </TouchableOpacity>
                </View>

                {/* Feed */}
                <ScrollView
                    style={styles.scroll}
                    contentContainerStyle={styles.feedGrid}
                    showsVerticalScrollIndicator={false}
                >
                    {INCIDENTS.map((incident) => (
                        <IncidentCard key={incident.id} incident={incident} />
                    ))}
                </ScrollView>
            </View>

            {/* Side Drawer — Modal overlay */}
            <Modal
                visible={drawerOpen}
                transparent
                animationType="slide"
                onRequestClose={() => setDrawerOpen(false)}
            >
                <View style={styles.drawerOverlay}>
                    <TouchableOpacity
                        style={styles.drawerBackdrop}
                        onPress={() => setDrawerOpen(false)}
                        activeOpacity={1}
                    />
                    <View style={styles.drawer}>
                        {/* Drawer Header */}
                        <View style={styles.drawerHeader}>
                            <View style={styles.logoContainer}>
                                <View style={styles.logoBox}>
                                    <Text style={styles.logoLetter}>A</Text>
                                </View>
                                <Text style={styles.logoText}>AEGIS</Text>
                            </View>
                            <TouchableOpacity
                                style={styles.closeBtn}
                                onPress={() => setDrawerOpen(false)}
                            >
                                <Text style={styles.closeBtnText}>✕</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Nav Links */}
                        <View style={styles.navLinks}>
                            {NAV_ITEMS.map((item) => (
                                <TouchableOpacity
                                    key={item.key}
                                    style={[
                                        styles.navItem,
                                        activeNav === item.key && styles.navItemActive,
                                    ]}
                                    onPress={() => {
                                        setActiveNav(item.key);
                                        setDrawerOpen(false);
                                    }}
                                >
                                    <Text style={styles.navIcon}>{item.icon}</Text>
                                    <Text
                                        style={[
                                            styles.navLabel,
                                            activeNav === item.key && styles.navLabelActive,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        {/* Download Aegis CTA */}
                        <TouchableOpacity style={styles.downloadLink}>
                            <Text style={styles.downloadLinkText}>DOWNLOAD AEGIS</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
    },

    // Top Bar
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: colors.glassBorder,
    },
    menuBtn: {
        padding: 6,
    },
    menuIcon: {
        fontSize: 22,
        color: colors.white,
    },
    topBarTitle: {
        fontFamily: 'serif',
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
    },
    reportBtn: {
        backgroundColor: colors.caribbeanGreen,
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
    },
    reportBtnText: {
        color: colors.ebony,
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 0.5,
    },

    // Feed
    scroll: {
        flex: 1,
    },
    feedGrid: {
        padding: 20,
        gap: 16,
    },
    incidentCard: {
        padding: 20,
        marginBottom: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    statusBadge: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 20,
    },
    badgeUrgent: {
        backgroundColor: 'rgba(245, 158, 11, 0.2)',
    },
    badgeResolved: {
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
    },
    badgeInfo: {
        backgroundColor: 'rgba(0, 212, 170, 0.15)',
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    badgeTextUrgent: { color: colors.buttercup },
    badgeTextResolved: { color: colors.dodgerBlue },
    badgeTextInfo: { color: colors.caribbeanGreen },
    timeText: {
        fontSize: 12,
        color: colors.palesky,
    },
    incidentTitle: {
        fontFamily: 'serif',
        fontSize: 17,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 6,
    },
    incidentDesc: {
        fontSize: 13,
        color: '#ccc',
        lineHeight: 18,
        marginBottom: 12,
    },
    cardFooter: {
        borderTopWidth: 1,
        borderTopColor: colors.glassBorder,
        paddingTop: 10,
    },
    locationText: {
        fontSize: 12,
        color: colors.palesky,
    },

    // Drawer
    drawerOverlay: {
        flex: 1,
        flexDirection: 'row',
    },
    drawerBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    drawer: {
        width: 280,
        backgroundColor: colors.ebony,
        borderLeftWidth: 1,
        borderLeftColor: colors.glassBorder,
        paddingTop: 50,
    },
    drawerHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: colors.glassBorder,
        marginBottom: 12,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    logoBox: {
        width: 30,
        height: 30,
        backgroundColor: colors.caribbeanGreen,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoLetter: {
        fontFamily: 'serif',
        fontWeight: '900',
        fontSize: 17,
        color: colors.ebony,
    },
    logoText: {
        fontFamily: 'monospace',
        fontSize: 10,
        letterSpacing: 2,
        color: colors.caribbeanGreen,
        textTransform: 'uppercase',
    },
    closeBtn: {
        width: 32,
        height: 32,
        backgroundColor: colors.bigStone,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeBtnText: {
        color: colors.palesky,
        fontSize: 16,
    },
    navLinks: {
        paddingHorizontal: 12,
        gap: 4,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 8,
        gap: 10,
    },
    navItemActive: {
        backgroundColor: 'rgba(0, 212, 170, 0.1)',
    },
    navIcon: {
        fontSize: 18,
    },
    navLabel: {
        fontSize: 14,
        color: '#888',
        letterSpacing: 0.3,
    },
    navLabelActive: {
        color: colors.caribbeanGreen,
        fontWeight: '600',
    },
    downloadLink: {
        backgroundColor: colors.caribbeanGreen,
        paddingVertical: 16,
        paddingHorizontal: 36,
        margin: 24,
        marginTop: 'auto',
        borderRadius: 0,
        alignItems: 'center',
    },
    downloadLinkText: {
        fontFamily: 'System',
        fontWeight: '600',
        fontSize: 19.2,
        color: colors.ebony,
        textTransform: 'uppercase',
        letterSpacing: 0.768,
    },
});