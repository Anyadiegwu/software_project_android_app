// App.js
// Root entry point for Aegis Safe Community — React Native
//
// Navigation: React Navigation v6 Stack
// Install required packages:
//   npx expo install @react-navigation/native @react-navigation/native-stack
//   npx expo install react-native-screens react-native-safe-area-context
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';

import DashboardScreen from '../src/typography/screens/DashboardScreen';
import WelcomeScreen from '../src/typography/screens/WelcomeScreen';
import SecurityRegistrationScreen from '../src/typography/screens/SecurityRegistrationScreen';

import { colors } from '../src/theme/index';

import ReporterLoginScreen from '../src/typography/screens/ReporterLoginScreen';
import ReporterSignUpScreen from '../src/typography/screens/ReporterSignUpScreen';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor={colors.ebony} />
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.ebony },
                    animation: 'fade',
                }}
            >
                <Stack.Screen name="Home" component={WelcomeScreen} />
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen
                    name="SecurityRegistration"
                    component={SecurityRegistrationScreen}
                    options={{ animation: 'slide_from_right' }}
                />
                <Stack.Screen name="ReporterLogin" component={ReporterLoginScreen} />
                <Stack.Screen name="ReporterSignUp" component={ReporterSignUpScreen} />
                <Stack.Screen name="SecurityLogin" component={ReporterLoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}