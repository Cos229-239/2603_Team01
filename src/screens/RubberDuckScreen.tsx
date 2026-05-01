import React, {useState, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Image, Modal, Alert} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDuckResponse, ChatHistoryEntry, summarizeConversation } from '../lib/gemini';
import { useTheme } from '../context/ThemeContext';

interface Message {
  id: string;
  text: string;
  suggestion?: string;
  isUser: boolean;
  imageUri?: string;
  imageBase64?: string;
  imageType?: string;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  updatedAt: string;
}

const RubberDuckScreen = ({ navigation }: any) => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [currentSessionId, setCurrentSessionId] = useState<string>(Date.now().toString());
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Quack! I'm your debugging assistant. Tell me about the bug you're chasing.", isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [historyModalVisible, setHistoryModalVisible] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);

  const insets = useSafeAreaInsets();
  const flatListRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const hasUserMessages = messages.length > 1;

  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const stored = await AsyncStorage.getItem('rubber_duck_history');
      if (stored) {
        setConversations(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load history", e);
    }
  };

  const saveConversation = async (msgs: Message[]) => {
    try {
      const firstUserMsg = msgs.find(m => m.isUser)?.text || "New Chat";
      const title = firstUserMsg.length > 35 ? firstUserMsg.substring(0, 32) + "..." : firstUserMsg;

      const currentConv: Conversation = {
        id: currentSessionId,
        title,
        messages: msgs,
        updatedAt: new Date().toISOString()
      };

      const updatedHistory = [currentConv, ...conversations.filter(c => c.id !== currentSessionId)];
      setConversations(updatedHistory);
      await AsyncStorage.setItem('rubber_duck_history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error("Failed to save conversation", e);
    }
  };

  const startNewConversation = () => {
    setCurrentSessionId(Date.now().toString());
    setMessages([{ id: '1', text: "Quack! Fresh water! What's the new problem we're solving?", isUser: false }]);
    setHistoryModalVisible(false);
  };

  const loadSession = (conv: Conversation) => {
    setCurrentSessionId(conv.id);
    setMessages(conv.messages);
    setHistoryModalVisible(false);
  };

  const handleExport = async () => {
    if (messages.length < 2) {
      Alert.alert("Nothing to export", "Try talking to Wade first!");
      return;
    }

    setIsLoading(true);
    try {
      const history: ChatHistoryEntry[] = messages.map(m => ({
        role: m.isUser ? "user" : "model",
        parts: [{ text: m.text }]
      }));

      const summary = await summarizeConversation(history);

      // Navigate to Journal entry screen (JournalEntry name from App.tsx)
      navigation.navigate("Reflections", {
        screen: "JournalEntry",
        params: {
          entry: {
            title: summary.title,
            issue: summary.issue,
            solution: summary.solution,
            tags: summary.tags || ['RubberDuck', 'Wade']
          }
        }
      });
    } catch (error) {
      console.error("Export Error:", error);
      Alert.alert("Export Failed", "Could not generate summary.");
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.7,
    }, (response: ImagePickerResponse) => {
      if (response.assets && response.assets.length > 0) {
        setSelectedImage(response.assets[0]);
      }
    });
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      imageUri: selectedImage?.uri,
      imageBase64: selectedImage?.base64,
      imageType: selectedImage?.type
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const history: ChatHistoryEntry[] = newMessages.map(m => ({
        role: m.isUser ? "user" : "model",
        parts: [
          ...(m.text ? [{ text: m.text }] : []),
          ...(m.imageBase64 ? [{
            inlineData: {
              mimeType: m.imageType || 'image/jpeg',
              data: m.imageBase64
            }
          }] : [])
        ]
      })).filter(entry => entry.parts.length > 0);

      const response = await getDuckResponse(history);

      const duckResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: response.message,
        suggestion: response.suggestion,
        isUser: false
      };

      const finalMessages = [...newMessages, duckResponse];
      setMessages(finalMessages);
      saveConversation(finalMessages);
    } catch (error) {
      console.error("Handle Send Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "Quack! My brain is a bit scrambled. Try again?",
        isUser: false
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 200);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <SafeAreaView edges={['top']} style={{ backgroundColor: colors.card, borderBottomWidth: 1, borderBottomColor: colors.border }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setHistoryModalVisible(true)} style={styles.headerBtn}>
            <Text style={{ fontSize: 24 }}>📜</Text>
          </TouchableOpacity>

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Image source={require('../assets/images/Wade_no-bg.png')} style={styles.headerIcon} />
            <Text style={[styles.headerTitle, { color: colors.text }]}>Wade</Text>
          </View>

          <TouchableOpacity onPress={startNewConversation} style={styles.headerBtn}>
            <Text style={{ fontSize: 24 }}>➕</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContainer}
          ListHeaderComponent={hasUserMessages ? (
            <TouchableOpacity
              style={[styles.exportBtn, { borderColor: colors.primary, backgroundColor: colors.primary + '10' }]}
              onPress={handleExport}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <Text style={{ color: colors.primary, fontWeight: 'bold' }}>📤 Export Session to Reflection</Text>
              )}
            </TouchableOpacity>
          ) : null}
          renderItem={({item}) => (
            <View style={[styles.messageRow, item.isUser ? { justifyContent: 'flex-end' } : { justifyContent: 'flex-start' }]}>
              {!item.isUser && (
                <Image source={require('../assets/images/Wade_no-bg.png')} style={styles.messageIcon} />
              )}
              <View style={[styles.messageBubble, item.isUser ? { alignSelf: 'flex-end', backgroundColor: colors.primary, borderBottomRightRadius: 2 } : { alignSelf: 'flex-start', backgroundColor: colors.card, borderBottomLeftRadius: 2 }]}>
                {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.messageImage} />}
                <Text style={[styles.messageText, { color: item.isUser ? '#fff' : colors.text }]}>{item.text}</Text>
                {item.suggestion && (
                  <View style={[styles.suggestionBox, { borderTopColor: colors.border }]}>
                    <Text style={[styles.suggestionLabel, { color: colors.primary }]}>Suggestion:</Text>
                    <Text style={[styles.suggestionText, { color: colors.textSecondary }]}>{item.suggestion}</Text>
                  </View>
                )}
              </View>
            </View>
          )}
        />

        <View style={[styles.inputArea, { borderTopColor: colors.border, backgroundColor: colors.card, paddingBottom: Math.max(insets.bottom, 15) }]}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.background }]} onPress={pickImage}>
            <Text style={styles.actionButtonText}>🖼️</Text>
          </TouchableOpacity>
          <TextInput
            style={[styles.input, { backgroundColor: colors.background, borderColor: colors.border, color: colors.text }]}
            placeholder="Talk to the duck..."
            placeholderTextColor={colors.textSecondary}
            value={input}
            onChangeText={setInput}
            multiline
          />

          <TouchableOpacity style={styles.sendButton} onPress={handleSend} disabled={isLoading}>
            {isLoading ? <ActivityIndicator size="small" color={colors.primary} /> : <Text style={[styles.sendButtonText, { color: colors.primary }]}>Send</Text>}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* History Modal */}
      <Modal visible={historyModalVisible} animationType="slide" transparent={true}>
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0,0,0,0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>Chat History</Text>
              <TouchableOpacity onPress={() => setHistoryModalVisible(false)}>
                <Text style={{ color: colors.primary, fontWeight: 'bold' }}>Close</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={conversations}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <TouchableOpacity style={[styles.historyItem, { borderBottomColor: colors.border }]} onPress={() => loadSession(item)}>
                  <Text style={[styles.historyTitle, { color: colors.text }]} numberOfLines={1}>{item.title}</Text>
                  <Text style={{ color: colors.textSecondary, fontSize: 12 }}>{new Date(item.updatedAt).toLocaleDateString()}</Text>
                </TouchableOpacity>
              )}
              ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20, color: colors.textSecondary }}>No history yet.</Text>}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, paddingVertical: 5 },
  headerIcon: { width: 35, height: 35, resizeMode: 'contain' },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  headerBtn: { padding: 10 },
  chatContainer: { padding: 20 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-end', marginBottom: 15 },
  messageIcon: { width: 35, height: 35, marginRight: 8, resizeMode: 'contain' },
  messageBubble: { padding: 12, borderRadius: 15, maxWidth: '80%' },
  messageText: { fontSize: 16, lineHeight: 22 },
  messageImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 8, resizeMode: 'cover' },
  suggestionBox: { marginTop: 10, paddingTop: 10, borderTopWidth: 1 },
  suggestionLabel: { fontWeight: 'bold', fontSize: 12, marginBottom: 2 },
  suggestionText: { fontSize: 14, fontStyle: 'italic' },
  inputArea: { flexDirection: 'row', padding: 15, borderTopWidth: 1, alignItems: 'flex-end' },
  input: { flex: 1, minHeight: 45, maxHeight: 100, borderRadius: 22, paddingHorizontal: 15, paddingVertical: 10, marginRight: 10, borderWidth: 1 },
  actionButton: { width: 45, height: 45, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  actionButtonText: { fontSize: 20 },
  sendButton: { paddingHorizontal: 15, height: 45, justifyContent: 'center', minWidth: 60, alignItems: 'center' },
  sendButtonText: { fontWeight: 'bold', fontSize: 16 },
  exportBtn: { padding: 10, borderRadius: 10, borderWidth: 1, marginBottom: 20, alignItems: 'center' },
  modalOverlay: { flex: 1, justifyContent: 'flex-end' },
  modalContent: { height: '70%', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, marginBottom: 10 },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  historyItem: { paddingVertical: 15, borderBottomWidth: 1 },
  historyTitle: { fontSize: 16, fontWeight: '500' }
});

export default RubberDuckScreen;
