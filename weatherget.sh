#!/bin/bash

# URL components
API_URL="http://api.openweathermap.org/data/2.5/weather"
APP_KEY="a7e15dfd2aaf344417071ee5a367be70"
LON="168.35"
LAT="-46.4"
OPTS="units=metric"

QUERY_URL=$API_URL"?APPID="$APP_KEY"&lat="$LAT"&lon="$LON"&"$OPTS

# curl the API
API_RESP=$(curl -s -S $QUERY_URL)

# Check for curl error
if [ $? -gt 0 ]
then
    echo "Error calling curl"
    exit
fi

# Check for API error or non success response
API_RESP_CODE=$(echo $API_RESP | awk -F"(\"cod\":)" '{print $2}' | awk -F"[}]" '{print $1}')
if [ "$API_RESP_CODE" != "200" ]
then
    echo "The API did not respond as expected. The response is below."
    echo $API_RESP
    exit
fi

# Extract and print the temperature
CURR_TEMP=$(echo $API_RESP | awk -F"(\"temp\":)" '{print $2}' | awk -F"[,]" '{print $1}')

# Display the temperature value as C
echo $CURR_TEMP "C"