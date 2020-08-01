import React from 'react'

window.mapboxgl.accessToken = 'pk.eyJ1IjoiYW50aG9ueWZ1MTE3IiwiYSI6ImNrZGJxa3U2MTB1ZjgycXJ4eWQ5N3cxN3cifQ.Vz_GndQJpG6ybjFc-MJaCw'

interface Props {
  city: string
  data: any
}

const SCALE = 10

function createColorPoint(...color: number[]) {
  const width = 12
  const bytesPerPixel = 4
  const data = new Uint8Array(width * width * bytesPerPixel)

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < width; y++) {
      const offset = (y * width + x) * bytesPerPixel
      for (let b = 0; b < 4; b++)
        data[offset + b] = color[b]
    }
  }
  return { width, height: width, data }
}

export class Map extends React.Component<Props> {
  mapContainer: HTMLDivElement | undefined | null
  map: any
  last = 'shanghai'

  componentDidMount() {
    this.map = new window.mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: this.props.data.center,
      zoom: SCALE,
    })
    window.map = this.map
    this.map.on('load', () => {
      this.map.addImage('#50C240', createColorPoint(139, 195, 74, 255))
      this.map.addImage('#C24740', createColorPoint(194, 71, 64, 255))
      this.map.addImage('#F3AE1A', createColorPoint(255, 193, 7, 255))
      this.map.addImage('#BEBEBE', createColorPoint(125, 125, 125, 255))

      this.updateMap()
    })
  }

  componentDidUpdate() {
    console.log('props', this.props)
    this.updateMap()
  }

  shouldComponentUpdate(next: Props) {
    console.log('should', this.last, next)
    return this.last !== next.city
  }

  updateMap() {
    this.last = this.props.city

    this.map.flyTo({
      center: this.props.data.center,
      zoom: SCALE,
      speed: 2,
    })

    if (!this.map.getSource(this.props.city)) {
      this.map.addSource(this.props.city, {
        type: 'geojson',
        data: this.props.data.data,
      })
    }

    if (!this.map.getLayer(`layer-${this.props.city}`)) {
      this.map.addLayer({
        id: `layer-${this.props.city}`,
        type: 'symbol',
        source: this.props.city,
        layout: {
          'icon-image': ['get', 'marker-color'],
          'text-field': ['get', '名称'],
          'text-size': 12,
          'text-offset': [0, 0.5],
          'text-anchor': 'top',
        },
      })
    }
  }

  render() {
    return (
      <div ref={el => this.mapContainer = el} style={{ height: '100%', width: '100%' }} />
    )
  }
}
