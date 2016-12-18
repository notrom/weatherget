'use strict';

// Load the default config from file
var defaults = require("./config.js");

// Define the weather source to use
var WeatherSource = require("./wrapOpenWeatherMap.js");

// Use the default settings as a starting point
var ws = new WeatherSource(defaults);

try {
    // Get the temperature from the source and display it
    ws.getTemperature(function (resp) {
        console.log(resp);
    });
} catch (e) {
    errorDisplay("Error collecting the temperature.", err);
}


/**
 * catch anything that's not otherwise caught
 */
process.on('uncaughtException', function (err) {
    errorDisplay("Error collecting the temperature.", err);
}); 

function errorDisplay(message ,err) {
    console.log("Error collecting the temperature.");
    console.log(err);
}
