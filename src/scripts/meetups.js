container.addEventListener("click", event => {
  if (event.target.classList.contains("search--meetups")) {
    results.innerHTML = "";
    fetch(`https://www.eventbriteapi.com/v3/events/search/?location.address=Nashville&expand=venue&q=${meetupsInput.value}&token=5ZSP7WSNF6DPPGDKLCTZ`)
    .then( (eventsData) => eventsData.json() )
    .then( (eventsParsedData) => {
      btnClass = "meetupClass"
      return printToDOM(eventsParsedData.events)
      console.log(eventsParsedData)
    })
  }
})