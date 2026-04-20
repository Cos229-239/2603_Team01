import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

// Reusable Section Card Component
export const SettingsCard = ({ 
  colors, 
  children,
  style 
}: { 
  colors: any; 
  children: React.ReactNode;
  style?: ViewStyle;
}) => {
  return (
    <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }, style]}>
      {children}
    </View>
  );
};

// Reusable Section Header Component
export const SectionHeader = ({
  title,
  colors,
  fontSize,
  style
}: {
  title: string;
  colors: any;
  fontSize: (size: number) => number;
  style?: TextStyle;
}) => {
  return (
    <Text style={[styles.sectionTitle, { color: colors.text, fontSize: fontSize(18) }, style]}>
      {title}
    </Text>
  );
};

// Reusable Description Text Component
export const DescriptionText = ({
  text,
  colors,
  fontSize,
  style
}: {
  text: string;
  colors: any;
  fontSize: (size: number) => number;
  style?: TextStyle;
}) => {
  return (
    <Text style={[styles.descriptionText, { color: colors.textSecondary, fontSize: fontSize(14) }, style]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  sectionCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  descriptionText: {
    lineHeight: 20,
  },
});