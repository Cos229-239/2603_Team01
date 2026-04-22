import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const insets = useSafeAreaInsets();
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          backgroundColor: isDarkMode ? '#0B0B0C' : '#FFFFFF',
        },
      ]}>
      <Text style={[styles.title, { color: isDarkMode ? '#FFFFFF' : '#111827' }]}>
        2603 Team01
      </Text>
      <Text style={[styles.subtitle, { color: isDarkMode ? '#D1D5DB' : '#4B5563' }]}>
        Running in Expo Go.
      </Text>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});

