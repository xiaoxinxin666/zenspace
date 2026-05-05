import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  palette: [string, string, string];
  label?: string;
  borderRadius?: number;
  style?: object;
}

export default function PhotoTile({ palette, label, borderRadius = 16, style }: Props) {
  return (
    <LinearGradient
      colors={palette}
      start={{ x: 0.1, y: 0 }}
      end={{ x: 0.85, y: 1 }}
      style={[styles.fill, { borderRadius }, style]}
    >
      {/* soft top highlight */}
      <View style={styles.highlight} />
      {/* horizon line */}
      <View style={styles.horizon} />
      {label && <Text style={styles.label}>{label}</Text>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    overflow: 'hidden',
  },
  highlight: {
    position: 'absolute',
    top: -40,
    left: -40,
    right: -40,
    height: '55%',
    backgroundColor: 'rgba(255,255,255,0.09)',
    borderRadius: 999,
  },
  horizon: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: '32%',
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  label: {
    position: 'absolute',
    bottom: 10,
    left: 12,
    fontSize: 9,
    color: 'rgba(255,255,255,0.55)',
    letterSpacing: 0.4,
    fontFamily: 'monospace',
  },
});
