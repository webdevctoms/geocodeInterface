function GeoCodeInterface(options){
	this.timeout;
	if(options){
		this.apiKey = options.apiKey ? options.apiKey : undefined;
		this.callback = options.callback  ? options.callback : undefined
	}
	
	console.log(this.apiKey)
}

GeoCodeInterface.prototype.initKeyBoardListener = function(input) {
	input.addEventListener("keyup",function(e){
		console.log(e.currentTarget.value);
		clearTimeout(this.timeout);
		var postalCode = e.currentTarget.value;

		this.timeout = setTimeout(function(){ 
			this.getGeoData(postalCode,this.apiKey,this.callback);
		}.bind(this), 3000);
	}.bind(this),false);

};

GeoCodeInterface.prototype.getGeoData = function(postalCode,apiKey,callback) {
	//var promise = new Promise((resolve,reject) => {
		console.log('Getting data',postalCode);
		var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + postalCode + '&key=' + apiKey;
		var settings = {
			method:'GET',
			url:url
		}
		return $.ajax(settings);
	//});

	//return promise;
};

GeoCodeInterface.prototype.setAPIKey = function(apiKey) {
	console.log('setting data',apiKey);
	this.apiKey = apiKey;
};
/*
pass in the address_components data and what you want to find
types can be city,state,province, or country
All data will return a short and long name
*/
GeoCodeInterface.prototype.getAddressData = function(data,locationType) {
	let addressData = {};
	if(locationType === undefined){
		locationType = 'city';
	}
	locationType = locationType.toLowerCase();
	if(data === undefined || !Array.isArray(data)){
		console.log('Error: Please provide address data');
		return;
	}

	var typeMap = {
		'city':'locality',
		'province':'administrative_area_level_1',
		'state':'administrative_area_level_1',
		'country':'country'
	};

	var adjustedType = typeMap[locationType];

	for (var i = 0; i < data.length; i++) {
		if(data[i].types[0] === adjustedType){
			addressData.long_name = data[i].long_name;
			addressData.short_name = data[i].short_name;
		}
	}

	return addressData;
};