// Contents:
//      Location Data
//      Map Initialization
//      Server Interface
//      Event Listeners
//      Event Listener Callbacks
//      Navigation
//      Weather
//      Scrolling Tools
//      Other

////////////////////
// Location Data
///////////////////

// maps locations to their lng/lat coords
var locationsMap = {
    "Bagley Hall": [47.65353, -122.30879],
    "Suzzallo Library": [47.65580, -122.30818],
    "Guggenheim Hall": [47.65424, -122.30644],
    "McDonald's": [47.66774, -122.30037] 
}

// maps section ids to its height
var dropDownLengths = {
    "navSection": "160px",
    "buildingsSection": "200px",
    "stopSection": "200px",
    "aboutSection": "200px",
    "librariesSection": "200px"
}

// maps search bar ids to the class of items being searched
var searchItemsClass = {
    "buildingsSearch": "building",
    "busStopSearch": "bus-stop",
    "librariesSearch": "library"
}

// maps search bar ids to the container id of items being searched
var searchItemsContainer = {
    "buildingsSearch": "building-container",
    "busStopSearch": "bus-stop-container",
    "librariesSearch": "library-container"
}

////////////////////////
// Map Initialization
////////////////////////

// Initialize Map
var mymap = L.map('map').setView([47.650017, -122.30654], 13);
L.tileLayer( 'https://api.mapbox.com/styles/v1/aferman/ckhvetwgy0bds19nznkfvodbx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWZlcm1hbiIsImEiOiJja2ZrZXJvbjUwZW5wMnhxcjdyMXc3ZjRnIn0.WGdId2uO9XokPaJmaxlLXg', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( mymap );
mymap.zoomControl.setPosition('bottomright');

//////////////////////
// Server Interface
/////////////////////

// Test Server Back-End
// HTTP Request: "ws://[ipaddress]:[port]/[path]?[parameterName1]=[value1]&[parameterName2]=[value2]"

function testServer() {
    fetch("http://192.168.1.128:8500/test")
        .then(response => response.json())
        .then(res => console.log(res));
}

testServer();
/////////////////////
// Event Listeners
/////////////////////

// Add Event Listeners
var fromElement = document.getElementById("from");
var toElement = document.getElementById("to");
var locationElements = document.getElementsByClassName("location");
var buildingElements = document.getElementsByClassName("building");
var busStopElements = document.getElementsByClassName("bus-stop");
var selectElements = document.getElementsByClassName("select");
var searchBars = document.getElementsByClassName("searchBar");
var buildingContainer = document.getElementById("building-container");
var busStopContainer = document.getElementById("bus-stop-container");
var horizontalBar = document.getElementById("horizontalBarId");
var leftSideBar = document.getElementById("sidebarLeftId");
var logo = document.getElementById("logo");
var titleElements = document.getElementById("titleElementsId");
var currentTheme = document.getElementById("currentModeId");
var navBttn = document.getElementById("navBtn");
var title = document.getElementById("title");
var footer =  document.getElementById("footer");
var weatherPopup = document.getElementById("weatherPopup");
var weatherIcon = document.getElementById("weatherIcon");
var weatherArrow = document.getElementById("arrow");
var weatherPopupBody = document.getElementById("weatherPopupBody");

logo.addEventListener("click", toggleContent);
navBttn.addEventListener("click", tryNav);
weatherIcon.addEventListener("click", toggleWeatherPopup);

document.getElementById("startingPointsId").addEventListener("change", updateStart);
document.getElementById("destinationsId").addEventListener("change", updateDest);
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

document.getElementById("themeCheckbox").addEventListener("change", toggleTheme);

for (var i = 0; i < locationElements.length; i++) {
    locationElements[i].addEventListener('click', setViewToLocation);
}

for (var i = 0; i < searchBars.length; i++) {
    searchBars[i].addEventListener("keyup", handleNewInput);
}

/////////////////////////////
// Event Listener Callbacks
/////////////////////////////

function toggleWeatherPopup() {
    if (weatherPopup.style.height != "0px") {
        weatherPopup.style.height = "0px";
        weatherArrow.style.height = "0px";
        
    } else {
        weatherPopup.style.height = "100px";
        weatherArrow.style.height = "10px";
    }
}

function toggleTheme() {
    if (this.checked) { // Represents dark mode.
        horizontalBar.style.backgroundColor = "#202225";
        leftSideBar.style.backgroundColor = "#202225";
        titleElements.style.backgroundColor = "#202225";
        weatherArrow.style.fill = "#202225";
        weatherPopupBody.style.backgroundColor = "#202225";
        wordmark.src = "UnivWaWordmark.png";
        title.style.color = "whitesmoke";
        logo.src = "HuskyNavLogoDarker.png";
        logo.style.borderWidth = "0px";
        logo.style.width = "70px";
        logo.style.height = "70px";
        logo.style.marginLeft = "0px";
        logo.style.marginTop = "10px";
        currentTheme.innerHTML = "Dark";    
    } else { // Represents light mode.
        horizontalBar.style.backgroundColor = "#4b2e83";
        leftSideBar.style.backgroundColor = "#4b2e83";
        titleElements.style.backgroundColor = "whitesmoke";
        weatherArrow.style.fill = "#4b2e83";
        weatherPopupBody.style.backgroundColor = "#4b2e83"
        wordmark.src = "UnivWaWordmarkPurple.png";
        title.style.color = "#4b2e83";
        logo.src = "HuskyNavLogoWhite.png";
        logo.style.borderWidth = "5px";
        logo.style.width = "60px";
        logo.style.height = "60px";
        currentTheme.innerHTML = "Light";
    }
}

// Handles new input in a search bar
function handleNewInput() {
    var els = document.getElementsByClassName(searchItemsClass[this.id]);
    var container = document.getElementById(searchItemsContainer[this.id]);
    scrollToLocation(this.value, els, container);
}

function toggleDropdown(sec) {
    var size = dropDownLengths[sec.id];
    if (sec.style.height == "0px") {
        sec.style.height = size;
    } else {
        sec.style.height = "0px";
    }
}

// Scrolls to the caller (a building location) when the caller is changed
function scrollToBuilding() {
    scrollToLocation(this.value, buildingElements, buildingContainer);
}

// Scrolls to the caller (a bus stop location) when the caller is changed
function scrollToStop() {
    scrollToLocation(this.value, busStopElements, busStopContainer);
}

// Scrolls to the first location containing the given prefix, from the given list
// of elements (els) in the given container (holder)
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

// Updates the opacities of the location elements when the caller is scrolled
function updateLocationOpacities() {
    for (var i = 0; i < locationElements.length; i++) {
        if (isElementCentered(locationElements[i], busStopContainer) || isElementCentered(locationElements[i], buildingContainer)) {
            locationElements[i].style.opacity = 1;
        } else {
            locationElements[i].style.opacity = 0.2;
        }
    }
}

// Sets the map view to the caller's location
function setViewToLocation() {
    mymap.setView(locationsMap[this.innerHTML], 30);
}

// Sets the start text in the horizontal bar to the caller's text when the caller is changed
function updateStart() {
    const newLocation = this.value;
    fromElement.style.opacity = 0;
    // Gives css transition time to operate
    window.setTimeout(function () {
        fromElement.innerHTML = newLocation;
        fromElement.style.opacity = 1;
    }, 100);
    
}

// Sets the end text in the horizontal bar to the caller's text when the caller is changed
function updateDest() {
    const newLocation = this.value;
    toElement.style.opacity = 0;
    // Gives css transition time to operate
    window.setTimeout(function () {
        toElement.innerHTML = newLocation;
        toElement.style.opacity = 1;
    }, 100);
}

// Attempts navigation when the caller is clicked. If location endpoints are unique and if 
// neither are set to "Current Location," then it navigates. Otherwise, it creates an alert.
function tryNav() {
    var from = fromElement.innerHTML;
    var to = toElement.innerHTML;
    if (navPossible(from, to)) {
        nav(from, to);
    } else {
        alert("Invalid. Try again.")
    }
}

// Toggles visbility of the left sidebar when the caller is clicked
function toggleContent() {
    var sidebarLeft = document.getElementById("sidebarLeftId");
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

///////////////////////////
// Navigation
//////////////////////////

// Return whether navigation is possible. If location endpoints are unique and if 
// neither are set to "Current Location," then it returns true. Otherwise, false.
function navPossible(from, to) {
    return from != "Select Starting Point" && to != "Select Destination" && to != from;
}

// Navigates. Sets the map view to contain both endpoints and draws the path.
function nav() {
    setNavView(locationsMap[fromElement.innerHTML], locationsMap[toElement.innerHTML]);
    // TODO: Fetch data from server instead
    
    //const data = await fetch('./geojsonTest.json').then(response => response.json());
    //L.geoJSON(data).addTo(mymap);
}

// Sets the map view to contain the given lat/lng endpoints
function setNavView(coord1, coord2) {
    mymap.fitBounds([coord1, coord2]);
}

////////////////////////
// Weather
//////////////////////

// Gathers the weather data by using a open weather API.
function weatherBalloon( cityID ) {
    var key = '{yourkey}';
    fetch('https://api.openweathermap.org/data/2.5/weather?id=' + cityID+ '&appid=' + key)  
    .then(function(resp) {return resp.json() }) // Convert data to json
    .then(function(data) {
      console.log(data);
    })
    .catch(function() {
      // catch any errors
    });
  }
  
    window.onload = function() {
    weatherBalloon( 5809844 );
}

// Choose which icon based on whether it is raining
function isRain( d ) {
	if( d.weather[0].description.indexOf('rain') > 0 ) {
        weather.src = "RainIcon.png";
    } else {
        wheather.src = "NoRainIcon.png";
    }
}

////////////////////////////
// Scrolling Tools
////////////////////////////

// Returns whether the given element is centered in the given container
function isElementCentered (el, holder) {
    const { y } = el.getBoundingClientRect()
    const holderRect = holder.getBoundingClientRect()
    if (y <= holderRect.bottom - 60 && y >= holderRect.top + 40) {
        return true;
    } else {
        return false;
    }
}

// Scrolls the given element to the center (if possible) of the given container
function scroll(el, holder) {
    console.log("scorlling " + el.offsetTop + " to " + el.innerHTML);
    var topPos = el.offsetTop;
    holder.scrollTop = topPos - 40;
}

//////////////////////////
// Other
//////////////////////////

// Initialize Location Opacities on Start
// updateLocationOpacities();