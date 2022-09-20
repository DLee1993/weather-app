const request = require("postman-request");

const geocodeLocation = (address, callback) => {
    const geoLocationURL =
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=pk.eyJ1IjoiZGFpMTQ3MSIsImEiOiJjbDNvZHZ6M3gwMTllM2l0NzJtdmlxMnIwIn0.fjlVWf9KNKuXKLmhT6lZ9Q`;

    request({ url: geoLocationURL, json: true}, (err, { body } = {}) => {
        if(err){
            callback(`Unable to connect to ${err.hostname}, please check internet connection`, undefined); 
        } else if (body.features.length === 0){
            callback("Unable to find location, please try again", undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocodeLocation;