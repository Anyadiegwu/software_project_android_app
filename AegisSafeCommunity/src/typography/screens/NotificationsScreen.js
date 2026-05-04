import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/index';

const NOTIFICATIONS = [
    {
        id: '1',
        type: 'alert',
        title: 'High priority incident near you',
        desc: 'A level 3 security alert has been issued for your immediate vicinity.',
        time: 'Just now',
        unread: true,
        icon: '⚠️',
    },
    {
        id: '2',
        type: 'update',
        title: 'Your report has been received',
        desc: 'The suspicious vehicle report you submitted is now under review.',
        time: '12m ago',
        unread: true,
        icon: '📝',
    },
    {
        id: '3',
        type: 'warning',
        title: 'Community meeting reminder',
        desc: 'Monthly safety briefing starts in 1 hour at the main hall.',
        time: '1h ago',
        unread: false,
        icon: '💡',
    },
    {
        id: '4',
        type: 'system',
        title: 'Aegis App Updated',
        desc: 'New features including live SOS broadcasting are now available.',
        time: '1d ago',
        unread: false,
        icon: '📱',
    },
    {
        id: '5',
        type: 'alert',
        title: 'Road closure ahead',
        desc: 'Main street is temporarily closed due to an ongoing operation.',
        time: '2d ago',
        unread: false,
        icon: '🚧',
    },
];

const TABS = ['ALL (5)', 'ALERTS', 'UPDATES', 'SYSTEM'];

export default function NotificationsScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('ALL (5)');

    const getBorderColor = (type) => {
        switch(type) {
            case 'alert': return '#F97316'; // Orange
            case 'update': return colors.tealAccent; // Teal
            case 'warning': return colors.buttercup; // Yellow
            case 'system': return colors.dodgerBlue; // Blue
            default: return colors.glassBorder;
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
                <TouchableOpacity>
                    <Text style={styles.markReadText}>MARK ALL AS READ</Text>
                </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Notification List */}
            <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
                {NOTIFICATIONS.map((notif) => (
                    <TouchableOpacity key={notif.id} style={[styles.card, { borderLeftColor: getBorderColor(notif.type) }]} activeOpacity={0.8}>
                        <View style={styles.cardContent}>
                            <View style={styles.iconContainer}>
                                <Text style={styles.icon}>{notif.icon}</Text>
                            </View>
                            <View style={styles.textContainer}>
                                <View style={styles.titleRow}>
                                    <Text style={[styles.title, notif.unread && styles.titleUnread]}>{notif.title}</Text>
                                    {notif.unread && <View style={styles.unreadDot} />}
                                </View>
                                <Text style={styles.desc}>{notif.desc}</Text>
                                <Text style={styles.time}>{notif.time}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.ebonyDarker,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    backButton: {
        padding: 4,
    },
    backIcon: {
        color: colors.white,
        fontSize: 20,
    },
    headerTitle: {
        fontFamily: 'serif',
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
        letterSpacing: 1,
    },
    markReadText: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.tealAccent,
        letterSpacing: 0.5,
    },

    // Tabs
    tabsWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    tabsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    tabButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    tabButtonActive: {
        backgroundColor: 'rgba(20, 199, 167, 0.15)', // Teal with opacity
    },
    tabText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.palesky,
        letterSpacing: 0.5,
    },
    tabTextActive: {
        color: colors.tealAccent,
    },

    // List
    listContainer: {
        padding: 20,
        gap: 16,
    },
    card: {
        backgroundColor: colors.bigStone,
        borderRadius: 12,
        borderLeftWidth: 4,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardContent: {
        flexDirection: 'row',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 18,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontFamily: 'serif',
        fontSize: 14,
        fontWeight: '500',
        color: colors.white,
        flex: 1,
    },
    titleUnread: {
        fontWeight: '700',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.tealAccent,
        marginLeft: 8,
    },
    desc: {
        fontSize: 12,
        color: colors.palesky,
        lineHeight: 18,
        marginBottom: 8,
    },
    time: {
        fontSize: 10,
        color: colors.palesky,
        fontWeight: '500',
    },
});
