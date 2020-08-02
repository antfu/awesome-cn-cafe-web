import { computed, Ref, ref } from 'reactivue'
import { useStorage } from '@vueuse/core'
import Fuse from 'fuse.js'
import { CafeShop } from './types'
import raw from './data.json'

export const rawData = Object.freeze(raw)
export const geo = Object.freeze({
  type: 'FeatureCollection',
  features: Object.values(rawData).flatMap(i => i.data.features as any[]),
})
export const shops = Object.freeze(geo.features.map(i => ({
  ...i,
  coordinates: i.geometry.coordinates,
}) as CafeShop))
export const fuseByName = new Fuse(shops, {
  includeScore: false,
  keys: [
    ['properties', '名称'],
  ],
})
export const fuseByReferrers = new Fuse(shops, {
  includeScore: false,
  keys: [
    ['properties', 'referrers'],
  ],
})

export type Cities = keyof typeof raw

export const city = useStorage('cafe-cn-city', 'shanghai') as Ref<Cities>
export const filter = useStorage('cafe-cn-filter', 'all')
export const loc = ref<[number, number] | null>(null)
export const about = ref(false)
export const searchOpen = ref(false)
export const searchString = ref('')

export const data = computed(() => rawData[city.value])

export const filteredGeo = computed(() => {
  if (filter.value === 'all') {
    return geo
  }
  else {
    return {
      ...geo,
      features: (geo.features as any[])
        .filter(i => i.properties['marker-color'] === filter.value),
    }
  }
})

export const searchResult = computed(() => {
  if (searchString.value.startsWith('@'))
    return fuseByReferrers.search(searchString.value).map(i => i.item)
  else
    return fuseByName.search(searchString.value).map(i => i.item)
})

export const current = ref<CafeShop | null>(null)

export const cityName = computed(() => data.value.name)
export const cities = Object.entries(raw)

export const setFilter = (v: string) => filter.value === v ? filter.value = 'all' : filter.value = v
export const changeCity = (v: Cities) => city.value = v
export const setCurrent = (v: CafeShop | null) => current.value = v
export const setLoc = (v: [number, number] | null) => loc.value = v
export const setAbout = (v: boolean) => about.value = v
export const setSearchOpen = (v: boolean) => searchOpen.value = v
export const setSearchString = (str: string) => searchString.value = str
