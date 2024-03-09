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
//TODO: Refactor this function out so its not anonymous.
app.get("/", function (req, res) {
  let doc = fileSystem.readFileSync("./app/html/index.html", "utf8");
  res.send(doc);
});

//Gets a JSON card

// app.get("/article", function(req, res) {
//   let formatOfResponse = req.query["format"];
//   if (formatOfResponse == "json") {
//     res.setHeader("Content-Type", "text/html");
//     res.send(
//       fileSystem.readFileSync("./app/data/article.json",
//       "utf8")
//     );
//   } else {
//     res.send({status: "fail", msg: "Wrong format!"});
//   }
// });

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