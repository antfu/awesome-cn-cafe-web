export const ColorsToLevel = {
  '#50C240': 'good',
  '#F3AE1A': 'soso',
  '#C24740': 'bad',
  '#BEBEBE': 'unavailable',
} as const

export const Levels = Object.values(ColorsToLevel)
export const Colors = Object.keys(ColorsToLevel)
