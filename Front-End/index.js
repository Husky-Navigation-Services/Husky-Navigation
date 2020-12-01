// Contents:
//      Location Data
//      Map Initialization
//      Server Interface
//      Event Listeners
//      Event Listener Callbacks
//      Navigation
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

const testServer = () => {
    let socket = new WebSocket("ws://localhost:35832/data1=dataaa&data2=dataaaaaWee");

    socket.onopen = function(e) {
        alert("[open] Connection established");
        alert("Sending to server");
        var enc = new TextEncoder();
        socket.send("Some Data!");
        
    };
}

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

logo.addEventListener("click", toggleContent);
navBttn.addEventListener("click", tryNav);

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

function toggleTheme() {
    if (this.checked) { // Represents dark mode.
        horizontalBar.style.backgroundColor = "#202225";
        leftSideBar.style.backgroundColor = "#202225";
        titleElements.style.backgroundColor = "rgb(179, 179, 179)";
        navBttn.style.backgroundColor = "rgb(179, 179, 179)";
        //titleElements.style.backgroundColor = "#202225";
        logo.src = "HuskyNavLogoDarker.png";
        logo.style.borderWidth = "0px";
        logo.style.width = "70px";
        logo.style.height = "70px";
        logo.style.marginLeft = "0px";
        logo.style.marginTop = "10px";
        currentTheme.innerHTML = "Dark";
        for (var i = 0; i < selectElements.length; i++) {
            selectElements[i].style.backgroundColor = "rgb(179, 179, 179)";
        }
    } else { // Represents light mode.
        horizontalBar.style.backgroundColor = "#4b2e83";
        leftSideBar.style.backgroundColor = "#4b2e83";
        titleElements.style.backgroundColor = "whitesmoke";
        navBttn.style.backgroundColor = "whitesmoke";
        logo.src = "HuskyNavLogoWhite.png";
        logo.style.borderWidth = "5px";
        logo.style.width = "60px";
        logo.style.height = "60px";
        currentTheme.innerHTML = "Light";
        for (var i = 0; i < selectElements.length; i++) {
            selectElements[i].style.backgroundColor = "whitesmoke";
        }
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
async function nav() {
    setNavView(locationsMap[fromElement.innerHTML], locationsMap[toElement.innerHTML]);
    // TODO: Fetch data from server instead
    const data = await fetch('./geojsonTest.json').then(response => response.json());
    L.geoJSON(data).addTo(mymap);
}

// Sets the map view to contain the given lat/lng endpoints
function setNavView(coord1, coord2) {
    mymap.fitBounds([coord1, coord2]);
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