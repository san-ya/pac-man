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
    temp=fs.readFileSync(fileadd,"utf-8");
    var username=req.query['username'];
    const newLocal = "{%username%}";
    let final=temp.replace(newLocal,username);
    console.log(final);
    console.log(gamefile);
    fs.writeFileSync(fileadd,final);
   res.sendFile(__dirname+"//public"+"//game.html")
  })

  