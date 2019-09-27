# Geocode Interface

## Demo
<a href="https://webdevctoms.github.io/geocodeInterface/" target="_blank">GeoCode Interface</a>
##Intro
The geocodeInterface.js file contains a class which will allow you to make requests to the google maps geocoding API by passing postal code, api key, and optionally country. The app.js file shows how the class/methods can be used.
##instructions
To use the class simple instantiate it eg) var geo = new GeoCodeInterface();

The class does not take any arguments when creating the instance, potentially in the future could add in arguments and add properties if it makes sense. Once instantiated you can call the .getGeoData() method to make the request to the geocoding API. This method takes in postal code, api key, and optionally country. The country is only necessary if you want to have a more refined search. For example if you pass a european postal code it will likely return a US location. If you pass the country with the european postal code and country it will find the correct european location. This method will return a promise, so to interact with the data follow the .then structure that is seen in the examples. For more info on <a href="https://developers.google.com/web/fundamentals/primers/promises" target="_blank">promises</a> 

