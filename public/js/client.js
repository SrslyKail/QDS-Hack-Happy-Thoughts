
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

//loads hamburger menu on click
document.querySelector("#navbarPlaceholder").addEventListener("load", function (e) {
  document.getElementById("hamburger").addEventListener("click", function (e) {
    //console.log("hamburger loaded");
    ajaxGET("/hamburger", function (data) {
      let parsedData = JSON.parse(data);
      let str = "<div id=\"hamenu\"><table><tr><td id=\"title\"><h2>Happy Thoughts!</h2></td></tr>";
      for (let i = 0; i < parsedData.length; i++) {
        let item = parsedData[i];
        str += "<tr><td id=\"item" + i + "\">" + item["item"] + "</td></tr>";

      }
      str += "<tr><td id=\"itemsubmit\"><a class=\"btn\" href=\"/SubmitThought.html\">Submit a Post</a></td></tr></table></div>";
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



