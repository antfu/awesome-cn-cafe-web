import React from 'react'
import { setCurrent, setLoc } from '../store'
import { emitter } from '../event'

window.mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aG9ueWZ1MTE3IiwiYSI6ImNrZGJxa3U2MTB1ZjgycXJ4eWQ5N3cxN3cifQ.Vz_GndQJpG6ybjFc-MJaCw'

interface Props {
  city: string
  filter: string
  geo: any
  data: any
}

const SCALE = 10

function createColorPoint(...color: number[]) {
  const d = 48
  const r = d / 2
  const r2 = r ** 2
  const bytesPerPixel = 4

  const data = new Uint8Array(d * d * bytesPerPixel)

  for (let x = 0; x < d; x++) {
    for (let y = 0; y < d; y++) {
      if ((x - r) ** 2 + (y - r) ** 2 >= r2)
        continue

      const offset = (y * d + x) * bytesPerPixel
      for (let b = 0; b < bytesPerPixel; b++)
        data[offset + b] = color[b]
    }
  }
  return { width: d, height: d, data }
}

export class Map extends React.Component<Props> {
  mapContainer: HTMLDivElement | undefined | null
  map: any
  geoControl: any
  last = ''
  lastFilter = ''

  componentDidMount() {
    this.map = new window.mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/anthonyfu117/cjygtd7sr07dq1cqibnpqvq4w',
      center: this.props.data.center,
      zoom: SCALE,
    })
    window.map = this.map
    this.map.on('load', () => {
      this.map.addImage('#50C240', createColorPoint(80, 194, 64, 255))
      this.map.addImage('#F3AE1A', createColorPoint(255, 193, 7, 255))
      this.map.addImage('#C24740', createColorPoint(194, 71, 64, 255))
      this.map.addImage('#BEBEBE', createColorPoint(125, 125, 125, 255))

      this.updateMap()
    })

    this.map.on('click', 'layer', (e: any) => {
      if (!e.features)
        return

      const coordinates = e.features[0].geometry.coordinates.slice()
      const properties = e.features[0].properties

      setCurrent({
        coordinates,
        properties,
      })
    })

    this.map.on('mouseenter', 'layer', () => {
      this.map.getCanvas().style.cursor = 'pointer'
    })

    this.map.on('mouseleave', 'layer', () => {
      this.map.getCanvas().style.cursor = ''
    })

    this.geoControl = new window.mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    })

    this.map.addControl(this.geoControl)

    emitter.on('track', () => {
      this.geoControl.trigger()
    })

    emitter.on('fly-to', (data: any) => {
      this.map.flyTo(data)
    })

    this.geoControl.on('geolocate', (e: any) => {
      setLoc([e.coords.longitude, e.coords.latitude])
    })
  }

  componentDidUpdate() {
    this.updateMap()
  }

  shouldComponentUpdate(next: Props) {
    return this.last !== next.city || this.lastFilter !== next.filter
  }

  updateMap() {
    const { city, filter, geo, data } = this.props

    if (this.last !== city) {
      this.map.flyTo({
        center: data.center,
        zoom: SCALE,
        speed: 2,
      })
    }

    if (this.lastFilter !== filter) {
      if (this.map.getLayer('layer'))
        this.map.removeLayer('layer')
      if (this.map.getSource('source'))
        this.map.removeSource('source')

      this.map.addSource('source', {
        type: 'geojson',
        data: geo,
      })

      this.map.addLayer({
        id: 'layer',
        type: 'symbol',
        source: 'source',
        layout: {
          'icon-image': ['get', 'marker-color'],
          'icon-size': 0.25,
          'text-field': ['get', 'shortname'],
          'text-size': 12,
          'text-offset': [0, 0.5],
          'text-anchor': 'top',
          'icon-allow-overlap': true,
        },
        paint: {
          'text-color': '#7e6c56',
          'text-halo-color': '#fff',
          'text-halo-width': 1,
          'text-halo-blur': 0,
        },
      })
    }

    this.last = city
    this.lastFilter = filter
  }

  render() {
    return (
      <div ref={(el: any) => this.mapContainer = el} style={{ height: '100%', width: '100%' }} />
    )
  }
}
