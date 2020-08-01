import React from 'react'
import { defineComponent } from 'reactivue'
import { filter, setFilter } from '../store'
import { Colors } from '../constants'

export const FloatControl = defineComponent(
  () => ({ filter }),
  ({ filter }) => {
    return (
      <div className="fixed bottom-0 left-0 mx-3 mb-10 p-2 bg-white rounded shadow flex flex-col">
        { Colors.map(color => (
          <button
            key={color}
            className="w-5 h-5 rounded-full m-1 border-4 focus:outline-none outline-none transition-all duration-300"
            style={{ background: color, borderColor: filter === color ? color : 'white' }}
            onClick={() => setFilter(color)}
          ></button>
        ))}
      </div>
    )
  },
)
