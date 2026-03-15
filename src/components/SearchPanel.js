import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

export default function SearchPanel({
  documents,
  searchResults,
  onSearch,
  onSelectResult,
  onClose,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (text) => {
    setSearchTerm(text);
    onSearch(text);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  const renderResultItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => {
        onSelectResult(item);
        handleClear();
      }}
    >
      <View style={styles.resultContent}>
        <Text style={styles.documentName}>{item.documentName}</Text>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultPreview} numberOfLines={2}>
          {item.preview}
        </Text>
      </View>
      <MaterialCommunityIcons name="chevron-right" size={20} color={theme.colors.muted} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchHeader}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <MaterialCommunityIcons name="close" size={24} color={theme.colors.text} />
        </TouchableOpacity>

        <View style={styles.searchInputContainer}>
          <MaterialCommunityIcons name="magnify" size={20} color={theme.colors.muted} />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm..."
            placeholderTextColor={theme.colors.muted}
            value={searchTerm}
            onChangeText={handleSearch}
            autoFocus
          />
          {searchTerm ? (
            <TouchableOpacity onPress={handleClear}>
              <MaterialCommunityIcons name="close-circle" size={20} color={theme.colors.muted} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {searchTerm && (
        <View style={styles.resultInfo}>
          <Text style={styles.resultCount}>
            Tìm thấy {searchResults.length} kết quả
          </Text>
        </View>
      )}

      {searchTerm && searchResults.length === 0 ? (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons name="text-search" size={48} color={theme.colors.border} />
          <Text style={styles.emptyText}>Không tìm thấy kết quả</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={renderResultItem}
          keyExtractor={(item, index) => `${item.documentIndex}-${item.itemIndex}-${index}`}
          scrollEnabled={true}
          style={styles.resultsList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.bg,
    zIndex: 1000,
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    paddingHorizontal: 12,
    paddingVertical: 12,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    gap: 8,
  },
  closeButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.bg,
    borderRadius: theme.radius.md,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
  },
  resultInfo: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  resultCount: {
    fontSize: 13,
    color: theme.colors.muted,
    fontWeight: '500',
  },
  resultsList: {
    flex: 1,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  resultContent: {
    flex: 1,
    marginRight: 12,
  },
  documentName: {
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultTitle: {
    fontSize: 13,
    color: theme.colors.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  resultPreview: {
    fontSize: 12,
    color: theme.colors.muted,
    lineHeight: 18,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.muted,
    marginTop: 12,
  },
});
