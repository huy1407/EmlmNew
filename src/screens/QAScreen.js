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
import mockData from '../json/mockup.json';

// HTML parser utility
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
};

export default function QAModule() {
  const qAndAData = mockData.qAndA || [];

  // Screen states
  const [currentScreen, setCurrentScreen] = useState('list'); // 'list' | 'detail' | 'question'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [questionText, setQuestionText] = useState('');

  const currentQuestion = qAndAData[currentQuestionIndex];

  // Search results
  const searchResults = useMemo(() => {
    if (!isSearchOpen || !searchTerm.trim()) return [];
    const search = searchTerm.toLowerCase();
    return qAndAData.filter((item, index) => {
      const questionMatch = item.question.toLowerCase().includes(search);
      const answerText = stripHtmlTags(item.answer).toLowerCase();
      const answerMatch = answerText.includes(search);
      return (questionMatch || answerMatch) ? { ...item, index } : null;
    });
  }, [searchTerm, isSearchOpen]);

  // List Screen
  const renderListScreen = () => {
    const [searchText, setSearchText] = useState('');
    const filteredData = useMemo(() => {
      if (!searchText.trim()) return qAndAData;
      const search = searchText.toLowerCase();
      return qAndAData.filter((item) => {
        const questionMatch = item.question.toLowerCase().includes(search);
        const answerText = stripHtmlTags(item.answer).toLowerCase();
        const answerMatch = answerText.includes(search);
        return questionMatch || answerMatch;
      });
    }, [searchText]);

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.listHeader}>
          <Text style={styles.listHeaderTitle}>Hỏi & đáp</Text>
          <Text style={styles.listHeaderSub}>Câu hỏi thường gặp</Text>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor={theme.colors.muted}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredData.map((item, index) => {
            const answerPreview = stripHtmlTags(item.answer).substring(0, 80) + '...';
            return (
              <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => {
                  setCurrentQuestionIndex(index);
                  setCurrentScreen('detail');
                  setIsSearchOpen(false);
                  setSearchTerm('');
                }}
              >
                <Text style={styles.itemQuestion}>{item.question}</Text>
                <Text style={styles.itemAnswer} numberOfLines={2}>
                  {answerPreview}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            setQuestionText('');
            setCurrentScreen('question');
          }}
        >
          <MaterialCommunityIcons name="plus" size={28} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  // Detail Screen
  const renderDetailScreen = () => {
    if (!currentQuestion) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <Text>Không có dữ liệu</Text>
        </SafeAreaView>
      );
    }

    const plainContent = stripHtmlTags(currentQuestion.answer);
    const isFirstQuestion = currentQuestionIndex === 0;
    const isLastQuestion = currentQuestionIndex === qAndAData.length - 1;

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
            Hỏi & đáp
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
                const content = `${currentQuestion.question}\n\n${plainContent}`;
                Share.share({
                  message: content,
                  title: currentQuestion.question,
                }).catch((err) => console.log(err));
              }}
            >
              <MaterialCommunityIcons name="share-variant" size={22} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Panel */}
        {isSearchOpen && (
          <View style={styles.searchPanel}>
            <TextInput
              style={styles.searchPanelInput}
              placeholder="Tìm kiếm..."
              placeholderTextColor={theme.colors.muted}
              value={searchTerm}
              onChangeText={setSearchTerm}
              autoFocus
            />

            <ScrollView style={styles.searchResultsContainer}>
              {searchResults.map((item, idx) => (
                <TouchableOpacity
                  key={idx}
                  style={styles.searchResultItem}
                  onPress={() => {
                    setCurrentQuestionIndex(qAndAData.findIndex(q => q._id === item._id));
                    setIsSearchOpen(false);
                    setSearchTerm('');
                  }}
                >
                  <Text style={styles.searchResultQuestion} numberOfLines={1}>
                    {item.question}
                  </Text>
                  <Text style={styles.searchResultPreview} numberOfLines={2}>
                    {stripHtmlTags(item.answer).substring(0, 60)}...
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              onPress={() => {
                setIsSearchOpen(false);
                setSearchTerm('');
              }}
              style={styles.searchCloseButton}
            >
              <Text style={styles.searchCloseText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isSearchOpen && (
          <>
            {/* Navigation Bar */}
            <View style={styles.navigationBar}>
              <TouchableOpacity
                style={[styles.navButton, isFirstQuestion && styles.navButtonDisabled]}
                onPress={() => !isFirstQuestion && setCurrentQuestionIndex(currentQuestionIndex - 1)}
                disabled={isFirstQuestion}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={24}
                  color={isFirstQuestion ? theme.colors.border : theme.colors.text}
                />
              </TouchableOpacity>

              <View style={styles.navInfo}>
                <Text style={styles.navTitle} numberOfLines={1}>
                  {currentQuestion.question}
                </Text>
                <Text style={styles.navIndex}>
                  Câu {currentQuestionIndex + 1} / {qAndAData.length}
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.navButton, isLastQuestion && styles.navButtonDisabled]}
                onPress={() => !isLastQuestion && setCurrentQuestionIndex(currentQuestionIndex + 1)}
                disabled={isLastQuestion}
              >
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={24}
                  color={isLastQuestion ? theme.colors.border : theme.colors.text}
                />
              </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={true}>
              <View style={styles.contentInner}>
                <Text style={[styles.questionTitle, { fontSize: fontSize + 2, fontWeight: '700' }]}>
                  {currentQuestion.question}
                </Text>

                <View style={{ height: 12 }} />

                <Text
                  style={[
                    styles.answerContent,
                    { fontSize: fontSize, lineHeight: fontSize * 1.6 },
                  ]}
                >
                  {plainContent}
                </Text>
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => fontSize > 12 && setFontSize(fontSize - 1)}
                style={styles.fontButton}
              >
                <Text style={styles.fontButtonText}>−</Text>
              </TouchableOpacity>

              <Text style={styles.fontSizeText}>Cỡ chữ: {fontSize}</Text>

              <TouchableOpacity
                onPress={() => fontSize < 24 && setFontSize(fontSize + 1)}
                style={styles.fontButton}
              >
                <Text style={styles.fontButtonText}>+</Text>
              </TouchableOpacity>
            </View>
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
          onPress={() => setCurrentScreen('detail')}
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
            onPress={() => setCurrentScreen('detail')}
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
                    setCurrentScreen('detail');
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
      {currentScreen === 'detail' && renderDetailScreen()}
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
  searchContainer: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.text,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  itemContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
  },
  itemQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  itemAnswer: {
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  // Detail Screen Styles
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

  // Search Panel Styles
  searchPanel: {
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    maxHeight: 300,
  },
  searchPanelInput: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: theme.colors.text,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchResultsContainer: {
    maxHeight: 200,
  },
  searchResultItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchResultQuestion: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 2,
  },
  searchResultPreview: {
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 16,
  },
  searchCloseButton: {
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    alignItems: 'center',
  },
  searchCloseText: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.primary,
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
  questionTitle: {
    color: theme.colors.text,
    marginBottom: 8,
  },
  answerContent: {
    color: theme.colors.text,
    marginBottom: 16,
  },

  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  fontButton: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.sm,
  },
  fontButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },
  fontSizeText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.text,
    minWidth: 80,
    textAlign: 'center',
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
