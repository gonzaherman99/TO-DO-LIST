const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); 
const mongoose = require("mongoose");

var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/todoDB",
{useNewUrlParser: true,  useUnifiedTopology: true});

mongoose.set("useCreateIndex", true); 

const postsSchema = {
    content:  String
};

const Post = mongoose.model("Post", postsSchema);

app.get("/", function(req, res) {
    
    var month = new Date().getMonth();
    var monthString;
    switch(month) {
        case  0 :
            monthString = "January";
        case  1 :
            monthString = "Febuary";
        case  2 :
            monthString = "March";
         case  3 :
            monthString = "April";
         case  4 :
            monthString = "May";
         case  5 :
            monthString = "June";
        case  6 :
            monthString = "July";
        case  7 :
            monthString = "August";
        case  8 :
            monthString = "September";
        case  9 :
            monthString = "October";
        case  10 :
            monthString = "Novomber";
        case  11 :
            monthString = "December";
        default :
            console.log("Fuc");
    }
    var day = new Date().getDate();
    var year = new Date().getFullYear();
    var finalDate = `${monthString} ${day} of ${year}`;
    
    
    Post.find({}, function(err, found) {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {post: found, date: finalDate});
            console.log(found);
        }
    });
});

app.post("/", function(req, res) {
    
   const post = new Post ({
       content: req.body.input
   });
    post.save();
    
    res.redirect("/");
});

app.post("/delete", function(req, res) {
    const check = req.body.checkbox;
    
    Post.findByIdAndRemove(check, function(err){
        if (!err) {
            console.log("Succesfully deleted");
            res.redirect("/");
        }
    });
});

app.listen(3000, function(req, res) {
    console.log("App listenng in 3000");
});