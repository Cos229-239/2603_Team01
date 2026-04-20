import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

const PrivacySecuritySettings = () => {
  const { colors, getFontSize } = useTheme();
  const [biometricAuth, setBiometricAuth] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);

  const handleExportData = () => {
    Alert.alert('Export Data', 'This feature will be implemented soon.');
  };

  const handleDeleteAllData = () => {
    Alert.alert(
      'Delete All Data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert('Delete All Data', 'This feature will be implemented soon.');
        }}
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
          onValueChange={setBiometricAuth}
          colors={colors}
          fontSize={getFontSize}
        />

        <PrivacyToggle
          label="Anonymous Analytics"
          description="Help improve DevReflect by sharing anonymous usage data"
          value={dataSharing}
          onValueChange={setDataSharing}
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
        
        <TouchableOpacity style={styles.legalLink}>
          <Text style={[styles.legalLinkText, { color: colors.primary, fontSize: getFontSize(15) }]}>
            Privacy Policy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.legalLink}>
          <Text style={[styles.legalLinkText, { color: colors.primary, fontSize: getFontSize(15) }]}>
            Terms of Service
          </Text>
        </TouchableOpacity>
      </SettingsCard>

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
});

export default PrivacySecuritySettings;
