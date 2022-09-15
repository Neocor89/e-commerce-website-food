"use strict";

import { secretMapToken } from "../secretKey.js";

/**
 **  mapBox configuration  */

mapboxgl.accessToken = secretMapToken;

const map = new mapboxgl.Map({
  container: "map", //: container ID
  style: "mapbox://styles/mapbox/streets-v11", //: style URL
  center: [2.82, 50.43], //: starting position [lng, lat]
  zoom: 14, //: starting zoom
  projection: "globe", //:: display the map as a 3D globe
});
map.on("style.load", () => {
  map.setFog({}); //: Set the default atmosphere style
});

var mapNav = new mapboxgl.NavigationControl();
map.addControl(mapNav);

map.addControl(
  new MapboxDirections({
    accessToken: mapboxgl.accessToken,
  }),
  "top-left"
);

const marker1 = new mapboxgl.Marker().setLngLat([2.82, 50.43]).addTo(map);

/**
 **  add event on element  */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
};

/**
 **  navbar toggle  */

const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
};

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
};

addEventOnElem(navbarLinks, "click", closeNavbar);

/**
 **  header sticky & back top btn active  */

const header = document.querySelector("[data-header]");
console.log(header);
const backTopBtn = document.querySelector("[data-back-top-btn]");

const headerActive = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
};

addEventOnElem(window, "scroll", headerActive);

let lastScrolledPos = 0;

const headerSticky = function () {
  if (lastScrolledPos >= window.scrollY) {
    header.classList.remove("header-hide");
  } else {
    header.classList.add("header-hide");
  }

  lastScrolledPos = window.scrollY;
};

addEventOnElem(window, "scroll", headerSticky);

/**
 *  scroll reveal effect  */

const sections = document.querySelectorAll("[data-section]");

const scrollReveal = function () {
  for (let i = 0; i < sections.length; i++) {
    if (sections[i].getBoundingClientRect().top < window.innerHeight / 2) {
      sections[i].classList.add("active");
    }
  }
};

scrollReveal();

addEventOnElem(window, "scroll", scrollReveal);
