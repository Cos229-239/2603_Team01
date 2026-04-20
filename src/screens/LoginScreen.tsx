import React, {useState} from 'react';
import {Text, StyleSheet, TextInput, Button, View, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {supabase} from '../lib/supabase';
import { useTheme } from '../context/ThemeContext';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  // Handle user login with Supabase Auth
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const {data, error} = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert('Login Failed', error.message);
      } else {
        console.log('Login successful:', data.user?.email);
        navigation.replace('MainTabs');
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle user sign up with Supabase Auth
  const handleSignUp = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const {error} = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        Alert.alert('Sign Up Failed', error.message);
      } else {
        Alert.alert(
          'Success',
          'Account created! Please check your email to verify your account, then log in.',
          [
            {
              text: 'OK',
              onPress: () => {
                setEmail('');
                setPassword('');
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', 'An unexpected error occurred');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}
    >
      <View style={styles.container}>
        <Text style={[styles.title, { color: colors.primary }]}>DevReflect</Text>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Email:</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
            onChangeText={setEmail}
            value={email}
            placeholder="Enter email"
            placeholderTextColor={colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!loading}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: colors.text }]}>Password:</Text>
          <TextInput
            style={[styles.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.text }]}
            onChangeText={setPassword}
            value={password}
            placeholder="Enter password"
            placeholderTextColor={colors.textSecondary}
            secureTextEntry
            editable={!loading}
          />
        </View>
        <Button title={loading ? "Loading..." : "Log In"} onPress={handleLogin} disabled={loading} />
        <View style={{marginTop: 10}}>
          <Button title={loading ? "Loading..." : "Sign Up"} color="#666" onPress={handleSignUp} disabled={loading} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 16 },
  input: { height: 45, borderWidth: 1, padding: 10, borderRadius: 8, marginTop: 5 },
});

export default LoginScreen;