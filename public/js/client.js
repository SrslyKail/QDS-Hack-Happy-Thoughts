
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
		

		
//navbar links
		
document.querySelector("#navbarPlaceholder").addEventListener("mousedown", function (e) {
		
  document.querySelector(".nav-item-1").addEventListener('click', function (e) {
		
    window.open("./index.html", "_self");
		
    //console.log("1 works");
		
  })
		
  document.querySelector(".nav-item-2").addEventListener('click', function (e) {
		
    window.open("/about.html", "_self");
		
    //console.log("2 works");
		
  })
		
  document.querySelector(".nav-item-3").addEventListener('click', function (e) {
		
    window.open("/terms.html", "_self");
		
    //console.log("3 works");
		
  })
		
  document.querySelector(".nav-item-4").addEventListener('click', function (e) {
		
    window.open("/resources.html", "_self");
		
    //console.log("4 works");
		
  })
		
});

