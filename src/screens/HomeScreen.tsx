import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { sections, DEFAULT_TRACK } from '../data/tracks';
import type { Track } from '../data/tracks';
import { colors } from '../theme';
import Hero from '../components/Hero';
import SectionRow from '../components/SectionRow';
import BottomNav from '../components/BottomNav';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const handleTrackPress = (track: Track) => {
    navigation.navigate('Player', { track });
  };

  return (
    <View style={styles.root}>
      <StatusBar style="light" />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Hero onStart={() => handleTrackPress(DEFAULT_TRACK)} />

        {/* white sheet content area */}
        <View style={styles.sheet}>
          {sections.map((section, i) => (
            <SectionRow key={i} section={section} onTrackPress={handleTrackPress} />
          ))}

          {/* footer mantra */}
          <View style={styles.footer}>
            <Text style={styles.mantra}>"Be still, and the world will reveal itself."</Text>
            <Text style={styles.footerSub}>ZENSPACE · 2026</Text>
          </View>
        </View>
      </ScrollView>

      <BottomNav active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingBottom: 120,
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -28,
    paddingTop: 8,
  },
  footer: {
    paddingVertical: 40,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 14,
  },
  mantra: {
    fontSize: 20,
    fontStyle: 'italic',
    color: colors.ink2,
    textAlign: 'center',
    lineHeight: 28,
    letterSpacing: 0.3,
  },
  footerSub: {
    fontSize: 11,
    letterSpacing: 4,
    color: colors.ink3,
  },
});
