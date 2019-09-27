function App(options){
	this.apiKeyInput = document.getElementById(options.apiKeyId);
	this.postCodeInput = document.getElementById(options.postCodeId);
	this.countryInput = document.getElementById(options.countryId);
	this.countryShortInput = document.getElementById(options.countryShortId);
	this.stateInput = document.getElementById(options.stateId);
	this.stateShortInput = document.getElementById(options.stateShortId);
	this.cityInput = document.getElementById(options.cityId);
	//pass in the callback you want called when using the getGeoData method
	this.geo = new GeoCodeInterface({
		callback:this.updateInputs
	});
	//this method is not necessary it just allwos you to easily attach the keyboard listener that I am using to any input you want
	this.initPostalListener(this.postCodeInput);
	this.initKeyBoardListener(this.apiKeyInput);
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
		var apiKey = this.apiKeyInput.value
		this.timeout = setTimeout(function(){ 
			this.geo.getGeoData(postalCode,apiKey,this.updateInputs)

			.then((data) => {
				this.updateInputs(data);
			});
		}.bind(this), 3000);
	}.bind(this),false);
};

App.prototype.updateInputs = function(data) {
	console.log('data:',data,this.cityInput);
	//get the address components from the results
	var address_components = data.results[0].address_components;
	//get the city from the results
	var cityNameObject = this.geo.getAddressData(address_components,'city');
	//set the address name to your input of choice
	this.cityInput.value = cityNameObject.long_name;
	//get the 
};

var app = new App({
	apiKeyId:'api-key',
	postCodeId:'postal-code',
	countryId:'country',
	countryShortId:'country-short',
	stateId:'state',
	stateShortId:'state-short',
	cityId:'city'
});