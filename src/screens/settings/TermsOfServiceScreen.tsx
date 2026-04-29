import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

const TermsOfServiceScreen = () => {
  const navigation = useNavigation();
  const { colors, getFontSize } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Terms of Service" colors={colors} fontSize={getFontSize} />
        <Text style={[styles.lastUpdated, { color: colors.textSecondary, fontSize: getFontSize(12) }]}>
          Last Updated: April 29, 2026
        </Text>
      </SettingsCard>

      {/* Acceptance of Terms */}
      <SettingsCard colors={colors}>
        <SectionHeader title="1. Acceptance of Terms" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="By accessing and using DevReflect, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this application. DevReflect is a student-developed prototype application created for educational purposes."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Description of Service */}
      <SettingsCard colors={colors}>
        <SectionHeader title="2. Description of Service" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect is a personal reflection and mood tracking application designed to help developers document their thoughts, track emotional well-being, and engage in rubber duck debugging. The service includes journal entry creation, mood logging, progress tracking, and AI-assisted debugging conversations."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Prototype/Educational Use */}
      <SettingsCard colors={colors}>
        <SectionHeader title="3. Prototype & Educational Use" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect is a student project and prototype application. While we strive to provide a reliable and useful service, the app is provided 'as-is' without warranties of any kind. Features may change, be added, or removed without notice. The application is not a commercial product and is intended primarily for educational and personal development purposes."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* User Accounts */}
      <SettingsCard colors={colors}>
        <SectionHeader title="4. User Accounts" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="To use DevReflect, you must create an account with a valid email address. You are responsible for:"
          colors={colors}
          fontSize={getFontSize}
        />
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Maintaining the confidentiality of your account credentials
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • All activities that occur under your account
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Notifying us immediately of any unauthorized access
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Providing accurate and current information
        </Text>
      </SettingsCard>

      {/* User Content */}
      <SettingsCard colors={colors}>
        <SectionHeader title="5. User Content & Responsibility" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="You are solely responsible for all content you create, including journal entries, mood logs, and notes. You retain all rights to your content. By using DevReflect, you grant us a limited license to store and display your content solely for the purpose of providing the service to you. We do not claim ownership of your personal reflections or data."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Not Medical Advice */}
      <SettingsCard colors={colors}>
        <SectionHeader title="6. Not Medical or Mental Health Advice" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="IMPORTANT: DevReflect is NOT a mental health service, therapy tool, or medical application. The app is designed for personal reflection and self-awareness only. It does not provide medical advice, diagnosis, or treatment. If you are experiencing mental health concerns, please consult with a qualified healthcare professional. In case of emergency, contact local emergency services immediately."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Acceptable Use */}
      <SettingsCard colors={colors}>
        <SectionHeader title="7. Acceptable Use" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="You agree not to:"
          colors={colors}
          fontSize={getFontSize}
        />
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Use the app for any illegal or unauthorized purpose
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Attempt to gain unauthorized access to the app or its systems
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Reverse engineer, decompile, or disassemble the application
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Use the app to harass, abuse, or harm others
        </Text>
        <Text style={[styles.bulletPoint, { color: colors.text, fontSize: getFontSize(14) }]}>
          • Transmit viruses, malware, or malicious code
        </Text>
      </SettingsCard>

      {/* AI Features */}
      <SettingsCard colors={colors}>
        <SectionHeader title="8. AI-Powered Features" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect includes AI-powered features such as the Rubber Duck debugging assistant powered by Google Gemini AI. These features are experimental and may not always provide accurate or complete information. You should verify any technical advice or suggestions independently. AI-generated responses should not be considered professional advice."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Data & Storage Limitations */}
      <SettingsCard colors={colors}>
        <SectionHeader title="9. Data & Storage Limitations" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="As a prototype application, DevReflect may have limitations on data storage, account retention, and service availability. We will make reasonable efforts to preserve your data, but we cannot guarantee uninterrupted access or permanent storage. We recommend regularly exporting your data as a backup."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Service Availability */}
      <SettingsCard colors={colors}>
        <SectionHeader title="10. Service Availability" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="We strive to provide reliable service, but DevReflect may experience downtime, interruptions, or be temporarily unavailable for maintenance. As a student project, the service may be discontinued at any time. We will provide reasonable notice if the service is to be permanently discontinued."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Intellectual Property */}
      <SettingsCard colors={colors}>
        <SectionHeader title="11. Intellectual Property" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="The DevReflect application, including its design, code, features, and branding, is the intellectual property of the DevReflect development team. You may not copy, modify, or distribute the application without explicit permission. Your personal content remains yours, as described in section 5."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Limitation of Liability */}
      <SettingsCard colors={colors}>
        <SectionHeader title="12. Limitation of Liability" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="DevReflect is provided 'as-is' without warranties of any kind. The developers and contributors shall not be liable for any damages arising from the use or inability to use the application, including but not limited to data loss, service interruptions, or inaccurate information. You use the app at your own risk."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Account Termination */}
      <SettingsCard colors={colors}>
        <SectionHeader title="13. Account Termination" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="You may delete your account at any time through the Privacy & Security settings. We reserve the right to suspend or terminate accounts that violate these Terms of Service. Upon termination, your data will be deleted in accordance with our Privacy Policy."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Changes to Terms */}
      <SettingsCard colors={colors}>
        <SectionHeader title="14. Changes to Terms" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="We may modify these Terms of Service at any time. We will notify users of significant changes by updating the 'Last Updated' date. Continued use of DevReflect after changes constitutes acceptance of the modified terms."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Contact */}
      <SettingsCard colors={colors}>
        <SectionHeader title="15. Contact Us" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="If you have questions about these Terms of Service, please contact us through the Help & Support section in Settings."
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

export default TermsOfServiceScreen;