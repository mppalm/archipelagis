// Centralized GeoJSON layer style definitions

const layerStyles = {
  base: {
    color: "#0033cc",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.2
  },
  paavo2024: {
    color: "#00cc92",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.2
  },
  paavo2045: {
    color: "#cc4400",
    weight: 2,
    opacity: 0.9,
    fillOpacity: 0.2
  }
};

var medicalIcon = L.icon({
  className: 'medical-marker',
  iconUrl: './house_marker.png', //url of the medical point png

  iconSize:     [30, 30], // size of the icon
  iconAnchor:   [10, 10], // point of the icon which will correspond to marker's location
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

//html: '<div style="background-color: red; width: 10px; height: 10px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px black;"></div>',
