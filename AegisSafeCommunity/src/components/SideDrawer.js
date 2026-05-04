import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Platform,
    StatusBar,
} from 'react-native';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors } from '../theme/index';
import { clearUserSession, getInitials, loadUserProfile } from '../utils/userStorage';

// ─── Drawer SVG Icons ──────────────────────────────────────────────────────────
const HomeIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" stroke="#F59E0B" strokeWidth="1.7" strokeLinejoin="round" />
        <Path d="M9 21V12h6v9" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const TrackReportIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <Path d="M12.8933 11.4983C14.7831 11.7539 16.4174 12.2422 17.5796 12.8803C18.8996 13.6046 19.6761 14.5568 19.6761 15.6474C19.6761 16.9968 18.465 18.146 16.5085 18.911C14.7864 19.5849 12.4278 20 9.83804 20C7.24994 20 4.88972 19.5833 3.16758 18.911C1.21104 18.1476 0 16.9985 0 15.6491C0 14.5422 0.799219 13.5802 2.1535 12.851C3.345 12.2097 5.01831 11.723 6.95044 11.4772L7.15879 13.1228C5.43338 13.3409 3.96191 13.7641 2.93969 14.3143C2.13722 14.7457 1.66517 15.2112 1.66517 15.6491C1.66517 16.2432 2.4709 16.8552 3.77309 17.3631C5.30968 17.9637 7.45341 18.3348 9.83804 18.3348C12.2227 18.3348 14.3664 17.9637 15.903 17.3631C17.2052 16.8536 18.0109 16.2416 18.0109 15.6491C18.0109 15.221 17.5551 14.7636 16.7787 14.3387C15.7874 13.7951 14.3566 13.3719 12.6719 13.144L12.8933 11.4983ZM10.634 7.22064V15.5009H8.96883V7.22064C7.34923 6.843 6.14308 5.39106 6.14308 3.65752C6.14308 1.6375 7.78058 0 9.80223 0C11.8223 0 13.4598 1.6375 13.4598 3.65752C13.4598 5.39269 12.2536 6.84463 10.634 7.22064Z" fill="#F59E0B" />
    </Svg>
);

const SafetyMapIcon = () => (
    <Svg width="20" height="19" viewBox="0 0 20 19" fill="none">
        <Path d="M19.7038 1.70107C19.6117 1.62927 19.5044 1.5794 19.3901 1.55524C19.2758 1.53109 19.1575 1.53328 19.0442 1.56165L13.1663 3.03088L7.26731 0.0808765C7.10295 -0.00110457 6.91468 -0.0215686 6.73654 0.0231843L0.582692 1.56165C0.416277 1.60324 0.268541 1.69927 0.162964 1.83446C0.0573861 1.96966 2.59719e-05 2.13626 0 2.3078V16.154C1.76969e-05 16.2708 0.0266722 16.3862 0.0779392 16.4912C0.129206 16.5963 0.203737 16.6882 0.295872 16.7602C0.388006 16.8321 0.49532 16.8821 0.609663 16.9063C0.724007 16.9306 0.842372 16.9284 0.955769 16.9001L6.83365 15.4309L12.7327 18.3809C12.8398 18.4337 12.9575 18.4613 13.0769 18.4616C13.1398 18.4616 13.2025 18.4539 13.2635 18.4386L19.4173 16.9001C19.5837 16.8585 19.7315 16.7625 19.837 16.6273C19.9426 16.4921 20 16.3255 20 16.154V2.3078C20 2.1908 19.9734 2.07535 19.922 1.97021C19.8707 1.86507 19.7961 1.77302 19.7038 1.70107ZM6.92308 13.8463C6.86019 13.8463 6.79754 13.854 6.73654 13.8693L1.53846 15.1684V2.90876L6.83365 1.58472L6.92308 1.62895V13.8463ZM18.4615 15.553L13.1663 16.877L13.0769 16.8328V4.61549C13.1398 4.61577 13.2024 4.60834 13.2635 4.59338L18.4615 3.29338V15.553Z" fill="#F59E0B" />
    </Svg>
);

const AlertsIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
);

const CommunityIcon = () => (
    <Svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <Path fillRule="evenodd" clipRule="evenodd" d="M5.98122 4.7832H6.83356V5.6543H5.98122V4.7832ZM5.36091 8.30117H8.61559V11.3891H12.1222V6.05312C12.1222 6.03828 12.1238 6.02422 12.1265 6.01016L7.01091 2.26641L1.78786 6.01211C1.79294 6.03047 1.79567 6.05 1.79567 6.06992V11.3891H5.36091V8.30117ZM12.6855 11.7285C12.6855 11.852 12.5855 11.9523 12.4613 11.9523H1.45622C1.33239 11.9523 1.232 11.852 1.232 11.7285V6.30312C0.083171 6.74531 -0.34222 5.33125 0.299577 4.82578L6.81911 0.0589834C6.89841 -0.0136729 7.02067 -0.0210947 7.10817 0.0472646L13.6418 4.80391C13.6414 4.80469 13.666 4.82578 13.6683 4.82851C14.4418 5.66133 13.6265 6.76133 12.6855 6.31719V11.7285ZM13.4929 8.30117H14.3945V11.4695H18.4609V6.36445C18.4609 6.34765 18.4632 6.33086 18.4672 6.31523L13.9906 3.10469L13.3336 3.58555L11.9836 2.60273L13.907 1.20234C13.9428 1.17442 13.9873 1.16011 14.0327 1.16197C14.078 1.16383 14.1213 1.18174 14.1547 1.2125L17.664 3.77812V2.54726H19.1914V4.89492L19.7433 5.29844C20.2914 5.72422 19.9328 6.94531 18.9441 6.56445V11.7605C18.9441 11.8664 18.8578 11.9523 18.7519 11.9523H13.4683L13.4929 11.7285V8.30117ZM7.99489 5.94453H7.14294V6.81562H7.99489V5.94453ZM5.98122 5.94453H6.83356V6.81562H5.98122V5.94453ZM7.99489 4.7832H7.14294V5.6543H7.99489V4.7832Z" fill="#F59E0B" />
    </Svg>
);

const TownHallIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M3 21h18M4 21V10l8-7 8 7v11" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M9 21v-6h6v6" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M12 3v1M6 10h.01M18 10h.01" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" />
    </Svg>
);

const ProfileIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Circle cx="12" cy="7" r="4" stroke="#F59E0B" strokeWidth="1.7" />
        <Path d="M4 21c0-4 3.582-7 8-7s8 3 8 7" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" />
    </Svg>
);

const PrivacyIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Rect x="5" y="11" width="14" height="11" rx="2" stroke="#F59E0B" strokeWidth="1.7" />
        <Path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#F59E0B" strokeWidth="1.7" strokeLinecap="round" />
        <Circle cx="12" cy="16" r="1.5" fill="#F59E0B" />
    </Svg>
);

const EmergencyIcon = () => (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <Path d="M15.9142 12.0287C15.7723 13.1075 15.2424 14.0978 14.4237 14.8146C13.605 15.5313 12.5533 15.9256 11.4651 15.9236C5.14339 15.9236 7.20443e-06 10.7802 7.20443e-06 4.4585C-0.00194344 3.37034 0.392279 2.31868 1.10905 1.49994C1.82581 0.681192 2.8161 0.151359 3.89496 0.00939315C4.16778 -0.0239187 4.44406 0.031895 4.68254 0.168502C4.92103 0.30511 5.10895 0.515184 5.21823 0.767365L6.89978 4.5214V4.53095C6.98345 4.72399 7.01801 4.93475 7.00036 5.1444C6.98272 5.35405 6.91342 5.55606 6.79867 5.7324C6.78434 5.7539 6.76921 5.7738 6.75328 5.79371L5.09562 7.7587C5.69196 8.9705 6.9595 10.2269 8.18722 10.8248L10.1251 9.17592C10.1442 9.1599 10.1641 9.14502 10.1849 9.13133C10.3611 9.01382 10.5638 8.94208 10.7747 8.92262C10.9855 8.90316 11.198 8.93658 11.3927 9.01987L11.403 9.02464L15.1539 10.7054C15.4065 10.8143 15.6171 11.002 15.7541 11.2406C15.8912 11.4791 15.9474 11.7556 15.9142 12.0287Z" fill="#EF4444" />
    </Svg>
);

const SignOutIcon = () => (
    <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M16 17l5-5-5-5" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <Path d="M21 12H9" stroke="#EF4444" strokeWidth="1.7" strokeLinecap="round" />
    </Svg>
);

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85; // 85% of screen width

export default function SideDrawer({ visible, onClose, navigation }) {
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const fadeAnim  = useRef(new Animated.Value(0)).current;

    const [displayName, setDisplayName] = useState('Community Member');
    const [initials,    setInitials]    = useState('CM');

    // Load user profile whenever the drawer becomes visible
    useEffect(() => {
        if (visible) {
            loadUserProfile().then((profile) => {
                if (profile?.displayName) {
                    const name = profile.displayName.charAt(0).toUpperCase() + profile.displayName.slice(1);
                    setDisplayName(name);
                    setInitials(getInitials(name));
                }
            });
        }
    }, [visible]);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                })
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -DRAWER_WIDTH,
                    duration: 250,
                    useNativeDriver: true,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                })
            ]).start();
        }
    }, [visible, slideAnim, fadeAnim]);

    // Handle navigation clicks
    const handleNavigation = (route) => {
        onClose();
        setTimeout(() => {
            if (navigation && navigation.navigate) {
                navigation.navigate(route);
            }
        }, 300); // Wait for drawer to close before navigating
    };

    if (!visible && slideAnim._value === -DRAWER_WIDTH) return null;

    return (
        <Modal
            visible={visible}
            transparent
            animationType="none"
            onRequestClose={onClose}
        >
            <View style={styles.overlayContainer}>
                {/* Backdrop */}
                <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
                    <TouchableOpacity style={StyleSheet.absoluteFill} onPress={onClose} activeOpacity={1} />
                </Animated.View>

                {/* Drawer */}
                <Animated.View style={[styles.drawer, { transform: [{ translateX: slideAnim }] }]}>
                    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                        
                        {/* Profile Header */}
                        <View style={styles.profileHeader}>
                            <View style={styles.avatarBox}>
                                <Text style={styles.avatarLetter}>{initials}</Text>
                            </View>
                            <View style={styles.profileInfo}>
                                <Text style={styles.profileName}>{displayName}</Text>
                                <Text style={styles.profileRole}>CRIME REPORTER</Text>
                            </View>
                        </View>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* MAIN Section */}
                        <Text style={styles.sectionTitle}>MAIN</Text>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('Home')}>
                            <View style={styles.navIconBox}><HomeIcon /></View>
                            <Text style={styles.navLabel}>Home</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('Reports')}>
                            <View style={styles.navIconBox}><TrackReportIcon /></View>
                            <Text style={styles.navLabel}>My Reports</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('Map')}>
                            <View style={styles.navIconBox}><SafetyMapIcon /></View>
                            <Text style={styles.navLabel}>Safety Map</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('Notifications')}>
                            <View style={styles.navIconBox}><AlertsIcon /></View>
                            <Text style={styles.navLabel}>Alerts</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* COMMUNITY Section */}
                        <Text style={styles.sectionTitle}>COMMUNITY</Text>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('CommunityWatch')}>
                            <View style={styles.navIconBox}><CommunityIcon /></View>
                            <Text style={styles.navLabel}>Community Watch</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('TownHalls')}>
                            <View style={styles.navIconBox}><TownHallIcon /></View>
                            <Text style={styles.navLabel}>Town Halls</Text>
                        </TouchableOpacity>

                        {/* Divider */}
                        <View style={styles.divider} />

                        {/* ACCOUNT Section */}
                        <Text style={styles.sectionTitle}>ACCOUNT</Text>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('Profile')}>
                            <View style={styles.navIconBox}><ProfileIcon /></View>
                            <Text style={styles.navLabel}>Profile</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('PrivacySettings')}>
                            <View style={styles.navIconBox}><PrivacyIcon /></View>
                            <Text style={styles.navLabel}>Privacy Settings</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('HelpSupport')}>
                            <View style={styles.navIconBox}><EmergencyIcon /></View>
                            <Text style={styles.navLabel}>Help & Support</Text>
                        </TouchableOpacity>

                        {/* Spacer to push footer down if needed */}
                        <View style={{ height: 40 }} />

                        {/* Footer Sign Out */}
                        <TouchableOpacity
                            style={styles.signOutBtn}
                            onPress={async () => {
                                onClose();
                                await clearUserSession();
                                setTimeout(() => navigation?.navigate('Welcome'), 350);
                            }}
                        >
                            <View style={styles.navIconBox}><SignOutIcon /></View>
                            <Text style={styles.signOutLabel}>Sign Out</Text>
                        </TouchableOpacity>
                        
                        <Text style={styles.versionText}>Aegis v1.0.0</Text>

                    </ScrollView>
                </Animated.View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlayContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    drawer: {
        width: DRAWER_WIDTH,
        height: '100%',
        backgroundColor: colors.navyDrawer || '#1A1F26',
        borderRightWidth: 1,
        borderRightColor: 'rgba(255,255,255,0.05)',
        shadowColor: '#000',
        shadowOffset: { width: 5, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    scrollContent: {
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 24) + 40 : 60,
        paddingBottom: 40,
        paddingHorizontal: 24,
    },
    // Profile Header
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        gap: 12,
    },
    avatarBox: {
        width: 48,
        height: 48,
        backgroundColor: colors.tealAccent || colors.caribbeanGreen,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarLetter: {
        fontFamily: 'serif',
        fontSize: 24,
        fontWeight: '900',
        color: colors.ebony,
    },
    profileInfo: {
        justifyContent: 'center',
    },
    profileName: {
        fontFamily: 'serif',
        fontSize: 18,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 2,
    },
    profileRole: {
        fontSize: 10,
        fontWeight: '700',
        color: colors.tealAccent || colors.caribbeanGreen,
        letterSpacing: 1,
    },
    // Divider
    divider: {
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 20,
    },
    // Sections
    sectionTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.palesky,
        letterSpacing: 1.5,
        marginBottom: 16,
    },
    navItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 16,
    },
    navIconBox: {
        width: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navLabel: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.white,
    },
    // Footer
    signOutBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        gap: 16,
        marginBottom: 16,
    },
    signOutIcon: {
        fontSize: 18,
    },
    signOutLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#EF4444', // Red-500
    },
    versionText: {
        fontSize: 11,
        color: colors.palesky,
        marginTop: 8,
    },
});
