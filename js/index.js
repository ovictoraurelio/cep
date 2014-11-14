/*
**
** Victor Aurélio
**
*/



getLocation();

$("#encontrar").on("click", function(){
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
    $("#acao").html("Encontrando seu endereço...");
    $("#localizacao").html("Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude);

    var request = $.ajax({
        url : "http://maps.googleapis.com/maps/api/geocode/json?latlng=" +  position.coords.latitude + ", " + position.coords.longitude,
        type : "GET"
    });
    request.done(function(msg){        
        if(msg['results'].length > 0){
            $("#acao").html("Found address!");
            $("#encontrar").hide();
            $("#painelResultado").removeClass("hide");
            $.each( msg['results'], function (index, resultado){    
                $("#listaEncontrados").append('<li href="#" class="list-group-item"><h4 class="list-group-item-heading">'+resultado['formatted_address']+'</h4> <p class="list-group-item-text"></p></li>');
            });            
            $("#main").trigger();
        }else{
            $("#painelResultado").addClass("hide");
            $("#acao").html("Address not found :(!");
            $("#encontrar").show();
        }
    });
    request.fail(function(jqXHR, textStatus){
        $("#acao").html("Address not found :(!");
        $("#encontrar").show();
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