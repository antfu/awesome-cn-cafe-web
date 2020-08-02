import path from 'path'
import { promises as fs } from 'fs'
import fg from 'fast-glob'

(async() => {
  const readme = await fs.readFile('./cafe/README.md')
  const regex = /\* \[(.*)\s*\((\d+)\)\]\((.*).geojson\)/g
  const data = {}

  let match

  // eslint-disable-next-line no-cond-assign
  while (match = regex.exec(readme)) {
    data[match[3]] = {
      name: match[1],
      count: +match[2],
    }
  }

  const files = await fg('./cafe/*.geojson')

  for (const file of files) {
    const name = path.parse(file).name
    data[name].data = JSON.parse(await fs.readFile(file, 'utf-8'))

    data[name].data.features.forEach(i =>
      i.properties.shortname = i.properties['名称']
        .replace(/[(（].*[)）]/g, '')
        .replace('星巴克', 'Starbucks')
        .replace(/Starbucks\s*Starbucks/, 'Starbucks')
        .trim(),
    )

    // calc center
    const coordinates = data[name].data.features.map(i => i.geometry.coordinates)
    data[name].center = coordinates
      .reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0])
      .map(i => i / coordinates.length)
  }

  await fs.writeFile('./src/data.json', JSON.stringify(data), 'utf-8')
  await fs.writeFile('./src/build.ts', `export const BuildTime = ${+new Date()}\n`, 'utf-8')
})()
