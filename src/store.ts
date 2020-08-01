import { computed, Ref, ref } from 'reactivue'
import { useStorage, useGeolocation } from '@vueuse/core'
import { CafeShop } from './types'
import raw from './data.json'

export const rawData = Object.freeze(raw)

export type Cities = keyof typeof raw

export const city = useStorage('cafe-cn-city', 'shanghai') as Ref<Cities>
export const filter = useStorage('cafe-cn-filter', 'all')
export const loc = useGeolocation()

export const data = computed(() => rawData[city.value])
export const geo = computed(() => data.value.data)
export const filteredGeo = computed(() => {
  if (filter.value === 'all') { return data.value.data }
  else {
    return {
      ...data.value.data,
      features: (data.value.data.features as any[])
        .filter(i => i.properties['marker-color'] === filter.value),
    }
  }
})

export const current = ref<CafeShop | null>(null)

export const cityName = computed(() => data.value.name)
export const cities = Object.entries(raw)

export const setFilter = (v: string) => filter.value === v ? filter.value = 'all' : filter.value = v
export const changeCity = (v: Cities) => city.value = v
export const setCurrent = (v: CafeShop | null) => current.value = v
