
export const BASE_URL = "https://software-project-backend-api.onrender.com";

/**
 * Fetch wrapper with timeout to prevent hangs on slow/lost connections
 * Default timeout: 15 seconds (configurable per request)
 */
export const fetchWithTimeout = async (
  url: string,
  options?: RequestInit & { timeout?: number }
): Promise<Response> => {
  const timeout = options?.timeout || 15000; // Default 15s
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

export const API = {
  // ── Auth ────────────────────────────────────────────────────────────────────
  REPORTER_REGISTER: `${BASE_URL}/api/auth/reporter/register`,
  REPORTER_LOGIN: `${BASE_URL}/api/auth/reporter/login`,
  SECURITY_REGISTER: `${BASE_URL}/api/auth/security/register`,
  SECURITY_LOGIN: `${BASE_URL}/api/auth/security/login`,
  ADMIN_REGISTER: `${BASE_URL}/api/auth/admin/register`,
  ADMIN_LOGIN: `${BASE_URL}/api/auth/admin/login`,
  VERIFY_OTP: `${BASE_URL}/api/auth/verify-otp`,
  RESEND_OTP: `${BASE_URL}/api/auth/resend-otp`,
  REQUEST_PASSWORD_RESET: `${BASE_URL}/api/auth/request-password-reset`,
  RESET_PASSWORD: `${BASE_URL}/api/auth/reset-password`,
  LOGOUT: `${BASE_URL}/api/auth/logout`,

  // ── Reporter ─────────────────────────────────────────────────────────────────
  CREATE_REPORT: `${BASE_URL}/api/reporter/report`,
  MY_REPORTS: `${BASE_URL}/api/reporter/my-reports`,
  DISTRESS: `${BASE_URL}/api/reporter/distress`,
  ALERTS: `${BASE_URL}/api/reporter/alerts`,
  COMMUNITY_WATCH: `${BASE_URL}/api/reporter/community-watch`,
  SAFETY_MAP: `${BASE_URL}/api/reporter/safety-map`,  // ← ADD THIS
  ANALYTICS: `${BASE_URL}/api/reporter/analytics`,
  REPORT_TIMELINE: (id: string) => `${BASE_URL}/api/reporter/report/${id}/timeline`,


  // In the API object, add these:

  // ── Security ─────────────────────────────────────────────────────────────────
  SECURITY_REPORTS: `${BASE_URL}/api/security/reports`,
  SECURITY_STATS: `${BASE_URL}/api/security/stats`,
  SECURITY_START_REPORT: (id: string) => `${BASE_URL}/api/security/report/${id}/start`,
  SECURITY_RESOLVE_REPORT: (id: string) => `${BASE_URL}/api/security/report/${id}/resolve`,
  SECURITY_REPORT_TIMELINE: (id: string) => `${BASE_URL}/api/security/report/${id}/timeline`,
  SECURITY_REPORT_DETAILS: (id: string) => `${BASE_URL}/api/security/report/${id}/details`,
  // ── User ─────────────────────────────────────────────────────────────────────
  MY_PROFILE: `${BASE_URL}/api/user/me`,
  UPDATE_PROFILE: `${BASE_URL}/api/user/me`,

  // ── Notifications ─────────────────────────────────────────────────────────────
  NOTIFICATIONS: `${BASE_URL}/api/notifications`,
  UNREAD_COUNT: `${BASE_URL}/api/notifications/unread-count`,
  MARK_ALL_READ: `${BASE_URL}/api/notifications/read-all`,
  MARK_READ: (id: string) => `${BASE_URL}/api/notifications/${id}/read`,
};