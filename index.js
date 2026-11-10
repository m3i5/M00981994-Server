const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 3000;
//MONGO DB

const uri =
  process.env.MONGODB_PREFIX +
  process.env.MONGODB_USERNAME +
  ":" +
  process.env.MONGODB_PASSWORD +
  process.env.MONGODB_URL;
const client = new MongoClient(uri);

const db = client.db("TutorSite");

//Serving static files
const publicPath = path.resolve(__dirname, "images");
app.use("/images", express.static(publicPath));
app.use("/images", function (request, response) {
  response.status(404).send("Image Not Found");
});

app.use(express.json());
app.use(cors());

//Logger
app.use(function (req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
});

//Get all the lessons
app.get("/lessons", async function (req, res) {
  let collection = await db.collection("Lessons");
  let results = await collection.find({}).toArray();
  res.send(results);
});

app.post("/orders", async function (req, res) {
  console.log("New order received: ", req.body);
  let collection = await db.collection("Orders");
  let result = await collection.insertOne(req.body);
  res.send(result);
});

app.put("/lessons/:_id", async function (req, res) {
  let collection = await db.collection("Lessons");
  let tempid = req.params._id;

  const query = { _id: new ObjectId(tempid) };
  const updates = { $set: req.body };

  result = await collection.updateOne(query, updates);
  res.send(result);
  console.log(result);
});

//Unrecognised request
app.use(function (req, res) {
  res.status(404).send("404: Not Found");
});

//Starting the server
app.listen(port, function () {
  console.log("App started on port" + port);
});

let lessons = [
  {
    id: 1001,
    quantity: 10,
    subject: "Calculus I",
    tutor: "Isaac Newton",
    location: "Online",
    price: 27.5,
    image: "./images/calculus.jpg",
    altText: "Image of integrals being solved",
  },
  {
    id: 1002,
    quantity: 12,
    subject: "Chemistry",
    tutor: "Marie Curie",
    location: "Online",
    price: 29.99,
    image: "./images/chemistry.jpg",
    altText: "Image of chemistry equipment",
  },
  {
    id: 1003,
    quantity: 7,
    subject: "Physics",
    tutor: "Albert Einstein",
    location: "In-Class",
    price: 16,
    image: "./images/physics.jpg",
    altText: "Physic formula on a blackboard",
  },
];
