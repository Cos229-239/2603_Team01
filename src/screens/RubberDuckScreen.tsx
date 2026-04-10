import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';

const RubberDuckScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { id: '1', text: "Quack! I'm your debugging assistant. Tell me about the bug you're chasing.", isUser: false },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now().toString(), text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulated AI Response
    setTimeout(() => {
      const duckResponse = {
        id: (Date.now() + 1).toString(),
        text: "Interesting... have you checked the console logs or the network tab? Sometimes the answer is hidden in the stack trace.",
        isUser: false
      };
      setMessages(prev => [...prev, duckResponse]);
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={100}
    >
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        renderItem={({item}) => (
          <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.duckBubble]}>
            <Text style={[styles.messageText, item.isUser ? styles.userText : styles.duckText]}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Talk to the duck..."
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatContainer: { padding: 20 },
  messageBubble: { padding: 12, borderRadius: 15, marginBottom: 10, maxWidth: '80%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  duckBubble: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0' },
  messageText: { fontSize: 16 },
  userText: { color: '#fff' },
  duckText: { color: '#333' },
  inputArea: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center' },
  input: { flex: 1, height: 40, backgroundColor: '#f9f9f9', borderRadius: 20, paddingHorizontal: 15, marginRight: 10 },
  sendButton: { paddingHorizontal: 15 },
  sendButtonText: { color: '#007AFF', fontWeight: 'bold' }
});

export default RubberDuckScreen;
