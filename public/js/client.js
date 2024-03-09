
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
  xhr.open("GET", url);
  xhr.send();

}

//default setup to be clickable
document.querySelectorAll(".clear").forEach(function (currentElement, currentIndex, listObj) {

  //console.log(currentElement, currentIndex, listObj);
  currentElement.addEventListener("click", function (e) {
      //console.log(e);
      for (let i = 0; i < this.parentNode.childNodes.length; i++) {
          if (this.parentNode.childNodes[i].nodeType == Node.ELEMENT_NODE) {
              if (this.parentNode.childNodes[i].getAttribute("class") == "ajax-stuff") {
                  this.parentNode.childNodes[i].innerHTML = "";
                  break;
              }
          }
      }
  });
});

//loads navbar with dom
if (document.readyState !== 'loading') {
  console.log('document is already ready');
  ajaxGET("/navbar", function (data) {
  document.getElementById("navbarPlaceholder").innerHTML = data;
  document.addEventListener('click', function (event) {event.preventDefault();});
      
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
      console.log('document was not ready');
      ajaxGET("/navbar", function (data) {
     
      document.getElementById("navbarPlaceholder").innerHTML = data;
      document.addEventListener('click', function (event) {event.preventDefault();});
      });
  });
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

