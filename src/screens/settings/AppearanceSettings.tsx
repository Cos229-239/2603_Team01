import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

const AppearanceSettings = () => {
  const { theme, setTheme, colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>App Theme</Text>

      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: colors.card,
            borderColor: theme === 'light' ? colors.primary : colors.border,
            borderWidth: theme === 'light' ? 2 : 1,
          },
        ]}
        onPress={() => setTheme('light')}
      >
        <Text
          style={[
            styles.optionText,
            { color: theme === 'light' ? colors.primary : colors.text },
          ]}
        >
          Light Mode
        </Text>
        {theme === 'light' && (
          <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.option,
          {
            backgroundColor: colors.card,
            borderColor: theme === 'dark' ? colors.primary : colors.border,
            borderWidth: theme === 'dark' ? 2 : 1,
          },
        ]}
        onPress={() => setTheme('dark')}
      >
        <Text
          style={[
            styles.optionText,
            { color: theme === 'dark' ? colors.primary : colors.text },
          ]}
        >
          Dark Mode
        </Text>
        {theme === 'dark' && (
          <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    borderRadius: 10,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  checkmark: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default AppearanceSettings;
