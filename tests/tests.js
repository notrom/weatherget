'use strict';

var assert = require("assert");
var defaultConfig = require("../config.js");
var WeatherSource = require("../wrapOpenWeatherMap.js");

describe('wrapOpenWeatherMap', function() {
    describe('wrapOpenWeatherMap()', function () {
        it('creates distinct objects', function () {
            var ws1 = new WeatherSource({val:1});
            var ws2 = new WeatherSource({val:2});
            assert.equal(ws1.getConfig().val, 1);
            assert.equal(ws2.getConfig().val, 2);
        });

    });
    describe('locationUrlParam()', function () {
        it('returns lon,lat over the others', function () {
            var ws = new WeatherSource({location: {lat:10, lon: 12, id: 14, city: "here"}});
            var location = ws.locationUrlParam();
            assert.equal(location, "lat=10&lon=12");
        });
        it('returns id over city', function () {
            var ws = new WeatherSource({location: {id: 14, city: "here"}});
            var location = ws.locationUrlParam();
            assert.equal(location, "id=14");
        });
        it('returns city when there are no other options', function () {
            var ws = new WeatherSource({location: {city: "here"}});
            var location = ws.locationUrlParam();
            assert.equal(location, "q=here");
        });
        it('returns null of not one of the predefined list', function () {
            var ws = new WeatherSource({location: {foo: "bar"}});
            var location = ws.locationUrlParam();
            assert.equal(location, null);
        });
    });
});

describe('config', function() {
    describe('require()', function () {
        it('returns config with app_key populated', function() {
            assert.notEqual(defaultConfig.api.app_key, null);
        });
        it('returns config with host populated', function() {
            assert.notEqual(defaultConfig.api.host, null);
        });
        it('returns config with path populated', function() {
            assert.notEqual(defaultConfig.api.path, null);
        });
        it('returns config with lon populated', function() {
            assert.notEqual(defaultConfig.location.lon, null);
        });
        it('returns config with lat populated', function() {
            assert.notEqual(defaultConfig.location.lat, null);
        });
        it('returns config with units populated', function() {
            assert.notEqual(defaultConfig.options.units, null);
        });
        it('returns config with log populated', function() {
            assert.notEqual(defaultConfig.log, null);
        });
    });
});
