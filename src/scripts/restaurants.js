//  defining a function to get the data from Zomato API and turn it into JavaScript

const getRestaurantData = () => {
  fetch("https://developers.zomato.com/api/v2.1/search?entity_id=1138&q=italian", {
  headers: {
    "Content-Type": "application/json",
    "user-key": "335446a1c8d4b48be8722101b589b84d"
  }
})
  .then(restaurants => restaurants.json())
}

// obtain reference to restaurant search button

const restaurantBtn = document.querySelector(".search--restaurants")

restaurantBtn.addEventListener("click", ()=> {
  console.log("button clicked")
  getRestaurantData()
})