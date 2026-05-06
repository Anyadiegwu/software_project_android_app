// // import React from 'react';
// // import {
// //   Alert,
// //   Platform,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { useRouter } from 'expo-router';

// // // ─── Types ────────────────────────────────────────────────────────────────────
// // type Attendee = { initials: string; color: string };

// // // ─── Avatar Stack ─────────────────────────────────────────────────────────────
// // function AvatarStack({ attendees }: { attendees: Attendee[] }) {
// //   return (
// //     <View style={styles.avatarStack}>
// //       {attendees.map((a, i) => (
// //         <View
// //           key={i}
// //           style={[
// //             styles.avatar,
// //             { backgroundColor: a.color, marginLeft: i === 0 ? 0 : -8, zIndex: attendees.length - i },
// //           ]}
// //         >
// //           <Text style={styles.avatarText}>{a.initials}</Text>
// //         </View>
// //       ))}
// //     </View>
// //   );
// // }

// // // ─── Upcoming Event Card ──────────────────────────────────────────────────────
// // function UpcomingCard({
// //   timing,
// //   title,
// //   location,
// //   date,
// //   description,
// //   attendees,
// //   actionLabel,
// //   onAction,
// // }: {
// //   timing: string;
// //   title: string;
// //   location: string;
// //   date: string;
// //   description: string;
// //   attendees: Attendee[];
// //   actionLabel: string;
// //   onAction: () => void;
// // }) {
// //   return (
// //     <View style={styles.card}>
// //       <Text style={styles.cardTiming}>{timing}</Text>
// //       <Text style={styles.cardTitle}>{title}</Text>

// //       <View style={styles.cardMeta}>
// //         <Text style={styles.cardMetaText}>📍 {location}</Text>
// //         <Text style={styles.cardMetaDot}>·</Text>
// //         <Text style={styles.cardMetaText}>📅 {date}</Text>
// //       </View>

// //       <Text style={styles.cardDesc}>{description}</Text>

// //       <View style={styles.cardFooter}>
// //         <AvatarStack attendees={attendees} />
// //         <TouchableOpacity onPress={onAction}>
// //           <Text style={styles.cardAction}>{actionLabel} →</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </View>
// //   );
// // }

// // // ─── Past Town Hall Row ───────────────────────────────────────────────────────
// // function PastRow({ title, date, attendees }: { title: string; date: string; attendees: string }) {
// //   return (
// //     <View style={styles.pastRow}>
// //       <View style={styles.pastDot} />
// //       <View style={styles.pastInfo}>
// //         <Text style={styles.pastTitle}>{title}</Text>
// //         <Text style={styles.pastMeta}>{date} · {attendees}</Text>
// //       </View>
// //       <View style={styles.summaryBadge}>
// //         <Text style={styles.summaryBadgeText}>SUMMARY</Text>
// //       </View>
// //     </View>
// //   );
// // }

// // // ─── Screen ───────────────────────────────────────────────────────────────────
// // export default function TownHallsScreen() {
// //   const router = useRouter();

// //   const rsvp = () =>
// //     Alert.alert('RSVP', 'You have been registered for this Town Hall!', [{ text: 'Great!' }]);

// //   const register = () =>
// //     Alert.alert('Register', 'You have been registered for this event!', [{ text: 'Got it' }]);

// //   const viewArchive = () =>
// //     Alert.alert('Archive', 'Full archive coming soon.');

// //   return (
// //     <SafeAreaView style={styles.root}>
// //       {/* ── Header ── */}
// //       <View style={styles.header}>
// //         <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
// //           <Text style={styles.backIcon}>‹</Text>
// //         </TouchableOpacity>
// //         <Text style={styles.headerTitle}>TOWN HALLS</Text>
// //         <View style={{ width: 36 }} />
// //       </View>

// //       <ScrollView
// //         contentContainerStyle={styles.scroll}
// //         showsVerticalScrollIndicator={false}
// //       >
// //         {/* ── Upcoming · Tomorrow ── */}
// //         <UpcomingCard
// //           timing="UPCOMING · TOMORROW, 2:00 PM"
// //           title="Community Policing Forum — Wuse 2 & Maitama"
// //           location="Transcorp Hilton Conference Hall"
// //           date="Mar 29"
// //           description="An open dialogue between the FCT Police Command and residents on improving response times and community trust. Q&A session included."
// //           attendees={[
// //             { initials: 'K', color: '#10B981' },
// //             { initials: 'A', color: '#8B5CF6' },
// //             { initials: 'T', color: '#F59E0B' },
// //             { initials: '+', color: '#374151' },
// //           ]}
// //           actionLabel="RSVP"
// //           onAction={rsvp}
// //         />

// //         {/* ── Next Week ── */}
// //         <UpcomingCard
// //           timing="NEXT WEEK · APR 5, 10:00 AM"
// //           title="Police Reform Review — Civil Society Roundtable"
// //           location="Online (Zoom)"
// //           date="Apr 5"
// //           description="Quarterly review of the Aegis platform effectiveness and proposed amendments to community policing procedures."
// //           attendees={[
// //             { initials: 'R', color: '#EF4444' },
// //             { initials: 'M', color: '#3B82F6' },
// //           ]}
// //           actionLabel="Register"
// //           onAction={register}
// //         />

// //         {/* ── Past Town Halls ── */}
// //         <View style={styles.pastSection}>
// //           <View style={styles.pastHeader}>
// //             <Text style={styles.pastHeaderLabel}>PAST TOWN HALLS</Text>
// //             <TouchableOpacity onPress={viewArchive}>
// //               <Text style={styles.pastArchiveLink}>View archive →</Text>
// //             </TouchableOpacity>
// //           </View>

// //           <View style={styles.pastCard}>
// //             <PastRow
// //               title="March Community Policing Forum — Summary"
// //               date="Mar 15"
// //               attendees="47 attendees"
// //             />
// //           </View>
// //         </View>

// //         <View style={{ height: 40 }} />
// //       </ScrollView>
// //     </SafeAreaView>
// //   );
// // }

// // // ─── Styles ───────────────────────────────────────────────────────────────────
// // const styles = StyleSheet.create({
// //   root: {
// //     flex: 1,
// //     backgroundColor: '#0F172A',
// //   },

// //   // Header
// //   header: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //     paddingHorizontal: 16,
// //     paddingVertical: 14,
// //     borderBottomWidth: 1,
// //     borderBottomColor: 'rgba(255,255,255,0.06)',
// //   },
// //   backBtn: {
// //     width: 36,
// //     height: 36,
// //     borderRadius: 10,
// //     backgroundColor: 'rgba(255,255,255,0.06)',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   backIcon: {
// //     color: '#FFFFFF',
// //     fontSize: 24,
// //     lineHeight: 28,
// //   },
// //   headerTitle: {
// //     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
// //     fontSize: 12,
// //     fontWeight: '700',
// //     letterSpacing: 2,
// //     color: '#2DD4BF',
// //   },

// //   scroll: {
// //     paddingHorizontal: 20,
// //     paddingTop: 20,
// //   },

// //   // ── Event Card ──
// //   card: {
// //     backgroundColor: '#1E293B',
// //     borderRadius: 14,
// //     padding: 18,
// //     marginBottom: 16,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.06)',
// //   },
// //   cardTiming: {
// //     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
// //     fontSize: 10,
// //     fontWeight: '700',
// //     letterSpacing: 1.2,
// //     color: '#2DD4BF',
// //     marginBottom: 10,
// //   },
// //   cardTitle: {
// //     fontFamily: 'serif',
// //     fontSize: 18,
// //     fontWeight: '700',
// //     color: '#F8FAFC',
// //     lineHeight: 26,
// //     marginBottom: 12,
// //   },
// //   cardMeta: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     gap: 6,
// //     marginBottom: 12,
// //   },
// //   cardMetaText: {
// //     fontSize: 12,
// //     color: '#94A3B8',
// //   },
// //   cardMetaDot: {
// //     color: '#4B5563',
// //     fontSize: 12,
// //   },
// //   cardDesc: {
// //     fontSize: 13,
// //     color: '#94A3B8',
// //     lineHeight: 20,
// //     marginBottom: 16,
// //   },
// //   cardFooter: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'space-between',
// //   },
// //   cardAction: {
// //     color: '#2DD4BF',
// //     fontSize: 13,
// //     fontWeight: '700',
// //     letterSpacing: 0.5,
// //   },

// //   // Avatar stack
// //   avatarStack: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //   },
// //   avatar: {
// //     width: 28,
// //     height: 28,
// //     borderRadius: 14,
// //     borderWidth: 2,
// //     borderColor: '#1E293B',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //   },
// //   avatarText: {
// //     fontSize: 10,
// //     fontWeight: '700',
// //     color: '#FFFFFF',
// //   },

// //   // ── Past Section ──
// //   pastSection: {
// //     marginTop: 4,
// //     marginBottom: 8,
// //   },
// //   pastHeader: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //   },
// //   pastHeaderLabel: {
// //     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
// //     fontSize: 10,
// //     fontWeight: '700',
// //     letterSpacing: 1.5,
// //     color: '#4B5563',
// //   },
// //   pastArchiveLink: {
// //     color: '#2DD4BF',
// //     fontSize: 12,
// //     fontWeight: '600',
// //   },
// //   pastCard: {
// //     backgroundColor: '#1E293B',
// //     borderRadius: 12,
// //     borderWidth: 1,
// //     borderColor: 'rgba(255,255,255,0.06)',
// //     overflow: 'hidden',
// //   },
// //   pastRow: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     padding: 16,
// //     gap: 12,
// //   },
// //   pastDot: {
// //     width: 10,
// //     height: 10,
// //     borderRadius: 5,
// //     backgroundColor: '#10B981',
// //   },
// //   pastInfo: {
// //     flex: 1,
// //   },
// //   pastTitle: {
// //     fontSize: 13,
// //     fontWeight: '600',
// //     color: '#F1F5F9',
// //     marginBottom: 3,
// //   },
// //   pastMeta: {
// //     fontSize: 12,
// //     color: '#6B7280',
// //   },
// //   summaryBadge: {
// //     backgroundColor: 'rgba(45,212,191,0.15)',
// //     borderRadius: 4,
// //     paddingHorizontal: 8,
// //     paddingVertical: 3,
// //   },
// //   summaryBadgeText: {
// //     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
// //     color: '#2DD4BF',
// //     fontSize: 9,
// //     fontWeight: '700',
// //     letterSpacing: 0.5,
// //   },
// // });


// import React, { useState, useEffect, useCallback } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useRouter } from 'expo-router';

// // ─── CONFIG ───────────────────────────────────────────────────────────────────
// const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.170.172.21:5000/api';

// // ─── Types ────────────────────────────────────────────────────────────────────
// type Attendee = { initials: string; color: string };

// interface ApiTownHall {
//   _id: string;
//   title: string;
//   description: string;
//   location: string;
//   date: string;
//   startTime: string;
//   endTime?: string;
//   status: 'upcoming' | 'live' | 'completed' | 'cancelled';
//   type: 'physical' | 'online' | 'hybrid';
//   onlineLink?: string;
//   maxAttendees?: number;
//   attendees: Array<{
//     user: { name: string; _id: string };
//     registeredAt: string;
//   }>;
//   summary?: string;
//   summaryFileUrl?: string;
//   createdAt: string;
// }

// interface Props {
//   token: string;
// }

// // ─── Avatar Stack ─────────────────────────────────────────────────────────────
// function AvatarStack({ attendees }: { attendees: Attendee[] }) {
//   return (
//     <View style={styles.avatarStack}>
//       {attendees.map((a, i) => (
//         <View
//           key={i}
//           style={[
//             styles.avatar,
//             { backgroundColor: a.color, marginLeft: i === 0 ? 0 : -8, zIndex: attendees.length - i },
//           ]}
//         >
//           <Text style={styles.avatarText}>{a.initials}</Text>
//         </View>
//       ))}
//     </View>
//   );
// }

// // ─── Generate avatar initials and colors from attendees ───────────────────────
// const AVATAR_COLORS = ['#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#06B6D4', '#F97316'];

// function mapAttendeesToAvatars(attendees: ApiTownHall['attendees']): Attendee[] {
//   return attendees.slice(0, 4).map((a, i) => {
//     if (i === 3 && attendees.length > 4) {
//       return { initials: `+${attendees.length - 3}`, color: '#374151' };
//     }
//     const name = a.user?.name || '?';
//     const initials = name
//       .split(' ')
//       .map(n => n[0])
//       .join('')
//       .toUpperCase()
//       .slice(0, 2);
//     return { initials, color: AVATAR_COLORS[i % AVATAR_COLORS.length] };
//   });
// }

// // ─── Upcoming Event Card ──────────────────────────────────────────────────────
// function UpcomingCard({
//   timing,
//   title,
//   location,
//   date,
//   description,
//   attendees,
//   actionLabel,
//   onAction,
//   isRegistered,
// }: {
//   timing: string;
//   title: string;
//   location: string;
//   date: string;
//   description: string;
//   attendees: Attendee[];
//   actionLabel: string;
//   onAction: () => void;
//   isRegistered: boolean;
// }) {
//   return (
//     <View style={styles.card}>
//       <Text style={styles.cardTiming}>{timing}</Text>
//       <Text style={styles.cardTitle}>{title}</Text>

//       <View style={styles.cardMeta}>
//         <Text style={styles.cardMetaText}>📍 {location}</Text>
//         <Text style={styles.cardMetaDot}>·</Text>
//         <Text style={styles.cardMetaText}>📅 {date}</Text>
//       </View>

//       <Text style={styles.cardDesc}>{description}</Text>

//       <View style={styles.cardFooter}>
//         <AvatarStack attendees={attendees} />
//         <TouchableOpacity onPress={onAction}>
//           <Text style={[styles.cardAction, isRegistered && { color: '#10B981' }]}>
//             {isRegistered ? '✓ REGISTERED' : `${actionLabel} →`}
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// // ─── Past Town Hall Row ───────────────────────────────────────────────────────
// function PastRow({ title, date, attendees, onViewSummary }: { title: string; date: string; attendees: string; onViewSummary: () => void }) {
//   return (
//     <View style={styles.pastRow}>
//       <View style={styles.pastDot} />
//       <View style={styles.pastInfo}>
//         <Text style={styles.pastTitle}>{title}</Text>
//         <Text style={styles.pastMeta}>{date} · {attendees}</Text>
//       </View>
//       <TouchableOpacity style={styles.summaryBadge} onPress={onViewSummary}>
//         <Text style={styles.summaryBadgeText}>SUMMARY</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// // ─── Screen ───────────────────────────────────────────────────────────────────
// export default function TownHallsScreen({ token }: Props) {
//   const router = useRouter();
  
//   const [upcoming, setUpcoming] = useState<ApiTownHall[]>([]);
//   const [past, setPast] = useState<ApiTownHall[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());

//   // ── Fetch upcoming town halls ──
//   const fetchUpcoming = useCallback(async () => {
//     try {
//       const res = await fetch(`${API_BASE}/townhalls/upcoming`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error(`Server error ${res.status}`);
//       const data: ApiTownHall[] = await res.json();
//       setUpcoming(data);
      
//       // Check which ones the user is registered for
//       const registered = new Set<string>();
//       for (const th of data) {
//         try {
//           const statusRes = await fetch(`${API_BASE}/townhalls/${th._id}/registration-status`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           if (statusRes.ok) {
//             const statusData = await statusRes.json();
//             if (statusData.isRegistered) registered.add(th._id);
//           }
//         } catch {}
//       }
//       setRegisteredIds(registered);
      
//     } catch (err: any) {
//       console.error('Failed to fetch upcoming:', err.message);
//     }
//   }, [token]);

//   // ── Fetch past town halls ──
//   const fetchPast = useCallback(async () => {
//     try {
//       const res = await fetch(`${API_BASE}/townhalls/past`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error(`Server error ${res.status}`);
//       const data: ApiTownHall[] = await res.json();
//       setPast(data);
//     } catch (err: any) {
//       console.error('Failed to fetch past:', err.message);
//     }
//   }, [token]);

//   // ── Load all data ──
//   const load = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       await Promise.all([fetchUpcoming(), fetchPast()]);
//     } catch (err: any) {
//       setError(err.message ?? 'Failed to load town halls');
//     } finally {
//       setLoading(false);
//     }
//   }, [fetchUpcoming, fetchPast]);

//   useEffect(() => { load(); }, [load]);

//   // ── RSVP / Register ──
//   const handleRSVP = async (townHallId: string) => {
//     try {
//       const isRegistered = registeredIds.has(townHallId);
      
//       const endpoint = isRegistered ? 'unregister' : 'register';
//       const res = await fetch(`${API_BASE}/townhalls/${townHallId}/${endpoint}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       if (!res.ok) {
//         const data = await res.json();
//         throw new Error(data.message || 'Failed');
//       }
      
//       // Refresh data
//       await load();
      
//       Alert.alert(
//         isRegistered ? 'Unregistered' : 'Registered!',
//         isRegistered 
//           ? 'You have been removed from this town hall.'
//           : 'You have been registered for this Town Hall!',
//         [{ text: 'OK' }]
//       );
      
//     } catch (err: any) {
//       Alert.alert('Error', err.message || 'Something went wrong');
//     }
//   };

//   // ── View summary ──
//   const viewSummary = (townHall: ApiTownHall) => {
//     if (townHall.summary) {
//       Alert.alert(
//         townHall.title,
//         townHall.summary,
//         [{ text: 'Close' }]
//       );
//     } else {
//       Alert.alert('No Summary', 'Summary not yet available for this town hall.');
//     }
//   };

//   // ── View archive ──
//   const viewArchive = () => {
//     if (past.length === 0) {
//       Alert.alert('Archive', 'No past town halls found.');
//       return;
//     }
//     Alert.alert('Archive', `${past.length} past town hall(s) available below.`);
//   };

//   return (
//     <SafeAreaView style={styles.root}>
//       {/* ── Header ── */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
//           <Text style={styles.backIcon}>‹</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>TOWN HALLS</Text>
//         <View style={{ width: 36 }} />
//       </View>

//       <ScrollView
//         contentContainerStyle={styles.scroll}
//         showsVerticalScrollIndicator={false}
//       >
//         {loading ? (
//           <View style={styles.loadingState}>
//             <ActivityIndicator color="#2DD4BF" size="large" />
//             <Text style={styles.loadingText}>Loading town halls...</Text>
//           </View>
//         ) : error ? (
//           <View style={styles.loadingState}>
//             <Text style={[styles.loadingText, { color: '#EF4444' }]}>{error}</Text>
//             <TouchableOpacity onPress={load}>
//               <Text style={{ color: '#2DD4BF', fontSize: 13, fontWeight: '700', marginTop: 12 }}>Retry</Text>
//             </TouchableOpacity>
//           </View>
//         ) : (
//           <>
//             {/* ── Upcoming Town Halls ── */}
//             {upcoming.length > 0 && (
//               <>
//                 <Text style={styles.sectionLabel}>UPCOMING TOWN HALLS</Text>
//                 {upcoming.map(th => (
//                   <UpcomingCard
//                     key={th._id}
//                     timing={`UPCOMING · ${new Date(th.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}, ${th.startTime}`}
//                     title={th.title}
//                     location={th.location}
//                     date={new Date(th.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                     description={th.description}
//                     attendees={mapAttendeesToAvatars(th.attendees)}
//                     actionLabel={registeredIds.has(th._id) ? 'Registered' : 'RSVP'}
//                     onAction={() => handleRSVP(th._id)}
//                     isRegistered={registeredIds.has(th._id)}
//                   />
//                 ))}
//               </>
//             )}

//             {/* ── Past Town Halls ── */}
//             {past.length > 0 && (
//               <View style={styles.pastSection}>
//                 <View style={styles.pastHeader}>
//                   <Text style={styles.pastHeaderLabel}>PAST TOWN HALLS</Text>
//                   <TouchableOpacity onPress={viewArchive}>
//                     <Text style={styles.pastArchiveLink}>View archive →</Text>
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.pastCard}>
//                   {past.map(th => (
//                     <PastRow
//                       key={th._id}
//                       title={th.title}
//                       date={new Date(th.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
//                       attendees={`${th.attendees.length} attendees`}
//                       onViewSummary={() => viewSummary(th)}
//                     />
//                   ))}
//                 </View>
//               </View>
//             )}

//             {upcoming.length === 0 && past.length === 0 && (
//               <View style={styles.loadingState}>
//                 <Text style={styles.loadingText}>No town halls available yet.</Text>
//               </View>
//             )}
//           </>
//         )}

//         <View style={{ height: 40 }} />
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: '#0F172A',
//   },

//   // Header
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.06)',
//   },
//   backBtn: {
//     width: 36,
//     height: 36,
//     borderRadius: 10,
//     backgroundColor: 'rgba(255,255,255,0.06)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   backIcon: {
//     color: '#FFFFFF',
//     fontSize: 24,
//     lineHeight: 28,
//   },
//   headerTitle: {
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 12,
//     fontWeight: '700',
//     letterSpacing: 2,
//     color: '#2DD4BF',
//   },

//   scroll: {
//     paddingHorizontal: 20,
//     paddingTop: 20,
//   },

//   sectionLabel: {
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1.5,
//     color: '#4B5563',
//     marginBottom: 12,
//   },

//   // ── Event Card ──
//   card: {
//     backgroundColor: '#1E293B',
//     borderRadius: 14,
//     padding: 18,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.06)',
//   },
//   cardTiming: {
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1.2,
//     color: '#2DD4BF',
//     marginBottom: 10,
//   },
//   cardTitle: {
//     fontFamily: 'serif',
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#F8FAFC',
//     lineHeight: 26,
//     marginBottom: 12,
//   },
//   cardMeta: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 6,
//     marginBottom: 12,
//   },
//   cardMetaText: {
//     fontSize: 12,
//     color: '#94A3B8',
//   },
//   cardMetaDot: {
//     color: '#4B5563',
//     fontSize: 12,
//   },
//   cardDesc: {
//     fontSize: 13,
//     color: '#94A3B8',
//     lineHeight: 20,
//     marginBottom: 16,
//   },
//   cardFooter: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   cardAction: {
//     color: '#2DD4BF',
//     fontSize: 13,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },

//   // Avatar stack
//   avatarStack: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   avatar: {
//     width: 28,
//     height: 28,
//     borderRadius: 14,
//     borderWidth: 2,
//     borderColor: '#1E293B',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   avatarText: {
//     fontSize: 10,
//     fontWeight: '700',
//     color: '#FFFFFF',
//   },

//   // ── Past Section ──
//   pastSection: {
//     marginTop: 4,
//     marginBottom: 8,
//   },
//   pastHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 12,
//   },
//   pastHeaderLabel: {
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 10,
//     fontWeight: '700',
//     letterSpacing: 1.5,
//     color: '#4B5563',
//   },
//   pastArchiveLink: {
//     color: '#2DD4BF',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   pastCard: {
//     backgroundColor: '#1E293B',
//     borderRadius: 12,
//     borderWidth: 1,
//     borderColor: 'rgba(255,255,255,0.06)',
//     overflow: 'hidden',
//   },
//   pastRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     gap: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255,255,255,0.04)',
//   },
//   pastDot: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: '#10B981',
//   },
//   pastInfo: {
//     flex: 1,
//   },
//   pastTitle: {
//     fontSize: 13,
//     fontWeight: '600',
//     color: '#F1F5F9',
//     marginBottom: 3,
//   },
//   pastMeta: {
//     fontSize: 12,
//     color: '#6B7280',
//   },
//   summaryBadge: {
//     backgroundColor: 'rgba(45,212,191,0.15)',
//     borderRadius: 4,
//     paddingHorizontal: 8,
//     paddingVertical: 3,
//   },
//   summaryBadgeText: {
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     color: '#2DD4BF',
//     fontSize: 9,
//     fontWeight: '700',
//     letterSpacing: 0.5,
//   },

//   // Loading state
//   loadingState: {
//     paddingTop: 60,
//     alignItems: 'center',
//   },
//   loadingText: {
//     color: '#4B5563',
//     fontSize: 14,
//     marginTop: 12,
//   },
// });


import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AuthStorage } from '../src/utils/authStorage';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.170.172.21:5000/api';

// ─── Types ────────────────────────────────────────────────────────────────────
type Attendee = { initials: string; color: string };

interface ApiTownHall {
  _id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime?: string;
  status: 'upcoming' | 'live' | 'completed' | 'cancelled';
  type: 'physical' | 'online' | 'hybrid';
  onlineLink?: string;
  maxAttendees?: number;
  attendees: Array<{
    user: { name: string; _id: string };
    registeredAt: string;
  }>;
  summary?: string;
  summaryFileUrl?: string;
  createdAt: string;
}

// ─── Avatar Stack ─────────────────────────────────────────────────────────────
function AvatarStack({ attendees }: { attendees: Attendee[] }) {
  return (
    <View style={styles.avatarStack}>
      {attendees.map((a, i) => (
        <View
          key={i}
          style={[
            styles.avatar,
            { backgroundColor: a.color, marginLeft: i === 0 ? 0 : -8, zIndex: attendees.length - i },
          ]}
        >
          <Text style={styles.avatarText}>{a.initials}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Generate avatar initials and colors from attendees ───────────────────────
const AVATAR_COLORS = ['#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899', '#06B6D4', '#F97316'];

function mapAttendeesToAvatars(attendees: ApiTownHall['attendees']): Attendee[] {
  return attendees.slice(0, 4).map((a, i) => {
    if (i === 3 && attendees.length > 4) {
      return { initials: `+${attendees.length - 3}`, color: '#374151' };
    }
    const name = a.user?.name || '?';
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
    return { initials, color: AVATAR_COLORS[i % AVATAR_COLORS.length] };
  });
}

// ─── Upcoming Event Card ──────────────────────────────────────────────────────
function UpcomingCard({
  timing,
  title,
  location,
  date,
  description,
  attendees,
  actionLabel,
  onAction,
  isRegistered,
}: {
  timing: string;
  title: string;
  location: string;
  date: string;
  description: string;
  attendees: Attendee[];
  actionLabel: string;
  onAction: () => void;
  isRegistered: boolean;
}) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTiming}>{timing}</Text>
      <Text style={styles.cardTitle}>{title}</Text>

      <View style={styles.cardMeta}>
        <Text style={styles.cardMetaText}>📍 {location}</Text>
        <Text style={styles.cardMetaDot}>·</Text>
        <Text style={styles.cardMetaText}>📅 {date}</Text>
      </View>

      <Text style={styles.cardDesc}>{description}</Text>

      <View style={styles.cardFooter}>
        <AvatarStack attendees={attendees} />
        <TouchableOpacity onPress={onAction}>
          <Text style={[styles.cardAction, isRegistered && { color: '#10B981' }]}>
            {isRegistered ? '✓ REGISTERED' : `${actionLabel} →`}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Past Town Hall Row ───────────────────────────────────────────────────────
function PastRow({ title, date, attendees, onViewSummary }: { title: string; date: string; attendees: string; onViewSummary: () => void }) {
  return (
    <View style={styles.pastRow}>
      <View style={styles.pastDot} />
      <View style={styles.pastInfo}>
        <Text style={styles.pastTitle}>{title}</Text>
        <Text style={styles.pastMeta}>{date} · {attendees}</Text>
      </View>
      <TouchableOpacity style={styles.summaryBadge} onPress={onViewSummary}>
        <Text style={styles.summaryBadgeText}>SUMMARY</Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────
export default function TownHallsScreen() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  
  const [upcoming, setUpcoming] = useState<ApiTownHall[]>([]);
  const [past, setPast] = useState<ApiTownHall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [registeredIds, setRegisteredIds] = useState<Set<string>>(new Set());

  // Get token on mount
  useEffect(() => {
    (async () => {
      const t = await AuthStorage.getToken();
      setToken(t);
    })();
  }, []);

  // Fetch upcoming town halls
  const fetchUpcoming = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/townhalls/upcoming`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data: ApiTownHall[] = await res.json();
      setUpcoming(data);
      
      // Check which ones the user is registered for
      const registered = new Set<string>();
      for (const th of data) {
        try {
          const statusRes = await fetch(`${API_BASE}/townhalls/${th._id}/registration-status`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (statusRes.ok) {
            const statusData = await statusRes.json();
            if (statusData.isRegistered) registered.add(th._id);
          }
        } catch {}
      }
      setRegisteredIds(registered);
      
    } catch (err: any) {
      console.error('Failed to fetch upcoming:', err.message);
    }
  }, [token]);

  // Fetch past town halls
  const fetchPast = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch(`${API_BASE}/townhalls/past`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error(`Server error ${res.status}`);
      const data: ApiTownHall[] = await res.json();
      setPast(data);
    } catch (err: any) {
      console.error('Failed to fetch past:', err.message);
    }
  }, [token]);

  // Load all data
  const load = useCallback(async () => {
    if (!token) return;
    try {
      setLoading(true);
      setError(null);
      await Promise.all([fetchUpcoming(), fetchPast()]);
    } catch (err: any) {
      setError(err.message ?? 'Failed to load town halls');
    } finally {
      setLoading(false);
    }
  }, [token, fetchUpcoming, fetchPast]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  // RSVP / Register
  const handleRSVP = async (townHallId: string) => {
    if (!token) return;
    try {
      const isRegistered = registeredIds.has(townHallId);
      
      const endpoint = isRegistered ? 'unregister' : 'register';
      const res = await fetch(`${API_BASE}/townhalls/${townHallId}/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed');
      }
      
      // Refresh data
      await load();
      
      Alert.alert(
        isRegistered ? 'Unregistered' : 'Registered!',
        isRegistered 
          ? 'You have been removed from this town hall.'
          : 'You have been registered for this Town Hall!',
        [{ text: 'OK' }]
      );
      
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong');
    }
  };

  // View summary
  const viewSummary = (townHall: ApiTownHall) => {
    if (townHall.summary) {
      Alert.alert(
        townHall.title,
        townHall.summary,
        [{ text: 'Close' }]
      );
    } else {
      Alert.alert('No Summary', 'Summary not yet available for this town hall.');
    }
  };

  // View archive
  const viewArchive = () => {
    if (past.length === 0) {
      Alert.alert('Archive', 'No past town halls found.');
      return;
    }
    Alert.alert('Archive', `${past.length} past town hall(s) available below.`);
  };

  return (
    <SafeAreaView style={styles.root}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>TOWN HALLS</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <View style={styles.loadingState}>
            <ActivityIndicator color="#2DD4BF" size="large" />
            <Text style={styles.loadingText}>Loading town halls...</Text>
          </View>
        ) : error ? (
          <View style={styles.loadingState}>
            <Text style={[styles.loadingText, { color: '#EF4444' }]}>{error}</Text>
            <TouchableOpacity onPress={load}>
              <Text style={{ color: '#2DD4BF', fontSize: 13, fontWeight: '700', marginTop: 12 }}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {/* Upcoming Town Halls */}
            {upcoming.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>UPCOMING TOWN HALLS</Text>
                {upcoming.map(th => (
                  <UpcomingCard
                    key={th._id}
                    timing={`UPCOMING · ${new Date(th.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}, ${th.startTime}`}
                    title={th.title}
                    location={th.location}
                    date={new Date(th.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    description={th.description}
                    attendees={mapAttendeesToAvatars(th.attendees)}
                    actionLabel={registeredIds.has(th._id) ? 'Registered' : 'RSVP'}
                    onAction={() => handleRSVP(th._id)}
                    isRegistered={registeredIds.has(th._id)}
                  />
                ))}
              </>
            )}

            {/* Past Town Halls */}
            {past.length > 0 && (
              <View style={styles.pastSection}>
                <View style={styles.pastHeader}>
                  <Text style={styles.pastHeaderLabel}>PAST TOWN HALLS</Text>
                  <TouchableOpacity onPress={viewArchive}>
                    <Text style={styles.pastArchiveLink}>View archive →</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.pastCard}>
                  {past.map(th => (
                    <PastRow
                      key={th._id}
                      title={th.title}
                      date={new Date(th.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      attendees={`${th.attendees.length} attendees`}
                      onViewSummary={() => viewSummary(th)}
                    />
                  ))}
                </View>
              </View>
            )}

            {upcoming.length === 0 && past.length === 0 && (
              <View style={styles.loadingState}>
                <Text style={styles.loadingText}>No town halls available yet.</Text>
              </View>
            )}
          </>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0F172A',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    lineHeight: 28,
  },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#2DD4BF',
  },

  scroll: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  sectionLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#4B5563',
    marginBottom: 12,
  },

  // Event Card
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
  },
  cardTiming: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: '#2DD4BF',
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: 'serif',
    fontSize: 18,
    fontWeight: '700',
    color: '#F8FAFC',
    lineHeight: 26,
    marginBottom: 12,
  },
  cardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  cardMetaText: {
    fontSize: 12,
    color: '#94A3B8',
  },
  cardMetaDot: {
    color: '#4B5563',
    fontSize: 12,
  },
  cardDesc: {
    fontSize: 13,
    color: '#94A3B8',
    lineHeight: 20,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardAction: {
    color: '#2DD4BF',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Avatar stack
  avatarStack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Past Section
  pastSection: {
    marginTop: 4,
    marginBottom: 8,
  },
  pastHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  pastHeaderLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
    color: '#4B5563',
  },
  pastArchiveLink: {
    color: '#2DD4BF',
    fontSize: 12,
    fontWeight: '600',
  },
  pastCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
  },
  pastRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.04)',
  },
  pastDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10B981',
  },
  pastInfo: {
    flex: 1,
  },
  pastTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F1F5F9',
    marginBottom: 3,
  },
  pastMeta: {
    fontSize: 12,
    color: '#6B7280',
  },
  summaryBadge: {
    backgroundColor: 'rgba(45,212,191,0.15)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  summaryBadgeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    color: '#2DD4BF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Loading state
  loadingState: {
    paddingTop: 60,
    alignItems: 'center',
  },
  loadingText: {
    color: '#4B5563',
    fontSize: 14,
    marginTop: 12,
  },
});