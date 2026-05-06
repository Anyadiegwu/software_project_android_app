// src/utils/authStorage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY   = '@aegis_token';
const USER_KEY    = '@aegis_user';
const SESSION_KEY = '@aegis_session';

export interface StoredUser {
  _id: string;
  name?: string;
  email?: string;
  badgeNumber?: string;
  role: 'reporter' | 'security' | 'admin';
  isVerified: boolean;
  isApproved: boolean;
}

export const AuthStorage = {
  async saveSession(token: string, user: StoredUser) {
    await AsyncStorage.multiSet([
      [TOKEN_KEY, token],
      [USER_KEY, JSON.stringify(user)],
    ]);
  },

  async getToken(): Promise<string | null> {
    return AsyncStorage.getItem(TOKEN_KEY);
  },

  async getUser(): Promise<StoredUser | null> {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  async clearSession() {
    await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY, SESSION_KEY]);
  },
};