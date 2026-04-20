import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import Theme Provider
import { ThemeProvider, useTheme } from './src/context/ThemeContext';

// Import Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import JournalEntryScreen from './src/screens/JournalEntryScreen';
import MoodScreen from './src/screens/MoodScreen';
import RubberDuckScreen from './src/screens/RubberDuckScreen';
import TestingScreen from './src/screens/Testing';
import HistoryScreen from './src/screens/HistoryScreen';
import TitleScreen from './src/screens/TitleScreen';
import LoginScreenTest from './src/screens/LoginScreenTest';


// Import Settings Screens
import SettingsScreen from './src/screens/settings/settings';
import AccountSettings from './src/screens/settings/AccountSettings';
import AppearanceSettings from './src/screens/settings/AppearanceSettings';
import NotificationsSettings from './src/screens/settings/NotificationsSettings';
import PrivacySecuritySettings from './src/screens/settings/PrivacySecuritySettings';
import HelpSupportSettings from './src/screens/settings/HelpSupportSettings';
import AboutAppSettings from './src/screens/settings/AboutAppSettings';
import StorageSettings from './src/screens/settings/StorageSettings';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const JournalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JournalList" component={JournalScreen} options={{ title: 'My Journal' }} />
      <Stack.Screen name="JournalEntry" component={JournalEntryScreen} options={{ title: 'New Entry' }} />
    </Stack.Navigator>
  );
};

const SettingsStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.primary,
        headerTitleStyle: {
          color: colors.text,
        },
      }}
    >
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: false,
        }}
      />
      <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ title: 'Account Settings' }} />
      <Stack.Screen name="AppearanceSettings" component={AppearanceSettings} options={{ title: 'Appearance Settings' }} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettings} options={{ title: 'Notifications Settings' }} />
      <Stack.Screen name="PrivacySecuritySettings" component={PrivacySecuritySettings} options={{ title: 'Privacy & Security Settings' }} />
      <Stack.Screen name="HelpSupportSettings" component={HelpSupportSettings} options={{ title: 'Help & Support Settings' }} />
      <Stack.Screen name="AboutAppSettings" component={AboutAppSettings} options={{ title: 'About App Settings' }} />
      <Stack.Screen name="StorageSettings" component={StorageSettings} options={{ title: 'Storage Settings' }} />
      {/* Commenting out Testing for now since it has a feature skeleton and is not fully implemented, but we can easily add it back to the stack when needed.
      {/* <Stack.Screen name="Testing" component={TestingScreen} options={{ title: 'Testing' }} /> */}
      <Stack.Screen name="HistoryScreen" component={HistoryScreen} options={{ title: 'History' }} />
      <Stack.Screen name="TitleScreen" component={TitleScreen} options={{ title: 'Title' }} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Journal" component={JournalStack} />
      <Tab.Screen name="Mood" component={MoodScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Rubber Duck" component={RubberDuckScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Settings" component={SettingsStack} options={{ headerShown: true }} />
      {/* <Tab.Screen name="Testing" component={TestingScreen} options={{ headerShown: true }} /> */}
      {/* <Tab.Screen name="History" component={HistoryScreen} options={{ headerShown: false }} /> */}
      {/* <Tab.Screen name="Title" component={TitleScreen} options={{ headerShown: true }} /> */}
      {/* <Tab.Screen name="LoginScreenTest" component={LoginScreenTest} options={{ headerShown: true }} /> */}
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { theme, colors } = useTheme();

  const navigationTheme = {
    ...(theme === 'dark' ? DarkTheme : DefaultTheme),
    colors: {
      ...(theme === 'dark' ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.card,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default App;