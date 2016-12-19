'use strict';

// For parsing command line args
var argParser = require('commander');

// Load the default config from file
var config = require("./config.js");
// Define the weather source to use
var WeatherSource = require("./wrapOpenWeatherMap.js");

// Command line args
argParser
    .option('--city <city>', 'City name')
    .option('--id <id>', 'Location ID')
    .option('--lon <n>', 'Location longitude (used on conjunction with --lat)')
    .option('--lat <n>', 'Location latitude (used on conjunction with --lon)')
    .option('--key <apikey>', 'Temperature API applicaton key')
    .option('--units <C|F>', 'Temperature display units (C|F)')
    .parse(process.argv);


// Update the config with values from the command line args
config = commandLineConfigs(config, argParser);

// Use the default settings as a starting point
var ws = new WeatherSource(config);

try {
    // Get the temperature from the source and display it
    ws.getTemperature(function (resp) {
        // unit for display
        var unit = config.options.units === "metric" ? "C" : "F";
        console.log("" + resp + " " + unit);
    });
} catch (err) {
    errorDisplay("Error collecting the temperature.", err);
}

/**
 * catch anything that's not otherwise caught
 */
process.on('uncaughtException', function (err) {
    errorDisplay("Error collecting the temperature.", err);
}); 

/**
 * commandLineConfigs
 * Sets up the config object with the command line parameters
 */
function commandLineConfigs (config, argParser) {
    // any location type overrides any default value, leave it to the API wrapper to figure out which to use
    if (argParser.city || argParser.lon || argParser.lat || argParser.id) {
        config.location = {city: argParser.city,
                           lon: argParser.lon,
                           lat: argParser.lat,
                           id: argParser.id};
    }
    // Override API key
    if (argParser.key) { config.api.app_key = argParser.key; }
    // Override the units
    if (argParser.units) {
        if (argParser.units === 'C') { config.options.units = "metric" } 
        if (argParser.units === 'F') { config.options.units = "imperial" } 
    }
    return config;
}

/**
 * Generic error display function
 */
function errorDisplay(message ,err) {
    console.log("Error collecting the temperature.");
    console.log(err);
    process.exit(1);
}
