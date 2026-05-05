export const colors = {
  bg: '#f5f1ec',
  card: '#ffffff',
  ink: '#1f1c19',
  ink2: '#5b554f',
  ink3: '#9a948c',
  cta: '#d97757',
  ctaDeep: '#b9542d',
  breathe: '#6b8e9e',
  focus: '#c98a4b',
  sleep: '#6c5b8e',
  heal: '#7b8a6b',
} as const;

export const categories = {
  breathe: { label: '呼吸', dot: '#6b8e9e' },
  focus:   { label: '专注', dot: '#c98a4b' },
  sleep:   { label: '睡眠', dot: '#6c5b8e' },
  heal:    { label: '疗愈', dot: '#7b8a6b' },
} as const;

export type CategoryKind = keyof typeof categories;
