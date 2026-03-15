import React, { useState, useMemo } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Share,
  SafeAreaView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import DocumentListItem from '../components/DocumentListItem';
import ReaderFooter from '../components/ReaderFooter';
import SearchPanel from '../components/SearchPanel';
import { stripHtmlTags, searchInDocuments, formatContentForShare } from '../utils/htmlParser';

// Import JSON data
import nghiDinh40 from '../json/nghiDinh40.json';
import nghiDinh141 from '../json/nghiDinh141.json';
import thongTu10 from '../json/thongTu10.json';

export default function LegalDocumentModule() {
  const documents = [nghiDinh40, nghiDinh141, thongTu10];

  // Screen states
  const [currentScreen, setCurrentScreen] = useState('list'); // 'list' | 'reader' | 'question'
  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(null);
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [questionText, setQuestionText] = useState('');

  const selectedDocument = selectedDocumentIndex !== null ? documents[selectedDocumentIndex] : null;
  const currentArticle = selectedDocument?.list?.[currentArticleIndex];

  // Search results
  const searchResults = useMemo(() => {
    if (!isSearchOpen || !searchTerm) return [];
    return searchInDocuments([selectedDocument], searchTerm);
  }, [searchTerm, isSearchOpen, selectedDocument]);

  // Document List Screen
  const renderListScreen = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderTitle}>Tra cứu Văn bản Pháp luật</Text>
        <Text style={styles.listHeaderSub}>Bán hàng Đa cấp</Text>
      </View>

      <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
        {documents.map((doc, index) => (
          <DocumentListItem
            key={index}
            document={doc}
            onPress={() => {
              setSelectedDocumentIndex(index);
              setCurrentArticleIndex(0);
              setFontSize(14);
              setIsSearchOpen(false);
              setCurrentScreen('reader');
            }}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );

  // Reader Screen
  const renderReaderScreen = () => {
    if (!selectedDocument || !currentArticle) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <Text>Không có dữ liệu</Text>
        </SafeAreaView>
      );
    }

    const plainContent = stripHtmlTags(currentArticle.content);
    const isFirstArticle = currentArticleIndex === 0;
    const isLastArticle = currentArticleIndex === selectedDocument.list.length - 1;

    return (
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.readerHeader}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              setCurrentScreen('list');
              setIsSearchOpen(false);
            }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>

          <Text style={styles.readerHeaderTitle} numberOfLines={1}>
            {selectedDocument.shortName}
          </Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => setIsSearchOpen(!isSearchOpen)}
            >
              <MaterialCommunityIcons name="magnify" size={22} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.headerIconButton}
              onPress={() => {
                const content = formatContentForShare(
                  selectedDocument.shortName,
                  currentArticle.title,
                  currentArticle.content
                );
                Share.share({
                  message: content,
                  title: currentArticle.title,
                }).catch((err) => console.log(err));
              }}
            >
              <MaterialCommunityIcons name="share-variant" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Panel */}
        {isSearchOpen && (
          <SearchPanel
            documents={[selectedDocument]}
            searchResults={searchResults}
            onSearch={setSearchTerm}
            onSelectResult={(result) => {
              setCurrentArticleIndex(result.itemIndex);
              setIsSearchOpen(false);
            }}
            onClose={() => {
              setIsSearchOpen(false);
              setSearchTerm('');
            }}
          />
        )}

        {!isSearchOpen && (
          <>
            {/* Article Navigation */}
            <View style={styles.navigationBar}>
              <TouchableOpacity
                style={[styles.navButton, isFirstArticle && styles.navButtonDisabled]}
                onPress={() => !isFirstArticle && setCurrentArticleIndex(currentArticleIndex - 1)}
                disabled={isFirstArticle}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color={isFirstArticle ? theme.colors.border : theme.colors.text}
                />
              </TouchableOpacity>

              <View style={styles.navInfo}>
                <Text style={styles.navTitle} numberOfLines={1}>
                  {currentArticle.title}
                </Text>
                <Text style={styles.navIndex}>
                  {currentArticleIndex + 1} / {selectedDocument.list.length}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.navButton, isLastArticle && styles.navButtonDisabled]}
                onPress={() => !isLastArticle && setCurrentArticleIndex(currentArticleIndex + 1)}
                disabled={isLastArticle}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={isLastArticle ? theme.colors.border : theme.colors.text}
                />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={true}>
              <View style={styles.contentInner}>
                <Text style={[styles.articleTitle, { fontSize: fontSize + 2, fontWeight: '700' }]}>
                  {currentArticle.title}
                </Text>

                <Text
                  style={[
                    styles.articleContent,
                    { fontSize: fontSize, lineHeight: fontSize * 1.6 },
                  ]}
                >
                  {plainContent}
                </Text>
              </View>
            </ScrollView>

            {/* Footer */}
            <ReaderFooter
              fontSize={fontSize}
              onIncreaseFontSize={() => fontSize < 24 && setFontSize(fontSize + 1)}
              onDecreaseFontSize={() => fontSize > 12 && setFontSize(fontSize - 1)}
              onAskQuestion={() => {
                setQuestionText('');
                setCurrentScreen('question');
              }}
            />
          </>
        )}
      </SafeAreaView>
    );
  };

  // Question Screen
  const renderQuestionScreen = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.questionHeader}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setCurrentScreen('reader')}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.questionHeaderTitle}>Tạo câu hỏi</Text>

        <View style={{ width: 40 }} />
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionLabel}>Nhập câu hỏi của bạn</Text>

        <TextInput
          style={styles.questionInput}
          placeholder="Nhập câu hỏi..."
          placeholderTextColor={theme.colors.muted}
          multiline
          numberOfLines={6}
          value={questionText}
          onChangeText={setQuestionText}
          textAlignVertical="top"
        />

        <View style={styles.questionButtonsContainer}>
          <TouchableOpacity
            style={[styles.questionActionButton, styles.cancelButton]}
            onPress={() => setCurrentScreen('reader')}
          >
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.questionActionButton,
              styles.submitButton,
              !questionText.trim() && styles.submitButtonDisabled,
            ]}
            onPress={() => {
              if (!questionText.trim()) {
                Alert.alert('Lỗi', 'Vui lòng nhập câu hỏi');
                return;
              }
              Alert.alert('Thành công', 'Gửi câu hỏi thành công', [
                {
                  text: 'OK',
                  onPress: () => {
                    setQuestionText('');
                    setCurrentScreen('reader');
                  },
                },
              ]);
            }}
            disabled={!questionText.trim()}
          >
            <Text style={styles.submitButtonText}>Gửi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );

  // Main render
  return (
    <View style={styles.container}>
      {currentScreen === 'list' && renderListScreen()}
      {currentScreen === 'reader' && renderReaderScreen()}
      {currentScreen === 'question' && renderQuestionScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },

  // List Screen Styles
  listHeader: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  listHeaderTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  listHeaderSub: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  // Reader Screen Styles
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readerHeaderTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerIconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 8,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navInfo: {
    flex: 1,
  },
  navTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
  },
  navIndex: {
    fontSize: 11,
    color: theme.colors.muted,
    marginTop: 2,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: theme.colors.card,
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  articleTitle: {
    color: theme.colors.text,
    marginBottom: 16,
  },
  articleContent: {
    color: theme.colors.text,
    marginBottom: 16,
  },

  // Question Screen Styles
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  questionHeaderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  questionContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  questionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
  },
  questionInput: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.text,
    marginBottom: 20,
  },
  questionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  questionActionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: theme.colors.border,
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'white',
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
});
