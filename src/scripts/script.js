const fragment = document.createDocumentFragment();
const container = document.getElementById("container");
const results = document.getElementById("results--output");
const parksInput = document.getElementById("parks--input");
const meetupsInput = document.getElementById("meetups--input");
const concertsInput = document.getElementById("concerts--input");
const restaurantsInput = document.getElementById("restaurants--input")
const itinerary = document.getElementById("itinerary--output");
let counter = 0;
let btnClass = "";

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
  //PUT will take the cleardatabase variable and overwrite the current itinerary
  //object in our database with its empty string values
  fetch("http://localhost:8088/itinerary/1", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(clearDatabase)
  })
  //fetch the new (empty) itinerary information and list the information (which is
  //just the parameters of the object) in the itinerary div
  .then(fetch("http://localhost:8088/itinerary/1")
  .then(data => data.json())
  .then(itinerary.innerHTML = "Park: <br /> Restaurant: <br /> Meetup: <br /> Concert: <br />")
  )
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

/*
  This function accepts a single object as a parameter...
  Create div and append div with incrementing #, park name, park address, and button
*/
function createElement(obj) {
  const div = document.createElement("DIV");
  counter++;
  div.style = "position: relative;"
  if (obj.hasOwnProperty("park_name")) {
    div.innerHTML = `${counter}: ${obj.park_name}; ${obj.mapped_location_address}`
  } else if (obj.hasOwnProperty("performance")) {
    div.innerHTML = `${counter}: ${obj.displayName}`
  } else if (obj.hasOwnProperty("is_free")) {
    div.innerHTML = `${counter}: ${obj.name.text}`
  }
  div.appendChild(createSaveBtn())
  return div
}

//loop through the array of individual park objects and call createElement(
function printToDOM(returnedQuery) {
  returnedQuery.forEach(obj => {
    fragment.appendChild(createElement(obj));
  })
  //reset counter so that the next search will assign the correct number
  counter = 0;
  //append the divs to the results field all at once
  results.appendChild(fragment);
}

function getData() {
  fetch("http://localhost:8088/itinerary/1")
    .then(jsonData => jsonData.json())
    .then(data => {
      itinerary.innerHTML = `Park: ${data.park} <br /> Restaurant: ${data.restaurant} <br /> Meetup: ${data.reetup} <br /> Concert: ${data.concert} <br />`
    })
}

//A single click listener on the results div will activate when a save button is clicked
results.addEventListener("click", (e) => {
  if (e.target.classList.contains("save")) {
    //first slice removes "#. "...second slice removes save btn text
    //the result is the string we want, without the messy details
    let savedItem = e.target.parentNode.textContent.slice(3).slice(0, -4);

// THIS IS WHERE WE PUT THE FINAL IF STATEMENT TO DETERMINE WHAT TO PATCH IN THE DATABASE

    const updateItinerary = {
      id: 1,
      park: savedItem
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
    .then(data => {itinerary.innerHTML = `Park: ${data.park} <br /> Restaurant: ${data.restaurant} <br /> Meetup: ${data.meetup} <br /> Concert: ${data.concert} <br />`})
  }
});
