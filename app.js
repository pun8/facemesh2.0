const express = require('express')
const path = require('path')
const ejs = require('ejs')

require('./db/mongoose')

const conRouter = require('./routers/contestant')
const batRouter = require('./routers/battle')

const app = express()

const publicDirectorypath = path.join(__dirname,'/public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname,'/templates/partials')
//do these again
app.set('view engine','ejs')
app.set('views',viewsPath)

app.use(express.json())
app.use(express.static( publicDirectorypath))

app.use(conRouter)
app.use(batRouter)

app.use((req,res)=>{
    res.send("<h3>404 man, sorry!</h4>")
})

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})