// // import { useRouter } from 'expo-router';
// // import React, { useEffect, useRef, useState } from 'react';
// // import {
// //   ActivityIndicator,
// //   Alert,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from 'react-native';
// // import { SafeAreaView } from 'react-native-safe-area-context';
// // import Svg, { Circle, Path, Rect } from 'react-native-svg';

// // const MailCheckIcon = () => (
// //   <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
// //     <Circle cx="12" cy="12" r="10" fill="rgba(45,212,191,0.1)" />
// //     <Path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
// //     <Rect x="3" y="5" width="18" height="14" rx="2" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" />
// //     <Path d="M15 15L17 17L21 13" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
// //   </Svg>
// // );

// // export default function EmailVerificationScreen() {
// //   const router = useRouter();

// //   const [code, setCode] = useState(['', '', '', '', '', '']);
// //   const [loading, setLoading] = useState(false);
// //   const [timer, setTimer] = useState(60);
// //   const [error, setError] = useState('');

// //   const inputs = useRef<Array<TextInput | null>>([]);

// //   // Mock email that would normally be passed via router params
// //   const email = "amaka@example.com";

// //   useEffect(() => {
// //     let interval = setInterval(() => {
// //       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
// //     }, 1000);
// //     return () => clearInterval(interval);
// //   }, []);

// //   const handleChange = (text: string, index: number) => {
// //     if (error) setError('');
// //     const newCode = [...code];
// //     newCode[index] = text;
// //     setCode(newCode);

// //     if (text !== '' && index < 5) {
// //       inputs.current[index + 1]?.focus();
// //     }
// //   };

// //   const handleKeyPress = (e: any, index: number) => {
// //     if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
// //       inputs.current[index - 1]?.focus();
// //     }
// //   };

// //   const handleVerify = () => {
// //     const fullCode = code.join('');
// //     if (fullCode.length < 6) {
// //       setError('Please enter the full 6-digit verification code.');
// //       return;
// //     }

// //     if (fullCode === '000000') {
// //       setError('Invalid verification code. Please try again.');
// //       return;
// //     }

// //     setLoading(true);
// //     setTimeout(() => {
// //       setLoading(false);
// //       router.replace('/verification-success');
// //     }, 1000);
// //   };

// //   const handleResend = () => {
// //     if (timer > 0) return;
// //     setTimer(60);
// //     Alert.alert('Code Sent', 'A new verification code has been sent to your email.');
// //   };

// //   return (
// //     <SafeAreaView style={styles.root}>
// //       <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
// //         {/* Top Bar */}
// //         <View style={styles.topBar}>
// //           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
// //             <Text style={styles.backArrow}>←</Text>
// //             <Text style={styles.backText}>BACK</Text>
// //           </TouchableOpacity>
// //         </View>

// //         <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

// //           <View style={styles.iconContainer}>
// //             <MailCheckIcon />
// //           </View>

// //           <Text style={styles.title}>Verify Your Email</Text>
// //           <Text style={styles.subtitle}>
// //             We've sent a 6-digit secure code to{'\n'}
// //             <Text style={styles.highlightEmail}>{email}</Text>
// //           </Text>

// //           {/* OTP Grid */}
// //           <View style={styles.otpContainer}>
// //             {code.map((digit, index) => (
// //               <TextInput
// //                 key={index}
// //                 ref={(ref) => { inputs.current[index] = ref; }}
// //                 style={[
// //                   styles.otpBox,
// //                   digit !== '' && styles.otpBoxFilled,
// //                   error ? styles.otpBoxError : null
// //                 ]}
// //                 value={digit}
// //                 onChangeText={(text) => handleChange(text, index)}
// //                 onKeyPress={(e) => handleKeyPress(e, index)}
// //                 keyboardType="number-pad"
// //                 maxLength={1}
// //                 selectTextOnFocus
// //               />
// //             ))}
// //           </View>

// //           {error ? <Text style={styles.errorText}>{error}</Text> : null}

// //           {/* Verify Button */}
// //           <TouchableOpacity
// //             style={[styles.verifyBtn, (loading || code.join('').length < 6) && styles.verifyBtnDisabled]}
// //             onPress={handleVerify}
// //             disabled={loading || code.join('').length < 6}
// //             activeOpacity={0.85}
// //           >
// //             {loading ? (
// //               <ActivityIndicator color="#0D1117" />
// //             ) : (
// //               <Text style={styles.verifyBtnText}>VERIFY & CONTINUE</Text>
// //             )}
// //           </TouchableOpacity>

// //           {/* Resend Logic */}
// //           <View style={styles.resendContainer}>
// //             <Text style={styles.resendText}>Didn't receive the code? </Text>
// //             {timer > 0 ? (
// //               <Text style={styles.timerText}>Resend in {timer}s</Text>
// //             ) : (
// //               <TouchableOpacity onPress={handleResend}>
// //                 <Text style={styles.resendLink}>Resend Code</Text>
// //               </TouchableOpacity>
// //             )}
// //           </View>

// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   root: { flex: 1, backgroundColor: '#0D1117' },

// //   topBar: {
// //     paddingHorizontal: 16, paddingVertical: 14,
// //     borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
// //   },
// //   backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
// //   backArrow: { color: '#6B7280', fontSize: 16, fontWeight: '700' },
// //   backText: {
// //     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
// //     fontSize: 10, fontWeight: '700', letterSpacing: 1, color: '#6B7280',
// //   },

// //   scroll: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 50, alignItems: 'center' },

// //   iconContainer: {
// //     width: 80, height: 80, borderRadius: 40,
// //     backgroundColor: '#161B22',
// //     borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
// //     justifyContent: 'center', alignItems: 'center',
// //     marginBottom: 24,
// //   },

// //   title: {
// //     fontFamily: 'serif', fontSize: 26, fontWeight: '700', color: '#FFFFFF',
// //     marginBottom: 12, textAlign: 'center',
// //   },
// //   subtitle: {
// //     fontSize: 14, color: '#9CA3AF', lineHeight: 22, textAlign: 'center',
// //     marginBottom: 40,
// //   },
// //   highlightEmail: { color: '#2DD4BF', fontWeight: '600' },

// //   otpContainer: {
// //     flexDirection: 'row', justifyContent: 'center', gap: 10,
// //     marginBottom: 8, width: '100%',
// //   },
// //   otpBox: {
// //     width: 45, height: 55,
// //     backgroundColor: '#161B22',
// //     borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
// //     borderRadius: 8,
// //     color: '#FFFFFF', fontSize: 24, fontWeight: '600', textAlign: 'center',
// //   },
// //   otpBoxFilled: {
// //     borderColor: '#2DD4BF', backgroundColor: 'rgba(45,212,191,0.05)',
// //   },
// //   otpBoxError: {
// //     borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.05)',
// //   },
// //   errorText: {
// //     color: '#EF4444',
// //     fontSize: 12,
// //     marginBottom: 24,
// //     textAlign: 'center',
// //   },

// //   verifyBtn: {
// //     backgroundColor: '#2DD4BF', borderRadius: 8,
// //     paddingVertical: 16, alignItems: 'center', width: '100%',
// //     marginBottom: 24,
// //   },
// //   verifyBtnDisabled: { opacity: 0.5 },
// //   verifyBtnText: {
// //     color: '#0D1117', fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
// //     fontSize: 13, fontWeight: '700', letterSpacing: 1.5,
// //   },

// //   resendContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
// //   resendText: { color: '#6B7280', fontSize: 13 },
// //   timerText: { color: '#F59E0B', fontSize: 13, fontWeight: '600' },
// //   resendLink: { color: '#2DD4BF', fontSize: 13, fontWeight: '600' },
// // });


// import { useLocalSearchParams, useRouter } from 'expo-router';
// import React, { useEffect, useRef, useState } from 'react';
// import {
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import Svg, { Circle, Path, Rect } from 'react-native-svg';
// import { API } from '../src/config/api';

// const MailCheckIcon = () => (
//   <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
//     <Circle cx="12" cy="12" r="10" fill="rgba(45,212,191,0.1)" />
//     <Path d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
//     <Rect x="3" y="5" width="18" height="14" rx="2" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" />
//     <Path d="M15 15L17 17L21 13" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//   </Svg>
// );

// export default function EmailVerificationScreen() {
//   const router = useRouter();
//   const { email: emailParam } = useLocalSearchParams<{ email: string }>();

//   const [code, setCode] = useState(['', '', '', '', '', '']);
//   const [loading, setLoading] = useState(false);
//   const [timer, setTimer] = useState(60);
//   const [error, setError] = useState('');

//   const inputs = useRef<Array<TextInput | null>>([]);

//   // ── Read real email from navigation params ────────────────────────────────
//   const email = emailParam || '';

//   useEffect(() => {
//     let interval = setInterval(() => {
//       setTimer((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (text: string, index: number) => {
//     if (error) setError('');
//     const newCode = [...code];
//     newCode[index] = text;
//     setCode(newCode);

//     if (text !== '' && index < 5) {
//       inputs.current[index + 1]?.focus();
//     }
//   };

//   const handleKeyPress = (e: any, index: number) => {
//     if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
//       inputs.current[index - 1]?.focus();
//     }
//   };

//   // ── ONLY THESE TWO FUNCTIONS CHANGED ─────────────────────────────────────
//   const handleVerify = async () => {
//     const fullCode = code.join('');
//     if (fullCode.length < 6) {
//       setError('Please enter the full 6-digit verification code.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(API.VERIFY_OTP, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           otp: fullCode,
//         }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || 'Invalid verification code. Please try again.');
//         return;
//       }

//       // router.replace('/verification-success');
//       // In handleVerify, replace router.replace('/verification-success') with:

//         const loginResponse = await fetch(API.REPORTER_LOGIN, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password }),
//         });

//         const loginData = await loginResponse.json();

//         if (!loginResponse.ok) {
//           // Verification worked but auto-login failed — send to manual login
//           router.replace('/reporter-login');
//           return;
//         }

//         await AuthStorage.saveToken(loginData.token);
//         await AuthStorage.saveUser(loginData.user);

//         router.replace('/verification-success');

//     } catch (err) {
//       setError('Network error. Please check your connection and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResend = async () => {
//     if (timer > 0) return;

//     try {
//       const response = await fetch(API.RESEND_OTP, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         Alert.alert('Failed to Resend', data.message || 'Something went wrong.');
//         return;
//       }

//       setTimer(60);
//       Alert.alert('Code Sent', 'A new verification code has been sent to your email.');

//     } catch (err) {
//       Alert.alert('Network Error', 'Could not reach the server. Check your connection.');
//     }
//   };
//   // ── END OF CHANGES ────────────────────────────────────────────────────────

//   return (
//     <SafeAreaView style={styles.root}>
//       <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
//         <View style={styles.topBar}>
//           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
//             <Text style={styles.backArrow}>←</Text>
//             <Text style={styles.backText}>BACK</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">

//           <View style={styles.iconContainer}>
//             <MailCheckIcon />
//           </View>

//           <Text style={styles.title}>Verify Your Email</Text>
//           <Text style={styles.subtitle}>
//             {"We've sent a 6-digit secure code to"}{'\n'}
//             <Text style={styles.highlightEmail}>{email}</Text>
//           </Text>

//           <View style={styles.otpContainer}>
//             {code.map((digit, index) => (
//               <TextInput
//                 key={index}
//                 ref={(ref) => { inputs.current[index] = ref; }}
//                 style={[
//                   styles.otpBox,
//                   digit !== '' && styles.otpBoxFilled,
//                   error ? styles.otpBoxError : null
//                 ]}
//                 value={digit}
//                 onChangeText={(text) => handleChange(text, index)}
//                 onKeyPress={(e) => handleKeyPress(e, index)}
//                 keyboardType="number-pad"
//                 maxLength={1}
//                 selectTextOnFocus
//               />
//             ))}
//           </View>

//           {error ? <Text style={styles.errorText}>{error}</Text> : null}

//           <TouchableOpacity
//             style={[styles.verifyBtn, (loading || code.join('').length < 6) && styles.verifyBtnDisabled]}
//             onPress={handleVerify}
//             disabled={loading || code.join('').length < 6}
//             activeOpacity={0.85}
//           >
//             {loading ? (
//               <ActivityIndicator color="#0D1117" />
//             ) : (
//               <Text style={styles.verifyBtnText}>VERIFY & CONTINUE</Text>
//             )}
//           </TouchableOpacity>

//           <View style={styles.resendContainer}>
//             <Text style={styles.resendText}>{"Didn't receive the code? "}</Text>
//             {timer > 0 ? (
//               <Text style={styles.timerText}>Resend in {timer}s</Text>
//             ) : (
//               <TouchableOpacity onPress={handleResend}>
//                 <Text style={styles.resendLink}>Resend Code</Text>
//               </TouchableOpacity>
//             )}
//           </View>

//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   root: { flex: 1, backgroundColor: '#0D1117' },
//   topBar: {
//     paddingHorizontal: 16, paddingVertical: 14,
//     borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)',
//   },
//   backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
//   backArrow: { color: '#6B7280', fontSize: 16, fontWeight: '700' },
//   backText: {
//     fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 10, fontWeight: '700', letterSpacing: 1, color: '#6B7280',
//   },
//   scroll: { paddingHorizontal: 24, paddingTop: 40, paddingBottom: 50, alignItems: 'center' },
//   iconContainer: {
//     width: 80, height: 80, borderRadius: 40,
//     backgroundColor: '#161B22',
//     borderWidth: 1, borderColor: 'rgba(45,212,191,0.2)',
//     justifyContent: 'center', alignItems: 'center',
//     marginBottom: 24,
//   },
//   title: {
//     fontFamily: 'serif', fontSize: 26, fontWeight: '700', color: '#FFFFFF',
//     marginBottom: 12, textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 14, color: '#9CA3AF', lineHeight: 22, textAlign: 'center',
//     marginBottom: 40,
//   },
//   highlightEmail: { color: '#2DD4BF', fontWeight: '600' },
//   otpContainer: {
//     flexDirection: 'row', justifyContent: 'center', gap: 10,
//     marginBottom: 8, width: '100%',
//   },
//   otpBox: {
//     width: 45, height: 55,
//     backgroundColor: '#161B22',
//     borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)',
//     borderRadius: 8,
//     color: '#FFFFFF', fontSize: 24, fontWeight: '600', textAlign: 'center',
//   },
//   otpBoxFilled: {
//     borderColor: '#2DD4BF', backgroundColor: 'rgba(45,212,191,0.05)',
//   },
//   otpBoxError: {
//     borderColor: '#EF4444', backgroundColor: 'rgba(239,68,68,0.05)',
//   },
//   errorText: {
//     color: '#EF4444',
//     fontSize: 12,
//     marginBottom: 24,
//     textAlign: 'center',
//   },
//   verifyBtn: {
//     backgroundColor: '#2DD4BF', borderRadius: 8,
//     paddingVertical: 16, alignItems: 'center', width: '100%',
//     marginBottom: 24,
//   },
//   verifyBtnDisabled: { opacity: 0.5 },
//   verifyBtnText: {
//     color: '#0D1117', fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
//     fontSize: 13, fontWeight: '700', letterSpacing: 1.5,
//   },
//   resendContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
//   resendText: { color: '#6B7280', fontSize: 13 },
//   timerText: { color: '#F59E0B', fontSize: 13, fontWeight: '600' },
//   resendLink: { color: '#2DD4BF', fontSize: 13, fontWeight: '600' },
// });

import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import { API } from '../src/config/api';
import { AuthStorage } from '../src/utils/authStorage';

const MailCheckIcon = () => (
  <Svg width="48" height="48" viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" fill="rgba(45,212,191,0.1)" />
    <Path
      d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
      stroke="#2DD4BF"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Rect x="3" y="5" width="18" height="14" rx="2" stroke="#2DD4BF" strokeWidth="1.5" strokeLinecap="round" />
    <Path d="M15 15L17 17L21 13" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function EmailVerificationScreen() {
  const router = useRouter();
  const {
    email: emailParam,
    password: passwordParam,
    role: roleParam,
  } = useLocalSearchParams<{ email: string; password: string; role: string }>();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState('');

  const inputs = useRef<Array<TextInput | null>>([]);

  const email = emailParam || '';
  const password = passwordParam || '';
  const role = roleParam || 'reporter';

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (text: string, index: number) => {
    if (error) setError('');
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    if (text !== '' && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && index > 0 && code[index] === '') {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullCode = code.join('');
    if (fullCode.length < 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setLoading(true);

    try {
      // ── Step 1: Verify the OTP ──────────────────────────────────────────
      const verifyResponse = await fetch(API.VERIFY_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: fullCode }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyResponse.ok) {
        setError(verifyData.message || 'Invalid verification code. Please try again.');
        return;
      }

      // ── Step 2: Auto-login so the user gets a token immediately ─────────
      const loginEndpoint =
        role === 'security' ? API.SECURITY_LOGIN : API.REPORTER_LOGIN;

      const loginBody =
        role === 'security'
          ? { identifier: email, password }
          : { email, password };

      const loginResponse = await fetch(loginEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginBody),
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        // OTP verified fine — but auto-login failed for some reason.
        // Send them to manual login rather than leaving them tokenless.
        Alert.alert(
          'Almost there!',
          'Your email is verified. Please log in to continue.',
          [{ text: 'OK', onPress: () => router.replace('/reporter-login') }]
        );
        return;
      }

      // ── Step 3: Persist the token and user, then continue ───────────────
      await AuthStorage.saveSession(loginData.token, loginData.user);
      
      router.replace('/verification-success');

    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;

    try {
      const response = await fetch(API.RESEND_OTP, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert('Failed to Resend', data.message || 'Something went wrong.');
        return;
      }

      setTimer(60);
      Alert.alert('Code Sent', 'A new verification code has been sent to your email.');

    } catch (err) {
      Alert.alert('Network Error', 'Could not reach the server. Check your connection.');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.iconContainer}>
            <MailCheckIcon />
          </View>

          <Text style={styles.title}>Verify Your Email</Text>
          <Text style={styles.subtitle}>
            {"We've sent a 6-digit secure code to"}{'\n'}
            <Text style={styles.highlightEmail}>{email}</Text>
          </Text>

          <View style={styles.otpContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => { inputs.current[index] = ref; }}
                style={[
                  styles.otpBox,
                  digit !== '' && styles.otpBoxFilled,
                  error ? styles.otpBoxError : null,
                ]}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[
              styles.verifyBtn,
              (loading || code.join('').length < 6) && styles.verifyBtnDisabled,
            ]}
            onPress={handleVerify}
            disabled={loading || code.join('').length < 6}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#0D1117" />
            ) : (
              <Text style={styles.verifyBtnText}>VERIFY & CONTINUE</Text>
            )}
          </TouchableOpacity>

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>{"Didn't receive the code? "}</Text>
            {timer > 0 ? (
              <Text style={styles.timerText}>Resend in {timer}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResend}>
                <Text style={styles.resendLink}>Resend Code</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0D1117' },

  topBar: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  backBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  backArrow: { color: '#6B7280', fontSize: 16, fontWeight: '700' },
  backText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#6B7280',
  },

  scroll: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 50,
    alignItems: 'center',
  },

  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: 'rgba(45,212,191,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },

  title: {
    fontFamily: 'serif',
    fontSize: 26,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#9CA3AF',
    lineHeight: 22,
    textAlign: 'center',
    marginBottom: 40,
  },
  highlightEmail: { color: '#2DD4BF', fontWeight: '600' },

  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 8,
    width: '100%',
  },
  otpBox: {
    width: 45,
    height: 55,
    backgroundColor: '#161B22',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    borderRadius: 8,
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  otpBoxFilled: {
    borderColor: '#2DD4BF',
    backgroundColor: 'rgba(45,212,191,0.05)',
  },
  otpBoxError: {
    borderColor: '#EF4444',
    backgroundColor: 'rgba(239,68,68,0.05)',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginBottom: 24,
    textAlign: 'center',
  },

  verifyBtn: {
    backgroundColor: '#2DD4BF',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  verifyBtnDisabled: { opacity: 0.5 },
  verifyBtnText: {
    color: '#0D1117',
    fontFamily: Platform.OS === 'ios' ? 'Courier New' : 'monospace',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1.5,
  },

  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resendText: { color: '#6B7280', fontSize: 13 },
  timerText: { color: '#F59E0B', fontSize: 13, fontWeight: '600' },
  resendLink: { color: '#2DD4BF', fontSize: 13, fontWeight: '600' },
});