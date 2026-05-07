// src/utils/authStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY   = '@aegis_token';
const USER_KEY    = '@aegis_user';
const SESSION_KEY = '@aegis_session';
const KEEP_SIGNED_IN_KEY = '@aegis_keep_signed_in';

export interface StoredUser {
  _id: string;
  name?: string;
  email?: string;
  badgeNumber?: string;
  role: 'reporter' | 'security' | 'admin' | 'Security Personnel' | 'Crime Reporter';
  isVerified: boolean;
  isApproved: boolean;
}

export const AuthStorage = {
  async saveSession(token: string, user: StoredUser, keepSignedIn: boolean = true) {
    try {
      const sessionData = {
        email: user.email,
        role: user.role,
        loggedInAt: new Date().toISOString(),
      };

      await AsyncStorage.multiSet([
        [TOKEN_KEY, token],
        [USER_KEY, JSON.stringify(user)],
        [SESSION_KEY, JSON.stringify(sessionData)],
        [KEEP_SIGNED_IN_KEY, keepSignedIn ? 'true' : 'false'],
      ]);
    } catch (e) {
      console.error('AuthStorage: Error saving session', e);
    }
  },

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY);
  },

  async getUser(): Promise<StoredUser | null> {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  async getSession(): Promise<any | null> {
    const raw = await AsyncStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  async isKeepSignedIn(): Promise<boolean> {
    const val = await AsyncStorage.getItem(KEEP_SIGNED_IN_KEY);
    return val === 'true';
  },

  async clearSession() {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY, SESSION_KEY, KEEP_SIGNED_IN_KEY]);
  },
};