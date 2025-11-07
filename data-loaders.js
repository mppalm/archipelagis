/* CONTENTS:
- loading
- medical service layer
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

// Load and calculate total of elderly
// did not want to modify the existing loadGeoJSON function
function calculateTotalElderly(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      const features = data.features || [];
      const total = features.reduce((sum, f) => {
        const val = Number(f.properties.elderly) || 0;
        return sum + val;
      }, 0);
      console.log("Total elderly in dataset:", total);
      return total;
    })
    .catch(err => {
      console.error("Failed to calculate elderly total:", err);
      return 0;
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
        pointToLayer: addPointToLayer,
        onEachFeature: pop_medical,
      });
      
      return { name: "Medical Services", layer: medicalLayer };
    })
    .catch(error => {
      console.error('Error loading medical services:', error);
      return { name: "Medical Services", layer: L.layerGroup() };
    });
}
