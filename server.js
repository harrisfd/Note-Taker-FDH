const path=require ("path")
const express=require("express")

const app=express()
const PORT=process.env.PORT || 3001

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static("public"))


app.listen(PORT,function(){
    console.log("app listening on port " + PORT)
})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./public/index.html"))

})