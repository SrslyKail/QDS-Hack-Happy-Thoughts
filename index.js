//The initial JS script that launches the page client-side

//REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fileSystem = require("fs");

//Map local paths to the apps virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

//Gets the landing page
app.get("/", function (req, res) {
  let doc = fileSystem.readFileSync("./app/html/index.html", "utf8");
  res.send(doc);
});

//Gets a JSON card
app.get("/cardRow", function(req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(
    fileSystem.readFileSync("./app/data/cardRow.json",
     "utf8")
  );
})

//gets locally stored images.
app.get("/img", function(req, res) {
  let requestFileName = req.query["name"].toLowerCase();
  let files = fileSystem.readdirSync("./public/img");
  for (i in files) {
    var file = files[i]
    if (file.includes(requestFileName)) {
      res.send(
        String("/img/" + file));
    }
  }
  //files.forEach((file) => console.log(file));
});

// RUN THE SERVER
let port = 8000;
app.listen(port, function () {
  console.log("Website is listening on port: " + port);
});