import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  palette: [string, string, string];
  label?: string;
  borderRadius?: number;
  style?: object;
  imageSource?: any;
}

export default function PhotoTile({ palette, label, borderRadius = 16, style, imageSource }: Props) {
  return (
    <View style={[styles.fill, { borderRadius }, style]}>
      {imageSource ? (
        <Image source={imageSource} style={styles.image} resizeMode="cover" />
      ) : (
        <LinearGradient
          colors={palette}
          start={{ x: 0.1, y: 0 }}
          end={{ x: 0.85, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {/* subtle vignette overlay */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.35)']}
        style={StyleSheet.absoluteFill}
      />
      {label && !imageSource && (
        <Text style={styles.label}>{label}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
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
