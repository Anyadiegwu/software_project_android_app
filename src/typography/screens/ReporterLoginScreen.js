// import AsyncStorage from '@react-native-async-storage/async-storage';
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
    Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/index';
import { AuthStorage } from '../../utils/authStorage';
import { BASE_URL } from '../../config/api';

const EyeIcon = ({ visible }) => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        {visible ? (
            <>
                <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#6B7280" strokeWidth="1.6" />
                <Path d="M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" stroke="#6B7280" strokeWidth="1.6" />
            </>
        ) : (
            <>
                <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
                <Path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
                <Path d="M1 1l22 22" stroke="#6B7280" strokeWidth="1.6" strokeLinecap="round" />
            </>
        )}
    </Svg>
);

export default function ReporterLoginScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [loading,      setLoading]      = useState(false);
    const [keepSignedIn, setKeepSignedIn] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleLogin = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Missing Fields', 'Please fill in both email and password.');
            return;
        }

        setLoading(true);

        try {
            const loginUrl = `${BASE_URL}/api/auth/reporter/login`;
            const response = await fetch(loginUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: form.email.trim().toLowerCase(),
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 403) {
                    Alert.alert(
                        'Email Not Verified',
                        'Please verify your email before logging in.',
                        [
                            {
                                text: 'Verify Now',
                                onPress: () => navigation.navigate('EmailVerification', {
                                    email: form.email.trim().toLowerCase(),
                                    password: form.password,
                                    role: 'reporter',
                                }),
                            },
                            { text: 'Cancel', style: 'cancel' },
                        ]
                    );
                    return;
                }
                Alert.alert('Login Failed', data.message || 'Something went wrong.');
                return;
            }

            await AuthStorage.saveSession(data.token, data.user, keepSignedIn);

            await saveUserProfile({
                displayName: data.user.name || form.email.split('@')[0],
                email: data.user.email,
                role: 'Crime Reporter',
            });

            navigation.navigate('Dashboard');

        } catch (err) {
            Alert.alert('Network Error', 'Could not reach the server. Check your connection.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backButtonText}>← Back to role select</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 25 }]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.topLabel}>Sign In</Text>
                    <Text style={styles.heading}>Welcome back</Text>
                    <Text style={styles.subheading}>Sign in to view your reports and submit new ones.</Text>

                    <View style={styles.anonymousBanner}>
                        <Text style={styles.bannerIcon}>🔒</Text>
                        <View style={styles.bannerTextContainer}>
                            <Text style={styles.bannerTitle}>Anonymous login available</Text>
                            <Text style={styles.bannerDesc}>
                                You can also report incidents without creating an account using the button below.
                            </Text>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email address <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="amaka@example.com"
                                placeholderTextColor="#6B7280"
                                value={form.email}
                                onChangeText={(v) => handleChange('email', v)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••••"
                                placeholderTextColor="#6B7280"
                                value={form.password}
                                onChangeText={(v) => handleChange('password', v)}
                                secureTextEntry={!showPassword}
                                autoCorrect={false}
                            />
                            <TouchableOpacity 
                                style={styles.eyeBtn} 
                                onPress={() => setShowPassword(!showPassword)}
                                activeOpacity={0.7}
                            >
                                <EyeIcon visible={showPassword} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.extrasRow}>
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
                            <Text style={styles.forgotText}>Forgot_password?</Text>
                        </TouchableOpacity>
                    </View>

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

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>{"Don't have an account? "}</Text>
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
    inputGroup: { marginBottom: 20 },
    label: {
        fontSize: 11.8,
        color: colors.athensGray,
        marginBottom: 8,
        fontWeight: '500',
    },
    asterisk: { color: colors.caribbeanGreen },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bigStone,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        borderRadius: 8,
        paddingHorizontal: 14,
        height: 50,
    },
    input: {
        flex: 1,
        color: colors.white,
        fontSize: 14,
        paddingVertical: Platform.OS === 'ios' ? 0 : 8,
    },
    eyeBtn: {
        paddingLeft: 10,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
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
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: { fontSize: 11.8, color: colors.palesky },
    footerLink: { fontSize: 11.8, color: colors.caribbeanGreen },
});