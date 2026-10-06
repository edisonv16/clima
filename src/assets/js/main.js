$(document).ready(function() {
  var API_KEY = "5034801f02b7a43482db1c080227f31b";
  var DIAS_SEMANA = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

  // Diccionario de países y sus dos ciudades principales
  var PAISES_CONFIG = {
    "colombia": [
      { nombre: "Bogotá", consulta: "Bogota,CO", pais: "Colombia" },
      { nombre: "Barranquilla", consulta: "Barranquilla,CO", pais: "Colombia" }
    ],
    "francia": [
      { nombre: "Lyon", consulta: "Lyon,FR", pais: "Francia" },
      { nombre: "París", consulta: "Paris,FR", pais: "Francia" }
    ],
    "france": [
      { nombre: "Lyon", consulta: "Lyon,FR", pais: "Francia" },
      { nombre: "París", consulta: "Paris,FR", pais: "Francia" }
    ],
    "espana": [
      { nombre: "Madrid", consulta: "Madrid,ES", pais: "España" },
      { nombre: "Barcelona", consulta: "Barcelona,ES", pais: "España" }
    ],
    "mexico": [
      { nombre: "Ciudad de México", consulta: "Mexico City,MX", pais: "México" },
      { nombre: "Guadalajara", consulta: "Guadalajara,MX", pais: "México" }
    ],
    "estados unidos": [
      { nombre: "Nueva York", consulta: "New York,US", pais: "Estados Unidos" },
      { nombre: "Los Ángeles", consulta: "Los Angeles,US", pais: "Estados Unidos" }
    ],
    "usa": [
      { nombre: "Nueva York", consulta: "New York,US", pais: "Estados Unidos" },
      { nombre: "Los Ángeles", consulta: "Los Angeles,US", pais: "Estados Unidos" }
    ],
    "ee uu": [
      { nombre: "Nueva York", consulta: "New York,US", pais: "Estados Unidos" },
      { nombre: "Los Ángeles", consulta: "Los Angeles,US", pais: "Estados Unidos" }
    ],
    "argentina": [
      { nombre: "Buenos Aires", consulta: "Buenos Aires,AR", pais: "Argentina" },
      { nombre: "Córdoba", consulta: "Cordoba,AR", pais: "Argentina" }
    ],
    "chile": [
      { nombre: "Santiago", consulta: "Santiago,CL", pais: "Chile" },
      { nombre: "Valparaíso", consulta: "Valparaiso,CL", pais: "Chile" }
    ],
    "peru": [
      { nombre: "Lima", consulta: "Lima,PE", pais: "Perú" },
      { nombre: "Arequipa", consulta: "Arequipa,PE", pais: "Perú" }
    ],
    "brasil": [
      { nombre: "Brasilia", consulta: "Brasilia,BR", pais: "Brasil" },
      { nombre: "Río de Janeiro", consulta: "Rio de Janeiro,BR", pais: "Brasil" }
    ],
    "brazil": [
      { nombre: "Brasilia", consulta: "Brasilia,BR", pais: "Brasil" },
      { nombre: "Río de Janeiro", consulta: "Rio de Janeiro,BR", pais: "Brasil" }
    ],
    "italia": [
      { nombre: "Roma", consulta: "Rome,IT", pais: "Italia" },
      { nombre: "Milán", consulta: "Milan,IT", pais: "Italia" }
    ],
    "alemania": [
      { nombre: "Berlín", consulta: "Berlin,DE", pais: "Alemania" },
      { nombre: "Múnich", consulta: "Munich,DE", pais: "Alemania" }
    ],
    "reino unido": [
      { nombre: "Londres", consulta: "London,GB", pais: "Reino Unido" },
      { nombre: "Manchester", consulta: "Manchester,GB", pais: "Reino Unido" }
    ],
    "inglaterra": [
      { nombre: "Londres", consulta: "London,GB", pais: "Reino Unido" },
      { nombre: "Manchester", consulta: "Manchester,GB", pais: "Reino Unido" }
    ],
    "japon": [
      { nombre: "Tokio", consulta: "Tokyo,JP", pais: "Japón" },
      { nombre: "Osaka", consulta: "Osaka,JP", pais: "Japón" }
    ],
    "canada": [
      { nombre: "Ottawa", consulta: "Ottawa,CA", pais: "Canadá" },
      { nombre: "Toronto", consulta: "Toronto,CA", pais: "Canadá" }
    ]
  };

  // Normalizar cadenas para búsqueda flexible
  function normalizarTexto(texto) {
    if (!texto) return "";
    return texto
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9 ]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Traducción y mapeo de iconos de clima
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

  function obtenerIconoClima(main, esNoche) {
    var m = (main || "").toLowerCase();
    if (m.indexOf("rain") !== -1 || m.indexOf("drizzle") !== -1) {
      return "../assets/images/rain.png";
    }
    if (m.indexOf("clear") !== -1) {
      return esNoche ? "../assets/images/cloudy_moon.png" : "../assets/images/clear.png";
    }
    return esNoche ? "../assets/images/cloudy_moon.png" : "../assets/images/cloudy_sun.png";
  }

  function obtenerDireccionViento(deg) {
    if (deg === undefined || deg === null) return "Oeste";
    var direcciones = ["Norte", "Noreste", "Este", "Sureste", "Sur", "Suroeste", "Oeste", "Noroeste"];
    var idx = Math.round(deg / 45) % 8;
    return direcciones[idx];
  }

  // Actualizar tarjeta visual de ciudad
  function pintarTarjetaCiudad(selector, datos, esNoche) {
    var $card = $(selector);
    $card.find(".temp").text(datos.temp + "°C");
    $card.find(".city").text(datos.city);
    $card.find(".country").text(datos.country);
    $card.find(".humidity").text("Humedad " + datos.humidity + "%");
    $card.find(".wind-dir").text(datos.windDir);
    $card.find(".wind-speed").text(datos.windSpeed + " km/h");
    $card.find("figure img").attr("src", obtenerIconoClima(datos.weather, esNoche));
  }

  // Consultar clima de una ciudad a OpenWeatherMap
  function consultarCiudadApi(consulta, nombreVisible, paisVisible, selector, esNoche, callback) {
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(consulta) + "&appid=" + API_KEY + "&units=metric";
    $.ajax({
      url: url,
      dataType: "json",
      success: function(data) {
        if (data && data.main) {
          var info = {
            temp: Math.round(data.main.temp),
            city: nombreVisible || data.name,
            country: paisVisible || (data.sys ? data.sys.country : ""),
            humidity: data.main.humidity,
            windDir: data.wind ? obtenerDireccionViento(data.wind.deg) : "Oeste",
            windSpeed: data.wind ? data.wind.speed : 0,
            weather: (data.weather && data.weather[0]) ? data.weather[0].main : "Clouds"
          };
          pintarTarjetaCiudad(selector, info, esNoche);
          if (callback) callback(null, info);
        }
      },
      error: function(err) {
        if (callback) callback(err);
      }
    });
  }

  // Cambiar ciudades según el país ingresado
  function cambiarPais(paisInput, onSuccess, onError) {
    var clave = normalizarTexto(paisInput);
    if (!clave) {
      if (onError) onError("Por favor ingresa el nombre de un país.");
      return;
    }

    if (PAISES_CONFIG[clave]) {
      var ciudades = PAISES_CONFIG[clave];
      consultarCiudadApi(ciudades[0].consulta, ciudades[0].nombre, ciudades[0].pais, ".cloudy_sun", false);
      consultarCiudadApi(ciudades[1].consulta, ciudades[1].nombre, ciudades[1].pais, ".cloudy_moon", true);
      if (onSuccess) onSuccess();
      return;
    }

    // Si no está en la lista predeterminada, buscar la ciudad/país en OpenWeatherMap
    consultarCiudadApi(paisInput, null, null, ".cloudy_sun", false, function(err, info) {
      if (err) {
        if (onError) onError("No se encontró el clima para \"" + paisInput + "\". Prueba con Colombia, España, México, etc.");
      } else {
        // Para la segunda tarjeta, mantener o buscar capital relacionada
        consultarCiudadApi("Paris,FR", "París", "Francia", ".cloudy_moon", true);
        if (onSuccess) onSuccess();
      }
    });
  }

  // Carga de datos base iniciales
  function inicializarDatosBase() {
    $.get("../assets/js/data.json", function(respuesta, status) {
      if (status === 'success') {
        var bogota = respuesta.datos_bogota;
        var paris = respuesta.datos_paris;

        // Pronóstico base Bogotá
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

        // Clima actual Bogotá
        $(".cloudy .imgclima_actual figure img").attr("src", bogota[3].url);
        $(".cloudy .dato_actual p").text(bogota[3].temperatura);

        // Ciudades base (Lyon y París en español)
        pintarTarjetaCiudad(".cloudy_sun", {
          temp: 14,
          city: paris[1].city,
          country: paris[1].country,
          humidity: 68,
          windDir: "Oeste",
          windSpeed: 8.03,
          weather: "Clouds"
        }, false);

        pintarTarjetaCiudad(".cloudy_moon", {
          temp: 16,
          city: paris[0].city,
          country: paris[0].country,
          humidity: 55,
          windDir: "Oeste",
          windSpeed: 8.03,
          weather: "Clear"
        }, true);

        // Consultar API en vivo
        consultarApiClimaBogota();
        consultarCiudadApi("Lyon,FR", "Lyon", "Francia", ".cloudy_sun", false);
        consultarCiudadApi("Paris,FR", "París", "Francia", ".cloudy_moon", true);
      }
    });
  }

  // Clima de Bogotá en vivo
  function consultarApiClimaBogota() {
    // Actual Bogotá
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q=Bogota,CO&appid=" + API_KEY + "&units=metric",
      dataType: "json",
      success: function(data) {
        if (data && data.main) {
          $(".cloudy .dato_actual p").text(Math.round(data.main.temp) + "°C");
          var mainClima = (data.weather && data.weather[0]) ? data.weather[0].main : "";
          $(".cloudy .imgclima_actual figure img").attr("src", obtenerIconoClima(mainClima, false));
        }
      }
    });

    // Pronóstico 3 días Bogotá
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=Bogota,CO&appid=" + API_KEY + "&units=metric",
      dataType: "json",
      success: function(data) {
        if (data && data.list && data.list.length >= 24) {
          var items = [
            { el: ".rain", item: data.list[0] },
            { el: ".clear", item: data.list[8] },
            { el: ".clouds", item: data.list[16] }
          ];

          items.forEach(function(entry) {
            if (entry.item) {
              var f = new Date(entry.item.dt * 1000);
              $(entry.el + " p strong").text(DIAS_SEMANA[f.getDay()]);
              $(entry.el + " p span").text(traducirClima(entry.item.weather[0].main));
              $(entry.el + " .temperatura p").text(Math.round(entry.item.main.temp_max) + " / " + Math.round(entry.item.main.temp_min));
            }
          });
        }
      }
    });
  }

  // Configuración del Modal interactivo
  function configurarModal() {
    var $modal = $("#modal-location");
    var $input = $("#input-country");
    var $error = $("#modal-error-msg");

    function abrirModal() {
      $error.text("").hide();
      $input.val("");
      $modal.fadeIn(200);
      setTimeout(function() {
        $input.focus();
      }, 250);
    }

    function cerrarModal() {
      $modal.fadeOut(200);
      $error.text("").hide();
    }

    function ejecutarCambio() {
      var pais = $input.val();
      cambiarPais(
        pais,
        function() {
          cerrarModal();
        },
        function(mensajeError) {
          $error.text(mensajeError).slideDown(150);
        }
      );
    }

    // Abrir modal con botón Agregar ubicación
    $(document).on("click", "#btn-open-modal, .addlocations button", function(e) {
      e.preventDefault();
      abrirModal();
    });

    // Cerrar modal
    $("#btn-modal-close, #btn-modal-cancel").on("click", function(e) {
      e.preventDefault();
      cerrarModal();
    });

    // Cerrar al hacer click fuera de la tarjeta modal
    $modal.on("click", function(e) {
      if ($(e.target).is("#modal-location")) {
        cerrarModal();
      }
    });

    // Aceptar
    $("#btn-modal-accept").on("click", function(e) {
      e.preventDefault();
      ejecutarCambio();
    });

    // Enter en el input
    $input.on("keydown", function(e) {
      if (e.which === 13) {
        e.preventDefault();
        ejecutarCambio();
      }
    });
  }

  // Inicializar todo
  inicializarDatosBase();
  configurarModal();
});
