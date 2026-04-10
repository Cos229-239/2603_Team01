import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert, 
  TextInput,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useNavigation, CommonActions, useIsFocused } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';

const AccountSettings = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');

  useEffect(() => {
    if (isFocused) {
      fetchUserData();
    }
  }, [isFocused]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error fetching user:', error);
        Alert.alert('Error', 'Failed to load user data.');
        return;
      }

      if (data?.user) {
        setEmail(data.user.email || '');
        
        // Priority 1: Check if username exists in user_metadata
        let displayUsername = data.user.user_metadata?.username;
        
        // Priority 2: Fallback to email-based username
        if (!displayUsername && data.user.email) {
          displayUsername = data.user.email.split('@')[0];
        }
        
        setUsername(displayUsername || '');
        setTempUsername(displayUsername || '');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      Alert.alert('Error', 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveUsername = async () => {
    // Validate username is not empty
    if (!tempUsername.trim()) {
      Alert.alert('Error', 'Username cannot be empty.');
      return;
    }

    try {
      // Update user metadata with new username
      const { data, error } = await supabase.auth.updateUser({
        data: { username: tempUsername.trim() }
      });

      if (error) {
        Alert.alert('Error', 'Failed to update username. Please try again.');
        console.error('Update error:', error);
        return;
      }

      // Verify the update was successful
      if (data?.user) {
        const savedUsername = data.user.user_metadata?.username;
        if (savedUsername === tempUsername.trim()) {
          setUsername(tempUsername.trim());
          setIsEditingUsername(false);
          Alert.alert('Success', 'Username updated successfully!');
        } else {
          Alert.alert('Error', 'Username update was not saved properly.');
        }
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred.');
      console.error('Update error:', error);
    }
  };

  const handleCancelEdit = () => {
    setTempUsername(username);
    setIsEditingUsername(false);
  };

  const handleChangePassword = () => {
    Alert.alert('Change Password', 'This feature will be implemented soon.');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', style: 'destructive', onPress: () => {
          Alert.alert('Delete Account', 'This feature will be implemented soon.');
        }}
      ]
    );
  };

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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Profile Information</Text>
          
          {/* Email (Read-only) */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.readOnlyField}>
              <Text style={styles.readOnlyText}>{email}</Text>
            </View>
          </View>

          {/* Username (Editable) */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username</Text>
            {isEditingUsername ? (
              <View>
                <TextInput
                  style={styles.input}
                  value={tempUsername}
                  onChangeText={setTempUsername}
                  placeholder="Enter username"
                  autoCapitalize="none"
                />
                <View style={styles.editButtonsContainer}>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.cancelButton]} 
                    onPress={handleCancelEdit}
                  >
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.saveButton]} 
                    onPress={handleSaveUsername}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.usernameContainer}>
                <View style={styles.readOnlyField}>
                  <Text style={styles.readOnlyText}>{username}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.editIconButton} 
                  onPress={() => setIsEditingUsername(true)}
                >
                  <Text style={styles.editIconText}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Activity Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <Text style={styles.activityCount}>0</Text>
              <Text style={styles.activityLabel}>Reflections</Text>
            </View>
            <View style={styles.activityDivider} />
            <View style={styles.activityItem}>
              <Text style={styles.activityCount}>0</Text>
              <Text style={styles.activityLabel}>Saved Snippets</Text>
            </View>
          </View>
        </View>

        {/* Account Actions Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={handleChangePassword}
          >
            <Text style={styles.actionButtonText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={handleDeleteAccount}
          >
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
              Delete Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Logout Button */}
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
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
    marginBottom: 8,
  },
  readOnlyField: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
  },
  readOnlyText: {
    fontSize: 16,
    color: '#666',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editIconButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  editIconText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
  },
  cancelButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  activityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  activityItem: {
    alignItems: 'center',
    flex: 1,
  },
  activityCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  activityLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  activityDivider: {
    width: 1,
    backgroundColor: '#e0e0e0',
  },
  actionButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  deleteButton: {
    borderColor: '#FF3B30',
  },
  deleteButtonText: {
    color: '#FF3B30',
  },
  logoutContainer: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    elevation: 2,
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
