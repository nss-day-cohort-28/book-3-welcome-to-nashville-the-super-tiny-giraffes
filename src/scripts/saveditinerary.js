let savedItinerary = document.getElementById("itinerary--saved");
let saveItineraryBtn = document.getElementById("btn--save--itin");
let savedItineraryObject = {};

// function to create button that deletes an itinerary
const createDeleteBtn = () => {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "Delete";
  btn.className = "delete";
  return btn
}

// function to take the itinerary in the itinerary container and save it; it shows up in the Your Saved Itinerary section
function saveItinerary() {
    fetch("http://localhost:8088/itinerary/1")
    .then(jsonData => jsonData.json())
    .then(data => {
      if (data.park === "" && data.restaurant === "" && data.meetup === "" && data.concert === "") {
        return
      } else {
      savedItineraryObject = {
        park: data.park,
        restaurant: data.restaurant,
        meetup: data.meetup,
        concert: data.concert
      }
      fetch("http://localhost:8088/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(savedItineraryObject)
      })
        .then(jsonData => jsonData.json())
        .then(data => {
          if (savedItinerary.innerHTML === "") {
            let newItinerary = document.createElement("div")
            newItinerary.classList.add("savedItin")
            newItinerary.innerHTML += `
            Park: ${data.park} <br /> Restaurant: ${data.restaurant} <br /> Meetup: ${data.meetup} <br /> Concert: ${data.concert} <br /> `;
            newItinerary.appendChild(createDeleteBtn())
            savedItinerary.appendChild(newItinerary)
            clearItinerary();
          } else {
            let newItinerary = document.createElement("div")
            newItinerary.classList.add("savedItin")
            newItinerary.innerHTML += `
            <br /> Park: ${data.park} <br /> Restaurant: ${data.restaurant} <br /> Meetup: ${data.meetup} <br /> Concert: ${data.concert} <br /> `;
            newItinerary.appendChild(createDeleteBtn())
            savedItinerary.appendChild(newItinerary)
            clearItinerary();
          }
        })
      }
    })
  }

  // calling the saveItinerary function when the save itinerary button is clicked.
  saveItineraryBtn.addEventListener("click", event => saveItinerary(event))


  // adding an event listener to the Saved Itinerary Container. Handling a click event on the delete button TODO connect this to our JSON database to remove this entry
  savedItinerary.addEventListener("click", (event) => {
    if (event.target.className === "delete") {
      let itineraryToDelete = event.target.parentNode
      savedItinerary.removeChild(itineraryToDelete);
    }
  })
