
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