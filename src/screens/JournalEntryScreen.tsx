import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

const JournalEntryScreen = ({navigation, route}: any) => {
  const [title, setTitle] = useState('');
  const [issue, setIssue] = useState('');
  const [solution, setSolution] = useState('');
  const [tags, setTags] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const { colors } = useTheme();

  const handleExport = async () => {
  try {
    const titleText = title.trim() || 'Untitled Entry';
    const issueText = issue.trim();
    const tagsText = tags.trim();
    const solutionText = solution.trim();

    if (!solutionText) {
      Alert.alert('Nothing to export', 'Please add entry content before exporting.');
      return;
    }
    const content = [
      `Title: ${titleText}`,
      issueText ? `Issue: ${issue.trim()}` : null,
      tagsText ? `Tags: ${tagsText}` : null,
      solutionText ? `Solution: ${solutionText}` : null,
    ]
    .filter(Boolean)
    .join('\n\n');

    await Share.share({
      title: titleText,
      message: content,
    });
  } catch (error) {
    console.error('Export failed', error);
    Alert.alert('Error', 'Failed to export the journal entry');
  }
};

  useEffect(() => {
  const entry = route.params?.entry;

  if (entry) {
    setEditingId(entry.id ?? null);
    setTitle(entry.title ?? '');
    setIssue(entry.issue ?? '');
    setSolution(entry.solution ?? '');

    if (Array.isArray(entry.tags)) {
      setTags(entry.tags.join(', '));
    } else {
      setTags(entry.tags ?? '');
    }

    setIsEditing(!!entry.id);
  } else {
    setIsEditing(false);
    setEditingId(null);
  }

  if (route.params?.presetTag) {
    setTags(route.params.presetTag);
  }

  if (route.params?.presetTitle) {
    setTitle(route.params.presetTitle);
  }
}, [route.params]);
  const deleteEntry = async () => {
  const id = route.params?.entry?.id;

  if (!id) {
    Alert.alert('No saved entry', 'This entry has not been saved yet.');
    return;
  }

  try {
    const savedEntries = await AsyncStorage.getItem('journal_entries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];

    const updatedEntries = entries.filter((entry: any) => entry.id !== id);

    await AsyncStorage.setItem('journal_entries', JSON.stringify(updatedEntries));
    navigation.navigate('JournalList');
  } catch (error) {
    console.error('Failed to delete entry', error);
    Alert.alert('Error', 'Failed to delete the journal entry');
  }
};

  const saveEntry = async () => {
  if (!title || !issue || !solution) {
    Alert.alert('Error', 'Please fill in title, issue and solution');
    return;
  }

  try {
    const savedEntries = await AsyncStorage.getItem('journal_entries');
    const entries = savedEntries ? JSON.parse(savedEntries) : [];

    const parsedTags = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(Boolean);

    const updatedEntry = {
      id: route.params?.entry?.id ?? Date.now().toString(),
      title,
      issue,
      solution,
      tags: parsedTags,
      date: route.params?.entry?.date ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    let updatedEntries;

    if (route.params?.entry?.id) {
      updatedEntries = entries.map((entry: any) =>
        entry.id === route.params.entry.id ? updatedEntry : entry
      );
    } else {
      updatedEntries = [updatedEntry, ...entries];
    }

    await AsyncStorage.setItem('journal_entries', JSON.stringify(updatedEntries));
    navigation.navigate('JournalList');
  } catch (error) {
    console.error('Failed to save entry', error);
    Alert.alert('Error', 'Failed to save the journal entry');
  }
};

  return (
    <SafeAreaView style={[styles.screenContainer, { backgroundColor: colors.background }]}>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <View style={styles.headerRow}>
              <TouchableOpacity onPress={() => navigation.navigate('JournalList')}>
                <Text style={styles.smallText}> X Cancel
                </Text>
              </TouchableOpacity>

              <TextInput
                style={[styles.title, { color: colors.text }]}
                placeholder="✎ Tap to add title..."
                placeholderTextColor={colors.text}
                value={title}
                onChangeText={setTitle}
              />
              
              <TouchableOpacity onPress={() => { Alert.alert('Alert', 'Feature coming soon') }}>
                <View style={styles.tag}>
                  <Text style={styles.smallText}>Draft</Text>

                </View>
              </TouchableOpacity>

            </View>
          </View>
          <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              What problem are you trying to solve?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="React Native keeps throwing a warning when..."
              placeholderTextColor="#595959"
              value={issue}
              onChangeText={setIssue}
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What have you tried so far?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tried clearing cache, updated the nav library..."
              placeholderTextColor="#595959"
              value={solution}
              onChangeText={setSolution}
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attach code snippet</Text>
            <TextInput
              style={styles.input}
              placeholder="Paste your code here..."
              placeholderTextColor="#595959"
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Custom tags</Text>
          <TextInput
              style={styles.input}
              placeholder="Add custom tags, separated by commas..."
              placeholderTextColor="#595959"
              value={tags}
              onChangeText={setTags}
            />
          </View>
              </ScrollView>

            <View style={styles.actionsRow}>
                <TouchableOpacity style={styles.actionButtonSecondary} onPress={handleExport}>
                  <Text style={styles.actionButtonTextSecondary}>Export</Text>
                </TouchableOpacity>

             <TouchableOpacity style={styles.actionButtonPrimary} onPress={saveEntry}>
              <Text style={styles.actionButtonTextPrimary}>
                {isEditing ? "Update Entry" : "Save Entry"}
                </Text>
              </TouchableOpacity>
              </View>
              {isEditing && (editingId && (
                <View style={styles.actionsRow}>
                  <TouchableOpacity style={styles.deleteButtonBox} onPress={deleteEntry}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ===== Layout =====
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  contentContainer: {
    flex: 1,
    padding: 16,
  },

  deleteButtonBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'flex-start',
    flex: 0.25,
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#ffffff',
    padding: 10,
    borderColor: '#FF0000',
    borderWidth: 1,

  },
  section: {
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  divider: {
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 10,
  },

  // ===== Typography =====
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 10,
  },

  smallText: {
    fontSize: 14,
    color: '#000000',
  },

  actionButtonTextPrimary: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },

  actionButtonTextSecondary: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },

  deleteButtonText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FF0000',

  },

  // ===== Inputs / Panels =====
  input: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 12,
    minHeight: 90,
    textAlignVertical: 'top',
    color: '#333333',
  },

  // ===== Tags =====
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tag: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
  },

  // ===== Action Buttons =====
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  actionButtonPrimary: {
    flex: 0.48,
    backgroundColor: '#6B6B6B',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  actionButtonSecondary: {
    flex: 0.48,
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  // ===== Animations =====

  tagToggleButton: {
    backgroundColor: '#33623A',
  },

  tinyText: {
    fontSize: 10,
    color: '#000000',
  },
});

export default JournalEntryScreen;