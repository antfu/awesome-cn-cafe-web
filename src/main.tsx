import React from 'react'
import { render } from 'react-dom'
import { defineComponent } from 'reactivue'
import { city, data, filteredGeo, filter, setCurrent, current, about, setAbout, searchOpen, setSearchOpen } from './store'
import { Nav } from './components/Nav'
import { Map } from './components/Map'
import { FloatControl } from './components/FloatControl'
import { Modal } from './components/Modal'
import { Detail } from './components/Detail'
import { About } from './components/About'
import { Search } from './components/Search'
import './main.css'

const App = defineComponent(
  () => ({ city, data, filteredGeo, filter, current, about, searchOpen }),
  ({ city, data, filteredGeo, filter, current, about, searchOpen }) => {
    return (
      <div className="h-full relative">
        <div className="h-full grid relative" style={{ gridTemplateRows: 'max-content auto' }}>
          <Nav/>
          <Map city={city} data={data} geo={filteredGeo} filter={filter}/>
        </div>

        <FloatControl />
        <Modal value={!!current} setValue={() => setCurrent(null)}>
          {current ? <Detail shop={current}/> : null }
        </Modal>
        <Modal value={about} setValue={() => setAbout(false)}>
          <About/>
        </Modal>
        <Modal value={searchOpen} setValue={() => setSearchOpen(false)}>
          <Search/>
        </Modal>
      </div>
    )
  },
)

render(<App/>, document.getElementById('app'))
