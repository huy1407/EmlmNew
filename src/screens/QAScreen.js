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
import ReaderFooter from '@/src/components/ReaderFooter';

// Utility function to strip HTML tags
const stripHtmlTags = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace('<p>', '')
    .replace('</p>', '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
};

export default function QAModule({ onNavigate }) {
  const [currentScreen, setCurrentScreen] = useState('list'); // 'list' | 'detail'
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fontSize, setFontSize] = useState(14);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [listSearchText, setListSearchText] = useState('');
  const [detailSearchText, setDetailSearchText] = useState('');

  const qAndAData = mockData.qAndA || [];
  const currentQuestion = qAndAData[currentQuestionIndex];

  // Search functionality
  const filteredListData = useMemo(() => {
    if (!listSearchText) return qAndAData;
    const searchLower = listSearchText.toLowerCase();
    return qAndAData.filter(
      (item) =>
        item.question.toLowerCase().includes(searchLower) ||
        stripHtmlTags(item.answer).toLowerCase().includes(searchLower)
    );
  }, [listSearchText, qAndAData]);

  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === qAndAData.length - 1;

  // List Screen
  const renderListScreen = () => (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.listHeader}>
        <Pressable
          style={styles.backBtn}
          onPress={() => onNavigate({ name: 'home' })}
        >
          <Text style={styles.listHeaderTitle}>←</Text>
        </Pressable>
        <Text style={styles.listHeaderTitle}>Hỏi & đáp</Text>
        <Text style={{ color: theme.colors.primary }}>X</Text>
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
          const originalIndex = qAndAData.indexOf(item);
          return (
            <TouchableOpacity
              key={index}
              style={styles.itemContainer}
              onPress={() => {
                setCurrentQuestionIndex(originalIndex);
                setCurrentScreen('detail');
                setIsSearchOpen(false);
                setDetailSearchText('');
              }}
            >
              <Text style={styles.itemQuestion}>{originalIndex + 1}. {stripHtmlTags(item.question)}</Text>
              <View style={styles.itemAnswerPreviewContainer}>
                <RenderHTML
                  contentWidth={Dimensions.get('window').width - 64}
                  source={{ html: stripHtmlTags(item.answer).substring(0, 100) + '...' }}
                  tagsStyles={{
                    body: {
                      fontSize: 13,
                      lineHeight: 18,
                      color: theme.colors.muted,
                    },
                    p: {
                      fontSize: 13,
                      lineHeight: 18,
                      color: theme.colors.muted,
                    },
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );

  // Detail Screen
  const renderDetailScreen = () => {
    if (!currentQuestion) {
      return (
        <SafeAreaView style={styles.safeArea}>
          <Text>Không có dữ liệu</Text>
        </SafeAreaView>
      );
    }

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
                  Câu hỏi số {currentQuestionIndex + 1}
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
                  {stripHtmlTags(currentQuestion.question)}
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
            <ReaderFooter
              fontSize={fontSize}
              onIncreaseFontSize={() => fontSize < 24 && setFontSize(fontSize + 1)}
              onDecreaseFontSize={() => fontSize > 12 && setFontSize(fontSize - 1)}
              onAskQuestion={() => setCurrentScreen('list')}
            />
          </>
        )}
      </SafeAreaView>
    );
  };

  // Main render
  return (
    <View style={styles.container}>
      {currentScreen === 'list' && renderListScreen()}
      {currentScreen === 'detail' && renderDetailScreen()}
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
    backgroundColor: 'white',
  },

  // List Screen Styles
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backBtn: {
    padding: 8,
  },
  listHeaderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
  },

  searchContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
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
  itemAnswerPreviewContainer: {
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
});
