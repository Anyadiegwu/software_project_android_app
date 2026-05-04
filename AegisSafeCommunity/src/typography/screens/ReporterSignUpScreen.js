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
import { saveUserProfile } from '../../utils/userStorage';

export default function ReporterSignUpScreen({ navigation }) {
    const [loading, setLoading]             = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [form, setForm] = useState({
        displayName: '',
        email: '',
        password: '',
    });

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSignUp = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Missing Fields', 'Please fill in email and password.');
            return;
        }
        if (!agreedToTerms) {
            Alert.alert('Terms Required', 'Please agree to the Terms of Service and Privacy Policy to continue.');
            return;
        }

        setLoading(true);
        // Simulate authentication then save the user profile
        setTimeout(async () => {
            // Use displayName if provided, otherwise derive from email
            const displayName = form.displayName.trim()
                || form.email.split('@')[0];

            await saveUserProfile({
                displayName,
                email: form.email,
                role: 'Crime Reporter',
            });

            setLoading(false);
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
                    <Text style={styles.topLabel}>New Account</Text>
                    <Text style={styles.heading}>Create your account</Text>

                    {/* Form Fields */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Display Name <Text style={styles.optional}>(optional)</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g. Abuja Resident, Anonymous01"
                            placeholderTextColor="#6B7280"
                            value={form.displayName}
                            onChangeText={(v) => handleChange('displayName', v)}
                        />
                        <Text style={styles.helperText}>Only shown on community activity — never on reports.</Text>
                    </View>

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

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password <Text style={styles.asterisk}>*</Text></Text>
                        <TextInput
                            style={[styles.input, styles.passwordInput]}
                            placeholder="••••••••••••"
                            placeholderTextColor="#6B7280"
                            value={form.password}
                            onChangeText={(v) => handleChange('password', v)}
                            secureTextEntry
                        />
                        {/* Password Strength Indicator */}
                        <View style={styles.strengthContainer}>
                            <View style={styles.strengthTrack}>
                                <View style={styles.strengthFill} />
                            </View>
                            <Text style={styles.strengthText}>Strong password ✓</Text>
                        </View>
                    </View>

                    {/* Terms — interactive checkbox */}
                    <TouchableOpacity
                        style={styles.termsContainer}
                        onPress={() => setAgreedToTerms((prev) => !prev)}
                        activeOpacity={0.7}
                    >
                        <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                            {agreedToTerms && <Text style={styles.checkboxTick}>✓</Text>}
                        </View>
                        <Text style={styles.termsText}>
                            I agree to Aegis's Terms of Service and Privacy Policy. I understand my data is protected and never shared with authorities without my consent.
                        </Text>
                    </TouchableOpacity>

                    {/* Buttons */}
                    <TouchableOpacity
                        style={[
                            styles.primaryBtn,
                            (loading || !agreedToTerms) && styles.btnDisabled,
                        ]}
                        onPress={handleSignUp}
                        disabled={loading || !agreedToTerms}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.ebonyDark} />
                        ) : (
                            <Text style={styles.primaryBtnText}>CREATE ACCOUNT</Text>
                        )}
                    </TouchableOpacity>

                    {/* Footer */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('ReporterLogin')}>
                            <Text style={styles.footerLink}>Sign in</Text>
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
        marginBottom: 20,
    },

    // Form
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 11.8,
        color: colors.athensGray,
        marginBottom: 6,
        fontWeight: '500',
    },
    asterisk: {
        color: colors.caribbeanGreen,
    },
    optional: {
        color: colors.palesky,
        fontWeight: '300',
        fontSize: 10.6,
    },
    input: {
        backgroundColor: colors.bigStone,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.11)',
        borderRadius: 6,
        paddingHorizontal: 16,
        paddingVertical: 12,
        color: colors.white,
        fontSize: 13.4,
    },
    passwordInput: {
        borderColor: colors.mountainMeadow,
    },
    helperText: {
        fontSize: 10.1,
        color: colors.palesky,
        marginTop: 6,
    },

    // Strength
    strengthContainer: {
        marginTop: 6,
    },
    strengthTrack: {
        height: 3,
        backgroundColor: colors.cloudBurst,
        borderRadius: 99,
        width: '100%',
    },
    strengthFill: {
        height: 3,
        backgroundColor: colors.mountainMeadow,
        borderRadius: 99,
        width: '100%', // Max strength in design
    },
    strengthText: {
        fontSize: 9.8,
        color: colors.palesky,
        marginTop: 3.2,
    },

    // Terms
    termsContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        marginBottom: 20,
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
        marginTop: 1,
        flexShrink: 0,
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
    termsText: {
        flex: 1,
        fontSize: 11.5,
        lineHeight: 18,
        color: colors.palesky,
    },

    // Buttons
    primaryBtn: {
        backgroundColor: colors.caribbeanGreen,
        borderRadius: 6,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 16,
    },
    btnDisabled: {
        opacity: 0.6,
    },
    primaryBtnText: {
        color: colors.ebonyDark,
        fontWeight: '600',
        fontSize: 13.8,
        letterSpacing: 0.413,
    },

    // Footer
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 4,
    },
    footerText: {
        fontSize: 11.8,
        color: colors.palesky,
    },
    footerLink: {
        fontSize: 11.8,
        color: colors.caribbeanGreen,
    },
});
