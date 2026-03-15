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
  Pressable,
  Dimensions,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';
import mockData from '../json/mockup.json';
import BackButton from '@/src/components/BackButton';

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

export default function QAModule({ onNavigate }) {
  const qAndAData = mockData.qAndA || [];

  // All hooks at top level
  const [currentScreen, setCurrentScreen] = useState('list'); // 'list' | 'detail' | 'question'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [listSearchText, setListSearchText] = useState('');
  const [detailSearchText, setDetailSearchText] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const currentQuestion = qAndAData[currentQuestionIndex];

  // Filtered data for list screen
  const filteredListData = useMemo(() => {
    if (!listSearchText.trim()) return qAndAData;
    const search = listSearchText.toLowerCase();
    return qAndAData.filter((item) => {
      const questionMatch = item.question.toLowerCase().includes(search);
      const answerText = stripHtmlTags(item.answer).toLowerCase();
      const answerMatch = answerText.includes(search);
      return questionMatch || answerMatch;
    });
  }, [listSearchText]);

  // List Screen
  const renderListScreen = () => {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.listHeader}>
          <Pressable
            style={styles.backBtn}
            onPress={() => onNavigate({ name: 'home' })}
          >
            <Text style={styles.listHeaderTitle}>← </Text>
          </Pressable>
          <Text style={styles.listHeaderTitle}>Hỏi & đáp</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setQuestionText('');
              setCurrentScreen('question');
            }}
          >
            <MaterialCommunityIcons name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor={theme.colors.muted}
            value={listSearchText}
            onChangeText={setListSearchText}
          />
        </View>

        <ScrollView style={styles.listContainer} showsVerticalScrollIndicator={false}>
          {filteredListData.map((item, index) => {
            const answerPreview = stripHtmlTags(item.answer).substring(0, 100) + '...';
            return (
              <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => {
                  setCurrentQuestionIndex(qAndAData.indexOf(item));
                  setCurrentScreen('detail');
                  setIsSearchOpen(false);
                  setDetailSearchText('');
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
              setDetailSearchText('');
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
                const content = `${currentQuestion.question}\n\n${stripHtmlTags(currentQuestion.answer)}`;
                Share.share({
                  message: content,
                  title: 'Chia sẻ câu hỏi',
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
            <View style={styles.searchInputContainer}>
              <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.muted} />
              <TextInput
                style={styles.detailSearchInput}
                placeholder="Tìm kiếm trong câu trả lời..."
                placeholderTextColor={theme.colors.muted}
                value={detailSearchText}
                onChangeText={setDetailSearchText}
              />
              <TouchableOpacity onPress={() => setIsSearchOpen(false)}>
                <MaterialCommunityIcons name="close" size={20} color={theme.colors.muted} />
              </TouchableOpacity>
            </View>
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
                  {currentQuestionIndex + 1} / {qAndAData.length}
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

                <RenderHTML
                  contentWidth={Dimensions.get('window').width - 32}
                  source={{ html: currentQuestion.answer }}
                  tagsStyles={{
                    body: {
                      fontSize: fontSize,
                      lineHeight: fontSize * 1.6,
                      color: theme.colors.text,
                    },
                    p: {
                      marginVertical: 8,
                      fontSize: fontSize,
                      lineHeight: fontSize * 1.6,
                      color: theme.colors.text,
                    },
                    strong: {
                      fontWeight: '700',
                      fontSize: fontSize,
                      color: theme.colors.text,
                    },
                    em: {
                      fontStyle: 'italic',
                      fontSize: fontSize,
                      color: theme.colors.text,
                    },
                    ul: {
                      marginVertical: 8,
                    },
                    li: {
                      marginVertical: 4,
                      fontSize: fontSize,
                      lineHeight: fontSize * 1.6,
                      color: theme.colors.text,
                    },
                  }}
                />
              </View>
            </ScrollView>

            {/* Footer */}
            <View style={styles.readerFooter}>
              <View style={styles.fontSizeControls}>
                <TouchableOpacity
                  style={styles.fontButton}
                  onPress={() => fontSize > 12 && setFontSize(fontSize - 1)}
                >
                  <Text style={styles.fontButtonTextSmall}>A</Text>
                </TouchableOpacity>

                <Text style={styles.fontSizeDisplay}>{fontSize}px</Text>

                <TouchableOpacity
                  style={styles.fontButton}
                  onPress={() => fontSize < 24 && setFontSize(fontSize + 1)}
                >
                  <Text style={styles.fontButtonTextLarge}>A</Text>
                </TouchableOpacity>
              </View>
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
          onPress={() => setCurrentScreen('list')}
        >
          <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
        </TouchableOpacity>

        <Text style={styles.questionHeaderTitle}>Gửi câu hỏi</Text>

        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.questionContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.questionFormPadding}>
          <Text style={styles.questionLabel}>Câu hỏi của bạn:</Text>

          <TextInput
            style={styles.questionInput}
            placeholder="Nhập câu hỏi của bạn..."
            placeholderTextColor={theme.colors.muted}
            multiline
            numberOfLines={6}
            value={questionText}
            onChangeText={setQuestionText}
            textAlignVertical="top"
          />

          <Text style={styles.charCount}>
            {questionText.length} / 500 ký tự
          </Text>
        </View>
      </ScrollView>

      <View style={styles.questionFooter}>
        <TouchableOpacity
          style={[styles.submitButton, !questionText.trim() && styles.submitButtonDisabled]}
          onPress={() => {
            if (!questionText.trim()) {
              Alert.alert('Lỗi', 'Vui lòng nhập câu hỏi');
              return;
            }
            Alert.alert('Thành công', 'Câu hỏi của bạn đã được gửi!', [
              {
                text: 'OK',
                onPress: () => {
                  setQuestionText('');
                  setCurrentScreen('list');
                },
              },
            ]);
          }}
          disabled={!questionText.trim()}
        >
          <MaterialCommunityIcons name="send" size={20} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.submitButtonText}>Gửi câu hỏi</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  backBtn: {
    paddingRight: 8,
  },
  listHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  addButton: {
    padding: 8,
    marginLeft: 8,
  },

  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    backgroundColor: 'white',
  },
  searchInput: {
    backgroundColor: theme.colors.inputBg,
    borderRadius: 8,
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
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: theme.colors.primary,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 6,
  },
  itemAnswer: {
    fontSize: 13,
    color: theme.colors.muted,
    lineHeight: 19,
  },

  // Reader Screen Styles
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  readerHeaderTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIconButton: {
    padding: 8,
    marginLeft: 8,
  },

  searchPanel: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  detailSearchInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    color: theme.colors.text,
  },

  navigationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  navButton: {
    padding: 8,
  },
  navButtonDisabled: {
    opacity: 0.4,
  },
  navInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  navTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  navIndex: {
    fontSize: 12,
    color: theme.colors.muted,
  },

  contentContainer: {
    flex: 1,
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  questionTitle: {
    color: theme.colors.text,
    marginBottom: 16,
    lineHeight: 24,
  },
  answerContent: {
    color: theme.colors.text,
    lineHeight: 21,
  },

  readerFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: 12,
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fontButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: theme.colors.inputBg,
    borderRadius: 6,
  },
  fontButtonTextSmall: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: '600',
  },
  fontButtonTextLarge: {
    fontSize: 18,
    color: theme.colors.text,
    fontWeight: '600',
  },
  fontSizeDisplay: {
    fontSize: 12,
    color: theme.colors.muted,
    fontWeight: '600',
  },

  // Question Screen Styles
  questionHeader: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionHeaderTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },

  questionContainer: {
    flex: 1,
  },
  questionFormPadding: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  questionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 10,
  },
  questionInput: {
    backgroundColor: theme.colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.text,
    textAlignVertical: 'top',
    minHeight: 120,
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
    color: theme.colors.muted,
    textAlign: 'right',
  },

  questionFooter: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: 'white',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
