import React, { useState } from 'react';
import {
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
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { colors } from '../../theme/index';

const LightningIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={colors.primaryAccent} strokeWidth="1.5" strokeLinejoin="round" />
  </Svg>
);

const ClockIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={colors.primaryAccent} strokeWidth="1.5" />
    <Path d="M12 6v6l4 2" stroke={colors.primaryAccent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CalendarIcon = () => (
  <Svg width="28" height="28" viewBox="0 0 24 24" fill="none">
    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke={colors.primaryAccent} strokeWidth="1.5" />
    <Path d="M16 2v4M8 2v4M3 10h18" stroke={colors.primaryAccent} strokeWidth="1.5" strokeLinecap="round" />
  </Svg>
);

const INCIDENT_TYPES = [
    { id: 'theft', label: 'Theft/Robbery', icon: '🥷' },
    { id: 'assault', label: 'Assault', icon: '👊' },
    { id: 'suspicious', label: 'Suspicious Activity', icon: '👁️' },
    { id: 'vandalism', label: 'Vandalism', icon: '🏚️' },
    { id: 'accident', label: 'Accident', icon: '💥' },
    { id: 'medical', label: 'Medical Emergency', icon: '🚑' },
    { id: 'fire', label: 'Fire', icon: '🔥' },
    { id: 'other', label: 'Other', icon: '❓' },
];

export default function ReportIncidentScreen({ navigation }) {
    const insets = useSafeAreaInsets();
    const [step, setStep] = useState(1);

    
    // Form State
    const [incidentType, setIncidentType] = useState('');
    const [urgency, setUrgency] = useState('Medium');
    const [incidentTime, setIncidentTime] = useState('');
    const [customDateTime, setCustomDateTime] = useState('');
    const [description, setDescription] = useState('');
    const [suspects, setSuspects] = useState('');
    const [weapons, setWeapons] = useState('');
    const [vehicle, setVehicle] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleNext = () => {
        if (step < 5) {
            setStep(step + 1);
        } else if (step === 5) {
            submitReport();
        }
    };

    const handleBack = () => {
        if (step > 1 && step < 6) {
            setStep(step - 1);
        } else {
            navigation.goBack();
        }
    };

    const submitReport = () => {
        // Show success screen (Step 6)
        setStep(6);
    };

    const renderProgressBar = () => {
        return (
            <View style={styles.progressContainer}>
                {[1, 2, 3, 4, 5].map((s) => (
                    <View 
                        key={s} 
                        style={[
                            styles.progressDot, 
                            step >= s ? styles.progressDotActive : null
                        ]} 
                    />
                ))}
            </View>
        );
    };

    const renderStep1 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.sectionTitle}>What type of incident are you reporting?</Text>
            <View style={styles.grid}>
                {INCIDENT_TYPES.map((type) => (
                    <TouchableOpacity 
                        key={type.id} 
                        style={[styles.gridItem, incidentType === type.id ? styles.gridItemActive : null]}
                        onPress={() => setIncidentType(type.id)}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.gridIcon}>{type.icon}</Text>
                        <Text style={[styles.gridLabel, incidentType === type.id ? styles.gridLabelActive : null]}>
                            {type.label}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.sectionTitle}>Urgency Level</Text>
            <View style={styles.segmentedControl}>
                {['Low', 'Medium', 'High'].map((level) => (
                    <TouchableOpacity 
                        key={level} 
                        style={[styles.segmentBtn, urgency === level ? styles.segmentBtnActive : null]}
                        onPress={() => setUrgency(level)}
                    >
                        <Text style={[styles.segmentText, urgency === level ? styles.segmentTextActive : null]}>
                            {level}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );

    const renderStep2 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.sectionTitle}>Describe the incident</Text>
            <Text style={styles.helperText}>Include as much detail as you're comfortable sharing.</Text>
            
            <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Describe what happened..."
                placeholderTextColor={colors.palesky}
                multiline
                numberOfLines={6}
                value={description}
                onChangeText={setDescription}
                textAlignVertical="top"
            />
            <Text style={styles.charCount}>{description.length}/500</Text>

            <Text style={styles.inputLabel}>NUMBER OF SUSPECTS (APPROX.)</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Height, clothing, distinguishing features"
                placeholderTextColor={colors.palesky}
                value={suspects}
                onChangeText={setSuspects}
            />

            <Text style={styles.inputLabel}>WEAPONS SEEN</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Knife, firearm"
                placeholderTextColor={colors.palesky}
                value={weapons}
                onChangeText={setWeapons}
            />

            <Text style={styles.inputLabel}>SUSPECT VEHICLE</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Make, model, color, plate number"
                placeholderTextColor={colors.palesky}
                value={vehicle}
                onChangeText={setVehicle}
            />
        </View>
    );

    const renderStep3 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.sectionTitle}>When did it happen?</Text>
            <Text style={styles.helperText}>Select the approximate time of the incident.</Text>

            <View style={{ gap: 12 }}>
                <TouchableOpacity
                    style={[styles.timeCard, incidentTime === 'just_now' ? styles.timeCardActive : null]}
                    onPress={() => setIncidentTime('just_now')}
                    activeOpacity={0.8}
                >
                    <LightningIcon />
                    <Text style={[styles.timeLabel, incidentTime === 'just_now' ? styles.timeLabelActive : null]}>JUST NOW</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.timeCard, incidentTime === 'past_hour' ? styles.timeCardActive : null]}
                    onPress={() => setIncidentTime('past_hour')}
                    activeOpacity={0.8}
                >
                    <ClockIcon />
                    <Text style={[styles.timeLabel, incidentTime === 'past_hour' ? styles.timeLabelActive : null]}>PAST HOUR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.timeCard, incidentTime === 'custom' ? styles.timeCardActive : null]}
                    onPress={() => setIncidentTime('custom')}
                    activeOpacity={0.8}
                >
                    <CalendarIcon />
                    <Text style={[styles.timeLabel, incidentTime === 'custom' ? styles.timeLabelActive : null]}>CUSTOM DATE/TIME</Text>
                </TouchableOpacity>
            </View>

            {incidentTime === 'custom' && (
                <View style={{ marginTop: 16 }}>
                    <Text style={styles.inputLabel}>ENTER DATE AND TIME <Text style={{ color: colors.dangerRed }}>*</Text></Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. October 12, 10:30 PM"
                        placeholderTextColor={colors.palesky}
                        value={customDateTime}
                        onChangeText={setCustomDateTime}
                    />
                </View>
            )}
        </View>
    );

    const renderStep4 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.sectionTitle}>Location & Evidence</Text>
            
            <Text style={styles.inputLabel}>Location</Text>
            <View style={styles.locationBox}>
                <Text style={styles.locationIcon}>📍</Text>
                <View>
                    <Text style={styles.locationPrimary}>Apongbon Bridge Junction</Text>
                    <Text style={styles.locationSecondary}>Lagos Island, Lagos</Text>
                </View>
            </View>
            <TouchableOpacity>
                <Text style={styles.editLocationText}>Edit Location</Text>
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Evidence (Optional)</Text>
            <TouchableOpacity style={styles.uploadBox} activeOpacity={0.8}>
                <Text style={styles.uploadIcon}>📷</Text>
                <Text style={styles.uploadText}>Tap to upload photos or videos</Text>
                <Text style={styles.uploadSubtext}>Max file size: 50MB</Text>
            </TouchableOpacity>

            <View style={styles.switchContainer}>
                <View style={styles.switchTextContainer}>
                    <Text style={styles.switchTitle}>Submit Anonymously</Text>
                    <Text style={styles.switchDesc}>Your identity will be hidden from the public report.</Text>
                </View>
                <Switch
                    value={isAnonymous}
                    onValueChange={setIsAnonymous}
                    trackColor={{ false: colors.bigStone, true: colors.primaryAccent }}
                    thumbColor={colors.white}
                />
            </View>
        </View>
    );

    const renderStep5 = () => (
        <View style={styles.stepContainer}>
            <Text style={styles.sectionTitle}>Review & Submit</Text>
            
            <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Type</Text>
                <Text style={styles.summaryValue}>{INCIDENT_TYPES.find(t => t.id === incidentType)?.label || 'Not specified'}</Text>
                
                <View style={styles.divider} />
                
                <Text style={styles.summaryLabel}>Urgency</Text>
                <Text style={[styles.summaryValue, { color: urgency === 'High' ? colors.dangerRed : urgency === 'Medium' ? colors.secondaryAccent : colors.primaryAccent }]}>
                    {urgency}
                </Text>

                <View style={styles.divider} />
                
                <Text style={styles.summaryLabel}>Description</Text>
                <Text style={styles.summaryValue}>{description || 'None provided'}</Text>

                <View style={styles.divider} />

                <Text style={styles.summaryLabel}>Location</Text>
                <Text style={styles.summaryValue}>Apongbon Bridge Junction</Text>

                <View style={styles.divider} />

                <Text style={styles.summaryLabel}>Anonymous</Text>
                <Text style={styles.summaryValue}>{isAnonymous ? 'Yes' : 'No'}</Text>
            </View>

            <View style={styles.disclaimerBox}>
                <Text style={styles.disclaimerIcon}>⚠️</Text>
                <Text style={styles.disclaimerText}>
                    Filing a false report is a punishable offense. Ensure all provided information is accurate to the best of your knowledge.
                </Text>
            </View>
        </View>
    );

    const renderStep6 = () => (
        <View style={styles.successContainer}>
            <View style={styles.successCircle}>
                <Text style={styles.successCheck}>✓</Text>
            </View>
            <Text style={styles.successTitle}>Report Submitted</Text>
            <Text style={styles.successDesc}>
                Your report has been securely transmitted. Responders have been notified. Thank you for keeping the community safe.
            </Text>
            <TouchableOpacity 
                style={styles.homeBtn} 
                onPress={() => navigation.navigate('Dashboard')}
                activeOpacity={0.8}
            >
                <Text style={styles.homeBtnText}>RETURN TO HOME</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            {step < 6 ? (
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backBtn}>
                        <Text style={styles.backIcon}>←</Text>
                    </TouchableOpacity>
                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>NEW REPORT</Text>
                        <Text style={styles.stepText}>STEP {step}/5</Text>
                    </View>
                    <View style={{ width: 30 }} />
                </View>
            ) : null}

            {step < 6 ? renderProgressBar() : null}

            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView contentContainerStyle={step === 6 ? styles.scrollContentSuccess : styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {step === 1 ? renderStep1() : null}
                    {step === 2 ? renderStep2() : null}
                    {step === 3 ? renderStep3() : null}
                    {step === 4 ? renderStep4() : null}
                    {step === 5 ? renderStep5() : null}
                    {step === 6 ? renderStep6() : null}
                </ScrollView>

                {step < 6 ? (
                    <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 20) }]}>

                        <TouchableOpacity 
                            style={[styles.primaryBtn, step === 5 ? styles.submitBtn : null]} 
                            onPress={handleNext}
                            activeOpacity={0.8}
                            disabled={step === 1 && !incidentType}
                        >
                            <Text style={[styles.primaryBtnText, step === 5 ? styles.submitBtnText : null]}>
                                {step < 5 ? 'CONTINUE' : 'SUBMIT REPORT SECURELY'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.ebonyDark,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    backBtn: { padding: 4 },
    backIcon: { color: colors.white, fontSize: 24 },
    headerCenter: { alignItems: 'center' },
    headerTitle: {
        fontFamily: 'serif',
        fontSize: 14,
        fontWeight: '700',
        color: colors.white,
        letterSpacing: 1,
    },
    stepText: {
        fontSize: 10,
        color: colors.palesky,
        marginTop: 4,
        letterSpacing: 1,
    },
    progressContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    progressDot: {
        width: 32,
        height: 4,
        borderRadius: 2,
        backgroundColor: colors.bigStone,
    },
    progressDotActive: {
        backgroundColor: colors.primaryAccent,
    },
    scrollContent: {
        padding: 20,
        paddingBottom: 40,
    },
    scrollContentSuccess: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    stepContainer: {
        flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    
    // Step 1: Grid
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
        marginBottom: 32,
    },
    gridItem: {
        width: '48%',
        backgroundColor: colors.bigStone,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },
    gridItemActive: {
        borderColor: colors.primaryAccent,
        backgroundColor: 'rgba(0, 208, 156, 0.1)',
    },
    gridIcon: { fontSize: 24, marginBottom: 8 },
    gridLabel: {
        color: colors.palesky,
        fontSize: 12,
        fontWeight: '600',
        textAlign: 'center',
    },
    gridLabelActive: { color: colors.primaryAccent },
    
    // Step 1: Segmented
    segmentedControl: {
        flexDirection: 'row',
        backgroundColor: colors.bigStone,
        borderRadius: 8,
        padding: 4,
    },
    segmentBtn: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
    },
    segmentBtnActive: { backgroundColor: colors.ebonyDark },
    segmentText: { color: colors.palesky, fontSize: 13, fontWeight: '600' },
    segmentTextActive: { color: colors.white },

    // Step 2: Form
    helperText: { color: colors.palesky, fontSize: 12, marginBottom: 16, marginTop: -8 },
    inputLabel: { color: colors.white, fontSize: 13, fontWeight: '600', marginBottom: 8, marginTop: 16 },
    input: {
        backgroundColor: colors.bigStone,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        color: colors.white,
        padding: 14,
        fontSize: 14,
    },
    textArea: { height: 120 },
    charCount: { color: colors.palesky, fontSize: 10, textAlign: 'right', marginTop: 4 },

    timeCard: {
        flexDirection: 'row', alignItems: 'center', gap: 16,
        backgroundColor: colors.bigStone, borderRadius: 12, padding: 18,
        borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    },
    timeCardActive: {
        borderColor: colors.primaryAccent,
        backgroundColor: 'rgba(0, 208, 156, 0.1)',
    },
    timeLabel: { fontSize: 13, fontWeight: '700', color: colors.palesky, letterSpacing: 1 },
    timeLabelActive: { color: colors.primaryAccent },

    // Step 3: Location & Upload
    locationBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bigStone,
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
    },
    locationIcon: { fontSize: 20, marginRight: 12 },
    locationPrimary: { color: colors.white, fontSize: 14, fontWeight: '600', marginBottom: 2 },
    locationSecondary: { color: colors.palesky, fontSize: 12 },
    editLocationText: { color: colors.primaryAccent, fontSize: 13, fontWeight: '600' },
    
    uploadBox: {
        borderWidth: 1,
        borderColor: colors.palesky,
        borderStyle: 'dashed',
        borderRadius: 10,
        padding: 32,
        alignItems: 'center',
        marginBottom: 32,
    },
    uploadIcon: { fontSize: 32, marginBottom: 12 },
    uploadText: { color: colors.white, fontSize: 14, fontWeight: '600', marginBottom: 4 },
    uploadSubtext: { color: colors.palesky, fontSize: 12 },

    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.bigStone,
        padding: 16,
        borderRadius: 10,
    },
    switchTextContainer: { flex: 1, marginRight: 16 },
    switchTitle: { color: colors.white, fontSize: 14, fontWeight: '600', marginBottom: 4 },
    switchDesc: { color: colors.palesky, fontSize: 12, lineHeight: 18 },

    // Step 4: Summary
    summaryCard: {
        backgroundColor: colors.bigStone,
        borderRadius: 10,
        padding: 16,
        marginBottom: 24,
    },
    summaryLabel: { color: colors.palesky, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 4 },
    summaryValue: { color: colors.white, fontSize: 14, fontWeight: '500' },
    divider: { height: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginVertical: 12 },
    
    disclaimerBox: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 77, 77, 0.1)', // Light red
        borderColor: 'rgba(255, 77, 77, 0.3)',
        borderWidth: 1,
        borderRadius: 10,
        padding: 16,
    },
    disclaimerIcon: { fontSize: 20, marginRight: 12 },
    disclaimerText: { flex: 1, color: '#FCA5A5', fontSize: 12, lineHeight: 18 },

    // Step 5: Success
    successContainer: {
        alignItems: 'center',
        padding: 24,
    },
    successCircle: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(0, 208, 156, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    successCheck: {
        fontSize: 40,
        color: colors.primaryAccent,
    },
    successTitle: {
        fontFamily: 'serif',
        fontSize: 24,
        fontWeight: '700',
        color: colors.white,
        marginBottom: 12,
        textAlign: 'center',
    },
    successDesc: {
        fontSize: 14,
        color: colors.palesky,
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    homeBtn: {
        backgroundColor: colors.white,
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    homeBtnText: {
        color: colors.ebonyDark,
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    },

    // Bottom Bar
    bottomBar: {
        padding: 20,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.05)',
        backgroundColor: colors.ebonyDark,
    },
    primaryBtn: {
        backgroundColor: colors.white,
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
    },
    primaryBtnText: {
        color: colors.ebonyDark,
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
    },
    submitBtn: {
        backgroundColor: colors.primaryAccent,
    },
    submitBtnText: {
        color: colors.ebonyDark,
    },
});
