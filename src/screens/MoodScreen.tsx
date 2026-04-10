import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

const MoodScreen = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  const moods = [
    { label: 'Productive', icon: '🚀' },
    { label: 'Stuck', icon: '🧱' },
    { label: 'Burned Out', icon: '🔥' },
    { label: 'Focused', icon: '🎯' },
    { label: 'Frustrated', icon: '😤' },
  ];

  const aiPrompts: Record<string, string> = {
    'Stuck': "Have you tried taking a 15-minute break? Sometimes a fresh pair of eyes is all you need.",
    'Burned Out': "It looks like you've been working hard. Have you eaten anything today or taken a walk?",
    'Focused': "You're in the zone! Keep going, but remember to stretch every hour.",
    'Frustrated': "Deep breaths. Maybe try explaining the problem out loud to a rubber duck?",
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>How are you feeling, Dev?</Text>
      <View style={styles.moodGrid}>
        {moods.map(mood => (
          <TouchableOpacity
            key={mood.label}
            style={[styles.moodCard, currentMood === mood.label && styles.selectedMood]}
            onPress={() => setCurrentMood(mood.label)}
          >
            <Text style={styles.moodIcon}>{mood.icon}</Text>
            <Text style={styles.moodLabel}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentMood && aiPrompts[currentMood] && (
        <View style={styles.aiCard}>
          <Text style={styles.aiTitle}>AI Stability Assistant</Text>
          <Text style={styles.aiText}>{aiPrompts[currentMood]}</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333', textAlign: 'center' },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  moodCard: { backgroundColor: '#fff', width: '45%', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 2 },
  selectedMood: { borderColor: '#007AFF', borderWidth: 2 },
  moodIcon: { fontSize: 32 },
  moodLabel: { marginTop: 10, fontWeight: '600' },
  aiCard: { backgroundColor: '#e3f2fd', padding: 20, borderRadius: 12, marginTop: 20, borderLeftWidth: 5, borderLeftColor: '#007AFF' },
  aiTitle: { fontWeight: 'bold', color: '#007AFF', marginBottom: 5 },
  aiText: { fontSize: 16, color: '#333', lineHeight: 22 }
});

export default MoodScreen;
