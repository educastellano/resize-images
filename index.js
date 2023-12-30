#!/usr/local/bin/node
const sharp = require('sharp')
const fs = require('fs')
const isImage = require('is-image')
const argv = require('minimist')(process.argv.slice(2), {
  default: {
    width: 900,
    height: 600,
    background: 'white',
    square: false
  },
  alias: {
    w: 'width',
    h: 'height',
    b: 'background',
    s: 'square'
  }
})

if (argv._.length < 1) {
  console.log('Missing parameter "folder"')
  process.exit(-1)
}

// Get Arguments
let folder = argv._[0].startsWith('/') ? argv._[0] : `${process.cwd()}/${argv._[0]}`
folder = folder.replace(/\/+$/, '') // remove trailing slash
const folderResized = `${folder}-resized`
const { width, height, background, square } = argv

// Create folder if not exist
if (!fs.existsSync(folderResized)) {
  fs.mkdirSync(folderResized)
}

// Resize images
fs.readdirSync(folder).forEach((file) => {
  const path = `${folder}/${file}`
  const pathResized = `${folderResized}/${file}`

  if (isImage(path)) {
    fs.readFile(path, (err, data) => {
      if (err) throw err
      if (square) {
        sharp(path)
          .metadata((err, metadata) => {
            if (err) {
              console.log('ERROR: Could not read meatadata of', path)
              return
            }
            const size = Math.max(metadata.width, metadata.height)
            resize(path, size, size, background, pathResized)
          })
      } else {
        resize(path, width, height, background, pathResized)
      }
    })
  }
})

function resize (path, width, height, background, pathResized) {
  sharp(path)
    .resize(width, height, { fit: 'contain', background })
    .toFile(pathResized, (err) => {
      if (err) {
        console.log('ERROR: Could not resize', pathResized)
        return
      }
      console.log(`* ${pathResized}`)
    })
}
