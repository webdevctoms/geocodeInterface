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
	console.log('Getting data',postalCode);
	var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + postalCode + '&key=' + apiKey;
	var settings = {
		method:'GET',
		url:url,
		success:function(data){
			callback(data);
		}
	}
	$.ajax(settings);

};

GeoCodeInterface.prototype.setAPIKey = function(apiKey) {
	console.log('setting data',apiKey);
	this.apiKey = apiKey;
};