$( document ).ready(function() {
  /*
  var  = "http://api.openweathermap.org/data/2.5/weather?id=5095808&appid=5034801f02b7a43482db1c080227f31b";
  */
  var datos = "http://api.openweathermap.org/data/2.5/forecast?id=5095808&appid=5034801f02b7a43482db1c080227f31b";
  
  $.get(datos, function(respuesta, status){
      if (status == 'success'){
        console.log(respuesta)
        
        var cambiodetemperatura = respuesta.list[7].main.temp -273.15 
        var cambiodetemperatura1 = respuesta.list[8].main.temp -273.15
        var cambiodetemperatura2 = respuesta.list[16].main.temp -273.15

        console.log(Math.round(cambiodetemperatura) + '°C')

        //var lluvia = respuesta.datos_bogota[0].url;
        var temperatura_bogota1 = Math.round(cambiodetemperatura) + '°C';
        var day_bogota1 = respuesta.list[0].dt_txt;
        var clima_bogota1 = respuesta.list[0].weather[0].description;

        //$(".rain figure img").attr("src", lluvia);
        $(".rain .temperatura p").text(temperatura_bogota1);
        $(".rain p strong").text(day_bogota1);
        $(".rain p span").text(clima_bogota1);

        //var sol = respuesta.datos_bogota[1].url;
        var temperatura_bogota2 = Math.round(cambiodetemperatura1) + '°C';
        var day_bogota2 = respuesta.list[8].dt_txt;
        var clima_bogota2 = respuesta.list[8].weather[0].description;
        
        //$(".clear figure img").attr("src", sol);
        $(".clear p strong").text(day_bogota2);
        $(".clear p span").text(clima_bogota2);
        $(".clear .temperatura p").text(temperatura_bogota2);
       
        //var nubes = respuesta.datos_bogota[2].url;
        var temperatura_bogota3 = Math.round(cambiodetemperatura2) + '°C';
        var day_bogota3 = respuesta.list[16].dt_txt;
        var clima_bogota3 = respuesta.list[16].weather[0].description;

        //$(".clouds figure img").attr("src", nubes);
        $(".clouds .temperatura p").text(temperatura_bogota3);
        $(".clouds p strong").text(day_bogota3);
        $(".clouds p span").text(clima_bogota3);
        
        /*
        var nubes_luna = respuesta.datos_paris[0].url;
        var city_francia2 = respuesta.datos_paris[0].city;
        var country_francia2 = respuesta.datos_paris[0].country;
        var temperatura_francia2 = respuesta.datos_paris[0].temperatura;

        
        var nubes_sol = respuesta.datos_paris[1].url;
        var city_francia1 = respuesta.datos_paris[1].city;
        var country_francia1 = respuesta.datos_paris[1].country;
        var temperatura_francia1 = respuesta.datos_paris[1].temperatura;

        var nubesblancas_sol = respuesta.datos_bogota[3].url;
        var temperatura_bogota4 = respuesta.datos_bogota[3].temperatura;
        */

         
 /*        
         $(".rain figure img").attr("src", lluvia);

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
        */
     }
  })
});



/*
$.ajax({
  url: "http://api.openweathermap.org/data/2.5/weather?id=5095808&appid=5034801f02b7a43482db1c080227f31b",
  cache: false
})


/*var datos = "../assets/js/data.json";/*



  .done(function( html ) {
    //$( "#results" ).append( html );
console.log(html)
  });

  for (var i = 0; i < clima_images.length; i++){
    console.log(clima_images[i]);
  }

});*/

