import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

export default function DocumentListItem({ document, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="file-document" size={28} color={theme.colors.primary} />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{document.shortName}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {document.name}
        </Text>
        <Text style={styles.itemCount}>
          {document.list?.length || 0} mục
        </Text>
      </View>
      
      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.colors.muted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadow,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    backgroundColor: '#F0F4FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: theme.colors.muted,
    marginBottom: 6,
  },
  itemCount: {
    fontSize: 11,
    color: theme.colors.primary,
    fontWeight: '500',
  },
});
