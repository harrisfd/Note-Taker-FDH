const path = require("path")
const express = require("express")
const fs= require("fs")
const shortid=require("shortid")

const app = express()
const PORT = process.env.PORT || 3001

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static("public"))


app.listen(PORT, function () {
    console.log("app listening on port " + PORT)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))

})
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))

})

app.get("/api/notes", (req,res)=>{
    const data=fs.readFileSync(path.join(__dirname,"./db/db.json"), "utf8")
    const parsdata=JSON.parse(data)
    
    
    res.json(parsdata)
})

app.post("/api/notes", (req,res)=>{
    const data=fs.readFileSync(path.join(__dirname,"./db/db.json"), "utf8")
    const parsdata=JSON.parse(data)

    const id=shortid.generate()
    req.body.id=id
    parsdata.push(req.body)
   fs.writeFileSync(path.join(__dirname, "./db/db.json"),JSON.stringify(parsdata))
   res.json(parsdata)
})

app.delete("/api/notes/:id",(req,res)=>{
    const id=req.params.id
    const data=fs.readFileSync(path.join(__dirname,"./db/db.json"), "utf8")
    const parsdata=JSON.parse(data)
   const index=parsdata.findIndex(element =>{
       if(id===element.id){
           return true
       }
   }) 
   parsdata.splice(index,1)
   fs.writeFileSync(path.join(__dirname, "./db/db.json"),JSON.stringify(parsdata))
   res.json()
})