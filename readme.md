# weatherget
A small console application to display the current temperature for a location.

Uses OpenWeatherMap API as the data source. Using a free API key explicitly (and publicly) defined in the `config.js` file. Feel free to change this to your own.

# ToDo

Among others ...

- Command line parameters to override default configuration
- More tests around the http request and response
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
npm start
```
or
```sh
node weatherget.js
```

## Configuration
At this stage the configuration is contained in the `config.js` file in the projects root directory.

Refer there for the available configurations.

## Additional shell script

Also provided is a short bash script that uses curl to perform the same API query.

To run that just execute
```sh
# confirm the script is executable
chmod +x weatherget.sh
./weatherget.sh
```

