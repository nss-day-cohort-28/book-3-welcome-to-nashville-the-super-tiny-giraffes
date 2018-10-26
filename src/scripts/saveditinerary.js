let savedItinerary = document.getElementById("itinerary--saved");

function saveItinerary() {
  fetch("http://localhost:8088/itinerary/1")
    .then(jsonData => jsonData.json())
    .then(data => {
      if (data.park === "" && data.restaurant === "" && data.meetup === "" && data.concert === "") {
        return
      } else if (savedItinerary.innerHTML === "") {
        savedItinerary.innerHTML += `
        Park: ${data.park} <br /> Restaurant: ${data.restaurant} <br /> Meetup: ${data.meetup} <br /> Concert: ${data.concert} <br /> `;
        clearItinerary();
      } else {
        savedItinerary.innerHTML += `
        <br /> Park: ${data.park} <br /> Restaurant: ${data.restaurant} <br /> Meetup: ${data.meetup} <br /> Concert: ${data.concert} <br /> `;
        clearItinerary();
      }
    })
}