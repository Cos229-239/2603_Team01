import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const LoginScreenTest = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.sectionTitle}>Sign in to your DevReflect account</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.tagText}>Email</Text>
            <TextInput style={styles.input} placeholder="dev@example.com" />
          </View>
          <View style={styles.section}>
            <Text style={styles.tagText}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry />
            <Text style={[styles.tagText, { alignSelf: 'flex-start', marginTop: 5 }]}>Forgot password?</Text>
          </View>
          <View style={styles.section}>
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.actionButtonTextSecondary}>Sign In</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
          </View>
          
          <View style={styles.section}>
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.actionButtonTextSecondary}>Use Pin / Touch ID</Text>
            </TouchableOpacity>
             </View>
          <View style={styles.section}>
            <View style={styles.divider} />
            <Text style={styles.guestButtonText}>Don't have an account?</Text>
            <Text style={styles.guestButtonText}>Register here!</Text>

          </View>
          <View style={styles.section}>
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
  },

  contentContainer: {
    flex: 1,
    padding: 16,
  },

  section: {
    marginBottom: 20,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  divider: {
    height: .5,
    backgroundColor: '#000000',
    marginVertical: 10,
  },

  // ===== Typography =====
  title: {
    fontSize: 38,
    fontWeight: '400',
    color: '#000000',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555555',
    marginBottom: 10,
    alignSelf: 'center',
  },

  tagText: {
    fontSize: 10,
    color: '#000000',
  },

  actionButtonTextPrimary: {
    fontSize: 20,
    fontWeight: '300',
    color: '#FFFFFF',
  },

  actionButtonTextSecondary: {
    fontSize: 16,
    fontWeight: '400',
    color: '#000000',
  },

  warningButtonTextSecondary: {
    fontSize: 12,
    fontWeight: '400',
    color: '#E00C0C',
  },
  // ===== Inputs / Panels =====
  input: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 12,
    minHeight: 50,
    textAlignVertical: 'top',
    color: '#333333',
  },

  // ===== Tags =====
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  tag: {
    backgroundColor: '#D9D9D9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
  },

  // ===== Action Buttons =====
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  actionButtonPrimary: {
    flex: 0.48,
    backgroundColor: '#6B6B6B',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },

  actionButtonSecondary: {
    flex: 0.48,
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  // ===== Animations =====

  tagToggleButton: {
    backgroundColor: '#33623A',
  },

  tagToggleButtonText: {
    fontSize: 10,
    color: '#fff',
  },

  guestButtonText: {
    fontSize: 10,
    color: '#000000',
    textDecorationLine: 'underline',
    marginTop: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
});

export default LoginScreenTest;