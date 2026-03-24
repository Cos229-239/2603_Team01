import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const HomeScreen = ({ navigation }: any) => {
  const [recentEntries, setRecentEntries] = useState<any[]>([]);
  const [lastMood, setLastMood] = useState<any>(null);
  const isFocused = useIsFocused();

  const loadData = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('journal_entries');
      if (savedEntries) {
        const entries = JSON.parse(savedEntries);
        // Take the top 3 most recent entries
        setRecentEntries(entries.slice(0, 3));
      }

      const savedMood = await AsyncStorage.getItem('last_mood');
      if (savedMood) {
        setLastMood(JSON.parse(savedMood));
      }
    } catch (error) {
      console.error('Failed to load home data', error);
    }
  };

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

  const handleEntryPress = (entry: any) => {
    navigation.navigate('Journal', {
      screen: 'JournalEntry',
      params: { entry },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome back, Dev!</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Journal Entries</Text>
        {recentEntries.length > 0 ? (
          <FlatList
            data={recentEntries}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.card}
                onPress={() => handleEntryPress(item)}
                activeOpacity={0.7}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.editLink}>Edit</Text>
                </View>
                <Text style={styles.cardText} numberOfLines={2}>{item.solution}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View style={styles.card}>
            <Text style={styles.cardText}>No entries yet. Start journaling your solutions!</Text>
          </View>
        )}
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
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#555' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 2, marginBottom: 10 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  cardTitle: { fontWeight: 'bold', fontSize: 16, flex: 1 },
  editLink: { color: '#007AFF', fontSize: 14, fontWeight: '500' },
  cardText: { color: '#666' },
  aiPrompt: { fontStyle: 'italic', color: '#007AFF', marginTop: 8 },
});

export default HomeScreen;
