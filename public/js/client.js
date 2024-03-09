
//console.log("Client script loaded.");

const cardArea = document.getElementById("cardArea");
const rowList = cardArea.getElementsByClassName("row");

function ajaxGET(url, callback) {
  const xhr = new XMLHttpRequest();
  //console.log("xhr", xhr);
  xhr.onload = function () {
    value = this.responseText;
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      // console.log('responseText:' + xhr.responseText);

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
  //console.log('document was ready');
  ajaxGET("/navbar", function (data) {
  document.getElementById("navbarPlaceholder").innerHTML = data;
  document.addEventListener('click', function (event) {event.preventDefault();});
      
  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
      //console.log('document was not ready');
      ajaxGET("/navbar", function (data) {
     
      document.getElementById("navbarPlaceholder").innerHTML = data;
      document.addEventListener('click', function (event) {event.preventDefault();});
      });
  });
}


/**
 * Gets thoughts from the server to be displayed
 */
function getThoughts() {
  db.collection("thoughts").get()   //the collection called "hikes"
    .then((allThoughts) => {
      ajaxGET("/cardRow", function (jsonData) {
        let cardJson = JSON.parse(jsonData);
        //console.log("Json data:", cardJson);

        //Need an iterator so we dont have more than 3 per row!
        let column = 0;
        //To keep track of which row we're on
        let row = 0;
        
        //this deals with initializing the page
        if (rowList.length == 0) {
          createNewRow(cardJson.row);
        }
        //Currently it'll just read everything in the database
        //We could modify it later to only grab X amount.
        allThoughts.forEach((thought) => {
          if (column % 3 == 0) { // Checks if we need to move down a row
            row++;
            column = 0;
            if (row >= rowList.length) { // Check if we need to make a new row
              createNewRow(cardJson.row);
            }
          }
          while (rowList[row].children.length >= 3){ // If the row if already full
            row++;
            if (row >= rowList.length){ // Check if we need to make a new row
              createNewRow(cardJson.row);
              break;
            }
          }
          let currentRow = rowList[row];
          let image = thought.data().image;
          let thoughtText = thought.data().text;
          
          //console.log(thoughtText);
          
          var card = createNewCard(cardJson, image, thoughtText);
          currentRow.append(card);
          column++;
        });
      });
    })/*.then(() => { //Currently doesnt work. Row Count is 0.
      //Check if our last row is too short
      let rowCount = rowList.length;
      console.log(`row count: ${rowCount}`);
      let lastRow = rowList[rowCount-1];
      console.log(lastRow.hasChildNodes);
      if (
        (lastRow.hasChildNodes) 
        && (lastRow.children.length < 3)
        ) {
        //if it is, delete it.
        console.log("Removing last row.");
        cardArea.removeChild(lastRow);
      }
    })*/;
}

function createNewRow(classNames) {
  let div = document.createElement("div");
  div.className = classNames;
  cardArea.appendChild(div);
}

/**
 * Creates a new flippable card.
 * @param {Array} jsonData the Json data used to create the card.
 * @param {String} img the image to put on the card.
 * @param {String} thought the text to put on the card. 
 * @returns {HTMLDivElement} a new card.
 */
function createNewCard(jsonData, img, thought) {
  
  //create the card structure from JSON
  let card = document.createElement("div");
  let image = document.createElement("img");
  let front = document.createElement("div");
  let back = document.createElement("div");

  card.className = jsonData.card;
  image.src = img;
  image.className = jsonData.image;
  front.className = jsonData.front;
  back.className = jsonData.back;
  back.innerHTML = `<p>${thought}</p>`;
  front.append(image);
  card.append(front, back);

  card.addEventListener("click", onCardClick);
  return card;
}

/**
 * Is called when a card is clicked.
 * @param {PointerEvent} e The event that called this function.
 * @returns {void}
 */
function onCardClick(e) {
  let target = e.target;
  while (!target.classList.contains("card")){
    target = target.parentNode;
  }
  target.classList.toggle('is-flipped');
}

getThoughts()



document.addEventListener('thoughtsLoaded', function() {
  let cards = document.querySelectorAll(".card-inner");
  console.log(cards)
  for (var i = 0 ; i< cards.length; i++){
        let card = cards[i]
        card.addEventListener('click', function(){
            card.classList.toggle('is-flipped');
        });
      }
});