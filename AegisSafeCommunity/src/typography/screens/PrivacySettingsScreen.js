import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Switch, Platform, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/index';

export default function PrivacySettingsScreen({ navigation }) {
    const [incognito, setIncognito] = useState(true);
    const [locationFuzzing, setLocationFuzzing] = useState(false);
    const [dataSharing, setDataSharing] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Privacy Settings</Text>
                <View style={{ width: 40 }} /> {/* Spacer to balance header */}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Intro */}
                <Text style={styles.introText}>
                    Manage how your identity and data are shared within the Aegis network.
                </Text>

                {/* Section: Reporting */}
                <Text style={styles.sectionTitle}>REPORTING</Text>
                <View style={styles.settingCard}>
                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Incognito Reporting</Text>
                            <Text style={styles.settingDesc}>
                                Hide your identity entirely on all new reports. You will appear as "Anonymous User".
                            </Text>
                        </View>
                        <Switch 
                            value={incognito}
                            onValueChange={setIncognito}
                            trackColor={{ false: '#374151', true: 'rgba(69, 208, 177, 0.4)' }}
                            thumbColor={incognito ? '#45D0B1' : '#9CA3AF'}
                        />
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Location Fuzzing</Text>
                            <Text style={styles.settingDesc}>
                                Obscure your exact location to a 500m radius to protect your home address.
                            </Text>
                        </View>
                        <Switch 
                            value={locationFuzzing}
                            onValueChange={setLocationFuzzing}
                            trackColor={{ false: '#374151', true: 'rgba(69, 208, 177, 0.4)' }}
                            thumbColor={locationFuzzing ? '#45D0B1' : '#9CA3AF'}
                        />
                    </View>
                </View>

                {/* Section: Data */}
                <Text style={styles.sectionTitle}>DATA & SHARING</Text>
                <View style={styles.settingCard}>
                    <View style={styles.settingRow}>
                        <View style={styles.settingInfo}>
                            <Text style={styles.settingTitle}>Law Enforcement Sharing</Text>
                            <Text style={styles.settingDesc}>
                                Automatically share anonymized incident data with local law enforcement.
                            </Text>
                        </View>
                        <Switch 
                            value={dataSharing}
                            onValueChange={setDataSharing}
                            trackColor={{ false: '#374151', true: 'rgba(69, 208, 177, 0.4)' }}
                            thumbColor={dataSharing ? '#45D0B1' : '#9CA3AF'}
                        />
                    </View>
                </View>

                {/* Section: Account Data */}
                <Text style={styles.sectionTitle}>ACCOUNT DATA</Text>
                <View style={styles.settingCard}>
                    <TouchableOpacity style={styles.actionRow}>
                        <Text style={styles.actionText}>Request Data Export</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                    <View style={styles.divider} />
                    <TouchableOpacity style={styles.actionRow} onPress={() => navigation.navigate && navigation.navigate('DeleteAccount')}>
                        <Text style={[styles.actionText, styles.dangerText]}>Delete Account</Text>
                        <Text style={styles.chevron}>›</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0D1117',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? 20 : 0,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    backIcon: {
        color: '#FFFFFF',
        fontSize: 32,
        lineHeight: 34,
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        fontFamily: 'serif',
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    introText: {
        color: '#8B949E',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 30,
    },
    sectionTitle: {
        color: '#4B5563',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.5,
        marginBottom: 12,
        marginLeft: 4,
    },
    settingCard: {
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        marginBottom: 24,
    },
    settingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    settingInfo: {
        flex: 1,
        paddingRight: 20,
    },
    settingTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 6,
    },
    settingDesc: {
        color: '#8B949E',
        fontSize: 13,
        lineHeight: 18,
    },
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.05)',
        marginHorizontal: 20,
    },
    actionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    actionText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '500',
    },
    dangerText: {
        color: '#EF4444',
    },
    chevron: {
        color: '#4B5563',
        fontSize: 20,
    },
});
