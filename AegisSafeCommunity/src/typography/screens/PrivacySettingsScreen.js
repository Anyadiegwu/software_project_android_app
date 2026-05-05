import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PrivacySettingsScreen({ navigation }) {
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

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>PRIVACY SETTINGS</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView style={styles.mainScroll} showsVerticalScrollIndicator={false}>
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0A0F1E',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    backBtn: {
        padding: 4,
    },
    headerTitle: {
        fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'serif',
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 1,
    },
    mainScroll: {
        flex: 1,
    },
    privacyContent: {
        paddingHorizontal: 20,
        paddingTop: 24,
    },
    privacyDescription: {
        color: '#9CA3AF',
        fontSize: 14,
        lineHeight: 22,
        marginBottom: 32,
    },
    settingsGroup: {
        backgroundColor: '#161F35',
        borderRadius: 16,
        paddingVertical: 4,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    privacySettingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
    },
    privacySettingIconBox: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    privacySettingTextContainer: {
        flex: 1,
        marginRight: 12,
    },
    privacySettingTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    privacySettingSubtitle: {
        color: '#6B7280',
        fontSize: 12,
        lineHeight: 16,
    },
    toggleTrack: {
        width: 46,
        height: 26,
        borderRadius: 13,
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
        width: 22,
        height: 22,
        borderRadius: 11,
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
        padding: 20,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.1)',
    },
    deleteDataIconBox: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    deleteDataTextContainer: {
        flex: 1,
    },
    deleteDataTitle: {
        color: '#EF4444',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    deleteDataSubtitle: {
        color: '#6B7280',
        fontSize: 12,
        lineHeight: 16,
    },
});
