import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';

const SettingsScreen = () => {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  const settingsOptions = [
    { title: 'Account', screen: 'AccountSettings' },
    { title: 'Appearance', screen: 'AppearanceSettings' },
    { title: 'Notifications', screen: 'NotificationsSettings' },
    { title: 'Privacy & Security', screen: 'PrivacySecuritySettings' },
    { title: 'Help & Support', screen: 'HelpSupportSettings' },
    { title: 'About App', screen: 'AboutAppSettings' },
    { title: 'Storage', screen: 'StorageSettings' },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.option, { backgroundColor: colors.card, borderBottomColor: colors.border }]}
          onPress={() => navigation.navigate(option.screen)}
        >
          <Text style={[styles.optionText, { color: colors.text }]}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
