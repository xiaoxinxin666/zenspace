import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import PhotoTile from './PhotoTile';
import CategoryPill from './CategoryPill';
import type { Track } from '../data/tracks';
import { colors } from '../theme';

interface Props {
  track: Track;
  onPress: () => void;
}

export default function CompactCard({ track, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
      <View style={styles.imageWrapper}>
        <PhotoTile palette={track.palette} label={track.label} borderRadius={14} imageSource={track.image} />
        <View style={styles.pillPos}>
          <CategoryPill kind={track.kind} />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{track.duration}</Text>
        </View>
      </View>
      <View style={styles.meta}>
        <Text style={styles.title}>{track.title}</Text>
        <Text style={styles.sub}>{track.sub}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 138, gap: 9 },
  imageWrapper: { width: '100%', aspectRatio: 1 / 1.2, borderRadius: 14, overflow: 'hidden' },
  pillPos: { position: 'absolute', top: 9, left: 9 },
  durationBadge: {
    position: 'absolute', bottom: 9, right: 9,
    backgroundColor: 'rgba(0,0,0,0.38)', borderRadius: 99,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  durationText: { fontSize: 9, color: 'rgba(255,255,255,0.88)', fontFamily: 'monospace' },
  meta: { paddingHorizontal: 2, gap: 2 },
  title: { fontSize: 13, fontWeight: '600', color: colors.ink, letterSpacing: 0.2 },
  sub: { fontSize: 11, color: colors.ink3 },
});
