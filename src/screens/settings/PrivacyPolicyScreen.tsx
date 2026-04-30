import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();
  const { colors, getFontSize } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Privacy Policy" colors={colors} fontSize={getFontSize} />
        <Text style={[styles.lastUpdated, { color: colors.textSecondary, fontSize: getFontSize(12) }]}>
          Last Updated: April 29, 2026
        </Text>
      </SettingsCard>

      {/* Introduction */}
      <SettingsCard colors={colors}>
        <SectionHeader title="1. Introduction" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect is a student-developed reflection and mood tracking application designed to help developers track their personal growth and well-being. We take your privacy seriously and are committed to protecting your personal information."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Information We Collect */}
      <SettingsCard colors={colors}>
        <SectionHeader title="2. Information We Collect" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect collects and stores the following types of information:"
          colors={colors}
          fontSize={getFontSize}
        />
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Account Information: Email address and authentication credentials
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Journal Entries: Daily reflections, thoughts, and notes you create
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Mood Logs: Your mood tracking data and emotional check-ins
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Usage Data: App interaction patterns and feature usage statistics
        </Text>
      </SettingsCard>

      {/* How We Store Your Data */}
      <SettingsCard colors={colors}>
        <SectionHeader title="3. How We Store Your Data" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="Your data is stored using a combination of local device storage and secure cloud-based storage through Supabase. Journal entries and mood logs are encrypted and stored securely. We use industry-standard security measures to protect your information from unauthorized access."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* How We Use Your Information */}
      <SettingsCard colors={colors}>
        <SectionHeader title="4. How We Use Your Information" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="We use your information solely to:"
          colors={colors}
          fontSize={getFontSize}
        />
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Provide and maintain the DevReflect application
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Sync your journal entries and mood logs across devices
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Send you reminders and notifications (if enabled)
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Improve app functionality and user experience
        </Text>
      </SettingsCard>

      {/* Data Sharing */}
      <SettingsCard colors={colors}>
        <SectionHeader title="5. Data Sharing and Disclosure" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="We do not sell, trade, or rent your personal information to third parties. Your journal entries and mood logs are private and remain yours. We will never share your personal data with advertisers or marketing companies. Data may only be disclosed if required by law or to protect our rights and safety."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Your Rights */}
      <SettingsCard colors={colors}>
        <SectionHeader title="6. Your Rights" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="You have the right to:"
          colors={colors}
          fontSize={getFontSize}
        />
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Access and export all your data at any time
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Delete your account and all associated data
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Opt-out of notifications and reminders
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Request corrections to your account information
        </Text>
      </SettingsCard>

      {/* Data Retention */}
      <SettingsCard colors={colors}>
        <SectionHeader title="7. Data Retention" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="We retain your data for as long as your account is active. If you delete your account, all your personal data, journal entries, and mood logs will be permanently deleted from our servers within 30 days. Local data on your device can be cleared through the Storage Settings."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Third-Party Services */}
      <SettingsCard colors={colors}>
        <SectionHeader title="8. Third-Party Services" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect uses the following third-party services: Supabase for authentication and data storage, and Google Gemini AI for the Rubber Duck debugging feature. Please review their respective privacy policies for information on how they handle data."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Children's Privacy */}
      <SettingsCard colors={colors}>
        <SectionHeader title="9. Children's Privacy" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect is not intended for use by children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Changes to Privacy Policy */}
      <SettingsCard colors={colors}>
        <SectionHeader title="10. Changes to This Policy" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="We may update this Privacy Policy from time to time. We will notify you of any changes by updating the 'Last Updated' date at the top of this policy. Continued use of the app after changes constitutes acceptance of the updated policy."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Contact */}
      <SettingsCard colors={colors}>
        <SectionHeader title="11. Contact Us" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="If you have any questions or concerns about this Privacy Policy, please contact us through the Help & Support section in Settings."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lastUpdated: {
    fontStyle: 'italic',
    marginTop: 8,
  },
  bulletPoint: {
    marginTop: 8,
    lineHeight: 20,
  },
});

export default PrivacyPolicyScreen;