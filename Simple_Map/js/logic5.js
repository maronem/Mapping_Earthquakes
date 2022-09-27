// Code to create map

// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level - USED FOR SINGLE MAP
    //"mapid" references the id tag in <div> of html file
//let map = L.map("mapid").setView([30, 30], 2);

// Coordinates for each point to be used in the line.
//let line = [
  //[33.9416, -118.4085],
  //[37.6213, -122.3790],
  //[40.7899, -111.9791],
  //[47.4502, -122.3088]
//];

// Create a polyline using the line coordinates and make the line red
//L.polyline(line, {/
  //color: "yellow"
//}).addTo(map);

// ALT METHOD - MULTIPLE TILE LAYERS
// Create the map object with a center and zoom level.
// let map = L.map("mapid", {
    // center: [40.7, -94.5],
    // zoom: 4
  // });

// An array containing each city's location, state, and population.
// moved to cities.js -> get data from cities.js
//let cityData = cities;

// Add GeoJSON data.
//let sanFranAirport =
//{"type":"FeatureCollection","features":[{
    //"type":"Feature",
    //"properties":{
        //"id":"3469",
        //"name":"San Francisco International Airport",
        //"city":"San Francisco",
        //"country":"United States",
        ///"faa":"SFO",
        //"icao":"KSFO",
        //"alt":"13",
        //"tz-offset":"-8",
       //"dst":"A",
        //"tz":"America/Los_Angeles"},
        //"geometry":{
            //"type":"Point",
            // The L.geoJSON()layer reverses the coordinates to plot them on the map.
            //"coordinates":[-122.375,37.61899948120117]}}
//]};

// Accessing the airport GeoJSON airport URL
//let airportData = "https://raw.githubusercontent.com/maronem/Mapping_Earthquakes/main/majorAirports.json"

// Accessing the Toronto airline routes GeoJSON URL.
//let torontoData = "https://raw.githubusercontent.com/maronem/Mapping_Earthquakes/main/torontoRoutes.json";

// Grabbing our GeoJSON Toronoto data.
//d3.json(torontoData).then(function(data) {
  //console.log(data);
//});

// Accessing Toronto Neighborhoods GeoJSON data
//let torontoHoods = "https://raw.githubusercontent.com/maronem/Mapping_Earthquakes/main/torontoNeighborhoods.json"

// Grabbing our Toronto Neighborhood Data
//d3.json(torontoHoods).then(function(data) {
  //console.log(data);
  //Creating a GeoJSON layer with retreived data
  //L.geoJSON(data, {
    //color: "blue",
    //weight: 1,
    //fillColor: "#ffffa1",
    // add popup marker showing neighborhood name
    //onEachFeature: function(feature, layer) {
      //layer.bindPopup("<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>")
    //}
  //})
  //.addTo(map);
//});

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {  

// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
        console.log(data);
        return L.circleMarker(latlng);
      },
    // We set the style for each circleMarker using our styleInfo function.
  style: styleInfo,
    // We create a popup for each circleMarker to display the magnitude and
    //  location of the earthquake after the marker has been created and styled.
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
  }
}).addTo(earthquakes);

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend.
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");

  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];

  // Looping through our intervals to generate a label with a colored square for each interval.
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1]? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};

legend.addTo(map);

earthquakes.addTo(map);

});

// getRadius() function for stying info
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude*4;
  }

// getRadius() function for stying info
function getColor(magnitude) {
    if (magnitude > 5) {
        return "#ea2c2c";
      }
      if (magnitude > 4) {
        return "#ea822c";
      }
      if (magnitude > 3) {
        return "#ee9c00";
      }
      if (magnitude > 2) {
        return "#eecc00";
      }
      if (magnitude > 1) {
        return "#d4ee00";
      }
      return "#98ee00";
    }

// This function returns the style data for each of the earthquakes we plot on the map.
// We pass the magnitude of the earthquake into a function to calculate the radius.
function styleInfo(feature) {
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "#000000",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// Create a style for GeoJSON lines.
//let myStyle = {
  //color: "#ffffa1",
  //weight: 2
//}

// Creating a GeoJSON layer with the retrieved data.
//L.geoJSON(data, {
  //style: myStyle,
  //onEachFeature: function(feature, layer) {
    //layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination "
    //+ feature.properties.dst + "</h3>");
  //}
//})
//.addTo(map);
//});


// Grabbing our GeoJSON data. USING pointToLayer
//L.geoJSON(sanFranAirport, {
  //pointToLayer: function(feature, latlng) {
    //console.log(feature);
    //return L.marker(latlng)
    //.bindPopup("<h2>" + feature.properties.city + "</h2>")
  //}
//}).addTo(map);

// Grabbign out GeoJSON data USING onEachFeature
//L.geoJson(sanFranAirport, {
  //onEachFeature: function(feature, layer) {
    //console.log(layer);
    //layer.bindPopup("<h3>Airport code: " + feature.properties.faa + "<hr>" + "Airport name: " + feature.properties.name + "</h3>");
 //}
//}).addTo(map);

// iterate through the cities array and create on emarker for each city
//for (let i=0; i < cities.length; i++)
//cityData.forEach(function(city) {
  //console.log(city);
  //L.circleMarker(city.location, {
    //adjust population size to decrease circle size
    //radius: city.population/200000,
    //fillColor: "orange",
    //color: "orange",
    //fillOpacity: 0.1,
  //})
  // .toLocaleString() formats number as string with "," seperator
  //.bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population: " + city.population.toLocaleString() + "</h3>")
  //.addTo(map);
//});

  // Add a circle marker to map for LA, California
  //L.circleMarker([34.0522, -118.2437], {
    //radius: 300,
    //fillColor: "yellow",
    //color: "black",
    //fillOpacity: .1
  //}).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'satellite-streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Streets": streets,
  "Satelite Streets": satelliteStreets
};

// Create the earthquake layer for our map.
let earthquakes = new L.layerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    "Earthquakes": earthquakes
  };

// Create the map object with center, zoom level, default layer
let map = L.map("mapid", {
  center:[39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Pass map layers into layer control and add it to the map
L.control.layers(baseMaps, overlays).addTo(map);