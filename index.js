//The initial JS script that launches the page client-side

//REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fileSystem = require("fs");

//Map local paths to the apps virtual paths
app.use("/public", express.static("./public"));
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use(express.static('app/html'));

//Map local paths to the apps virtual paths
app.use("/public", express.static("./public"));
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use(express.static('app/html'));


//Gets the landing page
app.get("/", function (req, res) {
  let doc = fileSystem.readFileSync("./app/html/index.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("server error");
      return;
    }
    res.send(data);
  });
});

//Redirect to submit page
app.get('/SubmitThought', (req, res) => {
  let doc = fileSystem.readFileSync("./app/html/SubmitThought.html", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("server error");
      return;
    }
    res.send(data);
  });
});

//Redirect to submit page
app.get('/resources', (req, res) => {
  let doc = fileSystem.readFileSync("./app/html/resources.html", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("server error");
      return;
    }
    res.send(data);
  });
});

//gets navbar
app.get("/navbar", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  fileSystem.readFile("./app/data/navbar.html", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send("server error");
      return;
    }
    res.send(data);
  });
});

//gets hamburger
app.get("/hamburger", function (req, res) {
  let doc = fileSystem.readFileSync("./app/data/hamburger.js", "utf8");
  res.setHeader("Content-Type", "application/json");
  res.send(doc);
});

//Gets a JSON card
app.get("/cardRow", function (req, res) {
  res.setHeader("Content-Type", "text/html");
  res.send(
    fileSystem.readFileSync("./app/data/cardRow.json",
      "utf8")
  );
})

//gets locally stored images.
app.get("/img", function (req, res) {
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