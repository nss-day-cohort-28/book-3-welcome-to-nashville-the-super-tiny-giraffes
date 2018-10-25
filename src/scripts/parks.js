let parksArray = [];
let counter = 0;

/*
  This function accepts a single object as a parameter...
  Create div and append div with incrementing #, park name, park address, and button
*/
function createElement(obj) {
  const div = document.createElement("DIV");
  counter++;
  div.style = "position: relative;"
  div.innerHTML = `${counter}: ${obj.park_name}; ${obj.mapped_location_address}`
  div.appendChild(createSaveBtn())
  return div
}

container.addEventListener("click", (e) => {
  //If the click takes place on the search--parks button, then...
  if (e.target.classList.contains("search--parks")) {
    let query = parksInput.value;
    let querySplit = query.split(" ").join("_");
    //clear information in results div and empty parksArray
    results.innerHTML = "";
    parksArray = [];
    //get data from metro database
    //use input text value as query
    fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?${querySplit}=Yes&$$app_token=h1WfXkXd6gZAbEz4zxnP6zg6c`)
    .then(jsonData => jsonData.json())
    //push all objects in the array to a new array (which will be returned from promise)
    .then(data => {
      console.log(data.length)
      data.forEach(obj => {
        parksArray.push(obj);
      })
      return printToDOM(parksArray);
    })

    //loop through the array of individual park objects and call createElement()
    function printToDOM(parkQuery) {
      parkQuery.forEach(obj => {
        fragment.appendChild(createElement(obj));
      })
      //reset counter so that the next search will assign the correct number
      counter = 0;
      //append the divs to the results field all at once
      results.appendChild(fragment);
    }
  }
})
