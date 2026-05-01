import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, ActivityIndicator, Image, Modal, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { getDuckResponse, ChatHistoryEntry } from '../lib/gemini';
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

const RubberDuckScreen = () => {
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Quack! I'm your debugging assistant. Tell me about the bug you're chasing.", isUser: false },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [debugModalVisible, setDebugModalVisible] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string>('');

  const flatListRef = useRef<FlatList>(null);
  const { colors } = useTheme();
  const hasUserMessages = messages.some(m => m.isUser);

  const handleListModels = async () => {
    setIsLoading(true);
    try {
      const data = await listAvailableModels();
      setDebugInfo(JSON.stringify(data, null, 2));
      setDebugModalVisible(true);
    } catch (error: any) {
      setDebugInfo("Error: " + error.message);
      setDebugModalVisible(true);
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

      setMessages(prev => [...prev, duckResponse]);
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
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <View style={[styles.header, { borderBottomColor: colors.border, backgroundColor: colors.card }]}>
          <Image source={require('../assets/images/Wade_no-bg.png')} style={styles.headerIcon} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Wade</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textSecondary }]}>The Rubber Duck Assistant</Text>
          </View>
        </View>
        {!hasUserMessages && (
          <View style={styles.emptyState}>
            <Image source={require('../assets/images/Wade_no-bg.png')} style={styles.emptyStateDuck} />
            <Text style={[styles.emptyStateText, { color: colors.textSecondary }]}>Explain it to the duck</Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.chatContainer}
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

        {selectedImage && (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
            <TouchableOpacity onPress={() => setSelectedImage(null)} style={styles.removeImageBtn}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={[styles.inputArea, { borderTopColor: colors.border, backgroundColor: colors.card }]}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 15, borderBottomWidth: 1 },
  headerIcon: { width: 50, height: 50, marginRight: 15, resizeMode: 'contain' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { fontSize: 12 },
  debugButton: { padding: 10 },
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
  imagePreviewContainer: { padding: 10, backgroundColor: 'rgba(0,0,0,0.05)', flexDirection: 'row', alignItems: 'center' },
  imagePreview: { width: 60, height: 60, borderRadius: 8 },
  removeImageBtn: { position: 'absolute', top: 5, left: 65, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', gap: 12 },
  emptyStateDuck: { width: 120, height: 120, resizeMode: 'contain' },
  emptyStateText: { fontSize: 16, fontStyle: 'italic' }
});

export default RubberDuckScreen;
