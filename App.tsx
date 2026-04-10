import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import JournalEntryScreen from './src/screens/JournalEntryScreen';
import MoodScreen from './src/screens/MoodScreen';
import RubberDuckScreen from './src/screens/RubberDuckScreen';

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
  return (
    <Stack.Navigator>
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Settings' }} />
      <Stack.Screen name="AccountSettings" component={AccountSettings} options={{ title: 'Account Settings' }} />
      <Stack.Screen name="AppearanceSettings" component={AppearanceSettings} options={{ title: 'Appearance Settings' }} />
      <Stack.Screen name="NotificationsSettings" component={NotificationsSettings} options={{ title: 'Notifications Settings' }} />
      <Stack.Screen name="PrivacySecuritySettings" component={PrivacySecuritySettings} options={{ title: 'Privacy & Security Settings' }} />
      <Stack.Screen name="HelpSupportSettings" component={HelpSupportSettings} options={{ title: 'Help & Support Settings' }} />
      <Stack.Screen name="AboutAppSettings" component={AboutAppSettings} options={{ title: 'About App Settings' }} />
      <Stack.Screen name="StorageSettings" component={StorageSettings} options={{ title: 'Storage Settings' }} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#007AFF', headerShown: false }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Journal" component={JournalStack} />
      <Tab.Screen name="Mood" component={MoodScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Rubber Duck" component={RubberDuckScreen} options={{ headerShown: true }} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
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
    </SafeAreaProvider>
  );
};

export default App;
