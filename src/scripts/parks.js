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

//create a button, give it text, a class of 'save', and position in div
function createSaveBtn() {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "Save";
  btn.className = "save";
  btn.style = "position: absolute; right: 0;"
  return btn
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
  }
})