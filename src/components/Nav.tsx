import React from 'react'
import { Icon } from '@iconify/react-with-api'
import { defineComponent } from 'reactivue'
import { city, cityName, cities, changeCity, Cities } from '../store'

export const Nav = defineComponent(
  () => ({ cities, city, cityName, changeCity }),
  ({ city, cities, cityName, changeCity }) => {
    return (
      <div className="text-center p-2 border-b border-gray-200 flex font-light relative">
        <div className="text-sm text-gray-700 flex-none m-1 hover:bg-gray-100 rounded px-2 py-1 cursor-pointer relative">
          {cityName}
          <Icon icon="carbon:chevron-down" className="inline-block text-gray-500 align-middle"/>
          <select
            className="absolute top-0 bottom-0 left-0 right-0 opacity-0"
            value={city}
            onChange={e => changeCity(e.target.value as Cities)}
          >
            {cities.map(([k, v]) =>
              <option value={k} key={k} >{v.name} ({v.count})</option>,
            )}
          </select>
        </div>
        <div className="flex-auto"></div>
        <div className="hover:bg-gray-100 hover:text-gray-700 text-gray-500 rounded p-2 mx-1 m-auto cursor-pointer">
          <Icon icon="carbon:search" className="text-lg"/>
        </div>
        <div className="hover:bg-gray-100 hover:text-gray-700 text-gray-500 rounded p-2 mx-1 m-auto cursor-pointer">
          <Icon icon="carbon:map" className="text-lg"/>
        </div>

        <div
          className="text-lg text-gray-700 absolute left-0 right-0 -mr-2 pointer-events-none"
          style={{ top: '50%', transform: 'translateY(-50%)' }}
        >
          <div className="inline-block m-auto">
            <Icon icon="carbon:cafe" className="inline-block mr-2 text-xl -mt-1 text-gray-500"/>
            <div className="inline-block m-auto">
            Café <sup className="text-gray-400 text-xs">CN</sup>
            </div>
          </div>
        </div>
      </div>
    )
  },
)
