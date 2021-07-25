const chalk = require('chalk')
const express = require('express')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// Constants
const PORT = 3000
const HOST = '0.0.0.0'
const app = express()

const locationQuery = process.argv[2]

if (!locationQuery){
    return console.log('Please provide a location query')
}


geocode(locationQuery,  (error, {longitude, latitude, location} = {}) => {
    if (error){
        app.get('/', (req,res) => {
            res.send(error)
        })
    } else {
        forecast(longitude, latitude, (error, {description, temperature, feelslike} = {}) => {
            if (error){
                app.get('/', (req,res) => {
                    res.send(error)
                })
            } else {
                app.get('/', (req,res) => {
                    res.send(`${location} \n${description}. It is ${temperature} degrees celcius outside. feels like ${feelslike}.`)
                })
            }
        })
    }
})

app.listen(PORT, HOST)
console.log(chalk.magenta(`Running on http://${HOST}:${PORT}`))