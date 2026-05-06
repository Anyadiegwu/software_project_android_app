// // import * as Location from 'expo-location';
// // import React, { useEffect, useRef, useState } from 'react';
// // import {
// //   ActivityIndicator,
// //   Platform,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
// // import Svg, { Circle, Path, Polygon, Rect } from 'react-native-svg';

// // // ─── Lagos Island coordinates ─────────────────────────────────────────────────
// // const DEFAULT_REGION: Region = {
// //   latitude: 6.4532,
// //   longitude: 3.3942,
// //   latitudeDelta: 0.018,
// //   longitudeDelta: 0.014,
// // };

// // // ─── Incident report pins (match cases shown in dashboard) ────────────────────
// // const INCIDENTS = [
// //   {
// //     id: 'i1',
// //     latitude: 6.4516,
// //     longitude: 3.3872,
// //     type: 'high',
// //     priority: 'HIGH',
// //     title: 'Armed robbery',
// //     subtitle: 'Apongbon Bridge',
// //     color: '#EF4444',
// //     bgColor: 'rgba(239,68,68,0.15)',
// //     time: '08:14',
// //     caseId: 'AEG-00891',
// //   },
// //   {
// //     id: 'i2',
// //     latitude: 6.4541,
// //     longitude: 3.3960,
// //     type: 'urgent',
// //     priority: 'URGENT',
// //     title: 'Gunshots heard',
// //     subtitle: 'Marina waterfront',
// //     color: '#DC2626',
// //     bgColor: 'rgba(220,38,38,0.15)',
// //     time: '09:38',
// //     caseId: 'AEG-00893',
// //   },
// //   {
// //     id: 'i3',
// //     latitude: 6.4522,
// //     longitude: 3.3920,
// //     type: 'medium',
// //     priority: 'MEDIUM',
// //     title: 'Suspicious gathering',
// //     subtitle: 'CMS bus stop',
// //     color: '#F59E0B',
// //     bgColor: 'rgba(245,158,11,0.15)',
// //     time: '07:52',
// //     caseId: 'AEG-00887',
// //   },
// //   {
// //     id: 'i4',
// //     latitude: 6.4558,
// //     longitude: 3.3905,
// //     type: 'alert',
// //     priority: 'ALERT',
// //     title: 'Traffic altercation',
// //     subtitle: 'Broad Street',
// //     color: '#F97316',
// //     bgColor: 'rgba(249,115,22,0.15)',
// //     time: '09:05',
// //     caseId: 'AEG-00890',
// //   },
// // ];

// // // ─── Officer / unit positions ──────────────────────────────────────────────────
// // const OFFICERS = [
// //   {
// //     id: 'o1',
// //     latitude: 6.4535,
// //     longitude: 3.3965,
// //     name: 'Unit Alpha',
// //     initials: 'KT',
// //     status: 'on_scene',
// //     statusLabel: 'On Scene',
// //     color: '#3B82F6',
// //   },
// //   {
// //     id: 'o2',
// //     latitude: 6.4508,
// //     longitude: 3.3880,
// //     name: 'Unit Bravo',
// //     initials: 'F',
// //     status: 'patrol',
// //     statusLabel: 'Patrol',
// //     color: '#10B981',
// //   },
// //   {
// //     id: 'o3',
// //     latitude: 6.4550,
// //     longitude: 3.3930,
// //     name: 'Unit Delta',
// //     initials: 'D',
// //     status: 'standby',
// //     statusLabel: 'Standby',
// //     color: '#8B5CF6',
// //   },
// // ];

// // // ─── Filter config ─────────────────────────────────────────────────────────────
// // const FILTERS = [
// //   { id: 'all',      label: 'ALL',      color: '#FFFFFF' },
// //   { id: 'incident', label: 'INCIDENTS', color: '#EF4444' },
// //   { id: 'officer',  label: 'OFFICERS',  color: '#3B82F6' },
// //   { id: 'high',     label: 'HIGH RISK', color: '#EF4444' },
// //   { id: 'medium',   label: 'MEDIUM',    color: '#F59E0B' },
// // ];

// // // ─── Dark map style ────────────────────────────────────────────────────────────
// // const DARK_MAP_STYLE = [
// //   { elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
// //   { elementType: 'labels.text.fill', stylers: [{ color: '#6B7280' }] },
// //   { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1117' }] },
// //   { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#1F2937' }] },
// //   { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#9CA3AF' }] },
// //   { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6B7280' }] },
// //   { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#111827' }] },
// //   { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1F2937' }] },
// //   { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#4B5563' }] },
// //   { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#374151' }] },
// //   { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#1E3A5F' }] },
// //   { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#60A5FA' }] },
// //   { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#161F35' }] },
// //   { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0A1628' }] },
// //   { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#374151' }] },
// // ];

// // // ─── Distance & ETA helpers ──────────────────────────────────────────────────
// // function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
// //   const R = 6371;
// //   const dLat = ((lat2 - lat1) * Math.PI) / 180;
// //   const dLon = ((lon2 - lon1) * Math.PI) / 180;
// //   const a =
// //     Math.sin(dLat / 2) ** 2 +
// //     Math.cos((lat1 * Math.PI) / 180) *
// //       Math.cos((lat2 * Math.PI) / 180) *
// //       Math.sin(dLon / 2) ** 2;
// //   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// // }

// // // Lagos urban speed ~30 km/h → minutes
// // function etaMinutes(km: number): number {
// //   return Math.max(1, Math.round((km / 30) * 60));
// // }

// // // ─── Incident Pin SVG ──────────────────────────────────────────────────────────
// // const IncidentPin = ({ color, priority }: { color: string; priority: string }) => {
// //   const icon =
// //     priority === 'HIGH' || priority === 'URGENT'
// //       ? '!'
// //       : priority === 'MEDIUM'
// //       ? '~'
// //       : '⚠';
// //   return (
// //     <View style={[pinStyles.incidentPin, { borderColor: color, backgroundColor: `${color}22` }]}>
// //       <View style={[pinStyles.incidentInner, { backgroundColor: color }]}>
// //         <Text style={pinStyles.incidentText}>{icon}</Text>
// //       </View>
// //     </View>
// //   );
// // };

// // // ─── Officer Pin SVG ───────────────────────────────────────────────────────────
// // const OfficerPin = ({ initials, color }: { initials: string; color: string }) => (
// //   <View style={[pinStyles.officerPin, { borderColor: color }]}>
// //     <View style={[pinStyles.officerInner, { backgroundColor: color }]}>
// //       <Svg width="12" height="12" viewBox="0 0 24 24">
// //         <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFFFFF" />
// //       </Svg>
// //     </View>
// //     <Text style={[pinStyles.officerInitials, { color }]}>{initials}</Text>
// //   </View>
// // );

// // const pinStyles = StyleSheet.create({
// //   incidentPin: {
// //     width: 40,
// //     height: 40,
// //     borderRadius: 20,
// //     borderWidth: 2,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   incidentInner: {
// //     width: 26,
// //     height: 26,
// //     borderRadius: 13,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   incidentText: {
// //     color: '#FFFFFF',
// //     fontWeight: '900',
// //     fontSize: 13,
// //   },
// //   officerPin: {
// //     alignItems: 'center',
// //   },
// //   officerInner: {
// //     width: 32,
// //     height: 32,
// //     borderRadius: 16,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderWidth: 2,
// //     borderColor: '#FFFFFF',
// //   },
// //   officerInitials: {
// //     fontSize: 9,
// //     fontWeight: '700',
// //     marginTop: 2,
// //   },
// // });

// // // ─── Main Component ────────────────────────────────────────────────────────────
// // interface Props {
// //   onBack?: () => void;
// // }

// // export default function OfficerMapView({ onBack }: Props) {
// //   const mapRef = useRef<MapView>(null);
// //   const [activeFilter, setActiveFilter] = useState('all');
// //   const [locationStatus, setLocationStatus] = useState<'loading' | 'granted' | 'denied' | 'idle'>('idle');
// //   const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
// //   const [locationName, setLocationName] = useState<string>('LOCATING…');
// //   const [selectedItem, setSelectedItem] = useState<any>(null);
// //   const [liveSeconds, setLiveSeconds] = useState(0);

// //   useEffect(() => {
// //     let sub: Location.LocationSubscription | null = null;
// //     (async () => {
// //       setLocationStatus('loading');
// //       const { status } = await Location.requestForegroundPermissionsAsync();
// //       if (status !== 'granted') { setLocationStatus('denied'); return; }
// //       setLocationStatus('granted');
// //       const initial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
// //       setUserLocation(initial);
// //       mapRef.current?.animateToRegion({
// //         latitude: initial.coords.latitude,
// //         longitude: initial.coords.longitude,
// //         latitudeDelta: 0.018,
// //         longitudeDelta: 0.014,
// //       }, 800);

// //       // Reverse-geocode to get readable location name
// //       try {
// //         const geo = await Location.reverseGeocodeAsync({
// //           latitude: initial.coords.latitude,
// //           longitude: initial.coords.longitude,
// //         });
// //         if (geo && geo.length > 0) {
// //           const g = geo[0];
// //           const name =
// //             g.district ||
// //             g.subregion ||
// //             g.city ||
// //             g.region ||
// //             `${initial.coords.latitude.toFixed(4)}, ${initial.coords.longitude.toFixed(4)}`;
// //           setLocationName(name.toUpperCase());
// //         }
// //       } catch (_) {
// //         setLocationName(`${initial.coords.latitude.toFixed(3)}, ${initial.coords.longitude.toFixed(3)}`);
// //       }

// //       sub = await Location.watchPositionAsync(
// //         { accuracy: Location.Accuracy.Balanced, distanceInterval: 15 },
// //         (loc) => setUserLocation(loc),
// //       );
// //     })();
// //     return () => { sub?.remove(); };
// //   }, []);

// //   // Live timer
// //   useEffect(() => {
// //     const timer = setInterval(() => setLiveSeconds(s => (s + 1) % 60), 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   const visibleIncidents = INCIDENTS.filter(inc => {
// //     if (activeFilter === 'all' || activeFilter === 'incident') return true;
// //     if (activeFilter === 'high') return inc.priority === 'HIGH' || inc.priority === 'URGENT';
// //     if (activeFilter === 'medium') return inc.priority === 'MEDIUM';
// //     return false;
// //   });

// //   const visibleOfficers = OFFICERS.filter(() =>
// //     activeFilter === 'all' || activeFilter === 'officer'
// //   );

// //   return (
// //     <View style={styles.container}>
// //       {/* Map */}
// //       <MapView
// //         ref={mapRef}
// //         style={StyleSheet.absoluteFillObject}
// //         provider={PROVIDER_DEFAULT}
// //         initialRegion={DEFAULT_REGION}
// //         customMapStyle={DARK_MAP_STYLE}
// //         showsUserLocation={locationStatus === 'granted'}
// //         showsMyLocationButton={false}
// //         showsCompass={false}
// //         showsBuildings={false}
// //         onPress={() => setSelectedItem(null)}
// //       >
// //         {/* Incident markers */}
// //         {visibleIncidents.map(inc => (
// //           <Marker
// //             key={inc.id}
// //             coordinate={{ latitude: inc.latitude, longitude: inc.longitude }}
// //             tracksViewChanges={false}
// //             onPress={() => setSelectedItem({ ...inc, kind: 'incident' })}
// //           >
// //             <IncidentPin color={inc.color} priority={inc.priority} />
// //           </Marker>
// //         ))}

// //         {/* Officer markers */}
// //         {visibleOfficers.map(off => (
// //           <Marker
// //             key={off.id}
// //             coordinate={{ latitude: off.latitude, longitude: off.longitude }}
// //             tracksViewChanges={false}
// //             onPress={() => setSelectedItem({ ...off, kind: 'officer' })}
// //           >
// //             <OfficerPin initials={off.initials} color={off.color} />
// //           </Marker>
// //         ))}
// //       </MapView>

// //       {/* Header overlay */}
// //       <View style={styles.headerOverlay} pointerEvents="box-none">
// //         <View style={styles.topBar}>
// //           {onBack && (
// //             <TouchableOpacity style={styles.backBtn} onPress={onBack}>
// //               <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
// //                 <Path d="M19 12H5M12 19l-7-7 7-7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
// //               </Svg>
// //             </TouchableOpacity>
// //           )}
// //           <View style={styles.headerTitle}>
// //             <Text style={styles.headerTitleText}>LIVE INCIDENT MAP</Text>
// //           </View>
// //           <View style={styles.locationBadge}>
// //             <Text style={styles.locationBadgeText} numberOfLines={1}>{locationName}</Text>
// //           </View>
// //         </View>

// //         {/* Filter chips */}
// //         <ScrollView
// //           horizontal
// //           showsHorizontalScrollIndicator={false}
// //           style={styles.filtersScroll}
// //           contentContainerStyle={styles.filtersContent}
// //         >
// //           {FILTERS.map(f => (
// //             <TouchableOpacity
// //               key={f.id}
// //               style={[
// //                 styles.chip,
// //                 activeFilter === f.id && { backgroundColor: f.color, borderColor: f.color },
// //               ]}
// //               onPress={() => setActiveFilter(f.id)}
// //             >
// //               <Text
// //                 style={[
// //                   styles.chipText,
// //                   { color: f.color },
// //                   activeFilter === f.id && { color: '#0A0F1E' },
// //                 ]}
// //               >
// //                 {f.label}
// //               </Text>
// //             </TouchableOpacity>
// //           ))}
// //         </ScrollView>
// //       </View>

// //       {/* Loading banner */}
// //       {locationStatus === 'loading' && (
// //         <View style={styles.banner}>
// //           <ActivityIndicator size="small" color="#F59E0B" style={{ marginRight: 8 }} />
// //           <Text style={styles.bannerText}>Acquiring location…</Text>
// //         </View>
// //       )}

// //       {/* Selected item popup */}
// //       {selectedItem && (
// //         <View style={styles.popup}>
// //           {selectedItem.kind === 'incident' ? (
// //             <>
// //               <View style={styles.popupRow}>
// //                 <View style={[styles.popupBadge, { backgroundColor: selectedItem.bgColor }]}>
// //                   <Text style={[styles.popupBadgeText, { color: selectedItem.color }]}>
// //                     {selectedItem.priority}
// //                   </Text>
// //                 </View>
// //                 <Text style={styles.popupCaseId}>#{selectedItem.caseId}</Text>
// //               </View>
// //               <Text style={styles.popupTitle}>{selectedItem.title}</Text>
// //               <Text style={styles.popupSub}>{selectedItem.subtitle} · {selectedItem.time}</Text>

// //               {/* Officer response distances */}
// //               <View style={styles.officerDistList}>
// //                 <Text style={styles.officerDistHeader}>NEAREST OFFICERS</Text>
// //                 {OFFICERS
// //                   .map(off => ({
// //                     ...off,
// //                     km: haversineKm(selectedItem.latitude, selectedItem.longitude, off.latitude, off.longitude),
// //                   }))
// //                   .sort((a, b) => a.km - b.km)
// //                   .map(off => (
// //                     <View key={off.id} style={styles.officerDistRow}>
// //                       <View style={[styles.officerDistBadge, { backgroundColor: off.color }]}>
// //                         <Text style={styles.officerDistInitials}>{off.initials}</Text>
// //                       </View>
// //                       <Text style={styles.officerDistName}>{off.name}</Text>
// //                       <View style={styles.officerDistMeta}>
// //                         <Text style={styles.officerDistKm}>{off.km < 1 ? `${Math.round(off.km * 1000)} m` : `${off.km.toFixed(1)} km`}</Text>
// //                         <Text style={styles.officerDistEta}>~{etaMinutes(off.km)} min</Text>
// //                       </View>
// //                     </View>
// //                   ))
// //                 }
// //               </View>

// //               <TouchableOpacity
// //                 style={[styles.popupBtn, { backgroundColor: `${selectedItem.color}22`, borderColor: selectedItem.color }]}
// //                 onPress={() => setSelectedItem(null)}
// //               >
// //                 <Text style={[styles.popupBtnText, { color: selectedItem.color }]}>ASSIGN NEAREST UNIT →</Text>
// //               </TouchableOpacity>
// //             </>
// //           ) : (
// //             <>
// //               <Text style={styles.popupTitle}>{selectedItem.name}</Text>
// //               <View style={[styles.popupBadge, { backgroundColor: `${selectedItem.color}22`, marginBottom: 8 }]}>
// //                 <Text style={[styles.popupBadgeText, { color: selectedItem.color }]}>
// //                   {selectedItem.statusLabel.toUpperCase()}
// //                 </Text>
// //               </View>
// //               <TouchableOpacity
// //                 style={[styles.popupBtn, { backgroundColor: 'rgba(59,130,246,0.1)', borderColor: '#3B82F6' }]}
// //                 onPress={() => setSelectedItem(null)}
// //               >
// //                 <Text style={[styles.popupBtnText, { color: '#3B82F6' }]}>DISPATCH →</Text>
// //               </TouchableOpacity>
// //             </>
// //           )}
// //           <TouchableOpacity style={styles.popupClose} onPress={() => setSelectedItem(null)}>
// //             <Text style={styles.popupCloseText}>✕</Text>
// //           </TouchableOpacity>
// //         </View>
// //       )}

// //       {/* ── Recenter to user location ───────────────────────────────── */}
// //       <TouchableOpacity
// //         style={styles.recenterBtn}
// //         activeOpacity={0.8}
// //         onPress={() => {
// //           if (userLocation) {
// //             mapRef.current?.animateToRegion({
// //               latitude: userLocation.coords.latitude,
// //               longitude: userLocation.coords.longitude,
// //               latitudeDelta: 0.012,
// //               longitudeDelta: 0.008,
// //             }, 700);
// //           } else {
// //             mapRef.current?.animateToRegion(
// //               { ...DEFAULT_REGION, latitudeDelta: 0.018, longitudeDelta: 0.014 },
// //               700,
// //             );
// //           }
// //         }}
// //       >
// //         <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
// //           <Path
// //             d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
// //             fill="#F59E0B"
// //           />
// //         </Svg>
// //         <Text style={styles.recenterLabel}>ME</Text>
// //       </TouchableOpacity>

// //       {/* ── Live counter (standalone, bottom-right, above recenter) ──────── */}
// //       <View style={styles.liveCounterPill} pointerEvents="none">
// //         <View style={styles.liveDot} />
// //         <Text style={styles.liveLabel}>LIVE · {liveSeconds}s</Text>
// //       </View>

// //       {/* ── Bottom stats overlay ─────────────────────────────────────────── */}
// //       {/* Bottom stats overlay */}
// //       <View style={styles.bottomOverlay} pointerEvents="box-none">
// //         <View style={styles.legendCard}>
// //           <Text style={styles.legendTitle}>LEGEND</Text>
// //           <View style={styles.legendRow}>
// //             <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
// //             <Text style={styles.legendText}>Incident</Text>
// //           </View>
// //           <View style={styles.legendRow}>
// //             <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
// //             <Text style={styles.legendText}>Officer</Text>
// //           </View>
// //           <View style={styles.legendRow}>
// //             <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
// //             <Text style={styles.legendText}>Medium</Text>
// //           </View>
// //         </View>

// //         <View style={styles.statsCards}>
// //           <View style={styles.statPill}>
// //             <Text style={styles.statPillNum}>{visibleIncidents.length}</Text>
// //             <Text style={styles.statPillLabel}>Incidents</Text>
// //           </View>
// //           <View style={[styles.statPill, { marginLeft: 8 }]}>
// //             <Text style={[styles.statPillNum, { color: '#3B82F6' }]}>{visibleOfficers.length}</Text>
// //             <Text style={styles.statPillLabel}>Officers</Text>
// //           </View>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // }

// // // ─── Styles ───────────────────────────────────────────────────────────────────
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#0A0F1E',
// //   },

// //   // ── Recenter ────────────────────────────────────────────────────────────
// //   recenterBtn: {
// //     position: 'absolute',
// //     right: 16,
// //     bottom: 100,
// //     width: 50,
// //     height: 50,
// //     borderRadius: 25,
// //     backgroundColor: 'rgba(10,15,30,0.92)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     borderWidth: 1,
// //     borderColor: 'rgba(245,158,11,0.5)',
// //     zIndex: 200,
// //     elevation: 8,
// //     shadowColor: '#F59E0B',
// //     shadowOffset: { width: 0, height: 2 },
// //     shadowOpacity: 0.3,
// //     shadowRadius: 8,
// //     gap: 2,
// //   },
// //   recenterLabel: {
// //     color: '#F59E0B',
// //     fontSize: 7,
// //     fontWeight: '800',
// //     letterSpacing: 0.5,
// //   },
// //   liveCounterPill: {
// //     position: 'absolute',
// //     right: 16,
// //     bottom: 160,
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(10,15,30,0.92)',
// //     paddingHorizontal: 12,
// //     paddingVertical: 7,
// //     borderRadius: 20,
// //     borderWidth: 1,
// //     borderColor: 'rgba(239,68,68,0.4)',
// //     zIndex: 200,
// //     elevation: 6,
// //     gap: 6,
// //   },
// //   headerOverlay: {
// //     position: 'absolute',
// //     top: Platform.OS === 'android' ? 12 : 8,
// //     left: 0,
// //     right: 0,
// //     paddingHorizontal: 16,
// //     zIndex: 100,
// //   },
// //   topBar: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 10,
// //     gap: 10,
// //   },
// //   backBtn: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 10,
// //     backgroundColor: 'rgba(10,15,30,0.85)',
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.1)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   headerTitle: {
// //     flex: 1,
// //     backgroundColor: 'rgba(10,15,30,0.85)',
// //     borderRadius: 10,
// //     paddingHorizontal: 14,
// //     paddingVertical: 8,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   headerTitleText: {
// //     color: '#FFFFFF',
// //     fontSize: 11,
// //     fontWeight: '700',
// //     letterSpacing: 1.5,
// //   },
// //   livePill: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 5,
// //   },
// //   liveDot: {
// //     width: 7,
// //     height: 7,
// //     borderRadius: 4,
// //     backgroundColor: '#EF4444',
// //   },
// //   liveLabel: {
// //     color: '#EF4444',
// //     fontSize: 9,
// //     fontWeight: '700',
// //     letterSpacing: 0.5,
// //   },
// //   locationBadge: {
// //     backgroundColor: 'rgba(59,130,246,0.15)',
// //     borderRadius: 8,
// //     paddingHorizontal: 10,
// //     paddingVertical: 6,
// //     borderWidth: 1,
// //     borderColor: 'rgba(59,130,246,0.3)',
// //     maxWidth: 130,
// //   },
// //   locationBadgeText: {
// //     color: '#60A5FA',
// //     fontSize: 9,
// //     fontWeight: '700',
// //     letterSpacing: 0.8,
// //   },
// //   filtersScroll: {
// //     flexGrow: 0,
// //   },
// //   filtersContent: {
// //     paddingRight: 16,
// //     gap: 8,
// //   },
// //   chip: {
// //     paddingHorizontal: 14,
// //     paddingVertical: 7,
// //     borderRadius: 20,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.15)',
// //     backgroundColor: 'rgba(10,15,30,0.8)',
// //     marginRight: 8,
// //   },
// //   chipText: {
// //     fontSize: 10,
// //     fontWeight: '700',
// //     letterSpacing: 0.8,
// //   },
// //   banner: {
// //     position: 'absolute',
// //     top: Platform.OS === 'android' ? 130 : 145,
// //     alignSelf: 'center',
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     backgroundColor: 'rgba(10,15,30,0.92)',
// //     paddingHorizontal: 16,
// //     paddingVertical: 8,
// //     borderRadius: 20,
// //     borderWidth: 1,
// //     borderColor: 'rgba(245,158,11,0.3)',
// //     zIndex: 200,
// //   },
// //   bannerText: {
// //     color: '#F59E0B',
// //     fontSize: 12,
// //     fontWeight: '600',
// //   },
// //   popup: {
// //     position: 'absolute',
// //     bottom: 120,
// //     left: 16,
// //     right: 16,
// //     backgroundColor: '#0E1629',
// //     borderRadius: 16,
// //     padding: 18,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.1)',
// //     zIndex: 300,
// //     shadowColor: '#000',
// //     shadowOffset: { width: 0, height: 6 },
// //     shadowOpacity: 0.5,
// //     shadowRadius: 16,
// //     elevation: 10,
// //   },
// //   popupRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 10,
// //     marginBottom: 8,
// //   },
// //   popupBadge: {
// //     paddingHorizontal: 8,
// //     paddingVertical: 3,
// //     borderRadius: 4,
// //   },
// //   popupBadgeText: {
// //     fontSize: 10,
// //     fontWeight: '700',
// //     letterSpacing: 1,
// //   },
// //   popupCaseId: {
// //     color: '#6B7280',
// //     fontSize: 11,
// //     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
// //   },
// //   popupTitle: {
// //     color: '#FFFFFF',
// //     fontSize: 15,
// //     fontWeight: '700',
// //     marginBottom: 4,
// //   },
// //   popupSub: {
// //     color: '#9CA3AF',
// //     fontSize: 12,
// //     marginBottom: 14,
// //   },
// //   popupBtn: {
// //     paddingVertical: 10,
// //     borderRadius: 10,
// //     borderWidth: 1,
// //     alignItems: 'center',
// //   },
// //   popupBtnText: {
// //     fontSize: 12,
// //     fontWeight: '700',
// //     letterSpacing: 1,
// //   },
// //   popupClose: {
// //     position: 'absolute',
// //     top: 12,
// //     right: 14,
// //   },
// //   popupCloseText: {
// //     color: '#6B7280',
// //     fontSize: 16,
// //     fontWeight: '400',
// //   },
// //   bottomOverlay: {
// //     position: 'absolute',
// //     bottom: 16,
// //     left: 16,
// //     right: 16,
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'flex-end',
// //     zIndex: 100,
// //   },
// //   legendCard: {
// //     backgroundColor: 'rgba(10,15,30,0.88)',
// //     padding: 12,
// //     borderRadius: 12,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //   },
// //   legendTitle: {
// //     color: '#6B7280',
// //     fontSize: 9,
// //     fontWeight: '700',
// //     letterSpacing: 1.5,
// //     marginBottom: 8,
// //   },
// //   legendRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 5,
// //     gap: 8,
// //   },
// //   legendDot: {
// //     width: 8,
// //     height: 8,
// //     borderRadius: 4,
// //   },
// //   legendText: {
// //     color: '#D1D5DB',
// //     fontSize: 11,
// //     fontWeight: '500',
// //   },
// //   statsCards: {
// //     flexDirection: 'row',
// //   },
// //   statPill: {
// //     backgroundColor: 'rgba(10,15,30,0.88)',
// //     borderRadius: 12,
// //     paddingHorizontal: 16,
// //     paddingVertical: 10,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.08)',
// //     alignItems: 'center',
// //   },
// //   statPillNum: {
// //     color: '#EF4444',
// //     fontSize: 20,
// //     fontWeight: '800',
// //     fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
// //   },
// //   statPillLabel: {
// //     color: '#9CA3AF',
// //     fontSize: 10,
// //     fontWeight: '600',
// //     marginTop: 2,
// //   },

// //   // ── Officer distance list ────────────────────────────────────────────────
// //   officerDistList: {
// //     backgroundColor: 'rgba(255,255,255,0.04)',
// //     borderRadius: 10,
// //     padding: 10,
// //     marginBottom: 12,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.07)',
// //   },
// //   officerDistHeader: {
// //     color: '#6B7280',
// //     fontSize: 9,
// //     fontWeight: '700',
// //     letterSpacing: 1.5,
// //     marginBottom: 8,
// //   },
// //   officerDistRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 8,
// //     gap: 10,
// //   },
// //   officerDistBadge: {
// //     width: 26,
// //     height: 26,
// //     borderRadius: 13,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   officerDistInitials: {
// //     color: '#FFFFFF',
// //     fontSize: 10,
// //     fontWeight: '700',
// //   },
// //   officerDistName: {
// //     color: '#E5E7EB',
// //     fontSize: 12,
// //     fontWeight: '600',
// //     flex: 1,
// //   },
// //   officerDistMeta: {
// //     alignItems: 'flex-end',
// //     gap: 2,
// //   },
// //   officerDistKm: {
// //     color: '#9CA3AF',
// //     fontSize: 11,
// //     fontWeight: '600',
// //   },
// //   officerDistEta: {
// //     color: '#F59E0B',
// //     fontSize: 10,
// //     fontWeight: '700',
// //   },
// // });


// import * as Location from 'expo-location';
// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//   ActivityIndicator,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
// import Svg, { Path } from 'react-native-svg';
// import { AuthStorage } from '../utils/authStorage';

// // ─── CONFIG ───────────────────────────────────────────────────────────────────
// const API_BASE = 'http://10.170.172.21:5000';

// // ─── Default region (fallback) ────────────────────────────────────────────────
// const DEFAULT_REGION: Region = {
//   latitude: 9.0765,
//   longitude: 7.3986,
//   latitudeDelta: 0.0522,
//   longitudeDelta: 0.0221,
// };

// // ─── Filter config ─────────────────────────────────────────────────────────────
// const FILTERS = [
//   { id: 'all',      label: 'ALL',      color: '#FFFFFF' },
//   { id: 'incident', label: 'INCIDENTS', color: '#EF4444' },
//   { id: 'high',     label: 'HIGH RISK', color: '#EF4444' },
//   { id: 'medium',   label: 'MEDIUM',    color: '#F59E0B' },
//   { id: 'resolved', label: 'RESOLVED',  color: '#10B981' },
// ];

// // ─── Dark map style ────────────────────────────────────────────────────────────
// const DARK_MAP_STYLE = [
//   { elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
//   { elementType: 'labels.text.fill', stylers: [{ color: '#6B7280' }] },
//   { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1117' }] },
//   { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#1F2937' }] },
//   { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#9CA3AF' }] },
//   { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6B7280' }] },
//   { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#111827' }] },
//   { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1F2937' }] },
//   { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#4B5563' }] },
//   { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#374151' }] },
//   { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#1E3A5F' }] },
//   { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#60A5FA' }] },
//   { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#161F35' }] },
//   { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0A1628' }] },
//   { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#374151' }] },
// ];

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// function timeAgo(iso: string): string {
//   const diff = Date.now() - new Date(iso).getTime();
//   const mins = Math.floor(diff / 60_000);
//   if (mins < 1) return 'Just now';
//   if (mins < 60) return `${mins}m ago`;
//   const hrs = Math.floor(mins / 60);
//   if (hrs < 24) return `${hrs}h ago`;
//   return `${Math.floor(hrs / 24)}d ago`;
// }

// function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
//   const R = 6371;
//   const dLat = ((lat2 - lat1) * Math.PI) / 180;
//   const dLon = ((lon2 - lon1) * Math.PI) / 180;
//   const a =
//     Math.sin(dLat / 2) ** 2 +
//     Math.cos((lat1 * Math.PI) / 180) *
//       Math.cos((lat2 * Math.PI) / 180) *
//       Math.sin(dLon / 2) ** 2;
//   return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
// }

// function etaMinutes(km: number): number {
//   return Math.max(1, Math.round((km / 30) * 60));
// }

// function priorityFromUrgency(urgency: string): string {
//   if (urgency === 'critical' || urgency === 'high') return 'HIGH';
//   if (urgency === 'medium') return 'MEDIUM';
//   return 'LOW';
// }

// function getIncidentColor(report: any): string {
//   if (report.urgency === 'critical') return '#DC2626';
//   if (report.urgency === 'high') return '#EF4444';
//   if (report.urgency === 'medium') return '#F59E0B';
//   return '#F97316';
// }

// function getIncidentBgColor(report: any): string {
//   if (report.urgency === 'critical') return 'rgba(220,38,38,0.15)';
//   if (report.urgency === 'high') return 'rgba(239,68,68,0.15)';
//   if (report.urgency === 'medium') return 'rgba(245,158,11,0.15)';
//   return 'rgba(249,115,22,0.15)';
// }

// // ─── Incident Pin ──────────────────────────────────────────────────────────────
// function IncidentPin({ report }: { report: any }) {
//   const color = getIncidentColor(report);
//   const icon = report.urgency === 'critical' || report.urgency === 'high' ? '!' : '⚠';
  
//   return (
//     <View style={[pinStyles.incidentPin, { borderColor: color, backgroundColor: color + '22' }]}>
//       <View style={[pinStyles.incidentInner, { backgroundColor: color }]}>
//         <Text style={pinStyles.incidentText}>{icon}</Text>
//       </View>
//     </View>
//   );
// }

// // ─── Officer Pin ───────────────────────────────────────────────────────────────
// function OfficerPin({ initials, color }: { initials: string; color: string }) {
//   return (
//     <View style={pinStyles.officerPin}>
//       <View style={[pinStyles.officerInner, { backgroundColor: color }]}>
//         <Svg width="12" height="12" viewBox="0 0 24 24">
//           <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFFFFF" />
//         </Svg>
//       </View>
//       <Text style={[pinStyles.officerInitials, { color }]}>{initials}</Text>
//     </View>
//   );
// }

// const pinStyles = StyleSheet.create({
//   incidentPin: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     borderWidth: 2,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   incidentInner: {
//     width: 26,
//     height: 26,
//     borderRadius: 13,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   incidentText: {
//     color: '#FFFFFF',
//     fontWeight: '900',
//     fontSize: 13,
//   },
//   officerPin: {
//     alignItems: 'center',
//   },
//   officerInner: {
//     width: 32,
//     height: 32,
//     borderRadius: 16,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   officerInitials: {
//     fontSize: 9,
//     fontWeight: '700',
//     marginTop: 2,
//   },
// });

// // ─── Types ────────────────────────────────────────────────────────────────────
// interface BackendReport {
//   _id: string;
//   reporter: { name: string; _id: string } | null;
//   type: string;
//   category: string;
//   urgency: string;
//   description: string;
//   location?: { lat: number; lng: number; address: string };
//   status: string;
//   isAnonymous: boolean;
//   createdAt: string;
// }

// interface MapIncident {
//   id: string;
//   latitude: number;
//   longitude: number;
//   type: string;
//   priority: string;
//   title: string;
//   subtitle: string;
//   color: string;
//   bgColor: string;
//   time: string;
//   caseId: string;
//   status: string;
//   urgency: string;
//   description: string;
//   reporter: string;
//   address: string;
// }

// interface Officer {
//   id: string;
//   latitude: number;
//   longitude: number;
//   name: string;
//   initials: string;
//   status: string;
//   statusLabel: string;
//   color: string;
// }

// // ─── Mock officer positions (placeholder until real-time tracking is built) ────
// const MOCK_OFFICERS: Officer[] = [
//   { id: 'o1', latitude: 9.0800, longitude: 7.3965, name: 'Unit Alpha', initials: 'UA', status: 'on_scene', statusLabel: 'On Scene', color: '#3B82F6' },
//   { id: 'o2', latitude: 9.0730, longitude: 7.4000, name: 'Unit Bravo', initials: 'UB', status: 'patrol', statusLabel: 'Patrol', color: '#10B981' },
//   { id: 'o3', latitude: 9.0780, longitude: 7.3930, name: 'Unit Delta', initials: 'UD', status: 'standby', statusLabel: 'Standby', color: '#8B5CF6' },
// ];

// // ─── Props ─────────────────────────────────────────────────────────────────────
// interface Props {
//   onBack?: () => void;
// }

// // ─── Main Component ────────────────────────────────────────────────────────────
// export default function OfficerMapView({ onBack }: Props) {
//   const mapRef = useRef<MapView>(null);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [locationStatus, setLocationStatus] = useState<'loading' | 'granted' | 'denied' | 'idle'>('idle');
//   const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
//   const [locationName, setLocationName] = useState<string>('LOCATING…');
//   const [selectedItem, setSelectedItem] = useState<any>(null);
//   const [liveSeconds, setLiveSeconds] = useState(0);

//   // ── API Data State ─────────────────────────────────────────────────────────
//   const [incidents, setIncidents] = useState<MapIncident[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [token, setToken] = useState<string | null>(null);

//   // ── Get token ──────────────────────────────────────────────────────────────
//   useEffect(() => {
//     (async () => {
//       const t = await AuthStorage.getToken();
//       setToken(t);
//     })();
//   }, []);

//   // ── Fetch reports from backend ─────────────────────────────────────────────
//   const fetchReports = useCallback(async () => {
//     if (!token) return;
//     try {
//       setLoading(true);
//       const res = await fetch(API_BASE + '/api/security/reports', {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: 'Bearer ' + token,
//         },
//       });
//       if (!res.ok) throw new Error('Server error ' + res.status);
//       const data: BackendReport[] = await res.json();

//       // Filter to only reports with location
//       const withLocation = data.filter(
//         r => r.location && r.location.lat && r.location.lng && r.status !== 'resolved'
//       );

//       // Map to map pins
//       const pins: MapIncident[] = withLocation.map((r) => ({
//         id: r._id,
//         latitude: r.location!.lat,
//         longitude: r.location!.lng,
//         type: r.urgency === 'critical' || r.urgency === 'high' ? 'high' : r.urgency === 'medium' ? 'medium' : 'alert',
//         priority: priorityFromUrgency(r.urgency),
//         title: r.description ? r.description.slice(0, 50) + (r.description.length > 50 ? '…' : '') : (r.category || 'Incident'),
//         subtitle: r.location!.address || 'Unknown location',
//         color: getIncidentColor(r),
//         bgColor: getIncidentBgColor(r),
//         time: timeAgo(r.createdAt),
//         caseId: 'AGS-' + new Date(r.createdAt).getFullYear() + '-' + r._id.slice(-5).toUpperCase(),
//         status: r.status,
//         urgency: r.urgency,
//         description: r.description || '',
//         reporter: r.isAnonymous ? 'Anonymous' : (r.reporter?.name || 'Unknown'),
//         address: r.location!.address || 'Unknown location',
//       }));

//       setIncidents(pins);
//     } catch (err: any) {
//       console.error('Map fetch error:', err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   useEffect(() => {
//     if (token) fetchReports();
//   }, [token, fetchReports]);

//   // ── Location ────────────────────────────────────────────────────────────────
//   useEffect(() => {
//     let sub: Location.LocationSubscription | null = null;
//     (async () => {
//       setLocationStatus('loading');
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') { setLocationStatus('denied'); return; }
//       setLocationStatus('granted');
//       const initial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
//       setUserLocation(initial);
//       mapRef.current?.animateToRegion({
//         latitude: initial.coords.latitude,
//         longitude: initial.coords.longitude,
//         latitudeDelta: 0.0522,
//         longitudeDelta: 0.0221,
//       }, 800);

//       try {
//         const geo = await Location.reverseGeocodeAsync({
//           latitude: initial.coords.latitude,
//           longitude: initial.coords.longitude,
//         });
//         if (geo && geo.length > 0) {
//           const g = geo[0];
//           const name = g.district || g.subregion || g.city || g.region || 'Unknown';
//           setLocationName(name.toUpperCase());
//         }
//       } catch (_) {
//         setLocationName(initial.coords.latitude.toFixed(3) + ', ' + initial.coords.longitude.toFixed(3));
//       }

//       sub = await Location.watchPositionAsync(
//         { accuracy: Location.Accuracy.Balanced, distanceInterval: 15 },
//         (loc) => setUserLocation(loc),
//       );
//     })();
//     return () => { sub?.remove(); };
//   }, []);

//   // ── Live timer ──────────────────────────────────────────────────────────────
//   useEffect(() => {
//     const timer = setInterval(() => setLiveSeconds(s => (s + 1) % 60), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // ── Filter visible incidents ────────────────────────────────────────────────
//   const visibleIncidents = incidents.filter(inc => {
//     if (activeFilter === 'all' || activeFilter === 'incident') return true;
//     if (activeFilter === 'high') return inc.urgency === 'critical' || inc.urgency === 'high';
//     if (activeFilter === 'medium') return inc.urgency === 'medium';
//     if (activeFilter === 'resolved') return inc.status === 'resolved';
//     return false;
//   });

//   return (
//     <View style={styles.container}>
//       {/* Map */}
//       <MapView
//         ref={mapRef}
//         style={StyleSheet.absoluteFillObject}
//         provider={PROVIDER_DEFAULT}
//         initialRegion={DEFAULT_REGION}
//         customMapStyle={DARK_MAP_STYLE}
//         showsUserLocation={locationStatus === 'granted'}
//         showsMyLocationButton={false}
//         showsCompass={false}
//         showsBuildings={false}
//         onPress={() => setSelectedItem(null)}
//       >
//         {/* Incident markers */}
//         {visibleIncidents.map(inc => (
//           <Marker
//             key={inc.id}
//             coordinate={{ latitude: inc.latitude, longitude: inc.longitude }}
//             tracksViewChanges={false}
//             onPress={() => setSelectedItem({ ...inc, kind: 'incident' })}
//           >
//             <IncidentPin report={inc} />
//           </Marker>
//         ))}

//         {/* Officer markers (mock for now) */}
//         {MOCK_OFFICERS.map(off => (
//           <Marker
//             key={off.id}
//             coordinate={{ latitude: off.latitude, longitude: off.longitude }}
//             tracksViewChanges={false}
//             onPress={() => setSelectedItem({ ...off, kind: 'officer' })}
//           >
//             <OfficerPin initials={off.initials} color={off.color} />
//           </Marker>
//         ))}
//       </MapView>

//       {/* Header overlay */}
//       <View style={styles.headerOverlay} pointerEvents="box-none">
//         <View style={styles.topBar}>
//           {onBack && (
//             <TouchableOpacity style={styles.backBtn} onPress={onBack}>
//               <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                 <Path d="M19 12H5M12 19l-7-7 7-7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </Svg>
//             </TouchableOpacity>
//           )}
//           <View style={styles.headerTitle}>
//             <Text style={styles.headerTitleText}>LIVE INCIDENT MAP</Text>
//           </View>
//           <View style={styles.locationBadge}>
//             <Text style={styles.locationBadgeText} numberOfLines={1}>{locationName}</Text>
//           </View>
//         </View>

//         {/* Filter chips */}
//         <ScrollView
//           horizontal
//           showsHorizontalScrollIndicator={false}
//           style={styles.filtersScroll}
//           contentContainerStyle={styles.filtersContent}
//         >
//           {FILTERS.map(f => (
//             <TouchableOpacity
//               key={f.id}
//               style={[
//                 styles.chip,
//                 activeFilter === f.id && { backgroundColor: f.color, borderColor: f.color },
//               ]}
//               onPress={() => setActiveFilter(f.id)}
//             >
//               <Text
//                 style={[
//                   styles.chipText,
//                   { color: f.color },
//                   activeFilter === f.id && { color: '#0A0F1E' },
//                 ]}
//               >
//                 {f.label}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Loading banner */}
//       {loading && (
//         <View style={styles.banner}>
//           <ActivityIndicator size="small" color="#F59E0B" style={{ marginRight: 8 }} />
//           <Text style={styles.bannerText}>Loading incidents…</Text>
//         </View>
//       )}

//       {locationStatus === 'loading' && (
//         <View style={styles.banner}>
//           <ActivityIndicator size="small" color="#F59E0B" style={{ marginRight: 8 }} />
//           <Text style={styles.bannerText}>Acquiring location…</Text>
//         </View>
//       )}

//       {/* Selected item popup */}
//       {selectedItem && (
//         <View style={styles.popup}>
//           {selectedItem.kind === 'incident' ? (
//             <>
//               <View style={styles.popupRow}>
//                 <View style={[styles.popupBadge, { backgroundColor: selectedItem.bgColor }]}>
//                   <Text style={[styles.popupBadgeText, { color: selectedItem.color }]}>
//                     {selectedItem.priority}
//                   </Text>
//                 </View>
//                 <Text style={styles.popupCaseId}>#{selectedItem.caseId}</Text>
//               </View>
//               <Text style={styles.popupTitle}>{selectedItem.title}</Text>
//               <Text style={styles.popupSub}>{selectedItem.subtitle} · {selectedItem.time}</Text>
//               <Text style={styles.popupSub}>Reporter: {selectedItem.reporter}</Text>
//               <Text style={styles.popupSub}>Status: {selectedItem.status.toUpperCase()}</Text>

//               <TouchableOpacity
//                 style={[styles.popupBtn, { backgroundColor: selectedItem.bgColor, borderColor: selectedItem.color }]}
//                 onPress={() => setSelectedItem(null)}
//               >
//                 <Text style={[styles.popupBtnText, { color: selectedItem.color }]}>VIEW DETAILS →</Text>
//               </TouchableOpacity>
//             </>
//           ) : (
//             <>
//               <Text style={styles.popupTitle}>{selectedItem.name}</Text>
//               <View style={[styles.popupBadge, { backgroundColor: selectedItem.color + '22', marginBottom: 8 }]}>
//                 <Text style={[styles.popupBadgeText, { color: selectedItem.color }]}>
//                   {selectedItem.statusLabel.toUpperCase()}
//                 </Text>
//               </View>
//               <TouchableOpacity
//                 style={[styles.popupBtn, { backgroundColor: 'rgba(59,130,246,0.1)', borderColor: '#3B82F6' }]}
//                 onPress={() => setSelectedItem(null)}
//               >
//                 <Text style={[styles.popupBtnText, { color: '#3B82F6' }]}>DISPATCH →</Text>
//               </TouchableOpacity>
//             </>
//           )}
//           <TouchableOpacity style={styles.popupClose} onPress={() => setSelectedItem(null)}>
//             <Text style={styles.popupCloseText}>✕</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Recenter button */}
//       <TouchableOpacity
//         style={styles.recenterBtn}
//         activeOpacity={0.8}
//         onPress={() => {
//           if (userLocation) {
//             mapRef.current?.animateToRegion({
//               latitude: userLocation.coords.latitude,
//               longitude: userLocation.coords.longitude,
//               latitudeDelta: 0.0522,
//               longitudeDelta: 0.0221,
//             }, 700);
//           }
//         }}
//       >
//         <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
//           <Path
//             d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
//             fill="#F59E0B"
//           />
//         </Svg>
//         <Text style={styles.recenterLabel}>ME</Text>
//       </TouchableOpacity>

//       {/* Live counter */}
//       <View style={styles.liveCounterPill} pointerEvents="none">
//         <View style={styles.liveDot} />
//         <Text style={styles.liveLabel}>LIVE · {liveSeconds}s</Text>
//       </View>

//       {/* Bottom stats overlay */}
//       <View style={styles.bottomOverlay} pointerEvents="box-none">
//         <View style={styles.legendCard}>
//           <Text style={styles.legendTitle}>LEGEND</Text>
//           <View style={styles.legendRow}>
//             <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
//             <Text style={styles.legendText}>Incident</Text>
//           </View>
//           <View style={styles.legendRow}>
//             <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
//             <Text style={styles.legendText}>Officer</Text>
//           </View>
//           <View style={styles.legendRow}>
//             <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
//             <Text style={styles.legendText}>Medium</Text>
//           </View>
//         </View>

//         <View style={styles.statsCards}>
//           <View style={styles.statPill}>
//             <Text style={styles.statPillNum}>{visibleIncidents.length}</Text>
//             <Text style={styles.statPillLabel}>Incidents</Text>
//           </View>
//           <View style={[styles.statPill, { marginLeft: 8 }]}>
//             <Text style={[styles.statPillNum, { color: '#3B82F6' }]}>{MOCK_OFFICERS.length}</Text>
//             <Text style={styles.statPillLabel}>Officers</Text>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0A0F1E',
//   },
//   recenterBtn: {
//     position: 'absolute',
//     right: 16,
//     bottom: 100,
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     backgroundColor: 'rgba(10,15,30,0.92)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: 'rgba(245,158,11,0.5)',
//     zIndex: 200,
//     elevation: 8,
//     shadowColor: '#F59E0B',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     gap: 2,
//   },
//   recenterLabel: {
//     color: '#F59E0B',
//     fontSize: 7,
//     fontWeight: '800',
//     letterSpacing: 0.5,
//   },
//   liveCounterPill: {
//     position: 'absolute',
//     right: 16,
//     bottom: 160,
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(10,15,30,0.92)',
//     paddingHorizontal: 12,
//     paddingVertical: 7,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(239,68,68,0.4)',
//     zIndex: 200,
//     elevation: 6,
//     gap: 6,
//   },
//   headerOverlay: {
//     position: 'absolute',
//     top: Platform.OS === 'android' ? 12 : 8,
//     left: 0,
//     right: 0,
//     paddingHorizontal: 16,
//     zIndex: 100,
//   },
//   topBar: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//     gap: 10,
//   },
//   backBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: 'rgba(10,15,30,0.85)',
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerTitle: {
//     flex: 1,
//     backgroundColor: 'rgba(10,15,30,0.85)',
//     borderRadius: 10,
//     paddingHorizontal: 14,
//     paddingVertical: 8,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   headerTitleText: {
//     color: '#FFFFFF',
//     fontSize: 11,
//     fontWeight: '700',
//     letterSpacing: 1.5,
//   },
//   livePill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 5,
//   },
//   liveDot: {
//     width: 7,
//     height: 7,
//     borderRadius: 4,
//     backgroundColor: '#EF4444',
//   },
//   liveLabel: {
//     color: '#EF4444',
//     fontSize: 9,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },
//   locationBadge: {
//     backgroundColor: 'rgba(59,130,246,0.15)',
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderWidth: 1,
//     borderColor: 'rgba(59,130,246,0.3)',
//     maxWidth: 130,
//   },
//   locationBadgeText: {
//     color: '#60A5FA',
//     fontSize: 9,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },
//   filtersScroll: {
//     flexGrow: 0,
//   },
//   filtersContent: {
//     paddingRight: 16,
//     gap: 8,
//   },
//   chip: {
//     paddingHorizontal: 14,
//     paddingVertical: 7,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.15)',
//     backgroundColor: 'rgba(10,15,30,0.8)',
//     marginRight: 8,
//   },
//   chipText: {
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 0.8,
//   },
//   banner: {
//     position: 'absolute',
//     top: Platform.OS === 'android' ? 130 : 145,
//     alignSelf: 'center',
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(10,15,30,0.92)',
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 20,
//     borderWidth: 1,
//     borderColor: 'rgba(245,158,11,0.3)',
//     zIndex: 200,
//   },
//   bannerText: {
//     color: '#F59E0B',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   popup: {
//     position: 'absolute',
//     bottom: 120,
//     left: 16,
//     right: 16,
//     backgroundColor: '#0E1629',
//     borderRadius: 16,
//     padding: 18,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.1)',
//     zIndex: 300,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 6 },
//     shadowOpacity: 0.5,
//     shadowRadius: 16,
//     elevation: 10,
//   },
//   popupRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 10,
//     marginBottom: 8,
//   },
//   popupBadge: {
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//     borderRadius: 4,
//   },
//   popupBadgeText: {
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1,
//   },
//   popupCaseId: {
//     color: '#6B7280',
//     fontSize: 11,
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//   },
//   popupTitle: {
//     color: '#FFFFFF',
//     fontSize: 15,
//     fontWeight: '700',
//     marginBottom: 4,
//   },
//   popupSub: {
//     color: '#9CA3AF',
//     fontSize: 12,
//     marginBottom: 4,
//   },
//   popupBtn: {
//     paddingVertical: 10,
//     borderRadius: 10,
//     borderWidth: 1,
//     alignItems: 'center',
//     marginTop: 8,
//   },
//   popupBtnText: {
//     fontSize: 12,
//     fontWeight: '700',
//     letterSpacing: 1,
//   },
//   popupClose: {
//     position: 'absolute',
//     top: 12,
//     right: 14,
//   },
//   popupCloseText: {
//     color: '#6B7280',
//     fontSize: 16,
//     fontWeight: '400',
//   },
//   bottomOverlay: {
//     position: 'absolute',
//     bottom: 16,
//     left: 16,
//     right: 16,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-end',
//     zIndex: 100,
//   },
//   legendCard: {
//     backgroundColor: 'rgba(10,15,30,0.88)',
//     padding: 12,
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//   },
//   legendTitle: {
//     color: '#6B7280',
//     fontSize: 9,
//     fontWeight: '700',
//     letterSpacing: 1.5,
//     marginBottom: 8,
//   },
//   legendRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//     gap: 8,
//   },
//   legendDot: {
//     width: 8,
//     height: 8,
//     borderRadius: 4,
//   },
//   legendText: {
//     color: '#D1D5DB',
//     fontSize: 11,
//     fontWeight: '500',
//   },
//   statsCards: {
//     flexDirection: 'row',
//   },
//   statPill: {
//     backgroundColor: 'rgba(10,15,30,0.88)',
//     borderRadius: 12,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.08)',
//     alignItems: 'center',
//   },
//   statPillNum: {
//     color: '#EF4444',
//     fontSize: 20,
//     fontWeight: '800',
//     fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
//   },
//   statPillLabel: {
//     color: '#9CA3AF',
//     fontSize: 10,
//     fontWeight: '600',
//     marginTop: 2,
//   },
// });

import * as Location from 'expo-location';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import Svg, { Path } from 'react-native-svg';
import { AuthStorage } from '../utils/authStorage';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = 'http://10.170.172.21:5000';

// ─── Default region (fallback) ────────────────────────────────────────────────
const DEFAULT_REGION: Region = {
  latitude: 9.0765,
  longitude: 7.3986,
  latitudeDelta: 0.0522,
  longitudeDelta: 0.0221,
};

// ─── Filter config ─────────────────────────────────────────────────────────────
const FILTERS = [
  { id: 'all',      label: 'ALL',      color: '#FFFFFF' },
  { id: 'incident', label: 'INCIDENTS', color: '#EF4444' },
  { id: 'high',     label: 'HIGH RISK', color: '#EF4444' },
  { id: 'medium',   label: 'MEDIUM',    color: '#F59E0B' },
  { id: 'resolved', label: 'RESOLVED',  color: '#10B981' },
];

// ─── Dark map style ────────────────────────────────────────────────────────────
const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#0d1117' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6B7280' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#0d1117' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#1F2937' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#9CA3AF' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#6B7280' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#111827' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#1F2937' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#4B5563' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#374151' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#1E3A5F' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#60A5FA' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#161F35' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0A1628' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#374151' }] },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function etaMinutes(km: number): number {
  return Math.max(1, Math.round((km / 30) * 60));
}

function priorityFromUrgency(urgency: string): string {
  if (urgency === 'critical' || urgency === 'high') return 'HIGH';
  if (urgency === 'medium') return 'MEDIUM';
  return 'LOW';
}

function getIncidentColor(report: any): string {
  if (report.urgency === 'critical') return '#DC2626';
  if (report.urgency === 'high') return '#EF4444';
  if (report.urgency === 'medium') return '#F59E0B';
  return '#F97316';
}

function getIncidentBgColor(report: any): string {
  if (report.urgency === 'critical') return 'rgba(220,38,38,0.15)';
  if (report.urgency === 'high') return 'rgba(239,68,68,0.15)';
  if (report.urgency === 'medium') return 'rgba(245,158,11,0.15)';
  return 'rgba(249,115,22,0.15)';
}

// ─── Incident Pin ──────────────────────────────────────────────────────────────
function IncidentPin({ report }: { report: any }) {
  const color = getIncidentColor(report);
  const icon = report.urgency === 'critical' || report.urgency === 'high' ? '!' : '⚠';
  
  return (
    <View style={[pinStyles.incidentPin, { borderColor: color, backgroundColor: color + '22' }]}>
      <View style={[pinStyles.incidentInner, { backgroundColor: color }]}>
        <Text style={pinStyles.incidentText}>{icon}</Text>
      </View>
    </View>
  );
}

// ─── Officer Pin ───────────────────────────────────────────────────────────────
function OfficerPin({ initials, color }: { initials: string; color: string }) {
  return (
    <View style={pinStyles.officerPin}>
      <View style={[pinStyles.officerInner, { backgroundColor: color }]}>
        <Svg width="12" height="12" viewBox="0 0 24 24">
          <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#FFFFFF" />
        </Svg>
      </View>
      <Text style={[pinStyles.officerInitials, { color }]}>{initials}</Text>
    </View>
  );
}

const pinStyles = StyleSheet.create({
  incidentPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incidentInner: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  incidentText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 13,
  },
  officerPin: {
    alignItems: 'center',
  },
  officerInner: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  officerInitials: {
    fontSize: 9,
    fontWeight: '700',
    marginTop: 2,
  },
});

// ─── Mock officer positions (placeholder until real-time tracking is built) ────
const MOCK_OFFICERS = [
  { id: 'o1', latitude: 9.0800, longitude: 7.3965, name: 'Unit Alpha', initials: 'UA', status: 'on_scene', statusLabel: 'On Scene', color: '#3B82F6' },
  { id: 'o2', latitude: 9.0730, longitude: 7.4000, name: 'Unit Bravo', initials: 'UB', status: 'patrol', statusLabel: 'Patrol', color: '#10B981' },
  { id: 'o3', latitude: 9.0780, longitude: 7.3930, name: 'Unit Delta', initials: 'UD', status: 'standby', statusLabel: 'Standby', color: '#8B5CF6' },
];

// ─── Props ─────────────────────────────────────────────────────────────────────
interface Props {
  onBack?: () => void;
}

// ─── Main Component ────────────────────────────────────────────────────────────
export default function OfficerMapView({ onBack }: Props) {
  const mapRef = useRef<MapView>(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [locationStatus, setLocationStatus] = useState<'loading' | 'granted' | 'denied' | 'idle'>('idle');
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationName, setLocationName] = useState<string>('LOCATING…');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [liveSeconds, setLiveSeconds] = useState(0);

  // ── API Data State ─────────────────────────────────────────────────────────
  const [incidents, setIncidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // ── Get token ──────────────────────────────────────────────────────────────
  useEffect(() => {
    (async () => {
      const t = await AuthStorage.getToken();
      setToken(t);
    })();
  }, []);

  // ── Fetch reports from backend ─────────────────────────────────────────────
  const fetchReports = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(API_BASE + '/api/security/reports', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
      if (!res.ok) throw new Error('Server error ' + res.status);
      const data: any[] = await res.json();

      // Filter to only reports with location (exclude resolved)
      const withLocation = data.filter(
        (r: any) => r.location && r.location.lat && r.location.lng && r.status !== 'resolved'
      );

      // Map to map pins
      const pins = withLocation.map((r: any) => ({
        id: r._id,
        latitude: r.location.lat,
        longitude: r.location.lng,
        type: r.urgency === 'critical' || r.urgency === 'high' ? 'high' : r.urgency === 'medium' ? 'medium' : 'alert',
        priority: priorityFromUrgency(r.urgency),
        title: r.description ? r.description.slice(0, 50) + (r.description.length > 50 ? '…' : '') : (r.category || 'Incident'),
        subtitle: r.location.address || 'Unknown location',
        color: getIncidentColor(r),
        bgColor: getIncidentBgColor(r),
        time: timeAgo(r.createdAt),
        caseId: 'AGS-' + new Date(r.createdAt).getFullYear() + '-' + r._id.slice(-5).toUpperCase(),
        status: r.status,
        urgency: r.urgency,
        description: r.description || '',
        reporter: r.isAnonymous ? 'Anonymous' : (r.reporter?.name || 'Unknown'),
        address: r.location.address || 'Unknown location',
      }));

      setIncidents(pins);

      // ── Auto-fit map to show all pins ──────────────────────────────────────
      if (pins.length > 0 && mapRef.current) {
        const latitudes = pins.map((p: any) => p.latitude);
        const longitudes = pins.map((p: any) => p.longitude);
        const minLat = Math.min(...latitudes);
        const maxLat = Math.max(...latitudes);
        const minLng = Math.min(...longitudes);
        const maxLng = Math.max(...longitudes);

        const midLat = (minLat + maxLat) / 2;
        const midLng = (minLng + maxLng) / 2;
        const deltaLat = Math.max((maxLat - minLat) * 1.5, 0.05);
        const deltaLng = Math.max((maxLng - minLng) * 1.5, 0.05);

        mapRef.current.animateToRegion({
          latitude: midLat,
          longitude: midLng,
          latitudeDelta: deltaLat,
          longitudeDelta: deltaLng,
        }, 1000);
      }
    } catch (err: any) {
      console.error('Map fetch error:', err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchReports();
  }, [token, fetchReports]);

  // ── Location ────────────────────────────────────────────────────────────────
  useEffect(() => {
    let sub: Location.LocationSubscription | null = null;
    (async () => {
      setLocationStatus('loading');
      const result = await Location.requestForegroundPermissionsAsync();
      if (result.status !== 'granted') {
        setLocationStatus('denied');
        return;
      }
      setLocationStatus('granted');
      const initial = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setUserLocation(initial);

      // Only animate to user location if there are no incidents to show
      if (incidents.length === 0) {
        mapRef.current?.animateToRegion({
          latitude: initial.coords.latitude,
          longitude: initial.coords.longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0221,
        }, 800);
      }

      try {
        const geo = await Location.reverseGeocodeAsync({
          latitude: initial.coords.latitude,
          longitude: initial.coords.longitude,
        });
        if (geo && geo.length > 0) {
          const g = geo[0];
          const name = g.district || g.subregion || g.city || g.region || 'Unknown';
          setLocationName(name.toUpperCase());
        }
      } catch (_) {
        setLocationName(initial.coords.latitude.toFixed(3) + ', ' + initial.coords.longitude.toFixed(3));
      }

      sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, distanceInterval: 15 },
        (loc) => setUserLocation(loc),
      );
    })();
    return () => { sub?.remove(); };
  }, []);

  // ── Live timer ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => setLiveSeconds(s => (s + 1) % 60), 1000);
    return () => clearInterval(timer);
  }, []);

  // ── Filter visible incidents ────────────────────────────────────────────────
  const visibleIncidents = incidents.filter((inc: any) => {
    if (activeFilter === 'all' || activeFilter === 'incident') return true;
    if (activeFilter === 'high') return inc.urgency === 'critical' || inc.urgency === 'high';
    if (activeFilter === 'medium') return inc.urgency === 'medium';
    if (activeFilter === 'resolved') return inc.status === 'resolved';
    return false;
  });

  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_DEFAULT}
        initialRegion={DEFAULT_REGION}
        customMapStyle={DARK_MAP_STYLE}
        showsUserLocation={locationStatus === 'granted'}
        showsMyLocationButton={false}
        showsCompass={false}
        showsBuildings={false}
        onPress={() => setSelectedItem(null)}
      >
        {/* Incident markers */}
        {visibleIncidents.map((inc: any) => (
          <Marker
            key={inc.id}
            coordinate={{ latitude: inc.latitude, longitude: inc.longitude }}
            tracksViewChanges={false}
            onPress={() => setSelectedItem({ ...inc, kind: 'incident' })}
          >
            <IncidentPin report={inc} />
          </Marker>
        ))}

        {/* Officer markers (mock for now) */}
        {MOCK_OFFICERS.map((off: any) => (
          <Marker
            key={off.id}
            coordinate={{ latitude: off.latitude, longitude: off.longitude }}
            tracksViewChanges={false}
            onPress={() => setSelectedItem({ ...off, kind: 'officer' })}
          >
            <OfficerPin initials={off.initials} color={off.color} />
          </Marker>
        ))}
      </MapView>

      {/* Header overlay */}
      <View style={styles.headerOverlay} pointerEvents="box-none">
        <View style={styles.topBar}>
          {onBack && (
            <TouchableOpacity style={styles.backBtn} onPress={onBack}>
              <Svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <Path d="M19 12H5M12 19l-7-7 7-7" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </Svg>
            </TouchableOpacity>
          )}
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>LIVE INCIDENT MAP</Text>
          </View>
          <View style={styles.locationBadge}>
            <Text style={styles.locationBadgeText} numberOfLines={1}>{locationName}</Text>
          </View>
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
          contentContainerStyle={styles.filtersContent}
        >
          {FILTERS.map((f: any) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.chip,
                activeFilter === f.id && { backgroundColor: f.color, borderColor: f.color },
              ]}
              onPress={() => setActiveFilter(f.id)}
            >
              <Text
                style={[
                  styles.chipText,
                  { color: f.color },
                  activeFilter === f.id && { color: '#0A0F1E' },
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Loading banner */}
      {loading && (
        <View style={styles.banner}>
          <ActivityIndicator size="small" color="#F59E0B" style={{ marginRight: 8 }} />
          <Text style={styles.bannerText}>Loading incidents…</Text>
        </View>
      )}

      {locationStatus === 'loading' && !loading && (
        <View style={styles.banner}>
          <ActivityIndicator size="small" color="#F59E0B" style={{ marginRight: 8 }} />
          <Text style={styles.bannerText}>Acquiring location…</Text>
        </View>
      )}

      {/* Selected item popup */}
      {selectedItem && (
        <View style={styles.popup}>
          {selectedItem.kind === 'incident' ? (
            <>
              <View style={styles.popupRow}>
                <View style={[styles.popupBadge, { backgroundColor: selectedItem.bgColor }]}>
                  <Text style={[styles.popupBadgeText, { color: selectedItem.color }]}>
                    {selectedItem.priority}
                  </Text>
                </View>
                <Text style={styles.popupCaseId}>#{selectedItem.caseId}</Text>
              </View>
              <Text style={styles.popupTitle}>{selectedItem.title}</Text>
              <Text style={styles.popupSub}>{selectedItem.subtitle} · {selectedItem.time}</Text>
              <Text style={styles.popupSub}>Reporter: {selectedItem.reporter}</Text>
              <Text style={styles.popupSub}>Status: {selectedItem.status.toUpperCase()}</Text>

              {/* Nearest officers distance */}
              {MOCK_OFFICERS.length > 0 && (
                <View style={styles.officerDistList}>
                  <Text style={styles.officerDistHeader}>NEAREST OFFICERS</Text>
                  {MOCK_OFFICERS
                    .map((off: any) => ({
                      ...off,
                      km: haversineKm(selectedItem.latitude, selectedItem.longitude, off.latitude, off.longitude),
                    }))
                    .sort((a: any, b: any) => a.km - b.km)
                    .map((off: any) => (
                      <View key={off.id} style={styles.officerDistRow}>
                        <View style={[styles.officerDistBadge, { backgroundColor: off.color }]}>
                          <Text style={styles.officerDistInitials}>{off.initials}</Text>
                        </View>
                        <Text style={styles.officerDistName}>{off.name}</Text>
                        <View style={styles.officerDistMeta}>
                          <Text style={styles.officerDistKm}>{off.km < 1 ? Math.round(off.km * 1000) + ' m' : off.km.toFixed(1) + ' km'}</Text>
                          <Text style={styles.officerDistEta}>~{etaMinutes(off.km)} min</Text>
                        </View>
                      </View>
                    ))
                  }
                </View>
              )}

              <TouchableOpacity
                style={[styles.popupBtn, { backgroundColor: selectedItem.bgColor, borderColor: selectedItem.color }]}
                onPress={() => setSelectedItem(null)}
              >
                <Text style={[styles.popupBtnText, { color: selectedItem.color }]}>VIEW DETAILS →</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.popupTitle}>{selectedItem.name}</Text>
              <View style={[styles.popupBadge, { backgroundColor: selectedItem.color + '22', marginBottom: 8 }]}>
                <Text style={[styles.popupBadgeText, { color: selectedItem.color }]}>
                  {selectedItem.statusLabel.toUpperCase()}
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.popupBtn, { backgroundColor: 'rgba(59,130,246,0.1)', borderColor: '#3B82F6' }]}
                onPress={() => setSelectedItem(null)}
              >
                <Text style={[styles.popupBtnText, { color: '#3B82F6' }]}>DISPATCH →</Text>
              </TouchableOpacity>
            </>
          )}
          <TouchableOpacity style={styles.popupClose} onPress={() => setSelectedItem(null)}>
            <Text style={styles.popupCloseText}>✕</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Recenter button */}
      <TouchableOpacity
        style={styles.recenterBtn}
        activeOpacity={0.8}
        onPress={() => {
          if (userLocation) {
            mapRef.current?.animateToRegion({
              latitude: userLocation.coords.latitude,
              longitude: userLocation.coords.longitude,
              latitudeDelta: 0.0522,
              longitudeDelta: 0.0221,
            }, 700);
          } else {
            mapRef.current?.animateToRegion(DEFAULT_REGION, 700);
          }
        }}
      >
        <Svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <Path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
            fill="#F59E0B"
          />
        </Svg>
        <Text style={styles.recenterLabel}>ME</Text>
      </TouchableOpacity>

      {/* Live counter */}
      <View style={styles.liveCounterPill} pointerEvents="none">
        <View style={styles.liveDot} />
        <Text style={styles.liveLabel}>LIVE · {liveSeconds}s</Text>
      </View>

      {/* Bottom stats overlay */}
      <View style={styles.bottomOverlay} pointerEvents="box-none">
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>LEGEND</Text>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
            <Text style={styles.legendText}>Incident</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: '#3B82F6' }]} />
            <Text style={styles.legendText}>Officer</Text>
          </View>
          <View style={styles.legendRow}>
            <View style={[styles.legendDot, { backgroundColor: '#F59E0B' }]} />
            <Text style={styles.legendText}>Medium</Text>
          </View>
        </View>

        <View style={styles.statsCards}>
          <View style={styles.statPill}>
            <Text style={styles.statPillNum}>{visibleIncidents.length}</Text>
            <Text style={styles.statPillLabel}>Incidents</Text>
          </View>
          <View style={[styles.statPill, { marginLeft: 8 }]}>
            <Text style={[styles.statPillNum, { color: '#3B82F6' }]}>{MOCK_OFFICERS.length}</Text>
            <Text style={styles.statPillLabel}>Officers</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1E',
  },
  recenterBtn: {
    position: 'absolute',
    right: 16,
    bottom: 100,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(10,15,30,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.5)',
    zIndex: 200,
    elevation: 8,
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    gap: 2,
  },
  recenterLabel: {
    color: '#F59E0B',
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  liveCounterPill: {
    position: 'absolute',
    right: 16,
    bottom: 160,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10,15,30,0.92)',
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(239,68,68,0.4)',
    zIndex: 200,
    elevation: 6,
    gap: 6,
  },
  headerOverlay: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 12 : 8,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 100,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(10,15,30,0.85)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    backgroundColor: 'rgba(10,15,30,0.85)',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitleText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  livePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#EF4444',
  },
  liveLabel: {
    color: '#EF4444',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  locationBadge: {
    backgroundColor: 'rgba(59,130,246,0.15)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(59,130,246,0.3)',
    maxWidth: 130,
  },
  locationBadgeText: {
    color: '#60A5FA',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  filtersScroll: {
    flexGrow: 0,
  },
  filtersContent: {
    paddingRight: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    backgroundColor: 'rgba(10,15,30,0.8)',
    marginRight: 8,
  },
  chipText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  banner: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 130 : 145,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(10,15,30,0.92)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(245,158,11,0.3)',
    zIndex: 200,
  },
  bannerText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
  },
  popup: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    right: 16,
    backgroundColor: '#0E1629',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    zIndex: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
  popupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  popupBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  popupBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  popupCaseId: {
    color: '#6B7280',
    fontSize: 11,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  popupTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 4,
  },
  popupSub: {
    color: '#9CA3AF',
    fontSize: 12,
    marginBottom: 4,
  },
  popupBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
    marginTop: 8,
  },
  popupBtnText: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  popupClose: {
    position: 'absolute',
    top: 12,
    right: 14,
  },
  popupCloseText: {
    color: '#6B7280',
    fontSize: 16,
    fontWeight: '400',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 100,
  },
  legendCard: {
    backgroundColor: 'rgba(10,15,30,0.88)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  legendTitle: {
    color: '#6B7280',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    gap: 8,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    color: '#D1D5DB',
    fontSize: 11,
    fontWeight: '500',
  },
  statsCards: {
    flexDirection: 'row',
  },
  statPill: {
    backgroundColor: 'rgba(10,15,30,0.88)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    alignItems: 'center',
  },
  statPillNum: {
    color: '#EF4444',
    fontSize: 20,
    fontWeight: '800',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  statPillLabel: {
    color: '#9CA3AF',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },

  // ── Officer distance list ────────────────────────────────────────────────
  officerDistList: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
  },
  officerDistHeader: {
    color: '#6B7280',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  officerDistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  officerDistBadge: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  officerDistInitials: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  officerDistName: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '600',
    flex: 1,
  },
  officerDistMeta: {
    alignItems: 'flex-end',
    gap: 2,
  },
  officerDistKm: {
    color: '#9CA3AF',
    fontSize: 11,
    fontWeight: '600',
  },
  officerDistEta: {
    color: '#F59E0B',
    fontSize: 10,
    fontWeight: '700',
  },
});