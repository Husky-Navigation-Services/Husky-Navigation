// Store Location Coordinates
var locationsMap = {
    "Bagley Hall": [47.65353, -122.30879],
    "Suzzallo Library": [47.65580, -122.30818],
    "Guggenheim Hall": [47.65424, -122.30644],
    "McDonald's": [47.66774, -122.30037]   
}


// Initialize Map
var mymap = L.map('map').setView([47.650017, -122.30654], 13);
var mcdonaldsMarker = new L.Marker(locationsMap["McDonald's"]);
L.tileLayer( 'https://api.mapbox.com/styles/v1/aferman/ckhvetwgy0bds19nznkfvodbx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWZlcm1hbiIsImEiOiJja2ZrZXJvbjUwZW5wMnhxcjdyMXc3ZjRnIn0.WGdId2uO9XokPaJmaxlLXg', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( mymap );
mymap.zoomControl.setPosition('bottomright');
mcdonaldsMarker.addTo(mymap);



// Add Event Listeners
var fromElement = document.getElementById("from");
var toElement = document.getElementById("to");
var locationElements = document.getElementsByClassName("location");
var buildingElements = document.getElementsByClassName("building");
var busStopElements = document.getElementsByClassName("bus-stop");
var buildingContainer = document.getElementById("building-container");
var busStopContainer = document.getElementById("bus-stop-container");
buildingContainer.addEventListener('scroll', updateLocationOpacities);
busStopContainer.addEventListener('scroll', updateLocationOpacities);
document.getElementById("logo").addEventListener("click", toggleContent);
document.getElementById("startingPointsId").addEventListener("change", updateStart);
document.getElementById("destinationsId").addEventListener("change", updateDest);
document.getElementById("navBtn").addEventListener("click", tryNav);
document.getElementById("buildingSearch").addEventListener("keyup", scrollToBuilding);
document.getElementById("busStopSearch").addEventListener("keyup", scrollToStop);

for (var i = 0; i < locationElements.length; i++) {
    locationElements[i].addEventListener('click', setViewToLocation);
}

// Scroll to tops of menus
buildingContainer.scrollIntoView({block: "center"});
busStopContainer.scrollIntoView({block: "center"});

// Event listener callbacks
function scrollToBuilding() {
    scrollToLocation(this.value, buildingElements, buildingContainer);
}

function scrollToStop() {
    console.log("works");
    scrollToLocation(this.value, busStopElements, busStopContainer);
}

function scrollToLocation(input, els, holder) {
    for (var i = 0; i < els.length; i++) {
        var inputPrefix = input.toLowerCase();
        var currentPrefix = els[i].innerHTML.substring(0, inputPrefix.length).toLowerCase();
        if (inputPrefix === currentPrefix) {
            console.log(inputPrefix + " MATCHED " + els[i].innerHTML);
            scroll(els[i], holder);
            break
        } 
    }
}

updateLocationOpacities(); // initial opacity updatef
function updateLocationOpacities() {
    for (var i = 0; i < locationElements.length; i++) {
        if (isElementVisible(locationElements[i], busStopContainer) || isElementVisible(locationElements[i], buildingContainer)) {
            locationElements[i].style.opacity = 1;
        } else {
            locationElements[i].style.opacity = 0.2;
        }
    }
}


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
    mymap.setView(mid);
    mymap.fitBounds([coord1, coord2]);
}

// Scrolling Features/Tools
function isElementVisible (el, holder) {
    const { y } = el.getBoundingClientRect()
    const holderRect = holder.getBoundingClientRect()
    if (y <= holderRect.top + holderRect.height - 50 && y >= holderRect.top + 30) {
        return true;
    } else {
        return false;
    }
}

function scroll(el, holder) {
    console.log("scorlling " + el.offsetTop + " to " + el.innerHTML);
    var topPos = el.offsetTop;
    holder.scrollTop = topPos - 40;
}