const API_KEY = "15b4b878cd394bc48085757bd1f8b472";

// Expresiones regulares
var reNombre = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
var reTelefono = /^[0-9]{9}$/i;
var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

var datos = "";
var city = "";
var cargarServicios = true;
var sForm = 0;
var tabla = true;

var stopTimeout = 0;

$(document).ready(function() {

  // Funciones de Scroll
  scrollForm();
  scrollTop();
  //OBTENER LOCALIDAD
  navigator.geolocation.getCurrentPosition(success, error);
  // Link de logo
  $('#logo').click(function() {
    location.reload();
  });

  // Validación de formulario
  $("#input-name").keyup(function() {
    let nombre = $(this).val();
    if (nombre == "" || !reNombre.test(nombre)) {
      $(this).css("border-color", "red");
      $("#input-email").attr("disabled", true);
    } else {
      $(this).css("border-color", "green");
      $("#input-email").removeAttr("disabled");
    }
  });

  // Validación de formulario
  $("#input-email").keyup(function() {
    let email = $(this).val();
    if (email == "" || !reEmail.test(email)) {
      $(this).css("border-color", "red");
      $("#input-telefono").attr("disabled", true);
    } else {
      $(this).css("border-color", "green");
      $("#input-telefono").removeAttr("disabled");
    }
  });

  // Validación de formulario
  $("#input-telefono").keyup(function() {
    let telefono = $(this).val();
    if (telefono == "" || !reTelefono.test(telefono)) {
      $(this).css("border-color", "red");
      $("#btn-submit").attr("disabled", true);
    } else {
      $(this).css("border-color", "green");
      $("#btn-submit").removeAttr("disabled");
    }
  });

});

// Scroll hacia el formulario
function scrollForm() {
  var formulario = $(".form");
  //console.log(formulario[0]);
  sForm = formulario[0].scrollHeight;
  $(".scrollForm").click(function() {
    $("html").animate({
      scrollTop: sForm
    }, 800);
  });
}

// Scroll hacia el formulario
function scrollFormServicio() {
  var formulario = $(".form");
  //console.log(formulario[0]);
  sForm = formulario[0].scrollHeight;
  $(".servicio").click(function() {
    $("html").animate({
      scrollTop: sForm
    }, 800);
  });
}

// Scroll hacia el top
function scrollTop() {
  $(".btn-scrollTop").click(function() {
    $("html").animate({
      scrollTop: 0
    }, 800);
  });
}

// Obtengo los datos del JSON
function getAjax() {
  var data = $.ajax("servitesti.json")
    .done(function() {
      datos = JSON.parse(data.responseText);
      console.log(datos);
      crearServicios();
      crearTestimonios();
    })
    .fail(function() {
      console.log("Error al obtener los valores");
      setTimeout(
        function() {
          getAjax();
        }, 5000);
    });
}

// Creacion de los servicios
function crearServicios() {
  for (let i = 0; i < datos.servicios.length; i++) {
    $('<div>', {
      'class': 'servicio scrollForm',
    }).append(
      $('<div>', {
        'class': 'img-servicio'
      }).append(
        $('<img>', {
          'src': datos.servicios[i].img,
          'alt': datos.servicios[i].alt
        })),
      $('<div>', {
        'class': 'texto-servicio',
        'text': datos.servicios[i].descripcion
      })).appendTo('.servicios');
  }
  scrollFormServicio();
  $(".servicio")
    .css("display", "flex")
    .hide()
    .fadeIn(2000);
}

// Creación de los testimonios junto a sus dos vistas
function crearTestimonios() {
  clearTimeout(stopTimeout);
  var testimonios = obtenerAleatorios();
  $('.testimonios').empty();
  $('.buttonBot').empty();
  if (tabla) {
    for (let i = 0; i < testimonios.length; i++) {
      $('<div>', {
        'class': 'testimonio',
      }).append(
        $('<h5>', {
          'class': 'testimonio-title',
          'text': testimonios[i].nombre
        }),
        $('<div>', {
          'class': 'testimonio-texto',
          'text': testimonios[i].resena
        }),
        $('<div>', {
          'class': 'testimonio-fecha'
        }).append(
          $('<small>', {
            'class': 'text-muted',
            'text': testimonios[i].fecha
          }))).appendTo('.testimonios');
    }
    $('<div>', {
      'class': 'divButtonBot',
    }).append(
      $('<button>', {
        'class': 'btn btn-success btn-hero btn-lg',
        'type': 'button',
        'id': 'btnTabla',
        'text': 'Cambiar a Tabla'
      })).appendTo('.buttonBot');

    $(".testimonio")
      .css("display", "grid")
      .hide()
      .fadeIn(2000);

  } else {
    $('<table>', {
      'class': 'resenatabla'
    }).append(
      $('<th>', {
        'class': 'column',
        'width': '4rem',
        'text': 'Nombre'
      }),
      $('<th>', {
        'class': 'column',
        'width': '4rem',
        'text': 'Fecha'
      }),
      $('<th>', {
        'class': 'column',
        'width': '4rem',
        'text': 'Reseña'
      }),
      $('<tr>', {
        'class': 'column',
        'width': '4rem',

      }).append(
        $('<td>', {
          'width': '20rem',
          'text': testimonios[0].nombre
        }),
        $('<td>', {
          'width': '20rem',
          'text': testimonios[0].fecha
        }),
        $('<td>', {
          'width': '20rem',
          'text': testimonios[0].resena
        })),
      $('<tr>', {
        'class': 'column',
        'width': '4rem',

      }).append(
        $('<td>', {
          'width': '20rem',
          'text': testimonios[1].nombre
        }),
        $('<td>', {
          'width': '20rem',
          'text': testimonios[1].fecha
        }),
        $('<td>', {
          'width': '20rem',
          'text': testimonios[1].resena
        })),
      $('<tr>', {
        'class': 'column',
        'width': '4rem',

      }).append(
        $('<td>', {
          'width': '20rem',
          'text': testimonios[2].nombre
        }),
        $('<td>', {
          'width': '20rem',
          'text': testimonios[2].fecha
        }),
        $('<td>', {
          'width': '20rem',
          'text': testimonios[2].resena
        }))
    ).appendTo('.testimonios');

    $('<div>', {
      'class': 'divButtonBot',
    }).append(
      $('<button>', {
        'class': 'btn btn-success btn-hero btn-lg',
        'type': 'button',
        'id': 'btnTabla',
        'text': 'Cambiar a individuales'
      })).appendTo('.buttonBot');

    $(".resenatabla")
      .hide()
      .fadeIn(2000);
  }

  $("#btnTabla").click(function() {
    if (tabla == true) {
      tabla = false;
      crearTestimonios();
    } else {
      tabla = true;
      crearTestimonios();
    }
  });

  stopTimeout = setTimeout(
    function() {
      crearTestimonios();
    }, 10000);
}

// "Listener" para controlar dónde está el scroll para
$(window).scroll(function() {
  var secServicio = $("#formulario");
  if ($(window).scrollTop() + $(window).height() >= $(document).height() && cargarServicios) {
    console.log("ENTRA");
    cargarServicios = false;
    getAjax();
  }
});

// Obtengo los testimonios aleatorios
function obtenerAleatorios() {
  var arrayTesti = [];
  var testi;
  var aleatorio = 0;
  var aleatorios = [];

  for (let i = 0; i < 3; i++) {
    do {
      aleatorio = Math.floor(Math.random() * (datos.testimonios.length - 0)) + 0;
    } while (aleatorios.indexOf(aleatorio) != -1)

    aleatorios.push(aleatorio);

    testi = datos.testimonios[aleatorio];
    arrayTesti.push(testi);
  }
  return arrayTesti;
}


// OBTENER LOCALIZACION
function success(position) {
  let coord = position.coords;

  var cities = $.ajax("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + coord.latitude + "&lon=" + coord.longitude + "&key=" + API_KEY)
    .done(function() {
      city = JSON.parse(cities.responseText);
      console.log(city.city_name);
    })
    .fail(function() {
      console.log("Error al obtener localización");
    });
}

function error(error) {
  console.warn(`ERROR(${error.code}): ${error.message}`);
  console.log("Error al obtener localización");
}
