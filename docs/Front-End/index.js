// Store Location Coordinates
var locationsMap = {
    "Bagley Hall": [47.65353, -122.30879],
    "Suzzallo Library": [47.65580, -122.30818],
    "Guggenheim Hall": [47.65424, -122.30644],
    "McDonald's": [47.66774, -122.30037]   
}


// Initialize Map
var mymap = L.map('map').setView([47.650017, -122.30654], 13);
L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( mymap );
mymap.zoomControl.setPosition('bottomright');

// Add Event Listeners
var fromElement = document.getElementById("from");
var toElement = document.getElementById("to");
var locationElements = document.getElementsByClassName("location");
document.getElementById("logo").addEventListener("click", toggleContent);
document.getElementById("startingPointsId").addEventListener("change", updateStart);
document.getElementById("destinationsId").addEventListener("change", updateDest);
document.getElementById("navBtn").addEventListener("click", tryNav);

for (var i = 0; i < locationElements.length; i++) {
    locationElements[i].addEventListener('click', setViewToLocation);
}

// Event listener callbacks
function setViewToLocation() {
    mymap.setView(locationsMap[this.innerHTML], 30);
}

function updateStart() {
    fromElement.innerHTML = this.value;
}

function updateDest() {
    toElement.innerHTML = this.value;
}

function tryNav() {
    var from = fromElement.innerHTML;
    var to = toElement.innerHTML;
    if (navPossible(from, to)) {
        nav(from, to);
    } else {
        alert("Invalid. Try again.")
    }
}

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

// Navigation
function navPossible(from, to) {
    return from != "Select Starting Point" && to != "Select Destination" && to != from;
}

function nav() {
    setNavView(locationsMap[fromElement.innerHTML], locationsMap[toElement.innerHTML])
}

function setNavView(coord1, coord2) {
    var mid = [(coord1[0] + coord2[0]) / 2, (coord1[1] + coord2[1]) / 2];
    console.log()
    mymap.setView(mid, 30);
}
