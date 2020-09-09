/*
  Copyright (c) 2020 Dario Romandini, Michel Fäh
*/

const ACCESS_KEY = 'YoW2syIQ4xe0ccJA';
const API_URL = `https://MAP.geo.tg.ch/proxy/geofy_chsdi3/bodenuebersicht-profile_bohrungen?access_key=${ACCESS_KEY}&`;

const MAP = L.map('map', {
  center: [47.55, 9.05],
  zoom: 10
});

const OSM_LAYER = L.tileLayer.wms('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMAP</a> contributors',
  opacity: 0.5
}).addTo(MAP);

const OGD_LAYER = L.tileLayer.wms(API_URL, {
  layers: 'Hauptboden',
  transparent: true,
  format: 'image/png',
}).addTo(MAP);
