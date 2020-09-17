/*
  Copyright (c) 2020 Dario Romandini, Michel Fäh, Elias Baumgartner
*/

const ACCESS_KEY = 'YoW2syIQ4xe0ccJA';
const API_URL = `https://map.geo.tg.ch/proxy/geofy_chsdi3/bodenuebersicht-profile_bohrungen?access_key=${ACCESS_KEY}`;
const LAYERS = [
  {
    name: 'Hauptboden',
    displayName: 'Hauptboden',
  },
  {
    name: 'ubuflach_bt_al',
    displayName: 'Bodentyp Hauptboden Landwirtschaft',
  },
  {
    name: 'ubuflach_k_ob_al',
    displayName: 'Textur Hauptboden Landwirtschaft',
  },
  {
    name: 'ubuflach_hb',
    displayName: 'Wasserhaushalt Hauptboden',
  },
  {
    name: 'ubuflach_verd',
    displayName: 'Verdichtungsempfindlichkeit',
  },
  {
    name: 'Nebenboden',
    displayName: 'Nebenboden',
  },
  {
    name: 'ubuflach_nb',
    displayName: 'Wasserhaushalt Nebenboden',
  },
  {
    name: 'Begleitboden',
    displayName: 'Begleitboden',
  },
  {
    name: 'ubuflach_bb',
    displayName: 'Wasserhaushalt Begleitboden',
  },
  {
    name: 'ubuflach_re_nat',
    displayName: 'Bodenregionen (natürlich)',
  },
  {
    name: 'ubuflach_re_ant',
    displayName: 'Bodenregionen (anthropogen)',
  },
  {
    name: 'ubufixpk',
    displayName: 'Bodenprofile und Bohrungen',
  },
];
let selectedLayer = LAYERS[0].name; // Default selected layer

// eslint-disable-next-line no-undef
const MAP = L.map('map', {
  center: [47.55, 9.05],
  zoom: 10,
});

const LAYER_SELECT = document.getElementById('layer-select');

/**
 * Initialise wms layers
 */
function addWMSLinks() {
  LAYERS.forEach((layer) => {
    layer.wms = L.tileLayer.wms(API_URL, {
      layers: layer.name,
      transparent: true,
      format: 'image/png',
    });
  });
}

/**
 * Generate all options in the layer select box
 */
function generateLayerOptions() {
  LAYERS.forEach((layer) => {
    const OPT = document.createElement('option');
    OPT.textContent = layer.displayName;
    OPT.value = layer.name;
    LAYER_SELECT.appendChild(OPT);
  });
}

/**
 * Draw all visible layers
 */
function drawLayers() {
  LAYERS.forEach((layer) => {
    if (layer.name === selectedLayer) {
      layer.wms.addTo(MAP);
    } else {
      layer.wms.remove();
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

  addWMSLinks();
  generateLayerOptions();
  drawLayers();
}());
