var express=require("express");
var app=express();

const bodyParser= require('body-parser')
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
    console.log(__dirname+"\\Assets"+req.params.query)
})

app.get("/sounds/:query",(req,res)=>{
    res.sendFile(__dirname+"\\sounds\\"+req.params.query);
    console.log(__dirname+"\\Assets"+req.params.query)
})

app.get("/login",(req,res)=>{
    var username=req.body.username;
    res.sendFile(__dirname+"\\public\\game.html");
  })