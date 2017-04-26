var people = [  {name:"John Doe1", address: "Miami 87" , phonenumber: 088861235, city: "Stockholm" , lat: 59.326, lng: 18.070 },
                {name:"John Doe2", address: "Miami 87" , phonenumber: 08886123, city: "Gothenburg",  lat: 57.706268, lng: 11.973600 },
                {name:"John Doe3", address: "Miami 87" , phonenumber: 08886123, city: "Uppsala",  lat: 59.856913, lng: 17.639531 },
                {name:"John Doe4", address: "Miami 87" , phonenumber: 08886123, city: "Lund",  lat: 55.702139, lng: 13.189411 },
                {name:"John Doe5", address: "Miami 87" , phonenumber: 08886123, city: "Halmstad",  lat: 56.672453, lng: 12.858248 }];

var randomId = Math.floor(Math.random() * 5);
var cityStr  = people[randomId].city;

iconTable = {
			"01d" : "wi-day-sunny",
			"02d" : "wi-day-cloudy",
			"03d" : "wi-cloudy",
			"04d" : "wi-cloudy-windy",
			"09d" : "wi-showers",
			"10d" : "wi-rain",
			"11d": "wi-thunderstorm",
			"13d": "wi-snow",
			"50d": "wi-fog",
			"01n": "wi-night-clear",
			"02n": "wi-night-cloudy",
			"03n": "wi-night-cloudy",
			"04n": "wi-night-cloudy",
			"09n": "wi-night-showers",
			"10n": "wi-night-rain",
			"11n": "wi-night-thunderstorm",
			"13n": "wi-night-snow",
			"50n": "wi-night-alt-cloudy-windy"
};

var purchase = [ {name:"Sofa", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Wardrobe", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Lamp", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Desk", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Chair", description: "Warm and Soft Sofa" , date: "03/23/2015" }];


$( document ).ready(function() {
    //CUSTOMER INFO
    $("#customerinfo").html("Customer Name : " + people[randomId].name + 
                            " </br> Customer Address : " + people[randomId].address + 
                            " </br> Phone Number : " + people[randomId].phonenumber +
                            " </br> City : " + people[randomId].city);
    //ITEMS
    $("#items").empty();
    $.each( purchase, function( index, value ) {
         $("#items").append("item name : " + value.name + 
                            " </br> Description: " + value.description + 
                            " </br>  Purchased on : " + value.date + " </br> ");  
    });       

    //NEWS
    getNyTimesNewsData();

    //MAP
    setupMap();
    
    //WEATHER 
    var weatherUrl="http://api.openweathermap.org/data/2.5/forecast";
    var weatherApiKey="a73fba391f014de23586c2a9ae96f692";

    getWeatherData(weatherUrl, cityStr,weatherApiKey);

});

function getNyTimesNewsData(){
    $("#news").empty();

    var title ="<h4> Recent news for "+ cityStr + " </h4>";
    $("#news").append(title);

    var nyTimesUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nyTimesUrl += '?' + $.param({
        'api-key': "8c6291b560ce44c383e49265a76bb35d",
        'q': cityStr
    });

     $.getJSON(nyTimesUrl, function (data){

        var docArticles = data.response.docs;
        var items = [];

        $.each( docArticles, function( key, val ) {
            items.push( '<li class=article> <a href =' + docArticles[key].web_url + '>' +  docArticles[key].headline.main + '</a><p>' + docArticles[key].snippet + '</p></li>' );
        });

        $( "<ul/>", {
           "id": "nytimes-articles",
           "class": "article-list",
           html: items.join( "" )
       }).appendTo("#news");

    }).fail(function() {
        $nytHeaderElem.text("New York times articles could not be loaded");
    });
}

function setupMap(){
    var locations = [
      ['IKEA Fastigheter AB', 56.069034, 12.763518, 4],
      ['IKEA Fyndvaruhus ', 56.540647, 14.176277, 5],
      ['IKEA Kungens Kurva', 59.262196, 17.997597, 3],
      ['IKEA Sverige', 59.833615, 17.693893, 2],
      ['IKEA Barkarby', 59.402960, 17.859629, 1]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: new google.maps.LatLng(people[randomId].lat, people[randomId].lng),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < locations.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i][1], locations[i][2]),
        map: map
      });

      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(locations[i][0]);
          infowindow.open(map, marker);
        }
      })(marker, i));
    }
}

function getWeatherData(url,cityStr,weatherApiKey){
	var request=$.ajax({
		url:url,
		dataType:"jsonp",
		data:{q:cityStr,appid:weatherApiKey,units:"metric"},
		jsonpCallback:"fetchWeatherData",
		type:"GET"
	}).fail(function(error){
		console.error(error);
		alert("Error sending Weather request")})
}

function fetchWeatherData(forecast){
    $("#weather").empty();
	console.log(JSON.stringify(forecast));
	var title ="<h4> Weather Forecast for "+ cityStr + " </h4>";
    $("#weather").append(title);
	forecast.list.forEach(function(forecastEntry,index,list){
		var text = "<p>" + forecastEntry.dt_txt + " : " + parseInt(forecastEntry.main.temp) + " &#176C</p>";
        var icon = $("<i></i>");
        icon.addClass("wi weathericon " + iconTable[forecastEntry.weather[0].icon]);
        $("#weather").append(text);  
        $("#weather").append(icon);   
	})
}