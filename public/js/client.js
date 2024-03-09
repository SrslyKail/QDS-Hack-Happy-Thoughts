
//console.log("Client script loaded.");

const cardArea = document.getElementById("cardArea");

// a function declaration inside of a callback ... which takes a callback function :O
function ajaxGET(url, callback) {

  const xhr = new XMLHttpRequest();

  //console.log("xhr", xhr);
  xhr.onload = function() {
    value = this.responseText;
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      //console.log('responseText:' + xhr.responseText);

      // callback function
      value = this.responseText;
      callback(this.responseText);

    } else {
      console.log(this.status);
    }
  }
  xhr.open("GET", url); // localhost:8000/weekdays?format=html
  xhr.send();

}


// Setup for each card to be clickable
document.querySelectorAll(".card").forEach(function (currentElement, currentIndex, listObj) {
  //console.log(currentElement, currentIndex, listObj);
  currentElement.addEventListener("click", onCardClick);
})

/**
 * Is called when a card is clicked.
 * @param {PointerEvent} e The event that called this function.
 * @returns {void}
 */
function onCardClick(e) {
    console.log(e);
}
