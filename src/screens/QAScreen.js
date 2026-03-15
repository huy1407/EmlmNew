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

  // All hooks at top level - fixed!
  const [currentScreen, setCurrentScreen] = useState('list'); // 'list' | 'detail' | 'question'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [listSearchText, setListSearchText] = useState('');
  const [questionText, setQuestionText] = useState('');

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
          <Text style={styles.listHeaderTitle}>Hỏi & đáp</Text>
          <Text style={styles.listHeaderSub}>Câu hỏi thường gặp</Text>
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
            const answerPreview = stripHtmlTags(item.answer).substring(0, 80) + '...';
            return (
              <TouchableOpacity
                key={index}
                style={styles.itemContainer}
                onPress={() => {
                  setCurrentQuestionIndex(index);
                  setCurrentScreen('detail');
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
            }}
          >
            <MaterialCommunityIcons name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.readerHeaderTitle}>Hỏi & đáp</Text>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={async () => {
              try {
                const content = `${currentQuestion.question}\n\n${plainContent}`;
                await Share.share({
                  message: content,
                  title: 'Chia sẻ câu hỏi',
                });
              } catch (error) {
                Alert.alert('Lỗi', 'Không thể chia sẻ');
              }
            }}
          >
            <MaterialCommunityIcons name="share-variant" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Content */}
        <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
          <View style={styles.contentPadding}>
            <Text style={[styles.questionTitle, { fontSize }]}>
              {currentQuestion.question}
            </Text>
            <Text
              style={[styles.contentText, { fontSize: fontSize - 1 }]}
              allowFontScaling={false}
            >
              {plainContent}
            </Text>
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.readerFooter}>
          {/* Navigation Buttons */}
          <View style={styles.navButtons}>
            <TouchableOpacity
              style={[styles.navButton, isFirstQuestion && styles.navButtonDisabled]}
              onPress={() => {
                if (!isFirstQuestion) {
                  setCurrentQuestionIndex(currentQuestionIndex - 1);
                }
              }}
              disabled={isFirstQuestion}
            >
              <MaterialCommunityIcons
                name="chevron-left"
                size={24}
                color={isFirstQuestion ? theme.colors.border : theme.colors.primary}
              />
            </TouchableOpacity>

            <Text style={styles.navCounter}>
              {currentQuestionIndex + 1} / {qAndAData.length}
            </Text>

            <TouchableOpacity
              style={[styles.navButton, isLastQuestion && styles.navButtonDisabled]}
              onPress={() => {
                if (!isLastQuestion) {
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                }
              }}
              disabled={isLastQuestion}
            >
              <MaterialCommunityIcons
                name="chevron-right"
                size={24}
                color={isLastQuestion ? theme.colors.border : theme.colors.primary}
              />
            </TouchableOpacity>
          </View>

          {/* Font Size Controls */}
          <View style={styles.fontSizeControls}>
            <TouchableOpacity
              style={styles.fontButton}
              onPress={() => setFontSize(Math.max(12, fontSize - 1))}
            >
              <Text style={styles.fontButtonText}>A</Text>
            </TouchableOpacity>

            <Text style={styles.fontSizeDisplay}>{fontSize}px</Text>

            <TouchableOpacity
              style={styles.fontButton}
              onPress={() => setFontSize(Math.min(24, fontSize + 1))}
            >
              <Text style={[styles.fontButtonText, { fontSize: 18 }]}>A</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };

  // Question Screen
  const renderQuestionScreen = () => {
    const handleSubmit = () => {
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
    };

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.questionHeader}>
          <TouchableOpacity
            onPress={() => setCurrentScreen('list')}
            style={styles.backButton}
          >
            <MaterialCommunityIcons name="close" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.readerHeaderTitle}>Gửi câu hỏi</Text>
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
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <MaterialCommunityIcons name="send" size={20} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.submitButtonText}>Gửi câu hỏi</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };

  // Render appropriate screen
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
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  // List Screen Styles
  listHeader: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  listHeaderTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  listHeaderSub: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 12,
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
    paddingHorizontal: 16,
    paddingTop: 12,
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
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 16,
  },

  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },

  // Reader Screen Styles
  readerHeader: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  readerHeaderTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    flex: 1,
    textAlign: 'center',
  },
  shareButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  questionTitle: {
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 12,
    lineHeight: 24,
  },
  contentText: {
    color: theme.colors.text,
    lineHeight: 22,
  },

  readerFooter: {
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  navButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: theme.colors.inputBg,
  },
  navButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  navCounter: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
    textAlign: 'center',
  },

  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  fontButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: theme.colors.inputBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  fontSizeDisplay: {
    fontSize: 12,
    color: theme.colors.muted,
    minWidth: 45,
    textAlign: 'center',
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
  questionContainer: {
    flex: 1,
  },
  questionFormPadding: {
    paddingHorizontal: 16,
    paddingVertical: 16,
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
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.text,
    minHeight: 120,
  },
  charCount: {
    fontSize: 12,
    color: theme.colors.muted,
    marginTop: 8,
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
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
