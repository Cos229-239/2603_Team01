import React, {useState} from 'react';
import {Text, StyleSheet, TextInput, Button, View, SafeAreaView, Alert} from 'react-native';
import {supabase} from '../lib/supabase';

const LoginScreen = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DevReflect</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter email"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!loading}
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry
          editable={!loading}
        />
      </View>
      <Button title={loading ? "Loading..." : "Log In"} onPress={handleLogin} disabled={loading} />
      <View style={{marginTop: 10}}>
        <Button title={loading ? "Loading..." : "Sign Up"} color="#666" onPress={handleSignUp} disabled={loading} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#007AFF' },
  formGroup: { marginBottom: 15 },
  label: { fontSize: 16, color: '#333' },
  input: { height: 45, borderWidth: 1, padding: 10, borderColor: '#ccc', borderRadius: 8, marginTop: 5 },
});

export default LoginScreen;