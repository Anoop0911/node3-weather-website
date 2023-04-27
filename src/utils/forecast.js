const request = require('postman-request')


const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ecd656c5d80f12568e915ca9eb13124a&query='+ encodeURIComponent(latitude) +','+ encodeURIComponent(longitude) +'&units=m'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Network Connection Error! Check your internet connection.')
        } else if (body.error) {
            callback('Unable to find the forecast for the given location. Try another location..')
        } else {
            const weather = body.current.weather_descriptions
            const temperature = body.current.temperature 
            const apparentTemperature = body.current.feelslike
            callback(undefined, weather + '. It is currently ' + temperature + ' degrees out. It feels like ' + apparentTemperature + ' degrees out.')
        }
    })
}

module.exports = forecast