import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { theme } from '../styles/theme';

export default function ReaderFooter({
  fontSize,
  onIncreaseFontSize,
  onDecreaseFontSize,
  onAskQuestion,
}) {
  const canDecrease = fontSize > 12;
  const canIncrease = fontSize < 24;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, !canDecrease && styles.buttonDisabled]}
        onPress={onDecreaseFontSize}
        disabled={!canDecrease}
      >
        <MaterialCommunityIcons
          name="minus"
          size={20}
          color={canDecrease ? theme.colors.text : theme.colors.border}
        />
      </TouchableOpacity>

      <View style={styles.fontSizeDisplay}>
        <Text style={styles.fontSizeText}>Cỡ chữ: {fontSize}</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, !canIncrease && styles.buttonDisabled]}
        onPress={onIncreaseFontSize}
        disabled={!canIncrease}
      >
        <MaterialCommunityIcons
          name="plus"
          size={20}
          color={canIncrease ? theme.colors.text : theme.colors.border}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.questionButton}
        onPress={onAskQuestion}
      >
        <MaterialCommunityIcons name="help-circle-outline" size={20} color={theme.colors.primary} />
        <Text style={styles.questionButtonText}>Hỏi/đáp</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: theme.colors.card,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 12,
    gap: 8,
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4FF',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  buttonDisabled: {
    opacity: 0.5,
    backgroundColor: '#F5F5F5',
  },
  fontSizeDisplay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  fontSizeText: {
    fontSize: 12,
    color: theme.colors.text,
    fontWeight: '500',
  },
  questionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: theme.radius.md,
    backgroundColor: '#E3F2FD',
    gap: 4,
  },
  questionButtonText: {
    fontSize: 12,
    color: theme.colors.primary,
    fontWeight: '600',
  },
});
