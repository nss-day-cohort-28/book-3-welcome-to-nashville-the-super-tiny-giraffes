// this function serves to take the venue ID from seperate JSON fetch request and get the upcoming calendar for the venue.  Used in search button event listener.

function concertCalendar(venueID) {
  fetch(`https://api.songkick.com/api/3.0/venues/${venueID}/calendar.json?&apikey=limoekPcmxpzCSvy`)
    .then(jsonData => jsonData.json())
    .then(data => {
      return printToDOM(data.resultsPage.results.event);
      }
    )
}

container.addEventListener("click", (e) => {
  //If the click takes place on the search--concerts button, then...
  if (e.target.classList.contains("search--concerts")) {
    let query = concertsInput.value;
    let querySplit = query.split(" ").join("_");
    //clear information in results div
    results.innerHTML = "";
    //get venue ID from songkick. use input text value as query
    fetch(`https://api.songkick.com/api/3.0/search/venues.json?query=${querySplit}&apikey=limoekPcmxpzCSvy`)
      .then(jsonData => jsonData.json())
      .then(data => {
        //push the id value to a new string (which will be returned from promise)
        let venueID = data.resultsPage.results.venue[0].id;
        // assign unique class result that will be used in results button event listener
        btnClass = "concertsClass";
        // run function to get calendar for venue ID and return results
        return concertCalendar(venueID);
      })
  }
})