/*
  Copyright (c) 2020 Dario Romandini, Michel Fäh
*/

const ACCESS_KEY = 'YoW2syIQ4xe0ccJA';
const API_URL = `https://map.geo.tg.ch/proxy/geofy_chsdi3/bodenuebersicht-profile_bohrungen?access_key=${ACCESS_KEY}`;
const LAYER_NAMES = [
  'Hauptboden',
  'ubuflach_k_ob_al',
  'ubuflach_hb',
  'ubuflach_verd',
  'Nebenboden',
  'ubuflach_nb',
  'Begleitboden',
  'ubuflach_bb',
  'ubuflach_re_nat',
  'ubufixpk',
];

const MAP = L.map('map', {
  center: [47.55, 9.05],
  zoom: 10
});

const OSM_LAYER = L.tileLayer.wms('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMAP</a> contributors',
  opacity: 0.5
}).addTo(MAP);

// Data structure used to track which layer is currently displayed
// Do not modify outside buildStateStruct function
// KEY: Layer name
// Attrib visible: Boolean value if layer is displayed (true) or not (false)
// Attrib wms: reference to leaflet WMS object
const LAYERS = {};

/**
 * Initialise layers object
 */
function buildStateStruct() {
  LAYER_NAMES.forEach((name, i) => {
    visible = false;
    if (i === 0) { // Set the first layer to be visible by default
      visible = true;
    }
    LAYERS[name] = {
      visible,
      wms: L.tileLayer.wms(API_URL, {
        layers: name,
        transparent: true,
        format: 'image/png',
      }),
    };
  });
};

/**
 * Generate all options in the layer select box
 */
function generateLayerOptions() {
  const SELECT = document.getElementById('layer-select');
  LAYER_NAMES.forEach((name) => {
    const OPTION = document.createElement('option');
    OPTION.textContent = name;
    OPTION.value = name;
    SELECT.appendChild(OPTION);
  })
}

/**
 * Draw all visible layers
 */
function drawLayers() {
  Object.keys(LAYERS).forEach((layerKey) => {
    if (LAYERS[layerKey].visible) {
      LAYERS[layerKey].wms.addTo(MAP);
    } else {
      LAYERS[layerKey].wms.remove();
    }
  })
}

document.getElementById('layer-select').addEventListener('change', (event) => {
  const layerName = event.currentTarget.value;
  LAYERS[layerName].visible = true;
  drawLayers();
});

/**
 * Main function
 */
(function () {
  buildStateStruct();
  generateLayerOptions();
  drawLayers();
})();
