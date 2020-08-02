export const AppName = 'Café 𝐂𝐍'

export const ColorToIcon: Record<string, string> = {
  '#50C240': 'mdi:wifi-strength-4',
  '#F3AE1A': 'mdi:wifi-strength-2',
  '#C24740': 'mdi:wifi-strength-1',
  '#BEBEBE': 'mdi:domain-off',
}

export const Colors = Object.keys(ColorToIcon)

export const ignoredProperties = [
  '名称',
  '下载速度',
  'shortname',
  'Speedtest 链接',
  'marker-color',
  'marker-symbol',
  'referrers',
]
