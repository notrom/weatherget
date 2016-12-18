
var http = require('http');

/**
 * Basic http get request and response handler. 
 */
function getHttpResponse (host, path, callback) {
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
** Object constructor
** opts: configuration object. See config.js for required structure.
*/
function wrapOpenWeatherMap(opts) {
   this.config = opts;
}
module.exports = wrapOpenWeatherMap;



/*
**  getTemperature
**  callback: Function to be called on success, the callback's parameter is number 
**              representing the current temperature.
*/
wrapOpenWeatherMap.prototype.getTemperature = function(callback) {
    var urlParams = "APPID="+this.config.api.app_key;
        urlParams += "&" + this.locationUrlParam();
        if (this.config.options.units) {
            urlParams += "&units=" + this.config.options.units;
        }
        try {
            if (this.config.log === "debug") {
                console.log (this.config.api.host + 
                             this.config.api.path+"?"+urlParams);
            }
            getHttpResponse(this.config.api.host,
                        this.config.api.path+"?"+urlParams,
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

/**
 * Figure out which location to use.
 * Order of precedence is: 
 *  1 - lon and lat
 *  2 - id
 *  3 - city
 * If none are provided in th config null is returned.
 */
wrapOpenWeatherMap.prototype.locationUrlParam = function () {
    if (this.config.location.lon && this.config.location.lat) {
        return "&lat="+this.config.location.lat+"&lon="+this.config.location.lon;
    } else if (this.config.location.id) {
        return "id="+this.config.location.id;
    } else if (this.config.location.city) {
        return "q=" + this.config.location.city;
    } else {
        return null;
    }
}