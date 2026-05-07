import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    StyleSheet,
    Text,
    View,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Rect, Path, Defs, RadialGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ onFinish }) {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 8,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();

        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 800,
                useNativeDriver: true,
            }).start(() => {
                if (onFinish) onFinish();
            });
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            
            {/* Background Radial Glow */}
            <View style={styles.backgroundGlow}>
                <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
                    <Defs>
                        <RadialGradient
                            id="glow"
                            cx={width / 2}
                            cy={height * 0.45}
                            rx={width * 0.4}
                            ry={width * 0.4}
                            gradientUnits="userSpaceOnUse"
                        >
                            <Stop offset="0%" stopColor="#00D4AA" stopOpacity="0.12" />
                            <Stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
                        </RadialGradient>
                    </Defs>
                    <Rect x="0" y="0" width={width} height={height} fill="url(#glow)" />
                </Svg>
            </View>

            <Animated.View style={[styles.content, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
                {/* Logo Box */}
                <View style={styles.logoBox}>
                    <Text style={styles.logoLetter}>A</Text>
                </View>

                {/* Brand Name */}
                <Text style={styles.brandName}>Aegis</Text>

                {/* Core Pillars */}
                <Text style={styles.pillars}>SAFETY  ·  JUSTICE  ·  TRUST</Text>

                {/* Description */}
                <Text style={styles.description}>
                    Your secure bridge between{"\n"}communities and law enforcement.
                </Text>
            </Animated.View>

            {/* Footer SDG Info */}
            <View style={styles.footer}>
                <Text style={styles.sdgText}>SDG 16  —  PEACE  ·  JUSTICE  ·  STRONG INSTITUTIONS</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0F1E', // Matching the screenshot's deep navy
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundGlow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    content: {
        alignItems: 'center',
        zIndex: 10,
    },
    logoBox: {
        width: 80,
        height: 80,
        backgroundColor: '#00D4AA',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
        shadowColor: '#00D4AA',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 8,
    },
    logoLetter: {
        fontSize: 48,
        fontWeight: '900',
        color: '#0A0F1E',
        fontFamily: 'serif',
    },
    brandName: {
        fontSize: 42,
        fontWeight: '800',
        color: '#FFFFFF',
        fontFamily: 'serif',
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    pillars: {
        fontSize: 10,
        fontWeight: '700',
        color: '#00D4AA',
        letterSpacing: 2,
        marginBottom: 24,
        textTransform: 'uppercase',
    },
    description: {
        fontSize: 14,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 22,
        maxWidth: width * 0.7,
    },
    footer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        alignItems: 'center',
    },
    sdgText: {
        fontSize: 9,
        color: '#374151',
        letterSpacing: 1,
        fontWeight: '600',
    },
});
