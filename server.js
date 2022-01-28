const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const {PORT,MONGO_DB} = process.env
const stockRouter = require('./controller/stocks')

//middleWare
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//appRouter
app.use('/',stockRouter)

mongoose.connect(MONGO_DB)

const DB = mongoose.connection

DB.on("connected", () => console.log("Connected to DB"))
DB.on("disconnected", () => console.log("Disconnected from DB"))
DB.on("error", (err) => console.log("Error Connection",err))

app.listen(PORT, () => console.log("connected to PORT 3001"))