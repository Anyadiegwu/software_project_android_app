import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { AuthStorage } from '.././src/utils/authStorage';
import { BASE_URL } from '../src/config/api';

// ─── Incident type icons (SVG paths) ─────────────────────────────────────────
const GunIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M3 10h4V7h9l2 3h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1l-1 2H3v-6z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    <Circle cx="7" cy="17" r="2" stroke="#F59E0B" strokeWidth="1.5" />
  </Svg>
);

const CarIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M5 11l1.5-4.5h11L19 11M5 11H3v3h1m15-3h2v3h-1M5 11h14" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    <Circle cx="7.5" cy="16" r="1.5" stroke="#F59E0B" strokeWidth="1.5" />
    <Circle cx="16.5" cy="16" r="1.5" stroke="#F59E0B" strokeWidth="1.5" />
  </Svg>
);

const EyeQuestionIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#F59E0B" strokeWidth="1.5" />
    <Circle cx="12" cy="12" r="3" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M12 8v0m0 2.5v3" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const OfficerIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="7" r="3" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M6 21v-2a6 6 0 0 1 12 0v2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M9 11l3-2 3 2" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const FistIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Rect x="6" y="10" width="12" height="9" rx="2" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M9 10V7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M6 13h12" stroke="#F59E0B" strokeWidth="1.5" />
  </Svg>
);

const DrugIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Rect x="8" y="3" width="8" height="13" rx="4" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M8 10h8" stroke="#F59E0B" strokeWidth="1.5" />
    <Path d="M12 16v5" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const HouseBreakIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M3 11l9-7 9 7v10H3V11z" stroke="#F59E0B" strokeWidth="1.5" strokeLinejoin="round" />
    <Path d="M9 21v-6h6v6" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15 11l-2-2-2 2" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const AlertIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#EF4444" strokeWidth="1.5" strokeLinejoin="round" />
    <Path d="M12 9v4M12 17h.01" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
  </Svg>
);

const LightningIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#14B8A6" strokeWidth="1.5" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#14B8A6" strokeWidth="1.5" />
    <Path d="M12 6v6l4 2" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#14B8A6" strokeWidth="1.5" />
    <Path d="M16 2v4M8 2v4M3 10h18" stroke="#14B8A6" strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

// New Icons for Location & Evidence
const MapPinIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Circle cx="12" cy="10" r="3" stroke="#F59E0B" strokeWidth="2" />
  </Svg>
);

const ImageIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="#FFFFFF" strokeWidth="2" />
    <Circle cx="8.5" cy="8.5" r="1.5" fill="#FFFFFF" />
    <Path d="M21 15l-5-5L5 21" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PlayIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke="#FFFFFF" strokeWidth="2" />
    <Path d="M10 8l6 4-6 4V8z" fill="#FFFFFF" />
  </Svg>
);

const UploadIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const MaskIcon = () => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Rect x="2" y="7" width="20" height="10" rx="3" stroke="#F59E0B" strokeWidth="2" />
    <Circle cx="7" cy="12" r="1" fill="#F59E0B" />
    <Circle cx="17" cy="12" r="1" fill="#F59E0B" />
  </Svg>
);

const XIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <Path d="M18 6L6 18M6 6l12 12" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────
type UrgencyLevel = 'Low' | 'Medium' | 'High';

const INCIDENT_TYPES = [
  { id: 'armed-robbery', label: 'Armed Robbery', icon: <GunIcon /> },
  { id: 'vehicle-crime', label: 'Vehicle Crime', icon: <CarIcon /> },
  { id: 'suspicious-activity', label: 'Suspicious Activity', icon: <EyeQuestionIcon /> },
  { id: 'police-misconduct', label: 'Police Misconduct', icon: <OfficerIcon /> },
  { id: 'assault', label: 'Assault', icon: <FistIcon /> },
  { id: 'drug-activity', label: 'Drug Activity', icon: <DrugIcon /> },
  { id: 'break-in', label: 'Break-In', icon: <HouseBreakIcon /> },
  { id: 'other-emergency', label: 'Other Emergency', icon: <AlertIcon /> },
];

// ─── Map UI incident type → backend category enum ─────────────────────────────
const CATEGORY_MAP: Record<string, string> = {
  'armed-robbery': 'theft',
  'vehicle-crime': 'other',
  'suspicious-activity': 'suspicious_activity',
  'police-misconduct': 'other',
  'assault': 'assault',
  'drug-activity': 'other',
  'break-in': 'theft',
  'other-emergency': 'other',
};

// ─── Map UI incident type → backend type enum ─────────────────────────────────
const TYPE_MAP: Record<string, string> = {
  'armed-robbery': 'crime',
  'vehicle-crime': 'crime',
  'suspicious-activity': 'crime',
  'police-misconduct': 'incident',
  'assault': 'crime',
  'drug-activity': 'crime',
  'break-in': 'crime',
  'other-emergency': 'emergency',
};

// ─── Map UI urgency → backend urgency enum ────────────────────────────────────
const URGENCY_MAP: Record<UrgencyLevel, string> = {
  Low: 'low',
  Medium: 'medium',
  High: 'high',
};

const URGENCY: UrgencyLevel[] = ['Low', 'Medium', 'High'];
const URGENCY_COLORS: Record<UrgencyLevel, string> = {
  Low: '#10B981',
  Medium: '#F59E0B',
  High: '#EF4444',
};

// ─── Step dots ────────────────────────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <View style={styles.stepDots}>
      {Array.from({ length: total }).map((_, i) => (
        <View
          key={i}
          style={[
            styles.stepDot,
            i === current - 1 && styles.stepDotActive,
            i < current - 1 && styles.stepDotDone,
            i > current - 1 && styles.stepDotOutline,
          ]}
        />
      ))}
    </View>
  );
}

// ─── Step 1 — Incident Type ───────────────────────────────────────────────────
function Step1({
  selected, onSelect,
  urgency, onUrgency,
}: {
  selected: string; onSelect: (id: string) => void;
  urgency: UrgencyLevel; onUrgency: (u: UrgencyLevel) => void;
}) {
  return (
    <>
      <Text style={styles.stepTitle}>What happened?</Text>
      <Text style={styles.stepSubtitle}>Select the incident type that best describes the situation.</Text>

      <View style={styles.typeGrid}>
        {INCIDENT_TYPES.map(t => (
          <TouchableOpacity
            key={t.id}
            style={[styles.typeCard, selected === t.id && styles.typeCardActive]}
            onPress={() => onSelect(t.id)}
            activeOpacity={0.8}
          >
            {t.icon}
            <Text style={[styles.typeLabel, selected === t.id && styles.typeLabelActive]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionLabel}>URGENCY LEVEL</Text>
      <View style={styles.urgencyRow}>
        {URGENCY.map(u => (
          <TouchableOpacity
            key={u}
            style={[
              styles.urgencyBtn,
              urgency === u && { backgroundColor: `${URGENCY_COLORS[u]}22`, borderColor: URGENCY_COLORS[u] },
            ]}
            onPress={() => onUrgency(u)}
          >
            <Text style={[styles.urgencyText, urgency === u && { color: URGENCY_COLORS[u] }]}>{u}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

// ─── Step 2 — Details & Time ──────────────────────────────────────────────────
function Step2({
  description, onChangeDesc,
  suspects, onChangeSuspects,
  weapons, onChangeWeapons,
  vehicle, onChangeVehicle
}: {
  description: string; onChangeDesc: (v: string) => void;
  suspects: string; onChangeSuspects: (v: string) => void;
  weapons: string; onChangeWeapons: (v: string) => void;
  vehicle: string; onChangeVehicle: (v: string) => void;
}) {
  return (
    <>
      <Text style={styles.stepTitle}>Describe the incident</Text>
      <Text style={styles.stepSubtitle}>{"Include as much detail as you're comfortable sharing."}</Text>

      <Text style={styles.fieldLabel}>DESCRIPTION <Text style={styles.required}>*</Text></Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="e.g. Three men in a black Toyota Camry were seen breaking into the building at around 10pm..."
        placeholderTextColor="#4B5563"
        value={description}
        onChangeText={onChangeDesc}
        multiline
        numberOfLines={6}
        textAlignVertical="top"
      />

      <Text style={styles.fieldLabel}>NUMBER OF SUSPECTS (APPROX.)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 3"
        placeholderTextColor="#4B5563"
        value={suspects}
        onChangeText={onChangeSuspects}
        keyboardType="numeric"
      />

      <Text style={styles.fieldLabel}>WEAPONS SEEN</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Knife, firearm"
        placeholderTextColor="#4B5563"
        value={weapons}
        onChangeText={onChangeWeapons}
      />

      <Text style={styles.fieldLabel}>SUSPECT VEHICLE</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Black Toyota Camry, unknown plates"
        placeholderTextColor="#4B5563"
        value={vehicle}
        onChangeText={onChangeVehicle}
      />
    </>
  );
}

// ─── Step 3 — Location & Evidence ─────────────────────────────────────────────
function Step3({
  anonymous, onToggleAnon,
  locationData, isFetchingLocation, locationError,
  evidenceFiles, onPickMedia, onRemoveMedia
}: {
  anonymous: boolean; onToggleAnon: (v: boolean) => void;
  locationData: Location.LocationGeocodedAddress | null;
  isFetchingLocation: boolean;
  locationError: string | null;
  evidenceFiles: ImagePicker.ImagePickerAsset[];
  onPickMedia: () => void;
  onRemoveMedia: (index: number) => void;
}) {
  return (
    <>
      <Text style={styles.stepTitle}>Location & evidence</Text>
      <Text style={styles.stepSubtitle}>Confirm your location and upload any media.</Text>

      <View style={styles.gpsCard}>
        <View style={styles.gpsTag}>
          <Text style={styles.gpsTagText}>
            {isFetchingLocation ? 'LOCATING...' : locationError ? 'LOCATION FAILED' : 'GPS CONFIRMED'}
          </Text>
        </View>
        <View style={styles.gpsPinContainer}>
          <MapPinIcon />
        </View>
        <Text style={styles.gpsTitle}>
          {isFetchingLocation ? 'Fetching location...' : locationError ? 'Could not get location' : locationData ? (locationData.street || locationData.name || 'Unknown Location') : 'Unknown Location'}
        </Text>
        <Text style={styles.gpsSubtitle}>
          {isFetchingLocation ? 'Please wait...' : locationError ? locationError : locationData ? `${locationData.city || locationData.district || ''}, ${locationData.region || ''} - Coordinates captured` : ''}
        </Text>
      </View>

      <Text style={[styles.sectionLabel, { marginTop: 24 }]}>EVIDENCE</Text>

      {evidenceFiles.map((file, index) => {
        const isVideo = file.type === 'video' || file.mimeType?.startsWith('video/') || file.fileName?.endsWith('.mp4');
        const sizeMB = file.fileSize ? (file.fileSize / (1024 * 1024)).toFixed(1) + ' MB' : 'Unknown size';
        const name = file.fileName || `Attachment ${index + 1}`;

        return (
          <View key={index} style={styles.fileItem}>
            <View style={styles.fileIconBg}>{isVideo ? <PlayIcon /> : <ImageIcon />}</View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.fileName}>{name}</Text>
              <Text style={styles.fileSize}>{sizeMB}</Text>
            </View>
            <TouchableOpacity style={styles.xBtn} onPress={() => onRemoveMedia(index)}>
              <XIcon />
            </TouchableOpacity>
          </View>
        );
      })}

      <TouchableOpacity style={styles.uploadPlaceholder} activeOpacity={0.8} onPress={onPickMedia}>
        <UploadIcon />
        <Text style={styles.uploadTitle}>Add more photos, video or audio</Text>
        <Text style={styles.uploadSubtitle}>JPG • PNG • MP4 • M4A • max 50MB</Text>
      </TouchableOpacity>

      <View style={styles.anonToggleContainer}>
        <View style={styles.maskIconContainer}>
          <MaskIcon />
        </View>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.anonToggleTitle}>Submit Anonymously</Text>
          <Text style={styles.anonToggleSubtitle}>Your identity will not be revealed</Text>
        </View>
        <Switch
          value={anonymous}
          onValueChange={onToggleAnon}
          trackColor={{ false: '#374151', true: '#14B8A6' }}
          thumbColor={Platform.OS === 'ios' ? undefined : '#FFFFFF'}
        />
      </View>
    </>
  );
}

// ─── Step 4 — Confirm & Submit ────────────────────────────────────────────────
function Step4({
  incidentType, urgency, description,
  locationData, evidenceFiles, anonymous,
  onEdit
}: {
  incidentType: string;
  urgency: UrgencyLevel;
  description: string;
  locationData: Location.LocationGeocodedAddress | null;
  evidenceFiles: ImagePicker.ImagePickerAsset[];
  anonymous: boolean;
  onEdit: (step: number) => void;
}) {
  const typeLabel = INCIDENT_TYPES.find(t => t.id === incidentType)?.label || 'Not specified';
  const locationName = locationData ? (locationData.street || locationData.name || 'Unknown Location') : 'GPS Confirmed';
  const evidenceText = evidenceFiles.length > 0 ? `${evidenceFiles.length} file(s) attached` : 'No evidence attached';

  const SummaryRow = ({ label, step, children }: { label: string, step: number, children: React.ReactNode }) => (
    <View style={styles.summaryRow}>
      <View style={styles.summaryRowHeader}>
        <Text style={styles.summaryLabel}>{label}</Text>
        <TouchableOpacity onPress={() => onEdit(step)}>
          <Text style={styles.summaryEdit}>Edit</Text>
        </TouchableOpacity>
      </View>
      {children}
    </View>
  );

  return (
    <>
      <Text style={styles.stepTitle}>Review & submit</Text>
      <Text style={styles.stepSubtitle}>Your report will be securely transmitted and reviewed by a verified officer within 24 hours.</Text>

      <View style={styles.summaryCard}>
        <SummaryRow label="TYPE" step={1}>
          <Text style={styles.summaryValue}>{typeLabel}</Text>
        </SummaryRow>

        <SummaryRow label="URGENCY" step={1}>
          <View style={[styles.urgencyBadge, { backgroundColor: `${URGENCY_COLORS[urgency]}22` }]}>
            <Text style={[styles.urgencyBadgeText, { color: URGENCY_COLORS[urgency] }]}>{urgency.toUpperCase()}</Text>
          </View>
        </SummaryRow>

        <SummaryRow label="DESCRIPTION" step={2}>
          <Text style={styles.summaryValue} numberOfLines={2}>
            {description || 'No description provided.'}
          </Text>
        </SummaryRow>

        <SummaryRow label="LOCATION" step={3}>
          <Text style={styles.summaryValue}>{locationName}</Text>
        </SummaryRow>

        <SummaryRow label="EVIDENCE" step={3}>
          <Text style={styles.summaryValue}>{evidenceText}</Text>
        </SummaryRow>

        <SummaryRow label="ANONYMITY" step={3}>
          <View style={[styles.anonBadge, anonymous ? styles.anonBadgeActive : styles.anonBadgePublic]}>
            <Text style={[styles.anonBadgeText, anonymous ? styles.anonTextActive : styles.anonTextPublic]}>
              {anonymous ? 'ANONYMOUS' : 'PUBLIC'}
            </Text>
          </View>
        </SummaryRow>
      </View>

      <View style={styles.warningNote}>
        <View style={styles.warningIconContainer}>
          <AlertIcon />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.warningNoteText}>
            Submitting false reports is a criminal offence under Nigerian law. Your report will be encrypted and stored securely.
          </Text>
        </View>
      </View>
    </>
  );
}

// ─── Main screen ─────────────────────────────────────────────────────────────
const TOTAL_STEPS = 4;

export default function NewReportScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [incidentType, setType] = useState('');
  const [urgency, setUrgency] = useState<UrgencyLevel>('Medium');
  const [description, setDesc] = useState('');
  const [suspects, setSuspects] = useState('');
  const [weapons, setWeapons] = useState('');
  const [vehicle, setVehicle] = useState('');
  const [anonymous, setAnon] = useState(true);
  const [submitting, setSub] = useState(false);

  const [locationData, setLocationData] = useState<Location.LocationGeocodedAddress | null>(null);
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const [evidenceFiles, setEvidenceFiles] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const pickMedia = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setEvidenceFiles(prev => [...prev, ...result.assets]);
    }
  };

  const removeMedia = (index: number) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Fetch location when entering Step 3
  useEffect(() => {
    if (step === 3 && !locationData && !isFetchingLocation && !locationError) {
      (async () => {
        setIsFetchingLocation(true);
        try {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            setLocationError('Permission to access location was denied');
            setIsFetchingLocation(false);
            return;
          }

          let location = await Location.getCurrentPositionAsync({});
          setLocationCoords({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
          });

          let geocode = await Location.reverseGeocodeAsync({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });

          if (geocode.length > 0) {
            setLocationData(geocode[0]);
          } else {
            setLocationError('Could not resolve address');
          }
        } catch (error) {
          setLocationError('Error fetching location');
        } finally {
          setIsFetchingLocation(false);
        }
      })();
    }
  }, [step]);

  const canContinue = () => {
    if (step === 1) return incidentType !== '';
    if (step === 2) return description.trim().length > 10;
    return true;
  };

  // ─── Submit report to backend ───────────────────────────────────────────────
  const submitReport = async () => {
    setSub(true);
    try {
      const token = await AuthStorage.getToken();

      if (!token) {
        Alert.alert('Session Expired', 'Please log in again.');
        return;
      }

      const locationPrimary = locationData
        ? locationData.street || locationData.name || 'Unknown Location'
        : null;
      const locationSecondary = locationData
        ? [locationData.city || locationData.district, locationData.region]
          .filter(Boolean)
          .join(', ')
        : null;

      const reportBody: Record<string, unknown> = {
        type: TYPE_MAP[incidentType] || 'incident',
        category: CATEGORY_MAP[incidentType] || 'other',
        urgency: URGENCY_MAP[urgency] || 'medium',
        description: description.trim(),
        isAnonymous: anonymous,
        ...(suspects && { suspectsCount: parseInt(suspects) || 0 }),
        ...(weapons && { weapons }),
        ...(vehicle && { vehicles: vehicle }),
        ...(locationCoords && {
          location: {
            lat: locationCoords.lat,
            lng: locationCoords.lng,
            address: `${locationPrimary ?? ''}${locationSecondary ? ', ' + locationSecondary : ''}`,
          },
        }),
      };

      const reportUrl = `${BASE_URL}/api/reporter/report`;
      const response = await fetch(reportUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportBody),
      });

      const data = await response.json();

      // Log only status for safety, not full response
      if (!response.ok) console.error('[NewReport] submit failed - status:', response.status);

      if (!response.ok) {
        Alert.alert(
          'Submission Failed',
          data.message || `Server error (${response.status}). Please try again.`
        );
        return;
      }

      const reportId = data._id;

      // ── Upload evidence files if any ────────────────────────────────────────
      if (evidenceFiles.length > 0 && reportId) {
        try {
          const formData = new FormData();
          evidenceFiles.forEach((file, index) => {
            formData.append('files', {
              uri: file.uri,
              name: file.fileName || `evidence_${index}.${file.uri.split('.').pop()}`,
              type: file.mimeType || 'image/jpeg',
            } as unknown as Blob);
          });

          const evidenceUrl = `${BASE_URL}/api/reporter/report/${reportId}/evidence`;
          console.log('[NewReport] uploading evidence →', evidenceUrl);

          const evidenceResponse = await fetch(evidenceUrl, {
            method: 'POST',
            headers: {
              // Do NOT set Content-Type — let fetch set it with the multipart boundary
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          });

          if (!evidenceResponse.ok) {
            console.warn('[NewReport] evidence upload failed:', await evidenceResponse.text());
            Alert.alert(
              'Report Saved',
              'Your report was submitted but the evidence files could not be uploaded. You can add them later.'
            );
          }
        } catch (evidenceErr) {
          // Non-blocking — the report itself was saved successfully
          console.warn('[NewReport] evidence upload error:', evidenceErr);
        }
      }

      // ── Navigate to success screen ──────────────────────────────────────────
      router.replace('/report-success');

    } catch (err) {
      Alert.alert('Network Error', 'Could not reach the server. Check your connection and try again.');
      console.error('[NewReport] submit error:', err);
    } finally {
      setSub(false);
    }
  };

  const handleContinue = () => {
    if (!canContinue()) {
      const msgs: Record<number, string> = {
        1: 'Please select an incident type.',
        2: 'Please describe the incident (at least 10 characters).',
      };
      Alert.alert('Required', msgs[step] || '');
      return;
    }
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1);
      return;
    }
    // Final step — submit for real
    submitReport();
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => (step > 1 ? setStep(s => s - 1) : router.back())}
          >
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NEW REPORT</Text>
          <Text style={styles.stepCounter}>STEP {step}/{TOTAL_STEPS}</Text>
        </View>

        {/* Progress dots */}
        <StepDots current={step} total={TOTAL_STEPS} />

        {/* Step content */}
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {step === 1 && (
            <Step1
              selected={incidentType} onSelect={setType}
              urgency={urgency} onUrgency={setUrgency}
            />
          )}
          {step === 2 && (
            <Step2
              description={description} onChangeDesc={setDesc}
              suspects={suspects} onChangeSuspects={setSuspects}
              weapons={weapons} onChangeWeapons={setWeapons}
              vehicle={vehicle} onChangeVehicle={setVehicle}
            />
          )}
          {step === 3 && (
            <Step3
              anonymous={anonymous} onToggleAnon={setAnon}
              locationData={locationData}
              isFetchingLocation={isFetchingLocation}
              locationError={locationError}
              evidenceFiles={evidenceFiles}
              onPickMedia={pickMedia}
              onRemoveMedia={removeMedia}
            />
          )}
          {step === 4 && (
            <Step4
              incidentType={incidentType}
              urgency={urgency}
              description={description}
              locationData={locationData}
              evidenceFiles={evidenceFiles}
              anonymous={anonymous}
              onEdit={setStep}
            />
          )}

          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Continue / Submit button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.continueBtn, (!canContinue() || submitting) && styles.continueBtnDisabled]}
            onPress={handleContinue}
            activeOpacity={0.85}
          >
            <Text style={styles.continueBtnText}>
              {submitting ? 'SUBMITTING…' : step < TOTAL_STEPS ? 'CONTINUE →' : 'SUBMIT REPORT SECURELY'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0B0E14' },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, paddingVertical: 14,
    borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.06)',
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.06)',
    justifyContent: 'center', alignItems: 'center',
  },
  backIcon: { color: '#FFFFFF', fontSize: 24, lineHeight: 28 },
  headerTitle: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 12, fontWeight: '700', letterSpacing: 2, color: '#14B8A6',
  },
  stepCounter: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 11, color: '#14B8A6', fontWeight: '700',
  },

  // Progress dots
  stepDots: { flexDirection: 'row', justifyContent: 'center', gap: 8, paddingVertical: 16 },
  stepDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.1)' },
  stepDotActive: { backgroundColor: '#14B8A6', width: 24 },
  stepDotDone: { backgroundColor: 'rgba(20,184,166,0.4)' },
  stepDotOutline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#374151' },

  // Scroll
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },

  // Step text
  stepTitle: { fontFamily: 'serif', fontSize: 26, fontWeight: '700', color: '#F1F5F9', marginBottom: 8 },
  stepSubtitle: { fontSize: 13, color: '#6B7280', lineHeight: 20, marginBottom: 24 },

  // Type grid
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  typeCard: {
    width: '47%', backgroundColor: '#161B22',
    borderRadius: 12, padding: 18, alignItems: 'center', gap: 10,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  typeCardActive: {
    borderColor: '#14B8A6',
    backgroundColor: 'rgba(20,184,166,0.07)',
  },
  typeLabel: { fontSize: 12, fontWeight: '600', color: '#94A3B8', textAlign: 'center' },
  typeLabelActive: { color: '#14B8A6' },

  // Time Selection
  timeCard: {
    flexDirection: 'row', alignItems: 'center', gap: 16,
    backgroundColor: '#161B22', borderRadius: 12, padding: 18,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  timeCardActive: {
    borderColor: '#14B8A6',
    backgroundColor: 'rgba(20,184,166,0.07)',
  },
  timeLabel: { fontSize: 13, fontWeight: '700', color: '#94A3B8', letterSpacing: 1 },
  timeLabelActive: { color: '#14B8A6' },

  // Urgency
  sectionLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.5, color: '#4B5563', marginBottom: 12,
  },
  urgencyRow: { flexDirection: 'row', gap: 10, marginBottom: 4 },
  urgencyBtn: {
    flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center',
    backgroundColor: '#161B22', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  urgencyText: { fontSize: 13, fontWeight: '700', color: '#4B5563' },

  // Form fields
  fieldLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: '#4B5563',
    marginBottom: 10, marginTop: 4,
  },
  required: { color: '#EF4444' },
  input: {
    backgroundColor: '#161B22', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 10, paddingHorizontal: 16, paddingVertical: 14,
    color: '#FFFFFF', fontSize: 14, marginBottom: 8,
  },
  textArea: { height: 160, textAlignVertical: 'top' },

  // Step 3 components
  gpsCard: {
    backgroundColor: '#161B22', borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    position: 'relative',
  },
  gpsTag: {
    backgroundColor: 'rgba(20,184,166,0.1)', alignSelf: 'flex-start',
    paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, marginBottom: 12,
  },
  gpsTagText: {
    color: '#14B8A6', fontSize: 10, fontWeight: '700', letterSpacing: 1,
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
  },
  gpsPinContainer: { position: 'absolute', top: 20, right: 20 },
  gpsTitle: { fontSize: 18, fontWeight: '700', color: '#F1F5F9', marginBottom: 4 },
  gpsSubtitle: { fontSize: 13, color: '#94A3B8' },

  fileItem: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#161B22', borderRadius: 12, padding: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 10,
  },
  fileIconBg: {
    width: 44, height: 44, borderRadius: 10,
    backgroundColor: '#14B8A6', justifyContent: 'center', alignItems: 'center',
  },
  fileName: { fontSize: 14, fontWeight: '600', color: '#F1F5F9' },
  fileSize: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  xBtn: { padding: 8 },

  uploadPlaceholder: {
    borderWidth: 1.5, borderStyle: 'dashed', borderColor: 'rgba(20,184,166,0.5)',
    borderRadius: 16, padding: 24, alignItems: 'center',
    backgroundColor: 'rgba(20,184,166,0.03)', marginTop: 8, marginBottom: 32,
  },
  uploadTitle: { fontSize: 14, fontWeight: '600', color: '#F1F5F9', marginTop: 12 },
  uploadSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 4 },

  anonToggleContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#161B22', borderRadius: 16, padding: 16,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
  },
  maskIconContainer: {
    width: 40, height: 40, borderRadius: 10,
    backgroundColor: 'rgba(245,158,11,0.1)', justifyContent: 'center', alignItems: 'center',
  },
  anonToggleTitle: { fontSize: 15, fontWeight: '700', color: '#F1F5F9' },
  anonToggleSubtitle: { fontSize: 12, color: '#6B7280', marginTop: 2 },

  // Step 4
  summaryCard: {
    backgroundColor: '#161B22', borderRadius: 16, padding: 20,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
    marginBottom: 24, gap: 20,
  },
  summaryRow: {
    flexDirection: 'column', gap: 6,
  },
  summaryRowHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  summaryLabel: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1.2, color: '#6B7280',
  },
  summaryEdit: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', color: '#14B8A6',
  },
  summaryValue: {
    fontSize: 14, color: '#F1F5F9', lineHeight: 20,
  },
  urgencyBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6,
  },
  urgencyBadgeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1,
  },
  anonBadge: {
    alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6,
  },
  anonBadgeActive: {
    backgroundColor: 'rgba(20,184,166,0.15)',
  },
  anonBadgePublic: {
    backgroundColor: 'rgba(245,158,11,0.15)',
  },
  anonBadgeText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10, fontWeight: '700', letterSpacing: 1,
  },
  anonTextActive: { color: '#14B8A6' },
  anonTextPublic: { color: '#F59E0B' },

  warningNote: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: 'rgba(245,158,11,0.08)', borderRadius: 12, padding: 16,
    borderWidth: 1, borderColor: 'rgba(245,158,11,0.2)', gap: 14,
  },
  warningIconContainer: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(245,158,11,0.15)', justifyContent: 'center', alignItems: 'center',
  },
  warningNoteText: { fontSize: 12, color: '#D1D5DB', lineHeight: 18 },

  // Footer
  footer: { paddingHorizontal: 20, paddingBottom: Platform.OS === 'ios' ? 24 : 20, paddingTop: 12 },
  continueBtn: {
    backgroundColor: '#14B8A6', borderRadius: 12,
    paddingVertical: 17, alignItems: 'center',
    shadowColor: '#14B8A6', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35, shadowRadius: 10, elevation: 8,
  },
  continueBtnDisabled: { opacity: 0.45 },
  continueBtnText: {
    color: '#0D1117', fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13, fontWeight: '700', letterSpacing: 1.5,
  },
});