import { computed, Ref, ref } from 'reactivue'
import { useStorage } from '@vueuse/core'
import { CafeShop } from './types'
import raw from './data.json'

export const rawData = Object.freeze(raw)

export type Cities = keyof typeof raw

export const city = useStorage('cafe-cn-city', 'shanghai') as Ref<Cities>
export const filter = useStorage('cafe-cn-filter', 'all')
export const loc = ref<[number, number] | null>(null)
export const about = ref(false)

export const data = computed(() => rawData[city.value])

export const geo = computed(() => ({
  type: 'FeatureCollection',
  features: Object.values(rawData).flatMap(i => i.data.features as any[]),
}))

export const filteredGeo = computed(() => {
  if (filter.value === 'all') {
    return geo.value
  }
  else {
    return {
      ...geo.value,
      features: (geo.value.features as any[])
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
export const setLoc = (v: [number, number] | null) => loc.value = v
export const setAbout = (v: boolean) => about.value = v

export const getDistanceFromMe = (coords: [number, number]) => {
  if (!loc.value)
    return null

  const [lat1, lon1] = coords
  const [lat2, lon2] = loc.value
  if ((lat1 === lat2) && (lon1 === lon2)) {
    return 0
  }
  else {
    const radlat1 = Math.PI * lat1 / 180
    const radlat2 = Math.PI * lat2 / 180
    const theta = lon1 - lon2
    const radtheta = Math.PI * theta / 180
    let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)
    if (dist > 1)
      dist = 1

    dist = Math.acos(dist)
    dist = dist * 180 / Math.PI
    dist = dist * 60 * 1.1515
    const km = dist * 1.609344

    if (km > 1)
      return `${+km.toFixed(2)} km`
    else
      return `${Math.round(km * 1000)} m`
  }
}
