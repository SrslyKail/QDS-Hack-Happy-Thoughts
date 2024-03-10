$(document).ready(function () {
  ajaxGET("/navbar", function (data) {
      document.getElementById("navbarPlaceholder").innerHTML = data;
  });
});