function App(options){
	this.apiKeyInput = document.getElementById(options.apiKeyId);
	this.postCodeInput = document.getElementById(options.postCodeId);
	this.countryInput = document.getElementById(options.countryId);
	this.countryShortInput = document.getElementById(options.countryShortId);
	this.stateInput = document.getElementById(options.stateId);
	this.stateShortInput = document.getElementById(options.stateShortId);
	this.cityInput = document.getElementById(options.cityId);
	this.geo = new GeoCodeInterface({
		callback:this.updateInputs
	});

	this.geo.initKeyBoardListener(this.postCodeInput);
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

App.prototype.updateInputs = function(data) {
	console.log('data:',data);
};

let app = new App({
	apiKeyId:'api-key',
	postCodeId:'postal-code',
	countryId:'country',
	countryShortId:'country-short',
	stateId:'state',
	stateShortId:'state-short',
	cityId:'city'
});