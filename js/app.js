function App(options){
	this.apiKeyInput = document.getElementById(options.apiKeyId);
	this.postCodeInput = document.getElementById(options.postCodeId);
	this.countryInput = document.getElementById(options.countryId);
	this.countryShortInput = document.getElementById(options.countryShortId);
	this.stateInput = document.getElementById(options.stateId);
	this.stateShortInput = document.getElementById(options.stateShortId);
	this.cityInput = document.getElementById(options.cityId);
	this.exampleButton = document.getElementById(options.exampleButtonId);
	//pass in the callback you want called when using the getGeoData method
	this.geo = new GeoCodeInterface();
	//this method is not necessary it just allwos you to easily attach the keyboard listener that I am using to any input you want
	this.initPostalListener(this.postCodeInput);
	this.initKeyBoardListener(this.apiKeyInput);
	this.initButton(this.exampleButton);
}

App.prototype.initKeyBoardListener = function(input) {
	input.addEventListener("keyup",function(e){
		var apiKey = e.currentTarget.value;
		this.geo.setAPIKey(apiKey);
	}.bind(this),false);

	input.addEventListener("change",function(e){
		var apiKey = e.currentTarget.value;
		this.geo.setAPIKey(apiKey);
	}.bind(this),false);
};
//Follow this structure to avoid issues with the scope of the 'this' variable
App.prototype.initPostalListener = function(input) {
	input.addEventListener("keyup",function(e){
		console.log(e.currentTarget.value);
		clearTimeout(this.timeout);
		var postalCode = e.currentTarget.value;
		var apiKey = this.apiKeyInput.value;
		var country = this.countryInput.value;
		this.timeout = setTimeout(function(){ 
			//country is optional
			//really only need country for international postal codes
			this.geo.getGeoData(postalCode,apiKey,country)

			.then((data) => {
				this.updateInputs(data);
			});
		}.bind(this), 3000);
	}.bind(this),false);
	/*
	this is optional this will call the event on unfocus it will mostly just catch
	someone pasting something in
	*/
	input.addEventListener("blur",function(e){
		console.log(e.currentTarget.value);
		clearTimeout(this.timeout);
		var postalCode = e.currentTarget.value;
		var apiKey = this.apiKeyInput.value
		var country = this.countryInput.value;
		this.timeout = setTimeout(function(){
			this.geo.getGeoData(postalCode,apiKey,country)

			.then((data) => {
				this.updateInputs(data);
			});
		}.bind(this), 3000);
	}.bind(this),false);
};

//example using a button
App.prototype.initButton = function(button){
	button.addEventListener("click",function(e){
		e.preventDefault();
		clearTimeout(this.timeout);
		var postalCode = this.postCodeInput.value;
		var apiKey = this.apiKeyInput.value
		var country = this.countryInput.value;
		this.geo.getGeoData(postalCode,apiKey,country)

		.then((data) => {
			this.updateInputs(data);
		});
	}.bind(this),false);
};

App.prototype.updateInputs = function(data) {
	console.log('data:',data,this.cityInput);
	//get the address components from the results
	var address_components = data.results[0].address_components;
	//get the city Object from the results
	//may need to be adjusted for international addreses
	var cityNameObject = this.geo.getAddressData(address_components,'city');
	//set the address name to your input of choice
	this.cityInput.value = cityNameObject.long_name;
	//get the state/province
	var stateObject = this.geo.getAddressData(address_components,'state');
	//set the state names 
	this.stateInput.value = stateObject.long_name;
	this.stateShortInput.value = stateObject.short_name;
	//get the country
	var countryObject = this.geo.getAddressData(address_components,'country');
	//set the state names 
	this.countryInput.value = countryObject.long_name;
	this.countryShortInput.value = countryObject.short_name;
};



var app = new App({
	apiKeyId:'api-key',
	postCodeId:'postal-code',
	countryId:'country',
	countryShortId:'country-short',
	stateId:'state',
	stateShortId:'state-short',
	cityId:'city',
	exampleButtonId:'example-button'
});