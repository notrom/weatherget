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
    /**
     * metric or imperial
     */
    options: {
        units: "metric"
    },
    /**
     * debug - some extra information is output
     * none - no extra info is logged
     */
    log: "none"
};