var mymap = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: ['a','b','c']
}).addTo( mymap );

document.getElementById("logo").addEventListener("click", toggleSideBar);

function toggleSideBar() {
    var sidebarLeft = document.getElementById("sidebarLeftId");
    if (sidebarLeft.style.width == "0px") {
        sidebarLeft.style.opacity = 1;
        sidebarLeft.style.width = "288px";
    } else {
        sidebarLeft.style.opacity = 0;
        sidebarLeft.style.width = "0px";
    }
    
  
}