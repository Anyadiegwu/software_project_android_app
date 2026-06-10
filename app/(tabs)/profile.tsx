import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { clearUserSession, getInitials, loadUserProfile } from '../../src/utils/userStorage';

// ─── Menu SVG Icons (amber #F59E0B) ───────────────────────────────────────────────
// My Reports — person/pin (TrackReportIcon)
const ReportsIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <Path d="M12.8933 11.4983C14.7831 11.7539 16.4174 12.2422 17.5796 12.8803C18.8996 13.6046 19.6761 14.5568 19.6761 15.6474C19.6761 16.9968 18.465 18.146 16.5085 18.911C14.7864 19.5849 12.4278 20 9.83804 20C7.24994 20 4.88972 19.5833 3.16758 18.911C1.21104 18.1476 0 16.9985 0 15.6491C0 14.5422 0.799219 13.5802 2.1535 12.851C3.345 12.2097 5.01831 11.723 6.95044 11.4772L7.15879 13.1228C5.43338 13.3409 3.96191 13.7641 2.93969 14.3143C2.13722 14.7457 1.66517 15.2112 1.66517 15.6491C1.66517 16.2432 2.4709 16.8552 3.77309 17.3631C5.30968 17.9637 7.45341 18.3348 9.83804 18.3348C12.2227 18.3348 14.3664 17.9637 15.903 17.3631C17.2052 16.8536 18.0109 16.2416 18.0109 15.6491C18.0109 15.221 17.5551 14.7636 16.7787 14.3387C15.7874 13.7951 14.3566 13.3719 12.6719 13.144L12.8933 11.4983ZM10.634 7.22064V15.5009H8.96883V7.22064C7.34923 6.843 6.14308 5.39106 6.14308 3.65752C6.14308 1.6375 7.78058 0 9.80223 0C11.8223 0 13.4598 1.6375 13.4598 3.65752C13.4598 5.39269 12.2536 6.84463 10.634 7.22064Z" fill="#F59E0B" />
  </Svg>
);

// Notifications — bell
const NotificationsIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// Safety Area — folded map (SafetyMapIcon)
const SafetyAreaIcon = () => (
  <Svg width="20" height="19" viewBox="0 0 20 19" fill="none">
    <Path d="M19.7038 1.70107C19.6117 1.62927 19.5044 1.5794 19.3901 1.55524C19.2758 1.53109 19.1575 1.53328 19.0442 1.56165L13.1663 3.03088L7.26731 0.0808765C7.10295 -0.00110457 6.91468 -0.0215686 6.73654 0.0231843L0.582692 1.56165C0.416277 1.60324 0.268541 1.69927 0.162964 1.83446C0.0573861 1.96966 2.59719e-05 2.13626 0 2.3078V16.154C1.76969e-05 16.2708 0.0266722 16.3862 0.0779392 16.4912C0.129206 16.5963 0.203737 16.6882 0.295872 16.7602C0.388006 16.8321 0.49532 16.8821 0.609663 16.9063C0.724007 16.9306 0.842372 16.9284 0.955769 16.9001L6.83365 15.4309L12.7327 18.3809C12.8398 18.4337 12.9575 18.4613 13.0769 18.4616C13.1398 18.4616 13.2025 18.4539 13.2635 18.4386L19.4173 16.9001C19.5837 16.8585 19.7315 16.7625 19.837 16.6273C19.9426 16.4921 20 16.3255 20 16.154V2.3078C20 2.1908 19.9734 2.07535 19.922 1.97021C19.8707 1.86507 19.7961 1.77302 19.7038 1.70107ZM6.92308 13.8463C6.86019 13.8463 6.79754 13.854 6.73654 13.8693L1.53846 15.1684V2.90876L6.83365 1.58472L6.92308 1.62895V13.8463ZM18.4615 15.553L13.1663 16.877L13.0769 16.8328V4.61549C13.1398 4.61577 13.2024 4.60834 13.2635 4.59338L18.4615 3.29338V15.553Z" fill="#F59E0B" />
  </Svg>
);

// Privacy Settings — lock
const PrivacyIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Rect x="5" y="11" width="14" height="11" rx="2" stroke="#F59E0B" strokeWidth="1.8" />
    <Path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <Circle cx="12" cy="16" r="1.5" fill="#F59E0B" />
  </Svg>
);

// Security — shield
const SecurityIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M12 3L4 6.5V11C4 15.4183 7.58172 19.4301 12 21C16.4183 19.4301 20 15.4183 20 11V6.5L12 3Z" stroke="#F59E0B" strokeWidth="1.8" strokeLinejoin="round" />
    <Path d="M9 12l2 2 4-4" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// My Impact — bar chart
const ImpactIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M18 20V10" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M12 20V4" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M6 20v-6" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
    <Path d="M3 20h18" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

// Help & Support — emergency phone (EmergencyIcon)
const HelpIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <Path d="M15.9142 12.0287C15.7723 13.1075 15.2424 14.0978 14.4237 14.8146C13.605 15.5313 12.5533 15.9256 11.4651 15.9236C5.14339 15.9236 7.20443e-06 10.7802 7.20443e-06 4.4585C-0.00194344 3.37034 0.392279 2.31868 1.10905 1.49994C1.82581 0.681192 2.8161 0.151359 3.89496 0.00939315C4.16778 -0.0239187 4.44406 0.031895 4.68254 0.168502C4.92103 0.30511 5.10895 0.515184 5.21823 0.767365L6.89978 4.5214V4.53095C6.98345 4.72399 7.01801 4.93475 7.00036 5.1444C6.98272 5.35405 6.91342 5.55606 6.79867 5.7324C6.78434 5.7539 6.76921 5.7738 6.75328 5.79371L5.09562 7.7587C5.69196 8.9705 6.9595 10.2269 8.18722 10.8248L10.1251 9.17592C10.1442 9.1599 10.1641 9.14502 10.1849 9.13133C10.3611 9.01382 10.5638 8.94208 10.7747 8.92262C10.9855 8.90316 11.198 8.93658 11.3927 9.01987L11.403 9.02464L15.1539 10.7054C15.4065 10.8143 15.6171 11.002 15.7541 11.2406C15.8912 11.4791 15.9474 11.7556 15.9142 12.0287Z" fill="#EF4444" />
  </Svg>
);

const MENU_ITEMS = [
  { id: '1', title: 'My Reports',       subtitle: '6 submitted - 2 active',        icon: <ReportsIcon />,       right: '›' },
  { id: '2', title: 'Notifications',    subtitle: '3 unread',                       icon: <NotificationsIcon />, right: '›' },
  { id: '3', title: 'Safety Area',      subtitle: 'Detecting area...',              icon: <SafetyAreaIcon />,    rightText: 'Change' },
  { id: '4', title: 'Privacy Settings', subtitle: 'Anonymity, data & location',    icon: <PrivacyIcon />,       right: '›' },
  { id: '5', title: 'Security',         subtitle: 'Password, 2FA, sessions',       icon: <SecurityIcon />,      right: '›' },
  { id: '6', title: 'My Impact',        subtitle: '3 cases contributed to',        icon: <ImpactIcon />,        right: '›' },
  { id: '7', title: 'Help & Support',   subtitle: 'FAQs, contact & feedback',      icon: <HelpIcon />,          right: '›', isDanger: true },
];

export default function ProfileTab() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [displayName, setDisplayName] = useState('Community Member');
  const [initials,    setInitials]    = useState('CM');
  const [email,       setEmail]       = useState('');
  const [currentLocation, setCurrentLocation] = useState('Detecting area...');

  useEffect(() => {
    loadUserProfile().then((profile) => {
      if (profile?.displayName) {
        const name = profile.displayName.charAt(0).toUpperCase() + profile.displayName.slice(1);
        setDisplayName(name);
        setInitials(getInitials(name));
      }
      if (profile?.email) setEmail(profile.email);
    });

    // Fetch user's current location to show in the "Safety Area" menu item
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setCurrentLocation('Location permission denied');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const geocode = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (geocode && geocode.length > 0) {
          const place = geocode[0];
          // E.g. "Wuse 2, Abuja" or "Victoria Island, Lagos"
          const area = place.district || place.city || place.subregion || place.region || 'Unknown Area';
          const state = place.region || place.city || '';
          
          if (area && state && area !== state) {
            setCurrentLocation(`${area}, ${state}`);
          } else {
            setCurrentLocation(area || state || 'Location found');
          }
        } else {
          setCurrentLocation('Location not found');
        }
      } catch (error) {
        setCurrentLocation('Failed to get location');
      }
    })();
  }, []);

  const handleMenuPress = (title: string) => {
    if (title === 'Privacy Settings')  router.push('/privacy-settings');
    else if (title === 'My Reports')   router.push('/(tabs)/reports');
    else if (title === 'Notifications') router.push('/notifications');
    else if (title === 'Safety Area')  router.push('/(tabs)/map');
    else if (title === 'Security')     router.push('/security');
    else if (title === 'Help & Support') router.push('/help-support');
  };

  const handleSignOut = async () => {
    await clearUserSession();
    router.replace('/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom + 25, 100) }]}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>{displayName}</Text>
            {email ? <Text style={styles.userEmail}>{email}</Text> : null}
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>CRIME REPORTER</Text>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem} onPress={() => handleMenuPress(item.title)}>
              <View style={[styles.iconContainer, item.isDanger && styles.iconDanger]}>
                {item.icon}
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={styles.menuTitle}>{item.title}</Text>
                {/* Dynamically inject the location for the Safety Area item */}
                <Text style={styles.menuSubtitle}>
                  {item.id === '3' ? currentLocation : item.subtitle}
                </Text>
              </View>
              {item.rightText ? (
                <TouchableOpacity onPress={() => item.id === '3' ? handleMenuPress(item.title) : null}>
                  <Text style={styles.rightTextBtn}>{item.rightText}</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.chevron}>{item.right}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Sign Out */}
        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
          <Text style={styles.signOutText}>🚪  Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 40 : 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#45D0B1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'serif',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0D1117',
  },
  headerInfo: {
    marginLeft: 16,
    flex: 1,
  },
  userName: {
    fontFamily: 'serif',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 12,
    color: '#8B949E',
    marginBottom: 6,
  },
  roleBadge: {
    backgroundColor: '#45D0B1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  roleText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#0D1117',
    letterSpacing: 0.5,
  },
  menuContainer: {
    paddingTop: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 165, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconDanger: {
    backgroundColor: 'rgba(255, 92, 92, 0.1)',
  },
  icon: {
    fontSize: 18,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 13,
    color: '#8B949E',
  },
  chevron: {
    fontSize: 24,
    color: '#4B5563',
  },
  rightTextBtn: {
    color: '#45D0B1',
    fontWeight: '600',
    fontSize: 14,
  },
  signOutBtn: {
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 32,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    backgroundColor: 'rgba(239, 68, 68, 0.07)',
    alignItems: 'center',
  },
  signOutText: {
    color: '#EF4444',
    fontSize: 14,
    fontWeight: '600',
  },
});