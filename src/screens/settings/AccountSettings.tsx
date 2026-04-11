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
import { useTheme } from '../../context/ThemeContext';

const AccountSettings = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const { colors } = useTheme();

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
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.scrollView}>
        {/* Profile Section */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Profile Information</Text>
          
          {/* Email (Read-only) */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Email</Text>
            <View style={[styles.readOnlyField, { backgroundColor: colors.background }]}>
              <Text style={[styles.readOnlyText, { color: colors.textSecondary }]}>{email}</Text>
            </View>
          </View>

          {/* Username (Editable) */}
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>Username</Text>
            {isEditingUsername ? (
              <View>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
                  value={tempUsername}
                  onChangeText={setTempUsername}
                  placeholder="Enter username"
                  placeholderTextColor={colors.textSecondary}
                  autoCapitalize="none"
                />
                <View style={styles.editButtonsContainer}>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.cancelButton, { backgroundColor: colors.background }]} 
                    onPress={handleCancelEdit}
                  >
                    <Text style={[styles.cancelButtonText, { color: colors.text }]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles.editButton, styles.saveButton, { backgroundColor: colors.primary }]} 
                    onPress={handleSaveUsername}
                  >
                    <Text style={styles.saveButtonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.usernameContainer}>
                <View style={[styles.readOnlyField, { backgroundColor: colors.background }]}>
                  <Text style={[styles.readOnlyText, { color: colors.textSecondary }]}>{username}</Text>
                </View>
                <TouchableOpacity 
                  style={styles.editIconButton} 
                  onPress={() => setIsEditingUsername(true)}
                >
                  <Text style={[styles.editIconText, { color: colors.primary }]}>Edit</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {/* Activity Section */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Activity</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <Text style={[styles.activityCount, { color: colors.primary }]}>0</Text>
              <Text style={[styles.activityLabel, { color: colors.textSecondary }]}>Reflections</Text>
            </View>
            <View style={[styles.activityDivider, { backgroundColor: colors.border }]} />
            <View style={styles.activityItem}>
              <Text style={[styles.activityCount, { color: colors.primary }]}>0</Text>
              <Text style={[styles.activityLabel, { color: colors.textSecondary }]}>Saved Snippets</Text>
            </View>
          </View>
        </View>

        {/* Account Actions Section */}
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Account Actions</Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, { backgroundColor: colors.card, borderColor: colors.border }]} 
            onPress={handleChangePassword}
          >
            <Text style={[styles.actionButtonText, { color: colors.text }]}>Change Password</Text>
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
      <View style={[styles.logoutContainer, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
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
  container: { flex: 1 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  scrollView: { flex: 1 },
  section: { marginTop: 20, paddingHorizontal: 20, paddingVertical: 15 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 15 },
  fieldContainer: { marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 8 },
  readOnlyField: { padding: 12, borderRadius: 8 },
  readOnlyText: { fontSize: 16 },
  usernameContainer: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  editIconButton: { paddingHorizontal: 12, paddingVertical: 8 },
  editIconText: { fontSize: 14, fontWeight: '500' },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, fontSize: 16 },
  editButtonsContainer: { flexDirection: 'row', gap: 10, marginTop: 10 },
  editButton: { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center' },
  cancelButton: {},
  cancelButtonText: { fontSize: 14, fontWeight: '500' },
  saveButton: {},
  saveButtonText: { color: '#fff', fontSize: 14, fontWeight: '500' },
  activityContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10 },
  activityItem: { alignItems: 'center', flex: 1 },
  activityCount: { fontSize: 28, fontWeight: 'bold' },
  activityLabel: { fontSize: 14, marginTop: 5 },
  activityDivider: { width: 1 },
  actionButton: { borderWidth: 1, padding: 15, borderRadius: 8, marginBottom: 10, alignItems: 'center' },
  actionButtonText: { fontSize: 16, fontWeight: '500' },
  deleteButton: { borderColor: '#FF3B30' },
  deleteButtonText: { color: '#FF3B30' },
  logoutContainer: { padding: 20, paddingBottom: 40, borderTopWidth: 1 },
  logoutButton: { backgroundColor: '#FF3B30', paddingVertical: 12, borderRadius: 8, alignItems: 'center', elevation: 2 },
  logoutText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default AccountSettings;
