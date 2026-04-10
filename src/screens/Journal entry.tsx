import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Entry  = () => {
  return (
    /*
    <ScrollView style={styles.header}>
      <Text style={styles.title}>Welcome back, Dev!</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Journal Entries</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Placeholder</Text>
          <Text style={styles.cardText}>Placeholder</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Mood Activity</Text>
        <View style={styles.card}>
          <Text style={styles.cardText}>Mood: Focused 🚀</Text>
          <Text style={styles.aiPrompt}>"Great work! Don't forget to stay hydrated."</Text>
        </View>
      </View>
    </ScrollView>
    */
   <SafeAreaView style={styles.itemBox}>
    <ScrollView>

      <Text style={styles.subsections}>
        <Text style={styles.cardText}>x Cancel</Text>
      <Text style={styles.subsections}></Text>
        <Text style={styles.title}>New Journal Entry</Text>
      <Text style={styles.subsections}></Text>
        <Text style={styles.cardText}>Draft</Text>
        </Text>
  
    </ScrollView>
   </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  itemBox: {flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#f5f5f5', padding: 20, marginBottom: 15, borderRadius: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between',backgroundColor: '#f5f5f5', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  section: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#555' },
  card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 2 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardText: { color: '#666', marginTop: 5 },
  aiPrompt: { fontStyle: 'italic', color: '#007AFF', marginTop: 8 },
  subsections: { flex: 1, padding: 15, borderRadius: 10, elevation: 2, marginBottom: 20 },
});

export default Entry;
