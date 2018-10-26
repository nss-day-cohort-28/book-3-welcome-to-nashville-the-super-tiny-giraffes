let parksArray = [];

container.addEventListener("click", (e) => {
  //If the click takes place on the search--parks button, then...
  if (e.target.classList.contains("search--parks")) {
    let query = parksInput.value.toLowerCase();
    let querySplit = query.split(" ").join("_");
    //clear information in results div and empty parksArray
    results.innerHTML = "";
    parksArray = [];
    //get data from metro database
    //use input text value as query
    fetch(`https://data.nashville.gov/resource/xbru-cfzi.json?${querySplit}=Yes&$$app_token=h1WfXkXd6gZAbEz4zxnP6zg6c`)
    .then(jsonData => jsonData.json())
    //push all objects in the array to a new array (which will be returned in function call)
    .then(data => {
      data.forEach(obj => {
        parksArray.push(obj);
      })
      btnClass = "parksClass"
      return printToDOM(parksArray);
    })
  }
})