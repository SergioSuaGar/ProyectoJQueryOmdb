var ListaPeliculas;
var win = $(window);
var contpage = 1;

function bucarPelicula() {
    $.ajax({
        url: "http://www.omdbapi.com/?s=" + $("#pelicula").val() + "&type=movie&apikey=e6136fd6",
        success: function (result) {
            if (result.Response === 'True') {
                console.log(result, "buscarPelicula() OK");
                ListaPeliculas = result;
                addPelicula(ListaPeliculas);

            } else {
                console.log(result, "buscarPelicula() ERROR");
            }
        },
        error: function (result) {
            console.log(result, "SIN CONEXION CON API");
        }
    });
}

function mostrarPeliculas() {	
    for (let i = 0; i < ListaPeliculas.Search.length; i++) {
        console.log(ListaPeliculas.Search[i].Title);
    }
}

function addPelicula(ListaPeliculas) {
    for (let i = 0; i < ListaPeliculas.Search.length; i++) {
        $('#contenido').append('<div class="card col-lg-3 col-md-4 col-sm-6 col-xs-12 col-12" style="height: 350px; display: inline-flex;">\n' +
            '  <img class="card-img-top" style="height: 300px; width: 100%;" src="' + ListaPeliculas.Search[i].Poster + '" onerror="noCargada(this)">\n' +
            '  <div class="card-body">\n' +
            '    <a class="card-title">' + ListaPeliculas.Search[i].Title + '</a>\n' +
            '    <p class="card-text">Año: ' + ListaPeliculas.Search[i].Year + '</p>\n' +
            '	</div>')
    }
	
function detallar(idDetalle){
    $.ajax({
        url: 'http://www.omdbapi.com/?i=' + idDetalle + '&apikey=e6136fd6',
        success: function (result) {
            if (result.Response === 'True') {
                $('#content').empty();
                $('#content').append(' <div class="col-6">\n' +
                    '            <img src="'+ result.Poster +'">\n' +
                    '        </div>\n' +
                    '        <div class="col-6">\n' +
                    '            <div class="content-fluid"><b>Title: </b> ' + result.Title + '</div>\n' +
                    '            <div class="content-fluid"><b>Runtime:  </b> ' + result.Runtime + '</div>\n' +
                    '            <div class="content-fluid"><b>Genre: </b> ' + result.Genre + '</div>\n' +
                    '            <div class="content-fluid"><b>Actors: </b>' + result.Actors + '</div>\n' +
                    '            <div class="content-fluid"><b>Plot: </b>' + result.Plot + '</div>\n' +
                    '    </div>')
            }
        }
    })
}

win.scroll(function () {
	if ($(document).height() - win.height() <= (win.scrollTop() + 80)) {
		contpage++;
		$.ajax({
			url: "http://www.omdbapi.com/?s=" + $('#pelicula').val() + "&type=movie&page=" + contpage + "&apikey=e6136fd6",
			success: function (denuevo) {
				addPelicula(denuevo);
			}
		});
	}
});
	
function noCargada(imagen){
    imagen.src = "./imagen.jpg"
}

}