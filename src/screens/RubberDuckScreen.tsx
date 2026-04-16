import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Image} from 'react-native';
import Voice from '@react-native-voice/voice';
import { getDuckResponse } from '../lib/gemini';
import { useTheme } from '../context/ThemeContext';
import Image from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const RubberDuckScreen = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([
    { id: '1', text: "Quack! I'm your debugging assistant. Tell me about the bug you're chasing.", isUser: false },
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const hasUserMessages = messages.some(m => m.isUser);

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
      style={[styles.container, { backgroundColor: colors.background }]}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
    >
      <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.card }]}>
        <Image
          source={require('../assets/images/Wade_no-bg.png')}
          style={styles.headerIcon}
        />
        <View>
          <Text style={[styles.headerTitle, { color: colors.text }]}>Wade</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>The Rubber Duck Assistant</Text>
        </View>
      </View>

      {!hasUserMessages && (
        <View style={styles.emptyState}>
          <Image
            source={require('../assets/images/Wade_no-bg.png')}
            style={styles.emptyStateDuck}
          />
          <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>
            Explain it to the duck
          </Text>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.chatContainer}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        renderItem={({item}) => (
          <View style={[styles.messageBubble, item.isUser ? { alignSelf: 'flex-end', backgroundColor: colors.primary } : { alignSelf: 'flex-start', backgroundColor: colors.card }]}>
            <Text style={[styles.messageText, { color: item.isUser ? '#fff' : colors.text }]}>
              {item.text}
            </Text>
            {item.suggestion && (
              <View style={[styles.suggestionBox, { borderTopColor: colors.border }]}>
                <Text style={[styles.suggestionLabel, { color: colors.primary }]}>Suggestion:</Text>
                <Text style={[styles.suggestionText, { color: colors.textSecondary }]}>{item.suggestion}</Text>
              </View>
            )}
          </View>
        )}
      />

      <View style={[styles.inputArea, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
        <TouchableOpacity
          style={[styles.micButton, { backgroundColor: colors.background }, isListening && styles.micButtonActive]}
          onPress={toggleListening}
        >
          <Text style={styles.micButtonText}>{isListening ? '⏹' : '🎤'}</Text>
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
          placeholder={isListening ? "Listening..." : "Talk to the duck..."}
          placeholderTextColor={colors.textSecondary}
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
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text style={[styles.sendButtonText, { color: colors.primary }]}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
  },
  headerIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
  },
  chatContainer: { padding: 20 },
  messageBubble: { padding: 12, borderRadius: 15, marginBottom: 15, maxWidth: '85%' },
  messageText: { fontSize: 16, lineHeight: 22 },
  suggestionBox: { marginTop: 10, paddingTop: 10, borderTopWidth: 1 },
  suggestionLabel: { fontWeight: 'bold', fontSize: 12, marginBottom: 2 },
  suggestionText: { fontSize: 14, fontStyle: 'italic' },
  inputArea: { flexDirection: 'row', padding: 15, borderTopWidth: 1, alignItems: 'center' },
  input: { flex: 1, height: 45, borderRadius: 22, paddingHorizontal: 15, marginRight: 10, borderWidth: 1 },
  micButton: { width: 45, height: 45, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  micButtonActive: { backgroundColor: '#FF3B30' },
  micButtonText: { fontSize: 20 },
  sendButton: { paddingHorizontal: 15, minWidth: 60, alignItems: 'center' },
  sendButtonText: { fontWeight: 'bold', fontSize: 16 }
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  emptyStateDuck: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  emptyStateText: {
    fontSize: 16,
    fontStyle: 'italic',
  }
});

export default RubberDuckScreen;
