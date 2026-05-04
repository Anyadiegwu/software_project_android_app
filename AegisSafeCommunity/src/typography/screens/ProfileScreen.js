import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/index';

export default function ProfileScreen({ navigation, userName = 'Muhammed J.' }) {
    const menuItems = [
        { id: 'account', label: 'Account Settings', icon: '👤' },
        { id: 'privacy', label: 'Privacy & Security', icon: '🔒' },
        { id: 'notifications', label: 'Notifications', icon: '🔔' },
        { id: 'help', label: 'Help & Support', icon: '❓' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>{userName.charAt(0)}</Text>
                        </View>
                    </View>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text style={styles.userRole}>CRIME REPORTER</Text>

                    {/* Stats Row */}
                    <View style={styles.statsRow}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>12</Text>
                            <Text style={styles.statLabel}>Reports</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>5</Text>
                            <Text style={styles.statLabel}>Alerts</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={[styles.statValue, { color: colors.primaryAccent }]}>98%</Text>
                            <Text style={styles.statLabel}>Trust Score</Text>
                        </View>
                    </View>
                </View>

                {/* Menu Section */}
                <View style={styles.menuSection}>
                    {menuItems.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem} activeOpacity={0.7}>
                            <View style={styles.menuItemLeft}>
                                <Text style={styles.menuIcon}>{item.icon}</Text>
                                <Text style={styles.menuLabel}>{item.label}</Text>
                            </View>
                            <Text style={styles.chevron}>›</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sign Out */}
                <TouchableOpacity 
                    style={styles.signOutBtn} 
                    onPress={() => navigation.navigate('Welcome')}
                    activeOpacity={0.7}
                >
                    <Text style={styles.signOutText}>Sign Out</Text>
                </TouchableOpacity>

                <Text style={styles.version}>Aegis Safe Community v1.0.0</Text>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.ebonyDark,
    },
    header: {
        backgroundColor: colors.ebonyDarker,
        alignItems: 'center',
        paddingVertical: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    avatarContainer: {
        marginBottom: 16,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: colors.primaryAccent,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: 'rgba(0, 208, 156, 0.2)',
    },
    avatarText: {
        fontSize: 40,
        fontWeight: '900',
        color: colors.ebony,
        fontFamily: 'serif',
    },
    userName: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        fontFamily: 'serif',
        marginBottom: 4,
    },
    userRole: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.primaryAccent,
        letterSpacing: 2,
        marginBottom: 30,
    },
    statsRow: {
        flexDirection: 'row',
        backgroundColor: colors.bigStone,
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 10,
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statValue: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: colors.palesky,
        fontWeight: '600',
    },
    statDivider: {
        width: 1,
        height: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    menuSection: {
        paddingHorizontal: 20,
        marginTop: 30,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.bigStone,
        paddingVertical: 16,
        paddingHorizontal: 20,
        borderRadius: 12,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    menuItemLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuIcon: {
        fontSize: 18,
        marginRight: 16,
    },
    menuLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.white,
    },
    chevron: {
        fontSize: 24,
        color: colors.palesky,
    },
    signOutBtn: {
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: 'rgba(255, 77, 77, 0.1)',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 77, 77, 0.2)',
    },
    signOutText: {
        color: '#FF4D4D',
        fontSize: 16,
        fontWeight: '700',
    },
    version: {
        textAlign: 'center',
        color: colors.palesky,
        fontSize: 12,
        marginTop: 30,
        marginBottom: 40,
    },
});
