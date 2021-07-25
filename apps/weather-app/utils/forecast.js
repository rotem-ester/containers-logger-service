const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const weatherUrl = `http://api.weatherstack.com/current?access_key=f54e436a4127eaab3ad0d1eb119fd464&query=${latitude},${longitude}`

    request({ url: weatherUrl, json: true }, (error, response) => {
        const {body: {current: {weather_descriptions, temperature, feelslike}}} = response

        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if (response.body.error) {
            callback('Error has occured: ' + response.body.error.info, undefined)
        } else {
            callback(undefined, {
                description: weather_descriptions[0],
                temperature: temperature,
                feelslike: feelslike
            })
        }
    })
}

module.exports = forecast
