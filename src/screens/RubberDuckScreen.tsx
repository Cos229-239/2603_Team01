import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator} from 'react-native';
import Voice from '@react-native-voice/voice';
import { getDuckResponse } from '../lib/gemini';

const RubberDuckScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { id: '1', text: "Quack! I'm your debugging assistant. Tell me about the bug you're chasing.", isUser: false },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
      console.log("Voice module:", Voice);
    Voice.onSpeechStart = () => setIsListening(true);
    Voice.onSpeechEnd = () => setIsListening(false);
    Voice.onSpeechError = (e) => {
      console.error("Speech Error:", e);
      setIsListening(false);
    };
    Voice.onSpeechResults = (e) => {
      if (e.value && e.value.length > 0) {
        const speechText = e.value[0];
        handleSend(speechText);
      }
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const toggleListening = async () => {
    try {
      if (isListening) {
        await Voice.stop();
      } else {
        setInput('');
        await Voice.start('en-US');
      }
    } catch (e) {
      console.error("Voice Start Error:", e);
    }
  };

  const handleSend = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || isLoading) return;

    // Add user message to UI
    const userMessage = { id: Date.now().toString(), text: messageText, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Gemini AI
      const response = await getDuckResponse(messageText);

      const duckResponse = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        suggestion: response.suggestion,
        isUser: false
      };

      setMessages(prev => [...prev, duckResponse]);
    } catch (error) {
      console.error("Handle Send Error:", error);
      const errorResponse = {
        id: Date.now().toString(),
        text: "Quack! My brain is a bit scrambled right now. Try again?",
        isUser: false
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 200);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({item}) => (
          <View style={[styles.messageBubble, item.isUser ? styles.userBubble : styles.duckBubble]}>
            <Text style={[styles.messageText, item.isUser ? styles.userText : styles.duckText]}>
              {item.text}
            </Text>
            {item.suggestion && (
              <View style={styles.suggestionBox}>
                <Text style={styles.suggestionLabel}>Suggestion:</Text>
                <Text style={styles.suggestionText}>{item.suggestion}</Text>
              </View>
            )}
          </View>
        )}
      />

      <View style={styles.inputArea}>
        <TouchableOpacity
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={toggleListening}
        >
          <Text style={styles.micButtonText}>{isListening ? '⏹' : '🎤'}</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder={isListening ? "Listening..." : "Talk to the duck..."}
          value={input}
          onChangeText={setInput}
          editable={!isLoading && !isListening}
        />

        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => handleSend()}
          disabled={isLoading || isListening}
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#007AFF" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  chatContainer: { padding: 20 },
  messageBubble: { padding: 12, borderRadius: 15, marginBottom: 15, maxWidth: '85%' },
  userBubble: { alignSelf: 'flex-end', backgroundColor: '#007AFF' },
  duckBubble: { alignSelf: 'flex-start', backgroundColor: '#f0f0f0', borderBottomLeftRadius: 2 },
  messageText: { fontSize: 16, lineHeight: 22 },
  userText: { color: '#fff' },
  duckText: { color: '#333' },
  suggestionBox: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#ddd' },
  suggestionLabel: { fontWeight: 'bold', fontSize: 12, color: '#007AFF', marginBottom: 2 },
  suggestionText: { fontSize: 14, color: '#555', fontStyle: 'italic' },
  inputArea: { flexDirection: 'row', padding: 15, borderTopWidth: 1, borderTopColor: '#eee', alignItems: 'center', backgroundColor: '#fff' },
  input: { flex: 1, height: 45, backgroundColor: '#f9f9f9', borderRadius: 22, paddingHorizontal: 15, marginRight: 10, borderWidth: 1, borderColor: '#eee' },
  micButton: { width: 45, height: 45, borderRadius: 22, backgroundColor: '#f0f0f0', justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  micButtonActive: { backgroundColor: '#FF3B30' },
  micButtonText: { fontSize: 20 },
  sendButton: { paddingHorizontal: 15, minWidth: 60, alignItems: 'center' },
  sendButtonText: { color: '#007AFF', fontWeight: 'bold', fontSize: 16 }
});

export default RubberDuckScreen;
