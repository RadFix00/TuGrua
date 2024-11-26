let map = L.map('mapa').setView([4.7106, -74.1009], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

map.locate({ setView: true, maxZoom: 15 });

let locationMarker; // Variable para almacenar el marcador de la ubicación actual
let routingControl; // Variable para almacenar el control de ruteo
let originMarker;   // Variable para almacenar el marcador de origen
let destinationMarker; // Variable para almacenar el marcador de destino

map.on('locationfound', function (e) {
    // Si ya existe un marcador de ubicación, elimínalo antes de agregar otro
    if (locationMarker) {
        map.removeLayer(locationMarker);
    }
    locationMarker = L.marker(e.latlng).addTo(map); // Almacena el marcador
});

map.on('locationerror', function (e) {
    alert("Para poder usar esta aplicación es necesario acceder a tu ubicación. Actívala y reinicia la página.");
});

var geocoder = L.Control.Geocoder.nominatim();

document.getElementById('trazar').addEventListener('click', function () {
    var dirorigen = document.getElementById('origen').value;
    var dirdestino = document.getElementById('destino').value;

    if (!dirorigen || !dirdestino) {
        alert("Por favor, completa las direcciones de origen y destino.");
        return;
    }

    dirorigen += ", Bogotá";
    dirdestino += ", Bogotá";

    // Limpia cualquier marcador o ruta previa
    if (locationMarker) {
        map.removeLayer(locationMarker);
    }

    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }

    if (originMarker) {
        map.removeLayer(originMarker);
        originMarker = null;
    }
    if (destinationMarker) {
        map.removeLayer(destinationMarker);
        destinationMarker = null;
    }

    // Geocodificar dirección de origen
    geocoder.geocode(dirorigen, function (resultsOrigen) {
        if (!resultsOrigen || resultsOrigen.length === 0) {
            alert("No se pudo geocodificar la dirección de origen. Por favor, verifica que sea válida.");
            return;
        }
        var origen = resultsOrigen[0].center;

        // Geocodificar dirección de destino
        geocoder.geocode(dirdestino, function (resultsDestino) {
            if (!resultsDestino || resultsDestino.length === 0) {
                alert("No se pudo geocodificar la dirección de destino. Por favor, verifica que sea válida.");
                return;
            }
            var destino = resultsDestino[0].center;

            // Agregar ruteo al mapa sin instrucciones
            routingControl = L.Routing.control({
                waypoints: [
                    L.latLng(origen.lat, origen.lng),
                    L.latLng(destino.lat, destino.lng)
                ],
                routeWhileDragging: true,
                createMarker: function () { return null; }, // No crear marcadores
                show: false // Desactivar el cuadro de instrucciones
            }).addTo(map);

            // Ajustar el mapa para mostrar toda la ruta
            map.fitBounds([
                [origen.lat, origen.lng],
                [destino.lat, destino.lng]
            ]);

            // Agregar marcadores para origen y destino
            originMarker = L.marker(origen).addTo(map)
                .bindPopup("Origen: " + dirorigen)
                .openPopup();

            destinationMarker = L.marker(destino).addTo(map)
                .bindPopup("Destino: " + dirdestino)
                .openPopup();
        });
    });
});
