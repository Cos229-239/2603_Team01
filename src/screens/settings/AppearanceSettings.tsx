import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const AppearanceSettings = () => {
  const { theme, accentColor, fontSize, setTheme, setAccentColor, setFontSize, colors, getFontSize } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App Theme Section */}
      <Text style={[styles.sectionTitle, { color: colors.text, fontSize: getFontSize(20) }]}>App Theme</Text>

      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: colors.card,
            borderColor: theme === 'light' ? colors.primary : colors.border,
            borderWidth: theme === 'light' ? 2 : 1,
          },
        ]}
        onPress={() => setTheme('light')}
      >
        <Text
          style={[
            styles.optionText,
            { color: theme === 'light' ? colors.primary : colors.text, fontSize: getFontSize(16) },
          ]}
        >
          Light Mode
        </Text>
        {theme === 'light' && (
          <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: colors.card,
            borderColor: theme === 'dark' ? colors.primary : colors.border,
            borderWidth: theme === 'dark' ? 2 : 1,
          },
        ]}
        onPress={() => setTheme('dark')}
      >
        <Text
          style={[
            styles.optionText,
            { color: theme === 'dark' ? colors.primary : colors.text, fontSize: getFontSize(16) },
          ]}
        >
          Dark Mode
        </Text>
        {theme === 'dark' && (
          <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
        )}
      </TouchableOpacity>

      {/* Accent Color Section */}
      <Text style={[styles.sectionTitle, { color: colors.text, fontSize: getFontSize(20), marginTop: 30 }]}>
        Accent Color
      </Text>

      <View style={styles.colorGrid}>
        <AccentColorOption
          label="Blue"
          colorKey="blue"
          selected={accentColor === 'blue'}
          onPress={() => setAccentColor('blue')}
          colors={colors}
          fontSize={getFontSize(16)}
          displayColor="#007AFF"
        />
        <AccentColorOption
          label="Purple"
          colorKey="purple"
          selected={accentColor === 'purple'}
          onPress={() => setAccentColor('purple')}
          colors={colors}
          fontSize={getFontSize(16)}
          displayColor="#AF52DE"
        />
        <AccentColorOption
          label="Green"
          colorKey="green"
          selected={accentColor === 'green'}
          onPress={() => setAccentColor('green')}
          colors={colors}
          fontSize={getFontSize(16)}
          displayColor="#34C759"
        />
        <AccentColorOption
          label="Orange"
          colorKey="orange"
          selected={accentColor === 'orange'}
          onPress={() => setAccentColor('orange')}
          colors={colors}
          fontSize={getFontSize(16)}
          displayColor="#FF9500"
        />
      </View>

      {/* Font Size Section */}
      <Text style={[styles.sectionTitle, { color: colors.text, fontSize: getFontSize(20), marginTop: 30 }]}
        >
        Font Size
      </Text>

      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: colors.card,
            borderColor: fontSize === 'small' ? colors.primary : colors.border,
            borderWidth: fontSize === 'small' ? 2 : 1,
          },
        ]}
        onPress={() => setFontSize('small')}
      >
        <Text
          style={[
            styles.optionText,
            { color: fontSize === 'small' ? colors.primary : colors.text, fontSize: getFontSize(16) },
          ]}
        >
          Small
        </Text>
        {fontSize === 'small' && (
          <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: colors.card,
            borderColor: fontSize === 'medium' ? colors.primary : colors.border,
            borderWidth: fontSize === 'medium' ? 2 : 1,
          },
        ]}
        onPress={() => setFontSize('medium')}
      >
        <Text
          style={[
            styles.optionText,
            { color: fontSize === 'medium' ? colors.primary : colors.text, fontSize: getFontSize(16) },
          ]}
        >
          Medium
        </Text>
        {fontSize === 'medium' && (
          <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: colors.card,
            borderColor: fontSize === 'large' ? colors.primary : colors.border,
            borderWidth: fontSize === 'large' ? 2 : 1,
          },
        ]}
        onPress={() => setFontSize('large')}
      >
        <Text
          style={[
            styles.optionText,
            { color: fontSize === 'large' ? colors.primary : colors.text, fontSize: getFontSize(16) },
          ]}
        >
          Large
        </Text>
        {fontSize === 'large' && (
          <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
        )}
      </TouchableOpacity>

      {/* Preview Section */}
      <Text style={[styles.sectionTitle, { color: colors.text, fontSize: getFontSize(20), marginTop: 30 }]}>
        Preview
      </Text>

      <View style={[styles.previewCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.previewHeading, { color: colors.text, fontSize: getFontSize(24) }]}>
          DevReflect
        </Text>
        <Text style={[styles.previewBody, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>
          This is how your text will appear throughout the app with your selected theme, accent color, and font size.
        </Text>
        <TouchableOpacity
          style={[styles.previewButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.previewButtonText, { fontSize: getFontSize(16) }]}>
            Sample Button
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// Helper component for accent color options
const AccentColorOption = ({
  label,
  colorKey,
  selected,
  onPress,
  colors,
  fontSize,
  displayColor,
}: {
  label: string;
  colorKey: string;
  selected: boolean;
  onPress: () => void;
  colors: any;
  fontSize: number;
  displayColor: string;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.colorOption,
        {
          backgroundColor: colors.card,
          borderColor: selected ? colors.primary : colors.border,
          borderWidth: selected ? 2 : 1,
        },
      ]}
      onPress={onPress}
    >
      <View style={[styles.colorCircle, { backgroundColor: displayColor }]} />
      <Text
        style={[
          styles.colorLabel,
          { color: selected ? colors.primary : colors.text, fontSize },
        ]}
      >
        {label}
      </Text>
      {selected && (
        <Text style={[styles.checkmark, { color: colors.primary, position: 'absolute', right: 12 }]}>✓</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
  },
  optionText: {
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  colorOption: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    position: 'relative',
  },
  colorCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
  },
  colorLabel: {
    fontWeight: '500',
  },
  previewCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    marginTop: 10,
  },
  previewHeading: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  previewBody: {
    lineHeight: 20,
    marginBottom: 16,
  },
  previewButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  previewButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
});

export default AppearanceSettings;
