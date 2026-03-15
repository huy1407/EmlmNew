import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  Dimensions, Pressable,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { theme } from '../styles/theme';
import mockData from '../json/mockup.json';
import BackButton from '@/src/components/BackButton';
import ReaderFooter from '@/src/components/ReaderFooter';

const stripHtmlTags = (html) => {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&');
};

export default function AboutScreen({ onNavigate }) {
  const [fontSize, setFontSize] = useState(14);

  const aboutContent = mockData.aboutUs || '';

  const handleIncreaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.readerHeader}>
        <Pressable
            style={styles.backBtn}
            onPress={() => onNavigate({ name: "home" })}
        >
          <Text style={styles.listHeaderTitle}>← </Text>
        </Pressable>
        <Text style={styles.listHeaderTitle}>  Giới thiệu</Text>
        <Text style={{color:theme.colors.primary}}>X</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={true}>
        <View style={styles.contentInner}>
          <RenderHTML
            contentWidth={Dimensions.get('window').width - 32}
            source={{ html: aboutContent }}
            tagsStyles={{
              body: {
                fontSize: fontSize,
                lineHeight: fontSize * 1.6,
                color: theme.colors.text,
              },
              h3: {
                fontSize: fontSize + 2,
                fontWeight: '700',
                marginVertical: 12,
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
            }}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <ReaderFooter
        fontSize={fontSize}
        onIncrease={handleIncreaseFontSize}
        onDecrease={handleDecreaseFontSize}
        isIncreaseDisabled={fontSize >= 24}
        isDecreaseDisabled={fontSize <= 12}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.bg,
  },
  listHeader: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width:'100%',

  },
  listHeaderTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  readerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  readerHeaderTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  contentContainer: {
    flex: 1,
  },
  contentInner: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});
