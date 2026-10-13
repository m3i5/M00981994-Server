const express = require("express");
const app = express();

app.use(function(req, res){
    console.log("In come request to: " + req.url)
    console.log("Hello Server!")
})

app.listen(3000, function() {
    console.log("App started on port 3000");
})