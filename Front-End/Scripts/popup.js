const navPopup = document.getElementById("nav-popup-container");
const navInfo = document.getElementById("nav-info");

navInfo.onmouseover = () => {
  navPopup.classList.remove("is-not-visible");
  navPopup.classList.add("is-visible");
}

navInfo.onmouseleave = () => {
  navPopup.classList.remove("is-visible");
  navPopup.classList.add("is-not-visible");
}


