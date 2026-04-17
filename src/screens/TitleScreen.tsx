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


const TitleScreen = () => {
  return (
    <SafeAreaView style={styles.screenContainer}>
      <ScrollView>
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Image source={require('../../assets/images/Wade.png')}
            style={{ width: 100, height: 100, borderRadius: 0, alignContent: 'center', alignSelf: 'center'}} />
          </View>
          <View style={styles.sectionTitle}>
            <Text style={styles.title}>DevReflect</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>A Dev Journal for the thoughts </Text>
            <Text style={styles.sectionTitle}>you don't want to lose.</Text>
          </View>
          <View style={styles.section}>
            // TODO: Replace with actual login.
            <TouchableOpacity style={styles.actionButtonPrimary}>
              <Text style={styles.actionButtonTextPrimary}>Log in</Text>
            </TouchableOpacity>
            // TODO: Replace with actual account creation flow.
            <TouchableOpacity style={styles.actionButtonSecondary}>
              <Text style={styles.actionButtonTextSecondary}>Create Account</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              // TODO: Implement guest access flow that allows users to use the app without creating an account, but with limited features.
              <Text style={styles.guestButtonText}>Continue as Guest</Text>
            </TouchableOpacity>
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
    height: 1,
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

  // ===== Inputs / Panels =====
  input: {
    backgroundColor: '#D9D9D9',
    padding: 15,
    borderRadius: 12,
    minHeight: 90,
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

export default TitleScreen;