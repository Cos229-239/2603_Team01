import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

const StorageSettings = () => {
  const { colors, getFontSize } = useTheme();

  const handleClearCache = () => {
    Alert.alert(
      'Clear Cache',
      'Are you sure you want to clear the cache? This will free up space but may slow down the app temporarily.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', onPress: () => {
          Alert.alert('Success', 'Cache cleared successfully!');
        }}
      ]
    );
  };

  const handleOptimizeStorage = () => {
    Alert.alert('Optimize Storage', 'This feature will be implemented soon.');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Storage Overview */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Storage Usage" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="Monitor and manage how DevReflect uses storage on your device."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Storage Breakdown */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Data Breakdown" colors={colors} fontSize={getFontSize} />
        
        <StorageItem
          label="Journal Entries"
          size="0 MB"
          colors={colors}
          fontSize={getFontSize}
        />
        <StorageItem
          label="Mood Data"
          size="0 MB"
          colors={colors}
          fontSize={getFontSize}
        />
        <StorageItem
          label="Cached Data"
          size="0 MB"
          colors={colors}
          fontSize={getFontSize}
        />
        <StorageItem
          label="Total Used"
          size="0 MB"
          colors={colors}
          fontSize={getFontSize}
          isLast
          isTotal
        />
      </SettingsCard>

      {/* Storage Actions */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Storage Management" colors={colors} fontSize={getFontSize} />
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={handleClearCache}
        >
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.text, fontSize: getFontSize(15) }]}>Clear Cache</Text>
            <Text style={[styles.actionSubtitle, { color: colors.textSecondary, fontSize: getFontSize(13) }]}>
              Free up space by clearing temporary files
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={handleOptimizeStorage}
        >
          <View style={styles.actionContent}>
            <Text style={[styles.actionTitle, { color: colors.text, fontSize: getFontSize(15) }]}>Optimize Storage</Text>
            <Text style={[styles.actionSubtitle, { color: colors.textSecondary, fontSize: getFontSize(13) }]}>
              Compress older entries to save space
            </Text>
          </View>
        </TouchableOpacity>
      </SettingsCard>

      {/* Storage Tips */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Storage Tips" colors={colors} fontSize={getFontSize} />
        
        <TipItem
          tip="Regularly export and archive old reflections to free up space"
          colors={colors}
          fontSize={getFontSize}
        />
        <TipItem
          tip="Clear cache periodically to maintain optimal performance"
          colors={colors}
          fontSize={getFontSize}
          isLast
        />
      </SettingsCard>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// Helper component for storage items
const StorageItem = ({
  label,
  size,
  colors,
  fontSize,
  isLast = false,
  isTotal = false,
}: {
  label: string;
  size: string;
  colors: any;
  fontSize: (size: number) => number;
  isLast?: boolean;
  isTotal?: boolean;
}) => {
  return (
    <View style={[styles.storageItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <Text style={[
        styles.storageLabel, 
        { color: isTotal ? colors.text : colors.textSecondary, fontSize: fontSize(15) },
        isTotal && { fontWeight: '600' }
      ]}>
        {label}
      </Text>
      <Text style={[
        styles.storageSize, 
        { color: isTotal ? colors.primary : colors.text, fontSize: fontSize(15) },
        isTotal && { fontWeight: 'bold' }
      ]}>
        {size}
      </Text>
    </View>
  );
};

// Helper component for tips
const TipItem = ({
  tip,
  colors,
  fontSize,
  isLast = false,
}: {
  tip: string;
  colors: any;
  fontSize: (size: number) => number;
  isLast?: boolean;
}) => {
  return (
    <View style={[styles.tipItem, !isLast && { borderBottomWidth: 1, borderBottomColor: colors.border }]}>
      <View style={[styles.tipBullet, { backgroundColor: colors.primary }]} />
      <Text style={[styles.tipText, { color: colors.textSecondary, fontSize: fontSize(13) }]}>
        {tip}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  storageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  storageLabel: {},
  storageSize: {},
  actionButton: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 10,
  },
  actionContent: {},
  actionTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  actionSubtitle: {
    lineHeight: 18,
  },
  tipItem: {
    flexDirection: 'row',
    paddingVertical: 14,
  },
  tipBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  tipText: {
    flex: 1,
    lineHeight: 18,
  },
});

export default StorageSettings;
