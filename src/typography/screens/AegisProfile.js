import React from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const AegisProfile = () => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" color="#F59E0B" size={48} />
        <View style={styles.headerText}>
          <Text style={styles.title}>Aegis Safe Community</Text>
          <Text style={styles.subtitle}>Mobile Security Infrastructure</Text>
        </View>
      </View>

      {/* Stats/Info Row */}
      <View style={styles.infoRow}>
        <View style={styles.badge}>
          <Ionicons name="grid-outline" size={16} color="#9CA3AF" />
          <Text style={styles.badgeText}>UX Prototype</Text>
        </View>
        <View style={styles.badge}>
          <Ionicons name="pulse" size={16} color="#10B981" />
          <Text style={[styles.badgeText, { color: '#10B981' }]}>Active</Text>
        </View>
      </View>

      {/* Figma Embed Container */}
      <View style={styles.prototypeCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="globe-outline" size={18} color="#9CA3AF" />
          <Text style={styles.cardTitle}>Live Figma Preview</Text>
        </View>
        
        <View style={styles.webviewContainer}>
          <WebView
            source={{ uri: 'https://embed.figma.com/proto/QNkuVpHM0jx9K7cy0b2UXA/Aegis?node-id=919-3823&scaling=scale-down&content-scaling=fixed&page-id=347%3A790&starting-point-node-id=357%3A792&embed-host=share' }}
            style={styles.webview}
            scalesPageToFit={true}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    marginLeft: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F9FAFB',
    fontFamily: 'Courier New',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 12,
    fontFamily: 'Courier New',
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 25,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    gap: 6,
  },
  badgeText: {
    fontSize: 12,
    color: '#9CA3AF',
    fontWeight: '600',
  },
  prototypeCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  cardHeader: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    fontWeight: '600',
    color: '#E5E7EB',
  },
  webviewContainer: {
    height: 450,
    width: '100%',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default AegisProfile;
