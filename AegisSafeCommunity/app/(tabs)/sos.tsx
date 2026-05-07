// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   Alert,
//   Animated,
//   Linking,
//   Platform,
//   Share,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   Vibration,
//   View,
// } from 'react-native';
// import * as Location from 'expo-location';
// import Svg, { Path } from 'react-native-svg';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';

// // ─── Amber Checkmark Icon ────────────────────────────────────────────────────────
// function CheckIcon() {
//   return (
//     <Svg width="18" height="13" viewBox="0 0 87 63" fill="none">
//       <Path
//         d="M85.5194 8.49535L31.9968 61.5374C31.5307 62.001 30.9767 62.3688 30.3668 62.6198C29.7569 62.8708 29.103 63 28.4426 63C27.7822 63 27.1283 62.8708 26.5184 62.6198C25.9084 62.3688 25.3545 62.001 24.8883 61.5374L1.47221 38.3315C1.00546 37.869 0.635218 37.3198 0.382615 36.7155C0.130013 36.1111 6.9551e-09 35.4634 0 34.8092C-6.9551e-09 34.155 0.130013 33.5073 0.382615 32.9029C0.635218 32.2986 1.00546 31.7494 1.47221 31.2869C1.93896 30.8243 2.49307 30.4574 3.10291 30.2071C3.71275 29.9567 4.36637 29.8279 5.02645 29.8279C5.68653 29.8279 6.34015 29.9567 6.94999 30.2071C7.55982 30.4574 8.11393 30.8243 8.58068 31.2869L28.4468 50.9746L78.4193 1.45899C79.3619 0.524815 80.6404 0 81.9735 0C83.3066 0 84.5851 0.524815 85.5278 1.45899C86.4704 2.39317 87 3.66019 87 4.98132C87 6.30245 86.4704 7.56947 85.5278 8.50364L85.5194 8.49535Z"
//         fill="#F59E0B"
//       />
//     </Svg>
//   );
// }

// // ─── Constants ────────────────────────────────────────────────────────────────
// const HOLD_DURATION_MS = 3000;

// // ─── Pulse Ring (idle glow animation) ─────────────────────────────────────────
// function PulseRing({ visible }: { visible: boolean }) {
//   const scale1 = useRef(new Animated.Value(1)).current;
//   const opacity1 = useRef(new Animated.Value(0)).current;
//   const scale2 = useRef(new Animated.Value(1)).current;
//   const opacity2 = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (!visible) {
//       scale1.setValue(1); opacity1.setValue(0);
//       scale2.setValue(1); opacity2.setValue(0);
//       return;
//     }
//     opacity1.setValue(0.3);
//     opacity2.setValue(0.3);
//     const loop1 = Animated.loop(
//       Animated.sequence([
//         Animated.parallel([
//           Animated.timing(scale1, { toValue: 2.0, duration: 900, useNativeDriver: true }),
//           Animated.timing(opacity1, { toValue: 0, duration: 900, useNativeDriver: true }),
//         ]),
//         Animated.parallel([
//           Animated.timing(scale1, { toValue: 1, duration: 0, useNativeDriver: true }),
//           Animated.timing(opacity1, { toValue: 0.3, duration: 0, useNativeDriver: true }),
//         ]),
//       ])
//     );
//     const loop2 = Animated.loop(
//       Animated.sequence([
//         Animated.delay(450),
//         Animated.parallel([
//           Animated.timing(scale2, { toValue: 2.0, duration: 900, useNativeDriver: true }),
//           Animated.timing(opacity2, { toValue: 0, duration: 900, useNativeDriver: true }),
//         ]),
//         Animated.parallel([
//           Animated.timing(scale2, { toValue: 1, duration: 0, useNativeDriver: true }),
//           Animated.timing(opacity2, { toValue: 0.3, duration: 0, useNativeDriver: true }),
//         ]),
//       ])
//     );
//     loop1.start(); loop2.start();
//     return () => { loop1.stop(); loop2.stop(); };
//   }, [visible]);

//   if (!visible) return null;
//   return (
//     <>
//       <Animated.View style={[styles.pulseRing, { transform: [{ scale: scale1 }], opacity: opacity1 }]} />
//       <Animated.View style={[styles.pulseRing, { transform: [{ scale: scale2 }], opacity: opacity2 }]} />
//     </>
//   );
// }

// // ─── Status Row ───────────────────────────────────────────────────────────────
// function StatusRow({ icon, label, value }: { icon: string; label: string; value: string }) {
//   return (
//     <View style={styles.statusRow}>
//       <View style={styles.statusRowLeft}>
//         <Text style={styles.statusRowIcon}>{icon}</Text>
//         <Text style={styles.statusRowLabel}>{label}</Text>
//       </View>
//       <Text style={styles.statusRowValue}>{value}</Text>
//     </View>
//   );
// }

// // ─── Main Component ───────────────────────────────────────────────────────────
// export default function SosTab() {
//   const router = useRouter();

//   // Location state
//   const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
//   const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'shared' | 'error'>('idle');

//   const shareLiveLocation = useCallback(async () => {
//     try {
//       setLocationStatus('loading');
//       // Request permission
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         setLocationStatus('error');
//         Alert.alert(
//           'Permission Denied',
//           'Location access is required to share your position. Please enable it in Settings.',
//           [
//             { text: 'Cancel', style: 'cancel' },
//             { text: 'Open Settings', onPress: () => Linking.openSettings() },
//           ]
//         );
//         return;
//       }
//       // Get current position
//       const loc = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//       });
//       const { latitude, longitude } = loc.coords;
//       setLocationCoords({ lat: latitude, lng: longitude });
//       setLocationStatus('shared');
//       // Share via native share sheet
//       const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
//       await Share.share({
//         title: 'My Live Location — Aegis SOS',
//         message: `🚨 I need help! My live location:\n${mapsUrl}`,
//         url: mapsUrl,
//       });
//     } catch (err) {
//       setLocationStatus('error');
//       Alert.alert('Error', 'Could not retrieve your location. Please try again.');
//     }
//   }, []);
//   const [sosActive, setSosActive] = useState(false);
//   const [holding, setHolding] = useState(false);
//   const holdAnim = useRef<Animated.CompositeAnimation | null>(null);
//   const progress = useRef(new Animated.Value(0)).current;
//   const buttonScale = useRef(new Animated.Value(1)).current;
//   const bgAnim = useRef(new Animated.Value(0)).current;
//   const cancelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

//   // Glow anim — idle slow pulse
//   const glowScale = useRef(new Animated.Value(1)).current;
//   useEffect(() => {
//     const loop = Animated.loop(
//       Animated.sequence([
//         Animated.timing(glowScale, { toValue: 1.18, duration: 1400, useNativeDriver: true }),
//         Animated.timing(glowScale, { toValue: 1, duration: 1400, useNativeDriver: true }),
//       ])
//     );
//     if (!sosActive) loop.start();
//     else loop.stop();
//     return () => loop.stop();
//   }, [sosActive]);

//   // Background wash when active
//   useEffect(() => {
//     Animated.timing(bgAnim, {
//       toValue: sosActive ? 1 : 0,
//       duration: 400,
//       useNativeDriver: false,
//     }).start();
//   }, [sosActive]);

//   const bgColor = bgAnim.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['#0F172A', '#2D0808'],
//   });

//   const startHold = useCallback(() => {
//     if (sosActive) return;
//     setHolding(true);
//     Vibration.vibrate(50);
//     Animated.spring(buttonScale, { toValue: 0.92, useNativeDriver: true }).start();
//     holdAnim.current = Animated.timing(progress, {
//       toValue: 1,
//       duration: HOLD_DURATION_MS,
//       useNativeDriver: false,
//     });
//     holdAnim.current.start(({ finished }) => {
//       if (finished) {
//         Vibration.vibrate([0, 100, 80, 100]);
//         setHolding(false);
//         setSosActive(true);
//         Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();
//         progress.setValue(0);
//       }
//     });
//   }, [sosActive]);

//   const cancelHold = useCallback(() => {
//     if (sosActive) return;
//     setHolding(false);
//     holdAnim.current?.stop();
//     Animated.parallel([
//       Animated.spring(progress, { toValue: 0, useNativeDriver: false }),
//       Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }),
//     ]).start();
//   }, [sosActive]);

//   const handleCancelSos = useCallback(() => {
//     if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current);
//     // Immediately hide the active UI and return home
//     setSosActive(false);
//     router.replace('/(tabs)/home');
//   }, [router]);

//   useEffect(() => {
//     return () => {
//       if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current);
//     };
//   }, []);

//   return (
//     <Animated.View style={[styles.root, { backgroundColor: bgColor }]}>
//       <SafeAreaView style={styles.safeArea}>
//         {/* ── Header ── */}
//         <View style={styles.header}>
//           <Text style={styles.headerText}>
//             {sosActive ? (
//               <>
//                 <Text style={styles.headerSos}>SOS</Text>
//                 <Text style={styles.headerDot}> ● </Text>
//                 <Text style={styles.headerActive}>ACTIVE</Text>
//               </>
//             ) : (
//               'EMERGENCY SOS'
//             )}
//           </Text>
//         </View>

//         {sosActive ? (
//           /* ══════════════ ACTIVE STATE ══════════════ */
//           <View style={styles.activeContent}>
//             {/* Alert sending label */}
//             <Text style={styles.alertSendingText}>ALERT SENDING...</Text>

//             {/* SOS circle (smaller in active) */}
//             <View style={styles.activeSosCircle}>
//               <Text style={styles.activeSosLabel}>SOS</Text>
//             </View>

//             {/* Officers count */}
//             <Text style={styles.officerCount}>3</Text>
//             <Text style={styles.officerLabel}>Officers notified</Text>

//             {/* Status checklist */}
//             <View style={styles.checklistCard}>
//               <StatusRow
//                 icon="📍"
//                 label="Live location shared"
//                 value={
//                   locationStatus === 'shared' && locationCoords
//                     ? `${locationCoords.lat.toFixed(4)}, ${locationCoords.lng.toFixed(4)}`
//                     : '✓ Done'
//                 }
//               />
//               <View style={styles.checklistDivider} />
//               <StatusRow icon="👤" label="Officers notified" value="3 nearby" />
//               <View style={styles.checklistDivider} />
//               <StatusRow icon="🏘" label="Community watch alerted" value="✓ Done" />
//               <View style={styles.checklistDivider} />
//               <StatusRow icon="🕐" label="Nearest unit ETA" value="~6 min" />
//             </View>

//             {/* Cancel SOS */}
//             <TouchableOpacity style={styles.cancelSosBtn} onPress={handleCancelSos} activeOpacity={0.8}>
//               <Text style={styles.cancelSosBtnText}>CANCEL SOS</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           /* ══════════════ IDLE STATE ══════════════ */
//           <View style={styles.idleContent}>
//             {/* SOS button with glow */}
//             <View style={styles.sosBtnWrapper}>
//               <PulseRing visible={holding} />
//               {/* Idle soft glow */}
//               <Animated.View
//                 style={[
//                   styles.idleGlow,
//                   { transform: [{ scale: glowScale }] },
//                 ]}
//               />
//               <TouchableOpacity
//                 activeOpacity={1}
//                 onPressIn={startHold}
//                 onPressOut={cancelHold}
//                 style={styles.sosBtn}
//               >
//                 <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
//                   <Text style={styles.sosBtnText}>{holding ? 'HOLD…' : 'SOS'}</Text>
//                 </Animated.View>
//               </TouchableOpacity>
//             </View>

//             {/* Title & subtitle */}
//             <Text style={styles.idleTitle}>Emergency SOS</Text>
//             <Text style={styles.idleSubtitle}>
//               Press and hold the button to send your live location to nearby officers and community watch.
//             </Text>

//             {/* Action buttons */}
//             <TouchableOpacity
//               style={[
//                 styles.actionBtn,
//                 locationStatus === 'shared' && styles.actionBtnSuccess,
//                 locationStatus === 'loading' && styles.actionBtnLoading,
//               ]}
//               activeOpacity={0.8}
//               onPress={shareLiveLocation}
//               disabled={locationStatus === 'loading'}
//             >
//               {locationStatus === 'shared' ? (
//                 <CheckIcon />
//               ) : (
//                 <Text style={styles.actionBtnIcon}>
//                   {locationStatus === 'loading' ? '⏳' : '📍'}
//                 </Text>
//               )}
//               <Text style={[
//                 styles.actionBtnText,
//                 locationStatus === 'shared' && { color: '#F59E0B' },
//               ]}>
//                 {locationStatus === 'loading'
//                   ? 'GETTING LOCATION...'
//                   : locationStatus === 'shared'
//                   ? 'LOCATION SHARED'
//                   : 'SHARE LIVE LOCATION'}
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.actionBtn}
//               activeOpacity={0.8}
//               onPress={() => Linking.openURL('tel:08061972676')}
//             >
//               <Text style={styles.actionBtnIcon}>📞</Text>
//               <Text style={styles.actionBtnText}>CALL EMERGENCY LINE</Text>
//             </TouchableOpacity>

//             {/* Cancel */}
//             <TouchableOpacity 
//               style={styles.cancelIdleBtn} 
//               activeOpacity={0.8}
//               onPress={() => router.replace('/(tabs)/home')}
//             >
//               <Text style={styles.cancelIdleBtnText}>CANCEL</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </SafeAreaView>
//     </Animated.View>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//   },

//   // Header
//   header: {
//     paddingHorizontal: 20,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.06)',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 12,
//     letterSpacing: 2,
//     color: '#94A3B8',
//     fontWeight: '600',
//   },
//   headerSos: {
//     color: '#94A3B8',
//   },
//   headerDot: {
//     color: '#EF4444',
//   },
//   headerActive: {
//     color: '#EF4444',
//   },

//   // ── IDLE STATE ──
//   idleContent: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 40,
//     paddingBottom: 24,
//   },
//   sosBtnWrapper: {
//     width: 200,
//     height: 200,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 36,
//   },
//   idleGlow: {
//     position: 'absolute',
//     width: 200,
//     height: 200,
//     borderRadius: 100,
//     backgroundColor: 'rgba(220, 38, 38, 0.35)',
//   },
//   pulseRing: {
//     position: 'absolute',
//     width: 160,
//     height: 160,
//     borderRadius: 80,
//     backgroundColor: '#DC2626',
//   },
//   sosBtn: {
//     width: 160,
//     height: 160,
//     borderRadius: 80,
//     backgroundColor: '#EF4444',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#EF4444',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.8,
//     shadowRadius: 30,
//     elevation: 20,
//   },
//   sosBtnText: {
//     color: '#FFFFFF',
//     fontSize: 28,
//     fontWeight: '900',
//     letterSpacing: 3,
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//   },
//   idleTitle: {
//     fontSize: 24,
//     fontWeight: '700',
//     color: '#F8FAFC',
//     fontFamily: 'serif',
//     marginBottom: 12,
//     textAlign: 'center',
//   },
//   idleSubtitle: {
//     fontSize: 13,
//     color: '#94A3B8',
//     textAlign: 'center',
//     lineHeight: 20,
//     marginBottom: 36,
//     paddingHorizontal: 8,
//   },
//   actionBtn: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     paddingVertical: 16,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(245, 158, 11, 0.4)',
//     backgroundColor: 'rgba(245, 158, 11, 0.08)',
//     marginBottom: 12,
//     gap: 10,
//   },
//   actionBtnSuccess: {
//     borderColor: 'rgba(16, 185, 129, 0.5)',
//     backgroundColor: 'rgba(16, 185, 129, 0.08)',
//   },
//   actionBtnLoading: {
//     opacity: 0.6,
//   },
//   actionBtnIcon: {
//     fontSize: 16,
//   },
//   actionBtnText: {
//     color: '#F59E0B',
//     fontSize: 12,
//     fontWeight: '700',
//     letterSpacing: 1,
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//   },
//   cancelIdleBtn: {
//     width: '100%',
//     paddingVertical: 16,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//     backgroundColor: 'transparent',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   cancelIdleBtnText: {
//     color: '#94A3B8',
//     fontSize: 12,
//     fontWeight: '600',
//     letterSpacing: 1,
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//   },

//   // ── ACTIVE STATE ──
//   activeContent: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 24,
//     paddingTop: 28,
//     paddingBottom: 24,
//   },
//   alertSendingText: {
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 11,
//     letterSpacing: 2,
//     color: '#EF4444',
//     fontWeight: '700',
//     marginBottom: 20,
//   },
//   activeSosCircle: {
//     width: 110,
//     height: 110,
//     borderRadius: 55,
//     backgroundColor: '#EF4444',
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#EF4444',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.6,
//     shadowRadius: 20,
//     elevation: 15,
//     marginBottom: 20,
//   },
//   activeSosLabel: {
//     color: '#FFFFFF',
//     fontSize: 22,
//     fontWeight: '900',
//     letterSpacing: 3,
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//   },
//   officerCount: {
//     fontSize: 56,
//     fontWeight: '700',
//     color: '#F8FAFC',
//     fontFamily: 'serif',
//     lineHeight: 64,
//   },
//   officerLabel: {
//     fontSize: 12,
//     color: '#94A3B8',
//     letterSpacing: 0.5,
//     marginBottom: 28,
//   },
//   checklistCard: {
//     width: '100%',
//     borderRadius: 12,
//     backgroundColor: 'rgba(255,255,255,0.05)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.07)',
//     overflow: 'hidden',
//     marginBottom: 'auto',
//   },
//   statusRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },
//   statusRowLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//   },
//   statusRowIcon: {
//     fontSize: 16,
//   },
//   statusRowLabel: {
//     color: '#E2E8F0',
//     fontSize: 13,
//     fontWeight: '500',
//   },
//   statusRowValue: {
//     color: '#F59E0B',
//     fontSize: 12,
//     fontWeight: '700',
//     letterSpacing: 0.3,
//   },
//   checklistDivider: {
//     height: 1,
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     marginHorizontal: 16,
//   },
//   cancelSosBtn: {
//     width: '100%',
//     paddingVertical: 18,
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.12)',
//     backgroundColor: 'rgba(255,255,255,0.04)',
//     alignItems: 'center',
//     marginTop: 24,
//   },
//   cancelSosBtnText: {
//     color: '#94A3B8',
//     fontSize: 12,
//     fontWeight: '700',
//     letterSpacing: 1.5,
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//   },
// });

import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Linking,
  Platform,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import * as Location from 'expo-location';
import Svg, { Path } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AuthStorage } from '../../src/utils/authStorage';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const getBaseUrl = () => process.env.EXPO_PUBLIC_BASE_URL || 'http://10.170.172.2:5000';

// ─── Amber Checkmark Icon ────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <Svg width="18" height="13" viewBox="0 0 87 63" fill="none">
      <Path
        d="M85.5194 8.49535L31.9968 61.5374C31.5307 62.001 30.9767 62.3688 30.3668 62.6198C29.7569 62.8708 29.103 63 28.4426 63C27.7822 63 27.1283 62.8708 26.5184 62.6198C25.9084 62.3688 25.3545 62.001 24.8883 61.5374L1.47221 38.3315C1.00546 37.869 0.635218 37.3198 0.382615 36.7155C0.130013 36.1111 6.9551e-09 35.4634 0 34.8092C-6.9551e-09 34.155 0.130013 33.5073 0.382615 32.9029C0.635218 32.2986 1.00546 31.7494 1.47221 31.2869C1.93896 30.8243 2.49307 30.4574 3.10291 30.2071C3.71275 29.9567 4.36637 29.8279 5.02645 29.8279C5.68653 29.8279 6.34015 29.9567 6.94999 30.2071C7.55982 30.4574 8.11393 30.8243 8.58068 31.2869L28.4468 50.9746L78.4193 1.45899C79.3619 0.524815 80.6404 0 81.9735 0C83.3066 0 84.5851 0.524815 85.5278 1.45899C86.4704 2.39317 87 3.66019 87 4.98132C87 6.30245 86.4704 7.56947 85.5278 8.50364L85.5194 8.49535Z"
        fill="#F59E0B"
      />
    </Svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────
const HOLD_DURATION_MS = 3000;

// ─── Pulse Ring (idle glow animation) ─────────────────────────────────────────
function PulseRing({ visible }: { visible: boolean }) {
  const scale1 = useRef(new Animated.Value(1)).current;
  const opacity1 = useRef(new Animated.Value(0)).current;
  const scale2 = useRef(new Animated.Value(1)).current;
  const opacity2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible) {
      scale1.setValue(1); opacity1.setValue(0);
      scale2.setValue(1); opacity2.setValue(0);
      return;
    }
    opacity1.setValue(0.3);
    opacity2.setValue(0.3);
    const loop1 = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale1, { toValue: 2.0, duration: 900, useNativeDriver: true }),
          Animated.timing(opacity1, { toValue: 0, duration: 900, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale1, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity1, { toValue: 0.3, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    const loop2 = Animated.loop(
      Animated.sequence([
        Animated.delay(450),
        Animated.parallel([
          Animated.timing(scale2, { toValue: 2.0, duration: 900, useNativeDriver: true }),
          Animated.timing(opacity2, { toValue: 0, duration: 900, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale2, { toValue: 1, duration: 0, useNativeDriver: true }),
          Animated.timing(opacity2, { toValue: 0.3, duration: 0, useNativeDriver: true }),
        ]),
      ])
    );
    loop1.start(); loop2.start();
    return () => { loop1.stop(); loop2.stop(); };
  }, [visible]);

  if (!visible) return null;
  return (
    <>
      <Animated.View style={[styles.pulseRing, { transform: [{ scale: scale1 }], opacity: opacity1 }]} />
      <Animated.View style={[styles.pulseRing, { transform: [{ scale: scale2 }], opacity: opacity2 }]} />
    </>
  );
}

// ─── Status Row ───────────────────────────────────────────────────────────────
function StatusRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <View style={styles.statusRow}>
      <View style={styles.statusRowLeft}>
        <Text style={styles.statusRowIcon}>{icon}</Text>
        <Text style={styles.statusRowLabel}>{label}</Text>
      </View>
      <Text style={styles.statusRowValue}>{value}</Text>
    </View>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function SosTab() {
  const router = useRouter();

  // Location state
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'shared' | 'error'>('idle');

  // Token state
  const [token, setToken] = useState<string | null>(null);

  // Get token on mount
  useEffect(() => {
    (async () => {
      const t = await AuthStorage.getToken();
      setToken(t);
    })();
  }, []);

  const shareLiveLocation = useCallback(async () => {
    try {
      setLocationStatus('loading');
      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationStatus('error');
        Alert.alert(
          'Permission Denied',
          'Location access is required to share your position. Please enable it in Settings.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Linking.openSettings() },
          ]
        );
        return;
      }
      // Get current position
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = loc.coords;
      setLocationCoords({ lat: latitude, lng: longitude });
      setLocationStatus('shared');
      // Share via native share sheet
      const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
      await Share.share({
        title: 'My Live Location — Aegis SOS',
        message: `🚨 I need help! My live location:\n${mapsUrl}`,
        url: mapsUrl,
      });
    } catch (err) {
      setLocationStatus('error');
      Alert.alert('Error', 'Could not retrieve your location. Please try again.');
    }
  }, []);

  const [sosActive, setSosActive] = useState(false);
  const [holding, setHolding] = useState(false);
  const holdAnim = useRef<Animated.CompositeAnimation | null>(null);
  const progress = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;
  const cancelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Glow anim — idle slow pulse
  const glowScale = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glowScale, { toValue: 1.18, duration: 1400, useNativeDriver: true }),
        Animated.timing(glowScale, { toValue: 1, duration: 1400, useNativeDriver: true }),
      ])
    );
    if (!sosActive) loop.start();
    else loop.stop();
    return () => loop.stop();
  }, [sosActive]);

  // Background wash when active
  useEffect(() => {
    Animated.timing(bgAnim, {
      toValue: sosActive ? 1 : 0,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [sosActive]);

  const bgColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#0F172A', '#2D0808'],
  });

  // ── Trigger distress signal to backend ──────────────────────────────────────
  const triggerDistress = useCallback(async () => {
    if (!token) {
      console.warn('No token available for distress signal');
      return;
    }
    try {
      const distressUrl = `${getBaseUrl()}/api/reporter/distress`;
      const res = await fetch(distressUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        console.error('Distress signal failed:', res.status);
      } else {
        const data = await res.json();
        console.log('Distress signal sent:', data.report?._id);
      }
    } catch (err) {
      console.error('Distress signal error:', err);
    }
  }, [token]);

  const startHold = useCallback(() => {
    if (sosActive) return;
    setHolding(true);
    Vibration.vibrate(50);
    Animated.spring(buttonScale, { toValue: 0.92, useNativeDriver: true }).start();
    holdAnim.current = Animated.timing(progress, {
      toValue: 1,
      duration: HOLD_DURATION_MS,
      useNativeDriver: false,
    });
    holdAnim.current.start(({ finished }) => {
      if (finished) {
        Vibration.vibrate([0, 100, 80, 100]);
        setHolding(false);
        setSosActive(true);
        // Send distress signal to backend
        triggerDistress();
        Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }).start();
        progress.setValue(0);
      }
    });
  }, [sosActive, triggerDistress]);

  const cancelHold = useCallback(() => {
    if (sosActive) return;
    setHolding(false);
    holdAnim.current?.stop();
    Animated.parallel([
      Animated.spring(progress, { toValue: 0, useNativeDriver: false }),
      Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  }, [sosActive]);

  const handleCancelSos = useCallback(() => {
    if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current);
    // Immediately hide the active UI and return home
    setSosActive(false);
    router.replace('/(tabs)/home');
  }, [router]);

  useEffect(() => {
    return () => {
      if (cancelTimerRef.current) clearTimeout(cancelTimerRef.current);
    };
  }, []);

  return (
    <Animated.View style={[styles.root, { backgroundColor: bgColor }]}>
      <SafeAreaView style={styles.safeArea}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {sosActive ? (
              <>
                <Text style={styles.headerSos}>SOS</Text>
                <Text style={styles.headerDot}> ● </Text>
                <Text style={styles.headerActive}>ACTIVE</Text>
              </>
            ) : (
              'EMERGENCY SOS'
            )}
          </Text>
        </View>

        {sosActive ? (
          /* ══════════════ ACTIVE STATE ══════════════ */
          <View style={styles.activeContent}>
            {/* Alert sending label */}
            <Text style={styles.alertSendingText}>ALERT SENDING...</Text>

            {/* SOS circle (smaller in active) */}
            <View style={styles.activeSosCircle}>
              <Text style={styles.activeSosLabel}>SOS</Text>
            </View>

            {/* Officers count */}
            <Text style={styles.officerCount}>3</Text>
            <Text style={styles.officerLabel}>Officers notified</Text>

            {/* Status checklist */}
            <View style={styles.checklistCard}>
              <StatusRow
                icon="📍"
                label="Live location shared"
                value={
                  locationStatus === 'shared' && locationCoords
                    ? `${locationCoords.lat.toFixed(4)}, ${locationCoords.lng.toFixed(4)}`
                    : '✓ Done'
                }
              />
              <View style={styles.checklistDivider} />
              <StatusRow icon="👤" label="Officers notified" value="3 nearby" />
              <View style={styles.checklistDivider} />
              <StatusRow icon="🏘" label="Community watch alerted" value="✓ Done" />
              <View style={styles.checklistDivider} />
              <StatusRow icon="🕐" label="Nearest unit ETA" value="~6 min" />
            </View>

            {/* Cancel SOS */}
            <TouchableOpacity style={styles.cancelSosBtn} onPress={handleCancelSos} activeOpacity={0.8}>
              <Text style={styles.cancelSosBtnText}>CANCEL SOS</Text>
            </TouchableOpacity>
          </View>
        ) : (
          /* ══════════════ IDLE STATE ══════════════ */
          <View style={styles.idleContent}>
            {/* SOS button with glow */}
            <View style={styles.sosBtnWrapper}>
              <PulseRing visible={holding} />
              {/* Idle soft glow */}
              <Animated.View
                style={[
                  styles.idleGlow,
                  { transform: [{ scale: glowScale }] },
                ]}
              />
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={startHold}
                onPressOut={cancelHold}
                style={styles.sosBtn}
              >
                <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
                  <Text style={styles.sosBtnText}>{holding ? 'HOLD…' : 'SOS'}</Text>
                </Animated.View>
              </TouchableOpacity>
            </View>

            {/* Title & subtitle */}
            <Text style={styles.idleTitle}>Emergency SOS</Text>
            <Text style={styles.idleSubtitle}>
              Press and hold the button to send your live location to nearby officers and community watch.
            </Text>

            {/* Action buttons */}
            <TouchableOpacity
              style={[
                styles.actionBtn,
                locationStatus === 'shared' && styles.actionBtnSuccess,
                locationStatus === 'loading' && styles.actionBtnLoading,
              ]}
              activeOpacity={0.8}
              onPress={shareLiveLocation}
              disabled={locationStatus === 'loading'}
            >
              {locationStatus === 'shared' ? (
                <CheckIcon />
              ) : (
                <Text style={styles.actionBtnIcon}>
                  {locationStatus === 'loading' ? '⏳' : '📍'}
                </Text>
              )}
              <Text style={[
                styles.actionBtnText,
                locationStatus === 'shared' && { color: '#F59E0B' },
              ]}>
                {locationStatus === 'loading'
                  ? 'GETTING LOCATION...'
                  : locationStatus === 'shared'
                  ? 'LOCATION SHARED'
                  : 'SHARE LIVE LOCATION'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionBtn}
              activeOpacity={0.8}
              onPress={() => Linking.openURL('tel:08061972676')}
            >
              <Text style={styles.actionBtnIcon}>📞</Text>
              <Text style={styles.actionBtnText}>CALL EMERGENCY LINE</Text>
            </TouchableOpacity>

            {/* Cancel */}
            <TouchableOpacity 
              style={styles.cancelIdleBtn} 
              activeOpacity={0.8}
              onPress={() => router.replace('/(tabs)/home')}
            >
              <Text style={styles.cancelIdleBtnText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </Animated.View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },

  // Header
  header: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12,
    letterSpacing: 2,
    color: '#94A3B8',
    fontWeight: '600',
  },
  headerSos: {
    color: '#94A3B8',
  },
  headerDot: {
    color: '#EF4444',
  },
  headerActive: {
    color: '#EF4444',
  },

  // ── IDLE STATE ──
  idleContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 24,
  },
  sosBtnWrapper: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 36,
  },
  idleGlow: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(220, 38, 38, 0.35)',
  },
  pulseRing: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#DC2626',
  },
  sosBtn: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 30,
    elevation: 20,
  },
  sosBtnText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: '900',
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  idleTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
    fontFamily: 'serif',
    marginBottom: 12,
    textAlign: 'center',
  },
  idleSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 36,
    paddingHorizontal: 8,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.4)',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
    marginBottom: 12,
    gap: 10,
  },
  actionBtnSuccess: {
    borderColor: 'rgba(16, 185, 129, 0.5)',
    backgroundColor: 'rgba(16, 185, 129, 0.08)',
  },
  actionBtnLoading: {
    opacity: 0.6,
  },
  actionBtnIcon: {
    fontSize: 16,
  },
  actionBtnText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  cancelIdleBtn: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: 4,
  },
  cancelIdleBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },

  // ── ACTIVE STATE ──
  activeContent: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 24,
  },
  alertSendingText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 11,
    letterSpacing: 2,
    color: '#EF4444',
    fontWeight: '700',
    marginBottom: 20,
  },
  activeSosCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 15,
    marginBottom: 20,
  },
  activeSosLabel: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: 3,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  officerCount: {
    fontSize: 56,
    fontWeight: '700',
    color: '#F8FAFC',
    fontFamily: 'serif',
    lineHeight: 64,
  },
  officerLabel: {
    fontSize: 12,
    color: '#94A3B8',
    letterSpacing: 0.5,
    marginBottom: 28,
  },
  checklistCard: {
    width: '100%',
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    overflow: 'hidden',
    marginBottom: 'auto',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  statusRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  statusRowIcon: {
    fontSize: 16,
  },
  statusRowLabel: {
    color: '#E2E8F0',
    fontSize: 13,
    fontWeight: '500',
  },
  statusRowValue: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  checklistDivider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.06)',
    marginHorizontal: 16,
  },
  cancelSosBtn: {
    width: '100%',
    paddingVertical: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(255,255,255,0.04)',
    alignItems: 'center',
    marginTop: 24,
  },
  cancelSosBtnText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
});