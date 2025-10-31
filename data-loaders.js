/* CONTENTS:
- loading
*/

// Load and reproject GeoJSON
function loadGeoJSON(url, options) {
  console.log('Attempting to load GeoJSON from:', url);
  return fetch(url)
    .then(function(response) { 
      if (!response.ok) throw new Error('HTTP error, status = ' + response.status);
      console.log('Successfully fetched', url);
      return response.json(); 
    })
    .then(function(data) {
      console.log("GeoJSON loaded from " + url + ":", data);

      var first = findFirstCoordinate(data);
      var geojsonToUse = data;

      // Reproject if large numeric coordinates found
      if (first && (Math.abs(first[0]) > 10000 || Math.abs(first[1]) > 10000)) {
        console.log('Reprojecting ' + url + ' from EPSG:3067 to EPSG:4326...');
        geojsonToUse = reprojectGeoJSON(data, 'EPSG:3067', 'EPSG:4326');
      }

      const layer = L.geoJSON(geojsonToUse, options);
      return layer;
    })
    .catch(function(error) {
      console.error('Error loading GeoJSON from ' + url + ':', error);
      throw error;
    });
}

// Load Medical Services
function loadMedicalServices() {
  console.log('Attempting to load medical services data...');
  const url = './docs/MedicalServices_sw_finland.geojson';
  
  return fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('HTTP error loading medical services, status = ' + response.status);
      return response.json();
    })
    .then(data => {
      console.log('Medical services GeoJSON loaded successfully');
      
      if (data.features && data.features.length > 0) {
        console.log('Number of medical service features:', data.features.length);
        data = reprojectGeoJSON(data, 'EPSG:3067', 'EPSG:4326');
      }
      
      const medicalLayer = L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
          return L.marker(latlng, {
            icon: L.divIcon({
              className: 'medical-marker',
              html: '<div style="background-color: red; width: 10px; height: 10px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px black;"></div>',
              iconSize: [10, 10],
              iconAnchor: [10, 10]
            }),
            title: feature.properties.name || 'Medical Service',
            interactive: true
          });
        },
        onEachFeature: function(feature, layer) {
          const props = feature.properties || {};
          let popupContent = (props.kohteen_ni || '') + '</h3><table>';
          if (props.palvelukoh) {
            popupContent += '<tr><th scope="row">Service Type</th><td>' + props.palvelukoh + '</td></tr>';
          }
          if (props.palvelut) {
            popupContent += '<tr><th scope="row">Services</th><td>' + props.palvelut + '</td></tr>';
          }
          popupContent += '</table></div>';
          layer.bindPopup(popupContent, { maxHeight: 400, maxWidth: 400 });
        }
      });
      
      return { name: "Medical Services", layer: medicalLayer };
    })
    .catch(error => {
      console.error('Error loading medical services:', error);
      return { name: "Medical Services", layer: L.layerGroup() };
    });
}
