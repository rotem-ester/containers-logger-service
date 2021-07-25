const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoicm90ZW1lc3RlciIsImEiOiJja3I5Y3hqNm4waHA5MnVxeHFtMGIzbDI2In0.VTb7lTT6BeIO3hqZQ9w9yA&limit=1`
    request({ url: url, json: true }, (error, {body} = {}) => {
            if (error){
                callback('Error had occured. unable to connect to location service.', undefined)
            } else if (body.features.length === 0) {
                callback('Unable to find location. try again please.', undefined)
            } else {
                const longitude = body.features[0].center[0]
                const latitude = body.features[0].center[1]
                const location = body.features[0].place_name
                callback(undefined, {longitude, latitude, location})
            }
        })
}

module.exports = geocode