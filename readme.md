# weatherget
A small console application to display the current temperature for a location.

Uses OpenWeatherMap API as the data source. Using a free API key explicitly (and publicly) defined in the `config.js` file. Feel free to change this to your own.

# ToDo

Among others ...

- More tests around the http request and response
- Validaton of location being entered
- Clearer error responses
- Sanity checks in configuration items
- Option to keep monioring the API, periodically update the value output


## Requirements
Node.js & npm

I've only tested it on under Windows but there's no reason why it shouldn't work well in other node environments.

## Installaton
Get the git repo.

In the repo root directory
```sh
npm install
```

## Run the tests
```sh
npm test
```

## Execute
```sh
# With only the default parameters
npm start
```
or
```sh
# to override the default parameters
node weatherget.js [options]
```

## Command Line options
```sh
$ node weatherget.js --help

  Usage: weatherget [options]

  Options:

    -h, --help      output usage information
    --city <city>   City name
    --id <id>       Location ID
    --lon <n>       Location longitude (used on conjunction with --lat)
    --lat <n>       Location latitude (used on conjunction with --lon)
    --key <apikey>  Temperature API applicaton key
    --units <C|F>   Temperature display units (C|F)
```

## Examples
```sh
# temperatre in Wellington in C
$ node weatherget.js --city wellington --units C
17 C

# temperature in New York in F
$ node weatherget.js --city "New York" --units F
27.14 F

# temperature at a know lon,lat (in this case Invercargill)
$ node weatherget.js --lon 168.35 --lat -46.4
11.06 C

```

## Configuration
Default configuration is contained in the `config.js` file in the projects root directory.

Refer there for the available configurations.

## Additional shell script

Also provided is a short bash script that uses curl to perform the same API query.

To run that just execute
```sh
# ensure the script is executable
chmod +x weatherget.sh
./weatherget.sh
```

