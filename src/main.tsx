import React from 'react'
import { render } from 'react-dom'
import { defineComponent } from 'reactivue'
import { Nav } from './components/Nav'
import { Map } from './components/Map'
import { FloatControl } from './components/FloatControl'
import { city, data, filteredGeo, filter, setCurrent, current } from './store'
import { Modal } from './components/Modal'
import { Detail } from './components/Detail'
import './main.css'

const App = defineComponent(
  () => ({ city, data, filteredGeo, filter, current }),
  ({ city, data, filteredGeo, filter, current }) => {
    return (
      <div style={{ height: '100%', display: 'grid', gridTemplateRows: 'max-content auto' }}>
        <Nav/>
        <Map city={city} data={data} geo={filteredGeo} filter={filter}/>
        <FloatControl />
        <Modal value={!!current} setValue={() => setCurrent(null)}>
          {current ? <Detail shop={current}/> : null }
        </Modal>
      </div>
    )
  },
)

render(<App/>, document.getElementById('app'))
