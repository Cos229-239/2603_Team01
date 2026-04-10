import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity,  } from 'react-native';

import Slider from '@react-native-community/slider';

const HomeScreen = () => {
   const [sliderValue, setSliderValue] = useState(0);
   const [userMood, setMood] = useState('');
  return (
    <ScrollView style={styles.container}>
        <Text style={styles.title}>Welcome back, Dev!</Text>
        <Text>
             <Text style={styles.stressTitle}>Today's Mood: </Text>
             <Text style={styles.stressTitle}>{userMood}</Text>
        </Text>
        <View style={styles.currentMood}>
             <TouchableOpacity onPress={() => setMood('Angry')} >
                 <Text style={styles.emoji}>😡</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => setMood('Frustrated')}>
                 <Text style={styles.emoji}>☹️</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => setMood('Neutral')}>
                 <Text style={styles.emoji}>😐</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => setMood('Good')}>
                 <Text style={styles.emoji}>😁</Text>
             </TouchableOpacity>
             <TouchableOpacity onPress={() => setMood('Amazing')}>
                 <Text style={styles.emoji}>🤩</Text>
             </TouchableOpacity>
        </View>
        <Text style={styles.stressTitle}>Today's Stress level: {sliderValue}</Text>
        <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={10}
            step={1}
            minimumTrackTintColor="#E00C0C"
            maximumTrackTintColor="#00FF00"
            thumbTintColor="#000000"
            onValueChange={(value) => setSliderValue(value)}
            value={sliderValue}
         />
         <View style={styles.reflectionSection}>
            <Text style={styles.emoji}>🐤</Text>
            <Text style={styles.cardText}>No Reflections Yet</Text>
            <Text style={styles.reflectionTitle}>Start logging your first thoughts</Text>
            <TouchableOpacity style={styles.reflectionButton}>
              <Text>+ New Reflection</Text>
            </TouchableOpacity>
         </View>
         <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>🪳 Log a bug</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>🐤 Duck Mode</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonSection}>
             <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>🌙 End of day</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>💡 Quick Idea</Text>
             </TouchableOpacity>
          </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#555' },
    card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 2 },
    cardTitle: { fontWeight: 'bold', fontSize: 16 },
    cardText: { color: '#666', marginTop: 5 },
    aiPrompt: { fontStyle: 'italic', color: '#007AFF', marginTop: 8 },
    slider: { width: '100%', minHeight: 5 },
    stressTitle: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: "#333 ", textAlign: 'center', marginTop: 20 },
    currentMood: { justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row' },
    emoji: { fontSize: 50 },
    buttonSection: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, flexWrap: 'wrap' },
    button: { backgroundColor: '#D9D9D9', padding: 25, borderRadius: 10, alignItems: 'center', width: 175},
    buttonText: { color: '#000000', fontSize: 18, alignContent: 'center' },
    reflectionSection: { backgroundColor: "#D9D9D9", alignItems: 'center', marginTop: 20, marginBottom: 20, height: 225, width: 375 },
    reflectionButton: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, alignItems: 'center', width: 175 },
    reflectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10, color: '#555', marginTop: 10}
});

export default HomeScreen;
