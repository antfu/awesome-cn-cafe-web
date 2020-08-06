import React, { useRef, useEffect } from 'react'
import { Icon } from '@iconify/react-with-api'
import { defineComponent } from 'reactivue'
import { setSearchOpen, searchResult, searchString, setSearchString, searchOpen } from '../store'
import { ListItem } from './ListItem'

export const Search = defineComponent(
  () => ({ searchResult, searchString, searchOpen }),
  ({ searchResult, searchString, searchOpen }) => {
    const ref = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
      if (ref.current && searchOpen)
        ref.current?.focus()
    }, [])

    return (
      <div
        className="h-screen w-screen relative grid"
        style={{ gridTemplateRows: 'max-content auto' }}
      >
        <div className="px-4 border-b border-gray-200">
          <input
            ref={ref}
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
            placeholder="Search"
            className="px-3 py-4 outline-none w-full"
          />
          <Icon className="absolute top-0 right-0 m-4 text-2xl text-gray-600 hover:text-gray-800" icon="carbon:close" onClick={() => setSearchOpen(false)}/>
        </div>
        <div className="overflow-auto py-2 px-6">
          {
            searchString
              ? searchResult.length
                ? searchResult.map(i => <ListItem key={i.coordinates.toString()} shop={i}/>)
                : <div className="p-3 text-sm text-gray-400 text-center">无结果</div>
              : <div className="p-3 text-sm text-gray-400 text-center">输入关键字以开始搜索</div>
          }
        </div>
      </div>
    )
  },
)
