import express from "express"

const app = express()

app.get("/",(req,res)=>{
    res.send({message:"welcome to ecommerce app"})
})

// port

app.listen(8080,()=>{
    console.log('server run port number 8080')
})