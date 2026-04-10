import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { supabase } from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

const HomeScreen = () => {
  const [lastEntry, setLastEntry] = useState<any>(null);
  const [lastMood, setLastMood] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
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
    <View style={[styles.wrapper, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome back{username ? `, ${username}` : ''}!
        </Text>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Journal Entry</Text>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            {lastEntry ? (
              <>
                <Text style={[styles.cardTitle, { color: colors.text }]}>{lastEntry.title}</Text>
                <Text style={[styles.cardText, { color: colors.textSecondary }]} numberOfLines={2}>{lastEntry.solution}</Text>
              </>
            ) : (
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>No entries yet. Start journaling your solutions!</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Current Mood</Text>
          <View style={[styles.card, { backgroundColor: colors.card }]}>
            {lastMood ? (
              <>
                <Text style={[styles.cardText, { color: colors.text }]}>Mood: {lastMood.label} {lastMood.icon}</Text>
                {aiPrompts[lastMood.label] && (
                  <Text style={[styles.aiPrompt, { color: colors.primary }]}>"{aiPrompts[lastMood.label]}"</Text>
                )}
              </>
            ) : (
              <Text style={[styles.cardText, { color: colors.textSecondary }]}>How are you feeling today?</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  card: { padding: 15, borderRadius: 10, elevation: 2 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardText: { marginTop: 5 },
  aiPrompt: { fontStyle: 'italic', marginTop: 8 },
});

export default HomeScreen;