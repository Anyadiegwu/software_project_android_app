import AsyncStorage from '@react-native-async-storage/async-storage';
import { saveUserProfile } from '../../utils/userStorage';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/index';

const KEEP_SIGNED_IN_KEY = '@aegis_keep_signed_in';
const SESSION_KEY        = '@aegis_session';

export default function ReporterLoginScreen({ navigation }) {
    const [loading,      setLoading]      = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogin = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Missing Fields', 'Please fill in both email and password.');
            return;
        }

        setLoading(true);

        // Simulate authentication (replace with real API call)
        setTimeout(async () => {
            setLoading(false);

            // Derive a display name from the email (e.g. "amaka@..." → "amaka")
            const derivedName = form.email.split('@')[0];

            // Save user profile so name flows through Home, Profile, SideDrawer
            await saveUserProfile({
                displayName: derivedName,
                email: form.email,
                role: 'Crime Reporter',
            });

            if (keepSignedIn) {
                await AsyncStorage.setItem(KEEP_SIGNED_IN_KEY, 'true');
                await AsyncStorage.setItem(SESSION_KEY, JSON.stringify({
                    email: form.email,
                    loggedInAt: new Date().toISOString(),
                }));
            } else {
                await AsyncStorage.removeItem(KEEP_SIGNED_IN_KEY);
                await AsyncStorage.removeItem(SESSION_KEY);
            }

            navigation.navigate('Dashboard');
        }, 1500);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back to role select</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    {/* Header */}
                    <Text style={styles.topLabel}>Sign In</Text>
                    <Text style={styles.heading}>Welcome back</Text>
                    <Text style={styles.subheading}>Sign in to view your reports and submit new ones.</Text>

                    {/* Anonymous Banner */}
                    <View style={styles.anonymousBanner}>
                        <Text style={styles.bannerIcon}>🔒</Text>
                        <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>Anonymous login available</Text>
                            <Text style={styles.bannerDesc}>
                                You can also report incidents without creating an account using the button below.
                            </Text>
                        </View>
                    </View>

                    {/* Email */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email address <Text style={styles.asterisk}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="amaka@example.com"
                            placeholderTextColor="#6B7280"
                            value={form.email}
                            onChangeText={(v) => handleChange('email', v)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Password */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password <Text style={styles.asterisk}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••••"
                            placeholderTextColor="#6B7280"
                            value={form.password}
                            onChangeText={(v) => handleChange('password', v)}
                            secureTextEntry
                        />
                    </View>

                    {/* Keep me signed in + Forgot password */}
                    <View style={styles.extrasRow}>
                        {/* ── Interactive checkbox ─────────────────────── */}
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setKeepSignedIn((prev) => !prev)}
                            activeOpacity={0.7}
                        >
                            <View style={[styles.checkbox, keepSignedIn && styles.checkboxChecked]}>
                                {keepSignedIn && <Text style={styles.checkboxTick}>✓</Text>}
                            </View>
                            <Text style={styles.checkboxLabel}>Keep me signed in</Text>
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <Text style={styles.forgotText}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Buttons */}
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.primaryBtn, loading && styles.btnDisabled]}
                            onPress={handleLogin}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator color={colors.ebonyDark} />
                            ) : (
                                <Text style={styles.primaryBtnText}>SIGN IN SECURELY</Text>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.secondaryBtn}
                            onPress={() => navigation.navigate('Dashboard')}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.secondaryBtnText}>Continue Anonymously — No Account Needed</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Don't have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ReporterSignUp')}>
                            <Text style={styles.footerLink}>Create one free</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.ebonyDark,
    },
    headerContainer: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 8,
    },
    backButton: {
        alignSelf: 'flex-start',
    },
    backButtonText: {
        color: colors.palesky,
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 0.72,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingBottom: 40,
        paddingTop: 20,
    },
    formContainer: {
        width: '100%',
        maxWidth: 500,
        alignSelf: 'center',
    },
    topLabel: {
        fontFamily: 'monospace',
        fontSize: 9.6,
        color: colors.palesky,
        textTransform: 'uppercase',
        letterSpacing: 1.536,
        marginBottom: 8,
    },
    heading: {
        fontFamily: 'serif',
        fontSize: 27.2,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 8,
    },
    subheading: {
        fontSize: 12.8,
        color: colors.palesky,
        marginBottom: 32,
    },

    // Anonymous Banner
    anonymousBanner: {
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 212, 170, 0.08)',
        borderColor: 'rgba(0, 212, 170, 0.28)',
        borderWidth: 1,
        borderRadius: 6,
        padding: 12,
        marginBottom: 20,
    },
    bannerIcon: { fontSize: 14, marginRight: 10, marginTop: 2 },
    bannerTextContainer: { flex: 1 },
    bannerTitle: {
        fontSize: 11.7,
        fontWeight: '700',
        color: colors.caribbeanGreen,
        marginBottom: 2,
    },
    bannerDesc: {
        fontSize: 11.7,
        color: colors.athensGray,
        lineHeight: 18,
    },

    // Form
    inputGroup: { marginBottom: 20 },
    label: {
        fontSize: 11.8,
        color: colors.athensGray,
        marginBottom: 6,
        fontWeight: '500',
    },
    asterisk: { color: colors.caribbeanGreen },
    input: {
        backgroundColor: colors.bigStone,
        borderWidth: 1,
        borderColor: colors.caribbeanGreen,
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: colors.white,
        fontSize: 13.4,
    },

    // Keep me signed in
    extrasRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: colors.caribbeanGreen,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: colors.caribbeanGreen,
        borderColor: colors.caribbeanGreen,
    },
    checkboxTick: {
        color: '#0D1117',
        fontSize: 11,
        fontWeight: '900',
        lineHeight: 13,
    },
    checkboxLabel: {
        fontSize: 11.7,
        color: colors.palesky,
    },
    forgotText: {
        fontSize: 11.7,
        color: colors.caribbeanGreen,
    },

    // Buttons
    buttonGroup: { gap: 8, marginBottom: 20 },
    primaryBtn: {
        backgroundColor: colors.caribbeanGreen,
        borderRadius: 6,
        paddingVertical: 16,
        alignItems: 'center',
    },
    btnDisabled: { opacity: 0.6 },
    primaryBtnText: {
        color: colors.ebonyDark,
        fontWeight: '700',
        fontSize: 13.8,
        letterSpacing: 0.5,
    },
    secondaryBtn: {
        backgroundColor: 'transparent',
        borderColor: 'rgba(255,255,255,0.11)',
        borderWidth: 1,
        borderRadius: 6,
        paddingVertical: 16,
        alignItems: 'center',
    },
    secondaryBtnText: {
        color: colors.grayCharcoal,
        fontSize: 13.1,
    },

    // Footer
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: { fontSize: 11.8, color: colors.palesky },
    footerLink: { fontSize: 11.8, color: colors.caribbeanGreen },
});
