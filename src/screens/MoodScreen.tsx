import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { BarChart } from "react-native-gifted-charts";
import { useRoute } from '@react-navigation/native';


const MoodScreen = () => {
  const { colors } = useTheme();
  const route = useRoute();
  const { userMood = ''} = route.params || {};
  const { newStress = 2 } = route.params || {};
  const numericDay = new Date().getDay();

    let dataTest = [];
    if (numericDay == 0) {
        dataTest.push({ value: 3, label: 'Mon', frontColor: '#00FF00' }, { value: 4, label: 'Tues', frontColor: '#AAA7AD' }, { value: 7, label: 'Wed', frontColor: '#E00C0C' }, { value: 10, label: 'Thurs', frontColor: '#E00C0C' }, { value: 5, label: 'Fri', frontColor: '#AAA7AD' }, { value: 1, label: 'Sat', frontColor: '#00FF00' }, { value: newStress, label: 'Sun', frontColor: '#00FF00' });
    } else if (numericDay == 1) {
        dataTest.push({ value: newStress, label: 'Mon', frontColor: '#00FF00' }, { value: 4, label: 'Tues', frontColor: '#AAA7AD' }, { value: 7, label: 'Wed', frontColor: '#E00C0C' }, { value: 10, label: 'Thurs', frontColor: '#E00C0C' }, { value: 5, label: 'Fri', frontColor: '#AAA7AD' }, { value: 1, label: 'Sat', frontColor: '#00FF00' }, { value: 2, label: 'Sun', frontColor: '#00FF00' });
    } else if (numericDay == 2) {
        dataTest.push({ value: 3, label: 'Mon', frontColor: '#00FF00' }, { value: newStress, label: 'Tues', frontColor: '#AAA7AD' }, { value: 7, label: 'Wed', frontColor: '#E00C0C' }, { value: 10, label: 'Thurs', frontColor: '#E00C0C' }, { value: 5, label: 'Fri', frontColor: '#AAA7AD' }, { value: 1, label: 'Sat', frontColor: '#00FF00' }, { value: 2, label: 'Sun', frontColor: '#00FF00' });
    } else if (numericDay == 3) {
        dataTest.push({ value: 3, label: 'Mon', frontColor: '#00FF00' }, { value: 4, label: 'Tues', frontColor: '#AAA7AD' }, { value: newStress, label: 'Wed', frontColor: '#E00C0C' }, { value: 10, label: 'Thurs', frontColor: '#E00C0C' }, { value: 5, label: 'Fri', frontColor: '#AAA7AD' }, { value: 1, label: 'Sat', frontColor: '#00FF00' }, { value: 2, label: 'Sun', frontColor: '#00FF00' });
    } else if (numericDay == 4) {
        dataTest.push({ value: 3, label: 'Mon', frontColor: '#00FF00' }, { value: 4, label: 'Tues', frontColor: '#AAA7AD' }, { value: 7, label: 'Wed', frontColor: '#E00C0C' }, { value: newStress, label: 'Thurs', frontColor: '#E00C0C' }, { value: 5, label: 'Fri', frontColor: '#AAA7AD' }, { value: 1, label: 'Sat', frontColor: '#00FF00' }, { value: 2, label: 'Sun', frontColor: '#00FF00' });
    } else if (numericDay == 5) {
        dataTest.push({ value: 3, label: 'Mon', frontColor: '#00FF00' }, { value: 4, label: 'Tues', frontColor: '#AAA7AD' }, { value: 7, label: 'Wed', frontColor: '#E00C0C' }, { value: 10, label: 'Thurs', frontColor: '#E00C0C' }, { value: newStress, label: 'Fri', frontColor: '#AAA7AD' }, { value: 1, label: 'Sat', frontColor: '#00FF00' }, { value: 2, label: 'Sun', frontColor: '#00FF00' });
    } else {
        dataTest.push({ value: 3, label: 'Mon', frontColor: '#00FF00' }, { value: 4, label: 'Tues', frontColor: '#AAA7AD' }, { value: 7, label: 'Wed', frontColor: '#E00C0C' }, { value: 10, label: 'Thurs', frontColor: '#E00C0C' }, { value: 5, label: 'Fri', frontColor: '#AAA7AD' }, { value: newStress, label: 'Sat', frontColor: '#00FF00' }, { value: 2, label: 'Sun', frontColor: '#00FF00' });
    }

  const MoodAdvice: Record<string, string> = {
     '': "Select a mood from the home screen!",
     'Angry': "Working while angry not only results in worse work, but will negatively impact your mental and physical health in the long run. Taking an extended break from your work will help you relax, refresh, and refocus!",
     'Frustrated': "Frustration is a very common feeling but can start to worsen if left unchecked. Don't be afraid to ask for help from peers in person or online if you can't seem to find a solution to your problem!",
     'Neutral': "You're not feeling too stressed but not feeling too great either. Sometimes days are just ok, but planning ahead can help make tomorrow a better day!", 
     'Good': "You're on the right track! Just need small adjustments to reach maximum potential!",
     'Amazing': "You're doing great! Keep up the good work!"
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container}>
        <Text style={[styles.title, { color: colors.text }]}>Weekly Stress Level</Text>
            <BarChart
                  data={dataTest}
                  barWidth={20}
                  maxValue={10}
                  noOfSections={5}
                  stepValue={2}
                  showValuesAsTopLabel={true}
                  overflowTop={10}
              />
              <View style={styles.todaysStress}>
                  <Text>
                      <Text style={styles.moodSectionBoldText}>Today's Stress Level: </Text>
                      <Text style={styles.moodSectionText}>{newStress}</Text>
                  </Text>
              </View>
              <View style={styles.burnout}>
                  <Text style={[styles.title, { color: colors.text }]}>Burnout Monitor:</Text>
                  <Text style={[styles.stressText, { color: colors.text }]}>High stress levels logged for middle of the week - Try breaking down tasks and spreading them evenly across the week to prevent a full burnout.</Text>
              </View>
      <Text style={[styles.title, { color: colors.text }]}>Weekly Mood</Text>
      <View style={[styles.newMoodSection, { backgroundColor: colors.card }]}>
             <Text style={styles.moodSectionBoldText }>
                <Text style={styles.moodSectionBoldText}>Days Logged: </Text>
                <Text style={styles.moodSectionText}> 7</Text>
             </Text>
             <Text>
                <Text style={styles.moodSectionBoldText}>Most Logged Mood:</Text>
                <Text style={styles.moodSectionText }> ☹️ - Frustrated</Text>
             </Text>
             <Text>
                <Text style={styles.moodSectionBoldText}>Today's Mood: </Text>
                <Text style={styles.moodSectionText}>{userMood}</Text>
             </Text>
             <Text>
                <Text style={styles.moodSectionBoldText}>Today's Mood Advice: </Text>
                <Text style={styles.moodSectionText}>{MoodAdvice[userMood]}</Text>
             </Text>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  moodGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  moodCard: { width: '45%', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 15, elevation: 2 },
  moodIcon: { fontSize: 32 },
  moodLabel: { marginTop: 10, fontWeight: '600' },
  aiCard: { padding: 20, borderRadius: 12, marginTop: 20, borderLeftWidth: 5 },
  burnout: { padding: 20, borderRadius: 12, marginTop: 20, borderLeftWidth: 5, backgroundColor: '#FFADB0', marginBottom: 20},
  aiTitle: { fontWeight: 'bold', marginBottom: 5 },
  aiText: { fontSize: 16, lineHeight: 22 },
  stressTitle: { fontSize: 24, fontWeight: 'bold', marginTop: 20, textAlign: 'center' },
  stressText: { fontSize: 16, textAlign: 'center' },
  slider: { width: '100%', minHeight: 50 },
  newMoodSection: { justifyContent: 'space-evenly', borderRadius: 12, height: '20%', alignItems: 'center', marginBottom: 80 },
  moodRows: { flexDirection: 'row'},
  moodSectionText: { fontSize: 15, textAlign: 'center' },
  moodSectionBoldText: { fontSize: 18, textAlign: 'center', fontWeight: 'bold' },
  todaysStress: {padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 10}
});

export default MoodScreen;