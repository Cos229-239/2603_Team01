import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

const AboutAppSettings = () => {
  const { colors, getFontSize } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App Header */}
      <View style={styles.headerSection}>
        <Text style={[styles.appName, { color: colors.primary, fontSize: getFontSize(32) }]}>
          DevReflect
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary, fontSize: getFontSize(16) }]}>
          A developer reflection app for tracking progress, challenges, and growth.
        </Text>
        <Text style={[styles.version, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>
          Version 0.1.0
        </Text>
      </View>

      {/* Description Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="About DevReflect" colors={colors} fontSize={getFontSize} />
        <DescriptionText
          text="DevReflect is designed to help developers reflect on their daily work, track their emotional well-being, and overcome challenges through structured journaling and mood tracking. Whether you're debugging complex issues or celebrating wins, DevReflect is your personal companion for growth."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Key Features Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Key Features" colors={colors} fontSize={getFontSize} />
        <FeatureItem
          title="Journal Reflections"
          description="Document your daily experiences and learnings"
          colors={colors}
          fontSize={getFontSize}
        />
        <FeatureItem
          title="Mood Tracking"
          description="Monitor your emotional patterns over time"
          colors={colors}
          fontSize={getFontSize}
        />
        <FeatureItem
          title="Rubber Duck Debugging"
          description="Talk through problems to find solutions"
          colors={colors}
          fontSize={getFontSize}
        />
        <FeatureItem
          title="Personalized Settings"
          description="Customize themes, colors, and font sizes"
          colors={colors}
          fontSize={getFontSize}
          isLast
        />
      </SettingsCard>

      {/* Built By Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Built By" colors={colors} fontSize={getFontSize} />
        <Text style={[styles.teamText, { color: colors.text, fontSize: getFontSize(15) }]}>
          Team 1
        </Text>
        <Text style={[styles.teamDescription, { color: colors.textSecondary, fontSize: getFontSize(13) }]}>
          A dedicated group of developers passionate about creating tools for personal and professional growth.
        </Text>
      </SettingsCard>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: getFontSize(12) }]}>
          © 2026 DevReflect
        </Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// Helper component for feature items
const FeatureItem = ({
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
    <View style={[styles.featureItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <View style={[styles.featureBullet, { backgroundColor: colors.primary }]} />
      <View style={styles.featureContent}>
        <Text style={[styles.featureTitle, { color: colors.text, fontSize: fontSize(15) }]}>
          {title}
        </Text>
        <Text style={[styles.featureDescription, { color: colors.textSecondary, fontSize: fontSize(13) }]}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 25,
    paddingTop: 10,
  },
  appName: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  version: {
    fontWeight: '500',
    opacity: 0.8,
  },
  featureItem: {
    flexDirection: 'row',
    paddingVertical: 14,
  },
  featureBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    lineHeight: 18,
  },
  teamText: {
    fontWeight: '600',
    marginBottom: 8,
  },
  teamDescription: {
    lineHeight: 18,
    fontStyle: 'italic',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  footerText: {
    fontWeight: '500',
  },
});

export default AboutAppSettings;
