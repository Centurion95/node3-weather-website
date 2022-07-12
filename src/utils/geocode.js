const request = require("postman-request");


const geocode_from_utils = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1Ijoic29uaXNoZWUiLCJhIjoiY2twdmQyM2FzMDJwMTJvdGNrZ3J1ZTVibSJ9.6pJgk6uATI9j91o2mOjaPg&limit=1';
    console.log(url);

    // request({ url: url, json: true }, (error, response) => {
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unnable to connect to weather service', undefined);
            // } else if (response.body.error) {
        } else if (body.error) {
            callback('Unnable to find location', undefined);
        } else {
            // const { features } = response.body.features; //destructuring

            callback(undefined, {
                // latitude: response.body.features[0].center[0],
                // longitude: response.body.features[0].center[1],

                // latitude: response.body.features[0].center[1],
                // longitude: response.body.features[0].center[0],
                // location: response.body.features[0].place_name

                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    })
}

module.exports = geocode_from_utils;