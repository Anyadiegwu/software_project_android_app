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
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../../theme/index';
import { saveUserProfile } from '../../utils/userStorage';
import { BASE_URL } from '../../config/api';
// import { AuthStorage } from '../../utils/authStorage';

const EyeIcon = ({ visible }: { visible: boolean }) => (
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

export default function SecurityRegistrationScreen({ navigation }: { navigation: any }) {
    const [loading, setLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        badgeId: '',
        workEmail: '',
        department: '',
        rank: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!form.firstName || !form.lastName || !form.badgeId || !form.workEmail || !form.department || !form.password) {
            Alert.alert('Missing Fields', 'Please fill in all required fields.');
            return;
        }
        if (!agreedToTerms) {
            Alert.alert('Terms Required', 'Please agree to the Terms of Service to continue.');
            return;
        }

        setLoading(true);

        try {
            const regUrl = `${BASE_URL}/api/auth/security/register`;
            const response = await fetch(regUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${form.firstName} ${form.lastName}`,
                    email: form.workEmail.trim().toLowerCase(),
                    badgeNumber: form.badgeId.trim(),
                    department: form.department,
                    rank: form.rank,
                    password: form.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert('Registration Failed', data.message || 'Something went wrong.');
                return;
            }

            await saveUserProfile({
                displayName: `${form.firstName} ${form.lastName}`,
                email: form.workEmail,
                role: 'Security Personnel',
            });

            Alert.alert(
                'Registration Successful',
                'Your officer account has been created. Please wait for administrative approval before you can sign in. This process typically takes 24-48 hours.',
                [
                    {
                        text: 'Go to Login',
                        onPress: () => navigation.navigate('SecurityLogin'),
                    },
                ]
            );

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
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.formContainer}>
                    <Text style={styles.topLabel}>Officer Registration</Text>
                    <Text style={styles.heading}>Create officer account</Text>

                    <View style={styles.formRow}>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>First Name <Text style={styles.asterisk}>*</Text></Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Adebayo"
                                    placeholderTextColor="#6B7280"
                                    value={form.firstName}
                                    onChangeText={(v) => handleChange('firstName', v)}
                                    autoCorrect={false}
                                />
                            </View>
                        </View>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>Last Name <Text style={styles.asterisk}>*</Text></Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Abubakar"
                                    placeholderTextColor="#6B7280"
                                    value={form.lastName}
                                    onChangeText={(v) => handleChange('lastName', v)}
                                    autoCorrect={false}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Badge / Service Number <Text style={styles.asterisk}>*</Text></Text>
                        <View style={[styles.inputWrapper, { borderColor: colors.dodgerBlue }]}>
                            <TextInput
                                style={styles.input}
                                placeholder="NPF-2024-08412"
                                placeholderTextColor="#6B7280"
                                value={form.badgeId}
                                onChangeText={(v) => handleChange('badgeId', v)}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Official Email <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="adekabar@npf.gov.ng"
                                placeholderTextColor="#6B7280"
                                value={form.workEmail}
                                onChangeText={(v) => handleChange('workEmail', v)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </View>

                    <View style={styles.formRow}>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>Department / Unit <Text style={styles.asterisk}>*</Text></Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Jigawa Command"
                                    placeholderTextColor="#6B7280"
                                    value={form.department}
                                    onChangeText={(v) => handleChange('department', v)}
                                    autoCorrect={false}
                                />
                            </View>
                        </View>
                        <View style={[styles.inputGroup, styles.halfWidth]}>
                            <Text style={styles.label}>Rank <Text style={styles.optional}>(optional)</Text></Text>
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Inspector"
                                    placeholderTextColor="#6B7280"
                                    value={form.rank}
                                    onChangeText={(v) => handleChange('rank', v)}
                                    autoCorrect={false}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Password <Text style={styles.asterisk}>*</Text></Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="••••••••••••"
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
                        <View style={styles.strengthContainer}>
                            <View style={styles.strengthTrack}>
                                <View style={styles.strengthFill} />
                            </View>
                            <Text style={styles.strengthText}>Strong password ✓</Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={styles.termsContainer}
                        onPress={() => setAgreedToTerms((prev) => !prev)}
                        activeOpacity={0.7}
                    >
                         <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                             {agreedToTerms && <Text style={styles.checkboxTick}>✓</Text>}
                         </View>
                         <Text style={styles.termsText}>
                             I agree to Aegis&apos;s Terms of Service and Privacy Policy. I understand my data is protected and never shared with authorities without my consent.
                         </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.submitBtn, (loading || !agreedToTerms) && styles.submitBtnDisabled]}
                        onPress={handleSubmit}
                        disabled={loading || !agreedToTerms}
                        activeOpacity={0.8}
                    >
                        {loading ? (
                            <ActivityIndicator color={colors.ebonyDark} />
                        ) : (
                            <Text style={styles.submitBtnText}>CREATE ACCOUNT</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.loginLink}
                        onPress={() => navigation.navigate('SecurityLogin')}
                    >
                        <Text style={styles.loginLinkText}>{"Already have an account? "}<Text style={styles.loginLinkHighlight}>Sign in</Text></Text>
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
        marginBottom: 8,
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
    termsContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    checkbox: {
        width: 18,
        height: 18,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: colors.caribbeanGreen,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 1,
        flexShrink: 0,
    },
    checkboxChecked: {
        backgroundColor: colors.caribbeanGreen,
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