// Contents:
//      Location Data
//      Map Initialization
//      Initialize Location Data
//      Event Listeners
//      Event Listener Callbacks
//      Navigation
//      Weather
//      Scrolling Tools
//      Geolocation Tools
//      Navigation Loading Spinner
//      Populate Dropdowns & Lists
//      Mobile
//      Select Map Buildings onclick
//      Other

////////////////////
// Location Data
///////////////////

// TODO: Populate buildingLocations, libraryLocations, busLocations dynamically from Nodes.txt

// Maps locations to their latitude and longitude coordinates.
var buildingLocations = {}

var libraryLocations = {
    "Suzzallo Library": [47.65578389645157, -122.30815422653524],
    "Allen North": [47.65570394658331, -122.30715296533181],
    "Allen South": [47.655373676690964, -122.3069516908259],
    "Odegaard Library": [47.65661065901535, -122.31036360163384],
    "Engineering Library": [47.65465642494313, -122.30448276388466],
    "Gowen Library": [47.656411266735155, -122.30783977331431]
}

var busLocations = {
    "Stevens Way and Okanogan Ln": [47.652027, -122.308655],
    "W Stevens WAY NE and Okanogan LN NE": [47.652172, -122.308624],
    "W Stevens Way and Rainier Vista NE": [47.652389, -122.306305],
    "Stevens Way and Rainier Vista NE": [47.652329, -122.306099],
    "Stevens Way and Benton Ln": [47.653736, -122.305023],
    "E Stevens WAY NE and Jefferson RD NE": [47.654503, -122.305130],
    "Stevens Way and Asotin Pl": [47.654377, -122.310486],
    "NE Pacific Pl and NE Pacific St": [47.650505, -122.306908],
    "NE Pacific Pl and Montlake Blvd NE - Bay 1": [47.649143, -122.304970],
    "NE Pacific St and Montlake Blvd NE - Bay 2": [47.649727, -122.305817],
    "Montlake Blvd NE and NE Pacific Pl - Bay 3": [47.651367, -122.303604],
    "Montlake Blvd NE and NE Pacific Pl - Bay 4": [47.650494, -122.304092],
    "NE Pacific St and 15th Ave NE": [47.652351, -122.311089]
}

var locationsMap;

var navigableLocationsMap;

// Stores the building/library/bus-stop marker currently on the map.
var mapMarkers = [];

// Stores the "current location" marker on the map.
var locationMarkers = [];

// Stores the current path on the map.
var geoJSONPaths = [];

// Maps content section id's (for Navigation, Buildings, etc.) to pixel heights.
var dropDownLengths = {
    "navSection": "160px",
    "buildingsSection": "200px",
    "stopSection": "200px",
    "aboutSection": "130px",
    "librariesSection": "200px",
    "feedbackSection": "120px"
}

// Maps search bar id's to the class of items being searched.
var searchItemsClass = {
    "buildingsSearch": "building",
    "busStopSearch": "bus-stop",
    "librariesSearch": "library"
}

// Maps search bar ids to the container id of the items being searched.
var searchItemsContainer = {
    "buildingsSearch": "building-container",
    "busStopSearch": "bus-stop-container",
    "librariesSearch": "library-container"
}

////////////////////////
// Map Initialization
////////////////////////

// Initializes the map using the Mapbox API and Leaflet.
var mymap = L.map('map').setView([47.654047, -122.30854], 16);
L.tileLayer( 'https://api.mapbox.com/styles/v1/aferman/ckhvetwgy0bds19nznkfvodbx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWZlcm1hbiIsImEiOiJja2ZrZXJvbjUwZW5wMnhxcjdyMXc3ZjRnIn0.WGdId2uO9XokPaJmaxlLXg', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( mymap );
var r = [-122.32296105, 47.64674039, -122.28707804, 47.66318327]
var w = new L.LatLngBounds(new L.LatLng(r[1],r[0]),new L.LatLng(r[3],r[2]))
var y, z, A = {
    minZoom: 10,
    maxZoom: 20,
    bounds: w,
    opacity: 1,
    attribution: 'Rendered with <a href="http://www.maptiler.com/">MapTiler</a>',
    tms: !1,
    className: "uw-tilelayer"
};
z = "https://www.washington.edu/maps/wp-content/themes/maps-2014/tiles/retina/{z}/{x}/{y}.png"
// y = L.tileLayer(z, A).addTo(mymap);
mymap.zoomControl.setPosition('bottomright');
var pathGroup = new L.LayerGroup();
pathGroup.addTo(mymap);

/////////////////////
// Initialize Location Data
/////////////////////
fetch('https://hnavcontent.azurewebsites.net/PublishedNodes.txt')
.then(res => res.text())
.then(data=>{
    parseNodes(data);
    // Display list data
    populateList(buildingContainer, buildingLocations, "building");
    populateList(busStopContainer, busLocations, "bus-stop");
    populateList(librariesContainer, libraryLocations, "library");
    // Display nav option data
    populateNavOptions([buildingLocations, libraryLocations, busLocations], startSelection);
    populateNavOptions([buildingLocations, libraryLocations, busLocations], destSelection);
    // Highlight nearest when hovering
    mymap.on('mousemove', highlightNearest);
    // Initialize Data
    locationsMap = Object.assign({}, buildingLocations, libraryLocations, busLocations);
    navigableLocations = Object.assign({}, buildingLocations, libraryLocations);
    // Add event listeners to location list items
    addListenersToLists();
});

/////////////////////
// Event Listeners
/////////////////////

// Gets DOM elements.
var locationElements
var fromElement = document.getElementById("from");
var toElement = document.getElementById("to");
var distanceElement = document.getElementById("distance");
var etaElement = document.getElementById("eta");
var buildingElements = document.getElementsByClassName("building");
var busStopElements = document.getElementsByClassName("bus-stop");
var selectElements = document.getElementsByClassName("select");
var searchBars = document.getElementsByClassName("searchBar");
var buildingContainer = document.getElementById("building-container");
var busStopContainer = document.getElementById("bus-stop-container");
var librariesContainer = document.getElementById("library-container");
var horizontalBar = document.getElementById("horizontalBarId");
var leftSideBar = document.getElementById("sidebarLeft");
var logo = document.getElementById("logo");
var titleElements = document.getElementById("titleElements");
var navBttn = document.getElementById("navBtn");
var title = document.getElementById("title");
var footer =  document.getElementById("footer");
var locationIcon = document.getElementById("locationIcon");
var weatherPopup = document.getElementById("weatherPopup");
var weatherIcon = document.getElementById("weatherIcon");
var weatherIconMini = document.getElementById("weatherIconMini"); // icon within popup
var weatherArrow = document.getElementById("arrow");
var weatherPopupBody = document.getElementById("weatherPopupBody");
var weatherPopupHeader = document.getElementById("weatherPopupHeader");
var weatherPopupData = document.getElementById("weatherPopupData");
var feedbackInput = document.getElementById("feedbackInput");
var titleSlant = document.getElementById("title-slant");
var wordmark = document.getElementById("uw-wordmark");
var expandIcon = document.getElementById("expand-icon-div");
const startSelection = document.getElementById("startingPointsId");
const destSelection = document.getElementById("destinationsId");
const contentSections = document.getElementsByClassName("contentSection");
const closeDevX = document.getElementById("close-dev-x");
const devResources = document.getElementById("dev-resources");

// Adds event listeners.
logo.addEventListener("click", toggleContent);
navBttn.addEventListener("click", tryNav);
locationIcon.addEventListener("click", setViewToUW);
weatherIcon.addEventListener("click", toggleWeatherPopup);
closeDevX.addEventListener("click", closeDevResources);
document.getElementById("submitFeedback").addEventListener("click", sendFeedback);
document.getElementById("startingPointsId").addEventListener("change", updateStart);
document.getElementById("destinationsId").addEventListener("change", updateDest);
document.getElementById("themeCheckbox").addEventListener("change", toggleTheme);
// Adds click listeners to each dropdown header.
document.getElementById("navHeader").addEventListener("click", () => {
    toggleDropdown(document.getElementById("navSection"));
});
document.getElementById("buildingsHeader").addEventListener("click", () => {
    toggleDropdown(document.getElementById("buildingsSection"));
});
document.getElementById("stopHeader").addEventListener("click", () => {
    toggleDropdown(document.getElementById("stopSection"));
});
document.getElementById("aboutHeader").addEventListener("click", () => {
    toggleDropdown(document.getElementById("aboutSection"));
});
document.getElementById("librariesHeader").addEventListener("click", () => {
    toggleDropdown(document.getElementById("librariesSection"));
});
document.getElementById("feedbackHeader").addEventListener("click", () => {
    toggleDropdown(document.getElementById("feedbackSection"));
});

// Adds event listeners to each search bar.
for (var i = 0; i < searchBars.length; i++) {
    searchBars[i].addEventListener("keyup", handleNewInput);
}

// Other
var startCircle;
var endCircle;
var drawCircle = true;
var numCircles = 0;

/////////////////////////////
// Event Listener Callbacks
/////////////////////////////

// Sends feedback via Elastic Email SMTP using the SMTP API.
function sendFeedback() {
    Email.send({
        SecureToken : "43eb7cdf-90cc-489b-b77a-4b94117cf958",
        To : 'huskynavigationfeedback@gmail.com',
        From : "huskynavigationfeedback@gmail.com",
        Subject : "Feedback Form Response [" + new Date() + "]",
        Body : "Feedback Message: " + feedbackInput.value
    }).then(
        alert("Feedback sent successfully!")
    );
}

// Toggles visibility of the weather popup.
function toggleWeatherPopup() {
    if (weatherPopup.style.height != "0px") {
        weatherPopup.style.height = "0px";
        weatherArrow.style.height = "0px";
    } else {
        weatherPopup.style.height = "110px";
        weatherArrow.style.height = "10px";
    }
}

// Toggles the overall color theme.
function toggleTheme() {
    if (this.checked) { // Represents dark mode.
        horizontalBar.style.backgroundColor = "#202225";
        leftSideBar.style.backgroundColor = "#202225";
        titleElements.style.backgroundColor = "#202225";
        weatherArrow.style.fill = "#202225";
        weatherPopupBody.style.backgroundColor = "#202225";
        wordmark.src = "uwWordmarks/UnivWaWordmark.png";
        title.style.color = "whitesmoke";
        logo.src = "logos/HuskyNavLogoDarker.png";
        logo.style.borderWidth = "0px";
        logo.style.width = "70px";
        logo.style.height = "70px";
        logo.style.marginLeft = "0px";
        logo.style.marginTop = "10px"; 
        expandIcon.style.background = "#202225"; 
        devResources.style.background = "#202225";
    } else { // Represents light mode.
        horizontalBar.style.backgroundColor = "#4b2e83";
        leftSideBar.style.backgroundColor = "#4b2e83";
        titleElements.style.backgroundColor = "whitesmoke";
        weatherArrow.style.fill = "#4b2e83";
        weatherPopupBody.style.backgroundColor = "#4b2e83"
        wordmark.src = "uwWordmarks/UnivWaWordmarkPurple.png";
        title.style.color = "#4b2e83";
        logo.src = "logos/HuskyNavLogoWhite.png";
        logo.style.borderWidth = "5px";
        logo.style.width = "60px";
        logo.style.height = "60px";
        expandIcon.style.background = "#4b2e83"; 
        devResources.style.background = "#4b2e83";
    }
}

// Handles new input in a search bar. Scrolls to the matching location element in the
// search bar's corresponding list of location elements using the prefix.
function handleNewInput() {
    var els = document.getElementsByClassName(searchItemsClass[this.id]);
    var container = document.getElementById(searchItemsContainer[this.id]);
    scrollToLocation(this.value, els, container);
}

// Toggles visibility of dropdown represented by each left sidebar header.
function toggleDropdown(sec) {
    var size = dropDownLengths[sec.id];
    if (sec.style.height == "0px") {
        sec.style.height = size;
        // hide all other sections if small screen
        if (window.innerWidth <= 600) {
            for (var i = 0; i < contentSections.length; i++) {
                const curSec = contentSections[i];
                if(curSec != sec) {
                    curSec.style.height = "0px";
                }
            }
        }
    } else {
        sec.style.height = "0px";  
    }
    console.log(window.innerWidth);
    
}

// Scrolls to the first location containing the given prefix, from the given list
// of elements (els) in the given container (holder).
function scrollToLocation(prefix, els, holder) {
    prefix = prefix.toLowerCase();
    for (var i = 0; i < els.length; i++) {
        var currentPrefix = els[i].innerHTML.substring(0, prefix.length).toLowerCase();
        if (prefix === currentPrefix) {
            scroll(els[i], holder);
            break;
        } 
    }
}

// [Currently Unused]
// Updates the opacities of the location elements when the caller is scrolled.
function updateLocationOpacities() {
    for (var i = 0; i < locationElements.length; i++) {
        if (isElementCentered(locationElements[i], busStopContainer) || isElementCentered(locationElements[i], buildingContainer)) {
            locationElements[i].style.opacity = 1;
        } else {
            locationElements[i].style.opacity = 0.2;
        }
    }
}

// Sets the map view to the caller's corresponding latitude and longitude location.
function setViewToLocation() {
    var coords = locationsMap[this.innerHTML];
    mymap.setView(coords, 30);
    // Remove previous marker
    if (mapMarkers.length > 0) {
        mapMarkers[0].remove();
        mapMarkers.pop();
    }
    var locMarker = L.marker(coords).addTo(mymap);
    mapMarkers.push(locMarker);
    toggleSideBarMobile();
}

// Sets the start text in the horizontal bar to the caller's text when the caller is changed.
function updateStart() {
    endLoading();
    removePath();
    
    if (drawCircle) {
        setStartCircle(buildingLocations[this.value], true);
    }
    
    const newLocation = this.value;
    fromElement.style.opacity = 0;
    // Gives css transition time to operate 
    window.setTimeout(function () {
        fromElement.innerHTML = newLocation;
        fromElement.style.opacity = 1;
    }, 100);
    drawCircle = true;
    // navIfTwoCircles();
}

// Sets the end text in the horizontal bar to the caller's text when the caller is changed.
function updateDest() {
    endLoading();
    removePath();
    if (drawCircle) { // includes the case where it's undefined
        setEndCircle(buildingLocations[this.value], true);
    }

    const newLocation = this.value;
    toElement.style.opacity = 0;
    // Gives css transition time to operate
    window.setTimeout(function () {
        toElement.innerHTML = newLocation;
        toElement.style.opacity = 1;
    }, 100);
    drawCircle = true;
    // navIfTwoCircles();
}

function removePath() {
    if (geoJSONPaths.length > 0) {
        geoJSONPaths[0].remove();
        geoJSONPaths.pop();
    }
}

function navIfTwoCircles() {
    if (numCircles == 2) {
        window.setTimeout(()=>{navBttn.click();}, 400);
    }
}

// Attempts navigation when the caller is clicked. If location endpoints are unique and if
// neither are set to the default, then it navigates. Otherwise, it creates an alert.
function tryNav() {
    var from = fromElement.innerHTML;
    var to = toElement.innerHTML;
    if (navPossible(from, to)) {
        beginLoading();
        nav(from, to);
        
    } else {
       alert("Invalid. Try again.");
    }
}

// Toggles visbility of the left sidebar when the logo is clicked.
function toggleContent() {
    var sidebarLeft = document.getElementById("sidebarLeft");
    var horizontalBar = document.getElementById("horizontalBarId");
    if (sidebarLeft.style.width == "0px") {
        sidebarLeft.style.opacity = 1;
        sidebarLeft.style.width = "288px";
        horizontalBar.style.width = "calc(100% - 398px)";
    } else {
        sidebarLeft.style.opacity = 0;
        sidebarLeft.style.width = "0px";
        horizontalBar.style.width = "calc(100% - 90px)";
    }
}

function closeDevResources() {
    devResources.style.opacity = 0;
}

///////////////////////////
// Navigation
//////////////////////////

// Return whether navigation is possible. If location endpoints are unique and if 
// neither are set to their defaults, then it returns true. Otherwise, false.
function navPossible(from, to) {
    return from != "Select Starting Point" && to != "Select Destination" && to != from;
}

// Sets the map view to contain both endpoints. Allows navigation using AJAX to connect
// to the back-end server hosted with Azure. Draws path and displays information.
function nav() {
    setNavView(locationsMap[fromElement.innerHTML], locationsMap[toElement.innerHTML]);
    var GETurl = "https://huskynavigationserver2.azurewebsites.net/api/pathfind?start=" 
        + fromElement.innerHTML.replace(/\s/g, '') // Remove space from start.
        + "&end=" + toElement.innerHTML.replace(/\s/g, ''); // Remove space from end.
    // var testGETurl = "https://huskynavigationserver2.azurewebsites.net/api/pathfind?start=BagleyHall&end=GuggenheimHall";
    fetch(GETurl)
        .then(res => res.json())
        .then(res => {
            if (geoJSONPaths.length > 0) {
                geoJSONPaths[0].remove();
                geoJSONPaths.pop();
            }
            console.log(res);
            distanceElement.innerHTML = "Distance: " + roundTen(res.distance) + " mi";
            etaElement.innerHTML = "ETA: " + roundTen(res.eta) + " min";
            var style = {
                weight: 3,
                dashArray: '5, 10',
                lineCap: 'square', // Optional, just to avoid round borders.
                color: 'black'
            }
            var path = L.geoJSON(res.pathGeoJSON, style).addTo(mymap);
            geoJSONPaths.push(path);
            endLoading();
            toggleSideBarMobile("off");
    });
}

// Sets the map view to contain the given latitude and longitude endpoints.
function setNavView(coord1, coord2) {
    console.log(coord1);
    console.log(coord2);
    mymap.flyToBounds([coord1, coord2], {maxZoom: 17});
}

////////////////////////
// Weather
//////////////////////

// Gathers the weather data by using the Open Weather Map API.
function weatherBalloon() {
    fetch("https://api.openweathermap.org/data/2.5/weather?q=Seattle&appid=0eabe4f0d958928ef5fbeb6346eade3c")  
        .then(res => res.json())
        .then(res => {
            var tempK = res.main.temp;
            var tempF = roundTen((tempK - 273.15) * 9/5 + 32);
            var tempC = roundTen(tempK - 273.15);
            var wind = roundTen(res.wind.speed);
            var humidity = res.main.humidity;
            var weather = res.weather[0].main;
            var iconcode = res.weather[0].icon;
            updateData(tempF, tempC, wind, weather, humidity, iconcode);
        })
        .catch(e => console.log("Error with weather API fetch: " + e));
}

// Updates to the given icon and displays the given data.
function updateData(tempF, tempC, wind, weather, humidity, iconcode) {
    // Updates the icon.
    weatherIcon.src = "openWeatherIcons/" + iconcode + ".png";
    // Update the header message.
    var adj;
    switch(weather) {
        case "Rain":
            adj = "Rainy";
            break;
        case "Mist":
            adj = "Misty";
            break;
        case "Snow":
            adj = "Snowing";
            break;
        case "Clouds":
            adj = "Cloudy";
            break;
        case "Clear":
            adj = "Clear";
            break;
        case "Hazy":
            adj = "Hazy";
            break;
        default:
            adj = "Clear";
            break;
    }
    var header = "It's " + adj + " in Seatte Now!"
    // Updates the icon.
    weatherPopupHeader.innerHTML = header;
    // Updates the popup icon
    if (humidity > 75 && weather != "Clear") {
        weatherIconMini.src = "umbrellaIcons/RainIcon.png";
    } else {
        weatherIconMini.src = "umbrellaIcons/NoRainIcon.png";
        weatherIconMini.style.width = "35px";
        weatherIconMini.style.height = "35px";
    }
    // Updates the popup data
    weatherPopupData.innerHTML = tempF + "&#176F / " + tempC + "&#176C <br> " + wind + " <small>MPH</small> Wind";
}

// Returns the given number rounded to the nearest tenth.
function roundTen(num) {
    return Math.round(num * 10) / 10;
}

// Sets up weather data on startup.
weatherBalloon();

////////////////////////////
// Scrolling Tools
////////////////////////////

// [Currently Unused]
// Returns whether the given element is centered in the given container.
function isElementCentered (el, holder) {
    const { y } = el.getBoundingClientRect()
    const holderRect = holder.getBoundingClientRect()
    if (y <= holderRect.bottom - 50 && y >= holderRect.top + 50) {
        return true;
    } else {
        return false;
    }
}

// Scrolls the given element to the center of the given container if possible.
function scroll(el, holder) {
    var topPos = el.offsetTop;
    holder.scrollTop = topPos - 40;
}

//////////////////////////
// Geolocation Tools
//////////////////////////

// Sets the view to UW
function setViewToUW() {
    mymap.setView([47.654047, -122.30854], 16);
}

// Goes to the given position on the map and gives alert if outside campus.
function goToPosition(position) {
    // Removes previous markers.
    if (locationMarkers.length > 0) {
        locationMarkers[0].remove();
    }
    // Adds new location marker.
    var coords = [position.coords.latitude, position.coords.longitude];
    var locMarker = L.marker(coords/*, {icon: redIcon}*/).addTo(mymap);
    // Set view.
    mymap.setView(coords);
    // Update previous marker value.
    mapMarkers.push(locMarker);
    // Check whether user is inside campus.
    var inXBounds = coords[0] > 47.656183871790766 && coords[0] < 47.66121658241639;
    var inYBounds = coords[0] > -122.30475545604999 && coords[0] < -122.30798213509433;
    if (!inXBounds || !inYBounds) {
        // Gives map time to reach the current location of the user.
        window.setTimeout(() => {
        alert("You appear to be outside the University of Washington campus. Please note that our service works best for locations near the campus.")
        }, 500);
    }

}

//////////////////////////
// Navigation Loading
//////////////////////////
const spinner = '<span class="spinner"></span>';
/*
function toggleLoading() {
    if (!navBttn.classList.contains('loading')) {
		navBttn.classList.add('loading');
        navBttn.innerHTML = spinner;
	}
	else {
		navBttn.classList.remove('loading');
        navBttn.innerHTML = 'Navigate';
	}
}
*/


function beginLoading() {
    navBttn.classList.add('loading');
    navBttn.innerHTML = spinner;
}

function endLoading() {
    navBttn.classList.remove('loading');
    navBttn.innerHTML = 'Navigate';
}

////////////////////
// Populate Dropdowns & Lists
///////////////////
function populateNavOptions(locGroups, selection) {
    const labelMap = ["Buildings", "Libraries", "Bus Stops"];
    locGroups.forEach( (group, i) => {
        selection.innerHTML += "<optgroup label=\"" + labelMap[i] + "\"></optgroup>";
        for (const buildingName in group) {
            selection.innerHTML += "<option value=\"" + buildingName + "\">" + buildingName + "</option>";
        }
    });
}


function populateList(list, names, className) {
    for (const name in names) {
        list.innerHTML += "<p class=\"" + className + " location\">" + name + "</p>";
    }
}

//////////////////////////
// Mobile
//////////////////////////

var isOpen = false;
// toggle sidebar when sidebar toggle button clicked
function toggleSideBarMobile(cmd) {
    if (document.documentElement.clientWidth <= 600) {
        if (cmd == "off") {
            leftSideBar.style.height = (document.getElementById("titleElements").offsetHeight + 10) + "px";
            leftSideBar.scrollTop = 0;
            return;
        }
    
        if (isOpen) {
            leftSideBar.style.height = (document.getElementById("titleElements").offsetHeight + 10) + "px";
            leftSideBar.scrollTop = 0;
        } else {
            leftSideBar.style.height = "calc(70% - 40px)";
        }
        isOpen = !isOpen;
    }
}
resizeElements();
// Resize left sidebar when window resizes
function resizeElements() {
    if (document.documentElement.clientWidth > 600) {
        leftSideBar.style.height = "calc(100% - 20px)";
        devResources.style.display = "inline-block";
    } else {
        leftSideBar.style.height =  (document.getElementById("titleElements").offsetHeight + 10) + "px";
        devResources.style.display = "none";
    }
}

window.addEventListener('resize', resizeElements);

// When user finishes zooming, set path style to dashed if zoomed in
// or solid otherwise.
mymap.on('zoomend', function() {
    const curZoom = mymap.getZoom();
    console.log(curZoom);
    geoJSONPaths[0] ? geoJSONPaths[0].setStyle(() => { // if geoJSONPaths[0] is defined
        return curZoom < 17 ? { // if zoom is low
            dashArray: '1, 1'
        }:{ // if zoom is high
            dashArray: '5, 10'
        }
    }) : ()=>{}; // if undefined, do nothing
});

// When user finishes zooming, alert user if zoomed out too much 
mymap.on('zoomend', function() {
    const curZoom = mymap.getZoom();
    if (curZoom < 10) {
        alert("You have zoomed out too much!");
        mymap.setZoom(10);
    }
});

////////////////////
// Select Map Buildings onclick
///////////////////

// Onclick Event
mymap.on('click', handleMapClick)

function handleMapClick(ev) {
    const latlng = [ev.latlng.lat, ev.latlng.lng];
    const nearest = findNearestLoc(latlng);
    numCircles = 0;
    startCircle ? numCircles+=1 : numCircles+=0;
    endCircle ? numCircles+=1 : numCircles+=0;
    console.log(numCircles);
    switch(numCircles) {
        case 0:
            setStartCircle(nearest.latlng);
            ev.target ? updateDropdown(startSelection, nearest.index, false) : null;
            break;
        case 1:
            if (nearest.index == startSelection.selectedIndex){
                // alert("Invalid. Try again.");
                break;
            }
            setEndCircle(nearest.latlng);
            ev.target ? updateDropdown(destSelection, nearest.index, true) : null;
            break;
        case 2:
            if (nearest.index == destSelection.selectedIndex || nearest.index == startSelection.selectedIndex){
                // alert("Invalid. Try again.");
                break;
            }
            ev.target ? updateDropdown(startSelection, destSelection.selectedIndex, true): null;
            startCircle.remove();
            startCircle = endCircle;
            
            setEndCircle(nearest.latlng);
            ev.target ? updateDropdown(destSelection, nearest.index, true) : null;
            // startCircle.remove();
            // startCircle = endCircle;
            // setEndCircle(nearest.latlng);
            break;
    }
}

function setStartCircle(latlng, removeOld) {
    startCircle && removeOld ? startCircle.remove() : null;
    startCircle = L.circle(latlng, {radius: 15, weight:13, color: 'green', opacity: 0.5, fillOpacity: 0, className: 'circle-transition'}).addTo(mymap);
}

function setEndCircle(latlng, removeOld) {
    endCircle && removeOld ? endCircle.remove() : null
    endCircle = L.circle(latlng, {radius: 15, weight:13, color: 'green', opacity: 0.5, fillOpacity: 0, className: 'circle-transition'}).addTo(mymap);
}

function updateDropdown(selection, index, isEnd) {
    selection.selectedIndex = index;
    drawCircle = false;
    selection.dispatchEvent(new Event('change'));
    if (isEnd) {
        window.setTimeout(()=>{navBttn.click();}, 400);
    }
}

// Find location closest to selected circle
function findNearestLoc(latlng) {
    var nearest = {"index": 0, "name": "Red Square", "latlng": navigableLocations["Planetarium"]};
    for(const loc in navigableLocations) {
        const buildingLatlng = navigableLocations[loc];
        if (dist(buildingLatlng, latlng) < dist(nearest.latlng, latlng)) {
            const buildingIndex = startSelection.innerHTML.split('n>').findIndex(opt => opt.includes(loc));
            nearest = {"index": buildingIndex ,"name": loc, "latlng": buildingLatlng}
        }
    }
    return nearest;
}

var hoverCircles = [];
function highlightNearest(ev) {
    hoverCircles.forEach(circ => circ.remove());
    hoverCircles = [];
    const latlng = [ev.latlng.lat, ev.latlng.lng];
    var circle = L.circle(latlng, {radius: 15, weight:10, color: 'yellow', opacity: 0.7, fillOpacity: 0, className: 'circle-transition'}).addTo(mymap);
    hoverCircles.push(circle);
    const nearest = findNearestLoc(latlng);
    circle.setLatLng(nearest.latlng);
}

// Remove hover circles when mouse leaves map
mymap.on('mouseout', removeHoverCircles);

function removeHoverCircles() {
    hoverCircles.forEach(circ => circ.remove());
    hoverCircles = [];
}

// calculates euclidean distance between two 2d arrays
function dist(n, m) {
    return Math.sqrt(square(n[0] - m[0]) + square(n[1] - m[1]));
}

// returns squared number
function square(a) {
    return a*a;
}

function parseNodes(nodesTxt) {

    //splits code into lines
    var lines = nodesTxt.replaceAll("\r\n", ",").split(",");


    //finds the number of unique nodes
    var nodeCount = parseInt(lines[0]);

    for(i = 1; i <= nodeCount; i++) {
        
        var elements  = lines[i].split(" ");

        var name = elements[3];

        //formats node names correctly
        //e.g. "MeanyHall" -> "Meany Hall" 
        var spacePositions = [];
        var offset = 0;
        for(j = 0; j < name.length; j++) {

            var c = name.charAt(j);

            //somehow finds correct spots for spaces
            if(j > 0 && c == c.toUpperCase() && !parseInt(c) && c != '0' &&
                name.charAt(j + 1) != name.charAt(j + 1).toUpperCase()) {
                spacePositions.push(j + offset);
                offset++;
            }
        }

        //update without concurrent modification
        spacePositions.forEach(pos => {
            name = name.substring(0, pos) + " " + name.substring(pos);
        });

        // if...
        //      name starts with R OR N, AND the rest of name is an integer
        //      OR
        //      name belongs to libraryLocations
        // then its not a building
        var isBuilding = !( ((name.charAt(0) == 'R' || name.charAt(0) == 'N') && parseInt(name.substring(1))) || libraryLocations[name]);

        if(isBuilding) {
            buildingLocations[name] = [elements[1], elements[2]];
        }
    }
}

//////////////
// Other
//////////////

// Adds event listeners to each location element.
function addListenersToLists() {
    locationElements = document.getElementsByClassName("location");
    for (var i = 0; i < locationElements.length; i++) {
        locationElements[i].addEventListener('click', setViewToLocation);
    }
}