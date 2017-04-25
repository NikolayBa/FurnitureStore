var people = [  {name:"John Doe1", address: "Miami 87" , phonenumber: 088861235 },
                {name:"John Doe2", address: "Miami 87" , phonenumber: 08886123 },
                {name:"John Doe3", address: "Miami 87" , phonenumber: 08886123 },
                {name:"John Doe4", address: "Miami 87" , phonenumber: 08886123 },
                {name:"John Doe5", address: "Miami 87" , phonenumber: 08886123 }];

var randomId = Math.floor(Math.random() * 5);

var purchase = [ {name:"Sofa", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Wardrobe", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Lamp", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Desk", description: "Warm and Soft Sofa" , date: "03/23/2015" },
                 {name:"Chair", description: "Warm and Soft Sofa" , date: "03/23/2015" }];


$( document ).ready(function() {
    $("#customerinfo").html("Customer Name : " + people[randomId].name + 
                            " </br> Customer Address : " + people[randomId].address + 
                            " </br> Phone Number : " + people[randomId].phonenumber);

    $("#items").empty();
    $.each( purchase, function( index, value ) {
         $("#items").append("item name : " + value.name + 
                            " </br> Description: " + value.description + 
                            "  </br>  Purchased on : " + value.date + " </br> ");  
    });       

     prepareData();                      
});
var url="http://api.openweathermap.org/data/2.5/forecast";
var apiId="a73fba391f014de23586c2a9ae96f692";
var cityName="London";

var prepareData = function() {
			getWeatherData(url, cityName,apiId);
		}
		
function getWeatherData(url,cityName,apiId){
	var request=$.ajax({
		url:url,
		dataType:"jsonp",
		data:{q:cityName,appid:apiId},
		jsonpCallback:"fetchWeatherData",
		type:"GET"
	}).fail(function(error){
		console.error(error);
		alert("Error sending request")})
}

function fetchWeatherData(forecast){
	console.log(forecast);
	var html="";
	cityName="London";//take it from location
	html+="<h3> Weather Forecast for "+cityName+ " </h3>";
	forecast.list.forEach(function(forecastEntry,index,list){
		html+="<p>" + forecastEntry.dt_txt + " : " + forecastEntry.main.temp + "</p>"
	})
	$("#weather").html(html); 
}
