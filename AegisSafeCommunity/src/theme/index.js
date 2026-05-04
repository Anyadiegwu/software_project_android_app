// Aegis Safe Community — Design Tokens
// Ported from global.css

export const colors = {
    caribbeanGreen: '#00D09C', // Updated to match exact Figma teal color
    tealAccent: '#14C7A7',
    ebony: '#0D1526',
    ebonyDark: '#0A0F1E',
    ebonyDarker: '#0B0F1A',
    navyDrawer: '#1A1F26',
    primaryAccent: '#00D09C',
    secondaryAccent: '#FFB800',
    dangerRed: '#FF4D4D',
    bigStone: '#161F35',
    cloudBurst: '#1C2640',
    buttercup: '#F59E0B',
    dodgerBlue: '#3B82F6',
    mountainMeadow: '#22C55E',
    white: '#FFFFFF',
    palesky: '#6B7280',
    grayCharcoal: '#9CA3AF',
    athensGray: '#E5E7EB',
    background: '#080e1a',
    glassBorder: 'rgba(255,255,255,0.1)',
    glassBg: 'rgba(255,255,255,0.03)',
};

// Glassmorphism card style (reusable)
export const glassCard = {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: 16,
};

export const typography = {
    // Playfair Display equivalent — use system serif or a loaded font
    heading: {
        fontFamily: 'serif',
        color: colors.white,
    },
    // DM Sans equivalent
    body: {
        fontFamily: 'System',
        color: colors.white,
    },
    // DM Mono equivalent
    mono: {
        fontFamily: 'monospace',
        color: colors.caribbeanGreen,
    },
};