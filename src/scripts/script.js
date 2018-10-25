const fragment = document.createDocumentFragment();
const container = document.getElementById("container");
const results = document.getElementById("results--output");
const parksInput = document.getElementById("parks--input");

//create a button, give it text, a class of 'save', and position in div
function createSaveBtn() {
  const btn = document.createElement("BUTTON");
  btn.innerHTML = "Save";
  btn.className = "save";
  btn.style = "position: absolute; right: 0;"
  return btn
}

//loop through the array of individual park objects and call createElement()
function printToDOM(returnToQuery) {
  returnToQuery.forEach(obj => {
    fragment.appendChild(createElement(obj));
  })
  //reset counter so that the next search will assign the correct number
  counter = 0;
  //append the divs to the results field all at once
  results.appendChild(fragment);
}