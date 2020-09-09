let map = L.map('map', {
  center: [47.574015,9.106968],
  zoom: 10
});

var wmsLayer = L.tileLayer.wms('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    opacity: 0.5
}).addTo(map);
