// Code to create map

// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level
    //"mapid" references the id tag in <div> of html file
let map = L.map("mapid").setView([34.0522, -118.2437], 14);

// ALT METHOD - MULTIPLE TILE LAYERS
// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
    // center: [
      // 40.7, -94.5
    // ],
    // zoom: 4
  // });

  // Add marker to map for LA, California
  var marker = L.marker([34.0522, -118.2437]).addTo(map);

  // Add a circle marker to map for LA, California
  L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    fillColor: "yellow",
    color: "black",
    fillOpacity: .1
  }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'styles/mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);