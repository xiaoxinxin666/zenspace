import type { CategoryKind } from '../theme';

export interface Track {
  title: string;
  sub: string;
  kind: CategoryKind;
  duration: string;
  palette: [string, string, string];
  label: string;
  fullTitle: string;
  desc: string;
  durationFull: string;
}

export interface SectionData {
  title: string;
  subtitle: string;
  items: Track[];
}

export const sections: SectionData[] = [
  {
    title: '西藏颂钵',
    subtitle: 'TIBETAN SINGING BOWLS',
    items: [
      {
        title: '积极能量流动', sub: '古老音声 · 15分钟', kind: 'focus', duration: '15:00',
        palette: ['#3a2e1f', '#a86a3a', '#e0a060'], label: 'tibet · golden bowl',
        fullTitle: '积极能量流动', desc: '让千年颂钵的频率，唤醒你内在的能量流动。', durationFull: '15分钟',
      },
      {
        title: '西藏冥想', sub: '深层共振 · 30分钟', kind: 'focus', duration: '30:00',
        palette: ['#1f1814', '#5a3a26', '#8a5a3a'], label: 'monastery interior',
        fullTitle: '西藏冥想', desc: '深层颂钵共振，引导意识进入辽阔之境。', durationFull: '30分钟',
      },
      {
        title: '七轮共振', sub: '能量平衡 · 20分钟', kind: 'breathe', duration: '20:00',
        palette: ['#2c1f3e', '#6a3a78', '#d8a060'], label: 'mandala study',
        fullTitle: '七轮共振', desc: '七只颂钵依次响起，平衡身体能量中心。', durationFull: '20分钟',
      },
      {
        title: '晨钟', sub: '清晨唤醒 · 10分钟', kind: 'focus', duration: '10:00',
        palette: ['#4a3826', '#b88040', '#f0c878'], label: 'morning bell',
        fullTitle: '晨钟', desc: '清晨第一声钟响，温柔唤醒身体与意识。', durationFull: '10分钟',
      },
    ],
  },
  {
    title: '喜马拉雅钵',
    subtitle: 'HIMALAYAN RESONANCE',
    items: [
      {
        title: '自然能量流动', sub: '高原气息 · 20分钟', kind: 'breathe', duration: '20:00',
        palette: ['#0a0a0c', '#2a2a30', '#5a5a60'], label: 'studio · low key',
        fullTitle: '自然能量流动', desc: '让高原的呼吸，流过你的身体。', durationFull: '20分钟',
      },
      {
        title: '夜晚舒缓', sub: '星空冥想 · 45分钟', kind: 'sleep', duration: '45:00',
        palette: ['#3a2a3e', '#8a6a7a', '#d8a8a0'], label: 'dusk mountain',
        fullTitle: '夜晚舒缓', desc: '星空之下，让一天的紧张轻轻散去。', durationFull: '45分钟',
      },
      {
        title: '雪山低吟', sub: '低频疗愈 · 25分钟', kind: 'heal', duration: '25:00',
        palette: ['#1a2a3a', '#4a6a7a', '#9aaab0'], label: 'snow ridge',
        fullTitle: '雪山低吟', desc: '低频钵音如雪山远眺，沉静而辽远。', durationFull: '25分钟',
      },
    ],
  },
  {
    title: '身心疗愈',
    subtitle: 'MIND & BODY HEALING',
    items: [
      {
        title: '深度睡眠', sub: '12个音频 · 3小时', kind: 'sleep', duration: '45:00',
        palette: ['#1a1438', '#4a2a68', '#d88a80'], label: 'starry night sky',
        fullTitle: '深度睡眠', desc: '跟随引导，进入无梦的深层睡眠。', durationFull: '45分钟',
      },
      {
        title: '森林呼吸', sub: '8个课程 · 1.5小时', kind: 'breathe', duration: '12:00',
        palette: ['#1a2a1a', '#3a5a3a', '#a8b89a'], label: 'pine forest mist',
        fullTitle: '森林呼吸', desc: '走入清晨的森林，与每一次呼吸共振。', durationFull: '12分钟',
      },
      {
        title: '湖光静心', sub: '6个音频 · 1小时', kind: 'heal', duration: '18:00',
        palette: ['#2a3838', '#5a7878', '#a8c0b8'], label: 'still lake at dawn',
        fullTitle: '湖光静心', desc: '湖面倒映晨光，心也归于平静。', durationFull: '18分钟',
      },
    ],
  },
];

export const DEFAULT_TRACK: Track = sections[2].items[0];
