import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EntryScreen = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.section}>
          <View style={styles.headerRow}>
            <TouchableOpacity>
              <Text style={styles.tagText}>x Cancel</Text>
            </TouchableOpacity>
          <Text style={styles.titleText}>New Journal Entry</Text>
          <TouchableOpacity>
            <View style={styles.tag}>
              <Text style={styles.tagText}>Draft</Text>
            </View>
          </TouchableOpacity>
        </View>
          <View style={styles.divider} />
      </View>
      <View style={styles.section}>
          <Text style={styles.sectionTitle}>Type</Text>
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
              <Text style={styles.tagText}>Writing</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>+ Tag</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What problem are you trying to solve?</Text>
          <TextInput
            style={styles.promptInput}
            placeholder="React Native keeps throwing a warning when..."
            placeholderTextColor="#595959"
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What have you tried so far?</Text>
          <TextInput
            style={styles.promptInput}
            placeholder="Tried clearing cache, updated the nav library..."
            placeholderTextColor="#595959"
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Attach code snippet</Text>
          <TextInput
            style={styles.promptInput}
            placeholder="Paste your code here..."
            placeholderTextColor="#595959"
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.formLabel}>Tags</Text>
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
              <Text style={styles.tagText}>+ Tag</Text>
            </View>
          </View>
        </View>

        <View style={styles.footerButtonRow}>
          <TouchableOpacity style={styles.discardButton}>
            <Text style={styles.footerButtonTextB}>Discard</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.footerButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {flex: 1, backgroundColor: '#fff', padding: 16,},

  section: {marginBottom: 20,},

  headerRow: {flexDirection: 'row',justifyContent: 'space-between',
    alignItems: 'center',marginBottom: 20,},

   footerButtonRow: {flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,},

  titleText: {
    fontSize: 18,fontWeight: 'bold',color: '#000',},

  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 10, color: '#333',},

  formLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },

  promptInput: {
    backgroundColor: '#d9d9d9',
    padding: 15,
    borderRadius: 10,
    minHeight: 90,
    textAlignVertical: 'top',
    color: '#333',
  },
  tagRow: {
    flexDirection: 'row',flexWrap: 'wrap',},

  tag: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  tagText: {color: '#000',fontSize: 10, },
  discardButton: {
    flex: 0.48,
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButton: {
    flex: 0.48,
    backgroundColor: '#6B6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footerButtonTextB: {color: '#000',fontWeight: 'bold',},

  divider: {
  height: 1,
  backgroundColor: '#000',
  marginVertical: -1,
}
});

export default EntryScreen;