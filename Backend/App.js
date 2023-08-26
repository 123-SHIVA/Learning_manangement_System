const express=require("express")

const port=3000;
const app=express();

app.get("/",(req,res)=>{
    res.send("this is our first server")
})

app.listen(port,()=>{
   console.log(`server is running port:${port}`)
})