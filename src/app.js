const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Set up paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//set up handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anoop Saxena'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anoop Saxena'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anoop Saxena',
        message: 'Having problem using the app. Here are some ways to better use the application.'
    })
})

app.get('/weather', (req, res) => {
    address = req.query.address

    if(!address) {
        return res.send({
            error: 'You must provide an address to get the weather forecast.'
        })
    }

    geoCode( address, (error, { latitude, longitude, location } = {} ) => {

        if (error) {
            return res.send({
                error
            })
        }
    
    
        forecast( latitude, longitude, (error, forecastData) => {
    
            if (error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                address,
                location,
                forecastData
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Anoop Saxena',
        errorMessage: 'Help Article Not Found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anoop Saxena',
        errorMessage: 'Not Found Error.'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port ' + port )
})