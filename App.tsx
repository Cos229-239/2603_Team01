/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */



import React from 'react';
import { Text, StyleSheet, TextInput, Button } from 'react-native';
//import { Text, StyleSheet, TextInput } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

<<<<<<< Updated upstream
const TextInputExample = () => {
    //const [text, onChangeText] = React.useState('Enter user');
    const [username, onSetUsername] = React.useState('Enter username');
    const [password, onSetPassword] = React.useState('Enter Password');
    const [displayText, setDisplayText] = React.useState('');
   // const [number, onChangeNumber] = React.useState('');
=======
// Import Screens
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import JournalScreen from './src/screens/JournalScreen';
import MoodScreen from './src/screens/MoodScreen';
import RubberDuckScreen from './src/screens/RubberDuckScreen';
import Entry from './src/screens/Journal entry';
import EntryScreen from './src/screens/Testing';
>>>>>>> Stashed changes

    const handleSubmit = () => {
        const combinedText = `Username: ${username}, Password: ${password}`
        setDisplayText(combinedText);
    }

<<<<<<< Updated upstream
    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <Text style={styles.text}> Username: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onSetUsername} //onchangetext
                    value={username} //text
                />
                <Text style={styles.text}> Password: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onSetPassword} //onchangetext
                    value={password} //text
                />
                <Button
                    title="Log In"
                    onPress={handleSubmit}
                />
                <Text>{displayText}</Text>
                <Button
                    title="Sign-Up"
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
=======
const MainTabs = () => {
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#007AFF', headerShown: true }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Journal" component={JournalScreen} />
      <Tab.Screen name="Mood" component={MoodScreen} />
      <Tab.Screen name="Entries" component={Entry} />
      <Tab.Screen name="Rubber Duck" component={RubberDuckScreen} />
      <Tab.Screen name="New Entry" component={EntryScreen} />
    </Tab.Navigator>
  );
>>>>>>> Stashed changes
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
           flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
           fontSize: 20,
           color: '#333',
        },
});

export default TextInputExample;