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
import { SettingsCard, SectionHeader } from './components/SettingsComponents';

const AccountSettings = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState('');
  const { colors, getFontSize } = useTheme();

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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Profile Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Profile Information" colors={colors} fontSize={getFontSize} />
        
        {/* Email (Read-only) */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>Email</Text>
          <View style={[styles.readOnlyField, { backgroundColor: colors.background }]}>
            <Text style={[styles.readOnlyText, { color: colors.text, fontSize: getFontSize(15) }]}>{email}</Text>
          </View>
        </View>

        {/* Username (Editable) */}
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>Username</Text>
          {isEditingUsername ? (
            <View>
              <TextInput
                style={[
                  styles.input, 
                  { 
                    backgroundColor: colors.background, 
                    borderColor: colors.border, 
                    color: colors.text,
                    fontSize: getFontSize(15)
                  }
                ]}
                value={tempUsername}
                onChangeText={setTempUsername}
                placeholder="Enter username"
                placeholderTextColor={colors.textSecondary}
                autoCapitalize="none"
              />
              <View style={styles.editButtonsContainer}>
                <TouchableOpacity 
                  style={[styles.editButton, { backgroundColor: colors.background, borderColor: colors.border, borderWidth: 1 }]} 
                  onPress={handleCancelEdit}
                >
                  <Text style={[styles.buttonText, { color: colors.text, fontSize: getFontSize(14) }]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.editButton, { backgroundColor: colors.primary }]} 
                  onPress={handleSaveUsername}
                >
                  <Text style={[styles.buttonText, { color: '#fff', fontSize: getFontSize(14) }]}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={styles.usernameContainer}>
              <View style={[styles.readOnlyField, { backgroundColor: colors.background, flex: 1 }]}>
                <Text style={[styles.readOnlyText, { color: colors.text, fontSize: getFontSize(15) }]}>{username}</Text>
              </View>
              <TouchableOpacity 
                style={styles.editIconButton} 
                onPress={() => setIsEditingUsername(true)}
              >
                <Text style={[styles.editIconText, { color: colors.primary, fontSize: getFontSize(14) }]}>Edit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </SettingsCard>

      {/* Activity Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Activity" colors={colors} fontSize={getFontSize} />
        <View style={styles.activityContainer}>
          <View style={styles.activityItem}>
            <Text style={[styles.activityCount, { color: colors.primary, fontSize: getFontSize(28) }]}>0</Text>
            <Text style={[styles.activityLabel, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>Reflections</Text>
          </View>
          <View style={[styles.activityDivider, { backgroundColor: colors.border }]} />
          <View style={styles.activityItem}>
            <Text style={[styles.activityCount, { color: colors.primary, fontSize: getFontSize(28) }]}>0</Text>
            <Text style={[styles.activityLabel, { color: colors.textSecondary, fontSize: getFontSize(14) }]}>Saved Snippets</Text>
          </View>
        </View>
      </SettingsCard>

      {/* Account Actions Section */}
      <SettingsCard colors={colors}>
        <SectionHeader title="Account Actions" colors={colors} fontSize={getFontSize} />
        
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: colors.background, borderColor: colors.border }]} 
          onPress={handleChangePassword}
        >
          <Text style={[styles.actionButtonText, { color: colors.text, fontSize: getFontSize(15) }]}>Change Password</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]} 
          onPress={handleDeleteAccount}
        >
          <Text style={[styles.actionButtonText, styles.deleteButtonText, { fontSize: getFontSize(15) }]}>
            Delete Account
          </Text>
        </TouchableOpacity>
      </SettingsCard>

      {/* Logout Button */}
      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: '#FF3B30' }]} 
        onPress={handleLogout}
      >
        <Text style={[styles.logoutText, { fontSize: getFontSize(16) }]}>Log Out</Text>
      </TouchableOpacity>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '500',
    marginBottom: 8,
  },
  readOnlyField: {
    padding: 12,
    borderRadius: 8,
  },
  readOnlyText: {
    fontWeight: '500',
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
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  editButtonsContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
  },
  editButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
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
    fontWeight: 'bold',
  },
  activityLabel: {
    marginTop: 5,
  },
  activityDivider: {
    width: 1,
  },
  actionButton: {
    borderWidth: 1,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    fontWeight: '600',
  },
  deleteButton: {
    borderColor: '#FF3B30',
    backgroundColor: 'transparent',
  },
  deleteButtonText: {
    color: '#FF3B30',
  },
  logoutButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default AccountSettings;
