$(document).ready(function () {
  ajaxGET("/navbar", function (data) {
      document.getElementById("navbarPlaceholder").innerHTML = data;
  });
});

//loads hamburger menu on click
document.querySelector("#navbarPlaceholder").addEventListener("mousedown", function (e) {
  document.getElementById("hamburger").addEventListener("click", function (e) {
    //console.log("hamburger loaded");
    ajaxGET("/hamburger", function (data) {
      let parsedData = JSON.parse(data);
      let str = "<div id=\"hamenu\"><table><tr><td id=\"title\"><h2>HAPPY THOUGHTS!</h2></td></tr>";
      for (let i = 0; i < parsedData.length; i++) {
        let item = parsedData[i];
        str += "<tr><td class=\"nav-item-" + (i+1) + "\">" + item["item"] + "</td></tr>";

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
  document.querySelector(".btn").addEventListener('click', function (e) {
    window.open("/SubmitThought.html", "_self");
    //console.log("4 works");
  })
});