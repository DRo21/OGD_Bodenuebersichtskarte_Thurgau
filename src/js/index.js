/*
  Copyright (c) 2020 Dario Romandini, Michel Fäh, Elias Baumgartner
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

// eslint-disable-next-line no-undef
const MAP = L.map('map', {
  center: [47.55, 9.05],
  zoom: 10,
});

const LAYER_SELECT = document.getElementById('layer-select');

// Data structure used to track which layer is currently displayed
// Do not modify outside buildStateStruct function
// KEY: Layer name
// Attrib visible: Boolean value if layer is displayed (true) or not (false)
// Attrib wms: reference to leaflet WMS object
let selectedLayer = LAYER_NAMES[0]; // Default selected layer
const LAYERS = {};

/**
 * Initialise layers object
 */
function buildStateStruct() {
  LAYER_NAMES.forEach((name) => {
    LAYERS[name] = {
      // eslint-disable-next-line no-undef
      wms: L.tileLayer.wms(API_URL, {
        layers: name,
        transparent: true,
        format: 'image/png',
      }),
    };
  });
}

/**
 * Generate all options in the layer select box
 */
function generateLayerOptions() {
  LAYER_NAMES.forEach((name) => {
    const OPT = document.createElement('option');
    OPT.textContent = name;
    OPT.value = name;
    LAYER_SELECT.appendChild(OPT);
  });
}

/**
 * Draw all visible layers
 */
function drawLayers() {
  Object.keys(LAYERS).forEach((layerKey) => {
    if (layerKey === selectedLayer) {
      LAYERS[layerKey].wms.addTo(MAP);
    } else {
      LAYERS[layerKey].wms.remove();
    }
  });
}

LAYER_SELECT.addEventListener('change', () => {
  selectedLayer = LAYER_SELECT.value;
  drawLayers();
});

document.getElementById('slider').addEventListener('change', () => {
  const SLIDER_VALUE = document.getElementById('slider').value;
  Object.values(LAYERS).forEach((layer) => {
    layer.wms.setOpacity(SLIDER_VALUE / 100);
  });
});

/**
 * Main function
 */
(function main() {
  // eslint-disable-next-line no-undef
  L.tileLayer.wms('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(MAP);

  buildStateStruct();
  generateLayerOptions();
  drawLayers();
}());
