
//console.log("Client script loaded.");
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

//loads navbar with dom
if (document.readyState !== 'loading') {
  //console.log('document was ready');
  ajaxGET("/navbar", function (data) {
    document.getElementById("navbarPlaceholder").innerHTML = data;
    document.addEventListener('click', function (event) { event.preventDefault(); });

  });
} else {
  document.addEventListener('DOMContentLoaded', function () {
    //console.log('document was not ready');
    ajaxGET("/navbar", function (data) {

      document.getElementById("navbarPlaceholder").innerHTML = data;
      document.addEventListener('click', function (event) { event.preventDefault(); });
    });
  });
}

//Event listeners for filtering buttons
let imgFilter = document.getElementById("imgflt");
imgFilter.addEventListener("click", function (){
  getThoughts(filter='image');
});

let textFilter = document.getElementById("txtflt");
textFilter.addEventListener("click", function (){
  getThoughts(filter='text');
});

/**
 * Gets thoughts from the server to be displayed and filters them
 * I know, looks terrible, but it is what it is
 */
// function getThoughts(filter = null) {
//   //clear previous cards from the card area
//   let cardArea = document.getElementById("cardArea");
//   cardArea.innerHTML="";
//   //iterators for rows and columns;
//   let row = 0;
//   let column = 0;
//   //if custom image is a priority, filters cards displaying cards with the custom images first
//   if (filter=='image'){
//     db.collection("thoughts").where("default", "==", 1).get().then((allThoughts) => {
//       ajaxGET("/cardRow", function (jsonData) {
//         //console.log("filtering");
//         const thoughtData = []; 
//       allThoughts.forEach((thought) => {
//         thoughtData.push(thought); 
//       });

//       ajaxGET("/cardRow", function (jsonData) {
//         let cardJson = JSON.parse(jsonData);

//         if (rowList.length == 0) {
//           createNewRow(cardJson.row);
//         }

//         let currentRow = rowList[rowList.length - 1]; 

//         let column = currentRow.children.length; 

//         thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
//           if (column >= 3) { 
//             createNewRow(cardJson.row);
//             currentRow = rowList[rowList.length - 1]; 
//             column = 0; 
//           }
//           var card = createNewCard(cardJson, thought);
//           currentRow.append(card);
//           column++;
//         });

//         // Add scroll event listener for infinite scrolling
//         window.addEventListener('scroll', function () {
//           if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//             // Load more images
//             imagesLoaded += 6; 
//             thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
//               if (column >= 3) { 
//                 createNewRow(cardJson.row);
//                 currentRow = rowList[rowList.length - 1]; 
//                 column = 0; 
//               }
//               var card = createNewCard(cardJson, thought);
//               currentRow.append(card);
//               column++;
//             });
//           }
//         });
//       });
//     });
//     });
//     //loads non-prioritized imgs 
//     db.collection("thoughts").where("default", "==", 0).get().then((allThoughts) => {
//       ajaxGET("/cardRow", function (jsonData) {
//         const thoughtData = []; 
//       allThoughts.forEach((thought) => {
//         thoughtData.push(thought); 
//       });

//       ajaxGET("/cardRow", function (jsonData) {
//         let cardJson = JSON.parse(jsonData);

//         if (rowList.length == 0) {
//           createNewRow(cardJson.row);
//         }

//         let currentRow = rowList[rowList.length - 1]; 

//         let column = currentRow.children.length; 

//         thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
//           if (column >= 3) { 
//             createNewRow(cardJson.row);
//             currentRow = rowList[rowList.length - 1]; 
//             column = 0; 
//           }
//           var card = createNewCard(cardJson, thought);
//           currentRow.append(card);
//           column++;
//         });

//         // Add scroll event listener for infinite scrolling
//         window.addEventListener('scroll', function () {
//           if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//             // Load more images
//             imagesLoaded += 6; 
//             thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
//               if (column >= 3) { 
//                 createNewRow(cardJson.row);
//                 currentRow = rowList[rowList.length - 1]; 
//                 column = 0; 
//               }
//               var card = createNewCard(cardJson, thought);
//               currentRow.append(card);
//               column++;
//             });
//           }
//         });
//       });
//     });
//     });
//     //if default image is a priority, filters cards displaying cards with the default images first
//   } else if (filter=='text'){
//     db.collection("thoughts").where("default", "==", 0).get().then((allThoughts) => {
//       ajaxGET("/cardRow", function (jsonData) {
//         const thoughtData = []; 
//       allThoughts.forEach((thought) => {
//         thoughtData.push(thought); 
//       });

//       ajaxGET("/cardRow", function (jsonData) {
//         let cardJson = JSON.parse(jsonData);

//         if (rowList.length == 0) {
//           createNewRow(cardJson.row);
//         }

//         let currentRow = rowList[rowList.length - 1]; 

//         let column = currentRow.children.length; 

//         thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
//           if (column >= 3) { 
//             createNewRow(cardJson.row);
//             currentRow = rowList[rowList.length - 1]; 
//             column = 0; 
//           }
//           var card = createNewCard(cardJson, thought);
//           currentRow.append(card);
//           column++;
//         });

//         // Add scroll event listener for infinite scrolling
//         window.addEventListener('scroll', function () {
//           if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//             // Load more images
//             imagesLoaded += 6; 
//             thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
//               if (column >= 3) { 
//                 createNewRow(cardJson.row);
//                 currentRow = rowList[rowList.length - 1]; 
//                 column = 0; 
//               }
//               var card = createNewCard(cardJson, thought);
//               currentRow.append(card);
//               column++;
//             });
//           }
//         });
//       });
//     });
//     });
//     //loads non-prioritized imgs
//     db.collection("thoughts").where("default", "==", 1).get().then((allThoughts) => {
//       ajaxGET("/cardRow", function (jsonData) {
//         const thoughtData = []; 
//       allThoughts.forEach((thought) => {
//         thoughtData.push(thought); 
//       });

//       ajaxGET("/cardRow", function (jsonData) {
//         let cardJson = JSON.parse(jsonData);

//         if (rowList.length == 0) {
//           createNewRow(cardJson.row);
//         }

//         let currentRow = rowList[rowList.length - 1]; 

//         let column = currentRow.children.length; 

//         thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
//           if (column >= 3) { 
//             createNewRow(cardJson.row);
//             currentRow = rowList[rowList.length - 1]; 
//             column = 0; 
//           }
//           var card = createNewCard(cardJson, thought);
//           currentRow.append(card);
//           column++;
//         });

//         // Add scroll event listener for infinite scrolling
//         window.addEventListener('scroll', function () {
//           if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//             // Load more images
//             imagesLoaded += 6; 
//             thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
//               if (column >= 3) { 
//                 createNewRow(cardJson.row);
//                 currentRow = rowList[rowList.length - 1]; 
//                 column = 0; 
//               }
//               var card = createNewCard(cardJson, thought);
//               currentRow.append(card);
//               column++;
//             });
//           }
//         });
//       });
//     });
//     });  
//   } 
//   else{
//     //no filters applied
//     db.collection("thoughts").get()  
//     .then((allThoughts) => {
//       ajaxGET("/cardRow", function (jsonData) {
//         const thoughtData = []; 
//         allThoughts.forEach((thought) => {
//           thoughtData.push(thought); 
//         });
  
//         ajaxGET("/cardRow", function (jsonData) {
//           let cardJson = JSON.parse(jsonData);
  
//           if (rowList.length == 0) {
//             createNewRow(cardJson.row);
//           }
  
//           let currentRow = rowList[rowList.length - 1]; 
  
//           let column = currentRow.children.length; 
  
//           thoughtData.slice(0, imagesLoaded).forEach((thought, index) => {
//             if (column >= 3) { 
//               createNewRow(cardJson.row);
//               currentRow = rowList[rowList.length - 1]; 
//               column = 0; 
//             }
//             var card = createNewCard(cardJson, thought);
//             currentRow.append(card);
//             column++;
//           });
  
//           // Add scroll event listener for infinite scrolling
//           window.addEventListener('scroll', function () {
//             if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
//               // Load more images
//               imagesLoaded += 6; 
//               thoughtData.slice(imagesLoaded - 6, imagesLoaded).forEach((thought, index) => {
//                 if (column >= 3) { 
//                   createNewRow(cardJson.row);
//                   currentRow = rowList[rowList.length - 1]; 
//                   column = 0; 
//                 }
//                 var card = createNewCard(cardJson, thought);
//                 currentRow.append(card);
//                 column++;
//               });
//             }
//           });
//         });
//       });
//     });
//   }
  
// }

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
  let text = thought;
  if (text.length > charLimit) {
    text = text.substring(0, charLimit) + '\u2026';
  }
  back.innerHTML = `<p>${text}</p>`;
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
  while (!target.classList.contains("card")) {
    target = target.parentNode;
  }
  target.classList.toggle('is-flipped');
}

//getThoughts()



document.addEventListener('thoughtsLoaded', function () {
  let cards = document.querySelectorAll(".card-inner");
  console.log(cards)
  for (var i = 0; i < cards.length; i++) {
    let card = cards[i]
    card.addEventListener('click', function () {
      card.classList.toggle('is-flipped');
    });
  }
});

//loads hamburger menu on click
document.querySelector("#navbarPlaceholder").addEventListener("mousemove", function (e) {
  document.getElementById("hamburger").addEventListener("click", function (e) {
    //console.log("hamburger loaded");
    ajaxGET("/hamburger", function (data) {
      let parsedData = JSON.parse(data);
      let str = "<div id=\"hamenu\"><table><tr><td id=\"title\"><h2>HAPPY THOUGHTS!</h2></td></tr>";
      for (let i = 0; i < parsedData.length; i++) {
        let item = parsedData[i];
        str += "<tr><td id=\"item" + i + "\">" + item["item"] + "</td></tr>";

      }
      str += "<tr><td id=\"itemsubmit\"><a class=\"btn\" href=\"/SubmitThought.html\">SUBMIT A POST</a></td></tr></table></div>";
      document.getElementById("hamburger").innerHTML = str;
      //console.log(str);
    });
  })
});

//hide the hamburger menu when clicked outside 
document.body.addEventListener("click", function (e) {
  if (!e.target.closest("#hamburger")) {
    // If the click did not occur inside the hamburger menu, hide it
    document.getElementById("hamburger").innerHTML = "";
  }
});

// Function to fetch quotes from Firestore
async function fetchQuotes() {
  try {
    const snapshot = await db.collection('quotes').get();
    const quotes = [];
    snapshot.forEach(doc => {
      quotes.push(doc.data().quote_text);
    });
    return quotes;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return []; 
  }
}

// Update the modal body with a random quote
async function updateModalBody() {
  try {
    const quotes = await fetchQuotes();
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    const modalBody = document.querySelector('.modal-body');
    if (modalBody) {
      modalBody.innerText = randomQuote;
    }
  } catch (error) {
    console.error('Error updating modal body:', error);
  }
}

updateModalBody();
