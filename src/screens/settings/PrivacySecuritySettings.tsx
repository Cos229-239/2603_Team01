import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../../lib/supabase';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

const PrivacySecuritySettings = () => {
  const navigation = useNavigation();
  const { colors, getFontSize } = useTheme();
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [exportedData, setExportedData] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const biometricEnabled = await AsyncStorage.getItem('biometricAuthenticationEnabled');
      const analyticsEnabled = await AsyncStorage.getItem('anonymousAnalyticsEnabled');
      
      if (biometricEnabled !== null) {
        setBiometricAuth(biometricEnabled === 'true');
      }
      if (analyticsEnabled !== null) {
        setDataSharing(analyticsEnabled === 'true');
      }
    } catch (error) {
      console.error('Failed to load privacy settings:', error);
    }
  };

  const handleBiometricToggle = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('biometricAuthenticationEnabled', value.toString());
      setBiometricAuth(value);
      
      if (value) {
        Alert.alert(
          'Biometric Authentication',
          'Biometric authentication is a planned security feature and will be enabled in a future version. Your preference has been saved.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Failed to save biometric setting:', error);
      Alert.alert('Error', 'Failed to save biometric authentication setting.');
    }
  };

  const handleAnalyticsToggle = async (value: boolean) => {
    try {
      await AsyncStorage.setItem('anonymousAnalyticsEnabled', value.toString());
      setDataSharing(value);
    } catch (error) {
      console.error('Failed to save analytics setting:', error);
      Alert.alert('Error', 'Failed to save analytics setting.');
    }
  };

  const handleExportData = async () => {
    try {
      // Gather all user data from various sources
      const dataToExport: any = {
        exportDate: new Date().toISOString(),
        privacySettings: {
          biometricAuthenticationEnabled: biometricAuth,
          anonymousAnalyticsEnabled: dataSharing,
        },
        journalEntries: [],
        moodData: null,
        accountInfo: {
          email: null,
          username: null,
        },
      };

      // Get journal entries
      const journalEntriesRaw = await AsyncStorage.getItem('journal_entries');
      if (journalEntriesRaw) {
        dataToExport.journalEntries = JSON.parse(journalEntriesRaw);
      }

      // Get mood data
      const moodDataRaw = await AsyncStorage.getItem('mood_data');
      if (moodDataRaw) {
        dataToExport.moodData = JSON.parse(moodDataRaw);
      }

      // Get account info from Supabase
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!error && data?.user) {
          dataToExport.accountInfo.email = data.user.email || null;
          dataToExport.accountInfo.username = data.user.user_metadata?.username || 
                                              (data.user.email ? data.user.email.split('@')[0] : null);
        }
      } catch (authError) {
        console.error('Could not fetch auth data:', authError);
        // Continue without auth data
      }

      // Get theme preferences
      const themePreference = await AsyncStorage.getItem('theme');
      if (themePreference) {
        dataToExport.themePreference = themePreference;
      }

      // Get font size preferences
      const fontSizePreference = await AsyncStorage.getItem('fontSize');
      if (fontSizePreference) {
        dataToExport.fontSizePreference = fontSizePreference;
      }

      const jsonData = JSON.stringify(dataToExport, null, 2);
      setExportedData(jsonData);
      setExportModalVisible(true);
    } catch (error) {
      console.error('Failed to export data:', error);
      Alert.alert('Error', 'Failed to export your data. Please try again.');
    }
  };

  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete All Data',
      'Are you sure you want to delete all your local app data?\n\nThis will delete:\n• Journal entries\n• Mood logs\n• Privacy settings\n• Theme preferences\n\nThis action cannot be undone.\n\nNote: Your account login will not be deleted.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: async () => {
            try {
              // List of known app data keys to delete
              const keysToDelete = [
                'journal_entries',
                'mood_data',
                'biometricAuthenticationEnabled',
                'anonymousAnalyticsEnabled',
                'theme',
                'fontSize',
              ];

              // Delete each key individually
              await Promise.all(keysToDelete.map(key => AsyncStorage.removeItem(key)));

              // Reset local state
              setBiometricAuth(false);
              setDataSharing(false);

              Alert.alert(
                'Data Deleted',
                'All local app data has been successfully deleted.',
                [{ text: 'OK' }]
              );
            } catch (error) {
              console.error('Failed to delete data:', error);
              Alert.alert('Error', 'Failed to delete all data. Please try again.');
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Privacy Overview */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Your Privacy Matters" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect is committed to protecting your personal data. Your reflections and mood data are stored securely and never shared without your permission."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Security Settings */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Security" colors={colors} fontSize={getFontSize} />
        
        <PrivacyToggle
          label="Biometric Authentication"
          description="Use fingerprint or face recognition to access the app"
          value={biometricAuth}
          onValueChange={handleBiometricToggle}
          colors={colors}
          fontSize={getFontSize}
        />

        <PrivacyToggle
          label="Anonymous Analytics"
          description="Help improve DevReflect by sharing anonymous usage data"
          value={dataSharing}
          onValueChange={handleAnalyticsToggle}
          colors={colors}
          fontSize={getFontSize}
          isLast
        />
      </SettingsCard>

      {/* Data Management */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Data Management" colors={colors} fontSize={getFontSize} />
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={handleExportData}
        >
          <Text style={[styles.actionButtonText, { color: colors.text, fontSize: getFontSize(15) }]}>Export My Data</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.dangerButton]} 
          onPress={handleDeleteAllData}
        >
          <Text style={[styles.actionButtonText, styles.dangerButtonText, { fontSize: getFontSize(15) }]}>
            Delete All Data
          </Text>
        </TouchableOpacity>
      </SettingsCard>

      {/* Legal Information */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Legal" colors={colors} fontSize={getFontSize} />
        
        <TouchableOpacity 
          style={styles.legalLink}
          onPress={() => navigation.navigate('PrivacyPolicyScreen' as never)}
        >
          <Text style={[styles.legalLinkText, { color: colors.primary, fontSize: getFontSize(15) }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.legalLink}
          onPress={() => navigation.navigate('TermsOfServiceScreen' as never)}
        >
          <Text style={[styles.legalLinkText, { color: colors.primary, fontSize: getFontSize(15) }]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
      </SettingsCard>

      {/* Export Data Modal */}
      <Modal
        visible={exportModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setExportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            <Text style={[styles.modalTitle, { color: colors.text, fontSize: getFontSize(18) }]}>Exported Data</Text>
            <ScrollView style={styles.modalScrollView}>
              <Text style={[styles.exportedDataText, { color: colors.text, fontSize: getFontSize(12) }]}>
                {exportedData}
              </Text>
            </ScrollView>
            <Text style={[styles.modalNote, { color: colors.textSecondary, fontSize: getFontSize(12) }]}>
              Copy this data to save it. In a future version, you'll be able to download it as a file.
            </Text>
            <TouchableOpacity 
              style={[styles.closeButton, { backgroundColor: colors.primary }]}
              onPress={() => setExportModalVisible(false)}
            >
              <Text style={[styles.closeButtonText, { fontSize: getFontSize(15) }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// Helper component for privacy toggles
const PrivacyToggle = ({
  label,
  description,
  value,
  onValueChange,
  colors,
  fontSize,
  isLast = false,
}: {
  label: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  colors: any;
  fontSize: (size: number) => number;
  isLast?: boolean;
}) => {
  return (
    <View style={[styles.toggleItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <View style={styles.toggleContent}>
        <Text style={[styles.toggleLabel, { color: colors.text, fontSize: fontSize(15) }]}>
          {label}
        </Text>
        <Text style={[styles.toggleDescription, { color: colors.textSecondary, fontSize: fontSize(13) }]}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: colors.border, true: colors.primary }}
        thumbColor="#ffffff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  toggleContent: {
    flex: 1,
    marginRight: 12,
  },
  toggleLabel: {
    fontWeight: '600',
    marginBottom: 4,
  },
  toggleDescription: {
    lineHeight: 18,
  },
  actionButton: {
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontWeight: '600',
  },
  dangerButton: {
    borderColor: '#FF3B30',
    backgroundColor: 'transparent',
  },
  dangerButtonText: {
    color: '#FF3B30',
  },
  legalLink: {
    paddingVertical: 12,
  },
  legalLinkText: {
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalScrollView: {
    maxHeight: 400,
    marginBottom: 15,
  },
  exportedDataText: {
    fontFamily: 'monospace',
    lineHeight: 18,
  },
  modalNote: {
    fontStyle: 'italic',
    marginBottom: 15,
    textAlign: 'center',
  },
  closeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default PrivacySecuritySettings;
