import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const AccountSettings = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        Alert.alert('Error', 'Failed to logout. Please try again.');
        console.error('Logout error:', error);
        return;
      }

      // Navigate back to Login screen and reset navigation stack
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Account Settings Placeholder</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Back to Settings</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.logoutContainer}>
        <TouchableOpacity 
          style={styles.logoutButton} 
          onPress={handleLogout}
        >
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutContainer: {
    padding: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AccountSettings;
