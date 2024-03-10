const cardArea = document.getElementById("cardArea");
const rowList = cardArea.getElementsByClassName("row");
const charLimit = 300;
let imagesLoaded = 6; 

/**
 * Gets thoughts from the server to be displayed
 */
function getThoughts(filter = null) {
  //clear previous cards from the card area
  let cardArea = document.getElementById("cardArea");
  cardArea.innerHTML="";
  //iterators for rows and columns;
  let row = 0;
  let column = 0;
  //if custom image is a priority, filters cards displaying cards with the custom images first
  if (filter=='image'){
    db.collection("thoughts").where("default", "==", 1).get().then((allThoughts) => {
      ajaxGET("/cardRow", function (jsonData) {
        //console.log("filtering");
        const thoughtData = []; 
      allThoughts.forEach((thought) => {
        thoughtData.push(thought); 
      });

      ajaxGET("/cardRow", function (jsonData) {
        let cardJson = JSON.parse(jsonData);

        if (rowList.length == 0) {
          createNewRow(cardJson.row);
        }

        let currentRow = rowList[rowList.length - 1]; 

        let column = currentRow.children.length; 

        thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
          if (column >= 3) { 
            createNewRow(cardJson.row);
            currentRow = rowList[rowList.length - 1]; 
            column = 0; 
          }
          var card = createNewCard(cardJson, thought);
          currentRow.append(card);
          column++;
        });

        // Add scroll event listener for infinite scrolling
        window.addEventListener('scroll', function () {
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // Load more images
            imagesLoaded += 6; 
            thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
              if (column >= 3) { 
                createNewRow(cardJson.row);
                currentRow = rowList[rowList.length - 1]; 
                column = 0; 
              }
              var card = createNewCard(cardJson, thought);
              currentRow.append(card);
              column++;
            });
          }
        });
      });
    });
    });
    //loads non-prioritized imgs 
    db.collection("thoughts").where("default", "==", 0).get().then((allThoughts) => {
      ajaxGET("/cardRow", function (jsonData) {
        const thoughtData = []; 
      allThoughts.forEach((thought) => {
        thoughtData.push(thought); 
      });

      ajaxGET("/cardRow", function (jsonData) {
        let cardJson = JSON.parse(jsonData);

        if (rowList.length == 0) {
          createNewRow(cardJson.row);
        }

        let currentRow = rowList[rowList.length - 1]; 

        let column = currentRow.children.length; 

        thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
          if (column >= 3) { 
            createNewRow(cardJson.row);
            currentRow = rowList[rowList.length - 1]; 
            column = 0; 
          }
          var card = createNewCard(cardJson, thought);
          currentRow.append(card);
          column++;
        });

        // Add scroll event listener for infinite scrolling
        window.addEventListener('scroll', function () {
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // Load more images
            imagesLoaded += 6; 
            thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
              if (column >= 3) { 
                createNewRow(cardJson.row);
                currentRow = rowList[rowList.length - 1]; 
                column = 0; 
              }
              var card = createNewCard(cardJson, thought);
              currentRow.append(card);
              column++;
            });
          }
        });
      });
    });
    });
    //if default image is a priority, filters cards displaying cards with the default images first
  } else if (filter=='text'){
    db.collection("thoughts").where("default", "==", 0).get().then((allThoughts) => {
      ajaxGET("/cardRow", function (jsonData) {
        const thoughtData = []; 
      allThoughts.forEach((thought) => {
        thoughtData.push(thought); 
      });

      ajaxGET("/cardRow", function (jsonData) {
        let cardJson = JSON.parse(jsonData);

        if (rowList.length == 0) {
          createNewRow(cardJson.row);
        }

        let currentRow = rowList[rowList.length - 1]; 

        let column = currentRow.children.length; 

        thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
          if (column >= 3) { 
            createNewRow(cardJson.row);
            currentRow = rowList[rowList.length - 1]; 
            column = 0; 
          }
          var card = createNewCard(cardJson, thought);
          currentRow.append(card);
          column++;
        });

        // Add scroll event listener for infinite scrolling
        window.addEventListener('scroll', function () {
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // Load more images
            imagesLoaded += 6; 
            thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
              if (column >= 3) { 
                createNewRow(cardJson.row);
                currentRow = rowList[rowList.length - 1]; 
                column = 0; 
              }
              var card = createNewCard(cardJson, thought);
              currentRow.append(card);
              column++;
            });
          }
        });
      });
    });
    });
    //loads non-prioritized imgs
    db.collection("thoughts").where("default", "==", 1).get().then((allThoughts) => {
      ajaxGET("/cardRow", function (jsonData) {
        const thoughtData = []; 
      allThoughts.forEach((thought) => {
        thoughtData.push(thought); 
      });

      ajaxGET("/cardRow", function (jsonData) {
        let cardJson = JSON.parse(jsonData);

        if (rowList.length == 0) {
          createNewRow(cardJson.row);
        }

        let currentRow = rowList[rowList.length - 1]; 

        let column = currentRow.children.length; 

        thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
          if (column >= 3) { 
            createNewRow(cardJson.row);
            currentRow = rowList[rowList.length - 1]; 
            column = 0; 
          }
          var card = createNewCard(cardJson, thought);
          currentRow.append(card);
          column++;
        });

        // Add scroll event listener for infinite scrolling
        window.addEventListener('scroll', function () {
          if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            // Load more images
            imagesLoaded += 6; 
            thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
              if (column >= 3) { 
                createNewRow(cardJson.row);
                currentRow = rowList[rowList.length - 1]; 
                column = 0; 
              }
              var card = createNewCard(cardJson, thought);
              currentRow.append(card);
              column++;
            });
          }
        });
      });
    });
    });  
  } 
  else{
    //no filters applied
    db.collection("thoughts").get()  
    .then((allThoughts) => {
      ajaxGET("/cardRow", function (jsonData) {
        const thoughtData = []; 
        allThoughts.forEach((thought) => {
          thoughtData.push(thought); 
        });
  
        ajaxGET("/cardRow", function (jsonData) {
          let cardJson = JSON.parse(jsonData);
  
          if (rowList.length == 0) {
            createNewRow(cardJson.row);
          }
  
          let currentRow = rowList[rowList.length - 1]; 
  
          let column = currentRow.children.length; 
  
          thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
            if (column >= 3) { 
              createNewRow(cardJson.row);
              currentRow = rowList[rowList.length - 1]; 
              column = 0; 
            }
            var card = createNewCard(cardJson, thought);
            currentRow.append(card);
            column++;
          });
  
          // Add scroll event listener for infinite scrolling
          window.addEventListener('scroll', function () {
            if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
              // Load more images
              imagesLoaded += 6; 
              thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
                if (column >= 3) { 
                  createNewRow(cardJson.row);
                  currentRow = rowList[rowList.length - 1]; 
                  column = 0; 
                }
                var card = createNewCard(cardJson, thought);
                currentRow.append(card);
                column++;
              });
            }
          });
        });
      });
    });
  }
  
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
  if (thought.data().default == 1) {
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