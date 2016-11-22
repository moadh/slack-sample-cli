var request = require('request'),
	util 	= require('../util');

module.exports = function (param) {
	var	channel		= param.channel,
		endpoint	= param.commandConfig.endpoint;
		
	

	var _setLocation = function (url) {
		var endpoint = url;


		param.args.forEach(argument =>
		{

			if (argument.toLowerCase().indexOf("paris") !== -1) 
			{
				endpoint = url.replace('{CityCountry}', "Paris,France");
			}

			if (argument.toLowerCase().indexOf("tunis") !== -1) 
			{
				endpoint = url.replace('{CityCountry}', "Tunis,Tunisia");
			}

			if (argument.toLowerCase().indexOf("puteau") !== -1) 
			{
				endpoint = url.replace('{CityCountry}', "Puteaux,France");
			}

			if (argument.toLowerCase().indexOf("saint augustine") !== -1 || argument.toLowerCase().indexOf("florid") !== -1) 
			{
				endpoint = url.replace('{CityCountry}', "Saint Augustine,FL");
			}
			
			
		})
		return endpoint
	};

	var _getRandomDunno = function () {
		var dunnos		= Array("dunno!", "no idea!", "no fucking idea!", "Sorry, we are missing these data!", "wtf !!!!!", "euhhhhh!")
		return dunnos[Math.floor(Math.random()*dunnos.length)]
	};
	
	endpoint	= _setLocation(param.commandConfig.endpoint);
	
	if (endpoint.indexOf('{CityCountry}') === -1) {
		request(endpoint, function (err, response, body) {
			var info = [];

			if (!err && response.statusCode === 200) {
				body = JSON.parse(body);

				info.push('Location: ' + body.location);
				info.push(body.description + " " + body.condition);
			}
			else {
				info.push(_getRandomDunno()); // arbitrary dunno!
			}

			util.postMessage(channel, info.join('\n'));
		});
	}
	else {
		util.postMessage(channel, _getRandomDunno());// arbitrary dunno!
	}

};