
container.addEventListener("click", (event) => { 
  if(event.target.classList.contains("search--restaurants")) {
    let search = restaurantsInput.value
    results.innerHTML = ""
    fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=${search}`, {
    headers: {"user-key": "335446a1c8d4b48be8722101b589b84d"}
    })
  .then(jsonData => jsonData.json())
  .then(restaurantObject => { 
    // Zomato returns an object with 4 keys. The 4th is "restaurants" which is an array of all the matching restaurant objects. So I obtained that array by using dot notation on the overall object.
      let restaurantArray = restaurantObject.restaurants
      btnClass = "restaurantsClass"
      return printToDOM(restaurantArray)
    })
  }
})