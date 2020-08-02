import React from 'react'
import { Icon } from '@iconify/react-with-api'
import { defineComponent } from 'reactivue'
import { setSearchOpen } from '../store'

export const Search = defineComponent(
  () => {},
  () => {
    return (
      <div className="h-screen w-screen p-4">
        <div>Search</div>
        <Icon className="absolute top-0 right-0 m-3 text-2xl text-gray-600 hover:text-gray-800" icon="carbon:close" onClick={() => setSearchOpen(false)}/>
      </div>
    )
  },
)
