const axios = require('axios')
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const {PORT,API_KEY,MONGO_DB} = process.env
const Watchlist = require('./models/UserWatchlist')
const WatchlistNaming = require('./models/WatchlistNaming')
const { Mongoose } = require('mongoose')

//middleWare
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//A function needed to limit API requests per second
const sleep = (milliseconds) => {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

//Test Symbol constant
const testSymbolTSLA = {
    method: 'GET',
    url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
    params: {symbols: 'tsla', region: 'US'},
    headers: {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': API_KEY
    }
};

//Test symbol grab data function from API
const grabDataTest = async() => {
    try {
        const response = await axios.request(testSymbolTSLA)
        const data = response.data
        return(data)
    } catch (err) {
        console.log(err, () => console.log(err))
    }
}

//Grab data based on request
const grabDataFromSymbol = async (apiGet) => {
    try {
        const response = await axios.request(apiGet)
        const data = await response.data.quoteResponse
        return(await data)
    } catch (err) {
        //API only allows for 5 requests per second...delay this if you have
        //over 5 products being loaded automatically by catching the error and
        //retrying the function
        sleep(500)
        const response = await axios.request(apiGet)
        const data = await response.data.quoteResponse
        //console.log(data)
        return(await data)
    }
}

//function to update the API search dynamically and 
const searchSymbol = async (symbol) => {
    const apiInfo = {
        method: 'GET',
        url: 'https://yh-finance.p.rapidapi.com/market/v2/get-quotes',
        params: {symbols: symbol, region: 'US'},
        headers: {
          'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
          'x-rapidapi-key': API_KEY
        }
    };

    //Run Grab data using the symbol API data provided
    return await grabDataFromSymbol(apiInfo)

}





app.get('/', async (req,res)=> {
    const returnedData = await grabDataTest()
    res.json(returnedData)
})

app.get('/stock/:symbol', async (req,res)=> {
    try {
        const returnedData = await searchSymbol(req.params.symbol)
        res.json(returnedData)
    }
    catch(err) {
        res.send(err)
    }

})

app.post('/post', (req,res)=> {
    try{
        res.json(Watchlist.create(req.body))
    } catch(err) {
        res.send(err)
    }

})

app.delete('/post/:id', async (req,res)=> {
    try{
        res.json(await Watchlist.findByIdAndDelete(req.params.id))
    } catch(err) {
        res.send(err)
    }

})

app.get('/watchlist/:userID', async (req,res) => {
    try {
        res.json(await Watchlist.find({user: req.params.userID}))
    } catch(err) {
        res.send(err)
    }
})

app.get('/watchlistNaming/:userID', async (req,res) => {
    try {
        res.json(await WatchlistNaming.find({user: req.params.userID}))
    }
    catch(err) {
        res.send(err)
    }
})

app.post('/watchlistNaming/:userID', async (req,res) => {
    try {
        res.json(WatchlistNaming.create(req.body))
    }
    catch(err) {
        res.send(err)
    }
})

app.put('/watchlistNaming/rename/:watchlistID', async (req,res) => {
    try {
        res.json(await WatchlistNaming.findByIdAndUpdate(req.params.watchlistID, req.body, { new: true }))
    }
    catch(err) {
        res.send(err)
    }
})

mongoose.connect(MONGO_DB)

const DB = mongoose.connection

DB.on("connected", () => console.log("Connected to DB"))
DB.on("disconnected", () => console.log("Disconnected from DB"))
DB.on("error", (err) => console.log("Error Connection",err))

app.listen(PORT, () => console.log("connected to PORT 3001"))