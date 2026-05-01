import React from 'react';
import { Image } from 'react-native';
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
import TitleScreen from './src/screens/TitleScreen';
import LoginScreenTest from './src/screens/LoginScreenTest';


// Import Settings Screens
import SettingsScreen from './src/screens/settings/settings';
import AccountSettings from './src/screens/settings/AccountSettings';
import AppearanceSettings from './src/screens/settings/AppearanceSettings';
import NotificationsSettings from './src/screens/settings/NotificationsSettings';
import PrivacySecuritySettings from './src/screens/settings/PrivacySecuritySettings';
import PrivacyPolicyScreen from './src/screens/settings/PrivacyPolicyScreen';
import TermsOfServiceScreen from './src/screens/settings/TermsOfServiceScreen';
import HelpSupportSettings from './src/screens/settings/HelpSupportSettings';
import AboutAppSettings from './src/screens/settings/AboutAppSettings';
import StorageSettings from './src/screens/settings/StorageSettings';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const JournalStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="JournalList" component={JournalScreen} options={{ title: 'My Reflections' }} />
      <Stack.Screen name="JournalEntry" component={JournalEntryScreen} options={{ title: 'New Reflection' }} />
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
      <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="TermsOfServiceScreen" component={TermsOfServiceScreen} options={{ title: 'Terms of Service' }} />
      <Stack.Screen name="HelpSupportSettings" component={HelpSupportSettings} options={{ title: 'Help & Support Settings' }} />
      <Stack.Screen name="AboutAppSettings" component={AboutAppSettings} options={{ title: 'About App Settings' }} />
      <Stack.Screen name="StorageSettings" component={StorageSettings} options={{ title: 'Storage Settings' }} />
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
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./src/assets/images/home_icon_no-bg.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Reflections"
        component={JournalStack}
        options={{
          unmountOnBlur: true, // Reset stack when switching away from this tab
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./src/assets/images/journal_icon_no-bg.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default behavior and manually navigate to the root list
            e.preventDefault();
            navigation.navigate('Reflections', { screen: 'JournalList' });
          },
        })}
      />
      <Tab.Screen
        name="Mood"
        component={MoodScreen}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./src/assets/images/mood_icon_no-bg.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Rubber Duck"
        component={RubberDuckScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./src/assets/images/Wade_no-bg.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('./src/assets/images/settings_icon_no-bg.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      {/* <Tab.Screen name="LoginScreenTest" component={LoginScreenTest} options={{ headerShown: true }} / >*/}
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
      <Stack.Navigator initialRouteName="Title">
        <Stack.Screen
          name="Title"
          component={TitleScreen}
          options={{ headerShown: false }}
        />
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