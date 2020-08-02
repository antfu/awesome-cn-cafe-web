import React from 'react'
import { BuildTime } from '../build'
import { fromNow } from '../utils/time'
import { Logo } from './Logo'

export const About = () => {
  return <div className="p-10 py-8">
    <h1 className="text-lg font-light text-gray-900 mb-4">
      <Logo/>
    </h1>
    <div className="text-sm text-gray-500 my-1 font-light">Data Source <a className="text-gray-700 hover:text-gray-900" href="https://github.com/ElaWorkshop/awesome-cn-cafe" target="_blank" rel="noreferrer">Awesome CN Café</a></div>
    <div className="text-sm text-gray-500 my-1 font-light">Made by <a className="text-gray-700 hover:text-gray-900" href="https://github.com/antfu" target="_blank" rel="noreferrer">@antfu</a></div>
    <div className="text-sm text-gray-500 my-1 font-light">Source code on <a className="text-gray-700 hover:text-gray-900" href="hhttps://github.com/antfu/awesome-cn-cafe-web" target="_blank" rel="noreferrer">Github</a></div>
    <div className="text-sm text-gray-500 my-1 font-light">Updated <span className="text-gray-700" >{fromNow(BuildTime)}</span></div>
  </div>
}
