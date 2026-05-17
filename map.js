mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcm9uOTdsaSIsImEiOiJjbW5pM2I4YXgwOTBjMnFwcHl1MDQ2bm82In0.cnc2hjzuK1oBWdo6VIBKNQ';
// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('openingmodal');
  const exploreBtn = document.querySelector('.modalbtn');
  const legend = document.getElementById('legend');
  const header = document.getElementById('map-header');
  const closeModal = () => {
    modal.style.display = 'none';
  };
  function clickexplore() {
    closeModal();
    legend.style.display = "block";
    header.style.display = "block";
  }
  if (exploreBtn) exploreBtn.addEventListener('click', clickexplore);
});
//THE MAP
const map = new mapboxgl.Map({
  container: 'mapcontainer',
  style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
  config: {
    basemap: {
      showPedestrianRoads: false,
      showPlaceLabels: false,
      showPointOfInterestLabels: false,
      showRoadLabels: false,
      showTransitLabels: false,
      showAdminBoundaries: false,
      show3dObjects: false,
      show3dBuildings: false,
      show3dTrees: false,
      show3dLandmarks: false,
      showLandmarkIconLabels: false,
      showIndoorLabels: false,
      theme: "monochrome",
    }
  },
  projection: 'globe', 
  zoom: 2.5678, 
  center: [118.393788, 21], 
});


const chinatownMarkers = [];
let activeRegionFilter = null;
let selectedHoverName = null;

chinatownsdata.forEach(chinatowns => {
  const el = document.createElement('div');
  const century = chinatowns["Century"];

  const centuryMap = {
    "16th Century": "custom-marker-16c",
    "18th Century": "custom-marker-18c",
    "19th Century": "custom-marker-19c",
    "20th Century": "custom-marker-20c",
    "21st Century": "custom-marker-21c"
  };

  el.className = 'custom-marker ' + (centuryMap[century] || 'custom-marker-21c');

  const markpopup = new mapboxgl.Popup({
    offset: 10,
    closeButton: false,
    closeOnClick: false
  }).setHTML(`
           <p class="popuph1"> ${chinatowns.Name}</p>
           <p class="popupbody"><b>City:</b> ${chinatowns.City}<br>
           <b>Country:</b> ${chinatowns.Country}<br>
           <b>Established:</b> ${chinatowns.Year}<br>
           <b>Major regional sources of migrants:</b> ${chinatowns["Major regional sources of original Chinatown residents"]}</p>
       `
  );

  const marker = new mapboxgl.Marker(el)
    .setLngLat([chinatowns.longitude, chinatowns.latitude])
    .addTo(map);

  const regions = (chinatowns["Major regional sources of original Chinatown residents"] || "")
    .split(';')
    .map(region => region.trim().toLowerCase())
    .filter(Boolean);

  chinatownMarkers.push({ marker, regions });

  el.addEventListener('mouseenter', () => {
    markpopup.setLngLat([chinatowns.longitude, chinatowns.latitude]).addTo(map);
  });

  el.addEventListener('mouseleave', () => {
    markpopup.remove();
  });
});

function updateChinatownMarkers(filterRegion) {
  chinatownMarkers.forEach(({ marker, regions }) => {
    const shouldShow = !filterRegion || regions.includes(filterRegion);
    marker.getElement().style.display = shouldShow ? '' : 'none';
  });
}

function clearRegionFilter() {
  activeRegionFilter = null;
  selectedHoverName = null;
  updateChinatownMarkers(null);
  if (map.getLayer && map.getLayer('regionalboundaries-hover')) {
    map.setFilter('regionalboundaries-hover', ['==', ['get', 'name'], '']);
  }
}

map.on('load', () => {
  map.addSource("regionalboundaries", {
    type: "geojson",
    data: "mapdata/provinces-boundaries.geojson"
  });

  map.addLayer({
    id: "regionalboundariespolygons",
    type: "fill",
    source: "regionalboundaries",
    paint: {
      'fill-color': '#dc2932',
      'fill-opacity': 0.4,
      'fill-outline-color': '#dc2932'
    }
  });

  map.addLayer({
    id: "regionalboundaries-hover",
    type: "fill",
    source: "regionalboundaries",
    paint: {
      'fill-color': '#dc2932',
      'fill-opacity': 0.8,
      'fill-outline-color': '#dc2932'
    },
    filter: ['==', ['get', 'name'], '']
  });

  map.addLayer({
    id: "regionalboundarieslines",
    type: "line",
    source: "regionalboundaries",
    paint: {
      'line-color': '#dc2932',
      'line-width': 1
    }
  });

  const hoverPopup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mousemove', 'regionalboundariespolygons', (event) => {
    map.getCanvas().style.cursor = 'pointer';
    const hoveredFeature = event.features && event.features[0];
    if (!hoveredFeature) return;

    const hoverName = (hoveredFeature.properties.name || hoveredFeature.properties.id || '').trim();
    if (!hoverName) return;

    map.setFilter('regionalboundaries-hover', ['==', ['get', 'name'], hoverName]);
    hoverPopup.setLngLat(event.lngLat).setHTML(`<p class="popuppolybody">${hoverName}</p>`).addTo(map);
  });

  map.on('mouseleave', 'regionalboundariespolygons', () => {
    map.getCanvas().style.cursor = '';
    map.setFilter('regionalboundaries-hover', ['==', ['get', 'name'], selectedHoverName || '']);
    hoverPopup.remove();
  });

  map.on('click', 'regionalboundariespolygons', (event) => {
    const clickedFeature = event.features && event.features[0];
    if (!clickedFeature) return;

    const regionNameOriginal = (clickedFeature.properties.name || clickedFeature.properties.id || '').trim();
    const regionName = regionNameOriginal.toLowerCase();
    if (!regionName) return;

    activeRegionFilter = activeRegionFilter === regionName ? null : regionName;
    updateChinatownMarkers(activeRegionFilter);

    // toggle persistent hover highlight for the clicked polygon
    selectedHoverName = (selectedHoverName === regionNameOriginal) ? null : regionNameOriginal;
    map.setFilter('regionalboundaries-hover', ['==', ['get', 'name'], selectedHoverName || '']);
  });

  map.on('click', (event) => {
    const features = map.queryRenderedFeatures(event.point, { layers: ['regionalboundariespolygons'] });
    if (!features.length) {
      clearRegionFilter();
    }
  });
});