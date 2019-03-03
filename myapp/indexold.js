const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const MongoClient = require("mongodb").MongoClient;
const path = require("path");
var db;
const multer = require("multer");

MongoClient.connect("mongodb://localhost:27017", function(err, client) {
  if (err) throw err;
  else {
    console.log("connected");
    db = client.db("Users");
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.post("/login", (req, res) => {
  db.collection("user", function(err, collection) {
    collection
      .find({ username: req.body.username })
      .toArray(function(err, items) {
        if (err) throw err;
        if (items.length > 0 && items[0].password === req.body.password) {
          res.status(200).send({ username: req.body.username, valid: true });
        } else {
          res.status(200).send({ username: req.body.username, valid: false });
        }
      });
  });
});

app.post("/search", (req, res) => {
  db.collection("health_records", function(err, collection) {
    collection
      .find({
        $and: [
          { filename: { $regex: ".*" + req.body.name + "_" + ".*" } },
          { filename: { $regex: ".*" + req.body.lastname + "_" + ".*" } },
          { filename: { $regex: ".*" + req.body.id + ".json" + ".*" } }
        ]
      })
      .toArray(function(err, items) {
        if (err) throw err;
        if (items.length > 0) {
          let records = [];
          items.forEach(element => {
            let str = element.filename;
            let details = str.substring(0, str.length - 4).split("_");
            let id = details.splice(-1, 1)[0];
            let name = details.join(" ");
            records.push({ filename: str, name: name, id: id });
          });
          console.log(items[0]);
          console.log(items.length);
          res.status(200).send({
            records: records,
            found: true,
            name: req.body.name,
            lastname: req.body.lastname,
            id: req.body.id
          });
        } else {
          res.status(200).send({ found: false });
        }
      });
  });
});

app.post("/download", (req, res) => {
  db.collection("health_records", function(err, collection) {
    collection
      .find({ filename: req.body.filename })
      .toArray(function(err, items) {
        if (err) throw err;
        if (items.length > 0) {
          res.send({
            file: items[0].file
          });
        } else {
          res.status(200).send({ username: req.body.username, valid: false });
        }
      });
  });
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function(req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }
});

app.post("/upload", upload.single("myImage"), function(req, res, next) {
  console.log("Request ---", req.body.img_Id);
  console.log("Request file ---", req.file); //Here you get file.
  callName(req, res);
  /*Now do where ever you want to do*/
  //if (!err) return res.send(200).end();
});
function callName(req, res) {
  var spawn = require("child_process").spawn;

  var process = spawn("python", ["./script.py", req.file.filename]);

  //process.stdout.on("data", function(data) {
  //  res.send(data.toString());
  //});
}

/*const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
   destination: "./uploads/",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const upload = multer({
   storage: storage,
   limits:{fileSize: 1000000},
}).single("myImage");

app.post("/upload", {
   upload(req, res, (err) => {
      console.log("Request ---", req.body);
      console.log("Request file ---", req.file);//Here you get file.
      /*Now do where ever you want to do*/
/*if(!err)
         return res.send(200).end();
   });
}*/
