# resize-images

Resize images in a directory.

## Prerequisites

* [libvips](https://github.com/jcupitt/libvips)

## Install

    npm install resize-images -g

## Usage

Specifying width and height:

    resize-images albums/selfies -w 300 -h 200

Squared image:

    resize-images albums/selfies --square

* it creates the folder `album/selfies-resized`

## Changelog

* 1.0.0 
    * Initial release :tada:

## License

[ISC License](http://opensource.org/licenses/ISC)
