import React, { useState, useRef, useEffect } from 'react';
import {
  View, Text, Pressable, StyleSheet, Animated, Dimensions, Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { colors } from '../theme';
import {
  BackIcon, PlayIcon, PauseIcon, SkipBackIcon, SkipForwardIcon,
  TimerIcon, ShareIcon, HeartIcon, DurationIcon,
} from '../components/icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Player'>;

const { width: SCREEN_W } = Dimensions.get('window');
const COVER_SIZE = Math.min(SCREEN_W - 96, 240);
const RING_BASE = COVER_SIZE + 40;

const CHIPS = [
  { label: '引导语', value: '中文' },
  { label: '背景音', value: '颂钵' },
  { label: '推荐时段', value: '夜晚' },
];

function fmt(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function PlayerScreen({ route, navigation }: Props) {
  const { track } = route.params;
  const insets = useSafeAreaInsets();
  const palette = track.palette;

  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [barWidth, setBarWidth] = useState(1);
  const [duration, setDuration] = useState(0);

  // audio
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    return () => { soundRef.current?.unloadAsync(); };
  }, []);

  useEffect(() => {
    let active = true;
    soundRef.current?.unloadAsync();
    soundRef.current = null;
    setProgress(0);
    setPlaying(false);

    if (!track.audio) return;

    Audio.Sound.createAsync(
      track.audio,
      { shouldPlay: false },
      (status) => {
        if (!status.isLoaded || !active) return;
        if (status.durationMillis) setDuration(status.durationMillis / 1000);
        setProgress((status.positionMillis ?? 0) / (status.durationMillis ?? 1));
      }
    ).then(({ sound }) => {
      if (active) soundRef.current = sound;
    });

    return () => { active = false; };
  }, [track]);

  const togglePlay = async () => {
    const sound = soundRef.current;
    if (!sound) return;
    if (playing) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setPlaying(p => !p);
  };

  const seekTo = async (ratio: number) => {
    const sound = soundRef.current;
    if (!sound || !duration) return;
    const pos = ratio * duration * 1000;
    await sound.setPositionAsync(pos);
    setProgress(ratio);
  };

  // breathing ring animation
  const breathAnim = useRef(new Animated.Value(0)).current;
  const breathRef = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    if (playing) {
      breathRef.current = Animated.loop(
        Animated.sequence([
          Animated.timing(breathAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
          Animated.timing(breathAnim, { toValue: 0, duration: 4000, useNativeDriver: true }),
        ])
      );
      breathRef.current.start();
    } else {
      breathRef.current?.stop();
    }
    return () => breathRef.current?.stop();
  }, [playing]);

  const outerRingScale = breathAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.12] });
  const innerRingScale = breathAnim.interpolate({ inputRange: [0, 1], outputRange: [0.94, 1.18] });
  const coverScale    = breathAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.02] });

  const totalSec = duration || 45 * 60;
  const curSec   = totalSec * progress;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar style="dark" />

      <LinearGradient colors={['#c9c2bc', '#d8c8c4', '#e0c8b8']} style={StyleSheet.absoluteFill} />
      <View style={[styles.orb1, { backgroundColor: palette[1] + '55' }]} />
      <View style={[styles.orb2, { backgroundColor: palette[2] + '55' }]} />

      {/* top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()}
          style={({ pressed }) => [styles.circleBtn, pressed && { opacity: 0.75 }]}>
          <BlurView intensity={70} tint="extraLight" style={StyleSheet.absoluteFill} />
          <View style={styles.overlay} />
          <BackIcon color={colors.ink} size={16} />
        </Pressable>

        <BlurView intensity={70} tint="extraLight" style={styles.durationPill}>
          <View style={styles.overlay} />
          <DurationIcon color={colors.ink} size={15} />
          <Text style={styles.durationText}>{track.durationFull}</Text>
        </BlurView>
      </View>

      {/* cover + breathing rings */}
      <View style={styles.coverArea}>
        <Animated.View style={[styles.outerRing, { transform: [{ scale: outerRingScale }], shadowColor: palette[2] }]} />
        <Animated.View style={[styles.innerRing, { transform: [{ scale: innerRingScale }] }]} />

        <Animated.View style={[styles.coverWrapper, { transform: [{ scale: coverScale }] }]}>
          {track.image ? (
            <Image source={track.image} style={styles.coverImage} resizeMode="cover" />
          ) : (
            <LinearGradient colors={palette} start={{ x: 0.1, y: 0 }} end={{ x: 0.85, y: 1 }} style={styles.coverImage} />
          )}
          {/* vignette */}
          <LinearGradient colors={['transparent', 'rgba(0,0,0,0.3)']} style={StyleSheet.absoluteFill} />
        </Animated.View>
      </View>

      {/* title + chips */}
      <View style={styles.titleArea}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{track.fullTitle}</Text>
          <Pressable onPress={() => setLiked(l => !l)} hitSlop={8}>
            <HeartIcon filled={liked} size={22} />
          </Pressable>
        </View>
        <Text style={styles.descText}>{track.desc}</Text>
        <View style={styles.chips}>
          {CHIPS.map((c, i) => (
            <BlurView key={i} intensity={60} tint="extraLight" style={styles.chip}>
              <View style={styles.overlay} />
              <Text style={styles.chipLabel}>{c.label}</Text>
              <Text style={styles.chipValue}>{c.value}</Text>
            </BlurView>
          ))}
        </View>
      </View>

      {/* bottom controls */}
      <View style={[styles.controls, { paddingBottom: Math.max(insets.bottom, 16) + 16 }]}>
        {/* progress bar */}
        <View
          style={styles.progressBar}
          onLayout={e => setBarWidth(e.nativeEvent.layout.width)}
          onTouchEnd={e => seekTo(Math.max(0, Math.min(1, e.nativeEvent.locationX / barWidth)))}
        >
          <View style={styles.progressTrack} />
          <View style={[styles.progressFill, { width: `${progress * 100}%` as any }]} />
          <View style={[styles.progressThumb, { left: `${progress * 100}%` as any }]} />
        </View>
        <View style={styles.progressTimes}>
          <Text style={styles.timeText}>{fmt(curSec)}</Text>
          <Text style={styles.timeText}>{fmt(totalSec)}</Text>
        </View>

        {/* playback row */}
        <View style={styles.playbackRow}>
          <Pressable style={styles.iconBtn}><TimerIcon size={22} /></Pressable>

          <View style={styles.playbackCenter}>
            <Pressable style={styles.skipBtn}><SkipBackIcon size={28} /></Pressable>
            <Pressable onPress={togglePlay}
              style={({ pressed }) => [styles.playBtn, pressed && { opacity: 0.9 }]}>
              {playing ? <PauseIcon size={26} /> : <PlayIcon size={26} />}
            </Pressable>
            <Pressable style={styles.skipBtn}><SkipForwardIcon size={28} /></Pressable>
          </View>

          <Pressable style={styles.iconBtn}><ShareIcon size={22} /></Pressable>
        </View>

        {/* up next */}
        <BlurView intensity={60} tint="extraLight" style={styles.upNext}>
          <View style={styles.overlay} />
          <LinearGradient colors={[palette[1], palette[2]]} start={{ x: 0.1, y: 0 }} end={{ x: 0.9, y: 1 }} style={styles.upNextThumb} />
          <View style={styles.upNextMeta}>
            <Text style={styles.upNextLabel}>UP NEXT</Text>
            <Text style={styles.upNextTitle}>七轮共振 · 平衡能量</Text>
          </View>
          <Text style={styles.upNextDuration}>20:00</Text>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, overflow: 'hidden' },
  orb1: { position: 'absolute', width: 240, height: 240, borderRadius: 120, top: '12%', left: '-10%' },
  orb2: { position: 'absolute', width: 280, height: 280, borderRadius: 140, top: '52%', right: '-15%' },
  topBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 8, zIndex: 5 },
  circleBtn: { width: 42, height: 42, borderRadius: 21, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.6)' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(255,255,255,0.18)' },
  durationPill: { height: 42, paddingHorizontal: 16, borderRadius: 999, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', gap: 8, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.6)' },
  durationText: { fontSize: 13, fontWeight: '500', color: colors.ink },
  coverArea: { flex: 1, alignItems: 'center', justifyContent: 'center', zIndex: 5, paddingTop: 20 },
  outerRing: { position: 'absolute', width: RING_BASE, height: RING_BASE, borderRadius: RING_BASE / 2, borderWidth: 1, borderColor: 'rgba(255,255,255,0.45)', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.5, shadowRadius: 40 },
  innerRing: { position: 'absolute', width: RING_BASE + 36, height: RING_BASE + 36, borderRadius: (RING_BASE + 36) / 2, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.25)' },
  coverWrapper: { width: COVER_SIZE, height: COVER_SIZE, borderRadius: 34, overflow: 'hidden', shadowColor: 'rgba(40,30,28,1)', shadowOffset: { width: 0, height: 24 }, shadowOpacity: 0.3, shadowRadius: 40, elevation: 20 },
  coverImage: { width: COVER_SIZE, height: COVER_SIZE },
  titleArea: { paddingHorizontal: 28, paddingTop: 24, zIndex: 5, gap: 8 },
  titleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14 },
  titleText: { fontSize: 26, fontWeight: '700', color: colors.ink, letterSpacing: 2 },
  descText: { fontSize: 13, color: 'rgba(31,28,25,0.5)', textAlign: 'center', letterSpacing: 0.4 },
  chips: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 4 },
  chip: { paddingVertical: 7, paddingHorizontal: 12, borderRadius: 12, overflow: 'hidden', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.6)' },
  chipLabel: { fontSize: 9, color: colors.ink2, opacity: 0.6, letterSpacing: 0.5 },
  chipValue: { fontSize: 12, fontWeight: '500', color: colors.ink },
  controls: { paddingHorizontal: 26, paddingTop: 6, zIndex: 5, gap: 6 },
  progressBar: { height: 22, justifyContent: 'center', position: 'relative' },
  progressTrack: { position: 'absolute', left: 0, right: 0, height: 2.5, borderRadius: 2, backgroundColor: 'rgba(31,28,25,0.18)' },
  progressFill: { position: 'absolute', left: 0, height: 2.5, borderRadius: 2, backgroundColor: colors.cta, shadowColor: colors.cta, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.6, shadowRadius: 6 },
  progressThumb: { position: 'absolute', width: 12, height: 12, borderRadius: 6, backgroundColor: '#fff', marginLeft: -6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.18, shadowRadius: 4, elevation: 3 },
  progressTimes: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 },
  timeText: { fontSize: 13, color: 'rgba(31,28,25,0.55)', fontVariant: ['tabular-nums'] },
  playbackRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 8, marginTop: 20 },
  iconBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  playbackCenter: { flexDirection: 'row', alignItems: 'center', gap: 28 },
  skipBtn: { padding: 6, alignItems: 'center', justifyContent: 'center' },
  playBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#c8633e', alignItems: 'center', justifyContent: 'center', shadowColor: '#b85028', shadowOffset: { width: 0, height: 14 }, shadowOpacity: 0.48, shadowRadius: 24, elevation: 16 },
  upNext: { marginTop: 16, padding: 12, paddingHorizontal: 14, borderRadius: 18, overflow: 'hidden', flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.55)' },
  upNextThumb: { width: 38, height: 38, borderRadius: 10, flexShrink: 0 },
  upNextMeta: { flex: 1, gap: 2 },
  upNextLabel: { fontSize: 10, color: 'rgba(31,28,25,0.5)', letterSpacing: 1 },
  upNextTitle: { fontSize: 13, fontWeight: '500', color: colors.ink },
  upNextDuration: { fontSize: 11, color: 'rgba(31,28,25,0.5)' },
});
