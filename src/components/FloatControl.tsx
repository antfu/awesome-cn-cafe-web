import React from 'react'
import { defineComponent } from 'reactivue'
import { Icon } from '@iconify/react-with-api'
import { filter, setFilter } from '../store'
import { Colors, ColorToIcon } from '../constants'

export const FloatControl = defineComponent(
  () => ({ filter }),
  ({ filter }) => {
    return (
      <div className="fixed bottom-0 left-0 mx-3 mb-10 p-2 bg-white rounded shadow flex flex-col">
        { Colors.map(color => (
          <button
            key={color}
            className={`py-2 px-1 focus:outline-none outline-none transition-all duration-300 ${(filter === color || filter === 'all') ? '' : 'opacity-25'}`}
            style={{ color }}
            onClick={() => setFilter(color)}
          >
            <Icon className="pointer-events-none" icon={ColorToIcon[color]}/>
          </button>
        ))}
      </div>
    )
  },
)
