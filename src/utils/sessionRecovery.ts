/**
 * sessionRecovery.ts
 * Handles session persistence and recovery on app crashes
 * Prevents users from having to relogin after unexpected crashes
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStorage, StoredUser } from './authStorage';

const RECOVERY_KEY = '@aegis_recovery_state';
const RECOVERY_TIMESTAMP = '@aegis_recovery_timestamp';
const RECOVERY_TIMEOUT = 24 * 60 * 60 * 1000; // 24 hours

export interface RecoveryState {
  token: string | null;
  user: StoredUser | null;
  keepSignedIn: boolean;
  lastValidated: number; // timestamp
}

export const SessionRecovery = {
  /**
   * Save current session state for recovery on crash
   */
  async saveRecoveryState(): Promise<void> {
    try {
      const token = await AuthStorage.getToken();
      const user = await AuthStorage.getUser();
      const keepSignedIn = await AuthStorage.isKeepSignedIn();

      if (token && user) {
        const state: RecoveryState = {
          token,
          user,
          keepSignedIn: keepSignedIn ?? false,
          lastValidated: Date.now(),
        };

        await AsyncStorage.setItem(RECOVERY_KEY, JSON.stringify(state));
        await AsyncStorage.setItem(RECOVERY_TIMESTAMP, Date.now().toString());
      }
    } catch (e) {
      console.error('[SessionRecovery] Failed to save recovery state:', e);
      // Fail silently - don't crash the app
    }
  },

  /**
   * Attempt to recover session on app startup
   * Returns true if recovery was successful
   */
  async attemptRecovery(): Promise<boolean> {
    try {
      // Check if recovery state exists
      const recoveryJson = await AsyncStorage.getItem(RECOVERY_KEY);
      const timestamp = await AsyncStorage.getItem(RECOVERY_TIMESTAMP);

      if (!recoveryJson || !timestamp) {
        return false;
      }

      // Check if recovery state is not expired
      const recoveryTime = parseInt(timestamp, 10);
      if (Date.now() - recoveryTime > RECOVERY_TIMEOUT) {
        // Recovery state expired, clear it
        await this.clearRecoveryState();
        return false;
      }

      // Parse and restore session
      const state: RecoveryState = JSON.parse(recoveryJson);

      if (state.token && state.user) {
        // Restore session to AuthStorage
        await AuthStorage.saveSession(state.token, state.user, state.keepSignedIn);
        console.log('[SessionRecovery] Session recovered successfully');
        return true;
      }

      return false;
    } catch (e) {
      console.error('[SessionRecovery] Recovery attempt failed:', e);
      return false;
    }
  },

  /**
   * Clear recovery state (e.g., on logout)
   */
  async clearRecoveryState(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([RECOVERY_KEY, RECOVERY_TIMESTAMP]);
    } catch (e) {
      console.error('[SessionRecovery] Failed to clear recovery state:', e);
    }
  },

  /**
   * Validate token with backend (optional, requires network)
   * Returns true if token is still valid
   */
  async validateTokenWithBackend(token: string, apiUrl: string): Promise<boolean> {
    try {
      const response = await fetch(`${apiUrl}/api/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (e) {
      console.warn('[SessionRecovery] Token validation failed:', e);
      return false;
    }
  },
};

/**
 * Hook to auto-save recovery state on component mount
 * Use in main screens to periodically save session state
 */
export function useSessionRecoverySave() {
  return async () => {
    await SessionRecovery.saveRecoveryState();
  };
}
