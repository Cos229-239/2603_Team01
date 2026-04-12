import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Entry  = () => {
  return (
   <SafeAreaView style={styles.screenContainer}>
    <ScrollView>
      <View style={styles.headerRow}>
        <Text style={styles.title}>History</Text>
        <TouchableOpacity>
          <Text style={styles.searchText}>Settings</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divider} />
      <View style={styles.section}>
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search Reflections...</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>All</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Issue</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Concept</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Language</Text>
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>Date</Text>
          </View>
        </View>
      </View>

      <View style={styles.contentContainer}>
        // ===== To be replaced with calls to existing entries =====
        <View style={styles.historyCard}>
          <View style={styles.cardHeaderRow}>
          <Text style={styles.cardTitle}> Console Issue</Text>
          <Text style={styles.cardSubTitle}>Error handling</Text>
          </View>
          <Text style={styles.cardBody}>Warning fires on every call to the navigation library. Tried updating the nav library but the error persists...</Text>
          <View style={styles.cardFooter}> 
            <View style={styles.cardTagRow}>
              <View style={styles.tagLabel}>
                <Text style={styles.tagLabelText}>React Native</Text>
              </View>
              <View style={styles.tagLabel}>
                <Text style={styles.tagLabelText}>Debugging</Text>
              </View>
            </View>
            <Text style={styles.timestamp}>03/22/2026 06:47PM EST</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
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
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ===== Layout =====
  screenContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 16,
  },

  contentContainer: {
    flex: 1,
    paddingTop: 8,
  },

  section: {
    marginBottom: 12,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  divider: {
    height: 1,
    backgroundColor: '#000000',
    marginBottom: 10,
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
    marginBottom: 8,
  },

  searchText: {
    fontSize: 14,
    color: '#595959',
  },

  tagText: {
    fontSize: 10,
    color: '#000000',
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#000000',
  },

  cardSubTitle: {
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
    fontSize: 10,
    color: '#000000',
  },

  actionButtonText: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000000',
  },

  // ===== Search =====
  searchBar: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 36,
    justifyContent: 'center',
  },

  // ===== Tags =====
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tag: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginRight: 8,
    marginBottom: 8,
  },

  tagLabel: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 30,
    marginRight: 8,
    marginBottom: 8,
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

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },

  cardTagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    marginRight: 8,
  },

  // ===== Action Buttons =====
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 16,
  },

  actionButton: {
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    paddingVertical: 14,
    width: '45%',
    alignItems: 'center',
  },

  // ===== Bottom Navigation =====
  bottomNav: {
    borderTopWidth: 1,
    borderTopColor: '#D9D9D9',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  bottomNavRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Entry;