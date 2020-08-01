import React from 'react'
import { Icon } from '@iconify/react-with-api'
import { CafeShop } from '../types'

interface Props {
  shop: CafeShop
}

const ignores = [
  '名称',
  '下载速度',
  'Speedtest 链接',
  'marker-color',
  'marker-symbol',
]

export const Detail = ({ shop }: Props) => {
  const { properties, coordinates } = shop

  const name = properties['名称']
  const speed = properties['下载速度']
  const speedtest = properties['Speedtest 链接']

  const table = Object.entries(properties)
    .filter(([k]) => !ignores.includes(k))

  return (
    <div className="p-6">
      <h1 className="text-lg">{name}</h1>
      <p className="text-gray-700 text-sm">
        <span className="inline-block align-middle">{speed}</span>
        <a className="inline-block align-middle mx-2 text-lg" href={speedtest} target="_blank" rel="noreferrer">
          <Icon icon="carbon:meter"/>
        </a>
      </p>
      <table className="px-2 mt-5 mb-3 text-sm">
        <tbody>
          {table.map(([key, value]) => (
            <tr key={key}>
              <td className="pr-5 text-right text-gray-600 py-2">{key}</td>
              <td className="py-2">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center mt-4 mb-2">
        <a
          href={`amap://map/direction?origin=name:我的位置|latlng:${coordinates.join(',')}`}
          target="_blank"
          rel="noreferrer"
          className="border border-gray-200 rounded px-4 py-2 text-gray-600 text-sm mx-1">
          高德地图
        </a>
        <a
          href={`bdmap://map/direction?origin=name:我的位置|latlng:${coordinates.join(',')}`}
          target="_blank"
          rel="noreferrer"
          className="border border-gray-200 rounded px-4 py-2 text-gray-600 text-sm mx-1">
          百度地图
        </a>
      </div>
    </div>
  )
}
