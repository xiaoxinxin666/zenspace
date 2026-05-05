import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { categories, type CategoryKind } from '../theme';

interface Props {
  kind: CategoryKind;
  dark?: boolean;
}

export default function CategoryPill({ kind, dark = true }: Props) {
  const cat = categories[kind];
  return (
    <BlurView
      intensity={dark ? 55 : 70}
      tint={dark ? 'dark' : 'extraLight'}
      style={styles.blur}
    >
      <View style={[styles.dot, { backgroundColor: cat.dot, shadowColor: cat.dot }]} />
      <Text style={[styles.label, { color: dark ? '#fff' : '#1f1c19' }]}>{cat.label}</Text>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  blur: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingLeft: 9,
    paddingRight: 11,
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 4,
    shadowOpacity: 0.9,
    elevation: 2,
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
});
