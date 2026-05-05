import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

export const BackIcon = ({ color = '#1f1c19', size = 16 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path d="M10 2L4 8l6 6" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export const PlayIcon = ({ color = 'white', size = 26 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 26 26" fill={color}>
    <Path d="M8 4.5v17a1 1 0 0 0 1.5.86l13.5-8.36a1 1 0 0 0 0-1.7L9.5 3.6A1 1 0 0 0 8 4.5z" />
  </Svg>
);

export const PauseIcon = ({ color = 'white', size = 26 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 26 26" fill={color}>
    <Rect x="6" y="4" width="5" height="18" rx="2" />
    <Rect x="15" y="4" width="5" height="18" rx="2" />
  </Svg>
);

export const SkipBackIcon = ({ color = 'rgba(31,28,25,0.65)', size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill={color}>
    <Rect x="4" y="6" width="2.5" height="16" rx="1.2" />
    <Path d="M24 6.5v15a1 1 0 0 1-1.5.86L9 14a1 1 0 0 1 0-1.7l13.5-8.36A1 1 0 0 1 24 6.5z" />
  </Svg>
);

export const SkipForwardIcon = ({ color = 'rgba(31,28,25,0.65)', size = 28 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 28 28" fill={color}>
    <Rect x="21.5" y="6" width="2.5" height="16" rx="1.2" />
    <Path d="M4 6.5v15a1 1 0 0 0 1.5.86L19 14a1 1 0 0 0 0-1.7L5.5 3.94A1 1 0 0 0 4 6.5z" />
  </Svg>
);

export const TimerIcon = ({ color = 'rgba(31,28,25,0.55)', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round">
    <Circle cx="11" cy="12" r="7" />
    <Path d="M11 9v3l2 1" />
    <Path d="M9 3h4" />
  </Svg>
);

export const ShareIcon = ({ color = 'rgba(31,28,25,0.55)', size = 22 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 22 22" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 14v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
    <Path d="M11 3v12" />
    <Path d="M7 7l4-4 4 4" />
  </Svg>
);

export const HeartIcon = ({ filled = false, size = 22 }: { filled?: boolean; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 22 22" fill={filled ? '#d97757' : 'none'}>
    <Path
      d="M11 19s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 18 9c0 5.6-7 10-7 10z"
      stroke={filled ? '#d97757' : 'rgba(31,28,25,0.6)'}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </Svg>
);

export const DurationIcon = ({ color = '#1f1c19', size = 15 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 15 15" fill="none">
    <Circle cx="7.5" cy="8" r="5.5" stroke={color} strokeWidth="1.3" />
    <Path d="M7.5 5v3l2 1.2" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
    <Path d="M5.5 1.5h4" stroke={color} strokeWidth="1.3" strokeLinecap="round" />
  </Svg>
);

export const SoundWaveIcon = ({ size = 14 }: { size?: number }) => (
  <Svg width={size} height={(size * 12) / 14} viewBox="0 0 14 12" fill="none">
    <Rect x="1"    y="4" width="1.6" height="4"  rx="0.8" fill="white" />
    <Rect x="3.6"  y="2" width="1.6" height="8"  rx="0.8" fill="white" />
    <Rect x="6.2"  y="0" width="1.6" height="12" rx="0.8" fill="white" />
    <Rect x="8.8"  y="2" width="1.6" height="8"  rx="0.8" fill="white" />
    <Rect x="11.4" y="4" width="1.6" height="4"  rx="0.8" fill="white" />
  </Svg>
);

/* Bottom nav icons (viewBox 0 0 28 28) */
export const HomeNavIcon = ({ color = '#1f1c19', strokeWidth = 1.7 }: { color?: string; strokeWidth?: number }) => (
  <Svg width={26} height={26} viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M4 12L14 4l10 8v12a2 2 0 0 1-2 2h-4v-8h-8v8H6a2 2 0 0 1-2-2V12z" />
  </Svg>
);

export const SleepNavIcon = ({ color = '#1f1c19', strokeWidth = 1.7 }: { color?: string; strokeWidth?: number }) => (
  <Svg width={26} height={26} viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M22 16a8 8 0 1 1-8-12 6.5 6.5 0 0 0 8 12z" />
  </Svg>
);

export const SoundsNavIcon = ({ color = '#1f1c19', strokeWidth = 1.7 }: { color?: string; strokeWidth?: number }) => (
  <Svg width={26} height={26} viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="9" cy="22" r="3" />
    <Path d="M12 22V6l12-3v16" />
    <Circle cx="21" cy="20" r="3" />
  </Svg>
);

export const MeNavIcon = ({ color = '#1f1c19', strokeWidth = 1.7 }: { color?: string; strokeWidth?: number }) => (
  <Svg width={26} height={26} viewBox="0 0 28 28" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="14" cy="10" r="5" />
    <Path d="M4 26c0-5 4.5-9 10-9s10 4 10 9" />
  </Svg>
);
