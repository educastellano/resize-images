#!/usr/local/bin/node
var sharp   = require('sharp')
var fs      = require('fs')

if (process.argv.length < 3) {
    console.log('Missing parameter "folder"')
    process.exit(-1)
}

var folder          = process.argv[2]
var folder_small    = `${folder}-small`
var width           = process.argv.length > 3 ? parseInt(process.argv[3]) : 900
var height          = process.argv.length > 4 ? parseInt(process.argv[4]) : 600

if (!fs.existsSync(folder_small)){
    fs.mkdirSync(folder_small);
}

fs.readdirSync(folder).forEach((file) => {
    var path        = `${folder}/${file}`
    var path_small  = `${folder_small}/${file}`
    fs.readFile(path, (err, data) => {
        if (err) throw err
        sharp(path)
            .resize(width, height)
            // .background('white')
            .embed()
            .toFile(path_small, function(err) {
                console.log(`* ${path_small}`)
            })
    })
})

