/* CONTENTS:
- CRS definitions
- reprojection
- helper functions
*/

// CRS definitions
try {
  proj4.defs("EPSG:3067", "+proj=utm +zone=35 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");
  proj4.defs("EPSG:4326", "+proj=longlat +datum=WGS84 +no_defs");
} catch (e) { 
  console.warn('proj4.defs may already be defined:', e); 
}

// === Helper Functions ===

// Find first numeric coordinate in GeoJSON
function findFirstCoordinate(obj) {
  if (!obj) return null;
  if (obj.type === 'FeatureCollection') {
    for (var i = 0; i < obj.features.length; i++) {
      var c = findFirstCoordinate(obj.features[i]);
      if (c) return c;
    }
  } else if (obj.type === 'Feature') {
    return findFirstCoordinate(obj.geometry);
  } else if (obj.type === 'GeometryCollection') {
    for (var j = 0; j < obj.geometries.length; j++) {
      var d = findFirstCoordinate(obj.geometries[j]);
      if (d) return d;
    }
  } else if (obj.coordinates) {
    var coords = obj.coordinates;
    while (Array.isArray(coords) && Array.isArray(coords[0])) coords = coords[0];
    if (Array.isArray(coords) && typeof coords[0] === 'number') return coords;
  }
  return null;
}

// Reproject coordinates recursively
function reprojectCoordinates(coords, fromSrs, toSrs) {
  if (typeof coords[0] === 'number') {
    try {
      var p = proj4(fromSrs, toSrs, coords);
      return [p[0], p[1]];
    } catch (error) {
      console.error('Reprojection error:', error, 'for coords:', coords);
      return coords;
    }
  }
  return coords.map(function(c) { return reprojectCoordinates(c, fromSrs, toSrs); });
}

// Reproject full GeoJSON
function reprojectGeoJSON(geojson, fromSrs, toSrs) {
  console.log('Starting reprojection from', fromSrs, 'to', toSrs);
  var copy = JSON.parse(JSON.stringify(geojson));
  function walk(obj) {
    if (!obj) return;
    if (obj.type === 'FeatureCollection') return obj.features.forEach(walk);
    if (obj.type === 'Feature') return walk(obj.geometry);
    if (obj.type === 'GeometryCollection') return obj.geometries.forEach(walk);
    if (obj.coordinates) {
      obj.coordinates = reprojectCoordinates(obj.coordinates, fromSrs, toSrs);
    }
  }
  walk(copy);
  console.log('Reprojection completed');
  return copy;
}