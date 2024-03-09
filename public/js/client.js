
console.log("Client script loaded.");

// a function declaration inside of a callback ... which takes a callback function :O
function ajaxGET(url, callback) {

  const xhr = new XMLHttpRequest();

  //console.log("xhr", xhr);
  xhr.onload = function() {
    value = this.responseText;
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
      //console.log('responseText:' + xhr.responseText);

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
