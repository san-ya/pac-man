var express=require("express");
var app=express();
const fs=require('fs');
const path=require('path');

const fileadd=path.join(__dirname,"//public","//game.html");
let gamefile=fs.readFileSync(fileadd,"utf-8");

var bodyParser= require('body-parser');
const { use } = require("express/lib/application");
const { log } = require("console");
app.use(bodyParser.urlencoded({ extended: true }))

app.use(express.static("public"));

app.get("/",(req,res)=>{
  res.sendFile(__dirname+"\\public\\index.html");
})


app.listen(4000,function(){
    console.log("Listening to port 4000");
})

app.get("/Assets/:query",(req,res)=>{
    res.sendFile(__dirname+"\\Assets\\"+req.params.query);
})

app.get("/sounds/:query",(req,res)=>{
    res.sendFile(__dirname+"\\sounds\\"+req.params.query);
})

app.get("/login",(req,res)=>{

    fs.writeFileSync(fileadd,gamefile);
    gamefile=fs.readFileSync(fileadd,"utf-8");
    var username=req.query['username'];
    var level=req.query.level;
    console.log(username);
    console.log(level);
    let div="<div id=\"level\">{%level%}</div>";
    const newLocal = "{%level%}";
    let newdiv=div.replace(newLocal,level);
    const gamediv="{%div%}";
   let temp=gamefile.replace(gamediv,newdiv);
   console.log(temp);
  
   fs.writeFileSync(fileadd,temp);
   res.sendFile(__dirname+"//public"+"//game.html")
  })