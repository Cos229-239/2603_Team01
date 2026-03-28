import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused, useNavigation, CommonActions } from '@react-navigation/native';
import { supabase } from '../lib/supabase';

const HomeScreen = () => {
  const [lastEntry, setLastEntry] = useState<any>(null);
  const [lastMood, setLastMood] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  const isFocused = useIsFocused();
  const navigation = useNavigation();

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
      
      if (data?.user?.email) {
        const extractedUsername = data.user.email.split('@')[0];
        setUsername(extractedUsername);
      } else {
        setUsername('');
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
      setUsername('');
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        Alert.alert('Error', 'Failed to logout. Please try again.');
        console.error('Logout error:', error);
        return;
      }

      // Navigate back to Login screen and reset navigation stack
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (isFocused) {
      loadData();
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
    <View style={styles.wrapper}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>
          Welcome back{username ? `, ${username}` : ''}!
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Journal Entry</Text>
          <View style={styles.card}>
            {lastEntry ? (
              <>
                <Text style={styles.cardTitle}>{lastEntry.title}</Text>
                <Text style={styles.cardText} numberOfLines={2}>{lastEntry.solution}</Text>
              </>
            ) : (
              <Text style={styles.cardText}>No entries yet. Start journaling your solutions!</Text>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Current Mood</Text>
          <View style={styles.card}>
            {lastMood ? (
              <>
                <Text style={styles.cardText}>Mood: {lastMood.label} {lastMood.icon}</Text>
                {aiPrompts[lastMood.label] && (
                  <Text style={styles.aiPrompt}>"{aiPrompts[lastMood.label]}"</Text>
                )}
              </>
            ) : (
              <Text style={styles.cardText}>How are you feeling today?</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <View style={styles.logoutContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#f5f5f5' },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#555' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 2 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardText: { color: '#666', marginTop: 5 },
  aiPrompt: { fontStyle: 'italic', color: '#007AFF', marginTop: 8 },
  logoutContainer: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: 10,
  },
  logoutButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HomeScreen;
