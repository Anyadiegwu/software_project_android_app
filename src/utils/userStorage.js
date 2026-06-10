/**
 * userStorage.js
 * Central utility for reading/writing the logged-in user's profile
 * from AsyncStorage. Used by login, sign-up, home, and profile screens.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_PROFILE_KEY    = '@aegis_user_profile';
export const KEEP_SIGNED_IN_KEY  = '@aegis_keep_signed_in';
export const SESSION_KEY         = '@aegis_session';

/**
 * Save a user profile object to storage.
 * @param {{ displayName: string, email: string, role?: string }} profile
 */
export async function saveUserProfile(profile) {
    try {
        await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
    } catch (e) {
        console.warn('userStorage: failed to save profile');
    }
}

/**
 * Load the stored user profile. Returns null if nothing is saved.
 * @returns {Promise<{ displayName: string, email: string, role?: string } | null>}
 */
export async function loadUserProfile() {
    try {
        const raw = await AsyncStorage.getItem(USER_PROFILE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) {
        console.warn('userStorage: failed to load profile');
        return null;
    }
}

/**
 * Clear all session & profile data (used on sign-out).
 */
export async function clearUserSession() {
    try {
        await AsyncStorage.multiRemove([USER_PROFILE_KEY, KEEP_SIGNED_IN_KEY, SESSION_KEY]);
    } catch (e) {
        console.warn('userStorage: failed to clear session');
    }
}

/**
 * Returns initials (up to 2 characters) from a display name.
 * e.g. "Amaka Obi" → "AO", "Anonymous01" → "AN"
 */
export function getInitials(displayName = '') {
    const parts = displayName.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return displayName.substring(0, 2).toUpperCase() || 'ME';
}
