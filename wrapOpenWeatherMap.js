
var http = require('http');

var config = {};

// Basic http get request
function getHttpResponse (host, path, callback) {
    if (config.log === "debug") {
        console.log (host+path);
    }
    return http.get({
            host: host,
            path: path
        }, function(response) {
            var body = '';
            response.on('data', function(d) {
                // Append data chunk
                body += d;
            });
            response.on('end', function() {
                // Data completed, callback
                callback(body);
            });
        });
}

/*
** Figure out which location to use.
** Order of precedence is: 
**  1 - lon and lat
**  2 - id
**  3 - city
** If none are provided in th config null is returned.
*/
function locationUrlParam() {
    if (config.location.lon && config.location.lat) {
        return "&lat="+config.location.lat+"&lon="+config.location.lon;
    } else if (config.location.id) {
        return "id="+config.location.id;
    } else if (config.location.city) {
        return "q=" + config.location.city;
    } else {
        return null;
    }
}

/*
** Object constructor
** opts: configuration object. See config.js for required structure.
*/
function wrapOpenWeatherMap(opts) {
   config = opts;
}
module.exports = wrapOpenWeatherMap;

/*
**  getTemperature
**  callback: Function to be called on success, the callback's parameter is number 
**              representing the current temperature.
*/
wrapOpenWeatherMap.prototype.getTemperature = function(callback) {
    var urlParams = "APPID="+config.api.app_key;
        urlParams += "&" + locationUrlParam();
        if (config.options.units) {
            urlParams += "&units=" + config.options.units;
        }
        try {
            getHttpResponse(config.api.host,
                        config.api.path+"?"+urlParams,
                        function (resp) {
                            if (resp) {
                                try {
                                    var parsed = JSON.parse(resp);
                                    if (parsed.main.temp) {
                                        callback(parsed.main.temp);    
                                    } else {
                                        throw "noValueException";
                                    }
                                } catch (error) {
                                    throw error;   
                                }
                            } else {
                                throw "noValueException";
                            }
                        });    
        } catch (error) {
            throw error;
        }
        
}
