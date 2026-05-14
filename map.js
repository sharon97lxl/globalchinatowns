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
  projection: 'globe', // display the map as a globe
  zoom: 3, // initial zoom level, 0 is the world view, higher values zoom in
  center: [-73.94693, 40.71312] // center the map on this longitude and latitude
});


//putting markers on the map
chinatownsdata.forEach(chinatowns => {
  const el = document.createElement('div');
  const sixteenc = chinatowns["Century"] === "16th Century";
  const eighteenc = chinatowns["Century"] === "18th Century"
  const nineteenc = chinatowns["Century"] === "19th Century";
  const twentiethc = chinatowns["Century"] === "20th Century";
  const twentyfirstc = chinatowns["Century"] === "21st Century";

  if (sixteenc) {
    el.className = 'custom-marker custom-marker-16c';
  } else if (eighteenc) {
    el.className = 'custom-marker custom-marker-18c';
  } else if (nineteenc) {
    el.className = 'custom-marker custom-marker-19c';
  } else if (twentiethc) {
    el.className = 'custom-marker custom-marker-20c';
  } else if (twentyfirstc) {
    el.className = 'custom-marker custom-marker-21c';
  }

  const popup = new mapboxgl.Popup({
    offset: 10,
    closeButton: false,
    closeOnClick: false
  }).setHTML(`
           <p class="popuph1"> ${chinatowns.Name}</p>
           <p class="popupbody"><b>City:</b> ${chinatowns.City}<br></br>
           <b>Country:</b> ${chinatowns.Country}<br></br>
           <b>Established:</b> ${chinatowns.Year}<br></br>
           <b>Major regional sources of migrants:</b> ${chinatowns["Major regional sources of original Chinatown residents"]}<br></br>
       `
  );

  const marker = new mapboxgl.Marker(el)
    .setLngLat([chinatowns.longitude, chinatowns.latitude])
    .addTo(map);


  //pop up event listens
  // show popup on hover
  el.addEventListener('mouseenter', () => {
    popup.setLngLat([chinatowns.longitude, chinatowns.latitude]).addTo(map);
  });

  // hide popup when leaving
  el.addEventListener('mouseleave', () => {
    popup.remove();
  });
});
// add province boundaries after the map style has loaded
//map.on('load', () => {map.addSource("regionalboundaries", {
// type: "geojson",
// data: "mapdata/provinces-boundaries.geojson"
//  });

 // map.addLayer({
 //   id: "regionalboundariespolygons",
   // type: "fill",
    //source: "regionalboundaries",
    //paint: {
    //  'fill-color': '#e4414f',
      //'fill-opacity': 0.35,
      //'fill-outline-color': '#8b1b23'
   // }
 // });
//});