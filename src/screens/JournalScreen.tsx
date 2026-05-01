import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, ListRenderItem} from 'react-native';
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

  const renderItem: ListRenderItem<any> = ({item}) => (
  <TouchableOpacity
  style={[styles.historyCard]}
  onPress={() => navigation.navigate('JournalEntry', { entry: item })}
  activeOpacity={0.85}
>
  <View style={styles.cardHeaderRow}>
    <Text style={styles.cardTitle}>{item.title || 'Untitled Entry'}</Text>
    <Text style={styles.cardSubtitle}>{item.tags?.[0] || 'No tags'}</Text>
  </View>

  <Text style={styles.cardBody} numberOfLines={2}>
    {item.issue || item.solution}
  </Text>

  <View style={styles.cardFooter}>
    <View style={styles.cardTagRow}>
      {item.tags?.slice(0, 2).map((tag: string) => (
        <TouchableOpacity key={tag} style={styles.tagLabel} onPress={() => setSearch(tag)}>
          <Text style={styles.tagLabelText}>{tag}</Text>
        </TouchableOpacity>
      ))}

      {item.tags?.length > 2 && (
        <View style={styles.tagLabel}>
          <Text style={styles.tagLabelText}>
            +{item.tags.length - 2} more
          </Text>
        </View>
      )}
     </View>
     <Text style={styles.timestamp}>{item.date ? new Date(item.date).toLocaleDateString([], {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      }).replace(',', '') : ''}
      </Text>
    </View>
  </TouchableOpacity>
);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <View style={styles.container}>
  <TextInput
  style={[styles.searchBar, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
  placeholder="Search entries by keyword or tag..."
  placeholderTextColor={colors.textSecondary}
  value={search}
  onChangeText={setSearch}
/>
<FlatList
    data={filteredEntries}
    keyExtractor={(item, index) => item.id || index.toString()}
    ListEmptyComponent={<Text style={[styles.emptyText, { color: colors.textSecondary }]}>No entries yet. Start journaling your bugs!</Text>}
    renderItem={renderItem}
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
  container: { flex: 1, padding: 16 },
  searchBar: { height: 45, borderRadius: 8, paddingHorizontal: 15, marginBottom: 15, borderWidth: 1 },
  cardSolution: { fontSize: 14, marginTop: 5 },
  fab: { position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 4 },
  fabText: { fontSize: 24, color: '#fff' },
  emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16 },

moreTag: {
  backgroundColor: '#8C8C8C',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 10,
},

moreTagText: {
  fontSize: 12,
  color: '#FFFFFF',
  fontWeight: '600',
},

card: {
  padding: 10,
  borderRadius: 10,
  marginBottom: 5,
},

titleRow: {
  flexDirection: 'row',
  alignItems: 'baseline',
  gap: 10,
},

cardTitle: {
  fontSize: 18,
  fontWeight: '400',
  color: '#000',
},

cardType: {
  fontSize: 16,
  color: '#777',
},

cardPreview: {
  fontSize: 16,
  color: '#666',
  marginTop: 14,
  lineHeight: 22,
},

cardFooter: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 18,
},

tagContainer: {
  flexDirection: 'row',
  gap: 5,
  flex: 1,
},

tag: {
  backgroundColor: '#FFFFFF',
  paddingHorizontal: 18,
  paddingVertical: 10,
  borderRadius: 24,
},

tagText: {
  fontSize: 15,
  color: '#111',
},

dateText: {
  fontSize: 14,
  color: '#111',
  marginLeft: 12,
},
cardSubtitle: {
    fontSize: 12,
    color: '#777777',
    marginLeft: 8,
  },

  cardBody: {
    fontSize: 10,
    color: '#555555',
    lineHeight: 14,
  },

  timestamp: {
    fontSize: 11,
    color: '#555',
  },
   tagLabel: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginRight: 8,
  },

  tagLabelText: {
    fontSize: 10,
    color: '#000000',
  },

  // ===== History Cards =====
  historyCard: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },

  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },

  cardTagRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginRight: 8,
  },
});

export default JournalScreen;
