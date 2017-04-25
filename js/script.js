var people = [  {name:"John Doe1", address: "Miami 87" , phonenumber: 088861235, city: "Stockholm" },
                {name:"John Doe2", address: "Miami 87" , phonenumber: 08886123, city: "Gothenburg" },
                {name:"John Doe3", address: "Miami 87" , phonenumber: 08886123, city: "Uppsala" },
                {name:"John Doe4", address: "Miami 87" , phonenumber: 08886123, city: "Lund" },
                {name:"John Doe5", address: "Miami 87" , phonenumber: 08886123, city: "Halmstad" }];

var randomId = Math.floor(Math.random() * 5);
var cityStr  = people[randomId].city;

var purchase = [ {name:"Sofa", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Wardrobe", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Lamp", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Desk", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Chair", description: "Warm and Soft Sofa" , date: "03/23/2015" }];


$( document ).ready(function() {
    //CUSTOMER INFO
    $("#customerinfo").html("Customer Name : " + people[randomId].name + 
                            " </br> Customer Address : " + people[randomId].address + 
                            " </br> Phone Number : " + people[randomId].phonenumber);
    //ITEMS
    $("#items").empty();
    $.each( purchase, function( index, value ) {
         $("#items").append("item name : " + value.name + 
                            " </br> Description: " + value.description + 
                            "  </br>  Purchased on : " + value.date + " </br> ");  
    });       

    //NEWS
    getNyTimesNewsData();
    

    //WEATHER 
    var weatherUrl="http://api.openweathermap.org/data/2.5/forecast";
    var weatherApiKey="a73fba391f014de23586c2a9ae96f692";
          
    getWeatherData(weatherUrl, cityStr,weatherApiKey);

});

function getNyTimesNewsData(){

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

function getWeatherData(url,cityStr,weatherApiKey){
	var request=$.ajax({
		url:url,
		dataType:"jsonp",
		data:{q:cityStr,appid:weatherApiKey},
		jsonpCallback:"fetchWeatherData",
		type:"GET"
	}).fail(function(error){
		console.error(error);
		alert("Error sending Weather request")})
}

function fetchWeatherData(forecast){
	console.log(forecast);
	var html="";
	html+="<h3> Weather Forecast for "+ cityStr + " </h3>";
	forecast.list.forEach(function(forecastEntry,index,list){
		html+="<p>" + forecastEntry.dt_txt + " : " + forecastEntry.main.temp + "</p>"
	})
	$("#weather").html(html); 
}
