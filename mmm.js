


const { text } = require("body-parser");
const express = require("express");
const app = express();

app.use(express.json());

var users = [];
var dictionary = 
{
    "cold" : "huiten" ,
};

// app.get("/", (req, res) => {
//   res.send("hello");
// });

app.get("/:search", (req, res) => {
    if(dictionary[req.params.search.toLowerCase()] != undefined)
    {
        res.send("translate : "+  dictionary[req.params.search.toLowerCase()]);
    }else{
   res.send("Message : word not found ");
        
    }
});

app.post("/add_word", (req, res) => {
  dictionary={
    ...dictionary,

  }
  console.log(dictionary);
  res.send("ug nemlee");
});

app.put("/edit_word", (req, res) => {
    dictionary={
        ...dictionary,
        ...req.body
      }
  console.log(dictionary);
  res.send("edited");
});

app.listen(3000, () => {
  console.log("servers is running");
});