// obtain reference to restaurant search button
let restCounter = 0
const restaurantBtn = document.querySelector(".search--restaurants")

//  defining a function to get the data from Zomato API and turn it into JavaScript
const getRestaurantData = () => {
  return fetch("https://developers.zomato.com/api/v2.1/search?entity_id=1138&entity_type=city&q=Italian", {
    headers: {
      "user-key": "335446a1c8d4b48be8722101b589b84d"
    }
  })
    .then(data => data.json())
}

// defining a function to loop over data object and grab names of restaurants
const restaurantItemMaker = (restaurantObject) => {
  restaurantObject.restaurants.forEach(currentRestaurant => {
    counter ++
    let currentRestName = currentRestaurant.restaurant.name
    let currentRestLocation = currentRestaurant.restaurant.location.address
    let restItem = `${counter}. ${currentRestName}: ${currentRestLocation}`
    return restItem
  })
}


// add event listener to search button that fetches data when clicked
restaurantBtn.addEventListener("click", (event) => {
  let restaurantData = getRestaurantData(event)
  
})



