import PrivacySettingsScreen from '../src/typography/screens/PrivacySettingsScreen';
import { useRouter } from 'expo-router';

export default function PrivacySettings() {
    const router = useRouter();

    const navigation = {
        goBack: () => router.back(),
        navigate: (name: string) => {
            if (name === 'DeleteAccount') router.push('/delete-account');
            if (name === 'PrivacySettings') router.push('/privacy-settings');
        },
    };

    return <PrivacySettingsScreen navigation={navigation} />;
}
