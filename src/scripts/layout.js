const navbar = document.querySelector(".navbar");
const navParks = document.getElementById("nav--parks");
const navRestaurants = document.getElementById("nav--restaurants");
const navMeetups = document.getElementById("nav--meetups");
const navConcerts = document.getElementById("nav--concerts");
const whatup = document.getElementById("whatup");
// buttons
const searchButtons = document.getElementsByClassName("search");
const allInputs = document.getElementsByClassName("input");

function toggleClass(element, newClass) {
  element.classList.toggle(newClass);
}

//hides the search button and search input that is displayed on the page
function hideContent() {
  whatup.classList.add("hidden");
  if (!$(parksInput).hasClass("hidden")) {
    toggleClass(parksInput, "hidden");
    toggleClass(searchButtons[0], "hidden");
  }
  if (!$(restaurantsInput).hasClass("hidden")) {
    toggleClass(restaurantsInput, "hidden");
    toggleClass(searchButtons[1], "hidden");
  }
  if (!$(meetupsInput).hasClass("hidden")) {
    toggleClass(meetupsInput, "hidden");
    toggleClass(searchButtons[2], "hidden");
  }
  if (!$(concertsInput).hasClass("hidden")) {
    toggleClass(concertsInput, "hidden");
    toggleClass(searchButtons[3], "hidden");
  }
}

navbar.addEventListener("click", event => {
  if (event.target === navParks && parksInput.classList.length === 2) {
    hideContent();
    toggleClass(parksInput, "hidden");
    toggleClass(searchButtons[0], "hidden");
  } else if (event.target === navRestaurants && restaurantsInput.classList.length === 2) {
    hideContent();
    toggleClass(restaurantsInput, "hidden");
    toggleClass(searchButtons[1], "hidden");
  } else if (event.target === navMeetups && meetupsInput.classList.length === 2) {
    hideContent();
    toggleClass(meetupsInput, "hidden");
    toggleClass(searchButtons[2], "hidden");
  } else if (event.target === navConcerts && concertsInput.classList.length === 2) {
    hideContent();
    toggleClass(concertsInput, "hidden");
    toggleClass(searchButtons[3], "hidden");
  }
});