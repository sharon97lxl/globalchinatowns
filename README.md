<h1> Global Chinatowns</h1>
This project maps all the different Chinatowns across the world. It was created as my final project for the 
course Advanced GIS: Interactive Web Mapping and Spatial Data Visualization at the NYU Robert F. Wagner School of Public Service.

<h2>Features</h2>
<li> Urban Chinatowns plotted across the world using Mapbox GL JS</li>
<li> Color-coded marker styling driven by age of Chinatown and accompanying legend </li>
<li> Clickable filters to highlight Chinatowns that migrants from different regions established</li>
<li> Chinese province polygons rendered as separate GeoJSON layer </li>
<li> Interactive popups with basic information on each Chinatown</li>
<li> Introductory story modal</li>
<li> Header with call to action</li>

<h2> Data Used </h2>
I used a conservative measure of what counted as a Chinatown for the purposes of this project just to limit the scope of the research
- all Chinatowns listed are those that have an individual Chinatown Wikipedia page on English Wikipedia, still 'exist' (i.e. there is a continuing Chinese commercial
or residential presence in that Chinatown, and are known as a 'Chinatown' instead of another name (e.g. Asiatown). Information on date established and 
major regional sources of original migrants is based on desktop research, using sources such as Wikipedia, local government sources, academic sources (where available) 
and tourism sites.

<h3> Data Limitations </h3>
Please note that due to my research methodology outlined above, this is not an exhaustive list of all Chinatowns around the world. Importantly, many emerging and suburban 'Chinatowns'
are excluded from this map. Additionally, due to sometimes scant information on the history of individual Chinatowns available in English, data on date established and regional sources
of original migrants may not be completely accurate.

<h2> Files</h2>
<li> index.html - HTML file</li>
<li> map.js - Javascript file with Map initialization, layers, filters, popups, markers UI </li>
<li> styles.css - CSS file with all styling for map, modal, layers etc.</li>
<li> map data folder - Folder with data files for map.</li>
<ol> chinatowns.csv - csv file with tabulated data for Chinatowns</ol>
<ol> markerdata.js - GeoJSON data for Chinatowns </ol>
<ol> provinces-boundaries.geojson - GeoJSON boundary data for Chinese provinces</ol>
<li> customermarkers folder - folder containing the pngs for each custom marker. Credit: https://www.flaticon.com/authors/freepik</li>

<h2> Technologies used</h2>
<li> HTML</li>
<li> CSS</li>
<li> JS</li>
<li> Mapbox GL JS</li>
<li> GeoJSON</li>
<li> Claude</li>
