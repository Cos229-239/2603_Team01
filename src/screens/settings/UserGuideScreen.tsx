import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const UserGuideScreen = () => {
  const { colors, getFontSize } = useTheme();

  const sections = [
    {
      title: '📝 Creating Journal Entries',
      content: 'Journal entries help you reflect on your coding journey. Tap the "+" button or select "Log a bug" or "Quick Idea" from the home screen. Add a title, describe your thoughts, and tag the entry for easy organization later.'
    },
    {
      title: '🐤 Using Rubber Duck Mode',
      content: 'Rubber Duck debugging is a method where you explain your code problem out loud. Access Duck Mode from the home screen. Type or speak your problem, and sometimes just articulating it helps you find the solution!'
    },
    {
      title: '😊 Logging Your Mood',
      content: 'Track your emotional state throughout your coding sessions. Select an emoji that represents how you feel, then choose a subcategory that matches your current state. Use the stress slider to indicate your stress level from 0-10.'
    },
    {
      title: '📊 Viewing the Activity Grid',
      content: 'The Activity Grid shows your reflection patterns over time. Each square represents a day, with color intensity showing how active you were. Find it in your Settings > Account section to see your consistency at a glance.'
    },
    {
      title: '🌙 End of Day Reflection',
      content: 'Take a moment at the end of your coding session to reflect. Tap "End of day" on the home screen to record your overall mood, stress level, and any final thoughts about your day.'
    },
    {
      title: '⚙️ Managing Settings',
      content: 'Customize DevReflect to your preferences. Change themes in Appearance Settings, manage your account in Account Settings, and adjust privacy options in Privacy & Security. All settings are accessible from the Settings tab.'
    },
    {
      title: '🔍 Searching & Filtering',
      content: 'Find past entries quickly using the search feature in your Journal. Filter by tags like "Bug", "Solution", or "Quick Idea" to locate specific reflections. Your mood history can be viewed in the Mood tab.'
    },
    {
      title: '💾 Data & Privacy',
      content: 'Your data is securely stored and synced across your devices. You can export your data, clear local storage, or delete your account at any time from Storage Settings. Your privacy is our priority.'
    }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>User Guide</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Everything you need to know about DevReflect
        </Text>
      </View>

      {sections.map((section, index) => (
        <View 
          key={index} 
          style={[styles.card, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.cardTitle, { color: colors.text, fontSize: getFontSize(16) }]}>
            {section.title}
          </Text>
          <Text style={[styles.cardContent, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>
            {section.content}
          </Text>
        </View>
      ))}

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: getFontSize(13) }]}>
          Need more help? Contact us through the Help & Support section.
        </Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 10,
    lineHeight: 22,
  },
  cardContent: {
    lineHeight: 22,
  },
  footer: {
    marginTop: 10,
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default UserGuideScreen;