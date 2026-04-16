import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import Slider from '@react-native-community/slider';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = () => {
  const [lastEntry, setLastEntry] = useState<any>(null);
  const [lastMood, setLastMood] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  const [sliderValue, setSliderValue] = useState(0);
  const [userMood, setMood] = useState('');
  const isFocused = useIsFocused();
  const { colors } = useTheme();

  const loadData = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('journal_entries');
      if (savedEntries) {
        const entries = JSON.parse(savedEntries);
        if (entries.length > 0) {
          setLastEntry(entries[0]); // Most recent entry
        }
      }

      const savedMood = await AsyncStorage.getItem('last_mood');
      if (savedMood) {
        setLastMood(JSON.parse(savedMood));
      }
    } catch (error) {
      console.error('Failed to load home data', error);
    }
  };

  const fetchUser = async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
        setUsername('');
        return;
      }
      
      if (data?.user) {
        // Priority 1: Check if username exists in user_metadata
        let displayUsername = data.user.user_metadata?.username;
        
        // Priority 2: Fallback to email-based username
        if (!displayUsername && data.user.email) {
          displayUsername = data.user.email.split('@')[0];
        }
        
        setUsername(displayUsername || '');
      } else {
        setUsername('');
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
      setUsername('');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadData();
      fetchUser();
    }
  }, [isFocused]);

  const aiPrompts: Record<string, string> = {
    'Stuck': "Have you tried taking a 15-minute break? Sometimes a fresh pair of eyes is all you need.",
    'Burned Out': "It looks like you've been working hard. Have you eaten anything today or taken a walk?",
    'Focused': "You're in the zone! Keep going, but remember to stretch every hour.",
    'Frustrated': "Deep breaths. Maybe try explaining the problem out loud to a rubber duck?",
    'Productive': "Great momentum! What's the next small win you can achieve?",
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome back{username ? `, ${username}` : ', Dev'}!
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Today's Mood</Text>
          <View style={styles.currentMood}>
            <TouchableOpacity onPress={() => setMood('Angry')} >
              <Text style={styles.emoji}>😡</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('Frustrated')}>
              <Text style={styles.emoji}>☹️</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('Neutral')}>
              <Text style={styles.emoji}>😐</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('Good')}>
              <Text style={styles.emoji}>😁</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMood('Amazing')}>
              <Text style={styles.emoji}>🤩</Text>
            </TouchableOpacity>
          </View>
          {userMood && (
            <Text style={[styles.selectedMood, { color: colors.text }]}>Current: {userMood}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={[styles.stressTitle, { color: colors.text }]}>Today's Stress Level: {sliderValue}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#E00C0C"
            maximumTrackTintColor="#00FF00"
            thumbTintColor={colors.primary}
            onValueChange={(value) => setSliderValue(value)}
            value={sliderValue}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Journal Entry</Text>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            {lastEntry ? (
              <>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{lastEntry.title}</Text>
                <Text style={[styles.cardText, { color: colors.textSecondary }]} numberOfLines={2}>{lastEntry.solution}</Text>
              </>
            ) : (
              <>
                <Text style={styles.emoji}>🐤</Text>
                <Text style={[styles.cardText, { color: colors.textSecondary }]}>No Reflections Yet</Text>
                <Text style={[styles.reflectionTitle, { color: colors.textSecondary }]}>Start logging your first thoughts</Text>
              </>
            )}
          </View>
        </View>

        {lastMood && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Last Recorded Mood</Text>
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.cardText, { color: colors.text }]}>Mood: {lastMood.label} {lastMood.icon}</Text>
              {aiPrompts[lastMood.label] && (
                <Text style={[styles.aiPrompt, { color: colors.primary }]}>"{aiPrompts[lastMood.label]}"</Text>
              )}
            </View>
          </View>
        )}

        <View style={styles.buttonSection}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]}>
            <Text style={[styles.buttonText, { color: colors.text }]}>🪳 Log a bug</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]}>
            <Text style={[styles.buttonText, { color: colors.text }]}>🐤 Duck Mode</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]}>
            <Text style={[styles.buttonText, { color: colors.text }]}>🌙 End of day</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: colors.card }]}>
            <Text style={[styles.buttonText, { color: colors.text }]}>💡 Quick Idea</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </PlSafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  card: { padding: 15, borderRadius: 10, elevation: 2, alignItems: 'center' },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardText: { marginTop: 5, textAlign: 'center' },
  aiPrompt: { fontStyle: 'italic', marginTop: 8 },
  slider: { width: '100%', minHeight: 50 },
  stressTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, textAlign: 'center' },
  currentMood: { justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', marginBottom: 10 },
  emoji: { fontSize: 50 },
  selectedMood: { textAlign: 'center', fontSize: 16, marginTop: 10 },
  buttonSection: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  button: { padding: 20, borderRadius: 10, alignItems: 'center', width: '48%', elevation: 2 },
  buttonText: { fontSize: 16 },
  reflectionTitle: { fontSize: 14, marginTop: 5 }
});

export default HomeScreen;