import * as Location from 'expo-location';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Region } from 'react-native-maps';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthStorage } from '../utils/authStorage';
import { BASE_URL } from '../config/api';

// ─── CONFIG ───────────────────────────────────────────────────────────────────

// ─── Constants ────────────────────────────────────────────────────────────────

const FILTERS = [
  { id: 'high_risk', label: 'HIGH RISK', color: '#FF4B4B' },
  { id: 'alerts', label: 'ALERTS', color: '#FFB347' },
  { id: 'resolved', label: 'RESOLVED', color: '#45D0B1' },
];

const DEFAULT_REGION: Region = {
  latitude: 9.0765,
  longitude: 7.3986,
  latitudeDelta: 0.0522,
  longitudeDelta: 0.0221,
};

const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
  { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
  { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
  { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
  { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
  { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
];

// ─── Pin Icons ────────────────────────────────────────────────────────────────
const PIN_ICONS: Record<string, string> = {
  high_risk: '🔫',
  alerts: '⚠️',
  resolved: '✅',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface MapPin {
  id: string;
  latitude: number;
  longitude: number;
  type: string;
  color: string;
  icon: string;
  title: string;
  category: string;
  urgency: string;
  status: string;
  address: string;
  createdAt: string;
  reporter: string;
}

export default function MapTab() {
  const insets = useSafeAreaInsets();
  const mapRef = useRef<MapView>(null);

  const [activeFilter, setActiveFilter] = useState('all');
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationStatus, setLocationStatus] = useState<'loading' | 'granted' | 'denied' | 'idle'>('idle');
  const [locationError, setLocationError] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Map pins state
  const [pins, setPins] = useState<MapPin[]>([]);
  const [loadingPins, setLoadingPins] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Get token on mount
  useEffect(() => {
    (async () => {
      const t = await AuthStorage.getToken();
      setToken(t);
    })();
  }, []);

  // Request location permission and start watching position on mount
  useEffect(() => {
    let subscription: Location.LocationSubscription | null = null;

    (async () => {
      setLocationStatus('loading');

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setLocationStatus('denied');
        setLocationError('Location permission denied. Showing default area.');
        return;
      }

      setLocationStatus('granted');

      const initial = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUserLocation(initial);
      animateToLocation(initial.coords.latitude, initial.coords.longitude);

      subscription = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.Balanced, distanceInterval: 10 },
        (loc) => setUserLocation(loc),
      );
    })();

    return () => { subscription?.remove(); };
  }, []);

  // Fetch map pins from backend
  const fetchPins = useCallback(async () => {
    if (!token) return;
    try {
      setLoadingPins(true);
      // Build URL with location if available
      let url = `${BASE_URL}/api/reporter/safety-map`;
      if (userLocation) {
        url += `?lat=${userLocation.coords.latitude}&lng=${userLocation.coords.longitude}`;
      }

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error(`Server error ${res.status}`);

      const data = await res.json();

      // Add icon to each pin
      const pinsWithIcons = data.map((pin: any) => ({
        ...pin,
        icon: PIN_ICONS[pin.type] || '📍',
      }));

      setPins(pinsWithIcons);
    } catch (err) {
      console.error('Map pins fetch error:', err);
    } finally {
      setLoadingPins(false);
    }
  }, [token, userLocation]);

  useEffect(() => {
    if (token) fetchPins();
  }, [token, fetchPins]);

  const animateToLocation = (lat: number, lng: number) => {
    mapRef.current?.animateToRegion(
      {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.012,
        longitudeDelta: 0.006,
      },
      800,
    );
  };

  const handleRecenter = () => {
    if (userLocation) {
      animateToLocation(userLocation.coords.latitude, userLocation.coords.longitude);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      const results = await Location.geocodeAsync(searchQuery);
      if (results && results.length > 0) {
        const { latitude, longitude } = results[0];
        animateToLocation(latitude, longitude);
      } else {
        Alert.alert('Not Found', 'Location could not be found.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to search location.');
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* ── Actual Map ─────────────────────────────────────────────────── */}
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_DEFAULT}
        initialRegion={DEFAULT_REGION}
        customMapStyle={DARK_MAP_STYLE}
        showsUserLocation={locationStatus === 'granted'}
        showsMyLocationButton={false}
        showsCompass={false}
      >
        {pins.map((pin) => {
          if (activeFilter !== 'all' && pin.type !== activeFilter) return null;
          return (
            <Marker
              key={pin.id}
              coordinate={{ latitude: pin.latitude, longitude: pin.longitude }}
              title={pin.title}
              description={`${pin.category} · ${pin.address}`}
              tracksViewChanges={false}
            >
              <View style={[styles.pin, { backgroundColor: pin.color }]}>
                <Text style={styles.pinIcon}>{pin.icon}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>

      {/* ── Header Overlays ─────────────────────────────────────────────── */}
      <View style={styles.headerOverlay} pointerEvents="box-none">
        {/* Search bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search location..."
            placeholderTextColor="#8B949E"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
          />
          {isSearching && <ActivityIndicator size="small" color="#45D0B1" style={{ marginLeft: 8 }} />}
        </View>

        {/* Filter chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          pointerEvents="box-none"
        >
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === 'all' && styles.filterChipActive]}
            onPress={() => setActiveFilter('all')}
          >
            <Text style={[styles.filterText, activeFilter === 'all' && styles.filterTextActive]}>ALL</Text>
          </TouchableOpacity>

          {FILTERS.map((f) => (
            <TouchableOpacity
              key={f.id}
              style={[
                styles.filterChip,
                { borderColor: f.color },
                activeFilter === f.id && { backgroundColor: f.color },
              ]}
              onPress={() => setActiveFilter(activeFilter === f.id ? 'all' : f.id)}
            >
              <Text
                style={[
                  styles.filterText,
                  { color: f.color },
                  activeFilter === f.id && { color: '#0D1117', fontWeight: 'bold' },
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* ── Location Permission Banner ───────────────────────────────────── */}
      {locationStatus === 'loading' && (
        <View style={styles.locationBanner}>
          <ActivityIndicator size="small" color="#45D0B1" style={{ marginRight: 8 }} />
          <Text style={styles.locationBannerText}>Getting your location…</Text>
        </View>
      )}
      {locationStatus === 'denied' && locationError && (
        <View style={[styles.locationBanner, styles.locationBannerDenied]}>
          <Text style={styles.locationBannerText}>📍 {locationError}</Text>
        </View>
      )}

      {/* ── My Location Button ──────────────────────────────────────────── */}
      {locationStatus === 'granted' && (
        <TouchableOpacity
          style={styles.myLocationBtn}
          onPress={handleRecenter}
          activeOpacity={0.8}
        >
          <Text style={styles.myLocationIcon}>📍</Text>
        </TouchableOpacity>
      )}

      {/* ── Loading overlay ─────────────────────────────────────────────── */}
      {loadingPins && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="small" color="#45D0B1" />
        </View>
      )}

      {/* ── Bottom Overlay: Legend + Live Status ───────────────────────── */}
      <View style={styles.bottomOverlay} pointerEvents="box-none">
        <View style={styles.legendCard}>
          <Text style={styles.legendTitle}>MAP LEGEND</Text>
          {FILTERS.map((f) => (
            <View key={f.id} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: f.color }]} />
              <Text style={styles.legendText}>{f.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.liveIndicator}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live · {pins.length} incidents</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1117',
  },

  // ── Pins ────────────────────────────────────────────────────────────────
  pin: {
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#161B22',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  pinIcon: {
    fontSize: 15,
  },

  // ── Header Overlay ──────────────────────────────────────────────────────
  headerOverlay: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 44 : 54,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    zIndex: 100,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 17, 23, 0.88)',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    marginBottom: 10,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  filtersContainer: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backgroundColor: 'rgba(13, 17, 23, 0.75)',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterChipActive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  filterText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#8B949E',
    letterSpacing: 1,
  },
  filterTextActive: {
    color: '#0D1117',
  },

  // ── Location Banner ─────────────────────────────────────────────────────
  locationBanner: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 130 : 140,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 17, 23, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(69, 208, 177, 0.3)',
    zIndex: 200,
  },
  locationBannerDenied: {
    borderColor: 'rgba(255, 75, 75, 0.4)',
  },
  locationBannerText: {
    color: '#C9D1D9',
    fontSize: 12,
    fontWeight: '500',
  },

  // ── My Location Button ──────────────────────────────────────────────────
  myLocationBtn: {
    position: 'absolute',
    right: 16,
    bottom: 160,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(13, 17, 23, 0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(69, 208, 177, 0.4)',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    zIndex: 200,
  },
  myLocationIcon: {
    fontSize: 22,
  },

  // ── Loading overlay ─────────────────────────────────────────────────────
  loadingOverlay: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 130 : 140,
    right: 16,
    backgroundColor: 'rgba(13, 17, 23, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(69, 208, 177, 0.3)',
    zIndex: 200,
  },

  // ── Bottom Overlay ──────────────────────────────────────────────────────
  bottomOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 100,
  },
  legendCard: {
    backgroundColor: 'rgba(13, 17, 23, 0.88)',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  legendTitle: {
    color: '#8B949E',
    fontSize: 9,
    fontWeight: 'bold',
    marginBottom: 8,
    letterSpacing: 1.5,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  legendText: {
    color: '#E5E7EB',
    fontSize: 11,
    fontWeight: '500',
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(220, 38, 38, 0.15)',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.35)',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  liveText: {
    color: '#FCA5A5',
    fontSize: 12,
    fontWeight: 'bold',
  },
});