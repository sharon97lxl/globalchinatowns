mapboxgl.accessToken = 'pk.eyJ1Ijoic2hhcm9uOTdsaSIsImEiOiJjbW5pM2I4YXgwOTBjMnFwcHl1MDQ2bm82In0.cnc2hjzuK1oBWdo6VIBKNQ';
// Modal functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('openingmodal');
  const exploreBtn = document.querySelector('.modalbtn');

  const closeModal = () => {
    modal.style.display = 'none';
  };

  if (exploreBtn) exploreBtn.addEventListener('click', closeModal);
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
  const isLargeAsianPopulation = chinatowns["Population over 10000?"] === "Yes" && chinatowns["Majority Chinese or Asian population?"] === "Yes";
  const isLargePopulation = chinatowns["Population over 10000?"] === "Yes";

  if (isLargeAsianPopulation) {
    el.className = 'custom-marker custom-marker-residence';
  } else if (isLargePopulation) {
    el.className = 'custom-marker custom-marker-large';
  } else {
    el.className = 'custom-marker';
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
           <b>Population over 10,000?</b> ${chinatowns["Population over 10000?"]}<br></br>
           <b>Majority Chinese or Asian population?</b> ${chinatowns["Majority Chinese or Asian population?"]}<br></br>
           <b>Paifang?</b> ${chinatowns["Paifang?"]}</p>
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