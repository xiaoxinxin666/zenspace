import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';
import { HomeNavIcon, SleepNavIcon, SoundsNavIcon, MeNavIcon } from './icons';

type NavId = 'home' | 'sleep' | 'sounds' | 'me';

const NAV_ITEMS: { id: NavId; Icon: React.FC<{ color?: string; strokeWidth?: number }> }[] = [
  { id: 'home',   Icon: HomeNavIcon },
  { id: 'sleep',  Icon: SleepNavIcon },
  { id: 'sounds', Icon: SoundsNavIcon },
  { id: 'me',     Icon: MeNavIcon },
];

interface Props {
  active?: NavId;
}

export default function BottomNav({ active = 'home' }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.wrapper, { bottom: Math.max(insets.bottom, 8) + 10 }]} pointerEvents="box-none">
      <BlurView intensity={80} tint="extraLight" style={styles.pill}>
        <View style={styles.overlay} />
        {NAV_ITEMS.map(({ id, Icon }) => {
          const on = active === id;
          return (
            <View key={id} style={styles.item}>
              <Icon
                color={on ? colors.cta : 'rgba(31,28,25,0.55)'}
                strokeWidth={on ? 2.2 : 1.7}
              />
              {on && <View style={styles.activeDot} />}
            </View>
          );
        })}
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 20,
  },
  pill: {
    height: 64,
    borderRadius: 40,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  item: {
    alignItems: 'center',
    gap: 4,
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#d97757',
  },
});
