
//console.log("Client script loaded.");

const cardArea = document.getElementById("cardArea");

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

/**
 * Gets thoughts from the server to be displayed
 */
function getThoughts() {
  db.collection("thoughts").get()   //the collection called "hikes"
    .then((allThoughts) => {
      ajaxGET("/cardRow", function (jsonData) {
        let cardJson = JSON.parse(jsonData);
        console.log("Json data:", cardJson);
        //Need an iterator so we dont have more than 3 per row!
        let column = 1;
        //To keep track of which row we're on
        let row = 0;
        let rowList = cardArea.getElementsByClassName("row");
        if (rowList.length == 0) {
          createNewRow(cardJson.row);
        }
        allThoughts.forEach((thought) => {
          if (column % 3 == 0) {
            row++;
            column = 0;
            if (row >= rowList.length) {
              createNewRow(cardJson.row);
            }
          }
          let currentRow = rowList[row]
          let image = thought.data().image;
          let thoughtText = thought.data().text;
          console.log(thoughtText);
          var card = createNewCard(cardJson, image);
          currentRow.append(card);
          column++;
        });
      });
    });
}

function createNewRow(classNames) {
  let div = document.createElement("div");
  div.className = classNames;
  cardArea.appendChild(div);
}

/**
 * @param {*} jsonData the Json data used to create the card.
 * @param {*} img the image to put on the card
 * @returns {HTMLDivElement} a new card
 */
function createNewCard(jsonData, img) {
  let card = document.createElement("div");
  let image = document.createElement("img");
  let cardBody = document.createElement("div");

  card.className = jsonData.card;
  image.src = img;
  image.className = jsonData.img;
  cardBody.className = jsonData.cardBody;

  card.append(image, cardBody);

  return card;
}

getThoughts() //input param is the name of the collection
