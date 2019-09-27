# Geocode Interface

## Demo
<a href="https://webdevctoms.github.io/geocodeInterface/" target="_blank">GeoCode Interface</a>
##Intro
The geocodeInterface.js file contains a class which will allow you to make requests to the google maps geocoding API by passing postal code, api key, and optionally country. The app.js file shows how the class/methods can be used.
##instructions
To use the class simple instantiate it eg) var geo = new GeoCodeInterface();

The class does not take any arguments when creating the instance, potentially in the future could add in arguments and add properties if it makes sense. Once instantiated you can call the .getGeoData() method to make the request to the geocoding API. This method takes in postal code, api key, and optionally country. The country is only necessary if you want to have a more refined search. For example if you pass a european postal code it will likely return a US location. If you pass the country with the european postal code and country it will find the correct european location. This method will return a promise, so to interact with the data follow the .then structure that is seen in the examples. For more info on <a href="https://developers.google.com/web/fundamentals/primers/promises" target="_blank">promises</a>.

In the example the method is handled by a keyup event and a button click event. It is up to you how you want to handle calling this method. What is important is that when calling the method the correct paramaters are passed.

From there you can handle the results yourself or you can use the second method .getAddressData. This method takes in the address_components array from the geolocation data and a location type. The location type is a string and can be city,state,province, or country. The method will return a object that contains the google short name and long name for the specified location type. One note is that this expects only the address_components of the correct result. In most cases this will be the first returned result. If it is not this is where the country and postal code can be used together to narrow down the results

Using this last method is optional but will make parsing the results easier. 
