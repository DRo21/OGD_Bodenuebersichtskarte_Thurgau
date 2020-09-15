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
    let visible = false;
    if (i === 0) { // Set the first layer to be visible by default
      visible = true;
    }
    LAYERS[name] = {
      visible,
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
  const LAYER_CHECK = document.getElementById('layer-check');
  const UL = document.createElement("UL");
  UL.setAttribute("id", "layer-list");
  document.getElementById("layer-check").appendChild(UL);
  LAYER_NAMES.forEach((name, i) => {
    const LI = document.createElement("LI");
    const CHECK = document.createElement('input');
    CHECK.type = 'checkbox';
    CHECK.id = name;
    CHECK.classList.add('CHECK');
    if (i === 0) {
      CHECK.checked = true;
    }
    LI.appendChild(CHECK);
    const LABEL = document.createElement('label');
    LABEL.textContent = name;
    LABEL.for = name;
    LI.appendChild(LABEL);
    document.getElementById("layer-list").appendChild(LI);
  });
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
  });
}

document.getElementById('layer-check').addEventListener('change', (event) => {
  if (event.target.classList.contains('CHECK')) {
    const CHECKBOXES = document.getElementsByClassName('CHECK');
    for (let i = 0; i < CHECKBOXES.length; i += 1) {
      if (CHECKBOXES[i].checked) {
        LAYERS[CHECKBOXES[i].id].visible = true;
      } else {
        LAYERS[CHECKBOXES[i].id].visible = false;
      }
    }
    drawLayers();
  }
});

document.getElementById('slider').addEventListener('change', () => {
  const SLIDER_VALUE = document.getElementById('slider').value;
  Object.values(LAYERS).forEach((layer) => {
    layer.wms.setOpacity(SLIDER_VALUE / 100);
  });
  drawLayers();
});

/**
 * Main function
 */
(function main() {
  // eslint-disable-next-line no-undef
  L.tileLayer.wms('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMAP</a> contributors',
    opacity: 0.5,
  }).addTo(MAP);

  buildStateStruct();
  generateLayerOptions();
  drawLayers();
}());
