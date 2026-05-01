import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

interface ActivityGridProps {
  colors: any;
  getFontSize: (size: number) => number;
}

interface DayActivity {
  date: string;
  count: number;
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ colors, getFontSize }) => {
  const [activityData, setActivityData] = useState<DayActivity[]>([]);
  const [maxActivity, setMaxActivity] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      loadActivityData();
    }, [])
  );

  const loadActivityData = async () => {
    try {
      // Load journal entries
      const savedEntries = await AsyncStorage.getItem('journal_entries');
      const journalEntries = savedEntries ? JSON.parse(savedEntries) : [];

      // Load mood logs
      const savedMoods = await AsyncStorage.getItem('mood_logs');
      const moodLogs = savedMoods ? JSON.parse(savedMoods) : [];

      // Create activity map: date string -> count
      const activityMap: { [key: string]: number } = {};

      // Count journal entries by date
      journalEntries.forEach((entry: any) => {
        if (entry.date) {
          const dateString = new Date(entry.date).toISOString().split('T')[0];
          activityMap[dateString] = (activityMap[dateString] || 0) + 1;
        }
      });

      // Count mood logs by date
      moodLogs.forEach((log: any) => {
        if (log.date) {
          const dateString = new Date(log.date).toISOString().split('T')[0];
          activityMap[dateString] = (activityMap[dateString] || 0) + 1;
        }
      });

      // Generate last 35 days (7 columns × 5 rows)
      const days: DayActivity[] = [];
      const today = new Date();
      
      for (let i = 34; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        
        days.push({
          date: dateString,
          count: activityMap[dateString] || 0
        });
      }

      setActivityData(days);
      
      // Calculate max activity for color scaling
      const max = Math.max(...days.map(d => d.count), 1);
      setMaxActivity(max);
    } catch (error) {
      console.error('Failed to load activity data:', error);
    }
  };

  const getActivityColor = (count: number) => {
    if (count === 0) {
      return colors.activityEmpty || colors.background;
    }
    
    // Create intensity levels based on activity count
    const intensity = count / maxActivity;
    const primaryColor = colors.primary || '#007AFF';
    
    // Parse RGB from hex color
    const hex = primaryColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    
    // Blend with background for lower intensity
    if (intensity <= 0.25) {
      return `rgba(${r}, ${g}, ${b}, 0.2)`;
    } else if (intensity <= 0.5) {
      return `rgba(${r}, ${g}, ${b}, 0.4)`;
    } else if (intensity <= 0.75) {
      return `rgba(${r}, ${g}, ${b}, 0.7)`;
    } else {
      return `rgba(${r}, ${g}, ${b}, 1)`;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text, fontSize: getFontSize(16) }]}>
        Activity
      </Text>
      
      <View style={styles.gridWrapper}>
        <View style={styles.grid}>
          {activityData.map((day, index) => (
            <View
              key={day.date}
              style={[
                styles.day,
                { 
                  backgroundColor: getActivityColor(day.count),
                  borderColor: colors.border,
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={[styles.legendText, { color: colors.textSecondary, fontSize: getFontSize(11) }]}>
          Less
        </Text>
        <View style={styles.legendSquares}>
          <View style={[styles.legendSquare, { backgroundColor: colors.background, borderColor: colors.border }]} />
          <View style={[styles.legendSquare, { backgroundColor: `rgba(${getPrimaryRGB(colors.primary || '#007AFF')}, 0.2)` }]} />
          <View style={[styles.legendSquare, { backgroundColor: `rgba(${getPrimaryRGB(colors.primary || '#007AFF')}, 0.4)` }]} />
          <View style={[styles.legendSquare, { backgroundColor: `rgba(${getPrimaryRGB(colors.primary || '#007AFF')}, 0.7)` }]} />
          <View style={[styles.legendSquare, { backgroundColor: colors.primary || '#007AFF' }]} />
        </View>
        <Text style={[styles.legendText, { color: colors.textSecondary, fontSize: getFontSize(11) }]}>
          More
        </Text>
      </View>
    </View>
  );
};

// Helper function to extract RGB values from hex color
const getPrimaryRGB = (hexColor: string): string => {
  const hex = hexColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r}, ${g}, ${b}`;
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  title: {
    fontWeight: '600',
    marginBottom: 16,
  },
  gridWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 7 * 18 + 6 * 3, // 7 squares × 18px width + 6 gaps × 3px
    gap: 3,
  },
  day: {
    width: 18,
    height: 18,
    borderRadius: 3,
    borderWidth: 1,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  legendText: {
    fontWeight: '500',
  },
  legendSquares: {
    flexDirection: 'row',
    gap: 4,
  },
  legendSquare: {
    width: 12,
    height: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
});

export default ActivityGrid;