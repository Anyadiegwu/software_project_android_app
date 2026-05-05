import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/index';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(24)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
        ]).start();
    }, [fadeAnim, slideAnim]);

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* ── Close / X button ───────────────────────────────────── */}
            <View style={styles.closeButtonContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={() => {}}>
                    <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
            </View>

            {/* ── Main content — fills remaining space evenly ────────── */}
            <Animated.View
                style={[
                    styles.content,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.premiumHeading}>Welcome to Aegis</Text>
                    <Text style={styles.tagline}>
                        Select your role to continue. Your dashboard, permissions and
                        experience are tailored to how you use Aegis.
                    </Text>
                </View>

                {/* Role Cards */}
                <View style={styles.roleSelection}>
                    <TouchableOpacity
                        style={[styles.roleCard, styles.crimeCard]}
                        onPress={() => navigation.navigate('ReporterSignUp')}
                        activeOpacity={0.8}
                    >
                        <View style={styles.iconContainerGreen}>
                            <Text style={styles.cardIcon}>🛡️</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTopGreen}>COMMUNITY LEADER</Text>
                            <Text style={styles.cardTitle}>Crime Reporter</Text>
                            <Text style={styles.cardDescription}>
                                Report incidents anonymously, track your submissions, and
                                access your community safety map. No identity required.
                            </Text>
                            <Text style={styles.btnTextGreen}>Continue as Crime Reporter →</Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.roleCard, styles.securityCard]}
                        onPress={() => navigation.navigate('SecurityRegistration')}
                        activeOpacity={0.8}
                    >
                        <View style={styles.iconContainerBlue}>
                            <Text style={styles.cardIcon}>🛡️</Text>
                        </View>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTopBlue}>LAW ENFORCEMENT</Text>
                            <Text style={styles.cardTitle}>Security Personnel</Text>
                            <Text style={styles.cardDescription}>
                                Access the command dashboard, manage active cases, dispatch
                                units, and coordinate incident response.
                            </Text>
                            <Text style={styles.btnTextBlue}>Continue as Security Officer →</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have one? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ReporterLogin')}>
                        <Text style={styles.footerLink}>Sign in</Text>
                    </TouchableOpacity>
                </View>
            </Animated.View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.ebony,
    },
    closeButtonContainer: {
        position: 'absolute',
        top: 52,
        right: 24,
        zIndex: 10,
    },
    closeButton: {
        width: 32,
        height: 32,
        backgroundColor: '#161F35',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#6B7280',
        fontSize: 16,
    },

    // ── Content fills full height without scrolling ──────────────────────
    content: {
        flex: 1,
        justifyContent: 'space-evenly',
        paddingHorizontal: 24,
        paddingTop: SCREEN_HEIGHT * 0.04,
        paddingBottom: 16,
    },

    header: {
        alignItems: 'center',
    },
    premiumHeading: {
        fontFamily: 'serif',
        fontSize: SCREEN_HEIGHT < 700 ? 30 : 36,
        color: '#F9FAFB',
        marginBottom: 10,
        fontWeight: '900',
        textAlign: 'center',
    },
    tagline: {
        fontSize: 13,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 20,
    },

    roleSelection: {
        gap: 16,
    },
    roleCard: {
        padding: 20,
        borderRadius: 10,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    crimeCard: {
        backgroundColor: 'rgba(0, 212, 170, 0.04)',
        borderColor: 'rgba(0, 212, 170, 0.28)',
        borderWidth: 1,
    },
    securityCard: {
        backgroundColor: 'rgba(59, 130, 246, 0.04)',
        borderColor: 'rgba(59, 130, 246, 0.28)',
        borderWidth: 1,
    },
    iconContainerGreen: {
        backgroundColor: 'rgba(0, 212, 170, 0.12)',
        borderRadius: 8,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    iconContainerBlue: {
        backgroundColor: 'rgba(59, 130, 246, 0.12)',
        borderRadius: 8,
        width: 44,
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 0,
    },
    cardIcon: {
        fontSize: 20,
    },
    cardContent: {
        flex: 1,
        gap: 4,
    },
    cardTopGreen: {
        fontFamily: 'monospace',
        fontSize: 9,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        color: colors.caribbeanGreen,
        marginBottom: 2,
    },
    cardTopBlue: {
        fontFamily: 'monospace',
        fontSize: 9,
        letterSpacing: 1.4,
        textTransform: 'uppercase',
        color: colors.dodgerBlue,
        marginBottom: 2,
    },
    cardTitle: {
        fontFamily: 'serif',
        fontSize: 18,
        fontWeight: '700',
        color: '#F9FAFB',
    },
    cardDescription: {
        fontSize: 11.5,
        color: '#6B7280',
        lineHeight: 17,
    },
    btnTextGreen: {
        fontWeight: '600',
        fontSize: 11.5,
        color: colors.caribbeanGreen,
        marginTop: 2,
    },
    btnTextBlue: {
        fontWeight: '600',
        fontSize: 11.5,
        color: colors.dodgerBlue,
        marginTop: 2,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 12,
        color: '#6B7280',
    },
    footerLink: {
        fontSize: 12,
        color: colors.caribbeanGreen,
        fontWeight: '600',
    },
});