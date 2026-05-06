// // import React, { useState } from 'react';
// // import {
// //     ScrollView,
// //     StyleSheet,
// //     Text,
// //     TouchableOpacity,
// //     View,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import { colors } from '../../theme/index';

// // const NOTIFICATIONS = [
// //     {
// //         id: '1',
// //         type: 'alert',
// //         title: 'High priority incident near you',
// //         desc: 'A level 3 security alert has been issued for your immediate vicinity.',
// //         time: 'Just now',
// //         unread: true,
// //         icon: '⚠️',
// //     },
// //     {
// //         id: '2',
// //         type: 'update',
// //         title: 'Your report has been received',
// //         desc: 'The suspicious vehicle report you submitted is now under review.',
// //         time: '12m ago',
// //         unread: true,
// //         icon: '📝',
// //     },
// //     {
// //         id: '3',
// //         type: 'warning',
// //         title: 'Community meeting reminder',
// //         desc: 'Monthly safety briefing starts in 1 hour at the main hall.',
// //         time: '1h ago',
// //         unread: false,
// //         icon: '💡',
// //     },
// //     {
// //         id: '4',
// //         type: 'system',
// //         title: 'Aegis App Updated',
// //         desc: 'New features including live SOS broadcasting are now available.',
// //         time: '1d ago',
// //         unread: false,
// //         icon: '📱',
// //     },
// //     {
// //         id: '5',
// //         type: 'alert',
// //         title: 'Road closure ahead',
// //         desc: 'Main street is temporarily closed due to an ongoing operation.',
// //         time: '2d ago',
// //         unread: false,
// //         icon: '🚧',
// //     },
// // ];

// // const TABS = ['ALL (5)', 'ALERTS', 'UPDATES', 'SYSTEM'];

// // export default function NotificationsScreen({ navigation }) {
// //     const [activeTab, setActiveTab] = useState('ALL (5)');

// //     const getBorderColor = (type) => {
// //         switch(type) {
// //             case 'alert': return '#F97316'; // Orange
// //             case 'update': return colors.tealAccent; // Teal
// //             case 'warning': return colors.buttercup; // Yellow
// //             case 'system': return colors.dodgerBlue; // Blue
// //             default: return colors.glassBorder;
// //         }
// //     };

// //     return (
// //         <SafeAreaView style={styles.safeArea}>
// //             {/* Header */}
// //             <View style={styles.header}>
// //                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
// //                     <Text style={styles.backIcon}>←</Text>
// //                 </TouchableOpacity>
// //                 <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
// //                 <TouchableOpacity>
// //                     <Text style={styles.markReadText}>MARK ALL AS READ</Text>
// //                 </TouchableOpacity>
// //             </View>

// //             {/* Filter Tabs */}
// //             <View style={styles.tabsWrapper}>
// //                 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
// //                     {TABS.map((tab) => (
// //                         <TouchableOpacity
// //                             key={tab}
// //                             style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
// //                             onPress={() => setActiveTab(tab)}
// //                         >
// //                             <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
// //                                 {tab}
// //                             </Text>
// //                         </TouchableOpacity>
// //                     ))}
// //                 </ScrollView>
// //             </View>

// //             {/* Notification List */}
// //             <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
// //                 {NOTIFICATIONS.map((notif) => (
// //                     <TouchableOpacity key={notif.id} style={[styles.card, { borderLeftColor: getBorderColor(notif.type) }]} activeOpacity={0.8}>
// //                         <View style={styles.cardContent}>
// //                             <View style={styles.iconContainer}>
// //                                 <Text style={styles.icon}>{notif.icon}</Text>
// //                             </View>
// //                             <View style={styles.textContainer}>
// //                                 <View style={styles.titleRow}>
// //                                     <Text style={[styles.title, notif.unread && styles.titleUnread]}>{notif.title}</Text>
// //                                     {notif.unread && <View style={styles.unreadDot} />}
// //                                 </View>
// //                                 <Text style={styles.desc}>{notif.desc}</Text>
// //                                 <Text style={styles.time}>{notif.time}</Text>
// //                             </View>
// //                         </View>
// //                     </TouchableOpacity>
// //                 ))}
// //             </ScrollView>
// //         </SafeAreaView>
// //     );
// // }

// // const styles = StyleSheet.create({
// //     safeArea: {
// //         flex: 1,
// //         backgroundColor: colors.ebonyDarker,
// //     },
// //     // Header
// //     header: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //         justifyContent: 'space-between',
// //         paddingHorizontal: 20,
// //         paddingVertical: 16,
// //         borderBottomWidth: 1,
// //         borderBottomColor: 'rgba(255,255,255,0.05)',
// //     },
// //     backButton: {
// //         padding: 4,
// //     },
// //     backIcon: {
// //         color: colors.white,
// //         fontSize: 20,
// //     },
// //     headerTitle: {
// //         fontFamily: 'serif',
// //         fontSize: 16,
// //         fontWeight: '700',
// //         color: colors.white,
// //         letterSpacing: 1,
// //     },
// //     markReadText: {
// //         fontSize: 10,
// //         fontWeight: '600',
// //         color: colors.tealAccent,
// //         letterSpacing: 0.5,
// //     },

// //     // Tabs
// //     tabsWrapper: {
// //         borderBottomWidth: 1,
// //         borderBottomColor: 'rgba(255,255,255,0.05)',
// //     },
// //     tabsContainer: {
// //         paddingHorizontal: 16,
// //         paddingVertical: 12,
// //         gap: 8,
// //     },
// //     tabButton: {
// //         paddingHorizontal: 16,
// //         paddingVertical: 8,
// //         borderRadius: 20,
// //         backgroundColor: 'transparent',
// //     },
// //     tabButtonActive: {
// //         backgroundColor: 'rgba(20, 199, 167, 0.15)', // Teal with opacity
// //     },
// //     tabText: {
// //         fontSize: 11,
// //         fontWeight: '600',
// //         color: colors.palesky,
// //         letterSpacing: 0.5,
// //     },
// //     tabTextActive: {
// //         color: colors.tealAccent,
// //     },

// //     // List
// //     listContainer: {
// //         padding: 20,
// //         gap: 16,
// //     },
// //     card: {
// //         backgroundColor: colors.bigStone,
// //         borderRadius: 12,
// //         borderLeftWidth: 4,
// //         padding: 16,
// //         borderWidth: 1,
// //         borderColor: 'rgba(255,255,255,0.05)',
// //     },
// //     cardContent: {
// //         flexDirection: 'row',
// //         gap: 16,
// //     },
// //     iconContainer: {
// //         width: 40,
// //         height: 40,
// //         borderRadius: 20,
// //         backgroundColor: 'rgba(255,255,255,0.05)',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //     },
// //     icon: {
// //         fontSize: 18,
// //     },
// //     textContainer: {
// //         flex: 1,
// //     },
// //     titleRow: {
// //         flexDirection: 'row',
// //         justifyContent: 'space-between',
// //         alignItems: 'center',
// //         marginBottom: 4,
// //     },
// //     title: {
// //         fontFamily: 'serif',
// //         fontSize: 14,
// //         fontWeight: '500',
// //         color: colors.white,
// //         flex: 1,
// //     },
// //     titleUnread: {
// //         fontWeight: '700',
// //     },
// //     unreadDot: {
// //         width: 8,
// //         height: 8,
// //         borderRadius: 4,
// //         backgroundColor: colors.tealAccent,
// //         marginLeft: 8,
// //     },
// //     desc: {
// //         fontSize: 12,
// //         color: colors.palesky,
// //         lineHeight: 18,
// //         marginBottom: 8,
// //     },
// //     time: {
// //         fontSize: 10,
// //         color: colors.palesky,
// //         fontWeight: '500',
// //     },
// // });


// import React, { useState, useEffect, useCallback } from 'react';
// import {
//     ActivityIndicator,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { colors } from '../../theme/index';
// import { AuthStorage } from '../../utils/authStorage';

// // ─── CONFIG ───────────────────────────────────────────────────────────────────
// const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.170.172.21:5000';

// // ─── Helpers ──────────────────────────────────────────────────────────────────
// const TYPE_MAP = {
//     report_assigned: 'alert',
//     report_started: 'update',
//     report_resolved: 'update',
//     distress: 'alert',
//     system: 'system',
// };

// const TYPE_ICON = {
//     report_assigned: '📋',
//     report_started: '🚀',
//     report_resolved: '✅',
//     distress: '🚨',
//     system: '📱',
// };

// function timeAgo(iso) {
//     const diff = Date.now() - new Date(iso).getTime();
//     const mins = Math.floor(diff / 60_000);
//     if (mins < 1) return 'Just now';
//     if (mins < 60) return `${mins}m ago`;
//     const hrs = Math.floor(mins / 60);
//     if (hrs < 24) return `${hrs}h ago`;
//     const days = Math.floor(hrs / 24);
//     return `${days}d ago`;
// }

// function normaliseNotification(n) {
//     return {
//         id: n._id,
//         type: TYPE_MAP[n.type] || 'system',
//         title: n.title,
//         desc: n.message,
//         time: timeAgo(n.createdAt),
//         unread: !n.isRead,
//         icon: TYPE_ICON[n.type] || '📱',
//     };
// }

// // ─── Tabs ─────────────────────────────────────────────────────────────────────
// const TABS = ['ALL', 'ALERTS', 'UPDATES', 'SYSTEM'];

// export default function NotificationsScreen({ navigation }) {
//     const [activeTab, setActiveTab] = useState('ALL');
//     const [notifications, setNotifications] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [token, setToken] = useState(null);

//     // Get token on mount
//     useEffect(() => {
//         (async () => {
//             const t = await AuthStorage.getToken();
//             setToken(t);
//         })();
//     }, []);

//     // Fetch notifications
//     const fetchNotifications = useCallback(async () => {
//         if (!token) return;
//         try {
//             setLoading(true);
//             setError(null);
//             const res = await fetch(`${API_BASE}/api/notifications`, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             if (!res.ok) throw new Error(`Server error ${res.status}`);
//             const data = await res.json();
//             setNotifications(data.map(normaliseNotification));
//         } catch (err) {
//             setError(err.message || 'Failed to load notifications');
//             console.error('Notifications fetch error:', err);
//         } finally {
//             setLoading(false);
//         }
//     }, [token]);

//     useEffect(() => {
//         if (token) fetchNotifications();
//     }, [token, fetchNotifications]);

//     // Mark single notification as read
//     const markAsRead = async (id) => {
//         if (!token) return;
//         try {
//             await fetch(`${API_BASE}/api/notifications/${id}/read`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             // Update local state
//             setNotifications(prev =>
//                 prev.map(n => (n.id === id ? { ...n, unread: false } : n))
//             );
//         } catch (err) {
//             console.error('Mark as read error:', err);
//         }
//     };

//     // Mark all as read
//     const markAllAsRead = async () => {
//         if (!token) return;
//         try {
//             await fetch(`${API_BASE}/api/notifications/read-all`, {
//                 method: 'PATCH',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setNotifications(prev =>
//                 prev.map(n => ({ ...n, unread: false }))
//             );
//         } catch (err) {
//             console.error('Mark all as read error:', err);
//         }
//     };

//     // Get border color for notification type
//     const getBorderColor = (type) => {
//         switch (type) {
//             case 'alert': return '#F97316';
//             case 'update': return colors.tealAccent;
//             case 'warning': return colors.buttercup;
//             case 'system': return colors.dodgerBlue;
//             default: return colors.glassBorder;
//         }
//     };

//     // Filter notifications by tab
//     const getTabCount = (tab) => {
//         if (tab === 'ALL') return notifications.length;
//         if (tab === 'ALERTS') return notifications.filter(n => n.type === 'alert').length;
//         if (tab === 'UPDATES') return notifications.filter(n => n.type === 'update').length;
//         if (tab === 'SYSTEM') return notifications.filter(n => n.type === 'system').length;
//         return 0;
//     };

//     const filteredNotifications = activeTab === 'ALL'
//         ? notifications
//         : activeTab === 'ALERTS'
//             ? notifications.filter(n => n.type === 'alert')
//             : activeTab === 'UPDATES'
//                 ? notifications.filter(n => n.type === 'update')
//                 : notifications.filter(n => n.type === 'system');

//     return (
//         <SafeAreaView style={styles.safeArea}>
//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//                     <Text style={styles.backIcon}>←</Text>
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
//                 <TouchableOpacity onPress={markAllAsRead}>
//                     <Text style={styles.markReadText}>MARK ALL AS READ</Text>
//                 </TouchableOpacity>
//             </View>

//             {/* Filter Tabs */}
//             <View style={styles.tabsWrapper}>
//                 <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
//                     {TABS.map((tab) => (
//                         <TouchableOpacity
//                             key={tab}
//                             style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
//                             onPress={() => setActiveTab(tab)}
//                         >
//                             <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
//                                 {tab === 'ALL' ? `ALL (${getTabCount(tab)})` : tab}
//                             </Text>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//             </View>

//             {/* Notification List */}
//             <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
//                 {loading ? (
//                     <View style={styles.emptyState}>
//                         <ActivityIndicator color={colors.tealAccent} />
//                     </View>
//                 ) : error ? (
//                     <View style={styles.emptyState}>
//                         <Text style={styles.errorText}>{error}</Text>
//                         <TouchableOpacity onPress={fetchNotifications}>
//                             <Text style={styles.retryText}>Retry</Text>
//                         </TouchableOpacity>
//                     </View>
//                 ) : filteredNotifications.length === 0 ? (
//                     <View style={styles.emptyState}>
//                         <Text style={styles.emptyText}>No notifications yet</Text>
//                     </View>
//                 ) : (
//                     filteredNotifications.map((notif) => (
//                         <TouchableOpacity
//                             key={notif.id}
//                             style={[styles.card, { borderLeftColor: getBorderColor(notif.type) }]}
//                             activeOpacity={0.8}
//                             onPress={() => {
//                                 if (notif.unread) {
//                                     markAsRead(notif.id);
//                                 }
//                             }}
//                         >
//                             <View style={styles.cardContent}>
//                                 <View style={styles.iconContainer}>
//                                     <Text style={styles.icon}>{notif.icon}</Text>
//                                 </View>
//                                 <View style={styles.textContainer}>
//                                     <View style={styles.titleRow}>
//                                         <Text style={[styles.title, notif.unread && styles.titleUnread]}>
//                                             {notif.title}
//                                         </Text>
//                                         {notif.unread && <View style={styles.unreadDot} />}
//                                     </View>
//                                     <Text style={styles.desc}>{notif.desc}</Text>
//                                     <Text style={styles.time}>{notif.time}</Text>
//                                 </View>
//                             </View>
//                         </TouchableOpacity>
//                     ))
//                 )}
//             </ScrollView>
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     safeArea: {
//         flex: 1,
//         backgroundColor: colors.ebonyDarker,
//     },
//     // Header
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         paddingHorizontal: 20,
//         paddingVertical: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: 'rgba(255,255,255,0.05)',
//     },
//     backButton: {
//         padding: 4,
//     },
//     backIcon: {
//         color: colors.white,
//         fontSize: 20,
//     },
//     headerTitle: {
//         fontFamily: 'serif',
//         fontSize: 16,
//         fontWeight: '700',
//         color: colors.white,
//         letterSpacing: 1,
//     },
//     markReadText: {
//         fontSize: 10,
//         fontWeight: '600',
//         color: colors.tealAccent,
//         letterSpacing: 0.5,
//     },

//     // Tabs
//     tabsWrapper: {
//         borderBottomWidth: 1,
//         borderBottomColor: 'rgba(255,255,255,0.05)',
//     },
//     tabsContainer: {
//         paddingHorizontal: 16,
//         paddingVertical: 12,
//         gap: 8,
//     },
//     tabButton: {
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 20,
//         backgroundColor: 'transparent',
//     },
//     tabButtonActive: {
//         backgroundColor: 'rgba(20, 199, 167, 0.15)',
//     },
//     tabText: {
//         fontSize: 11,
//         fontWeight: '600',
//         color: colors.palesky,
//         letterSpacing: 0.5,
//     },
//     tabTextActive: {
//         color: colors.tealAccent,
//     },

//     // List
//     listContainer: {
//         padding: 20,
//         gap: 16,
//     },
//     card: {
//         backgroundColor: colors.bigStone,
//         borderRadius: 12,
//         borderLeftWidth: 4,
//         padding: 16,
//         borderWidth: 1,
//         borderColor: 'rgba(255,255,255,0.05)',
//     },
//     cardContent: {
//         flexDirection: 'row',
//         gap: 16,
//     },
//     iconContainer: {
//         width: 40,
//         height: 40,
//         borderRadius: 20,
//         backgroundColor: 'rgba(255,255,255,0.05)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     icon: {
//         fontSize: 18,
//     },
//     textContainer: {
//         flex: 1,
//     },
//     titleRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 4,
//     },
//     title: {
//         fontFamily: 'serif',
//         fontSize: 14,
//         fontWeight: '500',
//         color: colors.white,
//         flex: 1,
//     },
//     titleUnread: {
//         fontWeight: '700',
//     },
//     unreadDot: {
//         width: 8,
//         height: 8,
//         borderRadius: 4,
//         backgroundColor: colors.tealAccent,
//         marginLeft: 8,
//     },
//     desc: {
//         fontSize: 12,
//         color: colors.palesky,
//         lineHeight: 18,
//         marginBottom: 8,
//     },
//     time: {
//         fontSize: 10,
//         color: colors.palesky,
//         fontWeight: '500',
//     },

//     // Empty / Error state
//     emptyState: {
//         paddingTop: 60,
//         alignItems: 'center',
//     },
//     emptyText: {
//         color: colors.palesky,
//         fontSize: 14,
//     },
//     errorText: {
//         color: '#EF4444',
//         fontSize: 14,
//         marginBottom: 12,
//     },
//     retryText: {
//         color: colors.tealAccent,
//         fontSize: 14,
//         fontWeight: '600',
//     },
// });


import React, { useState, useEffect, useCallback } from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/index';
import { AuthStorage } from '../../utils/authStorage';

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const API_BASE = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.170.172.21:5000';

// ─── Helpers ──────────────────────────────────────────────────────────────────
const TYPE_MAP = {
    report_assigned: 'alert',
    report_started: 'update',
    report_resolved: 'update',
    distress: 'alert',
    system: 'system',
};

const TYPE_ICON = {
    report_assigned: '📋',
    report_started: '🚀',
    report_resolved: '✅',
    distress: '🚨',
    system: '📱',
};

function timeAgo(iso) {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60_000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    const days = Math.floor(hrs / 24);
    return `${days}d ago`;
}

function normaliseNotification(n) {
    return {
        id: n._id,
        type: TYPE_MAP[n.type] || 'system',
        title: n.title,
        desc: n.message,
        time: timeAgo(n.createdAt),
        unread: !n.isRead,
        icon: TYPE_ICON[n.type] || '📱',
    };
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = ['ALL', 'ALERTS', 'UPDATES', 'SYSTEM'];

export default function NotificationsScreen({ navigation }) {
    const [activeTab, setActiveTab] = useState('ALL');
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [token, setToken] = useState(null);

    // Get token on mount
    useEffect(() => {
        (async () => {
            const t = await AuthStorage.getToken();
            setToken(t);
        })();
    }, []);

    // Fetch notifications
    const fetchNotifications = useCallback(async () => {
        if (!token) return;
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`${API_BASE}/api/notifications`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            const data = await res.json();
            setNotifications(data.map(normaliseNotification));
        } catch (err) {
            setError(err.message || 'Failed to load notifications');
            console.error('Notifications fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        if (token) fetchNotifications();
    }, [token, fetchNotifications]);

    // Mark single notification as read
    const markAsRead = async (id) => {
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/api/notifications/${id}/read`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            // Update local state
            setNotifications(prev =>
                prev.map(n => (n.id === id ? { ...n, unread: false } : n))
            );
        } catch (err) {
            console.error('Mark as read error:', err);
        }
    };

    // Mark all as read
    const markAllAsRead = async () => {
        if (!token) return;
        try {
            const res = await fetch(`${API_BASE}/api/notifications/read-all`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error(`Server error ${res.status}`);
            // Update local state - all read
            setNotifications(prev =>
                prev.map(n => ({ ...n, unread: false }))
            );
        } catch (err) {
            console.error('Mark all as read error:', err);
        }
    };

    // Get border color for notification type
    const getBorderColor = (type) => {
        switch (type) {
            case 'alert': return '#F97316';
            case 'update': return colors.tealAccent;
            case 'warning': return colors.buttercup;
            case 'system': return colors.dodgerBlue;
            default: return colors.glassBorder;
        }
    };

    // Filter notifications by tab
    const getTabCount = (tab) => {
        if (tab === 'ALL') return notifications.length;
        if (tab === 'ALERTS') return notifications.filter(n => n.type === 'alert').length;
        if (tab === 'UPDATES') return notifications.filter(n => n.type === 'update').length;
        if (tab === 'SYSTEM') return notifications.filter(n => n.type === 'system').length;
        return 0;
    };

    const filteredNotifications = activeTab === 'ALL'
        ? notifications
        : activeTab === 'ALERTS'
            ? notifications.filter(n => n.type === 'alert')
            : activeTab === 'UPDATES'
                ? notifications.filter(n => n.type === 'update')
                : notifications.filter(n => n.type === 'system');

    const unreadCount = notifications.filter(n => n.unread).length;

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Text style={styles.backIcon}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>NOTIFICATIONS</Text>
                <TouchableOpacity onPress={markAllAsRead}>
                    <Text style={styles.markReadText}>MARK ALL AS READ</Text>
                </TouchableOpacity>
            </View>

            {/* Filter Tabs */}
            <View style={styles.tabsWrapper}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsContainer}>
                    {TABS.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
                            onPress={() => setActiveTab(tab)}
                        >
                            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                                {tab === 'ALL' ? `ALL (${getTabCount(tab)})` : tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Notification List */}
            <ScrollView contentContainerStyle={styles.listContainer} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View style={styles.emptyState}>
                        <ActivityIndicator color={colors.tealAccent} />
                    </View>
                ) : error ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity onPress={fetchNotifications}>
                            <Text style={styles.retryText}>Retry</Text>
                        </TouchableOpacity>
                    </View>
                ) : filteredNotifications.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No notifications yet</Text>
                    </View>
                ) : (
                    filteredNotifications.map((notif) => (
                        <TouchableOpacity
                            key={notif.id}
                            style={[styles.card, { borderLeftColor: getBorderColor(notif.type) }]}
                            activeOpacity={0.8}
                            onPress={() => {
                                if (notif.unread) {
                                    markAsRead(notif.id);
                                }
                            }}
                        >
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <Text style={styles.icon}>{notif.icon}</Text>
                                </View>
                                <View style={styles.textContainer}>
                                    <View style={styles.titleRow}>
                                        <Text style={[styles.title, notif.unread && styles.titleUnread]}>
                                            {notif.title}
                                        </Text>
                                        {notif.unread && <View style={styles.unreadDot} />}
                                    </View>
                                    <Text style={styles.desc}>{notif.desc}</Text>
                                    <Text style={styles.time}>{notif.time}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.ebonyDarker,
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    backButton: {
        padding: 4,
    },
    backIcon: {
        color: colors.white,
        fontSize: 20,
    },
    headerTitle: {
        fontFamily: 'serif',
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
        letterSpacing: 1,
    },
    markReadText: {
        fontSize: 10,
        fontWeight: '600',
        color: colors.tealAccent,
        letterSpacing: 0.5,
    },

    // Tabs
    tabsWrapper: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    tabsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 8,
    },
    tabButton: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'transparent',
    },
    tabButtonActive: {
        backgroundColor: 'rgba(20, 199, 167, 0.15)',
    },
    tabText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.palesky,
        letterSpacing: 0.5,
    },
    tabTextActive: {
        color: colors.tealAccent,
    },

    // List
    listContainer: {
        padding: 20,
        gap: 16,
    },
    card: {
        backgroundColor: colors.bigStone,
        borderRadius: 12,
        borderLeftWidth: 4,
        padding: 16,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    cardContent: {
        flexDirection: 'row',
        gap: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 18,
    },
    textContainer: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    title: {
        fontFamily: 'serif',
        fontSize: 14,
        fontWeight: '500',
        color: colors.white,
        flex: 1,
    },
    titleUnread: {
        fontWeight: '700',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.tealAccent,
        marginLeft: 8,
    },
    desc: {
        fontSize: 12,
        color: colors.palesky,
        lineHeight: 18,
        marginBottom: 8,
    },
    time: {
        fontSize: 10,
        color: colors.palesky,
        fontWeight: '500',
    },

    // Empty / Error state
    emptyState: {
        paddingTop: 60,
        alignItems: 'center',
    },
    emptyText: {
        color: colors.palesky,
        fontSize: 14,
    },
    errorText: {
        color: '#EF4444',
        fontSize: 14,
        marginBottom: 12,
    },
    retryText: {
        color: colors.tealAccent,
        fontSize: 14,
        fontWeight: '600',
    },
});