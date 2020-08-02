import React from 'react'
import { Icon } from '@iconify/react-with-api'

export const Logo = () => {
  return (
    <div className="inline-block m-auto">
      <Icon icon="carbon:cafe" className="inline-block mr-2 text-xl -mt-1 text-gray-500"/>
      <div className="inline-block m-auto">
      Café <sup className="text-gray-400 text-xs">CN</sup>
      </div>
    </div>
  )
}
