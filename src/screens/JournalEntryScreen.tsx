import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button, ScrollView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const JournalEntryScreen = ({navigation, route}: any) => {
  const [title, setTitle] = useState('');
  const [solution, setSolution] = useState('');
  const [tags, setTags] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (route.params?.entry) {
      const {entry} = route.params;
      setTitle(entry.title);
      setSolution(entry.solution);
      setTags(entry.tags.join(', '));
      setIsEditing(true);
    }
  }, [route.params]);

  const saveEntry = async () => {
    if (!title || !solution) {
      Alert.alert('Error', 'Please fill in both title and solution');
      return;
    }

    try {
      const existingEntries = await AsyncStorage.getItem('journal_entries');
      let entries = existingEntries ? JSON.parse(existingEntries) : [];

      if (isEditing) {
        entries = entries.map((e: any) =>
          e.id === route.params.entry.id
            ? {...e, title, solution, tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')}
            : e
        );
      } else {
        const newEntry = {
          id: Date.now().toString(),
          title,
          solution,
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
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
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Problem Title</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Gradle Build Error"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Solution</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe how you solved it..."
        value={solution}
        onChangeText={setSolution}
        multiline
        numberOfLines={6}
      />

      <Text style={styles.label}>Tags (comma separated)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. android, gradle, ui"
        value={tags}
        onChangeText={setTags}
      />

      <View style={styles.buttonContainer}>
        <Button title={isEditing ? "Update Entry" : "Save Entry"} onPress={saveEntry} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" onPress={() => navigation.goBack()} color="#666" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, color: '#333' },
  input: { borderBottomWidth: 1, borderColor: '#ccc', paddingVertical: 8, fontSize: 16, marginBottom: 10 },
  textArea: { textAlignVertical: 'top', height: 120, borderWidth: 1, borderRadius: 8, padding: 10, marginTop: 5 },
  buttonContainer: { marginTop: 10 }
});

export default JournalEntryScreen;
