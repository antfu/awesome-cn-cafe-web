export const AppName = 'Café 𝐂𝐍'

export const ColorsToLevel = {
  '#50C240': 'good',
  '#F3AE1A': 'soso',
  '#C24740': 'bad',
  '#BEBEBE': 'unavailable',
} as const

export const ColorToIcon: Record<string, string> = {
  '#50C240': 'mdi:wifi-strength-4',
  '#F3AE1A': 'mdi:wifi-strength-2',
  '#C24740': 'mdi:wifi-strength-1',
  '#BEBEBE': 'mdi:domain-off',
}

export const Levels = Object.values(ColorsToLevel)
export const Colors = Object.keys(ColorsToLevel)
