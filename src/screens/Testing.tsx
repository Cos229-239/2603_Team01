import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

{/*const JournalEntryScreen = ({navigation, route}: any) => {*/}
  const Testing = ({navigation, route}: any) => {
  const [title, setTitle] = useState('');
  const [solution, setSolution] = useState('');
  const [tags, setTags] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    if (route.params?.entry) {
      const {entry} = route.params;
      setTitle(entry.title);
      setSolution(entry.solution);
      setTags(entry.tags ? entry.tags.join(', ') : '');
      setIsEditing(true);
    }
  }, [route.params]);

  const saveEntry = async () => {
    if (!title || !solution) {
      Alert.alert('Error', 'Please fill in both title and solution');
      return;
    }

    const parsedTags = tags
      .split(',').map(tag => tag.trim())
      .filter(tag => tag !== '');

    try {
      const existingEntries = await AsyncStorage.getItem('journal_entries');
      let entries = existingEntries ? JSON.parse(existingEntries) : [];

      if (isEditing) {
        entries = entries.map((e: any) =>
          e.id === route.params.entry.id
            ? {...e, title, solution, tags: parsedTags}
            : e
        );
      } else {
        const newEntry = {
          id: Date.now().toString(),
          title,
          solution,
          tags: parsedTags,
          date: new Date().toISOString(),
        };
        entries = [newEntry, ...entries];
      }

      await AsyncStorage.setItem('journal_entries', JSON.stringify(entries));
      navigation.goBack();
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
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.actionButtonTextSecondary}> X Cancel
                </Text>
              </TouchableOpacity>
              <Text style={[styles.title, {color: colors.text}]}>
              New Journal Entry
              </Text>
              <TouchableOpacity>
                <View style={styles.tag}>
                  // TODO: Insert feature to toggle between Draft and Published states, and update tag color accordingly.
                  <Text style={styles.tagText}>Draft</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />
          </View>
          <ScrollView>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Entry type tags</Text>
            // TODO: Add tag select/deselect + custom tags. 
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Bug</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Concept</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Debugging</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>End of Day</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Quick Idea</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>+ Issue Tag</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              What problem are you trying to solve?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="React Native keeps throwing a warning when..."
              placeholderTextColor="#595959"
              multiline
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What have you tried so far?</Text>
            <TextInput
              style={styles.input}
              placeholder="Tried clearing cache, updated the nav library..."
              placeholderTextColor="#595959"
              multiline
            />
          </View>

          <View style={styles.section}>
            // TODO: Implement functionality to allow users to attach code snippets, screenshots, or other files.
            <Text style={styles.sectionTitle}>Attach code snippet</Text>
            <TextInput
              style={styles.input}
              placeholder="Paste your code here..."
              placeholderTextColor="#595959"
              multiline
            />
          </View>

          <View style={styles.section}>
            // TODO: Add tag select/deselect + custom tags.
            <Text style={styles.sectionTitle}>Issue type tags</Text>
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Bug</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>JavaScript</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>React Native</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Python</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>Syntax</Text>
              </View>
              <View style={styles.tag}>
                <Text style={styles.tagText}>+ Issue Tag</Text>
              </View>
            </View>
          </View>

            <View style={styles.actionsRow}>
              // TODO: Implement functionality for the  and Save buttons. The Discard button should prompt the user to confirm their action before clearing all input fields.
              <TouchableOpacity style={styles.actionButtonSecondary}>
                <Text style={styles.actionButtonTextSecondary}>Export</Text>
                <Text style={styles.tagText}>**Coming Soon**</Text>
              </TouchableOpacity>
  
              <TouchableOpacity style={styles.actionButtonPrimary}>
                // TODO: Implement functionality to validate inputs and save entry.
                <Text style={styles.actionButtonTextPrimary}>Save</Text>
              </TouchableOpacity>
            </View>
        </ScrollView>
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

  tagText: {
    fontSize: 10,
    color: '#000000',
  },

  actionButtonTextPrimary: {
    fontSize: 20,
    fontWeight: '300',
    color: '#FFFFFF',
  },

  actionButtonTextSecondary: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
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

  tagToggleButtonText: {
    fontSize: 10,
    color: '#fff',
  },
});

{/*export default JournalEntryScreen;*/}
export default Testing;