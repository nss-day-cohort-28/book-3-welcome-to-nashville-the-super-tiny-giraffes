let concertsArray = [];
counter = 0;

/*
  This function accepts a single object as a parameter...
  Create div and append div with incrementing #, park name, park address, and button
*/
function createElement(obj) {
  const div = document.createElement("DIV");
  counter++;
  div.style = "position: relative;"
  div.innerHTML = `${counter}: ${obj.displayName}`
  div.appendChild(createSaveBtn())
  return div
}

function concertCalendar(venueID) {
  fetch(`https://api.songkick.com/api/3.0/venues/${venueID}/calendar.json?&apikey=limoekPcmxpzCSvy`)
    .then(jsonData => jsonData.json())
    .then(data => {
      for (i = 0; i < data.resultsPage.results.event.length; i++) {
        concertsArray.push(data.resultsPage.results.event[i])
      }
      return printToDOM(concertsArray);
    })
}

container.addEventListener("click", (e) => {
  //If the click takes place on the search--concerts button, then...
  if (e.target.classList.contains("search--concerts")) {
    let query = concertsInput.value;
    let querySplit = query.split(" ").join("_");
    //clear information in results div and empty parksArray
    results.innerHTML = "";
    concertsArray = [];
    //get data from metro database
    //use input text value as query
    fetch(`https://api.songkick.com/api/3.0/search/venues.json?query=${querySplit}&apikey=limoekPcmxpzCSvy`)
      .then(jsonData => jsonData.json())
      //push all objects in the array to a new array (which will be returned from promise)
      .then(data => {
        console.log(data.resultsPage.results.venue[0].id);
        let venueID = data.resultsPage.results.venue[0].id;
        return concertCalendar(venueID);
      })
  }
})