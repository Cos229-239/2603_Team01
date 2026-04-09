import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const navigation = useNavigation<any>();

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
    <ScrollView style={styles.container}>
      {settingsOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => navigation.navigate(option.screen)}
        >
          <Text style={styles.optionText}>{option.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  option: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  optionText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
