import React from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { SoundWaveIcon } from './icons';
import { colors } from '../theme';

const { height: SCREEN_H } = Dimensions.get('window');
const HERO_H = Math.round(SCREEN_H * 0.64);

// 把视频文件放到 assets/videos/hero.mp4 后自动生效
const HERO_VIDEO = require('../../assets/videos/hero.mp4');

interface Props {
  onStart: () => void;
}

export default function Hero({ onStart }: Props) {
  const player = useVideoPlayer(HERO_VIDEO, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.backdrop}>
        {/* 循环播放的背景视频 */}
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
          allowsFullscreen={false}
          allowsPictureInPicture={false}
        />

        {/* 整体压暗，保证文字清晰 */}
        <View style={styles.dimmer} />

        {/* 底部渐变过渡到页面背景色 */}
        <LinearGradient
          colors={['transparent', 'rgba(245,241,236,0.4)', colors.bg]}
          style={styles.fade}
        />

        {/* 编辑标题 */}
        <View style={styles.titleBlock}>
          <Text style={styles.heroTitle}>向内探索</Text>
          <Text style={styles.heroSub}>FIND  YOUR  INNER  PEACE</Text>
        </View>
      </View>

      {/* CTA 按钮，跨在视频和内容区交界处 */}
      <View style={styles.ctaArea}>
        <Pressable
          onPress={onStart}
          style={({ pressed }) => [
            styles.ctaBtn,
            pressed && { opacity: 0.92, transform: [{ scale: 0.98 }] },
          ]}
        >
          <View style={styles.ctaIconWrap}>
            <SoundWaveIcon size={14} />
          </View>
          <Text style={styles.ctaText}>开始冥想</Text>
        </Pressable>
        <Text style={styles.ctaSub}>
          今日已专注 <Text style={styles.ctaAccent}>10</Text> 分钟
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  backdrop: {
    width: '100%',
    height: HERO_H,
    overflow: 'hidden',
    backgroundColor: '#1a2a1a', // fallback 色，视频加载前显示
  },
  dimmer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.32)',
  },
  fade: {
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    height: 140,
  },
  titleBlock: {
    position: 'absolute',
    left: 0, right: 0,
    top: HERO_H * 0.44,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 52,
    fontWeight: '300',
    color: '#fff',
    letterSpacing: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 20,
  },
  heroSub: {
    marginTop: 10,
    fontSize: 11,
    fontWeight: '300',
    color: 'rgba(255,255,255,0.82)',
    letterSpacing: 6,
  },
  ctaArea: {
    position: 'absolute',
    left: 0, right: 0,
    top: HERO_H - 100,
    alignItems: 'center',
    gap: 10,
  },
  ctaBtn: {
    width: 250, height: 62,
    borderRadius: 40,
    backgroundColor: '#c8633e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
    shadowColor: '#b85028',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.42,
    shadowRadius: 20,
    elevation: 12,
  },
  ctaIconWrap: {
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    letterSpacing: 4,
  },
  ctaSub: {
    fontSize: 12,
    color: colors.ink3,
    letterSpacing: 1,
  },
  ctaAccent: {
    color: colors.cta,
    fontWeight: '500',
  },
});
