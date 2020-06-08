/*$( document ).ready(function() {
  const url = 'https://openweathermap.org/current'
  $.get(url, function(respuesta, status){
      if (status == 'success'){
         console.log(respuesta.name)
     }
  })
});
*/

//Traer imágenes de objetos
//rain
var lluvia = clima_images[0].url;
var day_bogota1 = clima_images[0].day;
var clima_bogota1 = clima_images[0].clima;
var temperatura_bogota1 = clima_images[0].temperatura;
//clear
var sol = clima_images[1].url;
var day_bogota2 = clima_images[1].day;
var clima_bogota2 = clima_images[1].clima;
var temperatura_bogota2 = clima_images[1].temperatura;
//clouds
var nubes = clima_images[4].url;
var day_bogota3 = clima_images[4].day;
var clima_bogota3 = clima_images[4].clima;
var temperatura_bogota3 = clima_images[4].temperatura;

var nubes_luna = clima_images[2].url;
var nubes_sol = clima_images[3].url;

var nubesblancas_sol = clima_images[5].url;
var temperatura_bogota4 = clima_images[5].temperatura;


console.log(lluvia);


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

  $("#cloudy_moon").attr("src", nubes_luna);
  $("#cloudy_sun").attr("src", nubes_sol);

  $(".cloudy .imgclima_actual figure img").attr("src", nubesblancas_sol);
  $(".cloudy .dato_actual p").text(temperatura_bogota4);
});