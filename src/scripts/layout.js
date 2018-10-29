const navbar = document.querySelector(".navbar");
const navParks = document.getElementById("nav--parks");
const navRestaurants = document.getElementById("nav--restaurants");
const navMeetups = document.getElementById("nav--meetups");
const navConcerts = document.getElementById("nav--concerts");
const whatup = document.getElementById("whatup");
const searchButtons = document.getElementsByClassName("search");
const allInputs = document.getElementsByClassName("input");

function toggleClass(element, newClass) {
  element.classList.toggle(newClass);
}

//hides the search button and search input that are displayed on the page
function hideContent() {
  whatup.classList.add("hidden");
  //the IF conditions search for an input field that does not have a class of hidden
  //if the condition is true, this means that the input evaluated and its
  //associated search button are currently displayed on the page. 
  //We want to hide them and only show the content in the event listener that
  //was triggered
  if (!$(parksInput).hasClass("hidden")) {
    parksInput.value = "";
    toggleClass(parksInput, "hidden");
    toggleClass(searchButtons[0], "hidden");
  }
  if (!$(restaurantsInput).hasClass("hidden")) {
    restaurantsInput.value = "";
    toggleClass(restaurantsInput, "hidden");
    toggleClass(searchButtons[1], "hidden");
  }
  if (!$(meetupsInput).hasClass("hidden")) {
    meetupsInput.value = "";
    toggleClass(meetupsInput, "hidden");
    toggleClass(searchButtons[2], "hidden");
  }
  if (!$(concertsInput).hasClass("hidden")) {
    concertsInput.value = "";
    toggleClass(concertsInput, "hidden");
    toggleClass(searchButtons[3], "hidden");
  }
}

//Clicking a LI with a specific ID in the navbar evaluates 
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