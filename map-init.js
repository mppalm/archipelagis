
/*CONTENTS:
- map initialization
- base layers
- button event bindings
- base layer toggle logic
*/

var map = L.map('map').setView([60.4484, 22.2672], 8);

// Define base layers
var osmLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  maxZoom: 19
}).addTo(map);

var satelliteLayer = L.tileLayer('https://api.maptiler.com/maps/satellite/{z}/{x}/{y}.jpg?key=F651PQ3V3To4VcaQBjAv', {
  attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>',
  maxZoom: 19
});

// Base layer toggle functionality
var currentBaseLayer = osmLayer;

function toggleBaseLayer(layerType) {
  if (currentBaseLayer) map.removeLayer(currentBaseLayer);

  if (layerType === 'osm') {
    map.addLayer(osmLayer);
    currentBaseLayer = osmLayer;
    document.getElementById('btnOSM').classList.add('active');
    document.getElementById('btnSatellite').classList.remove('active');
  } else if (layerType === 'satellite') {
    map.addLayer(satelliteLayer);
    currentBaseLayer = satelliteLayer;
    document.getElementById('btnOSM').classList.remove('active');
    document.getElementById('btnSatellite').classList.add('active');
  }

  console.log('Switched to ' + layerType + ' base layer');
}

// Set up base layer toggle buttons
document.getElementById('btnOSM').addEventListener('click', function() {
  toggleBaseLayer('osm');
});
document.getElementById('btnSatellite').addEventListener('click', function() {
  toggleBaseLayer('satellite');
});

var baseMaps = {
  "OpenStreetMap": osmLayer,
  "Satellite": satelliteLayer
};

var overlayMaps = {};


//legend code source: https://codepen.io/haakseth/pen/KQbjdO'
var legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Legend</h4>"; //the title of the Legend box
  div.innerHTML += '<i style="background: #00cc92","></i><span>2024</span><br>'; //
  div.innerHTML += '<i style="background: #cc4400"></i><span>2045</span><br>';
  return div;
};

legend.addTo(map);