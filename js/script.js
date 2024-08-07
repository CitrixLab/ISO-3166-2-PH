var latitude = 0;
var longitude = 0;
var map, map2, map3;

$(document).ready(function () {
  navigator.geolocation.getCurrentPosition(userLocated, locationError);

  $(document).on("pagechange", function () {
    map.invalidateSize();
  });

  function userLocated(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    map = L.map("map").setView([latitude, longitude], 15);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("This is My Location")
      .openPopup();
    map.invalidateSize();
  }
  function locationError(error) {
    alert("Error code: " + error.code);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Permission Denied- " + error.message);
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Position Not Available- " + error.message);
        break;
      case error.TIMEOUT:
        alert("Request Time out- " + error.message);
        break;
    }
  }
});
function searchloc() {
  map2 = L.map("map2").setView([-20.244959, 57.561768], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map2);

  var results = L.layerGroup().addTo(map2);

  var searchControl = L.esri.Geocoding.geosearch().addTo(map2);
  searchControl.on("results", function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

  $(document).on("pagechange", function () {
    map2.invalidateSize();
  });
  var geocodeService = L.esri.Geocoding.geocodeService();
}
function discover() {
  map3 = L.map("map3").setView([-20.244959, 57.561768], 10);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map3);

  var results = L.layerGroup().addTo(map3);

  $(document).on("pagechange", function () {
    map3.invalidateSize();
  });
  var geocodeService = L.esri.Geocoding.geocodeService();

  map3.on("click", function (e) {
    geocodeService
      .reverse()
      .latlng(e.latlng)
      .run(function (error, result) {
        if (error) {
          return;
        }

        L.marker(result.latlng)
          .addTo(map3)
          .bindPopup(result.address.Match_addr)
          .openPopup();
      });
  });
}