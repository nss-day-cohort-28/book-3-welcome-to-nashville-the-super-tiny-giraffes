const fragment = document.createDocumentFragment();
const container = document.getElementById("container");
const results = document.getElementById("results--output");
const parksInput = document.getElementById("parks--input");
const meetupsInput = document.getElementById("meetups--input");
const concertsInput = document.getElementById("concerts--input");
const restaurantsInput = document.getElementById("restaurants--input");
const itinerary = document.getElementById("itinerary--output");
let counter = 0;
let btnClass = "";
let deleteBtnClass = "";

//This function clears all information in the itinerary when the page loads or is refreshed
function clearItinerary() {
  //set the object matching the itinerary in the database to empty strings
  const clearDatabase = {
    id: 1,
    park: "",
    restaurant: "",
    meetup: "",
    concert: ""
  }
  itinerary.innerHTML = "Park: <br /> Restaurant: <br /> Meetup: <br /> Concert: <br />"
  //PUT will take the cleardatabase variable and overwrite the current itinerary
  //object in our database with its empty string values
  fetch("http://localhost:8088/itinerary/1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(clearDatabase)
  })
    // list the parameters of the itinerary in the itinerary div
}
window.onload = clearItinerary();

//create a button, give it text, a class of "save", and position in div
function createSaveBtn() {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "Save";
  btn.className = `save ${btnClass}`;
  btn.style = "position: absolute; right: 0;"
  return btn
}

//This function accepts a single object as a parameter...
//Create div and append div with incrementing #, object information, and button
function createElement(obj) {
  const div = document.createElement("DIV");
  counter++;
  div.style = "position: relative;"
  //hasOwnProperty is used with a unique object property that differs in each API
  //the if statements allow us to apply the correct innerHTML content to the div
  if (obj.hasOwnProperty("park_name")) {
    div.innerHTML = `${counter}: ${obj.park_name}; ${obj.mapped_location_address}`
  } else if (obj.hasOwnProperty("performance")) {
    div.innerHTML = `${counter}: ${obj.displayName}`
  } else if (obj.hasOwnProperty("is_free")) {
    div.innerHTML = `${counter}: ${obj.name.text}`
  } else if (obj.hasOwnProperty("restaurant")) {
    div.innerHTML = `${counter}: ${obj.restaurant.name} - ${obj.restaurant.location.address}`
  }
  div.appendChild(createSaveBtn(btnClass))
  return div
}

//loop through the array of individual objects and call createElement()
function printToDOM(returnedQuery) {
  returnedQuery.forEach(obj => {
    fragment.appendChild(createElement(obj));
  })
  //reset counter so that the next search will assign the correct number
  counter = 0;
  //append the divs to the results field all at once
  results.appendChild(fragment);
}

//A single click listener on the results div will activate when a search results save button is clicked
results.addEventListener("click", (e) => {
  if (e.target.classList.contains("save")) {
    //first slice removes "#. "...second slice removes save btn text
    //the result is the string we want, without the messy details
    let savedItem = e.target.parentNode.textContent.slice(3).slice(0, -4);

    // THIS IS WHERE WE PUT THE FINAL IF STATEMENT TO DETERMINE WHAT TO PATCH IN THE DATABASE
    let updateItinerary = {};

    // if (btnclass === uniqueClass)

    if (btnClass === "parksClass") {
      updateItinerary = {
        id: 1,
        park: savedItem
      }
    } else if (btnClass === "restaurantsClass") {
      updateItinerary = {
        id: 1,
        restaurant: savedItem
      }
    } else if (btnClass === "meetupClass") {
      updateItinerary = {
        id: 1,
        meetup: savedItem
      }
    } else if (btnClass === "concertsClass") {
      updateItinerary = {
        id: 1,
        concert: savedItem
      } 
    } else {
        alert("Error button class")
      }
    //patch the database with the correct itinerary property: value pair
    fetch("http://localhost:8088/itinerary/1", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updateItinerary)
    })
      //the patch returns a promise with the itinerary object (id = 1)
      //the updated information is appended to the itinerary div
      .then(patchData => patchData.json())
      .then(data => {itinerary.innerHTML = `Park: ${data.park} <br /> Restaurant: ${data.restaurant} <br /> Meetup: ${data.meetup} <br /> Concert: ${data.concert} <br />` })
  }
});