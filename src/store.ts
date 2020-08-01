import { ref, computed } from 'reactivue'
import raw from './data.json'

export const rawData = Object.freeze(raw)

export type Cities = keyof typeof raw

export const city = ref<Cities>('shanghai')
export const data = computed(() => rawData[city.value])
export const geo = computed(() => data.value.data)
export const cityName = computed(() => data.value.name)
export const cities = Object.entries(raw)

export const changeCity = (v: Cities) => city.value = v
