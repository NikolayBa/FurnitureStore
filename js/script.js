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

                             
});


