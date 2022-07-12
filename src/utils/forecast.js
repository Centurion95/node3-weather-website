const request = require("postman-request");


const forecast = (lat, lon, callback) => {

    console.log(lat);
    console.log(lon);

    const access_key = 'fae5f508258400d9e0b005f671517c68';
    const url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + lat + ',' + lon + '&units=m';
    console.log(url);

    // request({ url: url, json: true }, (error, response) => {
    // request({ url, json: true }, (error, response) => { //shorthand
    request({ url, json: true }, (error, { body }) => { //shorthand //destructuring
        if (error) {
            callback('FC - Unnable to connect to forecast service', undefined);
            // } else if (response.body.error) {
        } else if (body.error) {
            callback('FC - Unnable to find location', undefined);
        } else {
            callback(undefined, {
                // data: response.body.current.weather_descriptions[0] + ' - Actualmente hace ' + response.body.current.temperature + '°, hay una sensación de ' + response.body.current.feelslike + '°'
                data: body.current.weather_descriptions[0] + ' - Actualmente hace ' + body.current.temperature + '°, hay una sensación de ' + body.current.feelslike + '°'
            });
        }
    })
}

module.exports = forecast;