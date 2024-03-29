# Geocode Interface

## Demo
https://webdevctoms.github.io/geocodeInterface/

## Intro
The geocodeInterface.js file contains a class which will allow you to make requests to the google maps geocoding API by passing the postal code, api key, and optionally country. The app.js file shows how the class/methods can be used.

## Quick Start

```javascript
	//init class
	var geo = new GeoCodeInterface();
	//your variables
	var postalCode = 'Your postal code';
	var apiKey = 'Your API Key';
	var country = 'optionally pass a country'
	//returns a promise
	geo.getGeoData(postalCode,apiKey,country)
	//do things with the data
	.then((data) => {
		var address_components = data.results[0].address_components;
		var cityNameObject = geo.getAddressData(address_components,'city');
	})

	.catch((err) => {
		//handle errors
	})
```

## Instructions
To use the class instantiate it eg) var geo = new GeoCodeInterface();

The class does not take any arguments when creating the instance, potentially in the future could add in arguments and add properties if it makes sense. Once instantiated you can call the .getGeoData() method to make the request to the geocoding API. This method takes in the postal code, api key, and optionally country. The country is only necessary if you want to have a more refined search. For example if you pass a European postal code it will likely return a US location. If you pass the country with the European postal code and country it will find the correct European location. This method will return a promise, so to interact with the data follow the .then structure that is seen in the examples. For more info on <a href="https://developers.google.com/web/fundamentals/primers/promises" target="_blank">promises</a>.

In the example the method is handled by a keyup event and a button click event. It is up to you how you want to handle calling this method. What is important is that when calling the method the correct parameters are passed.

From there you can handle the results yourself or you can use the second method .getAddressData. This method takes in the address_components array from the geolocation data and a location type. The location type is a string and can be city,state,province, or country. The method will return a object that contains the google short name and long name for the specified location type. One note is that this method expects only the address_components of the correct result. In most cases this will be the first returned result. If it is not this is where the country and postal code can be used together to narrow down the results

Using this last method is optional but will make parsing the results easier.

How you store and pass the API key is up to you. The only reason I have it as a field here is so that I do not need to share my API key on the github repo.

to use this class in your code just copy the contents of the geocodeInterface.js file or copy it save it and include the file in your project.