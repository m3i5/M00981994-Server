const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

app.use(function (req, res) {
  console.log("In come request to: " + req.url);
  res.json(lessons);
});

app.listen(3000, function () {
  console.log("App started on port 3000");
});

let lessons = [
    {
      id: 1001,
      quantity: 10,
      subject: "Calculus I",
      tutor: "Isaac Newton",
      location: "Online",
      price: 27.50,
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