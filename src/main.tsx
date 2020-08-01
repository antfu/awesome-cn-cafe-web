import React from 'react'
import { render } from 'react-dom'
import './main.css'
import { defineComponent } from 'reactivue'
import { Nav } from './components/Nav'
import { Map } from './components/Map'
import { city, data } from './store'

const App = defineComponent(
  () => ({ city, data }),
  ({ city, data }) => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'max-content auto' }}>
        <Nav/>
        <Map city={city} data={data}/>
      </div>
    )
  },
)

render(<App/>, document.getElementById('app'))
