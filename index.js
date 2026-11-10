const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");


const publicPath = path.resolve(__dirname, "images");
app.use("/images", express.static(publicPath));
app.use("/images", function(request, response){
  response.status(404).send("Image Not Found");
})
app.use(express.json());
app.use(cors());

//Logger
app.use(function(req,res,next) {
  console.log(`${req.method} ${req.url}`)
  next();
});

//Get all the lessons
app.get('/lessons', function (req, res) {
  res.json(lessons);
});

app.post('/orders', (req,res) => {
  console.log("New order received: ", req.body);
  res.status(200).json({ message: "Order placed!" });
})

//Unrecognised request
app.use(function(req, res) {
  res.status(404).send( "404: Not Found");
});

//Starting the server
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