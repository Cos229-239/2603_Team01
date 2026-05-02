import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';
import { useNavigation } from '@react-navigation/native';

const HelpSupportSettings = () => {
  const { colors, getFontSize } = useTheme();
  const navigation = useNavigation<any>();

  const handleContactSupport = async () => {
    console.log('Contact Support pressed');
    const email = 'support@devreflect.app';
    const subject = 'Support Request';
    const body = 'Hello DevReflect Support Team,\n\nI need assistance with:\n\n[Please describe your issue here]\n\nThank you!';
    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      console.log('Can open URL:', canOpen);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open email client');
      }
    } catch (error) {
      console.error('Email error:', error);
      Alert.alert('Error', 'Failed to open email client');
    }
  };

  const handleReportBug = async () => {
    console.log('Report Bug pressed');
    const email = 'support@devreflect.app';
    const subject = 'Bug Report';
    const body = `Bug Report for DevReflect

Description:
[Describe the bug you encountered]

Steps to Reproduce:
1. [First step]
2. [Second step]
3. [And so on...]

Expected Behavior:
[What you expected to happen]

Actual Behavior:
[What actually happened]

Device Information:
[Your device model and OS version]

Thank you for helping us improve DevReflect!`;

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      console.log('Can open URL:', canOpen);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open email client');
      }
    } catch (error) {
      console.error('Email error:', error);
      Alert.alert('Error', 'Failed to open email client');
    }
  };

  const handleFeedback = async () => {
    console.log('Send Feedback pressed');
    const email = 'support@devreflect.app';
    const subject = 'Feedback';
    const body = `Hello DevReflect Team,

I'd like to share my thoughts about the app:

[Please share your feedback, suggestions, or ideas here]

Thank you for creating DevReflect!`;

    const url = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    try {
      const canOpen = await Linking.canOpenURL(url);
      console.log('Can open URL:', canOpen);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open email client');
      }
    } catch (error) {
      console.error('Email error:', error);
      Alert.alert('Error', 'Failed to open email client');
    }
  };

  const handleCommunityForum = () => {
    console.log('Community Forum pressed');
    Alert.alert(
      'Coming Soon',
      'The Community Forum will be available in a future update. Stay tuned!',
      [{ text: 'OK' }]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Getting Started */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Getting Started" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="Welcome to DevReflect! Here you'll find helpful resources to make the most of your reflection journey."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Help Resources */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Help Resources" colors={colors} fontSize={getFontSize} />
        
        <HelpItem
          title="User Guide"
          description="Learn how to use all features of DevReflect"
          colors={colors}
          fontSize={getFontSize}
          onPress={() => navigation.navigate('UserGuide')}
        />
        <HelpItem
          title="FAQs"
          description="Find answers to commonly asked questions"
          colors={colors}
          fontSize={getFontSize}
          isLast
          onPress={() => navigation.navigate('FAQs')}
        />
      </SettingsCard>

      {/* Support */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Get Support" colors={colors} fontSize={getFontSize} />
        
        <TouchableOpacity 
          style={[styles.supportButton, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={handleContactSupport}
          activeOpacity={0.7}
        >
          <Text style={[styles.supportButtonText, { color: colors.text, fontSize: getFontSize(15) }]}>Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.supportButton, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={handleReportBug}
          activeOpacity={0.7}
        >
          <Text style={[styles.supportButtonText, { color: colors.text, fontSize: getFontSize(15) }]}>Report a Bug</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.supportButton, { backgroundColor: colors.primary }]} 
          onPress={handleFeedback}
          activeOpacity={0.7}
        >
          <Text style={[styles.supportButtonText, { color: '#fff', fontSize: getFontSize(15) }]}>Send Feedback</Text>
        </TouchableOpacity>
      </SettingsCard>

      {/* Community */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Community" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="Join our community of developers sharing their reflection journey and supporting each other."
          colors={colors}
          fontSize={getFontSize}
        />
        <TouchableOpacity 
          style={styles.communityLink} 
          onPress={handleCommunityForum}
          activeOpacity={0.7}
        >
          <Text style={[styles.communityLinkText, { color: colors.primary, fontSize: getFontSize(15) }]}>
            Visit Community Forum →
          </Text>
        </TouchableOpacity>
      </SettingsCard>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// Helper component for help items
const HelpItem = ({
  title,
  description,
  colors,
  fontSize,
  isLast = false,
  onPress,
}: {
  title: string;
  description: string;
  colors: any;
  fontSize: (size: number) => number;
  isLast?: boolean;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity 
      style={[styles.helpItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.helpBullet, { backgroundColor: colors.primary }]} />
      <View style={styles.helpContent}>
        <Text style={[styles.helpTitle, { color: colors.text, fontSize: fontSize(15) }]}>
          {title}
        </Text>
        <Text style={[styles.helpDescription, { color: colors.textSecondary, fontSize: fontSize(13) }]}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  helpItem: {
    flexDirection: 'row',
    paddingVertical: 14,
  },
  helpBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  helpDescription: {
    lineHeight: 18,
  },
  supportButton: {
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  supportButtonText: {
    fontWeight: '600',
  },
  communityLink: {
    paddingVertical: 12,
    marginTop: 8,
  },
  communityLinkText: {
    fontWeight: '600',
  },
});

export default HelpSupportSettings;
