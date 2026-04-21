import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';

const JournalScreen = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState<any[]>([]);
  const isFocused = useIsFocused();
  const { colors } = useTheme();

  const loadEntries = async () => {
    try {
      const savedEntries = await AsyncStorage.getItem('journal_entries');
      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
    } catch (error) {
      console.error('Failed to load entries', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadEntries();
    }
  }, [isFocused]);

  const filteredEntries = entries.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.tags && e.tags.some((t: string) => t.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
        <TextInput
          style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
          placeholder="Search problems or tags..."
          placeholderTextColor={colors.textSecondary}
          value={search}
          onChangeText={setSearch}
        />
        <FlatList
          data={filteredEntries}
          keyExtractor={item => item.id}
          ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.textSecondary }]}>No entries yet. Start journaling your bugs!</Text>}
          renderItem={({item}) => (
            <View style={[styles.card, { backgroundColor: colors.card }]}>
              <Text style={[styles.cardTitle, { color: colors.text }]}>{item.title}</Text>
              <Text style={[styles.cardSolution, { color: colors.textSecondary }]}>{item.solution}</Text>
              <View style={styles.tagContainer}>
                {item.tags && item.tags.map((tag: string) => (
                  <View key={tag} style={styles.tag}>
                    <Text style={styles.tagText}>#{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        />
        <TouchableOpacity
          style={[styles.fab, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('JournalEntry')}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 10 },
  searchBar: { height: 45, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1 },
  card: { padding: 15, borderRadius: 10, marginBottom: 10, elevation: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold' },
  cardSolution: { fontSize: 14, marginTop: 5 },
  tagContainer: { flexDirection: 'row', marginTop: 10 },
  tag: { backgroundColor: '#e1f5fe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, marginRight: 5 },
  tagText: { fontSize: 12, color: '#01579b' },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  fabText: { fontSize: 24, color: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 }
});

export default JournalScreen;
