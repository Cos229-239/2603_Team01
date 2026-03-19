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

const TextInputExample = () => {
    //const [text, onChangeText] = React.useState('Enter user');
    const [username, onSetUsername] = React.useState('Enter username');
    const [password, onSetPassword] = React.useState('Enter Password');
    const [displayText, setDisplayText] = React.useState('');
   // const [number, onChangeNumber] = React.useState('');

    const handleSubmit = () => {
        const combinedText = `Username: ${username}, Password: ${password}`
        setDisplayText(combinedText);
    }

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