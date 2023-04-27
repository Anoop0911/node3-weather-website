const request = require('postman-request')


const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5vb3BzYXhlbmEiLCJhIjoiY2tqams4NHdoMTlmMTJzcW9ydXV1a3E2dSJ9.3fu8cNz9WhG5I4JbGcjL0A&limit=1'

    request({ url, json: true}, (error, { body }={}) => {
        if (error) {
            callback('Network Connection Error! Check your internet connection.')
        } else if (body.features.length === 0) {
            callback('Unable to find the location. Try another location search')
        } else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode