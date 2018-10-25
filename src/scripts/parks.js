let parksArray = [];
let counter = 0;

/*
  This function accepts a single object as a parameter...
  Create div, create button, give button a class, and append div 
  with incrementing #, park name, park address, and button
*/
function createElement(obj) {
  const div = document.createElement("DIV");
  counter++;
  div.innerHTML = `${counter}: ${obj.park_name}; ${obj.mapped_location_address}`
  div.appendChild(createSaveBtn())
  return div
}

function createSaveBtn() {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "Save";
  btn.className = "save";
  btn.style = "margin-left: 10px;"
  return btn
}

container.addEventListener("click", (e) => {
  //If the click takes place on the search--parks button, then...
  if (e.target.classList.contains("search--parks")) {
    //get data from metro database
    fetch("https://data.nashville.gov/resource/xbru-cfzi.json?$$app_token=h1WfXkXd6gZAbEz4zxnP6zg6c")
    .then(jsonData => jsonData.json())
    //push all objects in the array to a new array (which will be returned from promise)
    .then(data => {
      data.forEach(obj => {
        console.log(obj.park_name);
        parksArray.push(obj);
      })
      return parksArray;
    })
    //loop through the array of individual park objects and call createElement()
    .then(parksArray => {
      parksArray.forEach(obj => {
        fragment.appendChild(createElement(obj));
      })
      //reset counter so that the next search will assign the correct number
      counter = 0;
      //append the divs to the results field all at once
      results.appendChild(fragment);
    })
  }
})