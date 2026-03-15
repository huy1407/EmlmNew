import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions, Pressable,
} from 'react-native';
import RenderHTML from 'react-native-render-html';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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

const AccordionItem = ({ title, content, isExpanded, onToggle, fontSize }) => {
  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={onToggle}
      >
        <Text style={[styles.accordionTitle, { fontSize: fontSize + 1 }]} numberOfLines={isExpanded ? undefined : 2}>
          {stripHtmlTags(title)}
        </Text>
        <MaterialCommunityIcons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color={theme.colors.primary}
        />
      </TouchableOpacity>

      {isExpanded && (
        <View style={styles.accordionContent}>
          <RenderHTML
            contentWidth={Dimensions.get('window').width - 64}
            source={{ html: content }}
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
              h3: {
                fontSize: fontSize + 1,
                fontWeight: '700',
                marginVertical: 8,
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
      )}
    </View>
  );
};

export default function DistributorNotesScreen({ onNavigate }) {
  const [fontSize, setFontSize] = useState(14);
  const [expandedItems, setExpandedItems] = useState([]);

  const { header = '', list = [] } = mockData.luuYNhaPhanPhoi || {};

  const handleIncreaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 2, 24));
  };

  const handleDecreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 2, 12));
  };

  const toggleAccordion = (index) => {
    setExpandedItems((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
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
        <Text style={styles.listHeaderTitle}>Lưu ý</Text>
        <Text style={{color:theme.colors.primary}}>X</Text>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={true}>
        <View style={styles.contentInner}>
          {/* Header */}
          {header && (
            <View style={styles.headerSection}>
              <RenderHTML
                contentWidth={Dimensions.get('window').width - 32}
                source={{ html: header }}
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
                }}
              />
            </View>
          )}

          {/* Accordion List */}
          <View style={styles.accordionList}>
            {list.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                content={item.content}
                isExpanded={expandedItems.includes(index)}
                onToggle={() => toggleAccordion(index)}
                fontSize={fontSize}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
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
  headerSection: {
    marginBottom: 16,
  },
  accordionList: {
    gap: 8,
  },
  accordionItem: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
    marginBottom: 8,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: theme.colors.card,
  },
  accordionTitle: {
    flex: 1,
    fontWeight: '600',
    color: theme.colors.text,
    marginRight: 12,
  },
  accordionContent: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
});
