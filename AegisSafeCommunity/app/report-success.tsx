import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform  } from 'react-native';
import { useRouter } from 'expo-router';
import Svg, { Path, Circle } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
             
const CheckIcon = () => (
  <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="#22C55E" />
    <Path d="M8 12.5l3 3 5-6" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ArrowRightIcon = () => (
  <Svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <Path d="M5 12h14M12 5l7 7-7 7" stroke="#0D1117" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function ReportSuccessScreen() {
  const router = useRouter();
  
  // Hardcoded for demo, normally this would come from the API response
  const reportId = "AGS-2026-00841";

  return (
    <SafeAreaView style={styles.root}>
      
      <View style={styles.content}>
        
        <View style={styles.iconContainer}>
          <View style={styles.iconGlow}>
            <CheckIcon />
          </View>
        </View>

        <View style={styles.headerSection}>
          <Text style={styles.tagLabel}>REPORT SUBMITTED</Text>
          <Text style={styles.reportId}>{reportId}</Text>
        </View>

        <View style={styles.messageSection}>
          <Text style={styles.title}>Your report is secured.</Text>
          <Text style={styles.description}>
            It has been encrypted and delivered securely. Use your Report ID to track status at any time.
          </Text>
        </View>

        <View style={styles.statusCard}>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>STATUS</Text>
            <View style={styles.badgeUnderReview}>
              <Text style={styles.badgeTextUnderReview}>UNDER REVIEW</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>SUBMITTED</Text>
            <Text style={styles.statusValue}>Just now</Text>
          </View>
        </View>

        <View style={{ flex: 1 }} />

        <View style={styles.actionSection}>
          <TouchableOpacity 
            style={styles.primaryBtn} 
            onPress={() => router.replace('/(tabs)/reports')}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryBtnText}>TRACK THIS REPORT</Text>
            <ArrowRightIcon />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.secondaryBtn} 
            onPress={() => router.replace('/(tabs)/home')}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryBtnText}>RETURN TO HOME</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0B0E14',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    paddingBottom: Platform.OS === 'ios' ? 24 : 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
    marginTop: 20,
  },
  iconGlow: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
    borderRadius: 40,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(34, 197, 94, 0.2)',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
    backgroundColor: 'rgba(20, 184, 166, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(20, 184, 166, 0.15)',
  },
  tagLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: '#14B8A6',
    letterSpacing: 2,
    marginBottom: 6,
  },
  reportId: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 20,
    fontWeight: '700',
    color: '#14B8A6',
    letterSpacing: 1,
  },
  messageSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: 'serif',
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  statusCard: {
    width: '100%',
    backgroundColor: '#161B22',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: 16,
  },
  statusLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 11,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 1.5,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  badgeUnderReview: {
    backgroundColor: 'rgba(249, 115, 22, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeTextUnderReview: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    color: '#F97316',
    letterSpacing: 1,
  },
  actionSection: {
    width: '100%',
    gap: 16,
  },
  primaryBtn: {
    backgroundColor: '#14D9AD',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    gap: 8,
    shadowColor: '#14D9AD',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryBtnText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13,
    fontWeight: '700',
    color: '#0D1117',
    letterSpacing: 1.5,
  },
  secondaryBtn: {
    backgroundColor: 'transparent',
    paddingVertical: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
  },
  secondaryBtnText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
});
