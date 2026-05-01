import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface FAQ {
  question: string;
  answer: string;
}

const FAQScreen = () => {
  const { colors, getFontSize } = useTheme();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      question: 'Is my data private and secure?',
      answer: 'Yes! Your journal entries, mood logs, and personal reflections are encrypted and stored securely. We never share your data with third parties. You have full control over your data and can export or delete it at any time.'
    },
    {
      question: 'Can I use DevReflect offline?',
      answer: 'Absolutely! DevReflect works offline and will automatically sync your entries when you reconnect to the internet. All your reflections are stored locally first, ensuring you never lose your thoughts.'
    },
    {
      question: 'How do I recover deleted entries?',
      answer: 'Currently, deleted entries cannot be recovered. We recommend being careful when deleting entries. In a future update, we plan to add a "trash" feature with a recovery period before permanent deletion.'
    },
    {
      question: 'What is Rubber Duck debugging?',
      answer: 'Rubber Duck debugging is a method where you explain your code or problem out loud (or in writing) to an inanimate object, like a rubber duck. The act of explaining often helps you discover the solution yourself!'
    },
    {
      question: 'How does mood tracking help developers?',
      answer: 'Tracking your mood helps you identify patterns between your emotional state and productivity. Understanding when you feel frustrated or in flow state can help you optimize your work schedule and recognize when to take breaks.'
    },
    {
      question: 'Can I export my journal entries?',
      answer: 'Yes! Go to Settings > Storage Settings to export all your data. You can download your entries in a readable format for backup or personal records.'
    },
    {
      question: 'How often should I reflect?',
      answer: 'There\'s no right answer! Some developers reflect daily, others after solving major bugs or completing features. Use DevReflect in a way that works best for your workflow. Even weekly reflections can provide valuable insights.'
    },
    {
      question: 'What happens if I delete my account?',
      answer: 'When you delete your account, all your data is permanently removed from our servers within 30 days. Make sure to export your data first if you want to keep a copy of your reflections.'
    },
    {
      question: 'Can I use DevReflect on multiple devices?',
      answer: 'Yes! Your data automatically syncs across all devices where you\'re signed in with the same account. Changes made on one device will appear on others when connected to the internet.'
    },
    {
      question: 'Do you have a web version?',
      answer: 'Not yet, but it\'s on our roadmap! Currently, DevReflect is available as a mobile app. We\'re working on bringing the same experience to web browsers in the future.'
    }
  ];

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Frequently Asked Questions</Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>
          Find quick answers to common questions
        </Text>
      </View>

      {faqs.map((faq, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: colors.card }]}
          onPress={() => toggleExpand(index)}
          activeOpacity={0.7}
        >
          <View style={styles.questionContainer}>
            <Text style={[styles.question, { color: colors.text, fontSize: getFontSize(15) }]}>
              {faq.question}
            </Text>
            <Text style={[styles.expandIcon, { color: colors.primary }]}>
              {expandedIndex === index ? '−' : '+'}
            </Text>
          </View>
          {expandedIndex === index && (
            <Text style={[styles.answer, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>
              {faq.answer}
            </Text>
          )}
        </TouchableOpacity>
      ))}

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: getFontSize(13) }]}>
          Can't find what you're looking for?
        </Text>
        <Text style={[styles.footerText, { color: colors.textSecondary, fontSize: getFontSize(13) }]}>
          Contact us through the Help & Support section.
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
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  question: {
    fontWeight: '600',
    flex: 1,
    lineHeight: 22,
  },
  expandIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  answer: {
    marginTop: 12,
    lineHeight: 22,
  },
  footer: {
    marginTop: 20,
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default FAQScreen;