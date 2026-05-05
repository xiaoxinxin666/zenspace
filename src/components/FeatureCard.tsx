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

export default function FeatureCard({ track, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && { opacity: 0.92 }]}>
      <View style={styles.imageWrapper}>
        <PhotoTile palette={track.palette} label={track.label} borderRadius={18} imageSource={track.image} />
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
  card: { width: 200, gap: 10 },
  imageWrapper: { width: '100%', aspectRatio: 1 / 1.05, borderRadius: 18, overflow: 'hidden' },
  pillPos: { position: 'absolute', top: 12, left: 12 },
  durationBadge: {
    position: 'absolute', bottom: 12, right: 12,
    backgroundColor: 'rgba(0,0,0,0.38)', borderRadius: 99,
    paddingHorizontal: 7, paddingVertical: 3,
  },
  durationText: { fontSize: 10, color: 'rgba(255,255,255,0.88)', fontFamily: 'monospace' },
  meta: { paddingHorizontal: 2, gap: 3 },
  title: { fontSize: 15, fontWeight: '600', color: colors.ink, letterSpacing: 0.2 },
  sub: { fontSize: 12, color: colors.ink3, letterSpacing: 0.2 },
});
