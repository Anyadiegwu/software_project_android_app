import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { colors } from '../../src/theme/index';

type IoniconsName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color, size = 24 }: { name: IoniconsName; color: string; size?: number }) {
  return <Ionicons name={name} size={size} color={color} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.ebonyDark,
          borderTopColor: 'rgba(255,255,255,0.06)',
          height: 64,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarActiveTintColor: colors.caribbeanGreen,   // teal #45D0B1
        tabBarInactiveTintColor: '#6B7280',
        tabBarLabelStyle: {
          fontSize: 9,
          fontWeight: '700',
          letterSpacing: 0.8,
          marginTop: 2,
        },
      }}
    >
      {/* ── Home ──────────────────────────────────────────────────────── */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'HOME',
          tabBarIcon: ({ color }) => (
            <TabIcon name="home" color={color} />
          ),
        }}
      />

      {/* ── Reports ───────────────────────────────────────────────────── */}
      <Tabs.Screen
        name="reports"
        options={{
          title: 'REPORTS',
          tabBarIcon: ({ color }) => (
            <TabIcon name="document-text" color={color} />
          ),
        }}
      />

      {/* ── SOS (center floating button) ─────────────────────────────── */}
      <Tabs.Screen
        name="sos"
        options={{
          title: 'SOS',
          tabBarIcon: () => (
            <View
              style={{
                backgroundColor: '#DC2626',
                width: 52,
                height: 52,
                borderRadius: 26,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: -22,
                borderWidth: 4,
                borderColor: colors.ebonyDark,
                // Shadow
                shadowColor: '#DC2626',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 8,
                elevation: 10,
              }}
            >
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: 13,
                  fontWeight: '900',
                  letterSpacing: 1,
                }}
              >
                SOS
              </Text>
            </View>
          ),
          tabBarLabelStyle: {
            fontSize: 9,
            fontWeight: '700',
            letterSpacing: 0.8,
            marginTop: 6,
          },
        }}
      />

      {/* ── Map ───────────────────────────────────────────────────────── */}
      <Tabs.Screen
        name="map"
        options={{
          title: 'MAP',
          tabBarIcon: ({ color }) => (
            <TabIcon name="map" color={color} />
          ),
        }}
      />

      {/* ── Profile ───────────────────────────────────────────────────── */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ color }) => (
            <TabIcon name="person" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
