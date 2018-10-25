let eventbriteArray = []; // Supposed to hold the objects from the search in the database
counter = 0; // Used to make those divs in an incremented order

/*
  This function accepts a single object as a parameter...
  Create div and append div with incrementing #, eventbrite name, eventbrite address, and button
*/

function createElement(obj) {
  const div = document.createElement("DIV");
  counter++;
  div.style = "position: relative;"
  div.innerHTML = `${counter}: ${obj.eventbrite_name}; ${obj.mapped_location_address}`
  div.appendChild(createSaveBtn())
  return div
}

container.addEventListener("click", (e) => {
  //If the click takes place on the search--eventbrite button, then...
  if (e.target.classList.contains("search--eventbrite")) {
    let query = eventbriteInput.value;
    let querySplit = query.split(" ").join("_");
    //clear information in results div and empty eventbriteArray
    results.innerHTML = "";
    eventbriteArray = [];
    //get data from metro database
    //use input text value as query
    fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?${querySplit}=Yes&$$app_token=h1WfXkXd6gZAbEz4zxnP6zg6c`)
    .then(jsonData => jsonData.json())
    //push all objects in the array to a new array (which will be returned from promise)
    .then(data => {
      console.log(data.length)
      data.forEach(obj => {
        eventbriteArray.push(obj);
      })
      return printToDOM(eventbriteArray);
    })
  }
})

// fetch("https://www.eventbriteapi.com/v3/events/search/?location.address=Nashville&expand=venue&sort_by=date&token=5ZSP7WSNF6DPPGDKLCTZ"), {
//   headers: {
//     "Authorization": "Bearer 5ZSP7WSNF6DPPGDKLCTZ"
//   }
// })

// Location: Nashville
fetch("https://www.eventbriteapi.com/v3/events/search/?location.address=Nashville&expand=venue&sort_by=date&token=5ZSP7WSNF6DPPGDKLCTZ")
.then( (eventbriteData) => eventbriteData.json() )
.then( (eventbriteData) => {
let eventbriteList = eventbriteData.events.venue.address.city
})
console.log(eventbriteList)