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
  langSelect.value = lang;
}

// eslint-disable-next-line no-undef
const MAP = L.map('map', {
  center: [47.55, 9.05],
  zoom: 10,
});

const legendsCont = document.getElementsByClassName('sidebar__legend')[0];
const langSelect = document.getElementById('lang-select');
const LAYER_SELECT = document.getElementById('layer-select');

langSelect.addEventListener('change', () => {
  const lang = langSelect.value;
  const url = new URL(window.location.href);
  url.search = `?lang=${lang}`;
  window.location.href = url.href;
});

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

async function displayLegend() {
  const req = await fetch(`/api.php?layer=${selectedLayer.name}`, {
    method: 'GET'
  })
  const json = await req.json();

  const ul = document.createElement('ul');
  json.forEach((legend) => {
    ul.innerHTML += `
    <div class="leg-item">
      <img class="leg-item__img" src="src/res/legend_icons/${legend.icon}.svg">
      <p class="leg-item__label">${legend.label[lang]}</p>
    </div>
    `;
  });
  legendsCont.innerHTML = '';
  legendsCont.appendChild(ul);
}

LAYER_SELECT.addEventListener('change', async () => {
  selectedLayer.wms.remove();
  selectedLayer.name = LAYER_SELECT.value;
  drawLayer();
  displayLegend();
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
  displayLegend();
}());
