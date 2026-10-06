$(document).ready(function() {
  // 1. Cargar datos locales iniciales desde data.json para asegurar iconos e información base
  var datosLocales = "../assets/js/data.json";

  $.get(datosLocales, function(respuesta, status) {
    if (status == 'success') {
      var bogota = respuesta.datos_bogota;
      var paris = respuesta.datos_paris;

      // Pronóstico 3 días Bogotá
      $(".rain .temperatura p").text(bogota[0].temperatura);
      $(".rain p strong").text(bogota[0].day);
      $(".rain p span").text(bogota[0].clima);
      $(".rain figure img").attr("src", bogota[0].url);

      $(".clear figure img").attr("src", bogota[1].url);
      $(".clear p strong").text(bogota[1].day);
      $(".clear p span").text(bogota[1].clima);
      $(".clear .temperatura p").text(bogota[1].temperatura);

      $(".clouds figure img").attr("src", bogota[2].url);
      $(".clouds p strong").text(bogota[2].day);
      $(".clouds p span").text(bogota[2].clima);
      $(".clouds .temperatura p").text(bogota[2].temperatura);

      // Tarjetas de Francia (Lyon y Paris en francés)
      // Paris
      $(".cloudy_moon figure img").attr("src", paris[0].url);
      $(".cloudy_moon .temp").text(paris[0].temperatura);
      $(".cloudy_moon .city").text(paris[0].city);
      $(".cloudy_moon .country").text(paris[0].country);

      // Lyon
      $(".cloudy_sun figure img").attr("src", paris[1].url);
      $(".cloudy_sun .temp").text(paris[1].temperatura);
      $(".cloudy_sun .city").text(paris[1].city);
      $(".cloudy_sun .country").text(paris[1].country);

      // Clima actual Bogotá (distintivo flotante)
      $(".cloudy .imgclima_actual figure img").attr("src", bogota[3].url);
      $(".cloudy .dato_actual p").text(bogota[3].temperatura);

      // 2. Consultar API de OpenWeatherMap en vivo para actualizar con datos reales
      consultarApiClima();
    }
  });

  function traducirClima(main) {
    if (!main) return "Nublado";
    var m = main.toLowerCase();
    if (m.indexOf("rain") !== -1 || m.indexOf("drizzle") !== -1) return "Lluvia";
    if (m.indexOf("clear") !== -1) return "Despejado";
    if (m.indexOf("cloud") !== -1) return "Nublado";
    if (m.indexOf("thunder") !== -1) return "Tormenta";
    if (m.indexOf("snow") !== -1) return "Nieve";
    if (m.indexOf("mist") !== -1 || m.indexOf("fog") !== -1) return "Neblina";
    return "Nublado";
  }

  function direccionVientoFrances(deg) {
    if (deg === undefined || deg === null) return "ouest";
    var dirs = ["nord", "nord-est", "est", "sud-est", "sud", "sud-ouest", "ouest", "nord-ouest"];
    var idx = Math.round(deg / 45) % 8;
    return dirs[idx];
  }

  function consultarApiClima() {
    var apiKey = "5034801f02b7a43482db1c080227f31b";
    var diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

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
          if (mainClima.indexOf("rain") !== -1 || mainClima.indexOf("drizzle") !== -1) {
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

    // Pronóstico 3 días Bogotá (en español)
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
            $(".rain p span").text(traducirClima(step1.weather[0].main));
            $(".rain .temperatura p").text(Math.round(step1.main.temp_max) + " / " + Math.round(step1.main.temp_min));
          }
          if (step2) {
            var d2 = new Date(step2.dt * 1000);
            $(".clear p strong").text(diasSemana[d2.getDay()]);
            $(".clear p span").text(traducirClima(step2.weather[0].main));
            $(".clear .temperatura p").text(Math.round(step2.main.temp_max) + " / " + Math.round(step2.main.temp_min));
          }
          if (step3) {
            var d3 = new Date(step3.dt * 1000);
            $(".clouds p strong").text(diasSemana[d3.getDay()]);
            $(".clouds p span").text(traducirClima(step3.weather[0].main));
            $(".clouds .temperatura p").text(Math.round(step3.main.temp_max) + " / " + Math.round(step3.main.temp_min));
          }
        }
      },
      error: function(err) {
        console.warn("OpenWeather Pronóstico error, manteniendo datos locales:", err);
      }
    });

    // Clima París (Francia) - en francés
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=Paris,FR&appid=" + apiKey + "&units=metric",
      dataType: "json",
      success: function(data) {
        if (data && data.main) {
          $(".cloudy_moon .temp").text(Math.round(data.main.temp) + "°C");
          $(".cloudy_moon .city").text("Paris");
          $(".cloudy_moon .country").text("France");
          $(".cloudy_moon ul li .humidity").text("humidité " + data.main.humidity + "%");
          if (data.wind) {
            $(".cloudy_moon ul li .wind-dir").text(direccionVientoFrances(data.wind.deg));
            $(".cloudy_moon ul li .wind-speed").text(data.wind.speed + " km/h");
          }
        }
      }
    });

    // Clima Lyon (Francia) - en francés
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=Lyon,FR&appid=" + apiKey + "&units=metric",
      dataType: "json",
      success: function(data) {
        if (data && data.main) {
          $(".cloudy_sun .temp").text(Math.round(data.main.temp) + "°C");
          $(".cloudy_sun .city").text("Lyon");
          $(".cloudy_sun .country").text("France");
          $(".cloudy_sun ul li .humidity").text("humidité " + data.main.humidity + "%");
          if (data.wind) {
            $(".cloudy_sun ul li .wind-dir").text(direccionVientoFrances(data.wind.deg));
            $(".cloudy_sun ul li .wind-speed").text(data.wind.speed + " km/h");
          }
        }
      }
    });
  }
});
