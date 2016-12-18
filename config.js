module.exports = {
    api: {
        host: "api.openweathermap.org",
        path: "/data/2.5/weather",
        app_key: "a7e15dfd2aaf344417071ee5a367be70"
    },
    /*
    **  Order of precedence is: 
    **  1 - lon, lat
    **  2 - id
    **  3 - city
    */
    location: {
        lon: 168.35,
        lat: -46.4
    },
    options: {
        units: "metric"
    },
    log: "debug"
};