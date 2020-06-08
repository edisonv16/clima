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

var lluvia = clima_images[0].url;
var day_bogota1 = clima_images[0].day;
var clima_bogota1 = clima_images[0].clima;
var temperatura_bogota1 = clima_images[0].temperatura;
var sol = clima_images[1].url;
var nubes = clima_images[4].url;
var nubes_luna = clima_images[2].url;
var nubes_sol = clima_images[3].url;
var nubesblancas_sol = clima_images[5].url;


console.log(lluvia);


$(document).ready(function() {
  $(".rain figure img").attr("src", lluvia);
  $(".rain p strong").text(day_bogota1);
  $(".rain p span").text(clima_bogota1);
  $(".rain .temperatura p").text(temperatura_bogota1);

  $("#clear").attr("src", sol);
  $("#clouds").attr("src", nubes);
  $("#cloudy_moon").attr("src", nubes_luna);
  $("#cloudy_sun").attr("src", nubes_sol);
  $("#cloudy").attr("src", nubesblancas_sol);
});