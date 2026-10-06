$(document).ready(function() {
  // 1. Cargar datos locales iniciales desde data.json para asegurar iconos e información base
  var datosLocales = "../assets/js/data.json";

  $.get(datosLocales, function(respuesta, status) {
    if (status == 'success') {
      var temperatura_bogota1 = respuesta.datos_bogota[0].temperatura;
      var lluvia = respuesta.datos_bogota[0].url;
      var day_bogota1 = respuesta.datos_bogota[0].day;
      var clima_bogota1 = respuesta.datos_bogota[0].clima;

      // clear
      var sol = respuesta.datos_bogota[1].url;
      var day_bogota2 = respuesta.datos_bogota[1].day;
      var clima_bogota2 = respuesta.datos_bogota[1].clima;
      var temperatura_bogota2 = respuesta.datos_bogota[1].temperatura;

      // clouds
      var nubes = respuesta.datos_bogota[2].url;
      var day_bogota3 = respuesta.datos_bogota[2].day;
      var clima_bogota3 = respuesta.datos_bogota[2].clima;
      var temperatura_bogota3 = respuesta.datos_bogota[2].temperatura;

      // clouds_Moon (Paris)
      var nubes_luna = respuesta.datos_paris[0].url;
      var city_francia2 = respuesta.datos_paris[0].city;
      var country_francia2 = respuesta.datos_paris[0].country;
      var temperatura_francia2 = respuesta.datos_paris[0].temperatura;

      // clouds_sun (Lyon)
      var nubes_sol = respuesta.datos_paris[1].url;
      var city_francia1 = respuesta.datos_paris[1].city;
      var country_francia1 = respuesta.datos_paris[1].country;
      var temperatura_francia1 = respuesta.datos_paris[1].temperatura;

      // Clima actual Bogotá
      var nubesblancas_sol = respuesta.datos_bogota[3].url;
      var temperatura_bogota4 = respuesta.datos_bogota[3].temperatura;

      // Renderizar imágenes y valores base
      $(".rain .temperatura p").text(temperatura_bogota1);
      $(".rain p strong").text(day_bogota1);
      $(".rain p span").text(clima_bogota1);
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

      // 2. Consultar API de OpenWeatherMap en vivo para actualizar con datos reales
      consultarApiClima();
    }
  });

  function consultarApiClima() {
    var apiKey = "5034801f02b7a43482db1c080227f31b";
    var diasSemana = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Clima actual Bogotá
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=Bogota,CO&appid=" + apiKey + "&units=metric",
      dataType: "json",
      success: function(data) {
        if (data && data.main) {
          var temp = Math.round(data.main.temp) + "°C";
          $(".cloudy .dato_actual p").text(temp);

          // Asignar icono dinámico según clima
          var mainClima = (data.weather && data.weather[0]) ? data.weather[0].main.toLowerCase() : "";
          if (mainClima.indexOf("rain") !== -1) {
            $(".cloudy .imgclima_actual figure img").attr("src", "../assets/images/rain.png");
          } else if (mainClima.indexOf("clear") !== -1) {
            $(".cloudy .imgclima_actual figure img").attr("src", "../assets/images/clear.png");
          } else {
            $(".cloudy .imgclima_actual figure img").attr("src", "../assets/images/cloudy.png");
          }
        }
      },
      error: function(err) {
        console.warn("OpenWeather Bogotá error, manteniendo datos locales:", err);
      }
    });

    // Pronóstico 3 días Bogotá
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=Bogota,CO&appid=" + apiKey + "&units=metric",
      dataType: "json",
      success: function(data) {
        if (data && data.list && data.list.length >= 24) {
          var step1 = data.list[0];
          var step2 = data.list[8];
          var step3 = data.list[16];

          if (step1) {
            var d1 = new Date(step1.dt * 1000);
            $(".rain p strong").text(diasSemana[d1.getDay()]);
            $(".rain p span").text(step1.weather[0].main);
            $(".rain .temperatura p").text(Math.round(step1.main.temp_max) + " / " + Math.round(step1.main.temp_min));
          }
          if (step2) {
            var d2 = new Date(step2.dt * 1000);
            $(".clear p strong").text(diasSemana[d2.getDay()]);
            $(".clear p span").text(step2.weather[0].main);
            $(".clear .temperatura p").text(Math.round(step2.main.temp_max) + " / " + Math.round(step2.main.temp_min));
          }
          if (step3) {
            var d3 = new Date(step3.dt * 1000);
            $(".clouds p strong").text(diasSemana[d3.getDay()]);
            $(".clouds p span").text(step3.weather[0].main);
            $(".clouds .temperatura p").text(Math.round(step3.main.temp_max) + " / " + Math.round(step3.main.temp_min));
          }
        }
      },
      error: function(err) {
        console.warn("OpenWeather Pronóstico error, manteniendo datos locales:", err);
      }
    });

    // Clima París (Francia)
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=Paris,FR&appid=" + apiKey + "&units=metric",
      dataType: "json",
      success: function(data) {
        if (data && data.main) {
          $(".cloudy_moon .temp").text(Math.round(data.main.temp) + "°C");
          $(".cloudy_moon ul li:first-child p").text("humidity " + data.main.humidity + "%");
          if (data.wind) {
            $(".cloudy_moon ul li:last-child p").text(data.wind.speed + " km/h");
          }
        }
      }
    });

    // Clima Lyon (Francia)
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=Lyon,FR&appid=" + apiKey + "&units=metric",
      dataType: "json",
      success: function(data) {
        if (data && data.main) {
          $(".cloudy_sun .temp").text(Math.round(data.main.temp) + "°C");
          $(".cloudy_sun ul li:first-child p").text("humidity " + data.main.humidity + "%");
          if (data.wind) {
            $(".cloudy_sun ul li:last-child p").text(data.wind.speed + " km/h");
          }
        }
      }
    });
  }
});
