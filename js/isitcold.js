(function(window, $, undefined) {
	var app = window.Kinner || (window.Kinner = {});
	var $window = $(window);

	var currentWeather = {};
	var forecastWeather = {};
	var city = "";
	var country = "";
	var isCurrent = true;
	var isCelsius = true;
	var startPath = "";
	var condition = "";
	var celsius = 0;
	var temperature = "";
	var description = "";
	var iconText = "";
	var iconX = 0;
	var iconY = 0;
	var longitude = 0;
	var latitude = 0;
	var tempLine = "";
	var shareMessage = "";
	var shareIcon = "";
	var currentCol = {r:128, g:128, b:128};
	var targetCol = {r:0, g:0, b:0};

	var autorun = function() {
		console.log("autorun running()");

		console.log("IS IT COLD: " + IsItCold.country);
		console.log(IsItCold.city);

		if (IsItCold.country != "null" && IsItCold.city != "null") {
			city = IsItCold.city.toString();
			country = IsItCold.country.toString();
			getWeather();
		} else {
			getGeo();
		}
	};

	var getGeo = function() {
		$.ajax({
			url: "http://www.geoplugin.net/json.gp?jsoncallback=?",
			crossDomain: true,
			dataType: "jsonp",
			data: {},
			success: function( data ) {
				geoComplete(data.geoplugin_city, data.geoplugin_countryName);
			}
		});
	};

	var geoComplete = function(parcity, parname) {
		console.log("geoComplete(" + parcity + " - " + parname + ") och " + startPath);
		city = parcity;
		country = parname;

		// if (startPath) {
		// 	console.log("startPath found");
		// 	city = startPath.split(",")[0];
		// 	country = startPath.split(",")[1];

		// 	getWeather();

		if (city && country) {
			city = encodeURIComponent(city);
			country = encodeURIComponent(country);
			country = country;
			city = city;
			getWeather();

		} else {
			console.log("fail geoComplete");

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(function (position) {  
						for (key in position.coords) {console.log(key + " -> " + position.coords[key]);}
						geoDone(position.coords.longitude, position.coords.latitude);
					}, 
					// next function is the error callback
					function (error) {
						switch(error.code) {
							case error.TIMEOUT:
								alert ('Timeout');
								break;
							case error.POSITION_UNAVAILABLE:
								alert ('Position unavailable');
								break;
							case error.PERMISSION_DENIED:
								alert ('Permission denied');
								break;
							case error.UNKNOWN_ERROR:
								alert ('Unknown error');
								break;
						}
					}
				);
			}
		}
	};

	var getWeather = function() {
		console.log("getWeather() " + city + ", " + country);
		var weatherURL = "/ba-simple-proxy.php?url=http://www.google.com/ig/api?weather=" + city + "," + country;
		console.log("VÄDER: " + weatherURL);
		var self = this;
		$.ajax({
			url: weatherURL,
			crossDomain: true,
			dataType: "xml",
			data: {},
			success: $.proxy(function( data ) {
				weatherComplete(data);
			}, this),
			error: function(jqXHR, textStatus, errorThrown) {
				console.log("ERROR");
				console.log(jqXHR);
				console.log(textStatus);
				console.log(errorThrown);
			}
		});
	};

	var weatherComplete = function(data) {
		console.log("weatherComplete()");
		console.log(data);
		var node;
		var node2;
		var currObj;
		var isForecast = true;
		for (var i = 0; i < data.firstChild.firstChild.childNodes.length; i++) {
			node = data.firstChild.firstChild.childNodes[i];
			if (node.nodeName.toString() == "current_conditions") {
				currObj = {};
				for (var j = 0; j < node.childNodes.length; j++) {
					node2 = node.childNodes[j];
					if (node2.nodeName.toString() == "condition") {
						currObj.condition = node2.attributes.data.nodeValue;
					} else if (node2.nodeName.toString() == "temp_f") {
						currObj.fahrenheit = parseInt(node2.attributes.data.nodeValue,10);
					} else if (node2.nodeName.toString() == "temp_c") {
						currObj.celsius = parseInt(node2.attributes.data.nodeValue,10);
					}
				}
				currentWeather = currObj;
			} else if (node.nodeName.toString() == "forecast_conditions" && isForecast) {
				isForecast = false;
				currObj = {};
				for (var j = 0; j < node.childNodes.length; j++) {
					node2 = node.childNodes[j];
					if (node2.nodeName.toString() == "condition") {
						currObj.condition = node2.attributes.data.nodeValue;
					} else if (node2.nodeName.toString() == "low") {
						currObj.lowF = parseInt(node2.attributes.data.nodeValue,10);
					} else if (node2.nodeName.toString() == "high") {
						currObj.highF = parseInt(node2.attributes.data.nodeValue,10);
					}
				}
				currObj.lowC = Math.round((5/9)*(currObj.lowF-32));
				currObj.highC = Math.round((5/9)*(currObj.highF-32));

				forecastWeather = currObj;
			}
		};

		var isCr = localStorage.getObject("iscurrent");
		var isCs = localStorage.getObject("iscelsius");

		if (isCr != null) {
			isCurrent = isCr;
		} else {
			localStorage.setObject("iscurrent", isCurrent);
		}

		if (isCs != null) {
			isCelsius = isCs;
		} else {
			localStorage.setObject("iscelsius", isCelsius);
		}

		if (IsItCold.country == "null" && IsItCold.city == "null") {
			var stateData = {};
			var stateTitle = "Hello";
			var stateURL = country + "/" + city;
			window.history.replaceState(stateData, stateTitle, stateURL);
		}

		setDescriptions();
		render();
	};

	var setDescriptions = function() {
		console.log("setDescriptions()");
		var currObj;
		if (isCurrent) {
			currObj = currentWeather;
			if (isCelsius)  {
				temperature = "<span id='tempswitch'>" + currObj.celsius + "&deg;C</span> " + currObj.condition;
				shareMessage = "Current weather in " + city + ", " + country + " is " + currObj.celsius + "&deg;C and " + currObj.condition.toLowerCase() + ".";
			} else {
				temperature = "<span id='tempswitch'>" + currObj.fahrenheit + "&deg;F</span> " + currObj.condition;
				shareMessage = "Current weather in " + city + ", " + country + " is " + currObj.fahrenheit + "&deg;F and " + currObj.condition.toLowerCase() + ".";
			}
			description = "<span id='dayswitch'>Current weather in " + city + ", " + country + ".</span>";
			condition = currObj.condition;
			celsius = currObj.celsius;
		} else {
			currObj = forecastWeather;
			if (isCelsius)  {
				temperature = "<span id='tempswitch'>" + currObj.lowC + "-" + currObj.highC + "&deg;C</span> " + currObj.condition;
				shareMessage = "Todays forecast for " + city + ", " + country + " is " + currObj.lowC + "-" + currObj.highC + "&deg;C and " + currObj.condition.toLowerCase() + ".";
			} else {
				temperature = "<span id='tempswitch'>" + currObj.lowF + "-" + currObj.highF + "&deg;F</span> " + currObj.condition;
				shareMessage = "Todays forecast for " + city + ", " + country + " is " + currObj.lowF + "-" + currObj.highF + "&deg;C and " + currObj.condition.toLowerCase() + ".";
			}
			description = "<span id='dayswitch'>Todays forecast for " + city + ", " + country + ".</span>";
			
			condition = currObj.condition;
			celsius = (currObj.lowC + currObj.highC) / 2;
		}

		getIcon();
	};

	var getIcon = function() {
		var icons = [{condition:"Partly Sunny", share:"1.png", icon:"1", x:86, y:40},
			{condition:"Scattered Thunderstorms", share:"x.png", icon:"x", x:86, y:40},
			{condition:"Showers", share:"e.png", icon:"e", x:86, y:-40},
			{condition:"Rain Showers", share:"e.png", icon:"e", x:86, y:-40},
			{condition:"Scattered Showers", share:"r.png", icon:"r", x:86, y:20},
			{condition:"Rain and Snow", share:"y.png", icon:"y", x:86, y:-50},
			{condition:"Overcast", share:"over.png", icon:"`", x:86, y:-30},
			{condition:"Light Snow", share:"o.png", icon:"o", x:86, y:-24},
			{condition:"Freezing Drizzle", share:"6.png", icon:"6", x:86, y:-24},
			{condition:"Chance of Rain", share:"chance.png", icon:"=", x:86, y:-14},
			{condition:"Sunny", share:"v.png", icon:"v", x:68, y:8},
			{condition:"Clear", share:"v.png", icon:"v", x:68, y:8},
			{condition:"Mostly Sunny", share:"1.png", icon:"1", x:86, y:44},
			{condition:"Partly Cloudy", share:"1.png", icon:"1", x:86, y:44},
			{condition:"Mostly Cloudy", share:"over.png", icon:"`", x:86, y:6},
			{condition:"Chance of Storm", share:"chancestorm.png", icon:";", x:41, y:5},
			{condition:"Rain", share:"3.png", icon:"3", x:86, y:-53},
			{condition:"Chance of Snow", share:"chancesnow.png", icon:"\\", x:86, y:30},
			{condition:"Cloudy", share:"over.png", icon:"`", x:86, y:6},
			{condition:"Mist", share:"g.png", icon:"g", x:86, y:6},
			{condition:"Storm", share:"l.png", icon:"l", x:40, y:-56},
			{condition:"Thunderstorm", share:"z.png", icon:"z", x:86, y:-20},
			{condition:"Chance of TStorm", share:"x.png", icon:"x", x:86, y:20},
			{condition:"Sleet", share:"6.png", icon:"6", x:86, y:-30},
			{condition:"Snow", share:"snow.png", icon:"*", x:75, y:9},
			{condition:"Icy", share:"snow.png", icon:"*", x:75, y:9},
			{condition:"Dust", share:"h.png", icon:"h", x:86, y:50},
			{condition:"Fog", share:"g.png", icon:"g", x:86, y:4},
			{condition:"Smoke", share:"s.png", icon:"s", x:86, y:-44},
			{condition:"Haze", share:"h.png", icon:"h", x:86, y:44},
			{condition:"Flurries", share:"q.png", icon:"q", x:86, y:32},
			{condition:"Light rain", share:"6.png", icon:"6", x:86, y:-20},
			{condition:"Snow Showers", share:"y.png", icon:"y", x:88, y:-62},
			{condition:"Hail", share:"snow.png", icon:"*", x:75, y:9}];

		var i = arrayIndexOf(icons, function(obj) {
			return obj.condition.toLowerCase() == condition.toLowerCase();
		});
		
		if (-1 != i) {
			iconText = icons[i].icon;
			iconX = icons[i].x;
			iconY = icons[i].y;
			shareIcon = icons[i].share;
		} else {
			console.log("!!!!! CONDITION NOT FOUND: " + condition);
		}
	};

	var render = function() {
    	renderSmall();
    	getColor();
    	fadeIn();
	};

	var renderSmall = function() {
		console.log("renderSmall()");
		$("#iconholder").css("margin-left", iconX);
		$("#iconholder").css("margin-top", iconY);

		$("#headline").html(temperature);
		$("#infotext").html(description);
		$("#iconholder").html(iconText);

		//var tweetText = "Testar lite.";
		//var shareString = "Share this:<br><a href='https://twitter.com/share' data-url='" + window.location.href + "' class='twitter-share-button' data-text='" + shareMessage + "' data-count='none' data-hashtags='isitcold'>Tweet</a><script type='text/javascript' src='//platform.twitter.com/widgets.js'></script>";

		// <p class="sharers">Tweet this:<br><a href="https://twitter.com/share" data-url="' + urlString + '" class="twitter-share-button" data-text="' + tweetText + '" data-count="none" data-hashtags="isitold">Tweet</a><script type="text/javascript" src="//platform.twitter.com/widgets.js"></script></p>
		// https://www.facebook.com/sharer/sharer.php?u=http://dread.se&t=Is%20It%20Cold?

		//$("#sharetext").html(shareString);

		$('#tempswitch').bind('click', {}, switchTemp);

		$('#faceshare').bind('click', {site:"facebook"}, sharePage);
		$('#twittershare').bind('click', {site:"twitter"}, sharePage);
	};

	var sharePage = function(event) {
		var shareName = "Is It Cold?";
		var sharer = event.data.site;
		var shareURL = encodeURIComponent(getShareUrl());
		var shareTitle = shareMessage;
		var shareImage = window.location.protocol + '//' + window.location.host + '/img/icons/' + shareIcon;
		console.log("sharePage() " + sharer);

		if (sharer == "facebook") {
			var fName = encodeURIComponent(shareName);
			var fCaption = encodeURIComponent(shareName);
			var fDescription = encodeURIComponent(shareTitle);
			//window.open("https://www.facebook.com/sharer/sharer.php?u=" + shareURL + "&t=" + shareTitle,"_blank");
			var facebookShare = "https://www.facebook.com/dialog/feed?app_id=427587953959665&link=" + shareURL + "&picture=" + shareImage + "&name=" + fName + "&caption=" + fCaption + "&description=" + fDescription + "&redirect_uri=http://www.isitcold.com";
	
			window.open(facebookShare, "_blank");
		} else if (sharer == "twitter") {
			var shareLeft = (screen.width/2)-280;
			var shareTop = (screen.height/2)-140;
			window.open('http://twitter.com/share?url=' + encodeURIComponent(shareURL) + '&text=' + encodeURIComponent(shareTitle),"Facebook Share", "left=" + shareLeft + ",top=" + shareTop + ",width=560,height=280,scrollbars=no");
		} else if (sharer == "pinterest") {
			window.open('http://pinterest.com/pin/create/button/?url=' + shareURL + '&media=' + shareImage + '&description=' + shareTitle,"_blank");
		}
	};

	var switchDay = function() {
		console.log("switchDay()");
		isCurrent = !isCurrent;
		iscurrent = !isCurrent;
		setDescriptions();
		renderSmall();
	};

	var switchTemp = function() {
		console.log("switchTemp()");
		isCelsius = !isCelsius;
		iscelsius = !isCelsius;
		setDescriptions();
		renderSmall();
	};

	var fadeIn = function() {
		//console.log("fadeIn() " + this.targetCol.r);
		var tweenTime = 1;
		TweenLite.to(currentCol, 4, {r:targetCol.r, g:targetCol.g, b:targetCol.b, onUpdate:colorUpdate});
		TweenLite.to($("#starttext"), 1.5, {css:{autoAlpha:0, top:-40}, ease:Power2.easeOut});
		TweenLite.to($("#headline"), 1.5, {css:{opacity:1, top:0}, ease:Power2.easeOut});
		TweenLite.to($("#icontext"), 8, {css:{opacity:0.15, scaleX:1.2, scaleY:1.2}, ease:Power1.easeOut});
		TweenLite.to($("#infotext"), 2, {css:{opacity:1}, delay:0.6, ease:Power2.easeOut});
		TweenLite.to($("#sharetext"), 2, {css:{opacity:1}, delay:0.9, ease:Power2.easeOut});
	};

	var colorUpdate = function() {
		//console.log("colorUpdate() to " + currentCol.r +"," + currentCol.g + "," + currentCol.b);
		$("body").css("backgroundColor", "rgb(" + Math.floor(currentCol.r) +"," + Math.floor(currentCol.g) + "," + Math.floor(currentCol.b) + ")");
	};

	var getColor = function() {
		console.log("getColor()");
		var colors = ["#2b3064","#2b3086", "#34459c","3b55a6","3e5faa","4068b2",
		"498fcd","35c5f3","6fccdd","76c9b2","8aca87",
		"a8d058","cbdb2b","f6eb14","ffcd05","f8981d",
		"f26622","ef3b24","ed2024","c92027","971b1e"];

		var colRed = [43,43,52,59,62,64,73,53,111,118,138,168,203,246,255,248,242,239,237,201];
		var colGreen = [48,48,69,85,95,104,143,197,204,201,202,208,219,235,205,152,102,59,32,32];
		var colBlue = [100,134,156,166,170,178,205,243,221,178,135,88,43,20,5,29,34,36,36,39];

		if (celsius != 0 || fahrenheit != 0) {
			var colVal = Math.round((Math.min(30, Math.max(-30, celsius)) + 30) / 3);
			targetCol = {r:colRed[colVal], g:colGreen[colVal], b:colBlue[colVal]};
		}
	};

	var getSharePath = function() {
		var l = window.location;
		var path;

		if (l.hash && l.hash.match(/#?\//)) {
			path = l.hash.replace('#', '');
		} else {
			path = l.pathname;
		}

		return path;
	};

	var getShareUrl = function() {
		var l = window.location;
		var url = l.protocol + '//' + l.host;

		url += getSharePath();

		return url;
	};

	var arrayIndexOf = function(a, fnc) {
		if (!fnc || typeof (fnc) != 'function') {
			return -1;
		}
		if (!a || !a.length || a.length < 1) return -1;
			for (var i = 0; i < a.length; i++) {
			if (fnc(a[i])) return i;
		}
		return -1;
	};

	Storage.prototype.setObject = function(key, value) {
		this.setItem(key, JSON.stringify(value));
	};

	Storage.prototype.getObject = function(key) {
		var value = this.getItem(key);
		return value && JSON.parse(value);
	};

	// On DOM ready
	$(autorun);

})(this, jQuery);
