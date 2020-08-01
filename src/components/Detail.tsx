import React from 'react'
import { CafeShop } from '../types'
import { AppName } from '../constants'

interface Props {
  shop: CafeShop
}

const ignores = [
  '名称',
  '下载速度',
  'shortname',
  'Speedtest 链接',
  'marker-color',
  'marker-symbol',
]

export const Detail = ({ shop }: Props) => {
  const { properties, coordinates } = shop

  const name = properties['名称']
  const speed = properties['下载速度']
  const speedtest = properties['Speedtest 链接']
  const location1 = coordinates.join(',')
  const location2 = coordinates.slice().reverse().join(',')

  const table = Object.entries(properties)
    .filter(([k]) => !ignores.includes(k))

  return (
    <div className="p-6">
      <h1 className="text-lg">{name}</h1>
      <p className="text-gray-500 text-sm">
        <a
          className="inline-block align-middle"
          style={{ color: properties['marker-color'] }}
          href={speedtest}
          target="_blank"
          rel="noreferrer"
        >
          {speed}
        </a>
        <span className="inline-block align-middle mx-1">・</span>
        <span className="inline-block align-middle">{coordinates.map(i => i.toFixed(3)).join(', ')}</span>
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

      <div className="text-center mt-5 mb-2">
        <a
          href={`https://uri.amap.com/marker?position=${location1}&name=${name}`}
          target="_blank"
          rel="noreferrer"
          className="border border-gray-200 rounded px-4 py-2 text-gray-600 text-sm mx-1">
          高德地图
        </a>
        <a
          href={`http://api.map.baidu.com/marker?location=${location2}&title=${name}&content=${AppName}&output=html`}
          target="_blank"
          rel="noreferrer"
          className="border border-gray-200 rounded px-4 py-2 text-gray-600 text-sm mx-1">
          百度地图
        </a>
      </div>
    </div>
  )
}
