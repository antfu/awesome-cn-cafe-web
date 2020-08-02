import React from 'react'
import { CafeShop } from '../types'
import { parseShop } from '../utils/parseShop'
import { setCurrent, setSearchOpen } from '../store'
import { emitter } from '../event'

interface Props {
  shop: CafeShop
}

export const ListItem = ({ shop }: Props) => {
  const {
    name,
    color,
    speed,
    distance,
    referrers,
  } = parseShop(shop)

  const onClick = () => {
    setCurrent(shop)
    setSearchOpen(false)
    emitter.emit('fly-to', {
      center: [shop.coordinates[0], shop.coordinates[1] - 0.005],
      zoom: 14,
      speed: 1.5,
    })
  }

  return (
    <div
      className="px-1 py-2 border-b border-gray-200"
      onClick={onClick}
    >
      <h1 className="text-gray-700">{name}</h1>
      <p className="text-gray-500 text-sm">
        <span
          className="inline-block align-middle"
          style={{ color }}
        >{speed}</span>
        {distance && (
          <>
            <span className="inline-block align-middle mx-1">・</span>
            <span className="inline-block align-middle">{distance}</span>
          </>
        )}
        <>
          <span className="inline-block align-middle mx-1">・</span>
          <span className="inline-block align-middle">{referrers.join(' ')}</span>
        </>
      </p>
    </div>
  )
}
