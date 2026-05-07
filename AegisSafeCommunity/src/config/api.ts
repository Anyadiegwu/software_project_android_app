// // // import axios from "axios";

// // // const API = axios.create({
// // //   baseURL: "https://software-project-backend-api.onrender.com/api",
// // // });

// // // // Attach token automatically
// // // import AsyncStorage from "@react-native-async-storage/async-storage";

// // // API.interceptors.request.use(async (config) => {
// // //   const token = await AsyncStorage.getItem("token");

// // //   if (token) {
// // //     config.headers.Authorization = `Bearer ${token}`;
// // //   }

// // //   return config;
// // // });

// // // src/config/api.ts
// // // Change BASE_URL here and it updates everywhere.

// // // Android emulator  → 'http://10.0.2.2:5000'
// // // iOS simulator     → 'http://localhost:5000'
// // // Physical device   → 'http://YOUR_LAN_IP:5000'  e.g. 192.168.1.5

// // export const BASE_URL = 'http://10.170.172.21:5000';

// // export const API = {
// //   // Auth
// //   REPORTER_LOGIN:         `${BASE_URL}/api/auth/reporter/login`,
// //   REPORTER_REGISTER:      `${BASE_URL}/api/auth/reporter/register`,
// //   SECURITY_LOGIN:         `${BASE_URL}/api/auth/security/login`,
// //   SECURITY_REGISTER:      `${BASE_URL}/api/auth/security/register`,
// //   ADMIN_LOGIN:            `${BASE_URL}/api/auth/admin/login`,

// //   VERIFY_OTP:             `${BASE_URL}/api/auth/verify-otp`,
// //   RESEND_OTP:             `${BASE_URL}/api/auth/resend-otp`,
// //   REQUEST_PASSWORD_RESET: `${BASE_URL}/api/auth/request-password-reset`,
// //   RESET_PASSWORD:         `${BASE_URL}/api/auth/reset-password`,
// //   LOGOUT:                 `${BASE_URL}/api/auth/logout`,

// //   // Reporter
// //   REPORTER_MY_REPORTS:      `${BASE_URL}/api/reporter/my-reports`,
// //   REPORTER_CREATE_REPORT:   `${BASE_URL}/api/reporter/report`,
// //   REPORTER_ALERTS:          `${BASE_URL}/api/reporter/alerts`,
// //   REPORTER_DISTRESS:        `${BASE_URL}/api/reporter/distress`,
// //   REPORTER_ANALYTICS:       `${BASE_URL}/api/reporter/analytics`,
// //   REPORTER_COMMUNITY_WATCH: `${BASE_URL}/api/reporter/community-watch`,
// //   CREATE_REPORT: `${BASE_URL}/api/reporter/report`,
// //   REPORT_EVIDENCE: (reportId: string) => `${BASE_URL}/api/reporter/report/${reportId}/evidence`,
// //   MY_REPORTS: `${BASE_URL}/api/reporter/my-reports`,
// //   // Security
// //   SECURITY_REPORTS: `${BASE_URL}/api/security/reports`,
// //   SECURITY_STATS:   `${BASE_URL}/api/security/stats`,

// //   // Notifications
// //   NOTIFICATIONS:        `${BASE_URL}/api/notifications`,
// //   NOTIFICATIONS_UNREAD: `${BASE_URL}/api/notifications/unread-count`,
// // } as const;


// // ─── Base URL ─────────────────────────────────────────────────────────────────
// // Change this to your deployed URL when you go to production.
const BASE_URL = 'http://10.170.172.2:5000';
export const API = {
  // ── Auth ────────────────────────────────────────────────────────────────────
  REPORTER_REGISTER:        `${BASE_URL}/api/auth/reporter/register`,
  REPORTER_LOGIN:           `${BASE_URL}/api/auth/reporter/login`,
  SECURITY_REGISTER:        `${BASE_URL}/api/auth/security/register`,
  SECURITY_LOGIN:           `${BASE_URL}/api/auth/security/login`,
  ADMIN_REGISTER:           `${BASE_URL}/api/auth/admin/register`,
  ADMIN_LOGIN:              `${BASE_URL}/api/auth/admin/login`,
  VERIFY_OTP:               `${BASE_URL}/api/auth/verify-otp`,
  RESEND_OTP:               `${BASE_URL}/api/auth/resend-otp`,
  REQUEST_PASSWORD_RESET:   `${BASE_URL}/api/auth/request-password-reset`,
  RESET_PASSWORD:           `${BASE_URL}/api/auth/reset-password`,
  LOGOUT:                   `${BASE_URL}/api/auth/logout`,

  // ── Reporter ─────────────────────────────────────────────────────────────────
  CREATE_REPORT:            `${BASE_URL}/api/reporter/report`,
  MY_REPORTS:               `${BASE_URL}/api/reporter/my-reports`,
  DISTRESS:                 `${BASE_URL}/api/reporter/distress`,
  ALERTS:                   `${BASE_URL}/api/reporter/alerts`,
  COMMUNITY_WATCH:          `${BASE_URL}/api/reporter/community-watch`,
  SAFETY_MAP:               `${BASE_URL}/api/reporter/safety-map`,  // ← ADD THIS
  ANALYTICS:                `${BASE_URL}/api/reporter/analytics`,
  REPORT_TIMELINE: (id: string) => `${BASE_URL}/api/reporter/report/${id}/timeline`,


  // In the API object, add these:

    // ── Security ─────────────────────────────────────────────────────────────────
    SECURITY_REPORTS:          `${BASE_URL}/api/security/reports`,
    SECURITY_STATS:            `${BASE_URL}/api/security/stats`,
    SECURITY_START_REPORT: (id: string) => `${BASE_URL}/api/security/report/${id}/start`,
    SECURITY_RESOLVE_REPORT: (id: string) => `${BASE_URL}/api/security/report/${id}/resolve`,
    SECURITY_REPORT_TIMELINE: (id: string) => `${BASE_URL}/api/security/report/${id}/timeline`,
    SECURITY_REPORT_DETAILS: (id: string) => `${BASE_URL}/api/security/report/${id}/details`,
  // ── User ─────────────────────────────────────────────────────────────────────
  MY_PROFILE:               `${BASE_URL}/api/user/me`,
  UPDATE_PROFILE:           `${BASE_URL}/api/user/me`,

  // ── Notifications ─────────────────────────────────────────────────────────────
  NOTIFICATIONS:            `${BASE_URL}/api/notifications`,
  UNREAD_COUNT:             `${BASE_URL}/api/notifications/unread-count`,
  MARK_ALL_READ:            `${BASE_URL}/api/notifications/read-all`,
  MARK_READ: (id: string) => `${BASE_URL}/api/notifications/${id}/read`,
};