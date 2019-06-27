var url = "/api/counties";
const API_KEY = "pk.eyJ1Ijoic2Rlc2FpMzkiLCJhIjoiY2p4ZjhxbnFpMGpmdzN4cGJqMWlraGVoNiJ9.45WtM8lsO2O7A4gIg8NCYw";





function filter(data,state) {
    if(state == "USA") {
        var newjson = data;
        var zoom = 3;
        var center = [39.82,-98.58];
        return [newjson,center,zoom];
    }
    else {
        var zoom = 5;
        var filterlist = [];
        var newjson = {
            "type": "FeatureCollection",
            "features": []
        };
        var code = key[state][1];
        var center = key[state][0];
        data["features"].forEach(function(feature) {
            if(feature["properties"]["STATE"]===code) {
                filterlist.push(feature);
            };
        })
        newjson["features"] = filterlist;
        return [newjson,center,zoom];
        }
    }

function choro(data,map) {
    console.log("choro started")
    L.choropleth(data, {
        valueProperty: "FD%",
        scale: ["#ffffb2","#b10026"],
        steps: 20,
        mode: "q",
        style: {
            color: "#fff",
            weight: 1,
            fillOpacity: 0.8
        }
    }).addTo(map)
}

stateselect = d3.select("#stateselect");
stateselect.on("change", function() {
    var state = stateselect.property("value")
    document.getElementById("map").innerHTML = ""
    console.log("state is:"+state)
    d3.json(url, function(error, data) {
        var data = JSON.parse(data);
        var neededvalues = filter(data[0],state);
        console.log(neededvalues)
        var center = neededvalues[1];
        var zoom = neededvalues[2];
        var geojson = neededvalues[0];
        var myMap = L.map("map", {
            center: center,
            zoom: zoom
        });
        L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
            attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
            maxZoom: 18,
            id: "mapbox.light",
            accessToken: API_KEY
        }).addTo(myMap);
        choro(geojson,myMap)
    })
})


const key = {
    "Alabama": [[32.81,-86.79],"01"],
    "Alaska": [[61.37,-152.40],"02"],
    "Arizona": [[34.04,-111.09],"04"],
    "Arkansas": [[24.97,-92.37],"05"],
    "California": [[36.11,-119.68],"06"],
    "Colorado": [[39.06,-105.31],"08"],
    "Connecticut": [[41.60,-72.76],"09"],
    "Delaware": [[39.32,-75.51],"10"],
    "Florida": [[27.77,-81.69],"12"],
    "Georgia": [[33.04,-83.64],"13"],
    "Hawaii": [[],"15"],
    "Idaho": [[44.24,-114.48],"16"],
    "Illinois": [[40.35,-88.99],"17"],
    "Indiana": [[39.85,-86.26],"18"],
    "Iowa": [[42.01,-93.21],"19"],
    "Kansas": [[38.53,-96.73],"20"],
    "Kentucky": [[37.67,-84.67],"21"],
    "Louisiana": [[31.17,-91.87],"22"],
    "Maine": [[44.69,-69.38],"23"],
    "Maryland": [[39.07,-76.80],"24"],
    "Massachussets": [[42.23,-71.53],"25"],
    "Michigan": [[43.33,-84.54],"26"],
    "Minnesota": [[45.69,-93.90],"27"],
    "Mississippi": [[32.74,-89.68],"28"],
    "Missouri": [[38.46,-92.29],"29"],
    "Montana": [[46.92,-110.45],"30"],
    "Nebraska": [[41.13,-98.27],"31"],
    "Nevada": [[38.31,-117.06],"32"],
    "New Hampshire": [[43.45,-71.56],"33"],
    "New Jersey": [[40.30,-74.52],"34"],
    "New Mexico": [[34.84,-106.25],"35"],
    "New York": [[42.17,-74.95],"36"],
    "North Carolina": [[35.63,-79.81],"37"],
    "North Dakota": [[47.53,-99.78],"38"],
    "Ohio": [[40.39,-82.76],"39"],
    "Oklahoma": [[35.56,-96.93],"40"],
    "Oregon": [[44.57,-122.07],"41"],
    "Pennsylvania": [[40.59,-77.21],"42"],
    "Rhode Island": [[41.68,-71.51],"44"],
    "South Carolina": [[33.87,-80.95],"45"],
    "South Dakota": [[44.30,-99.44],"46"],
    "Tennessee": [[35.75,-86.69],"47"],
    "Texas": [[31.05,-97.56],"48"],
    "Utah": [[40.15,-111.86],"49"],
    "Vermont": [[44.06,-72.71],"50"],
    "Virginia": [[37.77,-78.17],"51"],
    "Washington": [[47.40,-121.49],"53"],
    "West Virginia": [[38.49,-80.9554],"54"],
    "Wisconsin": [[44.27,-89.62],"55"],
    "Wyoming": [[42.76,-107.30],"56"],
} 
