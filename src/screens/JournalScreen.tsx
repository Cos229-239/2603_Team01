import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity} from 'react-native';

const JournalScreen = () => {
  const [search, setSearch] = useState('');
  const [entries, setEntries] = useState([
    { id: '1', title: 'Dependency Conflict', solution: 'Updated Gradle to 8.13', tags: ['gradle', 'android'] },
    { id: '2', title: 'Flexbox Layout', solution: 'Used flex: 1 on parent container', tags: ['css', 'react-native'] },
  ]);

  const filteredEntries = entries.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
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
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardSolution}>{item.solution}</Text>
            <View style={styles.tagContainer}>
              {item.tags.map(tag => (
                <View key={tag} style={styles.tag}>
                  <Text style={styles.tagText}>#{tag}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.fab}>
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
  fabText: { fontSize: 24, color: '#fff' }
});

export default JournalScreen;
