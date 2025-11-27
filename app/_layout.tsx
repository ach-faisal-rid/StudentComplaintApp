import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Login' }} />
        <Stack.Screen name="register" options={{ title: 'Register' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="complaint-detail" options={{ title: 'Complaint Details' }} />
        <Stack.Screen name="edit-profile" options={{ title: 'Edit Profile' }} />
        <Stack.Screen name="change-password" options={{ title: 'Change Password' }} />
        <Stack.Screen name="notification-settings" options={{ title: 'Notification Settings' }} />
        <Stack.Screen name="milestones" options={{ title: 'Milestones' }} />
        <Stack.Screen name="contact-us" options={{ title: 'Contact Us' }} />
        <Stack.Screen name="create-complaint" options={{ title: 'Create Complaint' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}