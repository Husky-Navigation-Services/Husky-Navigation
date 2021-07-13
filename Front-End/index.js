// Contents:
//      Location Data
//      Map Initialization
//      Event Listeners
//      Event Listener Callbacks
//      Navigation
//      Weather
//      Scrolling Tools
//      Geolocation Tools
//      Navigation Loading Spinner
//      Populate Dropdowns & Lists
//      Other

////////////////////
// Location Data
///////////////////

// TODO: Populate buildingLocations, libraryLocations, busLocations dynamically from Nodes.txt

// Maps locations to their latitude and longitude coordinates.
var buildingLocations = {
    "Red Square": [47.65584980498794, -122.30949825416076],
    "Grieg Garden": [47.656201081851385, -122.30659040317289],
    "HUB Yard": [47.65592643429362, -122.30609494049766],
    "Architecture Hall": [47.65458694342144, -122.31084310874614],
    "Guthrie Hall": [47.65399764506977, -122.31083615322409],
    "Chemistry Library Building": [47.653731062575304, -122.310051571756],
    "Chemistry Building": [47.65296868931889, -122.30843381313426],
    "Benson Hall": [47.653048206961266, -122.3096002665617],
    "Electrical And Computer Engineering Building": [47.6535972288713, -122.30637550325774],
    "Husky Union Building": [47.655283783151624, -122.30516350511866],
    "Hall Health": [47.656158391539535, -122.30427475275344],
    "Mechanical Engineering Building": [47.65364686161925, -122.30472610489173],
    "CSE 1": [47.653305444097526, -122.30585785124353],
    "CSE 2": [47.653004095219195, -122.30492318177295],
    "More Hall": [47.65253605375579, -122.30491610286617],
    "Mueller Hall": [47.65201433361888, -122.3050952261274],
    "Wilcox Hall": [47.651847517804114, -122.30454729355858],
    "Wilson Annex": [47.651393239293384, -122.3051953431917],
    "Physics Astronomy Auditorium": [47.65359750746842, -122.31136042970951],
    "Planetarium": [47.65292532304343, -122.31109810478416],
    "Dept of Biology": [47.65264120124092, -122.31062231547371],
    "Kirsten Wind Tunnel": [47.65438893908237, -122.30599030312719],
    "Winkenwerder Forest Sciences Laboratory": [47.65140751264051, -122.30684546371367],
    "Bagley Hall": [47.65353, -122.30879],
    "Guggenheim Hall": [47.65424, -122.30644],
    "Guggenheim Annex": [47.65463696322391, -122.30645798451044],
    "Gowen Hall": [47.656414394121924, -122.3078418940589],
    "Sieg Hall": [47.6548927921735, -122.30647925125312],
    "Johnson Hall": [47.65464740610828, -122.30890915209709],
    "Gerberding Hall": [47.65531970084914, -122.30935166970617],
    "Mary Gates Hall": [47.65487923837424, -122.30787575101562],
    "Kane Hall": [47.65662775950031, -122.30915002044803],
    "Meany Hall": [47.65557303847933, -122.31044083467523]
}

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

var locationsMap = Object.assign({}, buildingLocations, libraryLocations, busLocations);

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
    "aboutSection": "200px",
    "librariesSection": "200px",
    "feedbackSection": "160px"
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
var mymap = L.map('map').setView([47.650017, -122.30654], 13);
L.tileLayer( 'https://api.mapbox.com/styles/v1/aferman/ckhvetwgy0bds19nznkfvodbx/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWZlcm1hbiIsImEiOiJja2ZrZXJvbjUwZW5wMnhxcjdyMXc3ZjRnIn0.WGdId2uO9XokPaJmaxlLXg', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( mymap );
mymap.zoomControl.setPosition('bottomright');
var pathGroup = new L.LayerGroup();
pathGroup.addTo(mymap);

/////////////////////
// Event Listeners
/////////////////////

// Gets DOM elements.
var fromElement = document.getElementById("from");
var toElement = document.getElementById("to");
var distanceElement = document.getElementById("distance");
var etaElement = document.getElementById("eta");
var locationElements = document.getElementsByClassName("location");
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
const startSelection = document.getElementById("startingPointsId");
const destSelection = document.getElementById("destinationsId");
const contentSections = document.getElementsByClassName("contentSection");

// Load list data
populateList(buildingContainer, buildingLocations);
populateList(busStopContainer, busLocations);
populateList(librariesContainer, libraryLocations);

// Adds event listeners.
logo.addEventListener("click", toggleContent);
navBttn.addEventListener("click", tryNav);
locationIcon.addEventListener("click", goToCurrentLocation);
weatherIcon.addEventListener("click", toggleWeatherPopup);
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

// Adds event listeners to each location element.
for (var i = 0; i < locationElements.length; i++) {
    locationElements[i].addEventListener('click', setViewToLocation);
}

// Adds event listeners to each search bar.
for (var i = 0; i < searchBars.length; i++) {
    searchBars[i].addEventListener("keyup", handleNewInput);
}

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
        // hide all other sections if small screen
        
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
}

// Sets the start text in the horizontal bar to the caller's text when the caller is changed.
function updateStart() {
    endLoading();
    const newLocation = this.value;
    fromElement.style.opacity = 0;
    // Gives css transition time to operate 
    window.setTimeout(function () {
        fromElement.innerHTML = newLocation;
        fromElement.style.opacity = 1;
    }, 100);
}

// Sets the end text in the horizontal bar to the caller's text when the caller is changed.
function updateDest() {
    endLoading();
    const newLocation = this.value;
    toElement.style.opacity = 0;
    // Gives css transition time to operate
    window.setTimeout(function () {
        toElement.innerHTML = newLocation;
        toElement.style.opacity = 1;
    }, 100);
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
       alert("Invalid path. Try again.");
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
            distanceElement.innerHTML = roundTen(res.distance) + " mi";
            etaElement.innerHTML = roundTen(res.eta) + " min";
            var style = {
                weight: 3,
                dashArray: '5, 10',
                lineCap: 'square', // Optional, just to avoid round borders.
                color: 'black'
            }
            var path = L.geoJSON(res.pathGeoJSON, style).addTo(mymap);
            geoJSONPaths.push(path);
            endLoading();
            toggleSideBarMobile();
    });
}

// Sets the map view to contain the given latitude and longitude endpoints.
function setNavView(coord1, coord2) {
    mymap.fitBounds([coord1, coord2]);
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

// Gets the current location of the user when the icon is clicked.
function goToCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(goToPosition);
    } else {
        alert("Geolocation is not supported.");
    }
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
populateNavOptions([buildingLocations, libraryLocations, busLocations], startSelection);
populateNavOptions([buildingLocations, libraryLocations, busLocations], destSelection);
function populateNavOptions(locGroups, selection) {
    const labelMap = ["Buildings", "Libraries", "Bus Stops"];
    locGroups.forEach( (group, i) => {
        selection.innerHTML += "<optgroup label=\"" + labelMap[i] + "\"></optgroup>";
        for (const buildingName in group) {
            selection.innerHTML += "<option value=\"" + buildingName + "\">" + buildingName + "</option>";
        }
    });
}


function populateList(list, names) {
    for (const name in names) {
        list.innerHTML += "<p class=\"building location\">" + name + "</p>";
    }
}

//////////////////////////
// Mobile
//////////////////////////

var isOpen = false;
function toggleSideBarMobile() {
    if (document.documentElement.clientWidth <= 600) {
        if (isOpen) {
            leftSideBar.style.height = "135px";
        } else {
            leftSideBar.style.height = "calc(90% - 40px)";
        }
        isOpen = !isOpen;
    }
}

function resizeElements() {

    if (document.documentElement.clientWidth > 600) {
        leftSideBar.style.height = "calc(100% - 20px)";
    } else {
        leftSideBar.style.height = "135px";
    }
}

window.addEventListener('resize', resizeElements);
