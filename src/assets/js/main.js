$( document ).ready(function() {
  var datos = "../assets/js/data.json";
  $.get(datos, function(respuesta, status){
      if (status == 'success'){
         console.log(respuesta.datos_bogota[1].temperatura)
         
        var temperatura_bogota1 = respuesta.datos_bogota[0].temperatura;
        var lluvia = respuesta.datos_bogota[0].url;
        var day_bogota1 = respuesta.datos_bogota[0].day;
        var clima_bogota1 = respuesta.datos_bogota[0].clima;
        var temperatura_bogota1 = respuesta.datos_bogota[0].temperatura;
        //clear
        var sol = respuesta.datos_bogota[1].url;
        var day_bogota2 = respuesta.datos_bogota[1].day;
        var clima_bogota2 = respuesta.datos_bogota[1].clima;
        var temperatura_bogota2 = respuesta.datos_bogota[1].temperatura;
        //clouds
        var nubes = respuesta.datos_bogota[2].url;
        var day_bogota3 = respuesta.datos_bogota[2].day;
        var clima_bogota3 = respuesta.datos_bogota[2].clima;
        var temperatura_bogota3 = respuesta.datos_bogota[2].temperatura;

        //clouds_Moon
        var nubes_luna = respuesta.datos_paris[0].url;
        var city_francia2 = respuesta.datos_paris[0].city;
        var country_francia2 = respuesta.datos_paris[0].country;
        var temperatura_francia2 = respuesta.datos_paris[0].temperatura;

        //clouds_sun
        var nubes_sol = respuesta.datos_paris[1].url;
        var city_francia1 = respuesta.datos_paris[1].city;
        var country_francia1 = respuesta.datos_paris[1].country;
        var temperatura_francia1 = respuesta.datos_paris[1].temperatura;

        var nubesblancas_sol = respuesta.datos_bogota[3].url;
        var temperatura_bogota4 = respuesta.datos_bogota[3].temperatura;

         $(".rain .temperatura p").text(temperatura_bogota1);
         $(".rain p strong").text(day_bogota1);
         $(".rain p span").text(clima_bogota1);
         $(".rain .temperatura p").text(temperatura_bogota1);
         $(".rain figure img").attr("src", lluvia);

         $(".clear figure img").attr("src", sol);
         $(".clear p strong").text(day_bogota2);
         $(".clear p span").text(clima_bogota2);
         $(".clear .temperatura p").text(temperatura_bogota2);
       
         $(".clouds figure img").attr("src", nubes);
         $(".clouds p strong").text(day_bogota3);
         $(".clouds p span").text(clima_bogota3);
         $(".clouds .temperatura p").text(temperatura_bogota3);
       
         $(".cloudy_moon figure img").attr("src", nubes_luna);
         $(".cloudy_moon .temp").text(temperatura_francia2);
         $(".cloudy_moon div .city").text(city_francia2);
         $(".cloudy_moon div .country").text(country_francia2);
       
         $(".cloudy_sun figure img").attr("src", nubes_sol);
         $(".cloudy_sun .temp").text(temperatura_francia1);
         $(".cloudy_sun div .city").text(city_francia1);
         $(".cloudy_sun div .country").text(country_francia1);
       
         $(".cloudy .imgclima_actual figure img").attr("src", nubesblancas_sol);
         $(".cloudy .dato_actual p").text(temperatura_bogota4);
        
     }
  })
});



/*
$.ajax({
  url: "http://api.openweathermap.org/data/2.5/weather?id=5095808&appid=5034801f02b7a43482db1c080227f31b",
  cache: false
})
  .done(function( html ) {
    //$( "#results" ).append( html );
console.log(html)
  });
*/

//Traer imágenes de objetos
//rain

/*-------------------
      BOGOTA
-------------------*/

/*
var lluvia = clima_bogota[0].url;
var day_bogota1 = clima_bogota[0].day;
var clima_bogota1 = clima_bogota[0].clima;
var temperatura_bogota1 = clima_bogota[0].temperatura;
//clear
var sol = clima_bogota[1].url;
var day_bogota2 = clima_bogota[1].day;
var clima_bogota2 = clima_bogota[1].clima;
var temperatura_bogota2 = clima_bogota[1].temperatura;
//clouds
var nubes = clima_bogota[2].url;
var day_bogota3 = clima_bogota[2].day;
var clima_bogota3 = clima_bogota[2].clima;
var temperatura_bogota3 = clima_bogota[2].temperatura;

//clouds_Moon
var nubes_luna = clima_paris[0].url;
var city_francia2 = clima_paris[0].city;
var country_francia2 = clima_paris[0].country;
var temperatura_francia2 = clima_paris[0].temperatura;

//clouds_sun
var nubes_sol = clima_paris[1].url;
var city_francia1 = clima_images[1].city;
var country_francia1 = clima_paris[1].country;
var temperatura_francia1 = clima_paris[1].temperatura;

var nubesblancas_sol = clima_bogota[4].url;
var temperatura_bogota4 = clima_bogota[4].temperatura;

$(document).ready(function() {

  $(".rain figure img").attr("src", lluvia);
  $(".rain p strong").text(day_bogota1);
  $(".rain p span").text(clima_bogota1);
  $(".rain .temperatura p").text(temperatura_bogota1);

  $(".clear figure img").attr("src", sol);
  $(".clear p strong").text(day_bogota2);
  $(".clear p span").text(clima_bogota2);
  $(".clear .temperatura p").text(temperatura_bogota2);

  $(".clouds figure img").attr("src", nubes);
  $(".clouds p strong").text(day_bogota3);
  $(".clouds p span").text(clima_bogota3);
  $(".clouds .temperatura p").text(temperatura_bogota3);

  $(".cloudy_moon figure img").attr("src", nubes_luna);
  $(".cloudy_moon .temp").text(temperatura_francia2);
  $(".cloudy_moon div .city").text(city_francia2);
  $(".cloudy_moon div .country").text(country_francia2);

  $(".cloudy_sun figure img").attr("src", nubes_sol);
  $(".cloudy_sun .temp").text(temperatura_francia1);
  $(".cloudy_sun div .city").text(city_francia1);
  $(".cloudy_sun div .country").text(country_francia1);

  $(".cloudy .imgclima_actual figure img").attr("src", nubesblancas_sol);
  $(".cloudy .dato_actual p").text(temperatura_bogota4);
/*
  for (var i = 0; i < clima_images.length; i++){
    console.log(clima_images[i]);
  }

});*/

