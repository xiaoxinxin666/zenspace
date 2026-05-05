import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import FeatureCard from './FeatureCard';
import CompactCard from './CompactCard';
import type { SectionData } from '../data/tracks';
import type { Track } from '../data/tracks';
import { colors } from '../theme';

interface Props {
  section: SectionData;
  onTrackPress: (track: Track) => void;
}

export default function SectionRow({ section, onTrackPress }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>{section.title}</Text>
          <Text style={styles.subtitle}>{section.subtitle}</Text>
        </View>
        <Text style={styles.count}>{section.items.length} 个音频</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
        snapToInterval={216}
        decelerationRate="fast"
      >
        {section.items.map((track, i) =>
          i === 0 ? (
            <FeatureCard key={i} track={track} onPress={() => onTrackPress(track)} />
          ) : (
            <CompactCard key={i} track={track} onPress={() => onTrackPress(track)} />
          )
        )}
        <View style={styles.trailer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 28,
    paddingBottom: 4,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 14,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    letterSpacing: 0.5,
    color: colors.ink,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 11,
    color: colors.ink3,
    letterSpacing: 1,
  },
  count: {
    fontSize: 11,
    color: colors.ink3,
    tabularNums: true,
  } as any,
  scroll: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 14,
    alignItems: 'flex-start',
  },
  trailer: {
    width: 4,
  },
});
