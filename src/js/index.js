/*
  Copyright (c) 2020 Dario Romandini, Michel Fäh, Elias Baumgartner
*/

const ACCESS_KEY = 'YoW2syIQ4xe0ccJA';
const API_URL = `https://map.geo.tg.ch/proxy/geofy_chsdi3/bodenuebersicht-profile_bohrungen?access_key=${ACCESS_KEY}`;
let selectedLayer = {
  name: 'Hauptboden'
}; // Default selected layer

let lang = 'de';

function getLang() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('lang')) {
    lang = params.get('lang');
  }
}

// eslint-disable-next-line no-undef
const MAP = L.map('map', {
  center: [47.55, 9.05],
  zoom: 10,
});

const legendsCont = document.getElementById('legend-container');
const LAYER_SELECT = document.getElementById('layer-select');

/**
 * Draw visible layer
 */
function drawLayer() {
  selectedLayer.wms = L.tileLayer.wms(API_URL, {
    layers: selectedLayer.name,
    transparent: true,
    format: 'image/png',
  });
  selectedLayer.wms.addTo(MAP);
}

LAYER_SELECT.addEventListener('change', async () => {
  selectedLayer.wms.remove();
  selectedLayer.name = LAYER_SELECT.value;
  drawLayer();

  const req = await fetch(`/api.php?layer=${LAYER_SELECT.value}`, {
    method: 'GET'
  })
  const json = await req.json();

  const ul = document.createElement('ul');
  json.forEach((legend) => {
    ul.innerHTML += `
    <li>
      <img src="src/res/legend_icons/${legend.icon}.svg" class="leg-img">
      ${legend.label[lang]}
    </li>`;
  });
  legendsCont.innerHTML = '';
  legendsCont.appendChild(ul);
});

document.getElementById('slider').addEventListener('change', (event) => {
  selectedLayer.wms.setOpacity(event.currentTarget.value / 100);
});

/**
 * Main function
 */
(function main() {
  // eslint-disable-next-line no-undef
  L.tileLayer.wms('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(MAP);
  getLang();
  drawLayer();
}());
