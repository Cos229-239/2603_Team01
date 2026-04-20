import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

const HelpSupportSettings = () => {
  const { colors, getFontSize } = useTheme();

  const handleContactSupport = () => {
    Alert.alert('Contact Support', 'Email us at support@devreflect.app');
  };

  const handleReportBug = () => {
    Alert.alert('Report a Bug', 'This feature will be implemented soon.');
  };

  const handleFeedback = () => {
    Alert.alert('Send Feedback', 'This feature will be implemented soon.');
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
        />
        <HelpItem
          title="FAQs"
          description="Find answers to commonly asked questions"
          colors={colors}
          fontSize={getFontSize}
        />
        <HelpItem
          title="Video Tutorials"
          description="Watch step-by-step guides and tips"
          colors={colors}
          fontSize={getFontSize}
          isLast
        />
      </SettingsCard>

      {/* Support */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Get Support" colors={colors} fontSize={getFontSize} />
        
        <TouchableOpacity 
          style={[styles.supportButton, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={handleContactSupport}
        >
          <Text style={[styles.supportButtonText, { color: colors.text, fontSize: getFontSize(15) }]}>Contact Support</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.supportButton, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={handleReportBug}
        >
          <Text style={[styles.supportButtonText, { color: colors.text, fontSize: getFontSize(15) }]}>Report a Bug</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.supportButton, { backgroundColor: colors.primary }]} 
          onPress={handleFeedback}
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
        <TouchableOpacity style={styles.communityLink}>
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
}: {
  title: string;
  description: string;
  colors: any;
  fontSize: (size: number) => number;
  isLast?: boolean;
}) => {
  return (
    <TouchableOpacity 
      style={[styles.helpItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]
    }
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
