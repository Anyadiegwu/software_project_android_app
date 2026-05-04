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

export default function SecurityRegistrationScreen({ navigation }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        badgeId: '',
        workEmail: '',
        department: '',
        rank: '',
        password: '',
    });

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!form.firstName || !form.lastName || !form.badgeId || !form.workEmail || !form.department || !form.password) {
            Alert.alert('Missing Fields', 'Please fill in all required fields.');
            return;
        }

        setLoading(true);
        // Simulate authentication
        setTimeout(() => {
            setLoading(false);
            Alert.alert(
                'Registration Submitted',
                'Your credentials are being verified with your department. This usually takes 24-48 hours.',
                [{ text: 'Continue', onPress: () => navigation.navigate('Dashboard') }]
            );
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
                    <Text style={styles.topLabel}>Officer Registration</Text>
                    <Text style={styles.heading}>Create officer account</Text>

                    {/* Form Fields */}
                    <View style={styles.formRow}>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>First Name <Text style={styles.asterisk}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Adebayo"
                                placeholderTextColor="#6B7280"
                                value={form.firstName}
                                onChangeText={(v) => handleChange('firstName', v)}
                            />
                        </View>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>Last Name <Text style={styles.asterisk}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Abubakar"
                                placeholderTextColor="#6B7280"
                                value={form.lastName}
                                onChangeText={(v) => handleChange('lastName', v)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Badge / Service Number <Text style={styles.asterisk}>*</Text></Text>
                        <TextInput
                            style={[styles.input, styles.badgeInput]}
                            placeholder="NPF-2024-08412"
                            placeholderTextColor="#6B7280"
                            value={form.badgeId}
                            onChangeText={(v) => handleChange('badgeId', v)}
                            autoCapitalize="characters"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Official Email <Text style={styles.asterisk}>*</Text></Text>
                        <TextInput
                            style={styles.input}
                            placeholder="adekabar@npf.gov.ng"
                            placeholderTextColor="#6B7280"
                            value={form.workEmail}
                            onChangeText={(v) => handleChange('workEmail', v)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.formRow}>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>Department / Unit <Text style={styles.asterisk}>*</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Jigawa Command"
                                placeholderTextColor="#6B7280"
                                value={form.department}
                                onChangeText={(v) => handleChange('department', v)}
                            />
                        </View>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>Rank <Text style={styles.optional}>(optional)</Text></Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Inspector"
                                placeholderTextColor="#6B7280"
                                value={form.rank}
                                onChangeText={(v) => handleChange('rank', v)}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password <Text style={styles.asterisk}>*</Text></Text>
                        <TextInput
                            style={styles.input}
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

                    {/* Terms */}
                    <View style={styles.termsContainer}>
                         <View style={styles.checkbox}></View>
                         <Text style={styles.termsText}>
                             I agree to Aegis&apos;s Terms of Service and Privacy Policy. I understand my data is protected and never shared with authorities without my consent.
                         </Text>
                    </View>

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
                        onPress={handleSubmit}
                        disabled={loading}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.ebonyDark} />
                        ) : (
                            <Text style={styles.submitBtnText}>CREATE ACCOUNT</Text>
                        )}
                    </TouchableOpacity>

                    {/* Login Link */}
                    <TouchableOpacity
                        style={styles.loginLink}
                        onPress={() => navigation.navigate('SecurityLogin')}
                    >
                        <Text style={styles.loginLinkText}>Already have an account? <Text style={styles.loginLinkHighlight}>Sign in</Text></Text>
                    </TouchableOpacity>
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
        marginBottom: 24,
    },

    // Form
    formRow: {
        flexDirection: 'row',
        gap: 16,
    },
    halfWidth: {
        flex: 1,
    },
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
    badgeInput: {
        borderColor: colors.dodgerBlue,
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
        width: '80%',
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
        width: 15,
        height: 15,
        backgroundColor: colors.caribbeanGreen,
        borderRadius: 3,
        marginTop: 2,
    },
    termsText: {
        flex: 1,
        fontSize: 11.5,
        lineHeight: 18,
        color: colors.palesky,
    },

    // Submit
    submitBtn: {
        backgroundColor: colors.caribbeanGreen,
        borderRadius: 6,
        paddingVertical: 14,
        alignItems: 'center',
        marginBottom: 16,
    },
    submitBtnDisabled: {
        opacity: 0.6,
    },
    submitBtnText: {
        color: colors.ebonyDark,
        fontWeight: '600',
        fontSize: 13.8,
        letterSpacing: 0.413,
    },

    // Login link
    loginLink: {
        alignItems: 'center',
    },
    loginLinkText: {
        color: colors.palesky,
        fontSize: 11.8,
    },
    loginLinkHighlight: {
        color: colors.caribbeanGreen,
    },
});