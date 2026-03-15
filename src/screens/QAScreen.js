import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Alert,
  Share,
} from 'react-native';
import SafeView from '../components/SafeView';
import { theme } from '../styles/theme';
import mockData from '../json/mockup.json';

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

const QAListScreen = ({ onSelectQuestion, onCreateQuestion }) => {
  const [searchText, setSearchText] = useState('');
  const qAndAData = mockData.qAndA || [];

  const filteredData = useMemo(() => {
    if (!searchText.trim()) return qAndAData;
    const search = searchText.toLowerCase();
    return qAndAData.filter((item) => {
      const questionMatch = item.question.toLowerCase().includes(search);
      const answerText = stripHtmlTags(item.answer).toLowerCase();
      const answerMatch = answerText.includes(search);
      return questionMatch || answerMatch;
    });
  }, [searchText, qAndAData]);

  const renderItem = ({ item }) => {
    const answerPreview = stripHtmlTags(item.answer).substring(0, 60) + '...';
    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onSelectQuestion(item.index)}
      >
        <Text style={styles.itemQuestion}>{item.question}</Text>
        <Text style={styles.itemAnswer} numberOfLines={2}>
          {answerPreview}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hỏi & đáp</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          placeholderTextColor={theme.colors.muted}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={onCreateQuestion}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const QADetailScreen = ({ questionIndex, onBack, onNavigate }) => {
  const [fontSize, setFontSize] = useState(14);
  const qAndAData = mockData.qAndA || [];
  const item = qAndAData[questionIndex];

  if (!item) {
    return (
      <SafeView>
        <Text>Không tìm thấy câu hỏi</Text>
      </SafeView>
    );
  }

  const handleShare = async () => {
    try {
      const content = `${item.question}\n\n${stripHtmlTags(item.answer)}`;
      await Share.share({
        message: content,
        title: 'Chia sẻ câu hỏi',
      });
    } catch (error) {
      Alert.alert('Lỗi', 'Không thể chia sẻ');
    }
  };

  const goToNext = () => {
    if (questionIndex < qAndAData.length - 1) {
      onNavigate(questionIndex + 1);
    }
  };

  const goToPrev = () => {
    if (questionIndex > 0) {
      onNavigate(questionIndex - 1);
    }
  };

  return (
    <SafeView>
      <View style={styles.detailHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.detailTitle}>Hỏi & đáp</Text>
        <TouchableOpacity onPress={handleShare}>
          <Text style={styles.shareButton}>Chia sẻ</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.navBar}>
        <TouchableOpacity
          onPress={goToPrev}
          disabled={questionIndex === 0}
          style={[styles.navButton, questionIndex === 0 && styles.navButtonDisabled]}
        >
          <Text style={styles.navButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.navText}>Câu hỏi {questionIndex + 1}/{qAndAData.length}</Text>
        <TouchableOpacity
          onPress={goToNext}
          disabled={questionIndex === qAndAData.length - 1}
          style={[styles.navButton, questionIndex === qAndAData.length - 1 && styles.navButtonDisabled]}
        >
          <Text style={styles.navButtonText}>{'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.detailContent, { paddingHorizontal: 16 }]}>
        <Text style={[styles.detailQuestion, { fontSize }]}>
          {item.question}
        </Text>
        <View style={{ height: 16 }} />
        <Text style={[styles.detailAnswer, { fontSize }]}>
          {stripHtmlTags(item.answer)}
        </Text>
      </View>

      <View style={styles.footerControls}>
        <TouchableOpacity onPress={() => setFontSize(Math.max(12, fontSize - 2))}>
          <Text style={styles.controlText}>−</Text>
        </TouchableOpacity>
        <Text style={styles.fontSizeText}>Cỡ chữ: {fontSize}</Text>
        <TouchableOpacity onPress={() => setFontSize(Math.min(24, fontSize + 2))}>
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

const CreateQuestionScreen = ({ onBack, onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = () => {
    if (!question.trim()) {
      Alert.alert('Lỗi', 'Vui lòng nhập câu hỏi');
      return;
    }
    Alert.alert('Thành công', 'Câu hỏi của bạn đã được gửi');
    setQuestion('');
    onBack();
  };

  return (
    <SafeView>
      <View style={styles.createHeader}>
        <TouchableOpacity onPress={onBack}>
          <Text style={styles.backButton}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.createTitle}>Tạo câu hỏi</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.createForm}>
        <TextInput
          style={styles.createInput}
          placeholder="Nhập câu hỏi"
          placeholderTextColor={theme.colors.muted}
          value={question}
          onChangeText={setQuestion}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          style={styles.createButton}
          onPress={handleSubmit}
        >
          <Text style={styles.createButtonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

export default function QAModule() {
  const [screen, setScreen] = useState('list');
  const [selectedQuestion, setSelectedQuestion] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.bg }}>
      {screen === 'list' && (
        <QAListScreen
          onSelectQuestion={(index) => {
            setSelectedQuestion(index);
            setScreen('detail');
          }}
          onCreateQuestion={() => setScreen('create')}
        />
      )}

      {screen === 'detail' && (
        <QADetailScreen
          questionIndex={selectedQuestion}
          onBack={() => setScreen('list')}
          onNavigate={(index) => setSelectedQuestion(index)}
        />
      )}

      {screen === 'create' && (
        <CreateQuestionScreen
          onBack={() => setScreen('list')}
          onSubmit={() => setScreen('list')}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  header: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 8,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    color: theme.colors.text,
  },
  listContent: {
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
    marginBottom: 6,
  },
  itemAnswer: {
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 18,
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
    ...theme.shadow,
  },
  fabText: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  backButton: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  detailTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  shareButton: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  navButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.primary,
  },
  navButtonDisabled: {
    backgroundColor: theme.colors.border,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  navText: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
  detailContent: {
    flex: 1,
    paddingVertical: 16,
  },
  detailQuestion: {
    fontWeight: '700',
    color: theme.colors.text,
    lineHeight: 22,
  },
  detailAnswer: {
    color: theme.colors.text,
    lineHeight: 22,
  },
  footerControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  controlText: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.primary,
  },
  fontSizeText: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
  createHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  createTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  createForm: {
    flex: 1,
    padding: 16,
  },
  createInput: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: theme.colors.text,
    textAlignVertical: 'top',
    flex: 1,
  },
  createButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
