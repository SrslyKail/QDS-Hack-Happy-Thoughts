const cardArea = document.getElementById("cardArea");
const rowList = cardArea.getElementsByClassName("row");
const charLimit = 300;

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
          if (
            (column != 0)
            && (column % 3 == 0)) { // Checks if we need to move down a row
            row++;
            column = 0;
            if (row >= rowList.length) { // Check if we need to make a new row
              createNewRow(cardJson.row);
            }
          }
          while (rowList[row].children.length >= 3) { // If the row if already full
            row++;
            if (row >= rowList.length) { // Check if we need to make a new row
              createNewRow(cardJson.row);
              break;
            }
          }
          let currentRow = rowList[row];

          //console.log(thoughtText);

          var card = createNewCard(cardJson, thought);
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
function createNewCard(jsonData, thought) {

  //create the card structure from JSON
  let card = document.createElement("div");
  let image = document.createElement("img");
  let front = document.createElement("div");
  let back = document.createElement("div");
  let img = thought.data().image;
  let thoughtText = thought.data().text;

  card.className = jsonData.card;
  image.src = img;
  image.className = jsonData.image;
  front.className = jsonData.front;
  back.className = jsonData.back;

  if (thoughtText.length > charLimit) {
    thoughtText = thoughtText.substring(0, charLimit) + '\u2026';
  }
  thoughtText = `<p>${thoughtText}</p>`;
  //if its a default image
  if (thought.data().default == 1){
    //Put the text on the front
    back.append(image);
    front.innerHTML = thoughtText;
  } else {
    back.innerHTML = thoughtText;
    front.append(image);
  }
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
  while (!target.classList.contains("card")) {
    target = target.parentNode;
  }
  target.classList.toggle('is-flipped');
}

getThoughts()

$(document).ready(function () {
  let envelope = document.querySelector('.envelope');
  // Add a click event listener to the envelope element
  envelope.addEventListener('click', stopHeartbeat, { once: true });
});

function stopHeartbeat() {
  this.classList.remove('heartbeat');
  //cardArea.classList.remove('hidden');
  //Get the modal close button and set it to delete itself after we close it.
  let modalFooter = document.getElementsByClassName("modal-footer")[0].children[0];
  modalFooter.addEventListener("click", function () {
    let intro = document.getElementById("intro");
    intro.remove();
    let hiddenElements = Array.from(document.getElementsByClassName('hidden'));
    hiddenElements.forEach(function (elem, index) {
      elem.classList.remove('hidden');
      elem.classList.add("fade-in-effect");
    });
  });
}