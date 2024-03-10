$(document).ready(function () {
  ajaxGET("/navbar", function (data) {
      document.getElementById("navbarPlaceholder").innerHTML = data;
  });
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