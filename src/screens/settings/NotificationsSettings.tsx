import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

const NotificationsSettings = () => {
  const navigation = useNavigation();
  const { colors, getFontSize } = useTheme();
  const [dailyReminders, setDailyReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [moodTracking, setMoodTracking] = useState(true);
  const [achievements, setAchievements] = useState(true);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Notification Preferences */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Notification Preferences" colors={colors} fontSize={getFontSize} />
        <DescriptionText 
          text="Customize when and how you receive notifications from DevReflect."
          colors={colors}
          fontSize={getFontSize}
        />
      </SettingsCard>

      {/* Reminder Settings */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Reminders" colors={colors} fontSize={getFontSize} />
        
        <NotificationToggle
          label="Daily Reflection Reminder"
          description="Get reminded to write your daily reflection"
          value={dailyReminders}
          onValueChange={setDailyReminders}
          colors={colors}
          fontSize={getFontSize}
        />

        <NotificationToggle
          label="Weekly Summary Report"
          description="Receive a summary of your week's reflections"
          value={weeklyReports}
          onValueChange={setWeeklyReports}
          colors={colors}
          fontSize={getFontSize}
          isLast
        />
      </SettingsCard>

      {/* Activity Notifications */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Activity" colors={colors} fontSize={getFontSize} />
        
        <NotificationToggle
          label="Mood Tracking Reminders"
          description="Get prompted to track your mood throughout the day"
          value={moodTracking}
          onValueChange={setMoodTracking}
          colors={colors}
          fontSize={getFontSize}
        />

        <NotificationToggle
          label="Achievement Notifications"
          description="Be notified when you reach milestones"
          value={achievements}
          onValueChange={setAchievements}
          colors={colors}
          fontSize={getFontSize}
          isLast
        />
      </SettingsCard>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

// Helper component for notification toggles
const NotificationToggle = ({
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
});

export default NotificationsSettings;
