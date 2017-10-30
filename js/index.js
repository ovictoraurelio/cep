/*
**
** Victor Aurélio
**
*/



getLocation();

$("#search").on("click", function(){
    getLocation();
});


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    }else{
        $("#localizacao").html("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    $("#action").html("Encontrando seu endereço...");
    $("#localizacao").html("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);

    var request = $.ajax({
        url : "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +  position.coords.latitude + ", " + position.coords.longitude,
        type : "GET"
    });
    request.done(function(msg){
        if(msg['results'].length > 0){
            $("#action").html("Found address!");
            $("#search").hide();
            $("#painelResultado").removeClass("hide");
            $.each( msg['results'], function (index, resultado){
                $("#listFounds").append('<li href="#" class="list-group-item"><h4 class="list-group-item-heading">'+resultado['formatted_address']+'</h4> <p class="list-group-item-text"></p></li>');
            });
            $("#main").trigger();
        }else{
            $("#painelResultado").addClass("hide");
            $("#action").html("Address not found :(!");
            $("#search").show();
        }
    });
    request.fail(function(jqXHR, textStatus){
        $("#action").html("Address not found :(!");
        $("#search").show();
    });
}

//Creating local db

localStorage.getItem();
localStorage.setItem();

function localStorageValidator(){
    if (typeof(Storage) == "undefined" ){
        popUpPersonalizado("Sorry, does not support Web Storage...\nContact to grupoSepto",false);
        return false;
    }
    return true;
}


$("#widget").localizationTool({
     strings: {
         "id:title" : {
             pt_BR : "Encontrar CEP"
         },
         "id:header" : {
             pt_BR : "Encontrar CEP"
         },
         "id:acao" : {
             pt_BR : "Encontrar CEP"
         },
         "id:encontrar" : {
             pt_BR : "Encontrar CEP"
         },
         "id:results": {

         }
     }
 });