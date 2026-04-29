import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../context/ThemeContext';
import { SettingsCard, SectionHeader, DescriptionText } from './components/SettingsComponents';

// AsyncStorage keys for notification preferences
const STORAGE_KEYS = {
  DAILY_REMINDER: 'notification_daily_reflection_reminder',
  WEEKLY_REPORT: 'notification_weekly_summary_report',
  MOOD_TRACKING: 'notification_mood_tracking_reminders',
  ACHIEVEMENTS: 'notification_achievement_notifications',
};

const NotificationsSettings = () => {
  const navigation = useNavigation();
  const { colors, getFontSize } = useTheme();
  const [dailyReminders, setDailyReminders] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [moodTracking, setMoodTracking] = useState(true);
  const [achievements, setAchievements] = useState(true);

  // Load notification preferences when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadNotificationPreferences();
    }, [])
  );

  const loadNotificationPreferences = async () => {
    try {
      const [daily, weekly, mood, achievement] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.DAILY_REMINDER),
        AsyncStorage.getItem(STORAGE_KEYS.WEEKLY_REPORT),
        AsyncStorage.getItem(STORAGE_KEYS.MOOD_TRACKING),
        AsyncStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS),
      ]);

      // Parse stored values, defaulting to initial state if not found
      setDailyReminders(daily !== null ? JSON.parse(daily) : true);
      setWeeklyReports(weekly !== null ? JSON.parse(weekly) : false);
      setMoodTracking(mood !== null ? JSON.parse(mood) : true);
      setAchievements(achievement !== null ? JSON.parse(achievement) : true);
    } catch (error) {
      console.error('Failed to load notification preferences:', error);
    }
  };

  const handleDailyRemindersChange = async (value: boolean) => {
    setDailyReminders(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.DAILY_REMINDER, JSON.stringify(value));
      
      // TODO: Call Supabase Edge Function to update scheduled email notifications
      // if (value) {
      //   await supabase.functions.invoke('schedule-daily-reminder', { 
      //     userId: user.id,
      //     enabled: true 
      //   });
      // } else {
      //   await supabase.functions.invoke('cancel-daily-reminder', { 
      //     userId: user.id 
      //   });
      // }
    } catch (error) {
      console.error('Failed to save daily reminder preference:', error);
    }
  };

  const handleWeeklyReportsChange = async (value: boolean) => {
    setWeeklyReports(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.WEEKLY_REPORT, JSON.stringify(value));
      
      // TODO: Call Supabase Edge Function to update weekly email reports
      // if (value) {
      //   await supabase.functions.invoke('schedule-weekly-report', { 
      //     userId: user.id,
      //     enabled: true 
      //   });
      // } else {
      //   await supabase.functions.invoke('cancel-weekly-report', { 
      //     userId: user.id 
      //   });
      // }
    } catch (error) {
      console.error('Failed to save weekly report preference:', error);
    }
  };

  const handleMoodTrackingChange = async (value: boolean) => {
    setMoodTracking(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MOOD_TRACKING, JSON.stringify(value));
      
      // TODO: Schedule/cancel local push notifications for mood tracking
      // if (value) {
      //   await schedulePushNotifications({
      //     type: 'mood-tracking',
      //     times: ['09:00', '13:00', '18:00'] // Example: morning, afternoon, evening
      //   });
      // } else {
      //   await cancelPushNotifications({ type: 'mood-tracking' });
      // }
    } catch (error) {
      console.error('Failed to save mood tracking preference:', error);
    }
  };

  const handleAchievementsChange = async (value: boolean) => {
    setAchievements(value);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(value));
      
      // TODO: Update user preference in Supabase for achievement notifications
      // await supabase
      //   .from('user_preferences')
      //   .update({ achievement_notifications_enabled: value })
      //   .eq('user_id', user.id);
      //
      // Backend would check this preference before sending push notifications
      // when achievements are unlocked
    } catch (error) {
      console.error('Failed to save achievement preference:', error);
    }
  };

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
          onValueChange={handleDailyRemindersChange}
          colors={colors}
          fontSize={getFontSize}
        />

        <NotificationToggle
          label="Weekly Summary Report"
          description="Receive a summary of your week's reflections"
          value={weeklyReports}
          onValueChange={handleWeeklyReportsChange}
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
          onValueChange={handleMoodTrackingChange}
          colors={colors}
          fontSize={getFontSize}
        />

        <NotificationToggle
          label="Achievement Notifications"
          description="Be notified when you reach milestones"
          value={achievements}
          onValueChange={handleAchievementsChange}
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
