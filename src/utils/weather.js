const request = require("postman-request");

const weatherReport = (latitude, longitude, callback) => {
    const weatherStackURL = `http://api.weatherstack.com/current?access_key=1a8395810508840a99bb1355f2c9b44f&query=${latitude},${longitude}`;

    request({ url: weatherStackURL, json: true }, (err, { body } = {}) => {
        if (err) {
            callback(
                `Unable to connect to ${err.hostname}, please check internet connection`,
                undefined
            );
        } else if (body.error) {
            callback(body.error.info, undefined);
        } else {
            callback(undefined, {
                // Add all values you want to retrieve from object here
                unit: body.request.unit,
                name: body.location.name,
                country: body.location.country,
                timezone: body.location.timezone_id,
                temp: body.current.temperature,
                humidity: body.current.humidity,
                uvIndex: body.current.uv_index,
                weatherIcon: body.current.weather_icons[0],
                weatherDescription: body.current.weather_descriptions[0],
                windDirection: body.current.wind_dir,
                windSpeed: body.current.wind_speed
            });
        }
    });
};

module.exports = weatherReport;
