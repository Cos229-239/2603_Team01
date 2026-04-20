import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader } from './components/SettingsComponents';

const AppearanceSettings = () => {
  const { theme, accentColor, fontSize, setTheme, setAccentColor, setFontSize, colors, getFontSize } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* App Theme Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="App Theme" colors={colors} fontSize={getFontSize} />

        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: colors.background,
              borderColor: theme === 'light' ? colors.primary : colors.border,
              borderWidth: theme === 'light' ? 2 : 1,
            },
          ]}
          onPress={() => setTheme('light')}
        >
          <Text
            style={[
              styles.optionText,
              { color: theme === 'light' ? colors.primary : colors.text, fontSize: getFontSize(15) },
            ]}
          >
            Light Mode
          </Text>
          {theme === 'light' && (
            <Text style={[styles.checkmark, { color: colors.primary, fontSize: getFontSize(18) }]}>✓</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: colors.background,
              borderColor: theme === 'dark' ? colors.primary : colors.border,
              borderWidth: theme === 'dark' ? 2 : 1,
            },
          ]}
          onPress={() => setTheme('dark')}
        >
          <Text
            style={[
              styles.optionText,
              { color: theme === 'dark' ? colors.primary : colors.text, fontSize: getFontSize(15) },
            ]}
          >
            Dark Mode
          </Text>
          {theme === 'dark' && (
            <Text style={[styles.checkmark, { color: colors.primary, fontSize: getFontSize(18) }]}>✓</Text>
          )}
        </TouchableOpacity>
      </SettingsCard>

      {/* Accent Color Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Accent Color" colors={colors} fontSize={getFontSize} />

        <View style={styles.colorGrid}>
          <AccentColorOption
            label="Blue"
            colorKey="blue"
            selected={accentColor === 'blue'}
            onPress={() => setAccentColor('blue')}
            colors={colors}
            fontSize={getFontSize}
            displayColor="#007AFF"
          />
          <AccentColorOption
            label="Purple"
            colorKey="purple"
            selected={accentColor === 'purple'}
            onPress={() => setAccentColor('purple')}
            colors={colors}
            fontSize={getFontSize}
            displayColor="#AF52DE"
          />
          <AccentColorOption
            label="Green"
            colorKey="green"
            selected={accentColor === 'green'}
            onPress={() => setAccentColor('green')}
            colors={colors}
            fontSize={getFontSize}
            displayColor="#34C759"
          />
          <AccentColorOption
            label="Orange"
            colorKey="orange"
            selected={accentColor === 'orange'}
            onPress={() => setAccentColor('orange')}
            colors={colors}
            fontSize={getFontSize}
            displayColor="#FF9500"
          />
        </View>
      </SettingsCard>

      {/* Font Size Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Font Size" colors={colors} fontSize={getFontSize} />

        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: colors.background,
              borderColor: fontSize === 'small' ? colors.primary : colors.border,
              borderWidth: fontSize === 'small' ? 2 : 1,
            },
          ]}
          onPress={() => setFontSize('small')}
        >
          <Text
            style={[
              styles.optionText,
              { color: fontSize === 'small' ? colors.primary : colors.text, fontSize: getFontSize(15) },
            ]}
          >
            Small
          </Text>
          {fontSize === 'small' && (
            <Text style={[styles.checkmark, { color: colors.primary, fontSize: getFontSize(18) }]}>✓</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: colors.background,
              borderColor: fontSize === 'medium' ? colors.primary : colors.border,
              borderWidth: fontSize === 'medium' ? 2 : 1,
            },
          ]}
          onPress={() => setFontSize('medium')}
        >
          <Text
            style={[
              styles.optionText,
              { color: fontSize === 'medium' ? colors.primary : colors.text, fontSize: getFontSize(15) },
            ]}
          >
            Medium
          </Text>
          {fontSize === 'medium' && (
            <Text style={[styles.checkmark, { color: colors.primary, fontSize: getFontSize(18) }]}>✓</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: colors.background,
              borderColor: fontSize === 'large' ? colors.primary : colors.border,
              borderWidth: fontSize === 'large' ? 2 : 1,
            },
          ]}
          onPress={() => setFontSize('large')}
        >
          <Text
            style={[
              styles.optionText,
              { color: fontSize === 'large' ? colors.primary : colors.text, fontSize: getFontSize(15) },
            ]}
          >
            Large
          </Text>
          {fontSize === 'large' && (
            <Text style={[styles.checkmark, { color: colors.primary, fontSize: getFontSize(18) }]}>✓</Text>
          )}
        </TouchableOpacity>
      </SettingsCard>

      {/* Preview Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Preview" colors={colors} fontSize={getFontSize} />
        <Text style={[styles.previewHeading, { color: colors.text, fontSize: getFontSize(24) }]}>
          DevReflect
        </Text>
        <Text style={[styles.previewBody, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>
          This is how your text will appear throughout the app with your selected theme, accent color, and font size.
        </Text>
        <TouchableOpacity
          style={[styles.previewButton, { backgroundColor: colors.primary }]}
        >
          <Text style={[styles.previewButtonText, { fontSize: getFontSize(15) }]}>
            Sample Button
          </Text>
        </TouchableOpacity>
      </SettingsCard>

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
  fontSize: (size: number) => number;
  displayColor: string;
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.colorOption,
        {
          backgroundColor: colors.background,
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
          { color: selected ? colors.primary : colors.text, fontSize: fontSize(15) },
        ]}
      >
        {label}
      </Text>
      {selected && (
        <Text style={[styles.checkmark, { color: colors.primary, position: 'absolute', right: 12, fontSize: fontSize(18) }]}>✓</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontWeight: '600',
  },
  checkmark: {
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
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 10,
    position: 'relative',
  },
  colorCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
  colorLabel: {
    fontWeight: '600',
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
