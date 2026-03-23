import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';

const JournalScreen = ({navigation}: any) => {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState<any[]>([]);
  const isFocused = useIsFocused();

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
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search problems or tags..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredEntries}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No entries yet. Start journaling your bugs!</Text>}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSolution}>{item.solution}</Text>
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
        style={styles.fab}
        onPress={() => navigation.navigate('JournalEntry')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5', padding: 10 },
  searchBar: { height: 45, backgroundColor: '#fff', borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1, borderColor: '#ddd' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 10, elevation: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  cardSolution: { fontSize: 14, color: '#666', marginTop: 5 },
  tagContainer: { flexDirection: 'row', marginTop: 10 },
  tag: { backgroundColor: '#e1f5fe', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 5, marginRight: 5 },
  tagText: { fontSize: 12, color: '#01579b' },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center', elevation: 4 },
  fabText: { fontSize: 24, color: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 50, color: '#666', fontSize: 16 }
});

export default JournalScreen;
