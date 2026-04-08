import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import Slider from '@react-native-community/slider';

const MoodScreen = () => {
  const [currentMood, setCurrentMood] = useState<string | null>(null);

  const [sliderValue, setSliderValue] = useState(0);

  const [stressTips, setStressTips] = useState('');


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


   const handleSlidingComplete = (value: number) => {
       setSliderValue(value)
       if (value <= 0) {
           setStressTips('Stress Level 0: Doing Great\nKeep up the good work!')
       } else if (value <= 1) {
           setStressTips('Stress Level 1: Feeling Anxious\nTry playing some instrumental music to help soothe your nerves.')
       } else if (value <= 2) {
           setStressTips("Stress Level 2: Building Uncertainty\nDon't be afraid to ask for help from your peers if you begin to feel lost or confused.")
       } else if (value <= 3) {
           setStressTips('Stress Level 3: Mentally Struggling\nMake sure you develop a healthy work-life balance to prevent your stress from increasing')
       } else if (value <= 4) {
           setStressTips('Stress Level 4: Stressed Out\nSplitting your tasks into smaller parts can make a large workload easier to manage.')
       } else if (value <= 5) {
           setStressTips('Stress Level 5: Completely Overwhelmed\nTaking a break from your work will help you reset, recharge, and approach the sitaution from a different angle. ')
       }
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


       <Text style={styles.stressTitle}>Stress Level: {sliderValue}</Text>

          <Slider

              style={styles.slider}


              minimumValue={0}
              maximumValue={5}

              step={.25}

              minimumTrackTintColor="#E00C0C"
              maximumTrackTintColor="#00FF00"

              thumbTintColor = "#000000"

              onValueChange={(value) => setSliderValue(value)}
              value={sliderValue}


              onSlidingComplete={handleSlidingComplete}
          />
          <Text style={styles.stressText}>{stressTips}</Text>
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
    aiText: { fontSize: 16, color: '#333', lineHeight: 22 },


    stressTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 20, color: '#333', textAlign: 'center' },
    stressText: { fontSize: 16, color: '#333', textAlign: 'center' },
    slider: { width: '100%', minHeight: 50 }
});

export default MoodScreen;