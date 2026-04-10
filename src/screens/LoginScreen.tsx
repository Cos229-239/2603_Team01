import React, {useState} from 'react';
import {Text, StyleSheet, TextInput, Button, View, SafeAreaView} from 'react-native';

const LoginScreen = ({navigation}: any) => {
  const [username, onSetUsername] = useState('');
  const [password, onSetPassword] = useState('');

  const handleLogin = () => {
    // In a real app, you'd validate credentials here
    console.log('Logging in...');
    navigation.replace('MainTabs'); // Navigate to the Home screen (Tabs)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>DevReflect</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onSetUsername}
          value={username}
          placeholder="Enter username"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={onSetPassword}
          value={password}
          placeholder="Enter password"
          secureTextEntry
        />
      </View>
      <Button title="Log In" onPress={handleLogin} />
      <View style={{marginTop: 10}}>
        <Button title="Sign-Up" color="#666" onPress={() => {}} />
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
